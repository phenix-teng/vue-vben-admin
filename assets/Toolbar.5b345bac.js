var y=Object.defineProperty,x=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var g=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var f=(e,o,t)=>o in e?y(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,_=(e,o)=>{for(var t in o||(o={}))w.call(o,t)&&f(e,t,o[t]);if(g)for(var t of g(o))F.call(o,t)&&f(e,t,o[t]);return e},b=(e,o)=>x(e,k(o));import{a as E,bk as D,b6 as I,w as J,K as O,bc as R,au as $,aw as l,o as r,h as m,i,F as z,az as A,j as B,z as c,n as a,q as h}from"./index.8bfc2406.js";import{D as T}from"./index.9b0408e4.js";const N=E({name:"OperatingArea",components:{Tooltip:D,Icon:I,Divider:T},setup(){const e=J({toolbarsConfigs:[{title:"\u9884\u89C8-\u652F\u6301\u5E03\u5C40",type:"preview",event:"handlePreview",icon:"ant-design:chrome-filled"},{title:"\u9884\u89C8-\u4E0D\u652F\u6301\u5E03\u5C40",type:"preview",event:"handlePreview2",icon:"ant-design:chrome-filled"},{title:"\u5BFC\u5165JSON",type:"importJson",event:"handleOpenImportJsonModal",icon:"ant-design:import-outlined"},{title:"\u751F\u6210JSON",type:"exportJson",event:"handleOpenJsonModal",icon:"ant-design:export-outlined"},{title:"\u751F\u6210\u4EE3\u7801",type:"exportCode",event:"handleOpenCodeModal",icon:"ant-design:code-filled"},{title:"\u6E05\u7A7A",type:"reset",event:"handleClearFormItems",icon:"ant-design:clear-outlined"}]}),o=O("historyReturn"),{undo:t,redo:p,canUndo:u,canRedo:v}=o;return b(_({},R(e)),{undo:t,redo:p,canUndo:u,canRedo:v})}}),j={class:"operating-area"},M={class:"left-btn-box"},U=["onClick"],P=["disabled"],S=["disabled"];function V(e,o,t,p,u,v){const s=l("Icon"),d=l("Tooltip"),C=l("Divider");return r(),m("div",j,[i("div",M,[(r(!0),m(z,null,A(e.toolbarsConfigs,n=>(r(),B(d,{title:n.title,key:n.icon},{default:c(()=>[i("a",{onClick:q=>e.$emit(n.event),class:"toolbar-text"},[a(s,{icon:n.icon},null,8,["icon"])],8,U)]),_:2},1032,["title"]))),128)),a(C,{type:"vertical"}),a(d,{title:"\u64A4\u9500"},{default:c(()=>[i("a",{class:h({disabled:!e.canUndo}),disabled:!e.canUndo,onClick:o[0]||(o[0]=(...n)=>e.undo&&e.undo(...n))},[a(s,{icon:"ant-design:undo-outlined"})],10,P)]),_:1}),a(d,{title:"\u91CD\u505A"},{default:c(()=>[i("a",{class:h({disabled:!e.canRedo}),disabled:!e.canRedo,onClick:o[1]||(o[1]=(...n)=>e.redo&&e.redo(...n))},[a(s,{icon:"ant-design:redo-outlined"})],10,S)]),_:1})])])}var H=$(N,[["render",V],["__scopeId","data-v-708e45e6"]]);export{H as default};
