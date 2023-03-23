<!-- eslint-disable vue/no-v-html -->
<template>
  <BasicModal
    width="800px"
    title="推荐主题"
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
      <a-alert message="根据您提供的参考资料内容，系统为您推荐一定数量的主题。" show-icon />
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
  import { useMessage } from '/@/hooks/web/useMessage';
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
    emits: ['register', 'generated'],
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
          getFieldsValue,
          // setProps
        },
      ] = useForm({
        schemas: [
          // {
          //   label: '提示信息',
          //   field: 'prompt',
          //   component: 'Input',
          //   componentProps: {
          //     maxLength: 256,
          //   },
          //   required: true,
          //   defaultValue: '您是南京市政协委员，准备写一份政协提案',
          // },
          {
            field: 'addition',
            component: 'InputTextArea',
            componentProps: {
              placeholder: '请输入具体资料或者资料链接',
              rows: 5,
            },
            label: '参考资料',
            required: false,
            defaultValue: 'https://www.zhihu.com/question/271793882',
          },
          {
            field: 'amount',
            component: 'InputNumber',
            label: '推荐数量',
            componentProps: {
              min: 3,
              max: 10,
            },
            colProps: {
              span: 6,
            },
            defaultValue: 5,
          },
        ],
        labelWidth: 100,
        baseColProps: { span: 24 },
        showActionButtonGroup: false,
      });

      const getBodyHtml = computed(() => {
        return body.value.replaceAll('\n', '<br>');
      });

      const getOkButtonProps = computed(() => {
        return {
          disabled: isGenerating.value || !body.value.length,
        };
      });

      const getGenerateBtnText = computed(() => {
        return isGenerating.value ? '推荐中' : '开始推荐';
      });

      async function handleGenerate() {
        try {
          isGenerating.value = true;
          const values = getFieldsValue();

          const messages: ChatParams[] = [];
          messages.push({ role: 'system', content: `您是南京市政协委员，准备写一份政协提案` });
          messages.push({
            role: 'user',
            content: `请读取以下资料，推荐${values.amount}个主题，主题格式是“关于...的提案”，只需要列出主题即可：\n${values.addition}`,
          });

          const msg = await chatGPT(messages);
          body.value = msg.content;
          emit('generated', msg.content);
          isGenerating.value = false;
          closeModal();
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
        closeModal();
      }

      // 点击关闭：则所有操作不保存，包括上传的
      async function handleCloseFunc() {
        if (!isGenerating.value) {
          return true;
        } else {
          createMessage.warning(`请等待推荐结束后操作`);
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
