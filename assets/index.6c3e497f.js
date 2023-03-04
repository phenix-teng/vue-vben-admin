import{B as k}from"./BasicForm.c703c5dc.js";import{A as y}from"./componentMap.99e52708.js";import"./RadioButtonGroup.b23c9c8e.js";import{au as R,v as r,f as v,ah as b,k as c,a as M,cD as w,cV as _,bt as O,aw as s,o as V,j,z as t,n as i,E as G}from"./index.8bfc2406.js";import{P as q}from"./index.05733175.js";import{o as f}from"./select.2e800478.js";import{t as H}from"./tree.a460fac9.js";import{a as U}from"./cascader.07a164e4.js";/* empty css              *//* empty css              */import"./FormItem.vue_vue_type_script_lang.16438800.js";import"./index.9b0408e4.js";import"./index.3e06b937.js";import"./_baseIteratee.6bfb5377.js";import"./get.ba40285e.js";import"./DeleteOutlined.0cfcf4db.js";import"./index.1a265b20.js";import"./useRefs.952a3eb5.js";import"./Form.3195316c.js";import"./Col.c3e02293.js";import"./useFlexGapSupport.32b9a2c5.js";import"./useSize.abd6c9f0.js";import"./index.c8c59a17.js";import"./uniqBy.d922857d.js";import"./index.2fd97491.js";import"./useWindowSizeFn.ae2e5aa6.js";import"./FullscreenOutlined.1d658e9b.js";import"./index.1f31ee16.js";import"./index.a0887188.js";import"./Checkbox.563e3d22.js";import"./index.38f54cfd.js";import"./index.60f8c25f.js";import"./index.39db8959.js";import"./index.fc45f4f6.js";import"./index.bfdf79fa.js";import"./index.1aaa2bba.js";import"./useFormItem.1558b3aa.js";import"./index.92e23268.js";import"./eagerComputed.237d8d79.js";import"./transButton.b2c4a8a3.js";import"./index.e0a45074.js";import"./index.2b8ac3b8.js";import"./index.023d0e92.js";import"./isNumber.9d0def09.js";import"./uuid.2b29000c.js";import"./download.af3964fa.js";import"./base64Conver.08b9f4ec.js";import"./index.29d7a04d.js";import"./index.873f3e58.js";import"./index.106fdff5.js";import"./index.8e0b9901.js";import"./useContentViewHeight.8a8b4d06.js";import"./ArrowLeftOutlined.c9428594.js";import"./index.765ae9b5.js";const A=r([]),g=r([]),F=r([]);for(let e=1;e<10;e++)F.value.push({label:"\u9009\u9879"+e,value:`${e}`});const T=v(()=>b(c(F)).map(e=>(e.disabled=c(g).indexOf(e.value)!==-1,e))),$=v(()=>b(c(F)).map(e=>(e.disabled=c(A).indexOf(e.value)!==-1,e))),B=[{id:"guangdong",label:"\u5E7F\u4E1C\u7701",value:"1",key:"1"},{id:"jiangsu",label:"\u6C5F\u82CF\u7701",value:"2",key:"2"}],h={guangdong:[{label:"\u73E0\u6D77\u5E02",value:"1",key:"1"},{label:"\u6DF1\u5733\u5E02",value:"2",key:"2"},{label:"\u5E7F\u5DDE\u5E02",value:"3",key:"3"}],jiangsu:[{label:"\u5357\u4EAC\u5E02",value:"1",key:"1"},{label:"\u65E0\u9521\u5E02",value:"2",key:"2"},{label:"\u82CF\u5DDE\u5E02",value:"3",key:"3"}]},I=[{field:"divider-basic",component:"Divider",label:"\u57FA\u7840\u5B57\u6BB5",colProps:{span:24}},{field:"field1",component:"Input",label:"\u5B57\u6BB51",colProps:{span:8},componentProps:({schema:e,formModel:l})=>({placeholder:"\u81EA\u5B9A\u4E49placeholder",onChange:n=>{}}),renderComponentContent:()=>({prefix:()=>"pSlot",suffix:()=>"sSlot"})},{field:"field2",component:"Input",label:"\u5E26\u540E\u7F00",defaultValue:"111",colProps:{span:8},componentProps:{onChange:e=>{}},suffix:"\u5929"},{field:"field3",component:"DatePicker",label:"\u5B57\u6BB53",colProps:{span:8}},{field:"field4",component:"Select",label:"\u5B57\u6BB54",colProps:{span:8},componentProps:{options:[{label:"\u9009\u98791",value:"1",key:"1"},{label:"\u9009\u98792",value:"2",key:"2"}]}},{field:"field5",component:"CheckboxGroup",label:"\u5B57\u6BB55",colProps:{span:8},componentProps:{options:[{label:"\u9009\u98791",value:"1"},{label:"\u9009\u98792",value:"2"}]}},{field:"field7",component:"RadioGroup",label:"\u5B57\u6BB57",colProps:{span:8},componentProps:{options:[{label:"\u9009\u98791",value:"1"},{label:"\u9009\u98792",value:"2"}]}},{field:"field8",component:"Checkbox",label:"\u5B57\u6BB58",colProps:{span:8},renderComponentContent:"Check"},{field:"field9",component:"Switch",label:"\u5B57\u6BB59",colProps:{span:8}},{field:"field10",component:"RadioButtonGroup",label:"\u5B57\u6BB510",colProps:{span:8},componentProps:{options:[{label:"\u9009\u98791",value:"1"},{label:"\u9009\u98792",value:"2"}],onChange:(e,l)=>{}}},{field:"field11",component:"Cascader",label:"\u5B57\u6BB511",colProps:{span:8},componentProps:{options:[{value:"zhejiang",label:"Zhejiang",children:[{value:"hangzhou",label:"Hangzhou",children:[{value:"xihu",label:"West Lake"}]}]},{value:"jiangsu",label:"Jiangsu",children:[{value:"nanjing",label:"Nanjing",children:[{value:"zhonghuamen",label:"Zhong Hua Men"}]}]}]}},{field:"divider-api-select",component:"Divider",label:"\u8FDC\u7A0B\u4E0B\u62C9\u6F14\u793A",colProps:{span:24}},{field:"field30",component:"ApiSelect",label:"\u61D2\u52A0\u8F7D\u8FDC\u7A0B\u4E0B\u62C9",required:!0,componentProps:{api:f,params:{id:1},resultField:"list",labelField:"name",valueField:"id",immediate:!0,onChange:(e,l)=>{},onOptionsChange:e=>{}},colProps:{span:8},defaultValue:"0"},{field:"field8",component:"ApiCascader",label:"\u8054\u52A8ApiCascader",required:!0,colProps:{span:8},componentProps:{api:U,apiParamKey:"parentCode",dataField:"data",labelField:"name",valueField:"code",initFetchParams:{parentCode:""},isLeaf:e=>!(e.levelType<3),onChange:(e,...l)=>{}}},{field:"field31",component:"Input",label:"\u4E0B\u62C9\u672C\u5730\u641C\u7D22",helpMessage:["ApiSelect\u7EC4\u4EF6","\u8FDC\u7A0B\u6570\u636E\u6E90\u672C\u5730\u641C\u7D22","\u53EA\u53D1\u8D77\u4E00\u6B21\u8BF7\u6C42\u83B7\u53D6\u6240\u6709\u9009\u9879"],required:!0,slot:"localSearch",colProps:{span:8},defaultValue:"0"},{field:"field32",component:"Input",label:"\u4E0B\u62C9\u8FDC\u7A0B\u641C\u7D22",helpMessage:["ApiSelect\u7EC4\u4EF6","\u5C06\u5173\u952E\u8BCD\u53D1\u9001\u5230\u63A5\u53E3\u8FDB\u884C\u8FDC\u7A0B\u641C\u7D22"],required:!0,slot:"remoteSearch",colProps:{span:8},defaultValue:"0"},{field:"field33",component:"ApiTreeSelect",label:"\u8FDC\u7A0B\u4E0B\u62C9\u6811",helpMessage:["ApiTreeSelect\u7EC4\u4EF6","\u4F7F\u7528\u63A5\u53E3\u63D0\u4F9B\u7684\u6570\u636E\u751F\u6210\u9009\u9879"],required:!0,componentProps:{api:H,resultField:"list",onChange:(e,l)=>{}},colProps:{span:8}},{field:"field34",component:"ApiRadioGroup",label:"\u8FDC\u7A0BRadio",helpMessage:["ApiRadioGroup\u7EC4\u4EF6","\u4F7F\u7528\u63A5\u53E3\u63D0\u4F9B\u7684\u6570\u636E\u751F\u6210\u9009\u9879"],required:!0,componentProps:{api:f,params:{count:2},resultField:"list",labelField:"name",valueField:"id"},defaultValue:"1",colProps:{span:8}},{field:"field35",component:"ApiRadioGroup",label:"\u8FDC\u7A0BRadio",helpMessage:["ApiRadioGroup\u7EC4\u4EF6","\u4F7F\u7528\u63A5\u53E3\u63D0\u4F9B\u7684\u6570\u636E\u751F\u6210\u9009\u9879"],required:!0,componentProps:{api:f,params:{count:2},resultField:"list",labelField:"name",valueField:"id",isBtn:!0,onChange:(e,l)=>{}},colProps:{span:8}},{field:"divider-linked",component:"Divider",label:"\u5B57\u6BB5\u8054\u52A8",colProps:{span:24}},{field:"province",component:"Select",label:"\u7701\u4EFD",colProps:{span:8},componentProps:({formModel:e,formActionType:l})=>({options:B,placeholder:"\u7701\u4EFD\u4E0E\u57CE\u5E02\u8054\u52A8",onChange:n=>{let p=n==1?h[B[0].id]:h[B[1].id];n===void 0&&(p=[]),e.city=void 0;const{updateSchema:d}=l;d({field:"city",componentProps:{options:p}})}})},{field:"city",component:"Select",label:"\u57CE\u5E02",colProps:{span:8},componentProps:{options:[],placeholder:"\u7701\u4EFD\u4E0E\u57CE\u5E02\u8054\u52A8"}},{field:"divider-selects",component:"Divider",label:"\u4E92\u65A5\u591A\u9009",helpMessage:["\u4E24\u4E2ASelect\u5171\u7528\u6570\u636E\u6E90","\u4F46\u4E0D\u53EF\u9009\u62E9\u5BF9\u65B9\u5DF2\u9009\u4E2D\u7684\u9879\u76EE"],colProps:{span:24}},{field:"selectA",component:"Select",label:"\u4E92\u65A5SelectA",slot:"selectA",defaultValue:[],colProps:{span:8}},{field:"selectB",component:"Select",label:"\u4E92\u65A5SelectB",slot:"selectB",defaultValue:[],colProps:{span:8}},{field:"divider-deconstruct",component:"Divider",label:"\u5B57\u6BB5\u89E3\u6784",helpMessage:["\u5982\u679C\u7EC4\u4EF6\u7684\u503C\u662F array \u6216\u8005 object","\u53EF\u4EE5\u6839\u636E ES6 \u7684\u89E3\u6784\u8BED\u6CD5\u5206\u522B\u53D6\u503C"],colProps:{span:24}},{field:"[startTime, endTime]",label:"\u65F6\u95F4\u8303\u56F4",component:"RangePicker",componentProps:{format:"YYYY-MM-DD HH:mm:ss",placeholder:["\u5F00\u59CB\u65F6\u95F4","\u7ED3\u675F\u65F6\u95F4"],showTime:{format:"HH:mm:ss"}}},{field:"divider-others",component:"Divider",label:"\u5176\u5B83",colProps:{span:24}},{field:"field20",component:"InputNumber",label:"\u5B57\u6BB520",required:!0,colProps:{span:8}},{field:"field21",component:"Slider",label:"\u5B57\u6BB521",componentProps:{min:0,max:100,range:!0,marks:{20:"20\xB0C",60:"60\xB0C"}},colProps:{span:8}},{field:"field22",component:"Rate",label:"\u5B57\u6BB522",defaultValue:3,colProps:{span:8},componentProps:{disabled:!1,allowHalf:!0}}],L=M({components:{BasicForm:k,CollapseContainer:w,PageWrapper:q,ApiSelect:y,ASelect:_},setup(){const e=r(null),{createMessage:l}=G(),n=r(""),p=v(()=>({keyword:c(n)}));function d(m){n.value=m}return{schemas:I,optionsListApi:f,optionsA:T,optionsB:$,valueSelectA:A,valueSelectB:g,onSearch:O(d,300),searchParams:p,handleReset:()=>{n.value=""},handleSubmit:m=>{l.success("click search,values:"+JSON.stringify(m))},check:e}}});function x(e,l,n,p,d,m){const E=s("a-select"),C=s("ApiSelect"),P=s("BasicForm"),D=s("CollapseContainer"),S=s("PageWrapper");return V(),j(S,{title:"\u8868\u5355\u57FA\u7840\u793A\u4F8B",contentFullHeight:""},{default:t(()=>[i(D,{title:"\u57FA\u7840\u793A\u4F8B"},{default:t(()=>[i(P,{autoFocusFirstItem:"",labelWidth:200,schemas:e.schemas,actionColOptions:{span:24},onSubmit:e.handleSubmit,onReset:e.handleReset},{selectA:t(({model:o,field:u})=>[i(E,{options:e.optionsA,mode:"multiple",value:o[u],"onUpdate:value":a=>o[u]=a,onChange:a=>e.valueSelectA=o[u],allowClear:""},null,8,["options","value","onUpdate:value","onChange"])]),selectB:t(({model:o,field:u})=>[i(E,{options:e.optionsB,mode:"multiple",value:o[u],"onUpdate:value":a=>o[u]=a,onChange:a=>e.valueSelectB=o[u],allowClear:""},null,8,["options","value","onUpdate:value","onChange"])]),localSearch:t(({model:o,field:u})=>[i(C,{api:e.optionsListApi,showSearch:"",value:o[u],"onUpdate:value":a=>o[u]=a,optionFilterProp:"label",resultField:"list",labelField:"name",valueField:"id"},null,8,["api","value","onUpdate:value"])]),remoteSearch:t(({model:o,field:u})=>[i(C,{api:e.optionsListApi,showSearch:"",value:o[u],"onUpdate:value":a=>o[u]=a,filterOption:!1,resultField:"list",labelField:"name",valueField:"id",params:e.searchParams,onSearch:e.onSearch},null,8,["api","value","onUpdate:value","params","onSearch"])]),_:1},8,["schemas","onSubmit","onReset"])]),_:1})]),_:1})}var ze=R(L,[["render",x]]);export{ze as default};
