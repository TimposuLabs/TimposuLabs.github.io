"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[7059],{16427:(a,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>s,default:()=>d,frontMatter:()=>m,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"java-lambda/lambda-parameter","title":"Lambda Parameter","description":"Pada tutorial sebelumnya kita sudah membuat Lambda pertama, pada tutorial kali ini kita akan membuat Lambda dengan parameter method String action(String message).","source":"@site/tutorial/java/java-lambda/03-lambda-parameter.md","sourceDirName":"java-lambda","slug":"/java-lambda/lambda-parameter","permalink":"/java/java-lambda/lambda-parameter","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3,"title":"Lambda Parameter"},"sidebar":"tutorialSidebar","previous":{"title":"Membuat Lambda","permalink":"/java/java-lambda/membuat-lambda"},"next":{"title":"Functional Interface","permalink":"/java/java-lambda/functional-interface"}}');var r=n(74848),i=n(28453);const m={sidebar_position:3,title:"Lambda Parameter"},s=void 0,o={},c=[{value:"Function Interface",id:"function-interface",level:2},{value:"Menggunakan Lambda",id:"menggunakan-lambda",level:2}];function l(a){const e={code:"code",h2:"h2",p:"p",pre:"pre",...(0,i.R)(),...a.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(e.p,{children:["Pada tutorial sebelumnya kita sudah membuat Lambda pertama, pada tutorial kali ini kita akan membuat Lambda dengan parameter method ",(0,r.jsx)(e.code,{children:"String action(String message)"}),"."]}),"\n",(0,r.jsx)(e.h2,{id:"function-interface",children:"Function Interface"}),"\n",(0,r.jsxs)(e.p,{children:["Membuat Function Interface dengan parameter method ",(0,r.jsx)(e.code,{children:"String action(String message)"}),":"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-java",children:"@FunctionalInterface\ninterface SimpleActionParameter {\n\n    String action(String message);\n\n}\n"})}),"\n",(0,r.jsx)(e.h2,{id:"menggunakan-lambda",children:"Menggunakan Lambda"}),"\n",(0,r.jsx)(e.p,{children:"Interface functional di atas dapat digunakan menggunakan lambda seperti di bawah ini:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-java",children:'// menggunakan Lambda dengan menuliskan type parameter\nSimpleActionParameter actionParameter1 = (String message) -> {\n    return "Message 1: " + message;\n};\n\n'})}),"\n",(0,r.jsx)(e.p,{children:"Penulisan ekspresi lambda di atas dapat di variasikan seperti contoh di bawah ini:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-java",children:'@FunctionalInterface\ninterface SimpleActionParameter {\n\n    String action(String message);\n\n}\n\npublic class DemoLambdaParameter {\n    public static void main(String[] args) {\n\n        // menggunakan Lambda dengan menuliskan type parameter\n        SimpleActionParameter actionParameter1 = (String message) -> {\n            return "Message 1: " + message;\n        };\n\n        System.out.println(actionParameter1.action("Salam dari lambda parameter 1"));\n\n        // menggunakan Lambda tanpa menuliskan type parameter\n        SimpleActionParameter actionParameter2 = (message) -> {\n            return "Message 2: " + message;\n        };\n\n        System.out.println(actionParameter2.action("Salam dari lambda parameter 2"));\n\n        // Lambda tanpa blok: jika block dalam 1 line\n        SimpleActionParameter actionParameter3 = (String message) -> "Message 3: " + message;\n        SimpleActionParameter actionParameter4 = (message) -> "Message 4: " + message;\n        SimpleActionParameter actionParameter5 = message -> "Message 5: " + message;\n\n        System.out.println(actionParameter3.action("Salam dari lambda parameter 3"));\n        System.out.println(actionParameter4.action("Salam dari lambda parameter 4"));\n        System.out.println(actionParameter5.action("Salam dari lambda parameter 5"));\n    }\n}\n'})})]})}function d(a={}){const{wrapper:e}={...(0,i.R)(),...a.components};return e?(0,r.jsx)(e,{...a,children:(0,r.jsx)(l,{...a})}):l(a)}},28453:(a,e,n)=>{n.d(e,{R:()=>m,x:()=>s});var t=n(96540);const r={},i=t.createContext(r);function m(a){const e=t.useContext(i);return t.useMemo((function(){return"function"==typeof a?a(e):{...e,...a}}),[e,a])}function s(a){let e;return e=a.disableParentContext?"function"==typeof a.components?a.components(r):a.components||r:m(a.components),t.createElement(i.Provider,{value:e},a.children)}}}]);