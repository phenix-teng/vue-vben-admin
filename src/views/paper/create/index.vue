<template>
  <PageWrapper title="创作论文" contentBackground content=" " contentClass="p-4">
    <div class="step-form-form">
      <a-steps :current="current">
        <a-step title="选择主题" />
        <a-step title="创建大纲" />
        <a-step title="生成初稿" />
        <a-step title="修改定稿" />
      </a-steps>
    </div>
    <div class="mt-5">
      <Step1 :paper="paper" v-show="current === 0" @next="handleStep1Next" />
      <Step2
        :paper="paper"
        v-show="current === 1"
        @prev="handleStep2Prev"
        @next="handleStep2Next"
      />
      <Step3
        :paper="paper"
        v-show="current === 2"
        @prev="handleStep3Prev"
        @next="handleStep3Next"
      />
      <Step4 :paper="paper" v-show="current === 3" @prev="handleStep4Prev" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Step1 from './Subject.vue';
  import Step2 from './Outline.vue';
  import Step3 from './Draft.vue';
  import Step4 from './Revision.vue';
  import { PageWrapper } from '/@/components/Page';
  import { Steps } from 'ant-design-vue';
  import { PaperInfo } from '../usePaper';

  export default defineComponent({
    name: 'FormStepPage',
    components: {
      Step1,
      Step2,
      Step3,
      Step4,
      PageWrapper,
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
    },
    setup() {
      const current = ref(0);

      const paper = ref<PaperInfo>({
        messages: [],
        subject: '',
        outline: '',
        body: '',
      });

      function handleStep1Next(step1Values: any) {
        //console.log(step1Values);
        //console.log(outline);
        paper.value.subject = step1Values.subject;
        current.value++;
      }

      function handleStep2Prev() {
        current.value--;
      }

      function handleStep2Next(step2Values: any) {
        //console.log(step2Values);
        paper.value.subject = step2Values.subject;
        paper.value.outline = step2Values.outline;
        //paper.value.body = body;
        current.value++;
      }

      function handleStep3Prev() {
        current.value--;
      }

      function handleStep3Next(step3Values: any) {
        //console.log(step2Values);
        paper.value.body = step3Values.body;
        current.value++;
      }

      function handleStep4Prev() {
        current.value--;
      }

      return {
        current,
        handleStep1Next,
        handleStep2Prev,
        handleStep2Next,
        handleStep3Prev,
        handleStep3Next,
        handleStep4Prev,
        //...toRefs(paper),
        paper,
      };
    },
  });
</script>
<style lang="less" scoped>
  .step-form-content {
    padding: 24px;
    background-color: @component-background;
  }

  .step-form-form {
    width: 750px;
    margin: 0 auto;
  }
</style>
