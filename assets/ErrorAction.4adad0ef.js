import{au as l,a as m,b6 as d,bk as f,bd as _,fw as g,f as E,aw as e,o as C,j as L,z as a,n as c,c as h,a$ as B}from"./index.8bfc2406.js";import{B as b}from"./index.cefde1d0.js";const k=m({name:"ErrorAction",components:{Icon:d,Tooltip:f,Badge:b},setup(){const{t:o}=h(),{push:n}=_(),t=g(),r=E(()=>t.getErrorLogListCount);function s(){n(B.ERROR_LOG_PAGE).then(()=>{t.setErrorLogListCount(0)})}return{t:o,getCount:r,handleToErrorList:s}}});function T(o,n,t,r,s,$){const u=e("Icon"),i=e("Badge"),p=e("Tooltip");return C(),L(p,{title:o.t("layout.header.tooltipErrorLog"),placement:"bottom",mouseEnterDelay:.5,onClick:o.handleToErrorList},{default:a(()=>[c(i,{count:o.getCount,offset:[0,10],overflowCount:99},{default:a(()=>[c(u,{icon:"ion:bug-outline"})]),_:1},8,["count"])]),_:1},8,["title","mouseEnterDelay","onClick"])}var R=l(k,[["render",T]]);export{R as default};
