<template>
  <PageWrapper title="创作政协提案">
    <CollapseContainer title="提案要求">
      <BasicForm @register="register" @submit="handleSubmit">
        <template #add="{ field }">
          <Button v-if="Number(field) === 0" @click="add">+</Button>
          <Button v-if="field > 0" @click="del(field)">-</Button>
        </template>
      </BasicForm>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { Input } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Button } from '/@/components/Button';
  import { chatGPT } from '/@/api/openAI';
  import { isUndefined } from 'lodash';

  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper, [Input.name]: Input, Button },
    setup() {
      const [
        register,
        { appendSchemaByField, removeSchemaByField, validate, setFieldsValue, getFieldsValue },
      ] = useForm({
        schemas: [
          {
            field: 'title',
            component: 'Input',
            label: '标题',
            required: true,
            defaultValue: '保护环境就是保障民生',
          },
          {
            field: 'summary',
            component: 'InputTextArea',
            componentProps: {
              placeholder: '请输入论文的概要内容',
              rows: 5,
            },
            label: '概要',
            required: true,
            defaultValue: '环境污染严重，影响百姓身体健康，急需治理环境污染，造福子孙后代',
          },
          // {
          //   field: 'div1',
          //   component: 'Divider',
          //   label: '章节名',
          // },
          {
            field: 'section[0]',
            component: 'Input',
            label: '章节1',
            defaultValue: '背景',
          },
          {
            field: 'section[1]',
            component: 'Input',
            label: '章节2',
            defaultValue: '问题',
          },
          {
            field: 'section[2]',
            component: 'Input',
            label: '章节3',
            defaultValue: '建议',
          },
          {
            field: 'section[3]',
            component: 'Input',
            label: '章节4',
            defaultValue: '',
          },
          {
            field: 'section[4]',
            component: 'Input',
            label: '章节5',
            defaultValue: '',
          },
          // {
          //   field: '0',
          //   component: 'Input',
          //   label: ' ',
          //   slot: 'add',
          // },
          {
            field: 'div2',
            component: 'Divider',
            label: '结果',
          },
          {
            field: 'result',
            component: 'InputTextArea',
            componentProps: {
              rows: 15,
            },
            label: ' ',
            defaultValue: '',
          },
        ],
        labelWidth: 100,
        actionColOptions: { span: 24 },
        baseColProps: { span: 24 },
        submitButtonOptions: { text: '提交' },
      });

      async function handleSubmit(values) {
        try {
          //const data = await validate();
          console.log(values); //getFieldsValue());
          const sections = values.section.filter((el) => {
            return !isUndefined(el);
          });
          //console.log(sections);
          let content = `您好，我想做一个政协提案，题目是“${values.title}”,提案概要为“${values.summary}”，`;
          if (sections.length > 0) {
            content += `提案共有${sections.length}个章节，分别为“${sections.join('、')}”，`;
          }
          content += `请生成大纲。`;
          console.log(content);
          const skeleton = await chatGPT(content);
          console.log(skeleton);
          const detail = await chatGPT(
            `${skeleton}\n请按照上面的结构，展开论述，每个章节在200到400字之间。`,
          );
          setFieldsValue({ result: detail });
        } catch (e) {
          console.log(e);
        }
      }

      const n = ref(2);

      function add() {
        n.value++;
        appendSchemaByField(
          {
            field: `section[${n.value}]`,
            component: 'Input',
            label: ' ',
            colProps: { span: 23 },
          },
          '',
        );

        appendSchemaByField(
          {
            field: `${n.value}`,
            component: 'Input',
            label: ' ',
            slot: 'add',
            labelWidth: 10,
            colProps: { span: 1 },
          },
          '',
        );
        removeSchemaByField(['0']);
        appendSchemaByField(
          {
            field: '0',
            component: 'Input',
            label: ' ',
            slot: 'add',
          },
          '',
        );
      }

      function del(field) {
        removeSchemaByField([`section[${field}]`, `${field}`]);
        if (Number(field) == n.value) n.value--;
      }

      return { register, handleSubmit, add, del };
    },
  });
</script>
