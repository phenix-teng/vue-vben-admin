import{au as f,a as E,bE as v,v as A,aw as c,o as m,j as C,z as r,i as a,n as l,B as u,h as k,F,az as g,t as B,k as D}from"./index.8bfc2406.js";import{P as $}from"./index.05733175.js";import"./index.106fdff5.js";import"./index.8e0b9901.js";import"./useSize.abd6c9f0.js";import"./eagerComputed.237d8d79.js";import"./useWindowSizeFn.ae2e5aa6.js";import"./useContentViewHeight.8a8b4d06.js";import"./ArrowLeftOutlined.c9428594.js";import"./index.765ae9b5.js";import"./transButton.b2c4a8a3.js";const w=E({components:{ScrollContainer:v,PageWrapper:$},setup(){const t=A(null),o=()=>{const s=D(t);if(!s)throw new Error("scroll is Null");return s};function i(s){o().scrollTo(s)}function p(){o().scrollBottom()}return{scrollTo:i,scrollRef:t,scrollBottom:p}}}),b={class:"my-4"},y={class:"scroll-wrap"},T={class:"p-3"};function x(t,o,i,p,s,S){const n=c("a-button"),d=c("ScrollContainer"),_=c("PageWrapper");return m(),C(_,{title:"\u6EDA\u52A8\u7EC4\u4EF6\u51FD\u6570\u793A\u4F8B",content:"\u57FA\u4E8Eel-scrollbar"},{default:r(()=>[a("div",b,[l(n,{onClick:o[0]||(o[0]=e=>t.scrollTo(100)),class:"mr-2"},{default:r(()=>[u(" \u6EDA\u52A8\u5230100px\u4F4D\u7F6E ")]),_:1}),l(n,{onClick:o[1]||(o[1]=e=>t.scrollTo(800)),class:"mr-2"},{default:r(()=>[u(" \u6EDA\u52A8\u5230800px\u4F4D\u7F6E ")]),_:1}),l(n,{onClick:o[2]||(o[2]=e=>t.scrollTo(0)),class:"mr-2"},{default:r(()=>[u(" \u6EDA\u52A8\u5230\u9876\u90E8 ")]),_:1}),l(n,{onClick:o[3]||(o[3]=e=>t.scrollBottom()),class:"mr-2"},{default:r(()=>[u(" \u6EDA\u52A8\u5230\u5E95\u90E8 ")]),_:1})]),a("div",y,[l(d,{class:"mt-4",ref:"scrollRef"},{default:r(()=>[a("ul",T,[(m(),k(F,null,g(100,e=>a("li",{key:e,class:"p-2",style:{border:"1px solid #eee"}},B(e),1)),64))])]),_:1},512)])]),_:1})}var G=f(w,[["render",x],["__scopeId","data-v-0369ce10"]]);export{G as default};
