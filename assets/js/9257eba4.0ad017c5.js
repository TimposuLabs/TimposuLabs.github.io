"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[8788],{25577:(a,n,t)=>{t.r(n),t.d(n,{assets:()=>g,contentTitle:()=>r,default:()=>m,frontMatter:()=>d,metadata:()=>e,toc:()=>u});const e=JSON.parse('{"id":"java-unit-test/tag","title":"Tag","description":"Class atau method unit test bisa kita tambahkan tag (tanda) dengan menggunakan annotation @Tag. Dengan menambahkan tag ke dalam unit test, kita bisa fleksibel  ketika menjalan  unit test, bisa memilih tag mana yang mau di include atau di exclude. Jika kita menambahkan tag di class unit test, secara otomatis semua method unit test di dalam class tersebut akan memiliki tag tersebut. Jika kita ingin menambahkan beberapa tag di satu class atau method unit test, kita bisa menggunakan annotation @Tags.","source":"@site/tutorial/java/java-unit-test/10-tag.md","sourceDirName":"java-unit-test","slug":"/java-unit-test/tag","permalink":"/java/java-unit-test/tag","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":10,"frontMatter":{"sidebar_position":10,"title":"Tag"},"sidebar":"tutorialSidebar","previous":{"title":"Test Berdasarkan Kondisi","permalink":"/java/java-unit-test/test-berdasarkan-kondisi"},"next":{"title":"Sorted Unit Test","permalink":"/java/java-unit-test/sorted-test"}}');var i=t(74848),s=t(28453);const d={sidebar_position:10,title:"Tag"},r=void 0,g={},u=[{value:"Menggunakan Tag",id:"menggunakan-tag",level:2},{value:"Menjalankan JUnit dengan Tag di Maven",id:"menjalankan-junit-dengan-tag-di-maven",level:2},{value:"Menjalankan JUnit dengan Tag di IDE",id:"menjalankan-junit-dengan-tag-di-ide",level:2}];function o(a){const n={code:"code",h2:"h2",img:"img",p:"p",pre:"pre",...(0,s.R)(),...a.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["Class atau method unit test bisa kita tambahkan tag (tanda) dengan menggunakan annotation ",(0,i.jsx)(n.code,{children:"@Tag"}),". Dengan menambahkan tag ke dalam unit test, kita bisa fleksibel  ketika menjalan  unit test, bisa memilih tag mana yang mau di include atau di exclude. Jika kita menambahkan tag di class unit test, secara otomatis semua method unit test di dalam class tersebut akan memiliki tag tersebut. Jika kita ingin menambahkan beberapa tag di satu class atau method unit test, kita bisa menggunakan annotation ",(0,i.jsx)(n.code,{children:"@Tags"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"menggunakan-tag",children:"Menggunakan Tag"}),"\n",(0,i.jsx)(n.p,{children:"Berikut cara menggunakan tag pada unit test:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:'import org.junit.jupiter.api.Tag;\r\nimport org.junit.jupiter.api.Tags;\r\nimport org.junit.jupiter.api.Test;\r\n\r\n// jika hanya menggunakan 1 tag cukup gunakan @Tag, tapi pada contoh ini saya menggunakan @Tags\r\n@Tags({\r\n\t@Tag("demo-tag")\r\n})\r\npublic class DemoTagTest {\r\n\r\n\t@Test\r\n\tvoid test1() {\r\n\t\t\r\n\t}\r\n\t\r\n\t@Test\r\n\tvoid test2() {\r\n\t\t\r\n\t}\r\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Pada contoh kode di atas, class test di atas ditandai dengan tag ",(0,i.jsx)(n.code,{children:"demo-tag"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"menjalankan-junit-dengan-tag-di-maven",children:"Menjalankan JUnit dengan Tag di Maven"}),"\n",(0,i.jsx)(n.p,{children:"Untuk menjalankan unit test berdasarkan tag yang diinginkan pada maven, dapat dilakukan dengan perintah di bawha ini:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"mvn test -Dgroups=tag1,tag2\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Pada contoh di atas nama tag yang kita buata adalah ",(0,i.jsx)(n.code,{children:"demo-tag"}),", maka kita akan menggunakan perintah:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"mvn test -Dgroups=demo-tag\n"})}),"\n",(0,i.jsx)(n.h2,{id:"menjalankan-junit-dengan-tag-di-ide",children:"Menjalankan JUnit dengan Tag di IDE"}),"\n",(0,i.jsx)(n.p,{children:"Pada masing-masing IDE sudah terdapat fitur untuk menjalankan maven test berdasarkan tag. Silahkan merujuk ke dokumentasi masing-masing IDE bagaimana cara menggunakan tag pada unit test."}),"\n",(0,i.jsx)(n.p,{children:"Contoh konfigurasi JUnit pada Eclipse dengan menggunakan tag."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"tag",src:t(57642).A+"",width:"1010",height:"724"})})]})}function m(a={}){const{wrapper:n}={...(0,s.R)(),...a.components};return n?(0,i.jsx)(n,{...a,children:(0,i.jsx)(o,{...a})}):o(a)}},57642:(a,n,t)=>{t.d(n,{A:()=>e});const e=t.p+"assets/images/tag-junit-07a13dafdbe3148d0eb6fffa56c1ad88.png"},28453:(a,n,t)=>{t.d(n,{R:()=>d,x:()=>r});var e=t(96540);const i={},s=e.createContext(i);function d(a){const n=e.useContext(s);return e.useMemo((function(){return"function"==typeof a?a(n):{...n,...a}}),[n,a])}function r(a){let n;return n=a.disableParentContext?"function"==typeof a.components?a.components(i):a.components||i:d(a.components),e.createElement(s.Provider,{value:n},a.children)}}}]);