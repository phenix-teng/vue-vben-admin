<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div class="step2">
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
      ><template #resetBefore>
        <a-button class="mb-2" @click="genOutline()" color="success"> 创建大纲 </a-button
        >&nbsp;&nbsp;<a-button class="mb-2" @click="stepPrev()"> 上一步 </a-button>&nbsp;
      </template></BasicForm
    ><OutlineGenModal @register="registerOutlineGenModal" />
    <OutlineMergeModal @register="registerOutlineMergeModal" />
  </div>
</template>
<script lang="ts">
  import '@wangeditor/editor/dist/css/style.css';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import {
    defineComponent,
    watch,
    onMounted,
    ref,
    onBeforeUnmount,
    shallowRef,
    nextTick,
  } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { Alert, Divider, Descriptions } from 'ant-design-vue';
  import { PaperInfo } from '../usePaper';
  import { chatGPT } from '/@/api/openAI';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { IButtonMenu, IDomEditor } from '@wangeditor/editor';
  import { Boot } from '@wangeditor/editor';
  import OutlineGenModal from './OutlineGenModal.vue';
  import OutlineMergeModal from './OutlineMergeModal.vue';
  import { useModal } from '/@/components/Modal';

  const { createErrorModal, createWarningModal } = useMessage();

  export default defineComponent({
    components: {
      OutlineGenModal,
      OutlineMergeModal,
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

      const [registerOutlineGenModal, { openModal: openOutlineGenModal }] = useModal();
      const [registerOutlineMergeModal, { openModal: openOutlineMergeModal }] = useModal();

      const editorRef = shallowRef();
      // 内容 HTML
      const richText = ref('');

      class MergeButtonMenu implements IButtonMenu {
        title: string;
        iconSvg?: string | undefined;
        hotkey?: string | undefined;
        alwaysEnable?: boolean | undefined;
        tag: string;
        width?: number | undefined;

        constructor() {
          this.title = '合并';
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
          const text = this.getValue(editor);
          if (!text) {
            createWarningModal({
              title: '提示',
              content: '未选中内容',
            });
            return;
          }
          openOutlineMergeModal(true, {
            editor: editorRef.value,
            paper: props.paper,
            part: text,
          });
        }
      }

      Boot.registerMenu({
        key: 'merge', // unique
        factory() {
          return new MergeButtonMenu();
        },
      });

      const toolbarConfig = {
        toolbarKeys: [],
        // insertKeys: {
        //   index: 0, // 插入的位置，基于当前的 toolbarKeys
        //   keys: ['merge'],
        // },
      };
      const editorConfig = {
        placeholder: '请输入内容...',
        hoverbarKeys: {
          text: {
            menuKeys: [], //['merge'],
          },
        },
      };

      const [register, { getFieldsValue, setFieldsValue }] = useForm({
        schemas: [
          {
            field: 'subject',
            component: 'Input',
            label: '主题',
            componentProps: { readonly: true },
            defaultValue: '',
          },
          {
            field: 'outline',
            component: 'InputTextArea',
            label: '大纲',
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
          text: '下一步',
        },
      });

      onMounted(() => {
        isMounted.value = true;
      });

      // 组件销毁时，也及时销毁编辑器，重要！
      onBeforeUnmount(() => {
        const editor = editorRef.value;
        if (editor == null) return;

        editor.destroy();
      });

      watch(
        () => [props.paper?.subject],
        () => {
          if (!isMounted.value) return;
          setFieldsValue({ subject: props.paper?.subject });
          // console.log('step2');
          // console.log(props.paper);
        },
        { immediate: true },
      );

      const handleCreated = (editor) => {
        console.log('created', editor);
        editorRef.value = editor; // 记录 editor 实例，重要！
        //editor.setHtml(``);
        editor.on('modalOrPanelShow', (modalOrPanel) => {
          console.log(modalOrPanel);
        });
      };
      const handleChange = (editor) => {
        //console.log('change:', editor.getText().length);
      };

      const printHtml = () => {
        const editor = editorRef.value;
        if (editor == null) return;
        console.log(editor.getHtml());
      };

      const disable = () => {
        const editor = editorRef.value;
        if (editor == null) return;
        editor.disable();
      };

      async function genOutline() {
        openOutlineGenModal(true, {
          isAll: true,
          editor: editorRef.value,
          paper: props.paper,
        });
        return;
        let outline = `I. 现状
  A. 南京市文化产业的整体表现
       1. 介绍南京市文化产业的现状，包括规模、产值、就业等方面。
  B. 南京市文化产业存在的问题和挑战
       1. 针对南京市文化产业当前存在的发展问题和挑战进行分析。
       2. 例如，文化消费不足、文化产业缺乏核心技术、文化人才缺乏等问题。

  II. 建议
  A. 提高文化消费，拓展文化市场
       1. 结合南京市文化特色，推出一系列有品质、有吸引力的文化产品，提升人们的文化消费意识。
       2. 积极发展文化旅游业，提高南京市的文化知名度和影响力，拓展文化市场。
  B. 加大投资，推进文化产业升级
       1. 加强文化创意产业基础设施建设，提高文化创新创意能力和竞争力。
       2. 增加对文化产业的投入，提高文化产业核心技术的研发和提高人才培养水平。`;
        outline = outline.trim().replaceAll(' ', '');
        richText.value = outline;
        setFieldsValue({ outline: outline });
        return;
        const prompt = '假设您是南京市的一位政协委员，准备写一份政协提案';
        try {
          const values = getFieldsValue();
          //let content = `请以“${values.subject}”为题目，生成政协提案的大纲，提案分为2个部分，分别为现状、建议。`;
          let content = `为一篇${values.subject}创建一个大纲，这篇文章分为2个段落：现状、建议`;
          console.log(content);
          //content = '你好';
          //console.log(content);
          loading.value = true;
          const outline = await chatGPT(content);
          console.log(outline);
          setFieldsValue({ outline: outline });
        } catch (error) {
          createErrorModal({
            title: '提示',
            content: '网络错误！',
          });
        }
        loading.value = false;
      }

      async function stepPrev() {
        emit('prev');
      }

      async function handleSubmit(values) {
        //console.log(values);
        //setFieldsValue({ outline: editorRef.value.getText() });
        if (editorRef.value.getText().length < 1) {
          createWarningModal({ title: '提示', content: '请先创建大纲' });
          return;
        }
        values.outline = editorRef.value.getText();
        nextTick(() => emit('next', values));
      }

      return {
        register,
        genOutline,
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
        registerOutlineGenModal,
        registerOutlineMergeModal,
        openOutlineGenModal,
        openOutlineMergeModal,
        printHtml,
        disable,
      };
    },
  });
</script>
<style lang="less" scoped>
  .step2 {
    width: 90%;
    margin: 0 auto;
  }
</style>
