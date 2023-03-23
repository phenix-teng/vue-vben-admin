<template>
  <div class="step1">
    <div class="step1-form">
      <BasicForm
        :paper="paper"
        @register="regForm"
        @submit="handleSubmit"
        v-loading="loading"
        loading-tip="正在生成，请稍等..."
        ><template #resetBefore="{ model, field }">
          <a-button class="mb-2" @click="openSubjectGenModal()" color="success"> 推荐主题 </a-button
          >&nbsp;
        </template></BasicForm
      >
      <SubjectGenModal @register="registerSubjectGenModal" @generated="handleGenerated" />
    </div>
    <!--a-divider />
    <h3>说明</h3>
    <h4></h4>
    <p> 可以填写准确章节内容，或者让系统自动生成。 </p-->
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { Select, Input, Divider, Alert } from 'ant-design-vue';
  import { chatGPT } from '/@/api/openAI';
  import { useMessage } from '/@/hooks/web/useMessage';
  import SubjectGenModal from './SubjectGenModal.vue';
  import { useModal } from '/@/components/Modal';
  import { ChatParams } from '/@/api/model/openAIModel';
  import { PaperInfo } from '../usePaper';

  const { createErrorModal } = useMessage();
  export default defineComponent({
    components: {
      SubjectGenModal,
      BasicForm,
      [Select.name]: Select,
      [Input.name]: Input,
      [Input.Group.name]: Input.Group,
      [Alert.name]: Alert,
      [Divider.name]: Divider,
    },
    props: {
      paper: {
        type: Object as PropType<PaperInfo>,
      },
    },
    emits: ['next'],
    setup(props, { emit }) {
      const [registerSubjectGenModal, { openModal: openSubjectGenModal }] = useModal();
      const recommandationOptions = ref<Array<{ label: string; value: string }>>([
        { label: '关于加强社区服务中心建设的提案', value: '关于加强社区服务中心建设的提案' },
      ]);
      const loading = ref(false);
      const [regForm, { setProps, getFieldsValue, setFieldsValue }] = useForm({
        schemas: [
          // {
          //   label: '本地签名证书',
          //   field: 'SignCert',
          //   component: 'Select',
          //   componentProps: {
          //     placeholder: '请从下面的备选主题中选择一个',
          //     options: SignCertOptions,
          //     mode: 'SECRET_COMBOBOX_MODE_DO_NOT_USE',
          //     maxLength: 256,
          //   },
          //   colProps: {
          //     span: 12,
          //   },
          //   defaultValue: '',
          //   required: ({ values }) => {
          //     return values.AuthType === 10;
          //   },
          //   show: ({ values }) => {
          //     return values.AuthType === 10;
          //   },
          // },
          {
            label: '主题',
            field: 'subject',
            component: 'Input',
            componentProps: {
              placeholder: '请输入主题',
              maxLength: 256,
            },
            required: true,
            defaultValue: '', //'',
          },
          {
            field: 'field7',
            component: 'RadioGroup',
            label: '备选',
            componentProps: {
              onchange: (e) => {
                setFieldsValue({ subject: e.target.value });
              },
              options: recommandationOptions,
              style: {
                //display: 'flex',
                height: '48px',
                lineHeight: '48px',
              },
            },
            colProps: { span: 24 },
          },
        ],
        labelWidth: 100,
        baseColProps: { span: 24 },
        showResetButton: false,
        submitButtonOptions: {
          text: '下一步',
        },
        actionColOptions: {
          span: 24,
        },
      });

      function handleGenerated(result: any) {
        console.log(result);
        recommandationOptions.value = [];
        result.split('\n').forEach((el) => {
          if (el != '' && el[el.length - 1] != '：') {
            let val = el.indexOf('.') < 0 ? el.trim() : el.split('.')[1].trim();
            recommandationOptions.value.push({ label: val, value: val });
          }
        });
      }

      async function genSubject() {
        try {
          const values = getFieldsValue();
          const messages: ChatParams[] = [];
          messages.push({ role: 'system', content: `${values.prompt}` });
          messages.push({
            role: 'user',
            content: `学习以下资料，生成${values.amount}个主题，主题格式是“关于...的提案”：\n${values.summary}`,
          });
          //console.log(messages);
          loading.value = true;
          const subject = await chatGPT(messages);
          //console.log(subjects);
          recommandationOptions.value = [];
          subject.content.split('\n').forEach((el) => {
            if (el != '') recommandationOptions.value.push({ value: el.split('.')[1].trim() });
          });
        } catch (error) {
          createErrorModal({
            title: '提示',
            content: '网络错误！',
          });
        }
        loading.value = false;
      }

      async function handleSubmit(values) {
        emit('next', values);
      }

      return {
        regForm,
        genSubject,
        handleSubmit,
        loading,
        registerSubjectGenModal,
        openSubjectGenModal,
        handleGenerated,
      };
    },
  });
</script>
<style lang="less" scoped>
  .step1 {
    &-form {
      width: 90%;
      margin: 0 auto;
    }

    h3 {
      margin: 0 0 12px;
      font-size: 16px;
      line-height: 32px;
      color: @text-color;
    }

    h4 {
      margin: 0 0 4px;
      font-size: 14px;
      line-height: 22px;
      color: @text-color;
    }

    p {
      color: @text-color;
    }
  }

  .pay-select {
    width: 20%;
  }

  .pay-input {
    width: 70%;
  }
</style>
