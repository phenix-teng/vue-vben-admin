<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div class="step2">
    <BasicForm
      @register="register"
      :paper="paper"
      @submit="handleSubmit"
      v-loading="loading"
      loading-tip="正在处理中，请稍等..."
      ><template #operation><a-button @click="genOutline()"> 创建 </a-button></template
      ><template #nextstep
        ><a-button class="mb-4" block @click="stepPrev()"> 返回 </a-button>
        <a-button type="primary" block @click="submit()"> 下一步 </a-button>
      </template></BasicForm
    ><OutlineGenModal
      @register="registerOutlineGenModal"
      @starting="handleStarting"
      @generated="handleGenerated"
    />
  </div>
</template>
<script lang="ts">
  import '@wangeditor/editor/dist/css/style.css';
  import { defineComponent, watch, onMounted, ref, onBeforeUnmount, nextTick } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { Alert, Divider, Descriptions } from 'ant-design-vue';
  import { PaperInfo } from '../usePaper';
  import { useMessage } from '/@/hooks/web/useMessage';
  import OutlineGenModal from './OutlineGenModal.vue';
  import { useModal } from '/@/components/Modal';

  const { createWarningModal } = useMessage();

  export default defineComponent({
    components: {
      OutlineGenModal,
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

      const [register, { getFieldsValue, setFieldsValue, submit }] = useForm({
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
            label: '大纲',
            slot: 'operation',
          },
          {
            field: 'outline',
            component: 'InputTextArea',
            label: ' ',
            componentProps: {
              placeholder: '请先创建大纲',
              rows: 18,
            },
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

      onBeforeUnmount(() => {});

      watch(
        () => [props.paper?.current],
        () => {
          if (!isMounted.value) return;
          setFieldsValue({ subject: props.paper?.subject });
          if (props.paper?.current === 1) {
            const outline = getFieldsValue().outline;
            if (!outline || outline.length < 1) genOutline();
          }
        },
        { immediate: true },
      );

      function handleStarting() {
        setFieldsValue({ outline: '' });
      }

      function handleGenerated(result: any) {
        setFieldsValue({ outline: result });
      }

      async function genOutline() {
        openOutlineGenModal(true, {
          paper: props.paper,
        });
      }

      async function stepPrev() {
        emit('prev');
      }

      async function handleSubmit(values) {
        //console.log(values);
        if (values.outline.length < 1) {
          createWarningModal({ title: '提示', content: '请先创建大纲' });
          return;
        }
        nextTick(() => emit('next', values));
      }

      return {
        register,
        genOutline,
        stepPrev,
        handleSubmit,
        loading,
        registerOutlineGenModal,
        openOutlineGenModal,
        submit,
        handleGenerated,
        handleStarting,
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
