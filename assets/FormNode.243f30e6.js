var I=Object.defineProperty,g=Object.defineProperties;var C=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var s=(o,e,t)=>e in o?I(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,a=(o,e)=>{for(var t in e||(e={}))F.call(e,t)&&s(o,t,e[t]);if(p)for(var t of p(e))v.call(e,t)&&s(o,t,e[t]);return o},n=(o,e)=>g(o,C(e));import{a as b,w as N,bc as S,au as k,aw as c,o as y,h as V,i as l,n as f,t as w,q as O,bl as $}from"./index.8bfc2406.js";import B from"./FormNodeOperate.7085a82c.js";import{u as D}from"./useFormDesignState.3ca1915c.js";import _ from"./index.debe8c26.js";import"./index.5f69dd53.js";import"./isNumber.9d0def09.js";import"./formItemConfig.6b8cc47b.js";import"./componentMap.99e52708.js";import"./index.a0887188.js";import"./Checkbox.563e3d22.js";import"./index.38f54cfd.js";import"./index.60f8c25f.js";import"./index.39db8959.js";import"./index.fc45f4f6.js";import"./index.bfdf79fa.js";import"./index.1aaa2bba.js";import"./index.9b0408e4.js";import"./useFormItem.1558b3aa.js";import"./RadioButtonGroup.b23c9c8e.js";import"./get.ba40285e.js";import"./index.92e23268.js";import"./eagerComputed.237d8d79.js";import"./index.3e06b937.js";import"./_baseIteratee.6bfb5377.js";import"./DeleteOutlined.0cfcf4db.js";import"./index.1a265b20.js";import"./useRefs.952a3eb5.js";import"./Form.3195316c.js";import"./Col.c3e02293.js";import"./useFlexGapSupport.32b9a2c5.js";import"./useSize.abd6c9f0.js";import"./transButton.b2c4a8a3.js";import"./index.e0a45074.js";import"./index.2fd97491.js";import"./useWindowSizeFn.ae2e5aa6.js";import"./FullscreenOutlined.1d658e9b.js";import"./index.2b8ac3b8.js";import"./index.023d0e92.js";import"./uuid.2b29000c.js";import"./download.af3964fa.js";import"./base64Conver.08b9f4ec.js";import"./index.29d7a04d.js";import"./index.873f3e58.js";/* empty css              */import"./index.c8c59a17.js";const q=b({name:"FormNode",components:{VFormItem:_,FormNodeOperate:B},props:{schema:{type:Object,required:!0}},setup(o){const{formConfig:e,formDesignMethods:t}=D(),r=N({}),m=()=>{t.handleSetSelectItem(o.schema)};return n(a({},S(r)),{handleSelectItem:m,formConfig:e})}}),M={class:"form-item-box"},j={class:"show-key-box"};function z(o,e,t,r,m,E){var i;const d=c("VFormItem"),h=c("FormNodeOperate");return y(),V("div",{class:O(["drag-move-box",{active:o.schema.key===((i=o.formConfig.currentItem)==null?void 0:i.key)}]),onClick:e[0]||(e[0]=$((...u)=>o.handleSelectItem&&o.handleSelectItem(...u),["stop"]))},[l("div",M,[f(d,{formConfig:o.formConfig,schema:o.schema},null,8,["formConfig","schema"])]),l("div",j,w(o.schema.label+(o.schema.field?"/"+o.schema.field:"")),1),f(h,{schema:o.schema,currentItem:o.formConfig.currentItem},null,8,["schema","currentItem"])],2)}var Do=k(q,[["render",z]]);export{Do as default};
