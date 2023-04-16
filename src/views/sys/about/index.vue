<template>
  <PageWrapper title="关于">
    <template #headerContent>
      <h1>欢迎使用我们的AI写作平台</h1>
      <p
        >我们的网站是一个基于人工智能技术的写作平台，为学生、学者和政府工作人员提供高质量、原创的论文、提案和工作报告。我们的AI系统可以快速处理大量数据，从而生成具有创新性和可靠性的作品。</p
      >
      <h2>我们的特点</h2>
      <ul>
        <li>高效性：我们的AI系统可以在短时间内生成大量的作品，从而节省时间和人力成本。</li>
        <li
          >创新性：由于AI系统可以模仿人类的创作思维和风格，因此可以生成具有创新性的作品，为学术界和政府部门带来新的可能性。</li
        >
        <li
          >可靠性：我们的AI系统可以自动检测和修复语法错误和逻辑问题，从而确保作品的质量和可靠性。</li
        >
        <li>安全性：我们的网站严格遵守相关法律法规，保护用户的隐私和知识产权。</li>
      </ul>
      <h2>适用范围</h2>
      <p>我们的网站适用于各种类型的论文、提案和工作报告，包括但不限于：</p>
      <ul>
        <li>学术论文</li>
        <li>科研论文</li>
        <li>申请文书</li>
        <li>政策提案</li>
        <li>工作报告</li>
        <li>项目计划</li>
      </ul>
      <p
        >我们相信，我们的网站将成为学术界和政府部门的重要工具，帮助用户更高效、更创新地进行工作和决策。</p
      >
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { h } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { GITHUB_URL, SITE_URL, DOC_URL } from '/@/settings/siteSetting';

  const { pkg, lastBuildTime } = __APP_INFO__;

  const { dependencies, devDependencies, name, version } = pkg;

  const schema: DescItem[] = [];
  const devSchema: DescItem[] = [];

  const commonTagRender = (color: string) => (curVal) => h(Tag, { color }, () => curVal);
  const commonLinkRender = (text: string) => (href) => h('a', { href, target: '_blank' }, text);

  const infoSchema: DescItem[] = [
    {
      label: '版本',
      field: 'version',
      render: commonTagRender('blue'),
    },
    {
      label: '最后编译时间',
      field: 'lastBuildTime',
      render: commonTagRender('blue'),
    },
    {
      label: '文档地址',
      field: 'doc',
      render: commonLinkRender('文档地址'),
    },
    {
      label: '预览地址',
      field: 'preview',
      render: commonLinkRender('预览地址'),
    },
    {
      label: 'Github',
      field: 'github',
      render: commonLinkRender('Github'),
    },
  ];

  const infoData = {
    version,
    lastBuildTime,
    doc: DOC_URL,
    preview: SITE_URL,
    github: GITHUB_URL,
  };

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: key });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: key });
  });

  const [register] = useDescription({
    title: '生产环境依赖',
    data: dependencies,
    schema: schema,
    column: 3,
  });

  const [registerDev] = useDescription({
    title: '开发环境依赖',
    data: devDependencies,
    schema: devSchema,
    column: 3,
  });

  const [infoRegister] = useDescription({
    title: '项目信息',
    data: infoData,
    schema: infoSchema,
    column: 2,
  });
</script>
