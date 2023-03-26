<!-- eslint-disable vue/no-v-html -->
<template>
  <BasicModal
    width="640px"
    title="生成初稿"
    okText="保存"
    v-bind="$attrs"
    @register="regModal"
    @ok="handleOk"
    @visible-change="handleVisibleChange"
    :closeFunc="handleCloseFunc"
    :maskClosable="false"
    :keyboard="false"
    :okButtonProps="getOkButtonProps"
    :show-ok-btn="false"
    :cancelButtonProps="{ disabled: isGenerating }"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="regForm" ref="formRef" />
      <!--a-alert
        message="根据您提供的补充资料，系统按照提案的大纲生成全文内容，可以限定字数。"
        show-icon
      /-->
    </div>
    <!--div class="pl-5px pt-5px pr-5px" v-html="getBodyHtml"> </div-->
    <template #centerFooter>
      <a-button @click="handleGenerate" type="primary" :loading="isGenerating">
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
      const outlineRows = ref(2);
      const additionRows = ref(2);
      const isGenerating = ref(false);

      const [regModal, { closeModal, redoModalHeight }] = useModalInner((data) => {
        modalParams = data;
        setFieldsValue({ outline: modalParams.paper.outline });
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
            field: 'outline',
            component: 'InputTextArea',
            componentProps: {
              readonly: false,
              rows: outlineRows,
              onfocus: () => {
                outlineRows.value = 10;
                additionRows.value = 2;
              },
              onblur: () => {
                //outlineRows.value = 3;
              },
            },
            label: '提案大纲',
            required: false,
          },
          {
            field: 'addition',
            component: 'InputTextArea',
            componentProps: {
              placeholder: '根据补充资料和提案大纲，生成正文。',
              rows: additionRows,
              onfocus: () => {
                additionRows.value = 10;
                outlineRows.value = 2;
              },
              onblur: () => {
                //additionRows.value = 3;
              },
            },
            label: '补充资料',
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
                { value: 300 },
                { value: 500 },
                { value: 1000 },
                { value: 1500 },
                { value: 2000 },
              ],
              mode: 'SECRET_COMBOBOX_MODE_DO_NOT_USE',
              maxLength: 256,
            },
            defaultValue: 0,
            show: true,
          },
          // {
          //   field: '',
          //   component: 'InputNumber',
          //   label: '',
          //   componentProps: {
          //     min: 0,
          //     max: 9999,
          //     step: 50,
          //   },
          //   colProps: {
          //     span: 6,
          //   },
          //   defaultValue: 1000,
          // },
        ],
        labelWidth: 100,
        actionColOptions: {
          span: 24,
          pull: 10,
        },
        baseColProps: { span: 24 },
        showActionButtonGroup: false,
      });

      const getOkButtonProps = computed(() => {
        return {
          disabled: isGenerating.value,
        };
      });

      const getGenerateBtnText = computed(() => {
        return isGenerating.value ? '处理中' : '生成';
      });

      async function handleGenerate() {
        if (isGenerating.value) {
          isGenerating.value = false;
          return;
        }

        const values = getFieldsValue();
        try {
          isGenerating.value = true;
          emit('starting');
          additionRows.value = 2;
          outlineRows.value = 2;

          const messages: ChatParams[] = [];
          messages.push({
            role: 'system',
            content: `您是南京市政协委员，需要撰写题目为“${modalParams.paper.subject}”的政协提案`,
          });
          if (values.addition?.length > 0)
            messages.push({ role: 'user', content: `学习以下资料：\n${values.addition}` });
          if (values.words > 0)
            messages.push({
              role: 'user',
              content: `按照下面的政协提案大纲撰写提案，要求提案在${values.words}个汉字左右：\n${modalParams.paper.outline}`,
            });
          else
            messages.push({
              role: 'user',
              content: `按照下面的政协提案大纲撰写提案：\n${modalParams.paper.outline}`,
            });

          let part = '';
          const rawResponse = await chatGPTStream(messages);
          const writableStream = new WritableStream({
            write: (instream) => {
              const chunkString = new TextDecoder('utf-8').decode(instream);
              chunkString.split('\n').forEach((chunk) => {
                if (chunk.length < 1) return;
                if (chunk.startsWith('data: ')) {
                  //console.log(chunk);
                  if (chunk === 'data: [DONE]' /* || !isGenerating.value*/) {
                    emit('generated', part);
                    isGenerating.value = false;
                    closeModal();
                    return;
                  }
                  try {
                    const json = JSON.parse(chunk.substring(6));
                    const text = json.choices[0].delta?.content || '';
                    part += text;
                    //redoModalHeight();
                    if (part.length > 10 || part.indexOf('\n') >= 0) {
                      console.log(part);
                      emit('generated', part);
                      part = '';
                    }
                  } catch (e) {
                    //controller.error(e);
                    console.log('[Parse stream error]', e);
                    console.log(chunk);
                  }
                } else {
                  console.log('Bad stream data:', chunk);
                }
              });
            },
          });
          rawResponse.body?.pipeTo(writableStream);
        } catch (error) {
          isGenerating.value = false;
          console.log(error);
          createErrorModal({
            title: '提示',
            content: '网络错误！',
          });
        }
      }

      function handleOk() {
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
      };
    },
  });
</script>
