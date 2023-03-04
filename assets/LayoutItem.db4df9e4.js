var P=Object.defineProperty,L=Object.defineProperties;var R=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var v=(e,o,t)=>o in e?P(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,C=(e,o)=>{for(var t in o||(o={}))z.call(o,t)&&v(e,t,o[t]);if(f)for(var t of f(o))O.call(o,t)&&v(e,t,o[t]);return e},$=(e,o)=>L(e,R(o));import{a as V,w as A,f as d,bc as B,au as D,aw as a,o as n,j as u,z as i,h as b,q as H,bl as j,n as s,ax as k,F as q,az as M,aB as U,aC as E}from"./index.8bfc2406.js";import{d as G}from"./vuedraggable.umd.026d52d3.js";import T from"./FormNode.243f30e6.js";import _ from"./FormNodeOperate.7085a82c.js";import{u as J}from"./useFormDesignState.3ca1915c.js";/* empty css              */import{R as K}from"./index.1f31ee16.js";import{C as Q}from"./index.c8c59a17.js";import"./index.debe8c26.js";import"./formItemConfig.6b8cc47b.js";import"./componentMap.99e52708.js";import"./index.a0887188.js";import"./Checkbox.563e3d22.js";import"./index.38f54cfd.js";import"./index.60f8c25f.js";import"./index.39db8959.js";import"./index.fc45f4f6.js";import"./index.bfdf79fa.js";import"./index.1aaa2bba.js";import"./index.9b0408e4.js";import"./useFormItem.1558b3aa.js";import"./RadioButtonGroup.b23c9c8e.js";import"./get.ba40285e.js";import"./index.92e23268.js";import"./eagerComputed.237d8d79.js";import"./index.3e06b937.js";import"./_baseIteratee.6bfb5377.js";import"./DeleteOutlined.0cfcf4db.js";import"./index.1a265b20.js";import"./useRefs.952a3eb5.js";import"./Form.3195316c.js";import"./Col.c3e02293.js";import"./useFlexGapSupport.32b9a2c5.js";import"./useSize.abd6c9f0.js";import"./transButton.b2c4a8a3.js";import"./index.e0a45074.js";import"./index.2fd97491.js";import"./useWindowSizeFn.ae2e5aa6.js";import"./FullscreenOutlined.1d658e9b.js";import"./index.2b8ac3b8.js";import"./index.023d0e92.js";import"./isNumber.9d0def09.js";import"./uuid.2b29000c.js";import"./download.af3964fa.js";import"./base64Conver.08b9f4ec.js";import"./index.29d7a04d.js";import"./index.873f3e58.js";import"./index.5f69dd53.js";const W=V({name:"LayoutItem",components:{FormNode:T,FormNodeOperate:_,draggable:G,Row:K,Col:Q},props:{schema:{type:Object,required:!0},currentItem:{type:Object,required:!0}},emits:["dragStart","handleColAdd","handle-copy","handle-delete"],setup(e){const{formDesignMethods:{handleSetSelectItem:o},formConfig:t}=J(),c=A({}),h=d(()=>{const{colProps:l={}}=e.schema;return l}),g=d(()=>e.schema.columns),p=d(()=>t.value.layout==="horizontal"?"Col":"div");return $(C({},B(c)),{colPropsComputed:h,handleSetSelectItem:o,layoutTag:p,list1:g})}});function X(e,o,t,c,h,g){const p=a("LayoutItem",!0),l=a("draggable"),y=a("Col"),w=a("Row"),I=a("FormNodeOperate"),F=a("FormNode");return n(),u(y,U(E(e.colPropsComputed)),{default:i(()=>[["Grid"].includes(e.schema.component)?(n(),b("div",{key:0,class:H(["grid-box",{active:e.schema.key===e.currentItem.key}]),onClick:o[2]||(o[2]=j(r=>e.handleSetSelectItem(e.schema),["stop"]))},[s(w,k({class:"grid-row"},e.schema.componentProps),{default:i(()=>[(n(!0),b(q,null,M(e.schema.columns,(r,S)=>(n(),u(y,{class:"grid-col",key:S,span:r.span},{default:i(()=>[s(l,k({class:"list-main draggable-box","component-data":{name:"list",tag:"div",type:"transition-group"}},{group:"form-draggable",ghostClass:"moving",animation:180,handle:".drag-move"},{"item-key":"key",modelValue:r.children,"onUpdate:modelValue":m=>r.children=m,onStart:m=>e.$emit("dragStart",m,r.children),onAdd:m=>e.$emit("handleColAdd",m,r.children)}),{item:i(({element:m})=>[s(p,{class:"drag-move",schema:m,"current-item":e.currentItem,onHandleCopy:o[0]||(o[0]=N=>e.$emit("handle-copy")),onHandleDelete:o[1]||(o[1]=N=>e.$emit("handle-delete"))},null,8,["schema","current-item"])]),_:2},1040,["modelValue","onUpdate:modelValue","onStart","onAdd"])]),_:2},1032,["span"]))),128))]),_:1},16),s(I,{schema:e.schema,currentItem:e.currentItem},null,8,["schema","currentItem"])],2)):(n(),u(F,{key:e.schema.key,schema:e.schema,"current-item":e.currentItem,onHandleCopy:o[3]||(o[3]=r=>e.$emit("handle-copy")),onHandleDelete:o[4]||(o[4]=r=>e.$emit("handle-delete"))},null,8,["schema","current-item"]))]),_:1},16)}var Je=D(W,[["render",X]]);export{Je as default};
