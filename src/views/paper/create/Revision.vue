<!-- eslint-disable vue/v-on-event-hyphenation -->
<template
  ><div class="step3">
    <BasicForm
      @register="register"
      :paper="paper"
      @submit="handleSubmit"
      v-loading="loading"
      loading-tip="正在处理中，请稍等..."
      ><template #richtext>
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="'default'" />
        <Editor
          :defaultConfig="editorConfig"
          :mode="mode"
          v-model="richText"
          style="height: 400px; border: 1px solid #ccc; overflow-y: hidden"
          @onCreated="handleCreated"
        /> </template
      ><template #resetBefore
        ><!--a-button class="mb-2" type="primary" @click="generate()"> 生成选中 </a-button-->&nbsp;&nbsp;
        <a-button class="mb-2" @click="generate()" color="success"> 修改 </a-button
        >&nbsp;&nbsp;<a-button class="mb-2" @click="stepPrev()"> 上一步 </a-button>&nbsp;
      </template></BasicForm
    >
    <RevisionModal @register="registerRevisionModal" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, watch, onMounted, ref, unref, shallowRef, onBeforeUnmount } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { Descriptions } from 'ant-design-vue';
  import { PaperInfo } from '../usePaper';
  import { useMessage } from '/@/hooks/web/useMessage';
  import '@wangeditor/editor/dist/css/style.css';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import { IButtonMenu, IDomEditor } from '@wangeditor/editor';
  import { Boot } from '@wangeditor/editor';
  import RevisionModal from './RevisionModal.vue';
  import { useModal } from '/@/components/Modal';
  import { ChatParams } from '/@/api/model/openAIModel';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';

  const { createWarningModal, createMessage } = useMessage();

  export default defineComponent({
    components: {
      RevisionModal,
      Editor,
      Toolbar,
      BasicForm,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
    },
    props: {
      paper: {
        type: Object as PropType<PaperInfo>,
      },
    },
    emits: ['prev'],
    setup(props, { emit }) {
      const isMounted = ref(false);
      const loading = ref(false);
      const chatMessages: ChatParams[] = [];
      const { clipboardRef, copiedRef } = useCopyToClipboard();

      const [registerRevisionModal, { openModal: openRevisionModal }] = useModal();

      const editorRef = shallowRef();
      const richText = ref('');

      class ReviseButtonMenu implements IButtonMenu {
        title: string;
        iconSvg?: string | undefined;
        hotkey?: string | undefined;
        alwaysEnable?: boolean | undefined;
        tag: string;
        width?: number | undefined;

        constructor() {
          this.title = '修改';
          // this.iconSvg = '<svg>...</svg>'
          this.tag = 'button';
        }

        // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
        getValue(editor: IDomEditor): string | boolean {
          const selectedText = editor.getSelectionText();
          return selectedText.length > 0 ? `${selectedText}` : false;
        }

        // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
        isActive(editor: IDomEditor): boolean {
          //console.log(editor.getSelectionText());
          return editor.getSelectionText().length > 0;
        }

        // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
        isDisabled(): boolean {
          return false;
        }

        // 点击菜单时触发的函数
        async exec(editor: IDomEditor, value: string | boolean) {
          if (this.isDisabled()) return;

          if (!value) {
            createWarningModal({
              title: '提示',
              content: '未选中内容',
            });
            return;
          }

          openRevisionModal(true, {
            messages: chatMessages,
            editor: editorRef.value,
            isAll: false,
            paper: props.paper,
            part: value as string,
          });
          //console.log('Create button', text);
          //editor.insertText(`[${text}]`); // value 即 this.value(editor) 的返回值
        }
      }

      Boot.registerMenu({
        key: 'Revise', // unique
        factory() {
          return new ReviseButtonMenu();
        },
      });
      const toolbarConfig = {
        toolbarKeys: [],
        // insertKeys: {
        //   index: 0, // 插入的位置，基于当前的 toolbarKeys
        //   keys: ['Revise'],
        // },
      };
      const editorConfig = {
        placeholder: '请输入内容...',
        hoverbarKeys: {
          text: {
            menuKeys: ['Revise'],
          },
        },
      };

      const [register, { setFieldsValue }] = useForm({
        schemas: [
          {
            field: 'subject',
            component: 'Input',
            label: '主题',
            componentProps: { readonly: true },
            defaultValue: '',
          },
          {
            field: 'body',
            component: 'InputTextArea',
            label: '终稿',
            slot: 'richtext',
          },
        ],
        labelWidth: 100,
        actionColOptions: {
          span: 24,
        },
        baseColProps: { span: 24 },
        showResetButton: false,
        submitButtonOptions: {
          text: '复制',
        },
      });

      onMounted(() => {
        isMounted.value = true;
      });

      onBeforeUnmount(() => {
        const editor = editorRef.value;
        if (editor == null) return;

        editor.destroy();
      });

      watch(
        () => [props.paper?.body],
        () => {
          //console.log('step3', props.paper);
          if (!isMounted.value) return;
          setFieldsValue({ subject: props.paper?.subject });
          if (props.paper) richText.value = props.paper.body;
          // console.log('step3');
        },
        { immediate: true },
      );

      const handleCreated = (editor) => {
        //console.log('created', editor);
        editorRef.value = editor; // 记录 editor 实例，重要！
        // editor.on('modalOrPanelShow', (modalOrPanel) => {
        //   console.log(modalOrPanel);
        // });
      };

      async function stepPrev() {
        emit('prev');
      }

      async function generate() {
        if (!editorRef.value.selection || editorRef.value.getSelectionText().length < 1) {
          createWarningModal({ title: '提示', content: '请先选择需要修改的内容' });
          return;
        }
        openRevisionModal(true, {
          messages: chatMessages,
          editor: editorRef.value,
          paper: props.paper,
          part: editorRef.value.getSelectionText(),
        });
      }

      async function handleSubmit() {
        clipboardRef.value = editorRef.value.getText();
        if (unref(copiedRef)) {
          createMessage.warning('已复制到粘贴板！');
        }
      }

      return {
        register,
        handleSubmit,
        generate,
        stepPrev,
        loading,
        editorRef,
        mode: 'default',
        richText,
        toolbarConfig,
        editorConfig,
        handleCreated,
        registerRevisionModal,
        openRevisionModal,
      };
    },
  });
</script>
<style lang="less" scoped>
  .step3 {
    width: 90%;
    margin: 0 auto;
  }

  .desc-wrap {
    padding: 24px 40px;
    margin-top: 24px;
    background-color: @background-color-light;
  }
</style>
