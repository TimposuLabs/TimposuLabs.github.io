"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[8437],{29220:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>u,contentTitle:()=>o,default:()=>l,frontMatter:()=>r,metadata:()=>a,toc:()=>p});const a=JSON.parse('{"id":"java-unit-test/test-information","title":"Informasi Test","description":"Walaupun mungkin jarang kita gunakan, tapi kita juga bisa mendapatkan informasi test yang sedang berjalan menggunakan interface TestInfo. Kita bisa menambahkan TestInfo sebagai parameter di function unit test.","source":"@site/tutorial/java/java-unit-test/14-test-information.md","sourceDirName":"java-unit-test","slug":"/java-unit-test/test-information","permalink":"/java/java-unit-test/test-information","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":14,"frontMatter":{"sidebar_position":14,"title":"Informasi Test"},"sidebar":"tutorialSidebar","previous":{"title":"Test di dalam Test","permalink":"/java/java-unit-test/test-di-dalam-test copy"},"next":{"title":"Depedency Injections di Test","permalink":"/java/java-unit-test/depedency-injection-in-test"}}');var i=e(74848),s=e(28453);const r={sidebar_position:14,title:"Informasi Test"},o=void 0,u={},p=[];function m(t){const n={code:"code",p:"p",pre:"pre",...(0,s.R)(),...t.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["Walaupun mungkin jarang kita gunakan, tapi kita juga bisa mendapatkan informasi test yang sedang berjalan menggunakan interface ",(0,i.jsx)(n.code,{children:"TestInfo"}),". Kita bisa menambahkan ",(0,i.jsx)(n.code,{children:"TestInfo"})," sebagai parameter di function unit test."]}),"\n",(0,i.jsx)(n.p,{children:"Contoh:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:'import org.junit.jupiter.api.DisplayName;\r\nimport org.junit.jupiter.api.Tag;\r\nimport org.junit.jupiter.api.Tags;\r\nimport org.junit.jupiter.api.Test;\r\nimport org.junit.jupiter.api.TestInfo;\r\n\r\n@DisplayName("Information Test")\r\npublic class DemoInformationTest {\r\n\t\r\n\t@Test\r\n\t@DisplayName("this my test")\r\n\t@Tags({\r\n\t\t@Tag("tag1"),\r\n\t\t@Tag("tag2")\r\n\t})\r\n\tvoid myTest(TestInfo info) {\r\n\t\tSystem.out.println(info.getDisplayName());\r\n\t\tSystem.out.println(info.getTags());\r\n\t\tSystem.out.println(info.getTestClass().orElse(null));\r\n\t\tSystem.out.println(info.getTestMethod().orElse(null));\r\n\t}\r\n\r\n}\n'})}),"\n",(0,i.jsx)(n.p,{children:"Output pada console:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"this my test\r\n[tag1, tag2]\r\nclass com.timposulabs.belajar.DemoInformationTest\r\nvoid com.timposulabs.belajar.DemoInformationTest.myTest(org.junit.jupiter.api.TestInfo)\n"})})]})}function l(t={}){const{wrapper:n}={...(0,s.R)(),...t.components};return n?(0,i.jsx)(n,{...t,children:(0,i.jsx)(m,{...t})}):m(t)}},28453:(t,n,e)=>{e.d(n,{R:()=>r,x:()=>o});var a=e(96540);const i={},s=a.createContext(i);function r(t){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function o(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:r(t.components),a.createElement(s.Provider,{value:n},t.children)}}}]);