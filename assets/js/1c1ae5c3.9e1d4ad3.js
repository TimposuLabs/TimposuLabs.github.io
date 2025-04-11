"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[5725],{24325:(t,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>d,default:()=>m,frontMatter:()=>s,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"java-collection/immutable-list","title":"Immutable List","description":"Secarah default List pada Java baik itu ArrayList atau LinkedList bersifat mutable atau dapat diubah, tetapi Java mendukung pembuatan Immutable List. Pendefinisian Immutable List dalam Java berarti data elemennya list tidak dapat dirubah lagi atau bersifat final. Yang dimaksud data list yang tidak dapat lagi dirubah bukan reference object elemennya. Contoh kita mempunyai List Immutable yang memiliki elemen data Country, tetapi field data di dalamnya masih bisa dirubah, tapi elemen dari immutable List tidak bisa dirubah lagi.","source":"@site/tutorial/java/java-collection/05-immutable-list.md","sourceDirName":"java-collection","slug":"/java-collection/immutable-list","permalink":"/java/java-collection/immutable-list","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5,"title":"Immutable List"},"sidebar":"tutorialSidebar","previous":{"title":"Java List","permalink":"/java/java-collection/list"},"next":{"title":"Java Set","permalink":"/java/java-collection/set"}}');var e=a(74848),r=a(28453);const s={sidebar_position:5,title:"Immutable List"},d=void 0,l={},o=[];function u(t){const n={code:"code",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...t.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(n.p,{children:["Secarah default ",(0,e.jsx)(n.code,{children:"List"})," pada Java baik itu ",(0,e.jsx)(n.code,{children:"ArrayList"})," atau ",(0,e.jsx)(n.code,{children:"LinkedList"})," bersifat mutable atau dapat diubah, tetapi Java mendukung pembuatan Immutable List. Pendefinisian Immutable List dalam Java berarti data elemennya list tidak dapat dirubah lagi atau bersifat final. Yang dimaksud data list yang tidak dapat lagi dirubah bukan reference object elemennya. Contoh kita mempunyai ",(0,e.jsx)(n.code,{children:"List"})," Immutable yang memiliki elemen data Country, tetapi field data di dalamnya masih bisa dirubah, tapi elemen dari immutable List tidak bisa dirubah lagi."]}),"\n",(0,e.jsx)(n.p,{children:"Immutable List berguna dimana kondisi kita tidak ingin agar data elemen dalam List tidak dapat diubah lagi. Karena terkadang List yang bersifat mutable, dapat menyebabkan kesalahan pada aplikasi."}),"\n",(0,e.jsx)(n.p,{children:"Contoh List Mutable:"}),"\n",(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-java",children:'import java.util.ArrayList;\r\nimport java.util.List;\r\n\r\npublic class DemoImmutableList {\r\n\t\r\n\tstatic class Country{\r\n\t\t\r\n\t\tprivate String country;\r\n\t\t\r\n\t\tprivate List<String> cityOfCountry = new ArrayList<String>();\r\n\t\t\r\n\t\tpublic Country(String country) {\r\n\t\t\tthis.country = country;\r\n\t\t}\r\n\r\n\t\tpublic List<String> getCityOfCountry() {\r\n\t\t\treturn cityOfCountry;\r\n\t\t}\r\n\r\n\t\tpublic void addCityOfCountry(String city) {\r\n\t\t\tthis.cityOfCountry.add(city);\r\n\t\t}\r\n\r\n\t\tpublic String getCountry() {\r\n\t\t\treturn country;\r\n\t\t}\t\t\t\t\r\n\t}\r\n\t\r\n\tpublic static void main(String[] args) {\r\n\t\t\r\n\t\tCountry indonesia = new Country("Indonesia");\r\n\t\tindonesia.addCityOfCountry("Banjarmasin");\t\t\r\n\t\tindonesia.addCityOfCountry("Ternate");\t\t\r\n\t\tindonesia.addCityOfCountry("Padang");\t\t\r\n\t\t\r\n\t\t// mengubah data cityOfCountry yang idealnya tidak boleh dirubah disini\r\n\t\tchangeCity(indonesia.getCityOfCountry());\r\n\t\t\r\n\t\tSystem.out.println("Country: " + indonesia.getCountry());\r\n\t\tSystem.out.println("City:  ");\r\n\t\t\r\n\t\tfor (var city : indonesia.getCityOfCountry()) {\r\n\t\t\tSystem.out.println(city);\r\n\t\t}\r\n\t}\r\n\t\r\n\t// method ini akan menambahkan elemen baru pada List cityOfCountry (mutable)\r\n\t// yang idealnya list pada cityOfCountry tidak boleh diubah disini \r\n\tprivate static void changeCity(List<String> cities) {\r\n\t\tcities.add("Kampung Rambutan"); // Bukan city\r\n\t}\r\n\r\n}\n'})}),"\n",(0,e.jsxs)(n.p,{children:["Sekilas tidak ada yang salah, tetapi terdapat kesalahan penambahan data elemen ",(0,e.jsx)(n.code,{children:"Kampung Rambutan"})," pada method ",(0,e.jsx)(n.code,{children:"changeCity(List<String> cities)"})," yang idealnya tidak terjadi. Karena sebaiknya cities tidak dapat di tambahkan di method tersebut.\r\nOutpunya program di atas sebagai berikut:"]}),"\n",(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{children:"Country: Indonesia\r\nCity:  \r\nBanjarmasin\r\nTernate\r\nPadang\r\nKampung Rambutan\n"})}),"\n",(0,e.jsxs)(n.p,{children:["Agar List yang dibuat tidak bisa diubah oleh tempat lain, kita menambahkan List agar immuable sehingga tidak dapat diubah elemenya dengan ",(0,e.jsx)(n.code,{children:"Collections.unmodifiableList()"}),"."]}),"\n",(0,e.jsx)(n.p,{children:"Contoh:"}),"\n",(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-java",children:'import java.util.ArrayList;\r\nimport java.util.Collections;\r\nimport java.util.List;\r\n\r\npublic class DemoImmutableList {\r\n\t\r\n\tstatic class Country{\r\n\t\t\r\n\t\tprivate String country;\r\n\t\t\r\n\t\tprivate List<String> cityOfCountry = new ArrayList<String>();\r\n\t\t\r\n\t\tpublic Country(String country) {\r\n\t\t\tthis.country = country;\r\n\t\t}\r\n\r\n\t\tpublic List<String> getCityOfCountry() {\r\n//\t\t\treturn cityOfCountry;\r\n\t\t\treturn Collections.unmodifiableList(cityOfCountry); // membuat data List menjadi immutable\r\n\t\t}\r\n\r\n\t\tpublic void addCityOfCountry(String city) {\r\n\t\t\tthis.cityOfCountry.add(city);\r\n\t\t}\r\n\r\n\t\tpublic String getCountry() {\r\n\t\t\treturn country;\r\n\t\t}\t\t\t\t\r\n\t}\r\n\t\r\n\tpublic static void main(String[] args) {\r\n\t\t\r\n\t\tCountry indonesia = new Country("Indonesia");\r\n\t\tindonesia.addCityOfCountry("Banjarmasin");\t\t\r\n\t\tindonesia.addCityOfCountry("Ternate");\t\t\r\n\t\tindonesia.addCityOfCountry("Padang");\t\t\r\n\t\t\r\n\t\t// method ini akan menimbulkan error karena kita sudah membuat List menjadi immutable\r\n\t\tchangeCity(indonesia.getCityOfCountry());\r\n\t\t\r\n\t\tSystem.out.println("Country: " + indonesia.getCountry());\r\n\t\tSystem.out.println("City:  ");\r\n\t\t\r\n\t\tfor (var city : indonesia.getCityOfCountry()) {\r\n\t\t\tSystem.out.println(city);\r\n\t\t}\r\n\t}\r\n\t\r\n\t// method ini akan menambahkan elemen baru pada List cityOfCountry (mutable)\r\n\t// yang idealnya list pada cityOfCountry tidak boleh diubah disini \r\n\tprivate static void changeCity(List<String> cities) {\r\n\t\tcities.add("Kampung Rambutan"); // Bukan city\r\n\t}\r\n\r\n}\n'})}),"\n",(0,e.jsxs)(n.p,{children:["Jika program dijalankan akan menimbulkan exception ",(0,e.jsx)(n.code,{children:"UnsupportedOperationException"})," karena kita mencoba memasukan data elemen yang immutable:"]}),"\n",(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{children:'Exception in thread "main" java.lang.UnsupportedOperationException\r\n\tat java.base/java.util.Collections$UnmodifiableCollection.add(Collections.java:1091)\r\n\tat com.timposulabs.belajar.collections.DemoImmutableList.changeCity(DemoImmutableList.java:54)\r\n\tat com.timposulabs.belajar.collections.DemoImmutableList.main(DemoImmutableList.java:41)\n'})}),"\n",(0,e.jsx)(n.p,{children:"Selain itu ada beberapa method immutable List yang bisa digunakan"}),"\n",(0,e.jsxs)(n.table,{children:[(0,e.jsx)(n.thead,{children:(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.th,{children:"Method"}),(0,e.jsx)(n.th,{children:"Keterangan"})]})}),(0,e.jsxs)(n.tbody,{children:[(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:(0,e.jsx)(n.code,{children:"Collections.unmodifiableList()"})}),(0,e.jsx)(n.td,{children:"Mengubah mutable List menjadi Immutable"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:(0,e.jsx)(n.code,{children:"Collections.singletonList()"})}),(0,e.jsx)(n.td,{children:"Membuat immutable hanya berisi 1 elemen"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:(0,e.jsx)(n.code,{children:"Collections.emptyList()"})}),(0,e.jsx)(n.td,{children:"Membuat immutable List Kosong"})]}),(0,e.jsxs)(n.tr,{children:[(0,e.jsx)(n.td,{children:(0,e.jsx)(n.code,{children:"List.of()"})}),(0,e.jsx)(n.td,{children:"Membuat immutable List dengan multi element"})]})]})]}),"\n",(0,e.jsx)(n.p,{children:"Contoh:"}),"\n",(0,e.jsx)(n.pre,{children:(0,e.jsx)(n.code,{className:"language-java",children:'// Contoh Lain immutable\r\n\r\n// hanya bisa memasukan 1 elemen\r\nList<String> onlyOne = Collections.singletonList("Ucup");\r\n// membuat List kosong\r\nList<String> emptyElement = Collections.emptyList();\r\n\r\nList<String> names = new ArrayList<String>();\r\nnames.add("Desi");\r\nnames.add("Yudi");\r\nnames.add("Junaedi");\r\n\r\n// membuat List immutable\r\nList<String> immutableNames = Collections.unmodifiableList(names);\r\n\r\n// Membuat List immutable multi element\r\nList<String> elementNames = List.of("Aprizal", "Arafah", "Andini", "Agy");\r\n\r\n// ERROR: karena element immutable\r\nelementNames.add("Brian");\n'})})]})}function m(t={}){const{wrapper:n}={...(0,r.R)(),...t.components};return n?(0,e.jsx)(n,{...t,children:(0,e.jsx)(u,{...t})}):u(t)}},28453:(t,n,a)=>{a.d(n,{R:()=>s,x:()=>d});var i=a(96540);const e={},r=i.createContext(e);function s(t){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function d(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(e):t.components||e:s(t.components),i.createElement(r.Provider,{value:n},t.children)}}}]);