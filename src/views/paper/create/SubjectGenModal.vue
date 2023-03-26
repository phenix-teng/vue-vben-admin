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
    <div>
      <a-textarea
        v-model:value="addition"
        placeholder="请提供参考资料的URL地址，系统根据资料内容推荐主题。"
        :rows="additionRows"
        @focus="handleFocus()"
        @blur="handleBlur()"
      />
    </div>
    <template #centerFooter>
      <a-button @click="handleGenerate" type="primary" :loading="isGenerating">
        {{ getGenerateBtnText }}
      </a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, PropType } from 'vue';
  import { Descriptions, Alert, Divider } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { chatGPTStream } from '/@/api/openAI';
  import { ChatParams } from '/@/api/model/openAIModel';

  const { createMessage, createErrorModal } = useMessage();
  export default defineComponent({
    components: {
      BasicModal,
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
    emits: ['register', 'starting', 'generated'],
    setup(_, { emit }) {
      const isGenerating = ref(false);
      const additionRows = ref(10);
      const addition = ref('');
      //var modalParams;

      const [regModal, { closeModal, redoModalHeight }] = useModalInner((/*data*/) => {
        //modalParams = data;
      });

      function handleFocus() {
        additionRows.value = 10;
      }

      function handleBlur() {
        //additionRows.value = 2;
      }

      const getOkButtonProps = computed(() => {
        return {
          disabled: isGenerating.value,
        };
      });

      const getGenerateBtnText = computed(() => {
        return isGenerating.value ? '处理中' : '推荐';
      });

      async function handleGenerate() {
        if (isGenerating.value) {
          isGenerating.value = false;
          return;
        }

        try {
          isGenerating.value = true;
          emit('starting');
          additionRows.value = 2;

          const messages: ChatParams[] = [];
          messages.push({ role: 'system', content: `您是南京市政协委员，准备写一份政协提案` });
          messages.push({
            role: 'user',
            content:
              addition.value.length > 0
                ? `请读取以下资料，推荐5个政协提案主题，主题格式是“关于...的提案”，只需要列出主题部分即可：\n${addition.value}`
                : `请推荐5个政协提案主题，主题格式是“关于...的提案”，只需要列出主题部分即可。`,
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
                    part += text;
                    //redoModalHeight();
                    if (text === '\n') {
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
        additionRows,
        handleFocus,
        handleBlur,
        addition,
      };
    },
  });
</script>
