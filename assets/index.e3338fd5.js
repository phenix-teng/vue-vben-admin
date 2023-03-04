var k=Object.defineProperty,A=Object.defineProperties;var C=Object.getOwnPropertyDescriptors;var B=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var D=(e,t,a)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,w=(e,t)=>{for(var a in t||(t={}))I.call(t,a)&&D(e,a,t[a]);if(B)for(var a of B(t))E.call(t,a)&&D(e,a,t[a]);return e},y=(e,t)=>A(e,C(t));import{au as L,a as V,I as _,w as O,fp as S,L as x,f as g,eU as N,bc as P,aw as r,o as h,j as W,z as u,i as s,n as l,B as d,t as c,h as F,F as $,az as U}from"./index.8bfc2406.js";import{T as z}from"./index.39db8959.js";import{P as M}from"./index.05733175.js";import"./index.106fdff5.js";import"./index.8e0b9901.js";import"./useSize.abd6c9f0.js";import"./eagerComputed.237d8d79.js";import"./useWindowSizeFn.ae2e5aa6.js";import"./useContentViewHeight.8a8b4d06.js";import"./ArrowLeftOutlined.c9428594.js";import"./index.765ae9b5.js";import"./transButton.b2c4a8a3.js";const R=V({components:{PageWrapper:M,[_.name]:_,InputTextArea:_.TextArea,Tag:z},setup(){const e=O({server:"ws://localhost:3300/test",sendValue:"",recordList:[]}),{status:t,data:a,send:v,close:T,open:b}=S(e.server,{autoReconnect:!1,heartbeat:!0});x(()=>{if(a.value)try{const o=JSON.parse(a.value);e.recordList.push(o)}catch(o){e.recordList.push({res:a.value,id:Math.ceil(Math.random()*1e3),time:new Date().getTime()})}});const n=g(()=>t.value==="OPEN"),p=g(()=>n.value?"success":"red"),i=g(()=>[...e.recordList].reverse());function m(){v(e.sendValue),e.sendValue=""}function f(){n.value?T():b()}return y(w({status:t,formatToDateTime:N},P(e)),{handlerSend:m,getList:i,toggle:f,getIsOpen:n,getTagColor:p})}}),j={class:"flex"},J={class:"w-1/3 bg-white p-4"},q={class:"flex items-center"},G=s("span",{class:"text-lg font-medium mr-4"}," \u8FDE\u63A5\u72B6\u6001: ",-1),H=s("hr",{class:"my-4"},null,-1),K={class:"flex"},Q=s("p",{class:"text-lg font-medium mt-4"},"\u8BBE\u7F6E",-1),X=s("hr",{class:"my-4"},null,-1),Y={class:"w-2/3 bg-white ml-4 p-4"},Z=s("span",{class:"text-lg font-medium mr-4"}," \u6D88\u606F\u8BB0\u5F55: ",-1),ee=s("hr",{class:"my-4"},null,-1),te={class:"max-h-80 overflow-auto"},se={class:"flex items-center"},ae=s("span",{class:"mr-2 text-primary font-medium"},"\u6536\u5230\u6D88\u606F:",-1);function oe(e,t,a,v,T,b){const n=r("Tag"),p=r("a-input"),i=r("a-button"),m=r("InputTextArea"),f=r("PageWrapper");return h(),W(f,{title:"WebSocket \u793A\u4F8B"},{default:u(()=>[s("div",j,[s("div",J,[s("div",q,[G,l(n,{color:e.getTagColor},{default:u(()=>[d(c(e.status),1)]),_:1},8,["color"])]),H,s("div",K,[l(p,{value:e.server,"onUpdate:value":t[0]||(t[0]=o=>e.server=o),disabled:""},{addonBefore:u(()=>[d(" \u670D\u52A1\u5730\u5740 ")]),_:1},8,["value"]),l(i,{type:e.getIsOpen?"danger":"primary",onClick:e.toggle},{default:u(()=>[d(c(e.getIsOpen?"\u5173\u95ED\u8FDE\u63A5":"\u5F00\u542F\u8FDE\u63A5"),1)]),_:1},8,["type","onClick"])]),Q,X,l(m,{placeholder:"\u9700\u8981\u53D1\u9001\u5230\u670D\u52A1\u5668\u7684\u5185\u5BB9",disabled:!e.getIsOpen,value:e.sendValue,"onUpdate:value":t[1]||(t[1]=o=>e.sendValue=o),allowClear:""},null,8,["disabled","value"]),l(i,{type:"primary",block:"",class:"mt-4",disabled:!e.getIsOpen,onClick:e.handlerSend},{default:u(()=>[d(" \u53D1\u9001 ")]),_:1},8,["disabled","onClick"])]),s("div",Y,[Z,ee,s("div",te,[s("ul",null,[(h(!0),F($,null,U(e.getList,o=>(h(),F("li",{class:"mt-2",key:o.time},[s("div",se,[ae,s("span",null,c(e.formatToDateTime(o.time)),1)]),s("div",null,c(o.res),1)]))),128))])])])])]),_:1})}var ve=L(R,[["render",oe]]);export{ve as default};
