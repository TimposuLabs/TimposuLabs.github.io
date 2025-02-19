"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[6042],{7771:(t,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>s,metadata:()=>e,toc:()=>m});var e=a(2197),r=a(4848),i=a(8453);const s={slug:"java-comparable-interface",title:"Belajar Java Comparable",authors:"topekox",tags:["java","java comparable"]},o=void 0,l={authorsImageUrls:[void 0]},m=[{value:"Contoh 1: membuat perbandingan untuk melakukan sorting integer",id:"contoh-1-membuat-perbandingan-untuk-melakukan-sorting-integer",level:4},{value:"Interface Comparable",id:"interface-comparable",level:3},{value:"Contoh 2: membuat perbandingan sortir pair string dan integer",id:"contoh-2-membuat-perbandingan-sortir-pair-string-dan-integer",level:4},{value:"Contoh 3: membuat perbandingan sortir string dan string",id:"contoh-3-membuat-perbandingan-sortir-string-dan-string",level:4}];function u(t){const n={admonition:"admonition",code:"code",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...t.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:["Interface Comparable pada Java digunakan untuk menentukan urutan objek pada class yang didefinisikan. Interface ini merupakan bagian dari paket ",(0,r.jsx)(n.code,{children:"java.lang"})," dan menyediakan method ",(0,r.jsx)(n.code,{children:"compareTo()"})," untuk membandingkan instance class. Class harus mengimplementasikan interface ",(0,r.jsx)(n.code,{children:"Comparable"})," untuk menentukan urutannya. Method ",(0,r.jsx)(n.code,{children:"compareTo()"})," akan me-return bilangan bulat negatif, nol, atau bilangan bulat positif, untuk hasi objek yang lebih kecil dari, sama dengan, atau lebih besar dari objek yang ditentukan."]}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["Class-class umum seperti ",(0,r.jsx)(n.code,{children:"String"}),", ",(0,r.jsx)(n.code,{children:"Integer"})," dan sebagainya, sudah mengimplementasikan interface ",(0,r.jsx)(n.code,{children:"Comparable"}),", sehingga bisa langsung dilakukan sorting terhadap object-object tersebut."]})}),"\n",(0,r.jsx)(n.h4,{id:"contoh-1-membuat-perbandingan-untuk-melakukan-sorting-integer",children:"Contoh 1: membuat perbandingan untuk melakukan sorting integer"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-java",children:'import java.util.Arrays;\n\npublic class DemoComparable {\n\t\n\tstatic class MyNumber implements Comparable<MyNumber> {\n\n\t\tprivate int value;\n\t\t\n\t\tpublic MyNumber(int value) {\n\t\t\tthis.value = value;\n\t\t}\n\n\t\t@Override\n\t\tpublic int compareTo(MyNumber o) {\n\t\t\t\n\t\t\t// Ascending order\n\t\t\treturn this.value - o.value;\n\t\t}\n\n\t\t@Override\n\t\tpublic String toString() {\n\t\t\treturn String.valueOf(this.value);\n\t\t}\t\t\n\t}\n\n\tpublic static void main(String[] args) {\n\t\tMyNumber[] n = {\n\t\t\tnew MyNumber(4),\t\n\t\t\tnew MyNumber(7),\t\n\t\t\tnew MyNumber(3),\t\n\t\t\tnew MyNumber(9),\t\n\t\t\tnew MyNumber(5)\t\n\t\t};\n\t\t\n\t\tSystem.out.println("Sebelum sorting: " + Arrays.toString(n));\n\t\t\n\t\t// Sorting\n\t\tArrays.sort(n);\n\t\t\n\t\tSystem.out.println("Setelah sorting: " + Arrays.toString(n));\t\t\n\t}\n\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"Output:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Sebelum sorting: [4, 7, 3, 9, 5]\nSetelah sorting: [3, 4, 5, 7, 9]\n"})}),"\n",(0,r.jsx)(n.h3,{id:"interface-comparable",children:"Interface Comparable"}),"\n",(0,r.jsxs)(n.p,{children:["Interface Comparable merupakan interface yang hanya memiliki 1 method yaitu ",(0,r.jsx)(n.code,{children:"compareTo(T obj)"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"public interface Comparable<T> {\n\n    int compareTo(T obj);\n\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["dimana, ",(0,r.jsx)(n.code,{children:"T"})," adalah type objek yang akan di compare."]}),"\n",(0,r.jsx)(n.p,{children:"Hasil perbandingan akan mengembalikan nilai:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Negative, jika currentObj < specifiedObj."}),"\n",(0,r.jsx)(n.li,{children:"Zero, jika currentObj == specifiedObj."}),"\n",(0,r.jsx)(n.li,{children:"Positive, jika currentObj > specifiedobj."}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"contoh-2-membuat-perbandingan-sortir-pair-string-dan-integer",children:"Contoh 2: membuat perbandingan sortir pair string dan integer"}),"\n",(0,r.jsx)(n.p,{children:"Pada contoh berikut kita akan melakukan compare pada type string dan integer, object pertama yang akan di sortir string, jika objek string sama maka disortir adalah yang integer."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-java",children:'import java.util.Arrays;\n\npublic class DemoComparableStringInteger {\n\t\n\tstatic class Pair implements Comparable<Pair> {\n\t\t\n\t\tprivate String theString;\n\t\tprivate int theInteger;\n\t\t\n\t\tpublic Pair(String theString, int theInteger) {\n\t\t\tthis.theString = theString;\n\t\t\tthis.theInteger = theInteger;\n\t\t}\n\n\t\t@Override\n\t\tpublic int compareTo(Pair o) {\n\t\t\t\n\t\t\t// Jika string tidak sama\n\t\t\tif (this.theString.compareTo(o.theString) != 0) {\n\t\t\t\treturn this.theString.compareTo(o.theString);\n\t\t\t}\n\t\t\t\n\t\t\t// Jika string sama\n\t\t\treturn this.theInteger - o.theInteger;\n\t\t}\n\n\t\t@Override\n\t\tpublic String toString() {\n\t\t\treturn "[" + theString + " , " + theInteger + "]";\n\t\t}\n\t\t\n\t}\n\t\n\tpublic static void main(String... args) {\n\t\tPair[] pair = {\n\t\t\tnew Pair("Ucup", 2),\n\t\t\tnew Pair("Ade", 5),\n\t\t\tnew Pair("Recky", 4),\n\t\t\tnew Pair("Ade", 3),\n\t\t\tnew Pair("Restu", 1)\t\t\t\n\t\t};\n\t\t\n\t\tSystem.out.println("Sebelum Sortir");\n\n\t\t// Sebelum sortir\n\t\tfor (var p : pair) {\n\t\t\tSystem.out.println(p);\n\t\t}\n\t\t\n\t\t// Sortir\n\t\tArrays.sort(pair);\n\t\t\n\t\tSystem.out.println("\\nSetelah Sortir");\n\t\t\n\t\t// Setelah sortir\n\t\tfor (var p : pair) {\n\t\t\tSystem.out.println(p);\n\t\t}\t\t\n\t}\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"Output"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Sebelum Sortir\n[Ucup , 2]\n[Ade , 5]\n[Recky , 4]\n[Ade , 3]\n[Restu , 1]\n\nSetelah Sortir\n[Ade , 3]\n[Ade , 5]\n[Recky , 4]\n[Restu , 1]\n[Ucup , 2]\n"})}),"\n",(0,r.jsx)(n.h4,{id:"contoh-3-membuat-perbandingan-sortir-string-dan-string",children:"Contoh 3: membuat perbandingan sortir string dan string"}),"\n",(0,r.jsx)(n.p,{children:"Pada contoh berikut kita akan melakukan compare pada type string (first name) dan string (last name), object first name yang akan di sortir terlebih dahulu, jika objek first name sama maka disortir berikutnya adalah yang last name."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-java",children:'import java.util.Arrays;\n\npublic class DemoComparablePairString {\n\t\n\tstatic class Pair implements Comparable<Pair> {\n\t\t\n\t\tprivate String firstName;\n\t\t\n\t\tprivate String lastName;\n\t\t\n\t\tpublic Pair(String firstName, String lastName) {\n\t\t\tthis.firstName = firstName;\n\t\t\tthis.lastName = lastName;\n\t\t}\n\n\t\t@Override\n\t\tpublic int compareTo(Pair o) {\n\t\t\t\n\t\t\t// Jika fist name tidak sama\n\t\t\tif (this.firstName.compareTo(o.firstName) != 0) {\n\t\t\t\treturn this.firstName.compareTo(o.firstName);\n\t\t\t}\n\t\t\t// jika first name sama\n\t\t\t// maka compare lastname\n\t\t\treturn this.lastName.compareTo(o.lastName);\n\t\t}\n\n\t\t@Override\n\t\tpublic String toString() {\n\t\t\treturn "[ " + firstName + ", " + lastName + "]";\n\t\t}\n\t}\n\t\n\tpublic static void main(String... args) {\n\t\t\n\t\tPair[] pair = {\n\t\t\tnew Pair("Rohamdi", "Mabud"),\t\n\t\t\tnew Pair("Recky", "Ardiansyah"),\t\n\t\t\tnew Pair("Restu", "Ramadhan")\t\n\t\t};\n\t\t\n\t\tSystem.out.println("Sebelum Sortir");\n\t\tfor (var p : pair) {\n\t\t\tSystem.out.println(p.toString());\n\t\t}\n\t\t\n\t\t// sortir\n\t\tArrays.sort(pair);\n\t\t\n\t\tSystem.out.println("\\nSesudah Sortir");\n\t\tfor (var p : pair) {\n\t\t\tSystem.out.println(p.toString());\n\t\t}\n\t}\n\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"Output:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"Sebelum Sortir\n[ Rohamdi, Mabud]\n[ Recky, Ardiansyah]\n[ Restu, Ramadhan]\n\nSesudah Sortir\n[ Recky, Ardiansyah]\n[ Restu, Ramadhan]\n[ Rohamdi, Mabud]\n"})})]})}function c(t={}){const{wrapper:n}={...(0,i.R)(),...t.components};return n?(0,r.jsx)(n,{...t,children:(0,r.jsx)(u,{...t})}):u(t)}},8453:(t,n,a)=>{a.d(n,{R:()=>s,x:()=>o});var e=a(6540);const r={},i=e.createContext(r);function s(t){const n=e.useContext(i);return e.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function o(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:s(t.components),e.createElement(i.Provider,{value:n},t.children)}},2197:t=>{t.exports=JSON.parse('{"permalink":"/blog/java-comparable-interface","source":"@site/blog/2024-10-04-java-comparable-interface.md","title":"Belajar Java Comparable","description":"Interface Comparable pada Java digunakan untuk menentukan urutan objek pada class yang didefinisikan. Interface ini merupakan bagian dari paket java.lang dan menyediakan method compareTo() untuk membandingkan instance class. Class harus mengimplementasikan interface Comparable untuk menentukan urutannya. Method compareTo() akan me-return bilangan bulat negatif, nol, atau bilangan bulat positif, untuk hasi objek yang lebih kecil dari, sama dengan, atau lebih besar dari objek yang ditentukan.","date":"2024-10-04T00:00:00.000Z","tags":[{"inline":true,"label":"java","permalink":"/blog/tags/java"},{"inline":true,"label":"java comparable","permalink":"/blog/tags/java-comparable"}],"readingTime":3.325,"hasTruncateMarker":true,"authors":[{"name":"Ucup TopekoX","title":"TimposuLabs creator","imageURL":"https://topekox.github.io/assets/images/avatar.jpeg","key":"topekox","page":null}],"frontMatter":{"slug":"java-comparable-interface","title":"Belajar Java Comparable","authors":"topekox","tags":["java","java comparable"]},"unlisted":false,"prevItem":{"title":"Belajar Java Comparator","permalink":"/blog/java-comparator-interface"},"nextItem":{"title":"Cara Install dan menggunakan NVM (Node Version Manager)","permalink":"/blog/cara-menggunakan-nvm"}}')}}]);