import{B as h}from"./TableImg.b12ad0d6.js";import{k as C}from"./componentMap.99e52708.js";import{u as g}from"./useTable.844d3353.js";import{a as _}from"./system.28194ce8.js";import{b as T}from"./index.2fd97491.js";import{D as B,c as k,s as D}from"./DeptModal.f3f1d718.js";import{au as E,a as M,aw as e,o as d,h as S,n as a,z as m,B as y,j as w,l as R}from"./index.8bfc2406.js";import"./index.a0887188.js";import"./Checkbox.563e3d22.js";import"./index.38f54cfd.js";import"./index.92e23268.js";import"./eagerComputed.237d8d79.js";import"./BasicForm.c703c5dc.js";/* empty css              *//* empty css              */import"./FormItem.vue_vue_type_script_lang.16438800.js";import"./index.9b0408e4.js";import"./index.3e06b937.js";import"./_baseIteratee.6bfb5377.js";import"./get.ba40285e.js";import"./DeleteOutlined.0cfcf4db.js";import"./index.1a265b20.js";import"./useRefs.952a3eb5.js";import"./Form.3195316c.js";import"./Col.c3e02293.js";import"./useFlexGapSupport.32b9a2c5.js";import"./useSize.abd6c9f0.js";import"./index.c8c59a17.js";import"./uniqBy.d922857d.js";import"./index.1f31ee16.js";import"./useForm.2f109964.js";import"./RadioButtonGroup.b23c9c8e.js";import"./useFormItem.1558b3aa.js";import"./index.05733175.js";import"./index.106fdff5.js";import"./index.8e0b9901.js";import"./useWindowSizeFn.ae2e5aa6.js";import"./useContentViewHeight.8a8b4d06.js";import"./ArrowLeftOutlined.c9428594.js";import"./index.765ae9b5.js";import"./transButton.b2c4a8a3.js";import"./index.fc45f4f6.js";import"./index.bfdf79fa.js";import"./index.39db8959.js";import"./index.60f8c25f.js";import"./uuid.2b29000c.js";import"./sortable.esm.2632adaa.js";import"./RedoOutlined.785e845c.js";import"./FullscreenOutlined.1d658e9b.js";import"./index.023d0e92.js";import"./isNumber.9d0def09.js";import"./fromPairs.84aabb58.js";import"./scrollTo.c9fac0e7.js";import"./index.cefde1d0.js";import"./index.1aaa2bba.js";import"./index.e0a45074.js";import"./index.2b8ac3b8.js";import"./download.af3964fa.js";import"./base64Conver.08b9f4ec.js";import"./index.29d7a04d.js";import"./index.873f3e58.js";const v=M({name:"DeptManagement",components:{BasicTable:h,DeptModal:B,TableAction:C},setup(){const[o,{openModal:r}]=T(),[p,{reload:s}]=g({title:"\u90E8\u95E8\u5217\u8868",api:_,columns:k,formConfig:{labelWidth:120,schemas:D},pagination:!1,striped:!1,useSearchForm:!0,showTableSetting:!0,bordered:!0,showIndexColumn:!1,canResize:!1,actionColumn:{width:80,title:"\u64CD\u4F5C",dataIndex:"action",fixed:void 0}});function l(){r(!0,{isUpdate:!1})}function c(t){r(!0,{record:t,isUpdate:!0})}function i(t){}function n(){s()}return{registerTable:p,registerModal:o,handleCreate:l,handleEdit:c,handleDelete:i,handleSuccess:n}}});function A(o,r,p,s,l,c){const i=e("a-button"),n=e("TableAction"),t=e("BasicTable"),f=e("DeptModal");return d(),S("div",null,[a(t,{onRegister:o.registerTable},{toolbar:m(()=>[a(i,{type:"primary",onClick:o.handleCreate},{default:m(()=>[y(" \u65B0\u589E\u90E8\u95E8 ")]),_:1},8,["onClick"])]),bodyCell:m(({column:b,record:u})=>[b.key==="action"?(d(),w(n,{key:0,actions:[{icon:"clarity:note-edit-line",onClick:o.handleEdit.bind(null,u)},{icon:"ant-design:delete-outlined",color:"error",popConfirm:{title:"\u662F\u5426\u786E\u8BA4\u5220\u9664",placement:"left",confirm:o.handleDelete.bind(null,u)}}]},null,8,["actions"])):R("",!0)]),_:1},8,["onRegister"]),a(f,{onRegister:o.registerModal,onSuccess:o.handleSuccess},null,8,["onRegister","onSuccess"])])}var jo=E(v,[["render",A]]);export{jo as default};
