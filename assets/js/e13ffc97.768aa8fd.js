"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[5747],{31477:(a,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>l,default:()=>c,frontMatter:()=>s,metadata:()=>i,toc:()=>d});var i=n(31331),t=n(74848),r=n(28453);const s={slug:"java-recursive-method",title:"Apa itu Java Recursive Method",authors:"topekox",tags:["java"]},l=void 0,o={authorsImageUrls:[void 0]},d=[{value:"Tanpa Recursive",id:"tanpa-recursive",level:2},{value:"Menggunakan Recursive method",id:"menggunakan-recursive-method",level:2},{value:"Masalah dalam Recursive method",id:"masalah-dalam-recursive-method",level:2},{value:"Kesimpulan",id:"kesimpulan",level:2}];function u(a){const e={code:"code",em:"em",h2:"h2",p:"p",pre:"pre",...(0,r.R)(),...a.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.p,{children:"Metode rekursif (recursive method) adalah teknik dalam pemrograman di mana sebuah fungsi memanggil dirinya sendiri untuk menyelesaikan masalah. Pada dasarnya, fungsi tersebut memecah masalah besar menjadi sub-masalah yang lebih kecil dan menyelesaikannya secara berulang hingga mencapai kondisi dasar (base case), yang berhenti memanggil fungsi lagi."}),"\n",(0,t.jsx)(e.h2,{id:"tanpa-recursive",children:"Tanpa Recursive"}),"\n",(0,t.jsx)(e.p,{children:"Misalkan kita membuat method perulangan yang akan melakukan perkalian dengan angka dibawahnya atau disebut (factorial)."}),"\n",(0,t.jsx)(e.p,{children:"Contoh:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public class DemoRecursiveMethod {\n\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(factorialLoop(5));\n\t}\n\t\n\tstatic int factorialLoop(int value) {\n\t\tint result = 1;\n\t\tfor (int counter = 1; counter <= value; counter++) {\n\t\t\tresult *= counter;\n\t\t}\n\t\treturn result;\n\t}\n}\n"})}),"\n",(0,t.jsx)(e.p,{children:"Hasil:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"120\n"})}),"\n",(0,t.jsxs)(e.p,{children:["Dalam contoh di atas program akan melakukan looping dengan melakukan perkalian dengan angka dibawah 5, jika disederhanakan akan menjadi ",(0,t.jsx)(e.code,{children:"1 * 2 * 3 * 4 * 5"}),"."]}),"\n",(0,t.jsx)(e.h2,{id:"menggunakan-recursive-method",children:"Menggunakan Recursive method"}),"\n",(0,t.jsx)(e.p,{children:"Jika mengimplementasikan contoh factorial di atas ke recursive method, akan seperti di bawah ini:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:"public class DemoRecursiveMethod {\n\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(factorialRecursive(5));\n\t}\n\t\n\tstatic int factorialRecursive(int value) {\n\t\tif (value == 1) {\n\t\t\treturn 1;\n\t\t} else {\n\t\t\treturn value * factorialRecursive(value - 1);\n\t\t}\n\t}\n\t\n}\n"})}),"\n",(0,t.jsxs)(e.p,{children:["Pada contoh diatas pada method ",(0,t.jsx)(e.code,{children:"factorialRecursive"})," setiap nilai yang dimasukan akan terus dikalikan dengan angka di bawahnya dengan memanggil dirinya sendiri pada ",(0,t.jsx)(e.code,{children:"value * factorialRecursive(value - 1);"}),". Hasil outpunya akan sama dengan contoh sebelumnya."]}),"\n",(0,t.jsx)(e.h2,{id:"masalah-dalam-recursive-method",children:"Masalah dalam Recursive method"}),"\n",(0,t.jsxs)(e.p,{children:["Recursive method bukan tidak memiliki masalah, jika terlalu dalam dalam pemakainnya, maka kemungkinan akan menghasilkan ",(0,t.jsx)(e.em,{children:"StackOverflow"})," dimana kondisi method telalu banyak disimpan oleh Java. Ketika memanggil method sebenarnya Java menyimpannya ke dalam ",(0,t.jsx)(e.em,{children:"stack"}),", jika terlalu dalam memanggil method, maka ",(0,t.jsx)(e.em,{children:"stack"})," akan terlalu besar dan bisa menyebabkan error ",(0,t.jsx)(e.em,{children:"StackOverflow"}),". Kondisi error juga bisa berbeda disetiap komputer tergantung spesifikasi yang berbeda di masing-masing komputer."]}),"\n",(0,t.jsx)(e.p,{children:"Contoh:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-java",children:'public class DemoRecursiveMethod {\n\n\tpublic static void main(String[] args) {\n\t\tloopRecursive(1000000);\n\t}\n\t\n\tstatic void loopRecursive(int value) {\n\t\tif (value == 0) {\n\t\t\tSystem.out.println("Program Selesai");\n\t\t} else {\n\t\t\tSystem.out.println("value ke-" + value);\n\t\t\tloopRecursive(value - 1);\n\t\t}\n\t}\n\t\n}\n'})}),"\n",(0,t.jsxs)(e.p,{children:["Pada contoh di atas pada komputer yang saya gunakan error ",(0,t.jsx)(e.code,{children:"StackOverflowError"})," hanya bisa digunakan sampai  ",(0,t.jsx)(e.code,{children:"value ke-994361"}),"."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:'value ke-1000000\n.\n.\n.\nvalue ke-994362\nvalue ke-994361\nException in thread "main" java.lang.StackOverflowError\n'})}),"\n",(0,t.jsxs)(e.p,{children:["Berbeda jika value loopRecursive -nya saya ganti ke nilai yang lebih rendah ",(0,t.jsx)(e.code,{children:"loopRecursive(1000)"}),", pada komputer saya tidak mengalami error StackOverflow."]}),"\n",(0,t.jsx)(e.h2,{id:"kesimpulan",children:"Kesimpulan"}),"\n",(0,t.jsx)(e.p,{children:"Recursive method menarik untuk digunakan pada kondisi dimana kita memanggil method dirinya sendiri. Akan tetapi berbahaya jika digunakan terlalu dalam karena dapat menimbulkan StackOverflow."})]})}function c(a={}){const{wrapper:e}={...(0,r.R)(),...a.components};return e?(0,t.jsx)(e,{...a,children:(0,t.jsx)(u,{...a})}):u(a)}},28453:(a,e,n)=>{n.d(e,{R:()=>s,x:()=>l});var i=n(96540);const t={},r=i.createContext(t);function s(a){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof a?a(e):{...e,...a}}),[e,a])}function l(a){let e;return e=a.disableParentContext?"function"==typeof a.components?a.components(t):a.components||t:s(a.components),i.createElement(r.Provider,{value:e},a.children)}},31331:a=>{a.exports=JSON.parse('{"permalink":"/blog/java-recursive-method","source":"@site/blog/2023-09-27-java-recursive.md","title":"Apa itu Java Recursive Method","description":"Metode rekursif (recursive method) adalah teknik dalam pemrograman di mana sebuah fungsi memanggil dirinya sendiri untuk menyelesaikan masalah. Pada dasarnya, fungsi tersebut memecah masalah besar menjadi sub-masalah yang lebih kecil dan menyelesaikannya secara berulang hingga mencapai kondisi dasar (base case), yang berhenti memanggil fungsi lagi.","date":"2023-09-27T00:00:00.000Z","tags":[{"inline":true,"label":"java","permalink":"/blog/tags/java"}],"readingTime":2.07,"hasTruncateMarker":true,"authors":[{"name":"Ucup TopekoX","title":"TimposuLabs creator","imageURL":"https://topekox.github.io/assets/images/avatar.jpeg","key":"topekox","page":null}],"frontMatter":{"slug":"java-recursive-method","title":"Apa itu Java Recursive Method","authors":"topekox","tags":["java"]},"unlisted":false,"prevItem":{"title":"Apa itu Java Anonymous Class","permalink":"/blog/java-anonymous-class"},"nextItem":{"title":"Cara Install Jekyll","permalink":"/blog/cara-install-jekyll"}}')}}]);