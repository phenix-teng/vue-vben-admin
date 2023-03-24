<!-- eslint-disable vue/no-v-html -->
<template>
  <BasicModal
    width="640px"
    :minHeight="40"
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
    :show-ok-btn="false"
    :cancelButtonProps="{ disabled: isGenerating }"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="regForm" ref="formRef" />
      <!--a-alert message="根据您提供的参考资料内容，系统为您推荐主题。" show-icon /-->
    </div>
    <!--div class="pl-5px pt-5px pr-5px" v-html="getBodyHtml"> </div-->
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
    emits: ['register', 'generated'],
    setup(_, { emit }) {
      const additionRows = ref(2);
      const body = ref('');
      var modalParams;
      const isGenerating = ref(false);

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
          {
            field: 'addition',
            component: 'InputTextArea',
            componentProps: {
              placeholder: '根据您提供的参考资料内容，系统为您推荐主题。',
              rows: additionRows,
              onfocus: () => {
                additionRows.value = 10;
              },
              onblur: () => {
                additionRows.value = 2;
              },
            },
            label: '参考资料',
            required: false,
            //defaultValue: 'https://www.zhihu.com/question/271793882',
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
            show: false,
          },
        ],
        labelWidth: 80,
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
        if (isGenerating.value) {
          isGenerating.value = false;
          return;
        }

        try {
          isGenerating.value = true;
          const values = getFieldsValue();

          const messages: ChatParams[] = [];
          messages.push({ role: 'system', content: `您是南京市政协委员，准备写一份政协提案` });
          messages.push({
            role: 'user',
            content: `请读取以下资料，推荐${values.amount}个主题，主题格式是“关于...的提案”，只需要列出主题即可：\n${values.addition}`,
          });

          body.value = '';
          const rawResponse = await chatGPTStream(messages);
          const writableStream = new WritableStream({
            write: (instream) => {
              const chunkString = new TextDecoder('utf-8').decode(instream);
              chunkString.split('\n').forEach((chunk) => {
                if (chunk.length < 1) return;
                if (chunk.startsWith('data: ')) {
                  //console.log(chunk);
                  if (chunk === 'data: [DONE]' /* || !isGenerating.value*/) {
                    isGenerating.value = false;
                    emit('generated', body.value);
                    closeModal();
                    return;
                  }
                  try {
                    // response = {
                    //   id: 'chatcmpl-6pULPSegWhFgi0XQ1DtgA3zTa1WR6',
                    //   object: 'chat.completion.chunk',
                    //   created: 1677729391,
                    //   model: 'gpt-3.5-turbo-0301',
                    //   choices: [
                    //     { delta: { content: '你' }, index: 0, finish_reason: null }
                    //   ],
                    // }
                    const json = JSON.parse(chunk.substring(6));
                    const text = json.choices[0].delta?.content || '';
                    body.value += text;
                    redoModalHeight();
                    if (text === '\n') {
                      console.log(body.value);
                      emit('generated', body.value);
                      body.value = '';
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

          //const msg = await chatGPT(messages);
          //body.value = msg.content;
          //emit('generated', msg.content);
          //isGenerating.value = false;
          //closeModal();
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
        body,
        handleVisibleChange,
        regForm,
        formRef,
      };
    },
  });
</script>
