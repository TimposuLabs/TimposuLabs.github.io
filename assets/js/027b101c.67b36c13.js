"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[657],{81652:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>a,toc:()=>o});const a=JSON.parse('{"id":"java-unit-test/mengubah-nama-test","title":"Mengubah Nama Unit Test","description":"Menggunakan DisplayName","source":"@site/tutorial/java/java-unit-test/04-mengubah-nama-test.md","sourceDirName":"java-unit-test","slug":"/java-unit-test/mengubah-nama-test","permalink":"/java/java-unit-test/mengubah-nama-test","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4,"title":"Mengubah Nama Unit Test"},"sidebar":"tutorialSidebar","previous":{"title":"Assertions","permalink":"/java/java-unit-test/assertions"},"next":{"title":"Disabled Unit Test","permalink":"/java/java-unit-test/disabled-test"}}');var s=t(74848),r=t(28453);const i={sidebar_position:4,title:"Mengubah Nama Unit Test"},l=void 0,u={},o=[{value:"Menggunakan DisplayName",id:"menggunakan-displayname",level:2},{value:"Menggunakan DisplayNameGenerator",id:"menggunakan-displaynamegenerator",level:2}];function c(e){const n={code:"code",h2:"h2",li:"li",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"menggunakan-displayname",children:"Menggunakan DisplayName"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-java",children:'@DisplayName("Test untuk pembagian sukses")\r\n@Test\r\npublic void testDivideSuccess() {\r\n\tvar result = calculator.divide(6, 2);\r\n\tassertEquals(3, result);\r\n}\n'})}),"\n",(0,s.jsx)(n.h2,{id:"menggunakan-displaynamegenerator",children:"Menggunakan DisplayNameGenerator"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Membuat class DisplayNameGenerator"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-java",children:'import java.lang.reflect.Method;\r\n\r\npublic class DemoDisplayNameGenerator implements org.junit.jupiter.api.DisplayNameGenerator {\r\n\r\n\t@Override\r\n\tpublic String generateDisplayNameForClass(Class<?> testClass) {\r\n\t\treturn "Test: " + testClass.getSimpleName();\r\n\t}\r\n\r\n\t@Override\r\n\tpublic String generateDisplayNameForNestedClass(Class<?> nestedClass) {\r\n\t\t// TODO Auto-generated method stub\r\n\t\treturn null;\r\n\t}\r\n\r\n\t@Override\r\n\tpublic String generateDisplayNameForMethod(Class<?> testClass, Method testMethod) {\r\n\t\treturn "Test: " + testClass.getSimpleName() + "." + testMethod.getName();\r\n\t}\r\n\r\n}\n'})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Menggunakan DisplayNameGenerator"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-java",children:"@DisplayNameGeneration(DemoDisplayNameGenerator.class)\r\npublic class AppTest { \r\n\r\n}\n"})})]})}function m(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>l});var a=t(96540);const s={},r=a.createContext(s);function i(e){const n=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),a.createElement(r.Provider,{value:n},e.children)}}}]);