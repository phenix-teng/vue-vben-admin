var l=(o,s,r)=>new Promise((c,n)=>{var d=t=>{try{e(r.next(t))}catch(m){n(m)}},a=t=>{try{e(r.throw(t))}catch(m){n(m)}},e=t=>t.done?c(t.value):Promise.resolve(t.value).then(d,a);e((r=r.apply(o,s)).next())});import{a as C,cD as g,C as h,s as B,N as F,f as A,au as b,E as w,aw as p,o as I,j as S,z as u,n as i,i as _,B as y,fh as k,fi as E}from"./index.8bfc2406.js";/* empty css              */import{B as R}from"./BasicForm.c703c5dc.js";import"./componentMap.99e52708.js";import{u as x}from"./useForm.2f109964.js";import"./RadioButtonGroup.b23c9c8e.js";import{a as N}from"./index.527924de.js";import{h as U}from"./header.d801b988.js";import{a as V}from"./account.e757e1a1.js";import{b as $}from"./data.08d7c751.js";import{u as M}from"./upload.d2ff6528.js";import{R as T}from"./index.1f31ee16.js";import{C as j}from"./index.c8c59a17.js";/* empty css              */import"./FormItem.vue_vue_type_script_lang.16438800.js";import"./index.9b0408e4.js";import"./index.3e06b937.js";import"./_baseIteratee.6bfb5377.js";import"./get.ba40285e.js";import"./DeleteOutlined.0cfcf4db.js";import"./index.1a265b20.js";import"./useRefs.952a3eb5.js";import"./Form.3195316c.js";import"./Col.c3e02293.js";import"./useFlexGapSupport.32b9a2c5.js";import"./useSize.abd6c9f0.js";import"./uniqBy.d922857d.js";import"./index.2fd97491.js";import"./useWindowSizeFn.ae2e5aa6.js";import"./FullscreenOutlined.1d658e9b.js";import"./index.a0887188.js";import"./Checkbox.563e3d22.js";import"./index.38f54cfd.js";import"./index.60f8c25f.js";import"./index.39db8959.js";import"./index.fc45f4f6.js";import"./index.bfdf79fa.js";import"./index.1aaa2bba.js";import"./useFormItem.1558b3aa.js";import"./index.92e23268.js";import"./eagerComputed.237d8d79.js";import"./transButton.b2c4a8a3.js";import"./index.e0a45074.js";import"./index.2b8ac3b8.js";import"./index.023d0e92.js";import"./isNumber.9d0def09.js";import"./uuid.2b29000c.js";import"./download.af3964fa.js";import"./base64Conver.08b9f4ec.js";import"./index.29d7a04d.js";import"./index.873f3e58.js";import"./index.8e0b9901.js";import"./index.765ae9b5.js";const z=C({components:{BasicForm:R,CollapseContainer:g,Button:h,ARow:T,ACol:j,CropperAvatar:N},setup(){const{createMessage:o}=w(),s=B(),[r,{setFieldsValue:c}]=x({labelWidth:120,schemas:$,showActionButtonGroup:!1});F(()=>l(this,null,function*(){const a=yield V();c(a)}));const n=A(()=>{const{avatar:a}=s.getUserInfo;return a||U});function d({src:a,data:e}){const t=s.getUserInfo;t.avatar=a,s.setUserInfo(t)}return{avatar:n,register:r,uploadApi:M,updateAvatar:d,handleSubmit:()=>{o.success("\u66F4\u65B0\u6210\u529F\uFF01")}}}}),D=o=>(k("data-v-8891ad62"),o=o(),E(),o),G={class:"change-avatar"},P=D(()=>_("div",{class:"mb-2"},"\u5934\u50CF",-1));function W(o,s,r,c,n,d){const a=p("BasicForm"),e=p("a-col"),t=p("CropperAvatar"),m=p("a-row"),f=p("Button"),v=p("CollapseContainer");return I(),S(v,{title:"\u57FA\u672C\u8BBE\u7F6E",canExpan:!1},{default:u(()=>[i(m,{gutter:24},{default:u(()=>[i(e,{span:14},{default:u(()=>[i(a,{onRegister:o.register},null,8,["onRegister"])]),_:1}),i(e,{span:10},{default:u(()=>[_("div",G,[P,i(t,{uploadApi:o.uploadApi,value:o.avatar,btnText:"\u66F4\u6362\u5934\u50CF",btnProps:{preIcon:"ant-design:cloud-upload-outlined"},onChange:o.updateAvatar,width:"150"},null,8,["uploadApi","value","onChange"])])]),_:1})]),_:1}),i(f,{type:"primary",onClick:o.handleSubmit},{default:u(()=>[y(" \u66F4\u65B0\u57FA\u672C\u4FE1\u606F ")]),_:1},8,["onClick"])]),_:1})}var Ho=b(z,[["render",W],["__scopeId","data-v-8891ad62"]]);export{Ho as default};
