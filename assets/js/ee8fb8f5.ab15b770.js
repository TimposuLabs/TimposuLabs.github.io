"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[3410],{850:(a,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>s,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"java-generic/generic-class","title":"Java Generic Class","description":"Pada materi kali ini kita akan membuat class generic yang bisa digunakan berkali-kali (reusable) dengan menambahkan parameter ` pada deklarasi class, yang nantinya parameter T` akan menjadi type data yang digunakan di dalam class tersebut.","source":"@site/tutorial/java/java-generic/02-generic-class.md","sourceDirName":"java-generic","slug":"/java-generic/generic-class","permalink":"/java/java-generic/generic-class","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5,"title":"Java Generic Class"},"sidebar":"tutorialSidebar","previous":{"title":"Apa itu Java Generic","permalink":"/java/java-generic/apa-itu-java-generic"},"next":{"title":"Java Generic Method","permalink":"/java/java-generic/generic-method"}}');var r=n(4848),i=n(8453);const s={sidebar_position:5,title:"Java Generic Class"},l=void 0,c={},d=[{value:"Penamaan Type Parameter",id:"penamaan-type-parameter",level:2},{value:"Multiple Parameter",id:"multiple-parameter",level:2},{value:"Type Erasure",id:"type-erasure",level:2}];function o(a){const e={a:"a",code:"code",em:"em",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...a.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(e.p,{children:["Pada materi kali ini kita akan membuat class generic yang bisa digunakan berkali-kali (reusable) dengan menambahkan parameter ",(0,r.jsx)(e.code,{children:"<T>"})," pada deklarasi class, yang nantinya parameter ",(0,r.jsx)(e.code,{children:"T"})," akan menjadi type data yang digunakan di dalam class tersebut."]}),"\n",(0,r.jsx)(e.p,{children:"Contoh class Generic:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-java",children:"public class DemoClassGeneric<T> {\r\n\t\r\n\tprivate T value;\r\n\t\r\n\tpublic DemoClassGeneric(T value) {\r\n\t\tthis.value = value;\r\n\t}\r\n\t\r\n\tpublic void setValue(T value) {\r\n\t\tthis.value = value;\r\n\t}\r\n\t\r\n\tpublic T getValue() {\r\n\t\treturn value;\r\n\t}\r\n\r\n}\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-java",children:'public class DemoClassGenericMain {\r\n\r\n\tpublic static void main(String[] args) {\r\n\t\tDemoClassGeneric<String> genString = new DemoClassGeneric<String>("Halo bro!!!");\r\n\t\tSystem.out.println("value " + genString.getValue());\r\n\t\t\r\n\t\tDemoClassGeneric<Integer> genInt = new DemoClassGeneric<Integer>(2025);\r\n\t\tSystem.out.println("value " + genInt.getValue());\r\n\t}\r\n\r\n}\n'})}),"\n",(0,r.jsx)(e.p,{children:"Dengan menggunakan generic, maka kita dapat menggonta-ganti type data yang akan digunakan pada class generic yang sama, dan compiler akan memberikan error ketika value yang dimasukan tidak sesuai dengan type data yang digunakan. Seperti pada contoh di atas kita bisa memasukan ke dalam constructor baik itu type String atau Integer."}),"\n",(0,r.jsx)(e.p,{children:"Output:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"value Halo bro!!!\r\nvalue 2025\n"})}),"\n",(0,r.jsx)(e.h2,{id:"penamaan-type-parameter",children:"Penamaan Type Parameter"}),"\n",(0,r.jsxs)(e.p,{children:["Pada contoh di atas kita menggunakan parameter ",(0,r.jsx)(e.code,{children:"T"}),", sebenarnya tidak ada aturan baku dalam menggunakan parameter, cuma dalam prakteknya penamaan parameter biasanya satu huruf besar."]}),"\n",(0,r.jsx)(e.p,{children:"Jenis nama tipe parameter yang sering digunakan :"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"E  Element (biasanya digunakan untuk Collection Framework)"}),"\n",(0,r.jsx)(e.li,{children:"K  Key"}),"\n",(0,r.jsx)(e.li,{children:"N  Number"}),"\n",(0,r.jsx)(e.li,{children:"T  Type"}),"\n",(0,r.jsx)(e.li,{children:"V  Value"}),"\n",(0,r.jsx)(e.li,{children:"S,U,V dst. 2nd, 3rd, 4th types."}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"multiple-parameter",children:"Multiple Parameter"}),"\n",(0,r.jsxs)(e.p,{children:["Selain itu kita juga bisa menggunakan multiple parameter contohnya ",(0,r.jsx)(e.code,{children:"class MyData<K, V>"}),"."]}),"\n",(0,r.jsx)(e.p,{children:"Contoh:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-java",children:'public class DemoMultipleParameter {\r\n\r\n\tstatic class MyData<K, V> {\r\n\t\t\r\n\t\tK firstData;\r\n\t\t\r\n\t\tV secondData;\r\n\t\t\r\n\t\tpublic MyData(K first, V second) {\r\n\t\t\tthis.firstData = first;\r\n\t\t\tthis.secondData = second;\r\n\t\t}\r\n\t\t\r\n\t\tpublic void getAllData() {\r\n\t\t\tSystem.out.println("The first data is: " + firstData);\r\n\t\t\tSystem.out.println("The second data is: " + secondData);\r\n\t\t}\r\n\t\t\r\n\t}\r\n\r\n\tpublic static void main(String[] args) {\r\n\t\r\n\t\tMyData<String, Integer> data = new MyData<>("Rani", 2005);\r\n\t\tdata.getAllData();\r\n\t\t\r\n\t\tMyData<String, Boolean> data2 = new MyData<>("Perempuan", Boolean.TRUE);\r\n\t\tdata2.getAllData();\r\n\t}\r\n\r\n}\n'})}),"\n",(0,r.jsxs)(e.p,{children:["Pada contoh di atas kita menggunakan multiple parameter dalam Java Generic yaitu parameter dengan nama ",(0,r.jsx)(e.code,{children:"<K, V>"}),", yang dapat di-reusable type datanya.."]}),"\n",(0,r.jsx)(e.p,{children:"Output:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"The first data is: Rani\r\nThe second data is: 2005\r\nThe first data is: Perempuan\r\nThe second data is: true\n"})}),"\n",(0,r.jsx)(e.h2,{id:"type-erasure",children:"Type Erasure"}),"\n",(0,r.jsxs)(e.p,{children:["Dalam menggunakan generic type, ada proses yang bernama ",(0,r.jsx)(e.em,{children:"Type Erasure"})," . ",(0,r.jsx)(e.em,{children:"Type Erasure"})," adalah proses pengecekan generic pada saat proses compile, tetapi tidak melakukan pengecekan pada saat runtime. Jadi pada saat proses compile, compiler akan merubah kode generic menjadi type Object, sehingga informasi generic yang kita buat akan akan hilang ketika kode yang dibuat telah menjadi binary atau ketika proses runtime."]}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.img,{alt:"Type Erasure",src:n(658).A+"",title:"Type Erasure",width:"1351",height:"426"})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsxs)(e.em,{children:["source: ",(0,r.jsx)(e.a,{href:"https://ramj2ee.blogspot.com/2017/05/java-tutorial-generics-in-java-java_97.html",children:"https://ramj2ee.blogspot.com/2017/05/java-tutorial-generics-in-java-java_97.html"})]})}),"\n",(0,r.jsx)(e.p,{children:"Dari penjelasan di atas informasi generic akan hilang ketika sudah dilakukan compile atau sudah menjadi binary code, maka perlu berhati-hati dalam menggunakan tipe data generic agar tidak terjadi runtime error."}),"\n",(0,r.jsx)(e.p,{children:"Contoh:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-java",children:'DemoClassGeneric genString = new DemoClassGeneric("Halo bro!!!"); // Tidak mendefinisikan data type generic\r\n\t\t\r\nDemoClassGeneric<Integer> genInt = (DemoClassGeneric<Integer>) genString;\r\nInteger intData = genInt.getValue(); \n'})}),"\n",(0,r.jsxs)(e.p,{children:["Pada contoh di atas kita tidak mendefinisikan data type generic seperti pada contoh sebelumnya ",(0,r.jsx)(e.code,{children:'DemoClassGeneric<String> genString = new DemoClassGeneric<String>("Halo bro!!!");'})," , pada saat kode di compile maka tidak akan menemukan error, tetapi ketika di run, program akan error."]}),"\n",(0,r.jsx)(e.p,{children:"Output:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"Exception in thread \"main\" java.lang.ClassCastException: class java.lang.String cannot be cast to class java.lang.Integer (java.lang.String and java.lang.Integer are in module java.base of loader 'bootstrap')\n"})}),"\n",(0,r.jsx)(e.p,{children:"Jadi diperlukan kehati-hatian dalam menggunakan generic type."})]})}function p(a={}){const{wrapper:e}={...(0,i.R)(),...a.components};return e?(0,r.jsx)(e,{...a,children:(0,r.jsx)(o,{...a})}):o(a)}},658:(a,e,n)=>{n.d(e,{A:()=>t});const t=n.p+"assets/images/TypeErasureInGenerics-2750306461a82aca70d60d6b577a9619.jpg"},8453:(a,e,n)=>{n.d(e,{R:()=>s,x:()=>l});var t=n(6540);const r={},i=t.createContext(r);function s(a){const e=t.useContext(i);return t.useMemo((function(){return"function"==typeof a?a(e):{...e,...a}}),[e,a])}function l(a){let e;return e=a.disableParentContext?"function"==typeof a.components?a.components(r):a.components||r:s(a.components),t.createElement(i.Provider,{value:e},a.children)}}}]);