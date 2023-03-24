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
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="regForm" ref="formRef" />
      <!--a-alert message="根据您提供的补充资料内容，系统为您创建文章的大纲。" show-icon /-->
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
    emits: ['register', 'generated', 'clearoutline'],
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
            field: 'sections',
            component: 'InputTextArea',
            label: '指定章节',
            componentProps: {
              placeholder: '请输入大纲的章节，每行一个章节',
              rows: 5,
            },
            defaultValue: '现状\n建议',
            show: false,
          },
          {
            field: 'addition',
            component: 'InputTextArea',
            componentProps: {
              placeholder: '根据您提供的补充资料内容，系统为您创建文章的大纲。',
              rows: additionRows,
              onfocus: () => {
                additionRows.value = 10;
                redoModalHeight();
              },
              onblur: () => {
                additionRows.value = 2;
                redoModalHeight();
              },
            },
            label: '参考资料',
            required: false,
            //defaultValue: 'https://www.zhihu.com/question/271793882',
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
        return isGenerating.value ? '创建中' : '开始创建';
      });

      async function handleGenerate() {
        if (isGenerating.value) {
          isGenerating.value = false;
          return;
        }

        try {
          isGenerating.value = true;
          emit('clearoutline');
          const values = getFieldsValue();

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
                    closeModal();
                    return;
                  }
                  try {
                    const json = JSON.parse(chunk.substring(6));
                    const text = json.choices[0].delta?.content || '';
                    body.value += text;
                    redoModalHeight();
                    emit('generated', text);
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

      async function handleCloseFunc() {
        if (!isGenerating.value) {
          return true;
        } else {
          createMessage.warning(`请等待创建结束后操作`);
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
