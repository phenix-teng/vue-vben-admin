var l=(u,a,o)=>new Promise((r,p)=>{var n=e=>{try{i(o.next(e))}catch(m){p(m)}},s=e=>{try{i(o.throw(e))}catch(m){p(m)}},i=e=>e.done?r(e.value):Promise.resolve(e.value).then(n,s);i((o=o.apply(u,a)).next())});import{B as F}from"./BasicForm.c703c5dc.js";import"./componentMap.99e52708.js";import{u as d}from"./useForm.2f109964.js";import"./RadioButtonGroup.b23c9c8e.js";import{au as B,a as E,aw as c,o as C,j as b,z as f,n as A,E as _}from"./index.8bfc2406.js";import{P as g}from"./index.05733175.js";/* empty css              *//* empty css              */import"./FormItem.vue_vue_type_script_lang.16438800.js";import"./index.9b0408e4.js";import"./index.3e06b937.js";import"./_baseIteratee.6bfb5377.js";import"./get.ba40285e.js";import"./DeleteOutlined.0cfcf4db.js";import"./index.1a265b20.js";import"./useRefs.952a3eb5.js";import"./Form.3195316c.js";import"./Col.c3e02293.js";import"./useFlexGapSupport.32b9a2c5.js";import"./useSize.abd6c9f0.js";import"./index.c8c59a17.js";import"./uniqBy.d922857d.js";import"./index.2fd97491.js";import"./useWindowSizeFn.ae2e5aa6.js";import"./FullscreenOutlined.1d658e9b.js";import"./index.1f31ee16.js";import"./index.a0887188.js";import"./Checkbox.563e3d22.js";import"./index.38f54cfd.js";import"./index.60f8c25f.js";import"./index.39db8959.js";import"./index.fc45f4f6.js";import"./index.bfdf79fa.js";import"./index.1aaa2bba.js";import"./useFormItem.1558b3aa.js";import"./index.92e23268.js";import"./eagerComputed.237d8d79.js";import"./transButton.b2c4a8a3.js";import"./index.e0a45074.js";import"./index.2b8ac3b8.js";import"./index.023d0e92.js";import"./isNumber.9d0def09.js";import"./uuid.2b29000c.js";import"./download.af3964fa.js";import"./base64Conver.08b9f4ec.js";import"./index.29d7a04d.js";import"./index.873f3e58.js";import"./index.106fdff5.js";import"./index.8e0b9901.js";import"./useContentViewHeight.8a8b4d06.js";import"./ArrowLeftOutlined.c9428594.js";import"./index.765ae9b5.js";const t={span:8},P=[{field:"title",component:"Input",label:"\u6807\u9898",colProps:t,componentProps:{placeholder:"\u7ED9\u76EE\u6807\u8D77\u4E2A\u540D\u5B57"},required:!0},{field:"time",component:"RangePicker",label:"\u8D77\u6B62\u65E5\u671F",colProps:t,required:!0},{field:"client",component:"Input",colProps:t,label:"\u5BA2\u6237",helpMessage:"\u76EE\u6807\u7684\u670D\u52A1\u5BF9\u8C61",subLabel:"( \u9009\u586B )",componentProps:{placeholder:"\u8BF7\u63CF\u8FF0\u4F60\u670D\u52A1\u7684\u5BA2\u6237\uFF0C\u5185\u90E8\u5BA2\u6237\u76F4\u63A5 @\u59D3\u540D\uFF0F\u5DE5\u53F7"}},{field:"weights",component:"InputNumber",label:"\u6743\u91CD",colProps:t,subLabel:"( \u9009\u586B )",componentProps:{formatter:u=>u?`${u}%`:"",parser:u=>u.replace("%",""),placeholder:"\u8BF7\u8F93\u5165"}},{field:"target",component:"InputTextArea",label:"\u76EE\u6807\u63CF\u8FF0",colProps:t,componentProps:{placeholder:"\u8BF7\u8F93\u5165\u4F60\u7684\u9636\u6BB5\u6027\u5DE5\u4F5C\u76EE\u6807",rows:4},required:!0},{field:"metrics",component:"InputTextArea",label:"\u8861\u91CF\u6807\u51C6",colProps:t,componentProps:{placeholder:"\u8BF7\u8F93\u5165\u8861\u91CF\u6807\u51C6",rows:4},required:!0},{field:"inviteer",component:"Input",label:"\u9080\u8BC4\u4EBA",colProps:{span:8},subLabel:"( \u9009\u586B )",componentProps:{placeholder:"\u8BF7\u76F4\u63A5 @\u59D3\u540D\uFF0F\u5DE5\u53F7\uFF0C\u6700\u591A\u53EF\u9080\u8BF7 5 \u4EBA"}},{field:"disclosure",component:"RadioGroup",label:"\u76EE\u6807\u516C\u5F00",colProps:{span:16},itemProps:{extra:"\u5BA2\u6237\u3001\u9080\u8BC4\u4EBA\u9ED8\u8BA4\u88AB\u5206\u4EAB"},componentProps:{options:[{label:"\u516C\u5F00",value:"1"},{label:"\u90E8\u5206\u516C\u5F00",value:"2"},{label:"\u4E0D\u516C\u5F00",value:"3"}]}},{field:"disclosure",component:"Select",label:" ",colProps:{span:8},show:({model:u})=>u.disclosure==="2",componentProps:{placeholder:"\u516C\u5F00\u7ED9",mode:"multiple",options:[{label:"\u540C\u4E8B1",value:"1"},{label:"\u540C\u4E8B2",value:"2"},{label:"\u540C\u4E8B3",value:"3"}]}}];const D=E({name:"FormBasicPage",components:{BasicForm:F,PageWrapper:g},setup(){const{createMessage:u}=_(),[a,{validate:o,setProps:r}]=d({labelCol:{span:8},wrapperCol:{span:15},schemas:P,actionColOptions:{offset:8,span:23},submitButtonOptions:{text:"\u63D0\u4EA4"},submitFunc:p});function p(){return l(this,null,function*(){try{yield o(),r({submitButtonOptions:{loading:!0}}),setTimeout(()=>{r({submitButtonOptions:{loading:!1}}),u.success("\u63D0\u4EA4\u6210\u529F\uFF01")},2e3)}catch(n){}})}return{register:a}}});function h(u,a,o,r,p,n){const s=c("BasicForm"),i=c("PageWrapper");return C(),b(i,{title:"\u57FA\u7840\u8868\u5355",contentBackground:"",content:" \u8868\u5355\u9875\u7528\u4E8E\u5411\u7528\u6237\u6536\u96C6\u6216\u9A8C\u8BC1\u4FE1\u606F\uFF0C\u57FA\u7840\u8868\u5355\u5E38\u89C1\u4E8E\u6570\u636E\u9879\u8F83\u5C11\u7684\u8868\u5355\u573A\u666F\u3002",contentClass:"p-4"},{default:f(()=>[A(s,{onRegister:u.register},null,8,["onRegister"])]),_:1})}var hu=B(D,[["render",h],["__scopeId","data-v-49ea136a"]]);export{hu as default};
