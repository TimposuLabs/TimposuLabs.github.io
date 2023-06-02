"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[2316],{3905:(a,e,t)=>{t.d(e,{Zo:()=>k,kt:()=>v});var i=t(7294);function n(a,e,t){return e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function r(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(a);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),t.push.apply(t,i)}return t}function o(a){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?r(Object(t),!0).forEach((function(e){n(a,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(t,e))}))}return a}function l(a,e){if(null==a)return{};var t,i,n=function(a,e){if(null==a)return{};var t,i,n={},r=Object.keys(a);for(i=0;i<r.length;i++)t=r[i],e.indexOf(t)>=0||(n[t]=a[t]);return n}(a,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(a);for(i=0;i<r.length;i++)t=r[i],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(a,t)&&(n[t]=a[t])}return n}var s=i.createContext({}),p=function(a){var e=i.useContext(s),t=e;return a&&(t="function"==typeof a?a(e):o(o({},e),a)),t},k=function(a){var e=p(a.components);return i.createElement(s.Provider,{value:e},a.children)},u="mdxType",d={inlineCode:"code",wrapper:function(a){var e=a.children;return i.createElement(i.Fragment,{},e)}},m=i.forwardRef((function(a,e){var t=a.components,n=a.mdxType,r=a.originalType,s=a.parentName,k=l(a,["components","mdxType","originalType","parentName"]),u=p(t),m=n,v=u["".concat(s,".").concat(m)]||u[m]||d[m]||r;return t?i.createElement(v,o(o({ref:e},k),{},{components:t})):i.createElement(v,o({ref:e},k))}));function v(a,e){var t=arguments,n=e&&e.mdxType;if("string"==typeof a||n){var r=t.length,o=new Array(r);o[0]=m;var l={};for(var s in e)hasOwnProperty.call(e,s)&&(l[s]=e[s]);l.originalType=a,l[u]="string"==typeof a?a:n,o[1]=l;for(var p=2;p<r;p++)o[p]=t[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,t)}m.displayName="MDXCreateElement"},6777:(a,e,t)=>{t.r(e),t.d(e,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var i=t(7462),n=(t(7294),t(3905));const r={sidebar_position:3,title:"Apa itu Java"},o=void 0,l={unversionedId:"java-dasar/apa-itu-java",id:"java-dasar/apa-itu-java",title:"Apa itu Java",description:"Sejarah",source:"@site/tutorial/java/java-dasar/01-apa-itu-java.md",sourceDirName:"java-dasar",slug:"/java-dasar/apa-itu-java",permalink:"/java/java-dasar/apa-itu-java",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Apa itu Java"},sidebar:"tutorialSidebar",previous:{title:"Java Dasar",permalink:"/java/java-dasar/"},next:{title:"JDK, JRE dan JVM",permalink:"/java/java-dasar/jdk-jre-jvm"}},s={},p=[{value:"Sejarah",id:"sejarah",level:2},{value:"Versi Java",id:"versi-java",level:2},{value:"Java Platforms / Edisi",id:"java-platforms--edisi",level:2},{value:"Java Bisa Bikin Apa Saja?",id:"java-bisa-bikin-apa-saja",level:2},{value:"Kenapa Belajar Java?",id:"kenapa-belajar-java",level:2},{value:"Logo Java",id:"logo-java",level:2}],k={toc:p},u="wrapper";function d(a){let{components:e,...r}=a;return(0,n.kt)(u,(0,i.Z)({},k,r,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"sejarah"},"Sejarah"),(0,n.kt)("p",null,"Bahasa Pemrograman Java pertama kali dikembangkan oleh perusahaan Sun Microsystems yang dibuat oleh James Gosling bersama timnya dan diperkenalkan ke publik pada tahun  1995. Bahasa Pemrograman ini awalnya bernama '",(0,n.kt)("em",{parentName:"p"},"Oak"),"' tetapi karena masalah lisensi (nama tersebut sudah terdaftar oleh perusahaan lain), James Gosling dan timnya mengganti nama Oak menjadi Java."),(0,n.kt)("p",null,"Sejak awal rilis, memang Java dibuat untuk tujuan cross platform, agar bisa dijalankan di berbagai sistem operasi maupun perangkat. Itulah mengapa Java memiliki jargon ",(0,n.kt)("em",{parentName:"p"},"Write Once, Run Anywhere"),"."),(0,n.kt)("p",null,"Java memiliki fitur:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Object oriented, sederhana dan mudah dimengerti."),(0,n.kt)("li",{parentName:"ul"},"Kuat dan aman."),(0,n.kt)("li",{parentName:"ul"},"Netral terhadap arsitektur system (OS, Prosessor) dan bisa dijalankan di manapun."),(0,n.kt)("li",{parentName:"ul"},"Kinerja yang tinggi."),(0,n.kt)("li",{parentName:"ul"},"Interpreted, threaded dan dinamis.")),(0,n.kt)("p",null,"Pada tahun 2006 Sun Microsystems merilis sebagian besar source code Java manjadi free dan opensource dibawah lisensi GNU General Public License (GPL). Tahun 2007, Sun Microsystems menyelesaikan prosesnya, membuat semua source code inti Java menjadi free dan opensource, kecuali sebagian kecil kode yang hak ciptanya tidak dimiliki Sun Microsystems."),(0,n.kt)("p",null,"Pada tahun 2010 Sun Microsystems dibeli oleh Oracle."),(0,n.kt)("h2",{id:"versi-java"},"Versi Java"),(0,n.kt)("p",null,"Jika melihat tabel perilisan Java, maka penamaan versi itu mengalami beberapa perubahan dari awalnya JDK x.x, menjadi J2SE x.x kemudian menjadi Java SE x.x. Jika melihat jadwal perilisan Java dari versi 1 sampai versi 8, dirilis tiap beberapa tahun sekali, tetapi mulai dari versi 9 dirilis tiap 6 bulan sekali. Tetapi terdapat versi yang LTS (Long Term Support), yang mendapat dukungan update dan security pacth lebih lama dibanding versi non-LTS."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Java Version",src:t(9266).Z,title:"Java Version",width:"491",height:"712"})),(0,n.kt)("p",null,"Info selengkapnya lihat di ",(0,n.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Java_version_history"},"Wikipedia")," dan ",(0,n.kt)("a",{parentName:"p",href:"https://endoflife.date/java"},"EndOfLife"),"."),(0,n.kt)("h2",{id:"java-platforms--edisi"},"Java Platforms / Edisi"),(0,n.kt)("p",null,"Saat  ini Java memiliki 3 edisi:"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"Java SE (Java Standard Edition)"),", adalah teknologi standard Java untuk pembuatan aplikasi yang bisa berjalan di dalam PC maupun server seperti Desktop, Database, Network, Input Output, St dll."),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"Java EE (Java Enterprise Edition)"),", adalah teknologi Java yang ditujukan untuk pembuatan aplikasi skala besar (enterprise) contohnya banyak dipakai di perusahaan-perusahaan skala besar. "),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"Java ME (Java Micro Edition)"),", adalah teknologi Java untuk  tujuan pembuatan aplikasi Mobile Devices, Embedded Devices, Java for TV dan Java Card.")),(0,n.kt)("h2",{id:"java-bisa-bikin-apa-saja"},"Java Bisa Bikin Apa Saja?"),(0,n.kt)("p",null,"Saat ini banyak perangkat yang menggunakan aplikasi yang dibuat menggunakan Java di antaranya:"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"Aplikasi Desktop."),(0,n.kt)("li",{parentName:"ol"},"Aplikasi Web. "),(0,n.kt)("li",{parentName:"ol"},"Banckend App (contoh perusahaan yang menggunakan Netflix, Amazon, Alibaba dll)."),(0,n.kt)("li",{parentName:"ol"},"Big Data (contoh Apache Hadoop, Apache Kafka, Elasticsearch dll)"),(0,n.kt)("li",{parentName:"ol"},"Mobile App dan Android App."),(0,n.kt)("li",{parentName:"ol"},"Games(contoh Minecraft)"),(0,n.kt)("li",{parentName:"ol"},"dll.")),(0,n.kt)("p",null,"Bayangkan kita hanya perlu satu bahasa pemrograman tapi bisa membuat banyak jenis aplikasi."),(0,n.kt)("h2",{id:"kenapa-belajar-java"},"Kenapa Belajar Java?"),(0,n.kt)("p",null,"Dari berbagai situs comparation, bahasa pemrograman Java selalu masuk kedalam 5 besar bahasa pemrograman paling populer di dunia dalam kurun waktu 10 tahun terakhir. Banyak perusahaan baik skala kecil maupun besar menggunakan Java, hal ini dikarenakan kemampuan Java untuk membuat aplikasi segala sektor baik itu Desktop, Backend, Web, Android, Game dan lainnya. Selain itu ekosistem Java sudah besar dan kuat serta didukung oleh komunitas yang sudah besar."),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://www.tiobe.com/tiobe-index/"},(0,n.kt)("img",{alt:"TIOBE Programming Community Index",src:t(5537).Z,title:"TIOBE Programming Community Index",width:"939",height:"447"}))),(0,n.kt)("h2",{id:"logo-java"},"Logo Java"),(0,n.kt)("p",null,"Logo Java pertama dibuat pada tahun 1996, logo Java diprototipekan sebagai cangkir kopi biru dengan uap merah di atasnya. Konon logo tersebut berasal dari kopi yang James Gosling dan timnya konsumsi, yang biji kopinya berasal dari pulau Jawa. "),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Logo Java",src:t(5462).Z,title:"Logo Java",width:"500",height:"313"})),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"Tidak sedikit yang mengira Java adalah Javascript, padahal kedua bahasa pemrograman ini jelas berbeda.")))}d.isMDXComponent=!0},5537:(a,e,t)=>{t.d(e,{Z:()=>i});const i=t.p+"assets/images/index-51d69a1f3b25a11d06ccc43c08bcba00.png"},5462:(a,e,t)=>{t.d(e,{Z:()=>i});const i="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAE5CAMAAABRfiLSAAABblBMVEX////9/f3sISXsICQMiscMisb//v7sIif++/vwTlL++fr8/f75vL7+9vcTjcjtMTbtLTL+7/BIptQPi8j1+v1js9v97OyKxuPsJCo7n9HtKi/6/P4Xj8nwW1/uNjvu9/vS6fTA4PDq9fo1ndD+8/Oq1ev71dZCo9Pe7/f84uPI5PKw2OyPyOXxY2cakMr3qKr0gYTuOz+Vy+Yols0wm870hYjm8/n95eaAweFuuN1YrdgjlMv1k5XuP0NdsNn6xsfE4vGf0Oik0+ppttz2mJvtJy2azuceksrwV1vN5/PuREjy+Py43e/4sLL4rK58wODi8fhRqtdMqNX70dL1io3zdHjyZ2vwUlb4+/396eqEw+L82drzeHvX6/W12+76wcPycXT95+jzfYDybnHvSk/vR0v7zc/2nZ/83d75trj4s7XxYGO83+8smc75ubz3oaP1jpFyut73o6bya293vd/6ysva7Pbb7fbc7fbZ7faSEv9YAAAeuElEQVR42uzczUsqURjH8ec8Dxy9ooxuRIRcSeBCyoW4Kdo0EEJt0kIM7MXq1oWUG/f/v9XtZc6Z8ebCM844v8/aVj+avh1nhhRkDkbPIIIMUpA5BABZoCBzMHoGEQAAAGwGBZmD0TOIkkQTZM24jdUzp8q/CRbY1JDTjfJIgWsJC7kj7ipwLWGjD9krKXAsYfU+YC4SZMtMpEuQLcciU4IoG1vv6ok511TgVsJCrsjMBwrcStroInKowK2E1fuDiDwTZMqxiPQJMmXGzH6yLj6bSSXInF/0FDiVsJAb8os/CpxKWMgdyYsHggzRDXkxI8iQKr/aI4iwqSE34VdzBU4lK+Tm/GpXgVPJGn0Lo8chUfVe8uXVgCA7ioyQy5yhvLknCNvQei94/OZYgVNJCrkiv8BdFO4lafQ2//NTgVMJqvdeTt7UCgRZMZAXuIkiU5oe/3NJEGEj6/2e380UuJWYkCt5/O5UgVuJGX3O77y8AreSUu+9ury7IcgG/cwfHgmyoSj8zi8RRNq0eq80+MOlAtcSEXL6kt/g/ud4JCLkTuTTFO8Uy4btunw6IciCyr586uDLlkwoHfGXHYKFNqfegxHH/YKCOKx3dN3lL1JUEIM1j67nHHCmFcSC1kjvSUC5R7Dx8l1mVNySNiTkChcc1MbFPTZrG735i4MaFQXxWN/ovVsOquHQPUa0HnceBwn+oG88vVMTQxdftGy6wq6YLvME30h5vVe22HSDmyHjFf/o4302nWHzWMU/ui6W2fSMr1niRvHSeyymYZ6WptF7KVS6Ecv10js2n4aXTYK0ufrBJhksuXl1p+17J/hFT1+93zXYJIdafU9Xd7ZyzJdVBasR3+j6xGeTzNT3So/tHDN3JgpWheKiu2LJ7Xz/Q3cX9bePdvHkSwo1z0KbP9I3Kvd9eTPdJkif3lQstSf6L3069OWNf4g7o9PotMEWf0L/U3g8F/7n/CfBi7TV+6MvlvqB+o/mfUfe+Yc4pF05Us7pPWFL+U4tVh2U+cOPsYKVcz96Ycg271QtdLXr84fcHs7lXSDXmltia4xpkdGuL5/6iPZ06t2yrbOwzJrzOn+Sa/xvnk7bDbHt9yha4bcnX7wiTtqD0lPvk7rY+iMV7eBWArauFLjidPTjHNsWbX51JvwlN8c/ag6RO/o+J7bbEUXJz8oS4E0IUkkPJGRapSitIwk6vyJIpfyFhPyoUAQ9q0vQNY7aU6pwuezmo7YE1XZQ7ZGSX++FZw75UVERDhoc5N0pcM3N6KWzJTfXh2bg37YUOOZo9EKbQ6ZRm5du2LCFB5bjQA7knyWkX6Ww0bkYbpBwaaUjur3To7DWvhiu8RzjYgkPuQGHNH6qsHGDDQO8gCQmqx99R9hW3lZh2x42XwcXo09qYvMPVNjYE0MXm8eGVqzliY0foz7XEMM1jmRSq3QrIfcUVulb3Y6GSy095JALTSH5X2w4x00y30psvR8L244KKmzPivuRghitdPSrstg6VRV2l5MgvEQuLi5Gb7PNP1VhpT4bDhXEilaoyEtFHA3EcI6IS69Cn21tTWEtn4NqY4LUOhGbN6IIN2LYJVhCMutd98X2oCKMWYLqeKtI7FY3+iTi4q4iDNnQVRA3WpkbsdRaFKFSF0OLILVKPlu6FGXGhnOC9JqIxWtSlCMx7BGk10Asc4pSYTH8IVhKIuu9zaZ6RUV5YBNO3WPjoN6nbLpQkbpswoOKMXEyeodNpyrSFkZfP1qVjhj29VIfkwpBek2XOlzN58R0R5BeZ2x4okgVttxTEpR6Qa2Nv/z8Ze++H9JIojiAv3kDs0gRsBIVbFhQCWKNBTUGDZZoPHvU2I0lZ4w5c3f//WHuBGaYhQWWcsrnt8SVRb8uU/bNLNHJJHJ8ROoYBW5SCtzIsT/znoZuoT/QRIqZSB1TAZbE3jIVlON67qHrxeThfm0g56SiDSgBQuhKuaxDo2GaYI5p7MhReyk8l6UcepZ8CsYpNpDzoKgUZt8rkPPsQye6OeU7cnJuFDlKYCZWDP25t+lEN500gZXI9dMk+6ToKiinHLpW/KU+SeRWMIlS/G1myld61i5d6cffPkx2XvQNvl9a6HrqxxiHDaRYELH0+nIvrSOnJ6edxkyD3AlNVvTS9/KQTZ/S92GQm6YSFWbITDn0EhmyRbEIPgkROVMIfymp5WzlNj0XvgZ8sg5ykyjhuoRMldv0knHPVUDL1M2hRIRBJsqhlxJ2g/+xm0FuH2UCkIly6CVlN9aDvwI5n4tK2OsgI+WOXKl05B5ZKf7LzYhcP8rsk2J5eR05orN4pkonkXPakcMdXgTl0HNnq0h37QZQxs1Icby80Dn6biDoGgU55qYy06BduU0vNVYlzSYTow4qkcmwrRx6ydnAXxp2QcUHihIXoF15yFZKvfdHTztC9hMV7BQlTklRvLw2neSFM4SP5o6JCm8Qk7mcpBiyCJ2ZdtetgS+Tw1GT364fdk2kOJjZd3EV+LLx643cX617GUkP8qSzgT7aBzXTCk12D9oVq01nx9bJH+cOyrPfhPcYSDGOiUEaTARy5r1A/03QRTkYOgrsMuAwZ11dncnkZQA2L+TT1a9QlcuUuxiIIqBRkUJnl/enQapmMewEiTvHk4aoOcdkmtg3HI7E77DbIJnt4S7ioCoU97UZEhwvKjR0u6FYmenckd/Uw/hoi4EK2xkmUZygXaE7ct6r/SCm1jDshCS3yJvzQkoR5JwR4LHRgL8BUwsGuB+hP8KgH91sWlHqIJ/YET56ADWXc5jkFrQpeOi2a/8camAPEBDYxIQ+MEhlETmb3NGs7tu2ghqcrUPchj8aeoP9civ0b+gkb2wRGlVhImruaZJhUgRpS6DZ5YmDarXlJYItyvtBUmHCqe5JgsMbF9VICZOYDbeJ9N8MR1wXrjqS3+enOxcxKkDUMD+K/EQPOvfebUcKZuB8lPA+IM9hIynYXMi5IDGdFZiJTVMs9Jto6EeXyo0z76ETnx0R7U6i5tiOggqiUSFD38PMhHYJx+lC3i0RqZ/N5SUxk5iZTfKf2zAh1wEyfGHetEX/CXm1PoeI/aBqBQXnoE1B23STB7WSP53EjdJmWs6KnAoGMQ8KZmaSQYGIs/DYCWrYNuWdgWYFHLKd0gz1M2GXTMqxm0HdF/7gfQYxZgfNDE4XJfUVilhhAjXrFDk3oF3heu8rmCHlAhKNomAa1J0gJ8Agzo8ZCtlAhuQXm0TEe/UvbyGnn+hB72nYY+TZt0+Hw99WVgLfJk/8QZTYJpwz1P5jRpCzRxJ8Q44rdLM/+S1wvRKdh93cbtBcWw75xvopdRyDmk7KuQbtCjgjt0ifeLbC005+5OwLB2mSQ6Hsm3I8JlDDPHxLwB25p8Te4tnJyp6ZQRwzT2+6qMhjg2JgR5T6Gahg3O+7aDNyYujStVgN/vtLBhK2O4VyxJ+4EzXvpLbLv9QN41cC0kfB/SsnAwnfDVLBCoNiMG1hiis4XAJNetoZuStE+6bVxkCNdQ55/HQnCyFvmIGKw5T97yPE87tOBmrYBgrcDIrC5qZ2p6bPdytoVtAr3dt/a4OUrlG8woT1vJQTIuoXQaoSssPJPZbuGZiUo9RBcXgr6CmosCk0poJBRkqoXIqdUt4RgwQPSHl7oOIHd6TLBhnyeijvikESUgjOc2olcsyOMdOkKHSpnPEpyAmRRCY78iaJHAsJo4CMfUk/UgBSEMchj5fIefDJFiNZKoHQiR85io0k2kTeGZGrU3IdwjrnkBMxEREUiM9zykCGOGKjk2PQrOQ+3pNb9T3hpjrl4ChIHfLH3TLI2Bb/EkEGRXPpWUmzh+QVaFeCoTsx1Ujd1kB53+RZ3CG/iSpk7l548J0JiudysTPlEKWfQaZKqwQ6hBwrcPzahlI3mGiRQOY6FUykmCEJKRjflo2I4ivfbkwkW6XRppMtIXTCWUmqDCMSJkfuizrNLuSYiQhI4YwGJO/Qjr+ceUnGmns6Bj69edM32zrCSiD04ZSh17mQt0IkOpHzgWQjlDb0QvKZQRSgvyzWQWZG3tYOGoxPDIO1HUtFbtPFe6JW4EVUJ2rVb8KOQjYi/IuYocSYg/9mvgsZmVmrNoqa3rUUN/SV1KF/QcppsKWdmgkRyIa/EKHX/Nk6W7868BEyd08fVdRBJtqmjFHVxiRT3cUM/Tp16D6kvNu0t9j2GWTjR35Db+55+31tsNJY3VW/YMlqt0GMuvFCJmrqB5ZbRpqXmtt+tr793lVtiKv8tFO83vut2HsXnKUvmtoTmvRsQ+fo2Huv6RmoHao2RE28621mJCv9NOrITHLAmjt+S8j91U+dS6C1uxWudCK4SyqaIiKhST8mWRGudJ1670tfV7uaDL8MrfY0kmx1KpQqX0iuLC3jhpjXy8UK/SpN6OtIeQ9ExE+mLZLsbOkeuqWlvqrS8K+hNy0Wkj3bOaL9kOjA0vva8KR6tkhDtntxyCZgQeQNE554W+aEZIVF9B2y7Xz9Phi7pMZ6GOTkDjEyCvo4GDQ8Mc4Wqk23+datK182Tk5vIhWLHkUIXbZJdur5tgvkaJ54NzkvH67uJ4f3t9zbZyEH8syQg53l2tfGJ6/eLkGOphVl0gR66Z4wPqmcyXfo3ov7fv+5XYg5XejTKLgE3p2wWh/SYaPW8GYk2KAgR6/QLT1j7w0xVa0WyJUzeL4OOmqNd+cm2vIYuulho8KFHI2hm+3ICzPgbGOibQYpOa82gxRl9Om9t/W1G+JetVpIztjRnY3oaswQU5u3Nn1v2ENREytJsom8SMrlT5MkBZP1xxyq0aNNb3nXZIir7msEHZgvQWdtCe+yJy+TM2zarVCtrJDkCoXzOFPdc18HVbZvi0i1MkPmetaMiSq/QnHs1EAaY8aY8XyEfhGhnIxDt81RHj/7so/a1j6ZAkHK0Tv0gykjbxYKjTUvdLwZb/+tG9LoMcZ1696mOzcVzIRVOivO+8G4onbxa3LrFZiRTEOv+aPSwHtvgcKpOfg8MPbbYPXjeWfTn9gyYYjp0/tKP/TQzFjl92TU16+so5ZVCuY7F+XofaW3DBlFlSOQf5a2hY76sarB+D2Vd22gwZQxpkrf0NmkQnUIfVd8lWnVtU/KLsg43UhzD52oa3lvSDbUaiF5wmo+9nT0ja21Nxl47TNEk3pDTJNFz967aRPVKA2e0Nm227+1FRR77xKRFJNyFRqKn30hVKM4POcVEbff75/LoXKGtRuk2vtaGol+2M5Iy/Js/feprsFKg0xTn9bTdRjiPuoYuukIk3m27j48XDptZsakBVFWLUXpiyRmV8OAzReUhL14FL668DltsTcdySH0ZqOq111jfb0LbZasg25c+tjS2jHwZmw8GrUxpfFuolWrMW5Bx9D7UbQ4uWcigg8aQvchj/rUiug6STLvGQoUd2CXEYE7h3E6qzWm8Xqoaup7/XzH8kxLd9vSTiMBNWRnqa17obX3bd+bsamqV4NN1UZtBnstoFli6F91adPl69Qi0g0ePohFFBLsnPLumbxcPWSCJOyHOM4/8YGEO5ciisY3lcYMVDa9H/x9qP1VV1cVp+vV0OD7ympjpiqH1v6YrYEMfOZC12vIVmdHTkOAgYx4pYPMHfL8TL7b3AlLewJc7AQpd25DtpFPQ4bCqx6sGuv7/LOGQYYGDHELuoW+jxzHBUD2oa8jL1YpZ027QYnNg5wKJ2QbOknNctD3W5OhQJqG1r4PfD5YYiQ77wxx3Xq16T4X/7VDwlNv06WCyHt6Of5Py25L2wkM1hFOjm26qGZhoPZVkzF/mtrXxuo7Zj7uMMhJe0J3w6JXm95POdznroY2XXSC0o2oTB5xobPIFKScQ+4Qfdp0UWP38vwfU6/e65n171W1q/OfW9oaQRcfjXG/gU6hm+00kWsUcgt9Wgh9kcn++5al+8ZtAnkLXWRp/tn6OKiuan9facxG9fv2xy7/7Fcua130GeP0moYVf9c3LMfQbXbKG5V8ADR4QSRuZhFghQhdxGraDnqWZ+frV99NrVW9Gpp43xT9MzDwoiE3TQy+qlqrHVvte9s7czBSwyBPWGKnU7cbLnfIuQeRekdO7gh5ASZuSinfMP0cE9Fj4GTYkdMNa6xZavv498HCzMzM168zMz0LB90jSzWNjBTGsiHuN92qYf2Us05UiVe6atGsZE9oYXuSK9k+wTRR0ERUudNXwz4Xli5D3FfdKmdCyPESklvvnXjnkGM3Jc35NUjOIixAjqQKvZRWrebXZ0NclUWv0JmLj8OUc+jEj7x1QsRb6SSZVfse6e6SWrWaTzsJLbpxQbfCSCdyGkjObToEkssjH9LXPq+I5Rea2/SSW7Wqn0/GuD9At9CPkWfLPfRdBTk3DE6EhwBIFzFz/OXQAXqqDTHtNfkL/TL30GEbOQ6z0HffZ+lDP2Ol0XsvpubfDTFNLToua/IibyXrZU3qN9XXD5EzTSRWZA98kNt+GR05y7ghrkPPBYzMpfWhO3tBylEPXVyp/mVT2IpAxoqUc0tUsA8K5ejekbO0LUHxsVVj3Cd9NyVYpBy1ZwazW4esRk7unHKExzluMJDoFKK8ISBlHkbKM4Oelnrf/T5lgeKbN8aNWfTdlMCPPPnOZ7Z+BQUpQt/AFBQfyIgPcaLTDCR82yjSMXT2a91LVw0UX0dCJ67WovP2I5OUp0xDsotzLdWwYrGznJuBlHiKUB0kMd030CT6hf5z/LEUpqkbiu9ztew61/GGC8+xDoLdfaQZhc48VN0103ZPlm47gccuKnIvgVZnqa80PBojxfe50hDzxqL7PnJmBwoaAiaS4HijAWWsRN0JqrLbiJwVRYtc8SS78KOUXtuPrMU6ykXXG8+8cjYfmwceYZKK66dkvNdbLsSMQz9EVRtEhdmOImWzk/2XuO/LGWI+Q6+J3dp4S4ptNt6eD/YQnUJvMKULyL51dx8In1QoyNEaus2h3o0javYxGQ1thu+/3f0I6b5UWfQ9vh/FDujNMtL6tRk0Yn0G45O1NsjaOeU4GMSZQjQrVkjhFKlciunVTqRZMYMODoxx482gF9b48ev896qJxwK3XtCk8V289GreAtlbRI6H8TdINFKCwpBN3TWqmAZ1ftTI49B9yDZmSDAxXwM5stR0t75dnWp/bYj7pCXC5rV40UQ35MKDnHMudFMFauKw3moO3etCqTMC6jrnUJOz0VPd594nhMXLY5+bLSRzluhyxd751Vr5ErbxZpLOwVDsL2/WQnJhdqXcFmSvATUIdRKf2Karu0GpDySVSdTC7yVhvdt0IlmdMFRbH13a1miBlCyNSyM/e5aj+3VHlzYNveezFg0up3411tv0dPbvS5CbXaQpC5CvFJrWlhOA2bW26RBAKhE0p33CXTqusAngUNG7TVetgm6KVkCORysgP9UPDMy/fTQ/0Fdf/+aPd7Xjv3W1/z7BrWBLa+onqKv5HjvsAHL1gJSzAYIVF03NHmAQ5dYc+rFCJb4xSMnmT5f62XrSq+vTphsLpLp2xgJyP1891bf3QO4ClLcComkPTUHZr0suU7amnwQUebyQhnlYoSk4wmZuyk+/0Nt+NxTM+AhIsPkmw6Pq8QXQwwnyOiFJ3b6CKpTTS1lHP03oYUwWZpDWQwWqaRiOTce7dS+i+NhlLIj21QULkRhZ+7c1GftJ9FGBnDkzkdjbbEAJz/CotMtHp0lKl5gkYiMasMMbBSWC4ToSE44f4jAREZAsNM4PGvLs9fh8N5Fib1//ux9GM9GJOH7aVjvuwym/cyAN7k+b+EN2d+v+Q9LY60y0vr7eaSIa+b5EFGFi7oR/I8xZ98RGkgDJSmNHVbUhXyq7Ps3sEBXdvz3+SbzrsRDdXCFvmKhiPmv4xH1udzg82ycrl4wUi/Nw8mg7ZHfYQ9tbG1ejJCOQte4+LnfdAn/zdQlU7fQ1GSrHe2tAT0fIOwQNGLxQzctvql4bjHoZnBroSRknm2l/PdXbDPqyOVCsQC5LzfKz99P4UKUxJ5XttX2tbQxSYx2rrTugu2vk/YBnj+iiMTp9/qa2aui10ZAR40TXu77egx1SPGyb8q7JcwdEV2ype2F5NrpVWHQO7nGDoYnXlUaD6HHq7tca9dafNYwU2wXl2W3kuYN8Y43NI90HCz0zUY+rl/8aaW4spU4Qc1PeMJQ9d9bkCuSyZ84bRN4plD1z7IjylD14AciLFkDBEXkBXnboVgV5DaPkBXjRod/OoSBMXgJ4udi9QgXbJih7zpynVOQoD9c0a3tbuwz/M+aAnYrQCi8EyRFrHa82tDeS/xXvlyAm+0JeCMhRa5ch6i38vxx7aLLJUpodLmFttcZfZuB/Zn0OBTRczlyTg9+N/xqA/xtxh1bXSjlzTT5OxMoYWyBXbZ9XVw+gcMKYKLQOZVqw34wxTQM1kLXmnvl37cZHfzRDoZBNjFH2vfCi/NPevbS6CURxANcyIy1SS30gIQFfSIKKCyPBKLUx0oSQlKirYImbllJKsgiE2378Vvu+vXm/tJ3f4q4vOTE6Z/7jwY+m3TvHqAv4YfKBi3xIexD85KkEfiVPf86se/L+9lGOqzqh6Aa4B9q+M9AXmlgEJfC/EPWx/HkkZXmyxqeVh6NVtIhfyfMXj3LvPj7G/zMnFD2FG4FiSpvXXiq1gqIsl+1hAzJwNyaM8Ov48OzRq7cv/7OrPIcdT4cX0pgK2FW8ef0cQw7CevBSzGkHQ35Xlgc5XAeXQ4Xif/i7eyUYfgILXNK6Yg396sBOog/hhdhTEbXISkrm4PkxtIEqXmqiT8FzGnKqjCFl1+EVcB4UzY/qGPKA0jy9/0SKTu30g+nTBYsj14Dh50F21G6NAcfxXF4a48i1YPj5kIJkcTUTHIBpu47eInHkCg4qOtkZ6daUcxOa5iwR3+rHUfXENpntE7VrvhNoAqr3Dex6D/fE4L4Pyl+6vN6qY/siyHE0WqiB4XRDN07o5ld0EvvhKrVUaS6UYeAPct9Y4mMPFBpJmnXKXSUBQ05U19ImBQpMk9dmWOnpa7TWO4WgckPwHR1UpFNSH8bl/ikqM1Z3qV8bnJ+q0w11YYohx2ith/AHzyrDRM29+ZBC9/UjiD4EP3HV+ghnbQAqd+Ti9joh/I1RrTskuYYQorTNgQh1CH/DVedmnmO7eWgeQ/aEF+or8IcIrxAyswEAMQra7Asr/tZ98AdqhlcGmTXBVz7aotsbVljDewZYNZCf0iXMpdV6BikBDf4lLcNg9B3Y3tSGBVvDkAP54G/LoMxlJwQpTRrgG9OoQJ+4bGYmfMgwzMq4VieEnsUpDPyBWqGl2hFkADegms5ELs3dkpRH/Wm8ZOBvGusIQ45A1OA2ts9PoltWnmBbUt/hmh68zzbkTW0HdPnvIDFgl2GzGKd6xdqTbEec9PmVW2tT4CENbrHp3xmHSrW6S7egm2A/Zs1dGaoWzQjsEurjjijpA37F0TWPAltQcX+MbTKyQVXWnLfU8uFBqHYtDh1LlcSIJY++lMdyS9Qmet/ip10ubipe4xwHIliHgTX0PL9P7l3kKHAUptGuJX445QdqJmmieNf6YT4XxZGmaT1pkulqMWLZWXdDzo3pptIeNqgjJ/Vp2xquxMIGwJzjyGYY/pMcJAwotQY9XYzxrT75+fdwgiP7FL0g610blpPNWRqL7yCsKfiViiPbYPcRcubEHiwRsxZaPZnAdpIdE35F6RhyBDLK8+4mvC2qTXetSau+b9SrAXMe6sOfot7p5T2RNgWuCjaWNOcEkzuWwPZF9nwGFGjUlTkHYtYZ6UHadWnFoyC4CEh5Cu12HUOV5nIdO5BsKOAbqmIxryogZvJdL+tb/Dp0i2UXxcDDUZTZXirNxOVWU37Qz3pidMJURlaNKfhd/AlDLo0g2XyopqgVK/H+YGAZBs+naeo466njpCn/lWFYg35fzzJJGol3kSywOEGc7WCG24A/KBN0mf/ryDsrocBPdh+V/N9GyHp3CX6jqKjk/zIyUlcKA38XL1DJ/9mxm4TQM/w2+FPb+YQj+6vQBEYymvC+zYB7TG6C8u6HObDokiR26iR+XaQg6vzDr7Lxwgyl3Y+AHWKshx7lKQm3NvqTUb6TfkGkMF8ERUjqQfk759CN/DpI0fi1TjKXTTd0rH6mzTvj+jlKQM7kuaRaUy5RTLDRMOZ7ZQ5o/4vYHp80wH3UcFmjXS6cpkbQ1ye90bzVEdhZnSSJv3oxxFckWZ+NhehO7BXZGSfPzthDBmznxVO1ha7w25iNBqHCgJ0YyjQ9b7m0FaX2g2Iv2553aHLGbIaW1EF5x1sTeoNu0wTwokBDcdcDqeRvt/rPkNHCWiUX2H9t2AmX9nsRem1UabEtKUjDRDEZcAqYPxx2+WAidlCxK4Mct0ZZkO+9Nmv51isAcIs8MuHZ39K0QRGoRjftjSrShiVmrBzdiZq0yFS1HwSDQhCoqj5ZSCPxc2c8w9GAnuuqUBsWQUVHToAhCIIgCIIgCIIgCFIaXwDyjhvVBxMmYwAAAABJRU5ErkJggg=="},9266:(a,e,t)=>{t.d(e,{Z:()=>i});const i=t.p+"assets/images/java-version-68de1241095319de0a16d7111bdb0797.png"}}]);