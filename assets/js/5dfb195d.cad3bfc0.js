"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[4313],{31951:(a,e,n)=>{n.r(e),n.d(e,{assets:()=>d,contentTitle:()=>l,default:()=>p,frontMatter:()=>r,metadata:()=>i,toc:()=>m});const i=JSON.parse('{"id":"java-dasar/jdk-jre-jvm","title":"JDK, JRE dan JVM","description":"Sebelum melakukan instalasi Java, sebaiknya perlu terlebih dahulu memahami apa itu Java Development Kit (JDK), Java Runtime Environment (JRE) dan Java Virtual Machine (JVM).","source":"@site/tutorial/java/java-dasar/02-jdk-jre-jvm.md","sourceDirName":"java-dasar","slug":"/java-dasar/jdk-jre-jvm","permalink":"/java/java-dasar/jdk-jre-jvm","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4,"title":"JDK, JRE dan JVM"},"sidebar":"tutorialSidebar","previous":{"title":"Apa itu Java?","permalink":"/java/java-dasar/apa-itu-java"},"next":{"title":"Cara Install Java","permalink":"/java/java-dasar/cara-install-java"}}');var t=n(74848),s=n(28453);const r={sidebar_position:4,title:"JDK, JRE dan JVM"},l=void 0,d={},m=[{value:"Java Virtual Machine (JVM)",id:"java-virtual-machine-jvm",level:2},{value:"Java Runtime Environment (JRE)",id:"java-runtime-environment-jre",level:2},{value:"Java Development Kit (JDK)",id:"java-development-kit-jdk",level:2},{value:"Pilih yang mana?",id:"pilih-yang-mana",level:2},{value:"Proses Development Program Java",id:"proses-development-program-java",level:2},{value:"Referensi",id:"referensi",level:2}];function o(a){const e={a:"a",admonition:"admonition",code:"code",h2:"h2",img:"img",li:"li",p:"p",ul:"ul",...(0,s.R)(),...a.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.p,{children:"Sebelum melakukan instalasi Java, sebaiknya perlu terlebih dahulu memahami apa itu Java Development Kit (JDK), Java Runtime Environment (JRE) dan Java Virtual Machine (JVM)."}),"\n",(0,t.jsx)(e.h2,{id:"java-virtual-machine-jvm",children:"Java Virtual Machine (JVM)"}),"\n",(0,t.jsx)(e.p,{children:"JVM adalah mesin virtual yang menyediakan lingkungan runtime yang dibutuhkan agar bytecode/program/binary Java dapat dieksekusi/dijalankan. JVM juga dapat menjalankan program-program yang ditulis dalam bahasa pemrograman lain yang dikompilasi ke bytecode Java (contoh Kotlin, Scala  dll)."}),"\n",(0,t.jsx)(e.p,{children:"JVM tersedia untuk banyak platform perangkat keras dan sistem operasi. Dengan kata lain JVM adalah mesin virtual yang bertugas untuk menjalankan aplikasi Java."}),"\n",(0,t.jsx)(e.h2,{id:"java-runtime-environment-jre",children:"Java Runtime Environment (JRE)"}),"\n",(0,t.jsx)(e.p,{children:"JRE adalah kumpulan paket aplikasi yang digunakan untuk menjalankan aplikasi Java. Paket dalam JRE berisi kumpulan libraries, JVM dan paket-paket lain yang dibutuhkan."}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{alt:"JRE",src:n(86420).A+"",title:"paket JRE",width:"1716",height:"1326"})}),"\n",(0,t.jsx)(e.h2,{id:"java-development-kit-jdk",children:"Java Development Kit (JDK)"}),"\n",(0,t.jsx)(e.p,{children:"Java Development Kit ( JDK ) adalah distribusi teknologi Java oleh Oracle Corporation. JDK mengimplementasikan Java Language Specification ( JLS ) dan Java Virtual Machine Specification ( JVMS ) dan menyediakan Standard Edition ( SE ) dari Java Application Programming Interface ( API ). JDK adalah kumpulan paket aplikasi yang digunakan untuk membuat/mengembangkan aplikasi Java. Paket dalam JDK berisi JRE dan paket-paket lain yang dibutuhkan untuk  mengembangkan aplikasi Java seperti Java Compiler (javac), Java Documentation (javadoc), Java virtual machine, debugger dll."}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{alt:"JDK",src:n(79424).A+"",title:"paket JDK",width:"3142",height:"1891"})}),"\n",(0,t.jsx)(e.h2,{id:"pilih-yang-mana",children:"Pilih yang mana?"}),"\n",(0,t.jsx)(e.p,{children:"Dari penjelasan di atas dapat disimpulkan bahwa paket JDK adalah paket yang diperlukan untuk mengembangkan/membuat aplikasi Java, karena paket tersebut juga sudah termasuk JRE yang di dalamnya terdapat JVM. Berbeda apabila kita hanya ingin menjalankan aplikasi Java tanpa harus membuatnya, yang diperlukan cukup JRE saja."}),"\n",(0,t.jsx)(e.p,{children:"JDK itu sendiri ada banyak versi distribusinya, itu dikarenakan Oracle (dulunya Sun Microsystems) mengeluarkan spesifikasi JDK yang bebas bagi siapapun untuk mengimplementasikannya untuk membuat versi JDK mereka sendiri. Beberapa perusahaan yang mengimplementasikan JDK adalah sebagai berikut:"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["Oracle dengan ",(0,t.jsx)(e.a,{href:"https://www.oracle.com/java/technologies/downloads/",children:"OracleJDK"})," dan ",(0,t.jsx)(e.a,{href:"https://jdk.java.net/",children:"OpenJDK"}),"."]}),"\n",(0,t.jsxs)(e.li,{children:["Amazon dengan ",(0,t.jsx)(e.a,{href:"https://aws.amazon.com/corretto/",children:"Correto"}),"."]}),"\n",(0,t.jsxs)(e.li,{children:["Eclipse dengan ",(0,t.jsx)(e.a,{href:"https://adoptium.net/temurin/",children:"Temurin"}),"."]}),"\n",(0,t.jsxs)(e.li,{children:["Microsoft dengan ",(0,t.jsx)(e.a,{href:"https://www.microsoft.com/openjdk",children:"Microsoft OpenJDK"}),"."]}),"\n",(0,t.jsxs)(e.li,{children:["Alibaba dengan ",(0,t.jsx)(e.a,{href:"https://dragonwell-jdk.io/",children:"Dragonwell"}),"."]}),"\n",(0,t.jsxs)(e.li,{children:["dan masih banyak lagi bisa dilihat ",(0,t.jsx)(e.a,{href:"https://sdkman.io/jdks",children:"disini"}),"."]}),"\n"]}),"\n",(0,t.jsx)(e.admonition,{type:"info",children:(0,t.jsx)(e.p,{children:"Pada dasarnya setiap distribusi JDK secara garis besar hampir sama saja, semuanya bisa digunakan untuk mengembangkan aplikasi Java, yang membedakannya biasanya dari sisi support, lisensi, fitur, target market dan updatenya, yang berbeda dari tiap masing-masing distribusi JDK."})}),"\n",(0,t.jsx)(e.admonition,{type:"tip",children:(0,t.jsxs)(e.p,{children:["Saran kami gunakan versi JDK yang bersifat opensource seperti OpenJDK, apabila kita ingin bebas menggunakannya, karna distribusi ",(0,t.jsx)(e.a,{href:"https://jdk.java.net/",children:"OpenJDK"})," bersifat free dan opensource."]})}),"\n",(0,t.jsx)(e.h2,{id:"proses-development-program-java",children:"Proses Development Program Java"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{alt:"Proses Development Program Java",src:n(44108).A+"",width:"586",height:"172"})}),"\n",(0,t.jsxs)(e.p,{children:["Dari proses diatas dapat dijabarkan bahwa source kode java ditulis dengan format ekstensi file ",(0,t.jsx)(e.code,{children:".java"}),", kemudian dicompile dan menghasilkan file Java Binary baru dengan ekstensi ",(0,t.jsx)(e.code,{children:".class"}),", yang kemudian dapat dijalankan. Selain itu file ",(0,t.jsx)(e.code,{children:".class"})," dapat dicompress menjadi Java Archive dengan ekstensi ",(0,t.jsx)(e.code,{children:".jar"}),", file dengan ekstensi tersebut juga dapat di run oleh JRE."]}),"\n",(0,t.jsx)(e.h2,{id:"referensi",children:"Referensi"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Java_Development_Kit",children:"Wikipedia JDK"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://www.turing.com/kb/java-virtual-machine#what-is-jvm?",children:"https://www.turing.com/kb/java-virtual-machine#what-is-jvm?"})}),"\n"]})]})}function p(a={}){const{wrapper:e}={...(0,s.R)(),...a.components};return e?(0,t.jsx)(e,{...a,children:(0,t.jsx)(o,{...a})}):o(a)}},79424:(a,e,n)=>{n.d(e,{A:()=>i});const i=n.p+"assets/images/jdk-0fcd94e632b2ceb2362e72cd8bba6b44.png"},86420:(a,e,n)=>{n.d(e,{A:()=>i});const i=n.p+"assets/images/jre-20b6d62e14526cd61a1004de5ef7dd38.png"},44108:(a,e,n)=>{n.d(e,{A:()=>i});const i=n.p+"assets/images/proses-java-03607095b60cdea4b57ed302c6108e25.png"},28453:(a,e,n)=>{n.d(e,{R:()=>r,x:()=>l});var i=n(96540);const t={},s=i.createContext(t);function r(a){const e=i.useContext(s);return i.useMemo((function(){return"function"==typeof a?a(e):{...e,...a}}),[e,a])}function l(a){let e;return e=a.disableParentContext?"function"==typeof a.components?a.components(t):a.components||t:r(a.components),i.createElement(s.Provider,{value:e},a.children)}}}]);