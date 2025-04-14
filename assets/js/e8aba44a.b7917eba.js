"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[6631],{58216:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>r,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>u});const s=JSON.parse('{"id":"java-unit-test/assertions/assertions-null","title":"Assertions Null & NotNull","description":"Assertions Null digunakan untuk testing membandingkan nilainya aktualnya harus null, sedangkan Assertions Not Null perbandingan data aktualnya  tidak boleh null.","source":"@site/tutorial/java/java-unit-test/03-assertions/02-assertions-null.md","sourceDirName":"java-unit-test/03-assertions","slug":"/java-unit-test/assertions/assertions-null","permalink":"/java/java-unit-test/assertions/assertions-null","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"title":"Assertions Null & NotNull"},"sidebar":"tutorialSidebar","previous":{"title":"Assertions Equals & NotEquals","permalink":"/java/java-unit-test/assertions/assertions-equals"},"next":{"title":"Mengubah Nama Unit Test","permalink":"/java/java-unit-test/mengubah-nama-test"}}');var a=t(74848),l=t(28453);const i={sidebar_position:2,title:"Assertions Null & NotNull"},o=void 0,r={},u=[];function d(n){const e={code:"code",p:"p",pre:"pre",...(0,l.R)(),...n.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(e.p,{children:["Assertions Null digunakan untuk testing membandingkan nilainya aktualnya harus ",(0,a.jsx)(e.code,{children:"null"}),", sedangkan Assertions Not Null perbandingan data aktualnya  tidak boleh ",(0,a.jsx)(e.code,{children:"null"}),"."]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-java",children:"assertNull(actual);\nassertNotNull(actual);\n"})}),"\n",(0,a.jsxs)(e.p,{children:["Contoh kita akan menguji sebuat method sederhana yang akan melakuan penjumlahan dan validasi string ",(0,a.jsx)(e.code,{children:"null"}),":"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-java",children:"public Object checkNull(Object obj) {\n    if (obj != null) {\n        return obj;\n    }\n    return null;\n}\n"})}),"\n",(0,a.jsxs)(e.p,{children:["Melakukan testing menggunakan ",(0,a.jsx)(e.code,{children:"assertNull"})," dan ",(0,a.jsx)(e.code,{children:"assertNotNull"}),":"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-java",children:'@Test\nvoid testEqualsAndNotEquals() {\n    DemoUtils demoUtils = new DemoUtils();\n\n    assertEquals(6, demoUtils.add(4, 2), "4 + 2 harus 6");\n    assertNotEquals(6, demoUtils.add(4, 4), "4 + 4 tidak boleh 6");\n}\n'})})]})}function c(n={}){const{wrapper:e}={...(0,l.R)(),...n.components};return e?(0,a.jsx)(e,{...n,children:(0,a.jsx)(d,{...n})}):d(n)}},28453:(n,e,t)=>{t.d(e,{R:()=>i,x:()=>o});var s=t(96540);const a={},l=s.createContext(a);function i(n){const e=s.useContext(l);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:i(n.components),s.createElement(l.Provider,{value:e},n.children)}}}]);