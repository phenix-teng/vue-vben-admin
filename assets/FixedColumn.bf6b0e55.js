import{B as l}from"./TableImg.b12ad0d6.js";import{k as d}from"./componentMap.99e52708.js";import{u as s}from"./useTable.844d3353.js";import{d as c}from"./table.024fac98.js";import{au as F,a as b,aw as m,o as n,h as f,n as h,z as B,j as A,l as C}from"./index.8bfc2406.js";import"./index.a0887188.js";import"./Checkbox.563e3d22.js";import"./index.38f54cfd.js";import"./index.92e23268.js";import"./eagerComputed.237d8d79.js";import"./BasicForm.c703c5dc.js";/* empty css              *//* empty css              */import"./FormItem.vue_vue_type_script_lang.16438800.js";import"./index.9b0408e4.js";import"./index.3e06b937.js";import"./_baseIteratee.6bfb5377.js";import"./get.ba40285e.js";import"./DeleteOutlined.0cfcf4db.js";import"./index.1a265b20.js";import"./useRefs.952a3eb5.js";import"./Form.3195316c.js";import"./Col.c3e02293.js";import"./useFlexGapSupport.32b9a2c5.js";import"./useSize.abd6c9f0.js";import"./index.c8c59a17.js";import"./uniqBy.d922857d.js";import"./index.2fd97491.js";import"./useWindowSizeFn.ae2e5aa6.js";import"./FullscreenOutlined.1d658e9b.js";import"./index.1f31ee16.js";import"./useForm.2f109964.js";import"./RadioButtonGroup.b23c9c8e.js";import"./useFormItem.1558b3aa.js";import"./index.05733175.js";import"./index.106fdff5.js";import"./index.8e0b9901.js";import"./useContentViewHeight.8a8b4d06.js";import"./ArrowLeftOutlined.c9428594.js";import"./index.765ae9b5.js";import"./transButton.b2c4a8a3.js";import"./index.fc45f4f6.js";import"./index.bfdf79fa.js";import"./index.39db8959.js";import"./index.60f8c25f.js";import"./uuid.2b29000c.js";import"./sortable.esm.2632adaa.js";import"./RedoOutlined.785e845c.js";import"./index.023d0e92.js";import"./isNumber.9d0def09.js";import"./fromPairs.84aabb58.js";import"./scrollTo.c9fac0e7.js";import"./index.cefde1d0.js";import"./index.1aaa2bba.js";import"./index.e0a45074.js";import"./index.2b8ac3b8.js";import"./download.af3964fa.js";import"./base64Conver.08b9f4ec.js";import"./index.29d7a04d.js";import"./index.873f3e58.js";const T=[{title:"ID",dataIndex:"id",fixed:"left",width:280},{title:"\u59D3\u540D",dataIndex:"name",width:260},{title:"\u5730\u5740",dataIndex:"address"},{title:"\u7F16\u53F7",dataIndex:"no",width:300},{title:"\u5F00\u59CB\u65F6\u95F4",width:200,dataIndex:"beginTime"},{title:"\u7ED3\u675F\u65F6\u95F4",dataIndex:"endTime",width:200}],_=b({components:{BasicTable:l,TableAction:d},setup(){const[t]=s({title:"TableAction\u7EC4\u4EF6\u53CA\u56FA\u5B9A\u5217\u793A\u4F8B",api:c,columns:T,rowSelection:{type:"radio"},bordered:!0,actionColumn:{width:160,title:"Action",dataIndex:"action"}});function o(e){}function i(e){}return{registerTable:t,handleDelete:o,handleOpen:i}}}),w={class:"p-4"};function x(t,o,i,e,D,I){const p=m("TableAction"),a=m("BasicTable");return n(),f("div",w,[h(a,{onRegister:t.registerTable},{bodyCell:B(({column:u,record:r})=>[u.key==="action"?(n(),A(p,{key:0,actions:[{label:"\u5220\u9664",icon:"ic:outline-delete-outline",onClick:t.handleDelete.bind(null,r)}],dropDownActions:[{label:"\u542F\u7528",popConfirm:{title:"\u662F\u5426\u542F\u7528\uFF1F",confirm:t.handleOpen.bind(null,r)}}]},null,8,["actions","dropDownActions"])):C("",!0)]),_:1},8,["onRegister"])])}var Nt=F(_,[["render",x]]);export{Nt as default};
