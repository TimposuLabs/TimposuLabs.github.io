"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[5813],{26311:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>s,contentTitle:()=>o,default:()=>p,frontMatter:()=>l,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"java-collection/immutable-map","title":"Immutable Map","description":"Sama seperti List dan Set, pada Map juga kita dapat membuatnya menjadi Immutable.","source":"@site/tutorial/java/java-collection/13-immutable-map.md","sourceDirName":"java-collection","slug":"/java-collection/immutable-map","permalink":"/java/java-collection/immutable-map","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":13,"frontMatter":{"sidebar_position":13,"title":"Immutable Map"},"sidebar":"tutorialSidebar","previous":{"title":"Java Map","permalink":"/java/java-collection/map"},"next":{"title":"Java SortedMap","permalink":"/java/java-collection/sortedmap"}}');var r=a(74848),i=a(28453);const l={sidebar_position:13,title:"Immutable Map"},o=void 0,s={},c=[];function d(t){const e={code:"code",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...t.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(e.p,{children:["Sama seperti ",(0,r.jsx)(e.code,{children:"List"})," dan ",(0,r.jsx)(e.code,{children:"Set"}),", pada ",(0,r.jsx)(e.code,{children:"Map"})," juga kita dapat membuatnya menjadi Immutable."]}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Method"}),(0,r.jsx)(e.th,{children:"Keterangan"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:(0,r.jsx)(e.code,{children:"Collections.emptyMap()"})}),(0,r.jsx)(e.td,{children:"Membuat immutable Map kosong"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:(0,r.jsx)(e.code,{children:"Collections.unmodifiableMap(map)"})}),(0,r.jsx)(e.td,{children:"Mengubah mutable"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:(0,r.jsx)(e.code,{children:"Collections.singletonMap(key, value)"})}),(0,r.jsx)(e.td,{children:"Membuat Map dengan satu jumlah key-value"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:(0,r.jsx)(e.code,{children:"Map.of(...)"})}),(0,r.jsx)(e.td,{children:"Membuat immutable Map banyak elemen dari key-value"})]})]})]}),"\n",(0,r.jsx)(e.p,{children:"Contoh:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-java",children:'import java.util.Collections;\r\nimport java.util.HashMap;\r\nimport java.util.Map;\r\n\r\npublic class DemoImmutableMap {\r\n\r\n\tpublic static void main(String[] args) {\r\n\t\t\r\n\t\t// Membuat Map Kosong\r\n\t\tMap<String, String> emptyMap = Collections.emptyMap();\r\n\t\t// Membuat Map dengan satu elemen\r\n\t\tMap<String, String> singelMap = Collections.singletonMap("name", "Ucup");\r\n\t\t\r\n\t\t// Membuat Map Mutable\r\n\t\tMap<String, String> muttableMap = new HashMap<String, String>();\r\n\t\tmuttableMap.put("id", "Indonesia");\r\n\t\tmuttableMap.put("jp", "Japan");\r\n\t\t\r\n\t\t// Menjadikan Map Mutable menjadi Immutable\r\n\t\tMap<String, String> immutableMap = Collections.unmodifiableMap(muttableMap);\r\n\t\t\r\n\t\t// Menjadikan Map Immutable dengan banyak elemen\r\n\t\tMap<String, String> listImmutableMap = Map.of(\r\n\t\t\t\t\t"ec", "Ecuador",\r\n\t\t\t\t\t"de", "Germany",\r\n\t\t\t\t\t"vn", "Vietnam"\t\t\t\t\t\r\n\t\t\t\t);\r\n\t\t\r\n//\t\tlistImmutableMap.put("us", "United State"); // Error\r\n\t}\r\n\r\n}\n'})})]})}function p(t={}){const{wrapper:e}={...(0,i.R)(),...t.components};return e?(0,r.jsx)(e,{...t,children:(0,r.jsx)(d,{...t})}):d(t)}},28453:(t,e,a)=>{a.d(e,{R:()=>l,x:()=>o});var n=a(96540);const r={},i=n.createContext(r);function l(t){const e=n.useContext(i);return n.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function o(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:l(t.components),n.createElement(i.Provider,{value:e},t.children)}}}]);