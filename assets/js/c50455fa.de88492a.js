"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[2582],{2317:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>d,default:()=>u,frontMatter:()=>l,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"java-collection/default-method","title":"Default Method","description":"Di Java 8 ada fitur bernama Default Method, dimana kita bisa menambahkan konkrit method di interface. Fitur ini banyak sekali digunakan di Java Collection, karena kita tahu semua collection di Java memiliki kontrak interface, sehingga dengan mudah di Java bisa meng-improve kemampuan semua collection hanya dengan menambahkan default method di interface collection-nya.","source":"@site/tutorial/java/java-collection/22-default-method.md","sourceDirName":"java-collection","slug":"/java-collection/default-method","permalink":"/java/java-collection/default-method","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":22,"frontMatter":{"sidebar_position":22,"title":"Default Method"},"sidebar":"tutorialSidebar","previous":{"title":"Abstract Class Collections","permalink":"/java/java-collection/abstract-class-collections"},"next":{"title":"Spliterator Interface","permalink":"/java/java-collection/spliterator-interface"}}');var i=n(4848),r=n(8453);const l={sidebar_position:22,title:"Default Method"},d=void 0,o={},c=[{value:"Default Method di Collection",id:"default-method-di-collection",level:2},{value:"Default Method di Map",id:"default-method-di-map",level:2}];function s(e){const t={code:"code",h2:"h2",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"Di Java 8 ada fitur bernama Default Method, dimana kita bisa menambahkan konkrit method di interface. Fitur ini banyak sekali digunakan di Java Collection, karena kita tahu semua collection di Java memiliki kontrak interface, sehingga dengan mudah di Java bisa meng-improve kemampuan semua collection hanya dengan menambahkan default method di interface collection-nya."}),"\n",(0,i.jsx)(t.h2,{id:"default-method-di-collection",children:"Default Method di Collection"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Default Method"}),(0,i.jsx)(t.th,{children:"Keterangan"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"Iterable.forEach(consumer)"})}),(0,i.jsx)(t.td,{children:"Melakukan iterasi seluruh data collection"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"List.removeIf(predicate)"})}),(0,i.jsx)(t.td,{children:"Menghapus data di collection menggunakan predicate"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"List.replaceAll(operator)"})}),(0,i.jsx)(t.td,{children:"Mengubah seluruh data di collection"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"getOrDefault(key, defaultValue)"})}),(0,i.jsxs)(t.td,{children:["Mengambil data berdasarkan key, jika tidak ada, return ",(0,i.jsx)(t.code,{children:"defaultValue"})]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"forEach(consumer)"})}),(0,i.jsx)(t.td,{children:"Melakukan iterasi seluruh data key-value"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"replaceAll(function)"})}),(0,i.jsx)(t.td,{children:"Mengubah seluruh data value"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"putIfAbsent(key, value)"})}),(0,i.jsx)(t.td,{children:"Simpan data ke map jika belum ada"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"remove(key, value)"})}),(0,i.jsx)(t.td,{children:"Hapus jika key-value nya sama"})]})]})]}),"\n",(0,i.jsx)(t.p,{children:"Contoh:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-java",children:'import java.util.ArrayList;\nimport java.util.List;\nimport java.util.function.Consumer;\nimport java.util.function.Predicate;\nimport java.util.function.UnaryOperator;\n\npublic class DemoDefaultMethod {\n\n\tpublic static void main(String[] args) {\n\t\tdefaultMethodCollection();\n\t}\n\n\tprivate static void defaultMethodCollection() {\n\t\tList<Integer> numbers = new ArrayList<Integer>();\n\n\t\tfor (int i = 1; i <= 100; i++) {\n\t\t\tnumbers.add(i);\n\t\t}\n\n\t\tSystem.out.println(numbers);\n\n\t\t// replaceAll default method untuk melakukan replace value dalam elemen\n\t\tnumbers.replaceAll(new UnaryOperator<Integer>() {\n\n\t\t\t@Override\n\t\t\tpublic Integer apply(Integer value) {\n\t\t\t\treturn value * 10;\n\t\t\t}\n\t\t});\n\n\t\tSystem.out.println(numbers);\n\n\t\t/** Looping forEach **/\n\t\t// looping dengan forEach\n\t\tfor (var number : numbers) {\n\t\t\tSystem.out.println(number);\n\t\t}\n\n\t\t// looping dengan forEach method consumer\n\t\tnumbers.forEach(new Consumer<Integer>() {\n\t\t\t@Override\n\t\t\tpublic void accept(Integer value) {\n\t\t\t\tSystem.out.println("nilai ke: " + value);\n\t\t\t}\n\t\t});\n\n\t\t// looping dengan forEach method consumer dengan lambda\n\t\tnumbers.forEach((value) -> System.out.println("Value ke: " + value));\n\n\t\t/** Remove If **/\n\t\t// remove if dengan removeIf() method\n\t\tnumbers.removeIf(new Predicate<Integer>() {\n\t\t\t@Override\n\t\t\tpublic boolean test(Integer value) {\n\t\t\t\treturn value > 500;\n\t\t\t}\n\t\t});\n\n\t\t// remove if dengan removeIf() method predicate dengan lambda\n\t\tnumbers.removeIf(value -> value > 500);\n\n\t\tSystem.out.println(numbers);\n\t}\n}\n'})}),"\n",(0,i.jsx)(t.h2,{id:"default-method-di-map",children:"Default Method di Map"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Default Method"}),(0,i.jsx)(t.th,{children:"Keterangan"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"replace(key, oldValue, newValue)"})}),(0,i.jsxs)(t.td,{children:["Ubah key jika value sekarang sama dengan ",(0,i.jsx)(t.code,{children:"oldValue"})]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"computeIfAbsent(key, function)"})}),(0,i.jsx)(t.td,{children:"Ubah key dengan value hasil function jika belum ada"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:"computeIfPresent(key, function)"})}),(0,i.jsx)(t.td,{children:"Ubah key dengan value hasil function jika sudah ada"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"\u2026 dan masih banyak"}),(0,i.jsx)(t.td,{})]})]})]}),"\n",(0,i.jsxs)(t.p,{children:["Contoh penggunaan default method pada ",(0,i.jsx)(t.code,{children:"Map"}),":"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-java",children:'Map<String, String> countrys = new HashMap<String, String>();\ncountrys.put("id", "Indonesia");\ncountrys.put("vn", "Vietnam");\ncountrys.put("th", "Thailand");\ncountrys.put("ph", "Philippines");\n\n// menggunakan forEach default method\ncountrys.forEach(new BiConsumer<String, String>() {\n\t@Override\n\tpublic void accept(String k, String v) {\n\t\tSystem.out.println("Key: " + k + ", value: " + v);\t\t\t\t\n\t}\n});\n\n// menggunakan forEach default method dengan lambda\ncountrys.forEach((k, v) -> System.out.println("Key: " + k + ", value: " + v));\n'})})]})}function u(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>l,x:()=>d});var a=n(6540);const i={},r=a.createContext(i);function l(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);