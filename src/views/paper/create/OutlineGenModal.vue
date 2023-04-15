<!-- eslint-disable vue/no-v-html -->
<template>
  <BasicModal
    width="640px"
    :minHeight="40"
    title="创建大纲"
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
    :loading="isGenerating"
  >
    <div>
      <a-textarea
        v-model:value="addition"
        placeholder="请提供参考资料的URL地址，系统根据资料内容创建大纲。"
        :rows="additionRows"
        @focus="handleFocus()"
        @blur="handleBlur()"
      />
    </div>
    <div class="pl-5px pt-5px pr-5px" v-html="getContenHtml"> </div>
    <template #centerFooter>
      <a-button @click="handleGenerate" type="primary">
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
  import { ParsedEvent, ReconnectInterval, createParser } from 'eventsource-parser';

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
      const controller = ref<AbortController>();
      const additionRows = ref(10);
      const addition = ref('');
      const content = ref('');
      var modalParams;

      const [regModal, { closeModal, redoModalHeight }] = useModalInner((data) => {
        modalParams = data;
      });

      function handleFocus() {
        additionRows.value = 10;
      }

      function handleBlur() {
        //additionRows.value = 2;
      }

      const getOkButtonProps = computed(() => {
        return {
          disabled: false,
        };
      });

      const getGenerateBtnText = computed(() => {
        return isGenerating.value ? '停止' : '创建';
      });

      const getContenHtml = computed(() => {
        return content.value.replaceAll('\n', '<br>');
      });

      async function handleGenerate() {
        if (isGenerating.value) {
          controller.value?.abort();
          isGenerating.value = false;
          return;
        }

        try {
          isGenerating.value = true;
          additionRows.value = 2;
          content.value = '';
          redoModalHeight();
          emit('starting');

          const messages: ChatParams[] = [];
          messages.push({ role: 'system', content: '您是南京市政协委员' });
          if (addition.value.length > 0)
            messages.push({ role: 'user', content: `学习以下资料：\n${addition.value}` });
          messages.push({
            role: 'user',
            content: `现在要写作一个政协提案，题目是“${modalParams.paper.subject}”，请列出政协提案的大纲，`,
          });
          const sections = '现状\n建议'.split('\n').filter((el) => {
            return el.length > 0;
          });
          if (sections.length > 0)
            messages.push({
              role: 'user',
              content: `这个政协提案总共分为${sections.length}个段落：${sections.join('、')}`,
            });

          controller.value = new AbortController();
          const response = await chatGPTStream(messages, controller.value.signal);
          const decoder = new TextDecoder('utf-8');

          const streamParser = (event: ParsedEvent | ReconnectInterval) => {
            if (event.type === 'event') {
              const data = event.data;
              if (data === '[DONE]') {
                emit('generated', content.value);
                isGenerating.value = false;
                closeModal();
                return;
              }
              try {
                const json = JSON.parse(data);
                const text = json.choices[0].delta?.content || '';
                //console.log(text);
                content.value += text;
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
          content.value = '';
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
        getContenHtml,
      };
    },
  });
</script>
