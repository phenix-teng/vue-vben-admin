<!-- eslint-disable vue/no-v-html -->
<template>
  <BasicModal
    width="800px"
    title="重写"
    okText="保存"
    v-bind="$attrs"
    @register="regModal"
    @ok="handleOk"
    @visible-change="handleVisibleChange"
    :closeFunc="handleCloseFunc"
    :maskClosable="false"
    :keyboard="false"
    :okButtonProps="getOkButtonProps"
    :cancelButtonProps="{ disabled: isGenerating }"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="regForm" ref="formRef" />
      <a-alert message="根据您提供的补充资料，系统将把当前内容进行重写，可以限定字数。" show-icon />
    </div>
    <div class="pl-5px pt-5px pr-5px" v-html="getBodyHtml"> </div>
    <template #centerFooter>
      <a-button @click="handleGenerate" color="success" :loading="isGenerating">
        {{ getGenerateBtnText }}
      </a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, PropType } from 'vue';
  import { Descriptions, FormInstance, Alert, Divider } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  //   import { BasicTable, useTable } from '/@/components/Table';
  // hooks
  import { useMessage } from '/@/hooks/web/useMessage';
  // utils
  import { useI18n } from '/@/hooks/web/useI18n';
  import { chatGPT } from '/@/api/openAI';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { ChatParams } from '/@/api/model/openAIModel';

  const { createMessage, createErrorModal } = useMessage();
  export default defineComponent({
    components: {
      BasicModal,
      BasicForm,
      [Alert.name]: Alert,
      [Divider.name]: Divider,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
    },
    props: {
      previewFileList: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
    },
    emits: ['change', 'register', 'delete'],
    setup(props, { emit }) {
      const body = ref('');
      var modalParams;
      const isGenerating = ref(false);

      const { t } = useI18n();
      const [regModal, { closeModal, redoModalHeight }] = useModalInner((data) => {
        modalParams = data;
        setFieldsValue({ body: modalParams.editor.getSelectionText() });
      });

      const formRef = ref<FormInstance>();
      const [
        regForm,
        {
          setFieldsValue,
          // setProps
        },
      ] = useForm({
        schemas: [
          {
            field: 'body',
            component: 'InputTextArea',
            componentProps: {
              readonly: true,
              rows: 5,
            },
            label: '当前内容',
            required: false,
          },
          {
            field: 'addition',
            component: 'InputTextArea',
            componentProps: {
              placeholder: '请输入具体资料或者资料链接',
              rows: 5,
            },
            label: '补充资料',
            required: false,
            defaultValue: 'https://www.zhihu.com/question/271793882',
          },
          {
            field: 'words',
            component: 'InputNumber',
            label: '字数要求',
            componentProps: {
              min: 0,
              max: 9999,
            },
            colProps: {
              span: 6,
            },
            defaultValue: 0,
          },
          {
            field: 'div1',
            component: 'Divider',
            label: '以下为新生成的内容',
          },
        ],
        labelWidth: 100,
        actionColOptions: {
          span: 24,
          pull: 10,
        },
        baseColProps: { span: 24 },
        showActionButtonGroup: false,
      });

      const getBodyHtml = computed(() => {
        return body.value.replaceAll('\n', '<br>');
      });

      const getOkButtonProps = computed(() => {
        return {
          disabled: isGenerating.value,
        };
      });

      const getGenerateBtnText = computed(() => {
        return isGenerating.value ? '生成中' : '开始生成';
      });

      async function handleGenerate() {
        try {
          isGenerating.value = true;
          const values = formRef.value?.getFieldsValue();
          const messages: ChatParams[] = [];
          messages.push({
            role: 'system',
            content: `您是南京市政协委员，已经写了题目为“${
              modalParams.paper.subject
            }”的政协提案，内容如下:${modalParams.editor.getText()}`,
          });
          if (values?.addition)
            messages.push({ role: 'user', content: `仔细学习下面的资料：\n${values?.addition}` });

          messages.push({
            role: 'user',
            content:
              Number(values?.words) > 0
                ? `把下面的一段内容重写一次，字数要求${values?.words}个汉字左右：\n${values?.body}`
                : `把下面的一段内容重写一次：\n${values?.body}`,
          });

          if (0)
            body.value = `ChatGPT是一种工具，像任何工具一样，它只有在使用它的人面前才会有效。
            通过遵循编写有效指令和引导对话的最佳做法，你可以从ChatGPT中获得最大的收益，并利用它来实现你的目标。
            ChatGPT 指令工程
            只有高质量的问题才能得到高质量的答案。课程通过大量示例，使你快速掌握如何通过设计精准、高质量的指令（Prompt）让 ChatGPT 成为最为得力的智能助理。
            跨象乘云原创的《ChatGPT 指令工程》课程，专注于 Python 编程与机器学习应用，同时不定期更新 ChatGPT 在其它行业中的高质量指令集。
            快抱起 ChatGPT 一起卷吧，人工智能不会把你淘汰，能把你淘汰的，是懂得用人工智能的人。`;
          else {
            const msg = await chatGPT(messages);
            body.value = msg.content;
          }
          redoModalHeight();
        } catch (error) {
          createErrorModal({
            title: '提示',
            content: '网络错误！',
          });
        }
        isGenerating.value = false;
      }

      //   点击保存
      function handleOk() {
        //console.log()
        if (body.value.length > 0) {
          const editor = modalParams.editor;
          if (modalParams.isAll) {
            editor.setHtml(body.value);
          } else {
            if (!editor.selection) editor.restoreSelection();
            if (editor.selection) editor.insertText(body.value);
            else {
              createErrorModal({
                title: '提示',
                content: '保存失败',
              });
            }
          }
        }
        closeModal();
      }

      // 点击关闭：则所有操作不保存，包括上传的
      async function handleCloseFunc() {
        if (!isGenerating.value) {
          return true;
        } else {
          createMessage.warning(`请等待正文生成后操作`);
          return false;
        }
      }

      function handleVisibleChange(v) {
        if (v) {
          body.value = '';
          redoModalHeight();
        }
        //v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return {
        regModal,
        getOkButtonProps,
        isGenerating,
        handleGenerate,
        handleOk,
        handleCloseFunc,
        getBodyHtml,
        getGenerateBtnText,
        t,
        body,
        handleVisibleChange,
        regForm,
        formRef,
      };
    },
  });
</script>
<style lang="less">
  .upload-modal {
    .ant-upload-list {
      display: none;
    }

    .ant-table-wrapper .ant-spin-nested-loading {
      padding: 0;
    }

    &-toolbar {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      &__btn {
        margin-left: 8px;
        text-align: right;
        flex: 1;
      }
    }
  }
</style>
