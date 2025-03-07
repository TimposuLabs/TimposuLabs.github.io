"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[6443],{8919:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>a,toc:()=>l});const a=JSON.parse('{"id":"java-generic/generic-method","title":"Java Generic Method","description":"Selain class, Generic juga dapat digunakan pada method, contohnya:","source":"@site/tutorial/java/java-generic/03-generic-method.md","sourceDirName":"java-generic","slug":"/java-generic/generic-method","permalink":"/java/java-generic/generic-method","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"sidebar_position":6,"title":"Java Generic Method"},"sidebar":"tutorialSidebar","previous":{"title":"Java Generic Class","permalink":"/java/java-generic/generic-class"},"next":{"title":"Java Generic Invariant","permalink":"/java/java-generic/generic-invariant"}}');var r=n(74848),i=n(28453);const s={sidebar_position:6,title:"Java Generic Method"},o=void 0,c={},l=[];function u(e){const t={code:"code",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.p,{children:"Selain class, Generic juga dapat digunakan pada method, contohnya:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-java",children:'public class DemoMethodGeneric {\r\n\t\r\n\tstatic <T> void printArray(T[] theArray) {\r\n\t\tfor (var i : theArray) {\r\n\t\t\tSystem.out.println("value: " + i);\r\n\t\t}\r\n\t}\r\n\t\r\n\tstatic <X, Y> String sayHello(X names, Y city) {\r\n\t\treturn "Nama saya: " + names + ", Kota saya di: " + city;\r\n\t}\r\n\r\n\t\r\n\tpublic static void main(String[] args) {\r\n\t\tString[] theArrayNames = {"Ucup", "Ade", "Recky", "Restu"};\r\n\t\tInteger[] theArrayAge = {27, 23, 25, 26};\r\n\t\tDouble[] theArraySalary = {200000.33, 190000.55, 300000.11, 4500.50};\r\n\t\t\t\t\r\n\t\tprintArray(theArrayNames);\r\n\t\tprintArray(theArrayAge);\r\n\t\tprintArray(theArraySalary);\r\n\t\t\r\n\t\tSystem.out.println();\r\n\t\tSystem.out.println(sayHello("Ade", "Pasuruan"));\r\n\t\tSystem.out.println(sayHello("Recky", "Palembang"));\r\n\t}\r\n\t\r\n}\n'})}),"\n",(0,r.jsx)(t.p,{children:"Output:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"value: Ucup\r\nvalue: Ade\r\nvalue: Recky\r\nvalue: Restu\r\nvalue: 27\r\nvalue: 23\r\nvalue: 25\r\nvalue: 26\r\nvalue: 200000.33\r\nvalue: 190000.55\r\nvalue: 300000.11\r\nvalue: 4500.5\r\n\r\nNama saya: Ade, Kota saya di: Pasuruan\r\nNama saya: Recky, Kota saya di: Palembang\n"})})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>o});var a=n(96540);const r={},i=a.createContext(r);function s(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),a.createElement(i.Provider,{value:t},e.children)}}}]);