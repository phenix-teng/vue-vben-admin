import{_ as g}from"./index.55e7150c.js";import{t as C}from"./data.ec134722.js";import{P as k}from"./index.05733175.js";import{au as B,a as E,b1 as A,v as s,aw as u,o as v,j as K,z as a,n as e,B as D,ah as y,al as R,k as h,cY as $,ba as L}from"./index.8bfc2406.js";import{C as b}from"./index.4fe439b4.js";import"./index.99114c72.js";/* empty css              */import{R as w}from"./index.1f31ee16.js";import{C as P}from"./index.c8c59a17.js";import"./fromPairs.84aabb58.js";import"./index.92e23268.js";import"./eagerComputed.237d8d79.js";import"./useContextMenu.a2a09620.js";import"./index.9b0408e4.js";import"./get.ba40285e.js";import"./index.106fdff5.js";import"./index.8e0b9901.js";import"./useSize.abd6c9f0.js";import"./useWindowSizeFn.ae2e5aa6.js";import"./useContentViewHeight.8a8b4d06.js";import"./ArrowLeftOutlined.c9428594.js";import"./index.765ae9b5.js";import"./transButton.b2c4a8a3.js";import"./index.015c51d9.js";import"./useRefs.952a3eb5.js";import"./PlusOutlined.74708752.js";import"./Col.c3e02293.js";import"./useFlexGapSupport.32b9a2c5.js";const x=E({components:{BasicTree:g,PageWrapper:k,Card:b,Row:w,Col:P,Spin:A},setup(){const t=s(null),f=s(null),_=s(null),d=s([]),l=s(!1);function F(n,p){}function o(){l.value=!0,setTimeout(()=>{d.value=y(C),l.value=!1,R(()=>{var n;(n=h(f))==null||n.expandAll(!0)})},2e3)}function r(){l.value=!0,setTimeout(()=>{d.value=y(C),l.value=!1},2e3)}const c=s([{title:"parent ",key:"0-0"}]);function m(n){return new Promise(p=>{if($(n.children)&&n.children.length>0){p();return}setTimeout(()=>{const i=h(t);if(i){const T=[{title:`Child Node ${n.eventKey}-0`,key:`${n.eventKey}-0`},{title:`Child Node ${n.eventKey}-1`,key:`${n.eventKey}-1`}];i.updateNodeByKey(n.eventKey,{children:T}),i.setExpandedKeys(L([n.eventKey,...i.getExpandedKeys()]))}p()},300)})}return{treeData:C,handleCheck:F,tree:c,onLoadData:m,asyncTreeRef:t,asyncExpandTreeRef:f,loadTreeRef:_,tree2:d,loadTreeData:o,treeLoading:l,loadTreeData2:r}}});function S(t,f,_,d,l,F){const o=u("BasicTree"),r=u("Col"),c=u("a-button"),m=u("Spin"),n=u("Card"),p=u("Row"),i=u("PageWrapper");return v(),K(i,{title:"Tree\u57FA\u7840\u793A\u4F8B"},{default:a(()=>[e(p,{gutter:[16,16]},{default:a(()=>[e(r,{span:8},{default:a(()=>[e(o,{title:"\u57FA\u7840\u793A\u4F8B\uFF0C\u9ED8\u8BA4\u5C55\u5F00\u7B2C\u4E00\u5C42",treeData:t.treeData,defaultExpandLevel:"1"},{title:a(()=>[D(" 123123 ")]),_:1},8,["treeData"])]),_:1}),e(r,{span:8},{default:a(()=>[e(o,{title:"\u53EF\u52FE\u9009\uFF0C\u9ED8\u8BA4\u5168\u90E8\u5C55\u5F00",treeData:t.treeData,checkable:!0,defaultExpandAll:"",onCheck:t.handleCheck},null,8,["treeData","onCheck"])]),_:1}),e(r,{span:8},{default:a(()=>[e(o,{title:"\u6307\u5B9A\u9ED8\u8BA4\u5C55\u5F00/\u52FE\u9009\u793A\u4F8B",treeData:t.treeData,checkable:!0,expandedKeys:["0-0"],checkedKeys:["0-0"]},null,8,["treeData"])]),_:1}),e(r,{span:8},{default:a(()=>[e(o,{title:"\u61D2\u52A0\u8F7D\u5F02\u6B65\u6811",ref:"asyncTreeRef",treeData:t.tree,"load-data":t.onLoadData},null,8,["treeData","load-data"])]),_:1}),e(r,{span:8},{default:a(()=>[e(n,{title:"\u5F02\u6B65\u6570\u636E\uFF0C\u9ED8\u8BA4\u5C55\u5F00"},{extra:a(()=>[e(c,{onClick:t.loadTreeData,loading:t.treeLoading},{default:a(()=>[D("\u52A0\u8F7D\u6570\u636E")]),_:1},8,["onClick","loading"])]),default:a(()=>[e(m,{spinning:t.treeLoading},{default:a(()=>[e(o,{ref:"asyncExpandTreeRef",treeData:t.tree2},null,8,["treeData"])]),_:1},8,["spinning"])]),_:1})]),_:1}),e(r,{span:8},{default:a(()=>[e(n,{title:"BasicTree\u5185\u7F6E\u52A0\u8F7D"},{extra:a(()=>[e(c,{onClick:t.loadTreeData2,loading:t.treeLoading},{default:a(()=>[D("\u8BF7\u6C42\u6570\u636E")]),_:1},8,["onClick","loading"])]),default:a(()=>[e(o,{ref:"loadTreeRef",treeData:t.tree2,loading:t.treeLoading},null,8,["treeData","loading"])]),_:1})]),_:1})]),_:1})]),_:1})}var de=B(x,[["render",S]]);export{de as default};
