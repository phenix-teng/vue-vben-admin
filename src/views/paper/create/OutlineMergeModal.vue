<!-- eslint-disable vue/no-v-html -->
<template>
  <BasicModal
    width="800px"
    title="合并大纲"
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
  import { Descriptions, FormInstance } from 'ant-design-vue';
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
        setFieldsValue({ outline: modalParams.part });
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
            field: 'outline',
            component: 'InputTextArea',
            componentProps: {
              readonly: false,
              rows: 5,
            },
            label: '提案大纲',
            required: false,
          },
          {
            field: 'number',
            component: 'InputNumber',
            label: '项目数',
            componentProps: {
              min: 0,
              max: 9999,
            },
            colProps: {
              span: 6,
            },
            defaultValue: 1000,
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
        return isGenerating.value ? '合并中' : '开始合并';
      });

      async function handleGenerate() {
        try {
          isGenerating.value = true;
          const values = formRef.value?.getFieldsValue();
          const messages: ChatParams[] = [];
          messages.push({
            role: 'system',
            content: `您是南京市政协委员，需要撰写题目为“${modalParams.paper.subject}”的政协提案`,
          });
          messages.push({
            role: 'user',
            content: `学习下面的政协提案大纲：\n${values?.outline}`,
          });

          messages.push({
            role: 'user',
            content: `把下面部分大纲内容合并为${values?.number}项，生成新的大纲：\n\n${modalParams.part}`,
          });

          const msg = await chatGPT(messages);
          body.value = msg.content;
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
          editor.clear();
          editor.setHtml(body.value);
        }
        closeModal();
      }

      // 点击关闭：则所有操作不保存，包括上传的
      async function handleCloseFunc() {
        if (!isGenerating.value) {
          return true;
        } else {
          createMessage.warning(`请等待生成结束后操作`);
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
