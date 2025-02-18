"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[2752],{6144:(t,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"java-collection/sorting-collection","title":"Sorting Collection","description":"Output:","source":"@site/tutorial/java/java-collection/18-sorting-collection.md","sourceDirName":"java-collection","slug":"/java-collection/sorting-collection","permalink":"/java/java-collection/sorting-collection","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":18,"frontMatter":{"sidebar_position":18,"title":"Sorting Collection"},"sidebar":"tutorialSidebar","previous":{"title":"Legacy Collection","permalink":"/java/java-collection/legacy-collection"},"next":{"title":"Binary Search","permalink":"/java/java-collection/binary-search"}}');var e=r(4848),i=r(8453);const a={sidebar_position:18,title:"Sorting Collection"},s=void 0,c={},l=[];function p(t){const n={code:"code",p:"p",pre:"pre",...(0,i.R)(),...t.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-java",children:'import java.util.ArrayList;\r\nimport java.util.Collections;\r\nimport java.util.Comparator;\r\nimport java.util.List;\r\n\r\n// Sort hanya bisa di List\r\npublic class DemoSortCollection {\r\n\t\r\n\tpublic static void main(String[] args) {\r\n\t\tList<String> names = new ArrayList<String>();\t\t\r\n\t\tnames.addAll(List.of("Rani", "Endang", "Upik", "Mike"));\r\n\t\t\r\n\t\t// Contoh sort\r\n\t\tCollections.sort(names);\r\n\t\t\r\n\t\tfor (var name : names) {\r\n\t\t\tSystem.out.println(name);\r\n\t\t}\r\n\t\t\r\n\t\tSystem.out.println();\r\n\t\t\r\n\t\t// Contoh sort with comparator\r\n\t\tCollections.sort(names, new MyComparator());\r\n\t\t\r\n\t\tfor (var name : names) {\r\n\t\t\tSystem.out.println(name);\r\n\t\t}\r\n\t}\r\n\t\r\n\tstatic class MyComparator implements Comparator<String> {\r\n\r\n\t\t// reverse sort\r\n\t\t@Override\r\n\t\tpublic int compare(String o1, String o2) {\r\n\t\t\treturn o2.compareTo(o1);\r\n\t\t}\r\n\t\t\r\n\t}\r\n\r\n}\n'})}),"\n",(0,e.jsx)(n.p,{children:"Output:"}),"\n",(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{children:"Endang\r\nMike\r\nRani\r\nUpik\r\n\r\nUpik\r\nRani\r\nMike\r\nEndang\n"})})]})}function m(t={}){const{wrapper:n}={...(0,i.R)(),...t.components};return n?(0,e.jsx)(n,{...t,children:(0,e.jsx)(p,{...t})}):p(t)}},8453:(t,n,r)=>{r.d(n,{R:()=>a,x:()=>s});var o=r(6540);const e={},i=o.createContext(e);function a(t){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function s(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(e):t.components||e:a(t.components),o.createElement(i.Provider,{value:n},t.children)}}}]);