import{au as I,a as w,cD as E,b6 as D,s as S,f as z,aw as r,o as n,h as c,n as t,z as o,q as s,i as l,F as i,az as d,fh as F,fi as P,B as x,t as u,j as m,aG as V}from"./index.8bfc2406.js";import{T as L}from"./index.39db8959.js";import{T as C}from"./index.99114c72.js";/* empty css              */import N from"./Article.a786f3d5.js";import j from"./Application.66399cdb.js";import A from"./Project.a1d29419.js";import{h as R}from"./header.d801b988.js";import{tags as U,teams as q,details as G,achieveList as H}from"./data.53a0f0fb.js";import{R as b}from"./index.1f31ee16.js";import{C as h}from"./index.c8c59a17.js";import"./useRefs.952a3eb5.js";import"./PlusOutlined.74708752.js";import"./index.26daf2ef.js";import"./Col.c3e02293.js";import"./useFlexGapSupport.32b9a2c5.js";import"./eagerComputed.237d8d79.js";import"./index.4fe439b4.js";import"./index.015c51d9.js";const J=w({components:{CollapseContainer:E,Icon:D,Tag:L,Tabs:C,TabPane:C.TabPane,Article:N,Application:j,Project:A,[b.name]:b,[h.name]:h},setup(){const a=S(),_=z(()=>a.getUserInfo.avatar||R);return{prefixCls:"account-center",avatar:_,tags:U,teams:q,details:G,achieveList:H}}}),T=a=>(F("data-v-5384e32e"),a=a(),P(),a),K=["src"],M=T(()=>l("span",null,"Vben",-1)),O=T(()=>l("div",null,"\u6D77\u7EB3\u767E\u5DDD\uFF0C\u6709\u5BB9\u4E43\u5927",-1));function Q(a,_,W,X,Y,Z){const p=r("a-col"),f=r("Icon"),v=r("a-row"),$=r("Tag"),g=r("CollapseContainer"),k=r("TabPane"),y=r("Tabs");return n(),c("div",{class:s(a.prefixCls)},[t(v,{class:s(`${a.prefixCls}-top`)},{default:o(()=>[t(p,{span:9,class:s(`${a.prefixCls}-col`)},{default:o(()=>[t(v,null,{default:o(()=>[t(p,{span:8},{default:o(()=>[l("div",{class:s(`${a.prefixCls}-top__avatar`)},[l("img",{width:"70",src:a.avatar},null,8,K),M,O],2)]),_:1}),t(p,{span:16},{default:o(()=>[l("div",{class:s(`${a.prefixCls}-top__detail`)},[(n(!0),c(i,null,d(a.details,e=>(n(),c("p",{key:e.title},[t(f,{icon:e.icon},null,8,["icon"]),x(" "+u(e.title),1)]))),128))],2)]),_:1})]),_:1})]),_:1},8,["class"]),t(p,{span:7,class:s(`${a.prefixCls}-col`)},{default:o(()=>[t(g,{title:"\u6807\u7B7E",canExpan:!1},{default:o(()=>[(n(!0),c(i,null,d(a.tags,e=>(n(),m($,{key:e,class:"mb-2"},{default:o(()=>[x(u(e),1)]),_:2},1024))),128))]),_:1})]),_:1},8,["class"]),t(p,{span:8,class:s(`${a.prefixCls}-col`)},{default:o(()=>[t(g,{class:s(`${a.prefixCls}-top__team`),title:"\u56E2\u961F",canExpan:!1},{default:o(()=>[(n(!0),c(i,null,d(a.teams,(e,B)=>(n(),c("div",{key:B,class:s(`${a.prefixCls}-top__team-item`)},[t(f,{icon:e.icon,color:e.color},null,8,["icon","color"]),l("span",null,u(e.title),1)],2))),128))]),_:1},8,["class"])]),_:1},8,["class"])]),_:1},8,["class"]),l("div",{class:s(`${a.prefixCls}-bottom`)},[t(y,null,{default:o(()=>[(n(!0),c(i,null,d(a.achieveList,e=>(n(),m(k,{key:e.key,tab:e.name},{default:o(()=>[(n(),m(V(e.component)))]),_:2},1032,["tab"]))),128))]),_:1})],2)],2)}var Ca=I(J,[["render",Q],["__scopeId","data-v-5384e32e"]]);export{Ca as default};
