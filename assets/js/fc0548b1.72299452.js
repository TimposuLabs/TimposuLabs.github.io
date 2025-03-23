"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[2752],{56144:(t,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"java-collection/sorting-collection","title":"Sorting Collection","description":"Sorting atau pengurutan adalah algoritma yang sudah biasa kita lakukan. Pada Java Collection juga sudah disediakan cara untuk melakukan pengurutan, jadi kita tidak perlu melakukan pengurutan secara manual. Namun perlu diingat, yang bisa di sort hanyalah List, karena Set, Queue, Deque dan Map cara kerjanya sudah khusus, jadi pengurutan hanya bisa dilakukan di List.","source":"@site/tutorial/java/java-collection/18-sorting-collection.md","sourceDirName":"java-collection","slug":"/java-collection/sorting-collection","permalink":"/java/java-collection/sorting-collection","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":18,"frontMatter":{"sidebar_position":18,"title":"Sorting Collection"},"sidebar":"tutorialSidebar","previous":{"title":"Legacy Collection","permalink":"/java/java-collection/legacy-collection"},"next":{"title":"Binary Search Collection","permalink":"/java/java-collection/binary-search"}}');var e=a(74848),i=a(28453);const o={sidebar_position:18,title:"Sorting Collection"},s=void 0,l={},c=[{value:"Sorting pada List",id:"sorting-pada-list",level:2}];function d(t){const n={code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...t.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(n.p,{children:[(0,e.jsx)(n.code,{children:"Sorting"})," atau pengurutan adalah algoritma yang sudah biasa kita lakukan. Pada Java Collection juga sudah disediakan cara untuk melakukan pengurutan, jadi kita tidak perlu melakukan pengurutan secara manual. ","\u26a0\ufe0f"," ",(0,e.jsx)(n.strong,{children:"Namun"})," perlu diingat, yang bisa di sort hanyalah ",(0,e.jsx)(n.code,{children:"List"}),", karena ",(0,e.jsx)(n.code,{children:"Set"}),", ",(0,e.jsx)(n.code,{children:"Queue"}),", ",(0,e.jsx)(n.code,{children:"Deque"})," dan ",(0,e.jsx)(n.code,{children:"Map"})," cara kerjanya sudah khusus, jadi pengurutan hanya bisa dilakukan di ",(0,e.jsx)(n.code,{children:"List"}),"."]}),"\n",(0,e.jsx)(n.h2,{id:"sorting-pada-list",children:"Sorting pada List"}),"\n",(0,e.jsxs)(n.table,{children:[(0,e.jsx)(n.thead,{children:(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.th,{children:"Method"}),(0,e.jsx)(n.th,{children:"Keterangan"})]})}),(0,e.jsxs)(n.tbody,{children:[(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:(0,e.jsx)(n.code,{children:"Collections.sort(list)"})}),(0,e.jsx)(n.td,{children:"Mengurutkan list dengan comparable bawaan element"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:(0,e.jsx)(n.code,{children:"Collections.sort(list, comparator)"})}),(0,e.jsx)(n.td,{children:"Mengurutkan list dengan comparator"})]})]})]}),"\n",(0,e.jsx)(n.p,{children:"Contoh:"}),"\n",(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-java",children:'import java.util.ArrayList;\r\nimport java.util.Collections;\r\nimport java.util.Comparator;\r\nimport java.util.List;\r\n\r\n// Sort hanya bisa di List\r\npublic class DemoSortCollection {\r\n\t\r\n\tpublic static void main(String[] args) {\r\n\t\tList<String> names = new ArrayList<String>();\t\t\r\n\t\tnames.addAll(List.of("Rani", "Endang", "Upik", "Mike"));\r\n\t\t\r\n\t\t// Contoh sort\r\n\t\tCollections.sort(names);\r\n\t\t\r\n\t\tfor (var name : names) {\r\n\t\t\tSystem.out.println(name);\r\n\t\t}\r\n\t\t\r\n\t\tSystem.out.println();\r\n\t\t\r\n\t\t// Contoh sort with comparator\r\n\t\tCollections.sort(names, new MyComparator());\r\n\t\t\r\n\t\tfor (var name : names) {\r\n\t\t\tSystem.out.println(name);\r\n\t\t}\r\n\t}\r\n\t\r\n\tstatic class MyComparator implements Comparator<String> {\r\n\r\n\t\t// reverse sort\r\n\t\t@Override\r\n\t\tpublic int compare(String o1, String o2) {\r\n\t\t\treturn o2.compareTo(o1);\r\n\t\t}\r\n\t\t\r\n\t}\r\n\r\n}\n'})}),"\n",(0,e.jsx)(n.p,{children:"Output:"}),"\n",(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{children:"Endang\r\nMike\r\nRani\r\nUpik\r\n\r\nUpik\r\nRani\r\nMike\r\nEndang\n"})})]})}function u(t={}){const{wrapper:n}={...(0,i.R)(),...t.components};return n?(0,e.jsx)(n,{...t,children:(0,e.jsx)(d,{...t})}):d(t)}},28453:(t,n,a)=>{a.d(n,{R:()=>o,x:()=>s});var r=a(96540);const e={},i=r.createContext(e);function o(t){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function s(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(e):t.components||e:o(t.components),r.createElement(i.Provider,{value:n},t.children)}}}]);