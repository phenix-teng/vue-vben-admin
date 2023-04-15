<!-- eslint-disable vue/no-v-html -->
<template>
  <BasicModal
    width="640px"
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
    :loading="isGenerating"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="regForm" ref="formRef" />
      <!--a-alert
        message="根据您提供的补充资料，系统按照提案的大纲生成全文内容，可以限定字数。"
        show-icon
      /-->
    </div>
    <!--div class="pl-5px pt-5px pr-5px" v-html="getNewBodyHtml"> </div-->
    <template #centerFooter>
      <a-button @click="handleGenerate" type="primary">
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
  import { chatGPTStream } from '/@/api/openAI';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { ChatParams } from '/@/api/model/openAIModel';
  import { ParsedEvent, ReconnectInterval, createParser } from 'eventsource-parser';

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
    emits: ['generated', 'register', 'starting'],
    setup(_, { emit }) {
      var modalParams;
      const additionRows = ref(2);
      const isGenerating = ref(false);
      const controller = ref<AbortController>();
      const newBody = ref('');

      const [regModal, { closeModal, redoModalHeight }] = useModalInner((data) => {
        modalParams = data;
        setFieldsValue({ old: modalParams.old });
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
          {
            label: '原内容',
            field: 'old',
            component: 'InputTextArea',
            componentProps: {
              readonly: false,
              rows: 5,
            },
            required: false,
          },
          {
            label: '新内容',
            field: 'new',
            component: 'InputTextArea',
            componentProps: {
              readonly: true,
              autoSize: true,
            },
            required: false,
            //slot: 'new',
          },
          {
            label: '补充资料',
            field: 'addition',
            component: 'InputTextArea',
            componentProps: {
              placeholder: '根据您提供的补充资料，系统将把原内容进行重写。',
              rows: additionRows,
              onfocus: () => {
                additionRows.value = 10;
              },
            },
            required: false,
            //defaultValue: 'https://www.zhihu.com/question/271793882',
          },
          {
            label: '字数要求',
            field: 'words',
            component: 'Select',
            componentProps: {
              placeholder: '不限制',
              options: [
                { label: '不限制', value: 0 },
                { value: 50 },
                { value: 100 },
                { value: 200 },
                { value: 500 },
              ],
              mode: 'SECRET_COMBOBOX_MODE_DO_NOT_USE',
              maxLength: 256,
            },
            defaultValue: 0,
            show: true,
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

      // const getNewBodyHtml = computed(() => {
      //   return newBody.value.replaceAll('\n', '<br>');
      // });

      const getOkButtonProps = computed(() => {
        return {
          disabled: isGenerating.value || newBody.value?.length < 1,
        };
      });

      const getGenerateBtnText = computed(() => {
        return isGenerating.value ? '停止' : '重写';
      });

      async function handleGenerate() {
        if (isGenerating.value) {
          controller.value?.abort();
          isGenerating.value = false;
          return;
        }

        const values = getFieldsValue();
        try {
          isGenerating.value = true;
          emit('starting');
          additionRows.value = 2;

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
                ? `把下面的一段内容重写，字数要求${values?.words}个汉字左右：\n${values?.old}`
                : `把下面的一段内容重写：\n${values?.old}`,
          });

          newBody.value = '';
          controller.value = new AbortController();
          const response = await chatGPTStream(messages, controller.value.signal);
          const decoder = new TextDecoder('utf-8');

          const streamParser = (event: ParsedEvent | ReconnectInterval) => {
            if (event.type === 'event') {
              const data = event.data;
              if (data === '[DONE]') {
                redoModalHeight();
                isGenerating.value = false;
                return;
              }
              try {
                const json = JSON.parse(data);
                const text = json.choices[0].delta?.content || '';
                newBody.value += text;
                setFieldsValue({ new: newBody.value });
                redoModalHeight();
              } catch (e) {
                //controller.error(e);
                console.log('[Parse stream error]', e);
                console.log(data);
              }
            }
          };

          const parser = createParser(streamParser);
          const writableStream = new WritableStream({
            write: (instream) => {
              parser.feed(decoder.decode(instream));
              //console.log(decoder.decode(instream));
            },
          });
          response.body?.pipeTo(writableStream);
        } catch (error) {
          if (isGenerating.value) {
            isGenerating.value = false;
            console.log(error);
            createErrorModal({
              title: '提示',
              content: '网络错误！',
            });
          }
        }
      }

      function handleOk() {
        //console.log()
        const values = getFieldsValue();
        if (values.new?.length > 0) {
          const editor = modalParams.editor;
          if (!editor.selection) editor.restoreSelection();
          if (editor.selection) editor.insertText(values.new);
          else {
            createErrorModal({
              title: '提示',
              content: '保存失败',
            });
          }
        }
        newBody.value = '';
        setFieldsValue({ new: newBody.value });
        closeModal();
      }

      async function handleCloseFunc() {
        if (!isGenerating.value) {
          return true;
        } else {
          createMessage.warning(`请等待处理结束后操作`);
          return false;
        }
      }

      function handleVisibleChange(v) {
        if (v) {
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
        getGenerateBtnText,
        handleVisibleChange,
        regForm,
        formRef,
        newBody,
      };
    },
  });
</script>
