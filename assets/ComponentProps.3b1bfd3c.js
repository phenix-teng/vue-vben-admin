var y=(e,p,o)=>new Promise((r,d)=>{var h=t=>{try{a(o.next(t))}catch(c){d(c)}},u=t=>{try{a(o.throw(t))}catch(c){d(c)}},a=t=>t.done?r(t.value):Promise.resolve(t.value).then(h,u);a((o=o.apply(e,p)).next())});import{a as T,ec as M,I as w,cV as G,v as V,a7 as I,f as D,au as _,aw as b,o as l,h as i,j as m,l as E,n as B,z as s,F as P,az as k,aG as S,ax as x,B as O,t as U}from"./index.8bfc2406.js";/* empty css              *//* empty css              */import{S as z}from"./index.bfdf79fa.js";import{C as L}from"./index.38f54cfd.js";import{I as $}from"./index.fc45f4f6.js";import"./index.a0887188.js";import{R as H,a as W}from"./RadioButtonGroup.b23c9c8e.js";import{u as j}from"./useFormDesignState.3ca1915c.js";import q from"./FormOptions.f42cda46.js";import{f as J,c as K}from"./index.5f69dd53.js";import{F as Q,a as X}from"./Form.3195316c.js";import{C as Z}from"./index.c8c59a17.js";import{R as ee}from"./index.1f31ee16.js";import"./Checkbox.563e3d22.js";import"./useFormItem.1558b3aa.js";import"./isNumber.9d0def09.js";import"./Col.c3e02293.js";import"./useFlexGapSupport.32b9a2c5.js";import"./_baseIteratee.6bfb5377.js";import"./get.ba40285e.js";import"./useSize.abd6c9f0.js";const ue=[{name:"disabled",label:"\u7981\u7528"},{name:"autofocus",label:"\u81EA\u52A8\u83B7\u53D6\u7126\u70B9",includes:["Input","Select","InputTextArea","InputNumber","DatePicker","RangePicker","MonthPicker","TimePicker","Cascader","TreeSelect","Switch","AutoComplete","Slider"]},{name:"allowClear",label:"\u53EF\u6E05\u9664",includes:["Input","Select","InputTextArea","InputNumber","DatePicker","RangePicker","MonthPicker","TimePicker","Cascader","TreeSelect","AutoComplete"]},{name:"fullscreen",label:"\u5168\u5C4F",includes:["Calendar"]},{name:"showSearch",label:"\u53EF\u641C\u7D22",includes:["Select","TreeSelect","Cascader","Transfer"]},{name:"showTime",label:"\u663E\u793A\u65F6\u95F4",includes:["DatePicker","RangePicker","MonthPicker"]},{name:"range",label:"\u53CC\u5411\u6ED1\u52A8",includes:[]},{name:"allowHalf",label:"\u5141\u8BB8\u534A\u9009",includes:["Rate"]},{name:"multiple",label:"\u591A\u9009",includes:["Select","TreeSelect","Upload"]},{name:"directory",label:"\u6587\u4EF6\u5939",includes:["Upload"]},{name:"withCredentials",label:"\u643A\u5E26cookie",includes:["Upload"]},{name:"bordered",label:"\u662F\u5426\u6709\u8FB9\u6846",includes:["Select","Input"]},{name:"defaultActiveFirstOption",label:"\u9AD8\u4EAE\u7B2C\u4E00\u4E2A\u9009\u9879",component:"Checkbox",includes:["Select","AutoComplete"]},{name:"dropdownMatchSelectWidth",label:"\u4E0B\u62C9\u83DC\u5355\u548C\u9009\u62E9\u5668\u540C\u5BBD",component:"Checkbox",includes:["Select","TreeSelect","AutoComplete"]}],oe=[{name:"size",label:"\u5C3A\u5BF8",component:"RadioGroup",componentProps:{options:[{label:"\u9ED8\u8BA4",value:"default"},{label:"\u5927",value:"large"},{label:"\u5C0F",value:"small"}]},includes:["InputNumber","Input","Cascader","Button"]},{name:"placeholder",label:"\u5360\u4F4D\u7B26",component:"Input",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u5360\u4F4D\u7B26"},includes:["AutoComplete","InputTextArea","InputNumber","Input","InputTextArea","Select","DatePicker","MonthPicker","TimePicker","TreeSelect","Cascader"]},{name:"style",label:"\u6837\u5F0F",component:"Input",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u6837\u5F0F"}},{name:"open",label:"\u4E00\u76F4\u5C55\u5F00\u4E0B\u62C9\u83DC\u5355",component:"RadioGroup",componentProps:{options:[{label:"\u9ED8\u8BA4",value:void 0},{label:"\u662F",value:!0},{label:"\u5426",value:!1}]},includes:["Select","AutoComplete"]}],F={AutoComplete:[{name:"backfill",label:"\u81EA\u52A8\u56DE\u586B",component:"Switch",componentProps:{span:8}},{name:"defaultOpen",label:"\u662F\u5426\u9ED8\u8BA4\u5C55\u5F00\u4E0B\u62C9\u83DC\u5355",component:"Checkbox"}],IconPicker:[{name:"mode",label:"\u6A21\u5F0F",component:"RadioGroup",componentProps:{options:[{label:"ICONIFY",value:null},{label:"SVG",value:"svg"}]}}],Input:[{name:"type",label:"\u7C7B\u578B",component:"Select",componentProps:{options:[{value:"text",label:"\u6587\u672C"},{value:"search",label:"\u641C\u7D22"},{value:"number",label:"\u6570\u5B57"},{value:"range",label:"\u6570\u5B57\u8303\u56F4"},{value:"password",label:"\u5BC6\u7801"},{value:"date",label:"\u65E5\u671F"},{value:"datetime-local",label:"\u65E5\u671F-\u65E0\u65F6\u533A"},{value:"time",label:"\u65F6\u95F4"},{value:"month",label:"\u5E74\u6708"},{value:"week",label:"\u661F\u671F"},{value:"email",label:"\u90AE\u7BB1"},{value:"url",label:"URL"},{value:"tel",label:"\u7535\u8BDD\u53F7\u7801"},{value:"file",label:"\u6587\u4EF6"},{value:"button",label:"\u6309\u94AE"},{value:"submit",label:"\u63D0\u4EA4\u6309\u94AE"},{value:"reset",label:"\u91CD\u7F6E\u6309\u94AE"},{value:"radio",label:"\u5355\u9009\u6309\u94AE"},{value:"checkbox",label:"\u590D\u9009\u6846"},{value:"color",label:"\u989C\u8272"},{value:"image",label:"\u56FE\u50CF"},{value:"hidden",label:"\u9690\u85CF"}]}},{name:"defaultValue",label:"\u9ED8\u8BA4\u503C",component:"Input",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u9ED8\u8BA4\u503C"}},{name:"prefix",label:"\u524D\u7F00",component:"Input",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u524D\u7F00"}},{name:"suffix",label:"\u540E\u7F00",component:"Input",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u540E\u7F00"}},{name:"addonBefore",label:"\u524D\u7F6E\u6807\u7B7E",component:"Input",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u524D\u7F6E\u6807\u7B7E"}},{name:"addonAfter",label:"\u540E\u7F6E\u6807\u7B7E",component:"Input",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u540E\u7F6E\u6807\u7B7E"}},{name:"maxLength",label:"\u6700\u5927\u957F\u5EA6",component:"InputNumber",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u957F\u5EA6"}}],InputNumber:[{name:"defaultValue",label:"\u9ED8\u8BA4\u503C",component:"InputNumber",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u9ED8\u8BA4\u503C"}},{name:"min",label:"\u6700\u5C0F\u503C",component:"InputNumber",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u503C"}},{name:"max",label:"\u6700\u5927\u503C",component:"InputNumber",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u503C"}},{name:"precision",label:"\u6570\u503C\u7CBE\u5EA6",component:"InputNumber",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u503C"}},{name:"step",label:"\u6B65\u957F",component:"InputNumber",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u6B65\u957F"}},{name:"decimalSeparator",label:"\u5C0F\u6570\u70B9",component:"Input",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u5C0F\u6570\u70B9"}},{name:"addonBefore",label:"\u524D\u7F6E\u6807\u7B7E",component:"Input",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u524D\u7F6E\u6807\u7B7E"}},{name:"addonAfter",label:"\u540E\u7F6E\u6807\u7B7E",component:"Input",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u540E\u7F6E\u6807\u7B7E"}},{name:"controls",label:"\u662F\u5426\u663E\u793A\u589E\u51CF\u6309\u94AE",component:"Checkbox"},{name:"keyboard",label:"\u662F\u5426\u542F\u7528\u952E\u76D8\u5FEB\u6377\u884C\u4E3A",component:"Checkbox"},{name:"stringMode",label:"\u5B57\u7B26\u503C\u6A21\u5F0F",component:"Checkbox"},{name:"bordered",label:"\u662F\u5426\u6709\u8FB9\u6846",component:"Checkbox"}],InputTextArea:[{name:"defaultValue",label:"\u9ED8\u8BA4\u503C",component:"Input",componentProps:{type:"text",placeholder:"\u8BF7\u8F93\u5165\u9ED8\u8BA4\u503C"}},{name:"maxlength",label:"\u6700\u5927\u957F\u5EA6",component:"InputNumber",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u957F\u5EA6"}},{name:"minlength",label:"\u6700\u5C0F\u957F\u5EA6",component:"InputNumber",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u957F\u5EA6"}},{name:"cols",label:"\u53EF\u89C1\u5217\u6570",component:"InputNumber",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u53EF\u89C1\u5217\u6570",min:0}},{name:"rows",label:"\u53EF\u89C1\u884C\u6570",component:"InputNumber",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u53EF\u89C1\u884C\u6570",min:0}},{name:"minlength",label:"\u6700\u5C0F\u957F\u5EA6",component:"InputNumber",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u957F\u5EA6"}},{name:"autosize",label:"\u81EA\u9002\u5E94\u5185\u5BB9\u9AD8\u5EA6",component:"Checkbox"},{name:"showCount",label:"\u662F\u5426\u5C55\u793A\u5B57\u6570",component:"Checkbox"},{name:"readonly",label:"\u662F\u5426\u53EA\u8BFB",component:"Checkbox"},{name:"spellcheck",label:"\u8BFB\u5199\u68C0\u67E5",component:"Checkbox"},{name:"autocomplete",label:"\u662F\u5426\u81EA\u52A8\u5B8C\u6210",component:"RadioGroup",componentProps:{options:[{label:"\u6B63\u5E38",value:null},{label:"\u5F00",value:"on"},{label:"\u5173",value:"off"}]}},{name:"autocorrect",label:"\u662F\u5426\u81EA\u52A8\u7EA0\u9519",component:"RadioGroup",componentProps:{options:[{label:"\u6B63\u5E38",value:null},{label:"\u5F00",value:"on"},{label:"\u5173",value:"off"}]}}],Select:[{name:"mode",label:"\u9009\u62E9\u6A21\u5F0F\uFF08\u9ED8\u8BA4\u5355\u9009\uFF09",component:"RadioGroup",componentProps:{options:[{label:"\u5355\u9009",value:null},{label:"\u591A\u9009",value:"multiple"},{label:"\u6807\u7B7E",value:"tags"}]}},{name:"autoClearSearchValue",label:"\u662F\u5426\u5728\u9009\u4E2D\u9879\u540E\u6E05\u7A7A\u641C\u7D22\u6846",component:"Checkbox"},{name:"labelInValue",label:"\u9009\u9879\u7684label\u5305\u88C5\u5230value\u4E2D",component:"Checkbox"},{name:"showArrow",label:"\u663E\u793A\u4E0B\u62C9\u5C0F\u7BAD\u5934",component:"Checkbox"},{name:"defaultOpen",label:"\u9ED8\u8BA4\u5C55\u5F00\u4E0B\u62C9\u83DC\u5355",component:"Checkbox"}],Checkbox:[{name:"indeterminate",label:"\u8BBE\u7F6Eindeterminate\u72B6\u6001",component:"Checkbox"}],CheckboxGroup:[],RadioGroup:[{name:"defaultValue",label:"\u9ED8\u8BA4\u503C",component:"Input",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u9ED8\u8BA4\u503C"}},{name:"buttonStyle",label:"RadioButton\u7684\u98CE\u683C\u6837\u5F0F",component:"RadioGroup",componentProps:{options:[{label:"outline",value:"outline"},{label:"solid",value:"solid"}]}},{name:"optionType",label:"options\u7C7B\u578B",component:"RadioGroup",componentProps:{options:[{label:"\u9ED8\u8BA4",value:"default"},{label:"\u6309\u94AE",value:"button"}]}},{name:"size",label:"\u5C3A\u5BF8",component:"RadioGroup",componentProps:{options:[{label:"\u9ED8\u8BA4",value:"default"},{label:"\u5927",value:"large"},{label:"\u5C0F",value:"small"}]}}],DatePicker:[{name:"format",label:"\u5C55\u793A\u683C\u5F0F\uFF08format\uFF09",component:"Input",componentProps:{placeholder:"YYYY-MM-DD"}},{name:"valueFormat",label:"\u7ED1\u5B9A\u503C\u683C\u5F0F\uFF08valueFormat\uFF09",component:"Input",componentProps:{placeholder:"YYYY-MM-DD"}}],RangePicker:[{name:"placeholder",label:"\u5360\u4F4D\u7B26",children:[{name:"",label:"",component:"Input"},{name:"",label:"",component:"Input"}]},{name:"format",label:"\u5C55\u793A\u683C\u5F0F\uFF08format\uFF09",component:"Input",componentProps:{placeholder:"YYYY-MM-DD HH:mm:ss"}},{name:"valueFormat",label:"\u7ED1\u5B9A\u503C\u683C\u5F0F\uFF08valueFormat\uFF09",component:"Input",componentProps:{placeholder:"YYYY-MM-DD"}}],MonthPicker:[{name:"format",label:"\u5C55\u793A\u683C\u5F0F\uFF08format\uFF09",component:"Input",componentProps:{placeholder:"YYYY-MM"}},{name:"valueFormat",label:"\u7ED1\u5B9A\u503C\u683C\u5F0F\uFF08valueFormat\uFF09",component:"Input",componentProps:{placeholder:"YYYY-MM"}}],TimePicker:[{name:"format",label:"\u5C55\u793A\u683C\u5F0F\uFF08format\uFF09",component:"Input",componentProps:{placeholder:"YYYY-MM"}},{name:"valueFormat",label:"\u7ED1\u5B9A\u503C\u683C\u5F0F\uFF08valueFormat\uFF09",component:"Input",componentProps:{placeholder:"YYYY-MM"}}],Slider:[{name:"defaultValue",label:"\u9ED8\u8BA4\u503C",component:"InputNumber",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u9ED8\u8BA4\u503C"}},{name:"min",label:"\u6700\u5C0F\u503C",component:"InputNumber",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u6700\u5C0F\u503C"}},{name:"max",label:"\u6700\u5927\u503C",component:"InputNumber",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u6700\u5927\u503C"}},{name:"step",label:"\u6B65\u957F",component:"InputNumber",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u6B65\u957F"}},{name:"tooltipPlacement",label:"Tooltip \u5C55\u793A\u4F4D\u7F6E",component:"Select",componentProps:{options:[{value:"top",label:"\u4E0A"},{value:"left",label:"\u5DE6"},{value:"right",label:"\u53F3"},{value:"bottom",label:"\u4E0B"},{value:"topLeft",label:"\u4E0A\u53F3"},{value:"topRight",label:"\u4E0A\u5DE6"},{value:"bottomLeft",label:"\u53F3\u4E0B"},{value:"bottomRight",label:"\u5DE6\u4E0B"},{value:"leftTop",label:"\u5DE6\u4E0B"},{value:"leftBottom",label:"\u5DE6\u4E0A"},{value:"rightTop",label:"\u53F3\u4E0B"},{value:"rightBottom",label:"\u53F3\u4E0A"}]}},{name:"tooltipVisible",label:"\u59CB\u7EC8\u663E\u793ATooltip",component:"Checkbox"},{name:"dots",label:"\u53EA\u80FD\u62D6\u62FD\u5230\u523B\u5EA6\u4E0A",component:"Checkbox"},{name:"range",label:"\u53CC\u6ED1\u5757\u6A21\u5F0F",component:"Checkbox"},{name:"reverse",label:"\u53CD\u5411\u5750\u6807\u8F74",component:"Checkbox"},{name:"vertical",label:"\u5782\u76F4\u65B9\u5411",component:"Checkbox"},{name:"included",label:"\u503C\u4E3A\u5305\u542B\u5173\u7CFB",component:"Checkbox"}],Rate:[{name:"defaultValue",label:"\u9ED8\u8BA4\u503C",component:"InputNumber",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u9ED8\u8BA4\u503C"}},{name:"character",label:"\u81EA\u5B9A\u4E49\u5B57\u7B26",component:"Input",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u81EA\u5B9A\u4E49\u5B57\u7B26"}},{name:"count",label:"start \u603B\u6570",component:"InputNumber",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u81EA\u5B9A\u4E49\u5B57\u7B26"}}],Switch:[{name:"checkedChildren",label:"\u9009\u4E2D\u65F6\u7684\u5185\u5BB9",component:"Input",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u9009\u4E2D\u65F6\u7684\u5185\u5BB9"}},{name:"checkedValue",label:"\u9009\u4E2D\u65F6\u7684\u503C",component:"Input",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u9009\u4E2D\u65F6\u7684\u503C"}},{name:"unCheckedChildren",label:"\u975E\u9009\u4E2D\u65F6\u7684\u5185\u5BB9",component:"Input",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u975E\u9009\u4E2D\u65F6\u7684\u5185\u5BB9"}},{name:"unCheckedValue",label:"\u975E\u9009\u4E2D\u65F6\u7684\u503C",component:"Input",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u975E\u9009\u4E2D\u65F6\u7684\u503C"}},{name:"loading",label:"\u52A0\u8F7D\u4E2D\u7684\u5F00\u5173",component:"Checkbox"},{name:"size",label:"\u5C3A\u5BF8",component:"RadioGroup",componentProps:{options:[{label:"\u9ED8\u8BA4",value:"default"},{label:"\u5C0F",value:"small"}]}}],TreeSelect:[{name:"defaultValue",label:"\u9ED8\u8BA4\u503C",component:"Input",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u9ED8\u8BA4\u503C"}},{name:"searchPlaceholder",label:"\u641C\u7D22\u6846\u9ED8\u8BA4\u6587\u5B57",component:"Input",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u641C\u7D22\u6846\u9ED8\u8BA4\u6587\u5B57"}},{name:"treeNodeFilterProp",label:"\u8F93\u5165\u9879\u8FC7\u6EE4\u5BF9\u5E94\u7684 treeNode \u5C5E\u6027",component:"Input",componentProps:{defaultValue:"value"}},{name:"treeNodeLabelProp",label:"\u4F5C\u4E3A\u663E\u793A\u7684 prop \u8BBE\u7F6E",component:"Input",componentProps:{defaultValue:"title"}},{name:"dropdownClassName",label:"\u4E0B\u62C9\u83DC\u5355\u7684 className \u5C5E\u6027",component:"Input",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u4E0B\u62C9\u83DC\u5355\u7684 className \u5C5E\u6027"}},{name:"labelInValue",label:"\u9009\u9879\u7684label\u5305\u88C5\u5230value\u4E2D",component:"Checkbox"},{name:"treeIcon",label:"\u5C55\u793ATreeNode title\u524D\u7684\u56FE\u6807",component:"Checkbox"},{name:"treeCheckable",label:"\u9009\u9879\u53EF\u52FE\u9009",component:"Checkbox"},{name:"treeCheckStrictly",label:"\u8282\u70B9\u9009\u62E9\u5B8C\u5168\u53D7\u63A7",component:"Checkbox"},{name:"treeDefaultExpandAll",label:"\u9ED8\u8BA4\u5C55\u5F00\u6240\u6709",component:"Checkbox"},{name:"treeLine",label:"\u662F\u5426\u5C55\u793A\u7EBF\u6761\u6837\u5F0F",component:"Checkbox"},{name:"maxTagCount",label:"\u6700\u591A\u663E\u793A\u591A\u5C11\u4E2A tag",component:"InputNumber",componentProps:{placeholder:"\u6700\u591A\u663E\u793A\u591A\u5C11\u4E2A tag"}},{name:"size",label:"\u5C3A\u5BF8",component:"RadioGroup",componentProps:{options:[{label:"\u9ED8\u8BA4",value:"default"},{label:"\u5C0F",value:"small"}]}}],Cascader:[{name:"expandTrigger",label:"\u6B21\u7EA7\u5C55\u5F00\u65B9\u5F0F(\u9ED8\u8BA4click)",component:"RadioGroup",componentProps:{options:[{label:"click",value:"click"},{label:"hover",value:"hover"}]}}],Button:[{name:"type",label:"\u7C7B\u578B",component:"RadioGroup",componentProps:{options:[{label:"default",value:"default"},{label:"primary",value:"primary"},{label:"danger",value:"danger"},{label:"dashed",value:"dashed"}]}},{name:"handle",label:"\u64CD\u4F5C",component:"RadioGroup",componentProps:{options:[{label:"\u63D0\u4EA4",value:"submit"},{label:"\u91CD\u7F6E",value:"reset"}]}}],Upload:[{name:"action",label:"\u4E0A\u4F20\u5730\u5740",component:"Input"},{name:"name",label:"\u9644\u4EF6\u53C2\u6570\u540D\uFF08name\uFF09",component:"Input"}],slot:[{name:"slotName",label:"\u63D2\u69FD\u540D\u79F0",component:"Input"}],Transfer:[{name:"oneWay",label:"\u5C55\u793A\u4E3A\u5355\u5411\u6837\u5F0F",component:"Checkbox"},{name:"pagination",label:"\u4F7F\u7528\u5206\u9875\u6837\u5F0F",component:"Checkbox"},{name:"showSelectAll",label:"\u5C55\u793A\u5168\u9009\u52FE\u9009\u6846",component:"Checkbox"}]};function A(e,p){e.forEach((o,r)=>{o.name==p&&e.splice(r,1)})}F.StrengthMeter=F.Input;F.StrengthMeter.push({name:"visibilityToggle",label:"\u662F\u5426\u663E\u793A\u5207\u6362\u6309\u94AE",component:"Checkbox"});A(F.StrengthMeter,"type");A(F.StrengthMeter,"prefix");A(F.StrengthMeter,"defaultValue");A(F.StrengthMeter,"suffix");const N=F,ne=(e,p)=>{const o=e.findIndex((r,d)=>r.name==p);if(o&&e[o].componentProps)return e[o].componentProps},le={RadioGroup:(e,p)=>{const o=ne(p,"size");o&&(e.optionType&&e.optionType!="button"?(o.disabled=!0,e.size=null):o.disabled=!1)}},ae=T({name:"ComponentProps",components:{FormOptions:q,Empty:M,Input:w,Form:Q,FormItem:X,Switch:z,Checkbox:L,Select:G,InputNumber:$,RadioGroup:H,RadioButtonGroup:W,Col:Z,Row:ee},setup(){const e=V([]),p=u=>u?u.includes(o.value.currentItem.component):!0,{formConfig:o}=j();o.value.currentItem&&(o.value.currentItem.componentProps=o.value.currentItem.componentProps||{}),I(()=>{var u;return(u=o.value.currentItem)==null?void 0:u.field},(u,a)=>{o.value.schemas&&J(o.value.schemas,t=>{if(t.link){const c=t.link.findIndex(f=>f===a);c!==-1&&K(t.link,c)}})}),I(()=>o.value.currentItem&&o.value.currentItem.component,()=>{e.value=[],ue.forEach(u=>{u.category="control",u.includes?u.includes.includes(o.value.currentItem.component)&&e.value.push(u):e.value.push(u)}),oe.forEach(u=>{u.category="input",u.includes?u.includes.includes(o.value.currentItem.component)&&e.value.push(u):u.exclude&&u.exclude.includes(o.value.currentItem.component)||e.value.push(u)}),N[o.value.currentItem.component]&&N[o.value.currentItem.component].forEach(u=>y(this,null,function*(){u.component&&(["Switch","Checkbox","Radio"].includes(u.component)?(u.category="control",e.value.push(u)):(u.category="input",e.value.push(u)))}))},{immediate:!0});const r=D(()=>e.value.filter(u=>u.category=="control")),d=D(()=>e.value.filter(u=>u.category=="input"));I(()=>o.value.currentItem.componentProps,()=>{const u=le[o.value.currentItem.component];u&&u(o.value.currentItem.componentProps,e.value)},{immediate:!0,deep:!0});const h=D(()=>o.value.schemas&&o.value.schemas.filter(u=>u.key!==o.value.currentItem.key).map(({label:u,field:a})=>({label:u+"/"+a,value:a})));return{formConfig:o,showControlAttrs:p,linkOptions:h,controlOptions:r,inputOptions:d}}}),te={class:"properties-content"},pe={key:0,class:"properties-body"},re={key:0},ce={key:0};function me(e,p,o,r,d,h){const u=b("Empty"),a=b("FormItem"),t=b("Checkbox"),c=b("Col"),f=b("Select"),g=b("FormOptions"),R=b("Form");return l(),i("div",te,[e.formConfig.currentItem?(l(),i("div",pe,[e.formConfig.currentItem.key?E("",!0):(l(),m(u,{key:0,class:"hint-box",description:"\u672A\u9009\u62E9\u7EC4\u4EF6"})),B(R,{"label-align":"left",layout:"vertical"},{default:s(()=>[e.formConfig.currentItem&&e.formConfig.currentItem.componentProps?(l(),i("div",re,[(l(!0),i(P,null,k(e.inputOptions,n=>(l(),m(a,{key:n.name,label:n.label},{default:s(()=>[n.children?(l(),i("div",ce,[(l(!0),i(P,null,k(n.children,(C,v)=>(l(),m(S(C.component),x({key:v},C.componentProps,{value:e.formConfig.currentItem.componentProps[n.name][v],"onUpdate:value":Y=>e.formConfig.currentItem.componentProps[n.name][v]=Y}),null,16,["value","onUpdate:value"]))),128))])):(l(),m(S(n.component),x({key:1,class:"component-prop"},n.componentProps,{value:e.formConfig.currentItem.componentProps[n.name],"onUpdate:value":C=>e.formConfig.currentItem.componentProps[n.name]=C}),null,16,["value","onUpdate:value"]))]),_:2},1032,["label"]))),128)),B(a,{label:"\u63A7\u5236\u5C5E\u6027"},{default:s(()=>[(l(!0),i(P,null,k(e.controlOptions,n=>(l(),m(c,{key:n.name},{default:s(()=>[e.showControlAttrs(n.includes)?(l(),m(t,x({key:0},n.componentProps,{checked:e.formConfig.currentItem.componentProps[n.name],"onUpdate:checked":C=>e.formConfig.currentItem.componentProps[n.name]=C}),{default:s(()=>[O(U(n.label),1)]),_:2},1040,["checked","onUpdate:checked"])):E("",!0)]),_:2},1024))),128))]),_:1})])):E("",!0),B(a,{label:"\u5173\u8054\u5B57\u6BB5"},{default:s(()=>[B(f,{mode:"multiple",value:e.formConfig.currentItem.link,"onUpdate:value":p[0]||(p[0]=n=>e.formConfig.currentItem.link=n),options:e.linkOptions},null,8,["value","options"])]),_:1}),["Select","CheckboxGroup","RadioGroup","TreeSelect","Cascader","AutoComplete"].includes(e.formConfig.currentItem.component)?(l(),m(a,{key:1,label:"\u9009\u9879"},{default:s(()=>[B(g)]),_:1})):E("",!0),["Grid"].includes(e.formConfig.currentItem.component)?(l(),m(a,{key:2,label:"\u6805\u683C"},{default:s(()=>[B(g)]),_:1})):E("",!0)]),_:1})])):E("",!0)])}var Te=_(ae,[["render",me]]);export{Te as default};
