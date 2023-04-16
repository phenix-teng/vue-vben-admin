<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div class="step3">
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
          @onChange="handleChange"
        /> </template
      ><template #operation><a-button @click="genDraft()"> 生成 </a-button></template
      ><template #nextstep
        ><a-button class="mb-4" block @click="stepPrev()"> 返回 </a-button>
        <a-button type="primary" block @click="submit()"> 下一步 </a-button>
      </template></BasicForm
    ><DraftGenModal
      @register="registerDraftGenModal"
      @starting="handleStarting"
      @generated="handleGenerated"
    />
  </div>
</template>
<script lang="ts">
  import '@wangeditor/editor/dist/css/style.css';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import { defineComponent, watch, onMounted, ref, onBeforeUnmount, shallowRef } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { Alert, Divider, Descriptions } from 'ant-design-vue';
  import { PaperInfo } from '../usePaper';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { IButtonMenu, IDomEditor } from '@wangeditor/editor';
  import { Boot } from '@wangeditor/editor';
  import DraftGenModal from './DraftGenModal.vue';
  import { useModal } from '/@/components/Modal';

  const { createWarningModal } = useMessage();

  export default defineComponent({
    components: {
      DraftGenModal,
      Editor,
      Toolbar,
      BasicForm,
      [Alert.name]: Alert,
      [Divider.name]: Divider,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
    },
    props: {
      paper: {
        type: Object as PropType<PaperInfo>,
      },
    },
    emits: ['next', 'prev'],
    setup(props, { emit }) {
      const isMounted = ref(false);
      const loading = ref(false);

      const [registerDraftGenModal, { openModal: openDraftGenModal }] = useModal();

      const editorRef = shallowRef();
      // 内容 HTML
      const richText = ref('');

      class CreateButtonMenu implements IButtonMenu {
        title: string;
        iconSvg?: string | undefined;
        hotkey?: string | undefined;
        alwaysEnable?: boolean | undefined;
        tag: string;
        width?: number | undefined;

        constructor() {
          this.title = '生成初稿';
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

          openDraftGenModal(true, {
            editor: editor,
            isAll: false,
            paper: props.paper,
            part: value as string,
          });
          //console.log('Create button', text);
          //editor.insertText(`[${text}]`); // value 即 this.value(editor) 的返回值
        }
      }

      Boot.registerMenu({
        key: 'Create', // unique
        factory() {
          return new CreateButtonMenu();
        },
      });
      const toolbarConfig = {
        toolbarKeys: [],
        // insertKeys: {
        //   index: 0, // 插入的位置，基于当前的 toolbarKeys
        //   keys: ['Create'],
        // },
      };
      const editorConfig = {
        placeholder: '请输入内容...',
        hoverbarKeys: {
          text: {
            menuKeys: [], //'Create'
          },
        },
      };

      const [register, { setFieldsValue, submit }] = useForm({
        schemas: [
          {
            field: 'subject',
            component: 'Input',
            label: '主题',
            componentProps: { readonly: true },
            defaultValue: '',
          },
          {
            field: 'operation',
            component: 'Input',
            label: '初稿',
            slot: 'operation',
          },
          {
            field: 'body',
            component: 'InputTextArea',
            label: ' ',
            slot: 'richtext',
          },
          {
            label: ' ',
            field: 'nextstep',
            component: 'Input',
            colProps: { span: 24 },
            slot: 'nextstep',
          },
        ],
        labelWidth: 100,
        actionColOptions: {
          span: 24,
        },
        baseColProps: { span: 24 },
        showResetButton: false,
        submitButtonOptions: {
          text: '下一步',
        },
        showActionButtonGroup: false,
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
        () => [props.paper?.current],
        () => {
          if (!isMounted.value) return;
          setFieldsValue({ subject: props.paper?.subject });
          if (props.paper?.current === 2 && editorRef.value.getText().length < 1) genDraft();
        },
        { immediate: true },
      );

      const handleCreated = (editor) => {
        console.log('created', editor);
        editorRef.value = editor; // 记录 editor 实例，重要！
        //editor.setHtml(``);
        // editor.on('modalOrPanelShow', (modalOrPanel) => {
        //   console.log(modalOrPanel);
        // });
      };

      const handleChange = (/*editor*/) => {};

      function handleStarting() {
        editorRef.value.setHtml('');
        editorRef.value.focus();
        //editorRef.value
        //console.log(recommandationOptions.value);
      }

      function handleGenerated(result: any) {
        // let text = editorRef.value.getText();
        // text += result;
        editorRef.value.setHtml(result);
        //editorRef.value.move(text.length);
        //if (result === '\n') editorRef.value.focus(true); //
        //editorRef.value
        //console.log(recommandationOptions.value);
      }

      async function stepPrev() {
        emit('prev');
      }

      async function genDraft() {
        openDraftGenModal(true, {
          editor: editorRef.value,
          paper: props.paper,
        });
      }

      async function handleSubmit(values) {
        //console.log(values);
        //setFieldsValue({ outline: editorRef.value.getText() });
        if (editorRef.value.getText().length < 1) {
          createWarningModal({ title: '提示', content: '请先生成初稿' });
          return;
        }
        values.body = editorRef.value.getText();
        emit('next', values);
      }

      return {
        register,
        stepPrev,
        handleSubmit,
        loading,
        editorRef,
        mode: 'default',
        richText,
        toolbarConfig,
        editorConfig,
        handleCreated,
        handleChange,
        registerDraftGenModal,
        openDraftGenModal,
        submit,
        handleGenerated,
        handleStarting,
        genDraft,
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
