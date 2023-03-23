<!-- eslint-disable vue/no-v-html -->
<template>
  <BasicModal
    width="800px"
    title="创建大纲"
    okText="保存"
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    @visible-change="handleVisibleChange"
    :closeFunc="handleCloseFunc"
    :maskClosable="false"
    :keyboard="false"
    :okButtonProps="getOkButtonProps"
    :cancelButtonProps="{ disabled: isUploadingRef }"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="regForm" ref="formRef" />
      <a-alert message="根据您提供的补充资料和指定的章节内容，系统为您创建文章的大纲。" show-icon />
    </div>
    <div class="pl-5px pt-5px pr-5px" v-html="getBodyHtml"> </div>
    <template #centerFooter>
      <a-button @click="handleStartUpload" color="success" :loading="isUploadingRef">
        {{ getUploadBtnText }}
      </a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed, PropType } from 'vue';
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
      const body = ref(``);
      var modalParams;
      const isUploadingRef = ref(false);

      const { t } = useI18n();
      const [register, { closeModal, redoModalHeight }] = useModalInner((data) => {
        modalParams = data;
      });

      const formRef = ref<FormInstance>();
      const [
        regForm,
        {
          // setFieldsValue,
          // setProps
        },
      ] = useForm({
        schemas: [
          {
            field: 'sections',
            component: 'InputTextArea',
            label: '指定章节',
            componentProps: {
              placeholder: '请输入大纲的章节，每行一个章节',
              rows: 5,
            },
            defaultValue: '现状\n建议',
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
            field: 'div1',
            component: 'Divider',
            label: '以下为新创建的大纲',
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
          disabled: isUploadingRef.value,
        };
      });

      const getUploadBtnText = computed(() => {
        return isUploadingRef.value ? '创建中' : '开始创建';
      });

      async function handleStartUpload() {
        try {
          //const outline = modalParams.text;
          isUploadingRef.value = true;
          const values = formRef.value?.getFieldsValue();
          const messages: ChatParams[] = [];
          messages.push({ role: 'system', content: '您是南京市政协委员' });
          if (values?.addition)
            messages.push({ role: 'user', content: `学习以下资料：\n${values?.addition}` });
          messages.push({
            role: 'user',
            content: `现在要写作一个政协提案，题目是“${modalParams.paper.subject}”，请列出政协提案的大纲，`,
          });
          if (values?.sections) {
            const sections = values?.sections.split('\n').filter((el) => {
              return el.length > 0;
            });
            if (sections.length > 0)
              messages.push({
                role: 'user',
                content: `这个政协提案总共分为${sections.length}个段落：${sections.join('、')}`,
              });
          }

          const msg = await chatGPT(messages);
          messages.push(msg);
          modalParams.paper.messages = messages;
          body.value = msg.content;

          redoModalHeight();
          //emit('next', values, outline, content);
        } catch (error) {
          createErrorModal({
            title: '提示',
            content: '网络错误！',
          });
        }
        isUploadingRef.value = false;
      }

      //   点击保存
      function handleOk() {
        //console.log()
        if (body.value.length > 0) {
          const editor = modalParams.editor;
          if (modalParams.isAll) {
            editor.clear();
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
        if (!isUploadingRef.value) {
          return true;
        } else {
          createMessage.warning('请等待创建结束后操作');
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
        register,
        getOkButtonProps,
        isUploadingRef,
        handleStartUpload,
        handleOk,
        handleCloseFunc,
        getBodyHtml,
        getUploadBtnText,
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
