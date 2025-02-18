"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[9288],{3498:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>s});const a=JSON.parse('{"id":"java-collection/legacy-collection","title":"Legacy Collection","description":"Vector","source":"@site/tutorial/java/java-collection/17-legacy-collection.md","sourceDirName":"java-collection","slug":"/java-collection/legacy-collection","permalink":"/java/java-collection/legacy-collection","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":17,"frontMatter":{"sidebar_position":17,"title":"Legacy Collection"},"sidebar":"tutorialSidebar","previous":{"title":"Java EntryMap","permalink":"/java/java-collection/entrymap"},"next":{"title":"Sorting Collection","permalink":"/java/java-collection/sorting-collection"}}');var c=n(4848),o=n(8453);const i={sidebar_position:17,title:"Legacy Collection"},l=void 0,r={},s=[{value:"Vector",id:"vector",level:2},{value:"HashTable",id:"hashtable",level:2},{value:"Stack",id:"stack",level:2}];function p(e){const t={code:"code",h2:"h2",pre:"pre",...(0,o.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{id:"vector",children:"Vector"}),"\n",(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-java",children:'// Vector\nList<String> list = new Vector<String>();\nlist.add("Aco");\nlist.add("Dini");\nlist.add("Mike");\n\nfor (var name : list) {\n\tSystem.out.println(name);\n}\n'})}),"\n",(0,c.jsx)(t.h2,{id:"hashtable",children:"HashTable"}),"\n",(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-java",children:'// HashTable\nMap<String, String> map = new Hashtable<String, String>();\nmap.put("ph", "Philiphina");\nmap.put("vn", "Vietnam");\nmap.put("my", "Malaysia");\n\nfor (var m : map.keySet()) {\n\tSystem.out.println(m);\n}\n'})}),"\n",(0,c.jsx)(t.h2,{id:"stack",children:"Stack"}),"\n",(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-java",children:'// Stack\nStack<String> stack = new Stack<String>();\nstack.push("Dandi");\nstack.push("Sultan");\nstack.push("Fahmi");\n\n// Error: stack.pop() akan menimbulkan exception EmptyStackException jika stack 0\nfor (var value = stack.pop() ; value != null ; value = stack.pop()) {\n\tSystem.out.println(value); \n}\n'})})]})}function u(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(p,{...e})}):p(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>l});var a=n(6540);const c={},o=a.createContext(c);function i(e){const t=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:i(e.components),a.createElement(o.Provider,{value:t},e.children)}}}]);