var p=Object.defineProperty,u=Object.defineProperties;var c=Object.getOwnPropertyDescriptors;var s=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var r=(e,o,t)=>o in e?p(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,n=(e,o)=>{for(var t in o||(o={}))f.call(o,t)&&r(e,t,o[t]);if(s)for(var t of s(o))v.call(o,t)&&r(e,t,o[t]);return e},i=(e,o)=>u(e,c(o));import{r as b,a as C}from"./index.5f69dd53.js";import w from"./PreviewCode.0aea3237.js";import{a as D,dG as _,w as h,f as M,bc as A,au as J,aw as l,o as V,j as $,z as j,n as x}from"./index.8bfc2406.js";import"./isNumber.9d0def09.js";import"./index.9de5d5f5.js";import"./useWindowSizeFn.ae2e5aa6.js";const y=`<template>
  <div>
    <v-form-create
      :formConfig="formConfig"
      :formData="formData"
      v-model="fApi"
    />
    <a-button @click="submit">\u63D0\u4EA4</a-button>
  </div>
</template>
<script>

export default {
  name: 'Demo',
  data () {
    return {
      fApi:{},
      formData:{},
      formConfig: `;let g=`
    }
  },
  methods: {
    async submit() {
      const data = await this.fApi.submit()
      console.log(data)
     }
  }
}
<\/script>`;const k=D({name:"CodeModal",components:{PreviewCode:w,Modal:_},setup(){const e=h({visible:!1,jsonData:{}}),o=a=>{a.schemas&&C(a.schemas),e.visible=!0,e.jsonData=a},t=M(()=>y+JSON.stringify(b(e.jsonData),null,"	")+g);return i(n({},A(e)),{editorVueJson:t,showModal:o})}});function E(e,o,t,a,N,P){const d=l("PreviewCode"),m=l("Modal");return V(),$(m,{title:"\u4EE3\u7801",footer:null,visible:e.visible,onCancel:o[0]||(o[0]=B=>e.visible=!1),wrapClassName:"v-code-modal",style:{top:"20px"},width:"850px",destroyOnClose:!0},{default:j(()=>[x(d,{editorJson:e.editorVueJson,fileFormat:"vue"},null,8,["editorJson"])]),_:1},8,["visible"])}var q=J(k,[["render",E]]);export{q as default};
