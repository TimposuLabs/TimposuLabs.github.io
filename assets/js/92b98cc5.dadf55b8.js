"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[6546],{97662:(n,a,i)=>{i.r(a),i.d(a,{assets:()=>r,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>e,toc:()=>m});var e=i(31034),t=i(74848),l=i(28453);const o={slug:"tips-springboot-intellijidea-community",title:"Tips Menjalankan Spring Boot di Intellij IDEA Community",authors:"topekox",tags:["springboot","spring","ide","intellijidea"]},s=void 0,r={authorsImageUrls:[void 0]},m=[{value:"Menjalankan Spring Boot melalui CLI",id:"menjalankan-spring-boot-melalui-cli",level:2},{value:"Menjalankan Spring Boot melalui Configuration",id:"menjalankan-spring-boot-melalui-configuration",level:2},{value:"Menambahkan Environment",id:"menambahkan-environment",level:2},{value:"Set Profiles",id:"set-profiles",level:2},{value:"Kesimpulan",id:"kesimpulan",level:2}];function u(n){const a={a:"a",admonition:"admonition",code:"code",h2:"h2",img:"img",p:"p",pre:"pre",...(0,l.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(a.p,{children:["Saat ini mungkin bisa dibilang ",(0,t.jsx)(a.a,{href:"https://www.jetbrains.com/idea/",children:"Intellij IDEA"})," adalah IDE powerfull untuk mengembangkan aplikasi di ekosistem Java. Fiturnya yang lengkap dan plugin yang banyank, membuat IDE ini menjadi yang paling powerfull saat ini. IDE yang dikembangkan oleh Jetbrains ini sangat cocok untuk mengembangkan aplikasi berskala besar. Namun untuk mendapatkan fitur lengkapnya kita harus menggunakan Intellij IDEA versi Ultimate termasuk jika kita ingin menggunakan plugin untuk Spring Boot."]}),"\n",(0,t.jsx)(a.p,{children:"Namun tenang aja sebenarnya dengan menggunakan Intellij IDEA Ultimate pun kita dapat menjalankan Spring Boot, tapi kita mungkin agak sedikit melakukan konfigurasi secara manual. Berikut tips konfigurasi Spring Boot di Intellij IDEA Community Edition."}),"\n",(0,t.jsx)(a.admonition,{type:"info",children:(0,t.jsx)(a.p,{children:"Dalam tulisan ini saya menggunakan Apache Maven sebagai build tools."})}),"\n",(0,t.jsx)(a.h2,{id:"menjalankan-spring-boot-melalui-cli",children:"Menjalankan Spring Boot melalui CLI"}),"\n",(0,t.jsx)(a.p,{children:"Ketika menjalankan Spring Boot kita dapat melakukan menggunakan CLI, tanpa bantuan IDE. Kita dapat memanfaatkan CLI yang ada di IDE Intellij Community dengan menggunakan perintah:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{children:"mvn spring-boot:run\n"})}),"\n",(0,t.jsx)(a.h2,{id:"menjalankan-spring-boot-melalui-configuration",children:"Menjalankan Spring Boot melalui Configuration"}),"\n",(0,t.jsxs)(a.p,{children:["Selain menggunakan CLI kita dapat menggunakan configuration pada menu ",(0,t.jsx)(a.code,{children:"Edit Configuration..."}),", kemudian tambahkan run configuration baru dengan klik ",(0,t.jsx)(a.code,{children:"Add new.."})," pilih ",(0,t.jsx)(a.code,{children:"Maven"})," lalu pada bagian ",(0,t.jsx)(a.code,{children:"Run"})," pilih ",(0,t.jsx)(a.code,{children:"spring-boot:run"}),", lalu pilih OK atau Run untuk menjalankan."]}),"\n",(0,t.jsx)(a.p,{children:(0,t.jsx)(a.img,{alt:"&#39;Idea&#39;",src:i(87205).A+"",width:"1044",height:"693"})}),"\n",(0,t.jsx)(a.p,{children:"Dengan cara di atas kita dapat menjalankan Spring Boot dengan menggunakan tombol Run pada Intellij IDEA Community."}),"\n",(0,t.jsx)(a.h2,{id:"menambahkan-environment",children:"Menambahkan Environment"}),"\n",(0,t.jsxs)(a.p,{children:["Untuk menambahkan environment di Intellij IDEA Community caranya sama seperti sebeumnya masuk ke menu ",(0,t.jsx)(a.code,{children:"Edit Configuration..."})," dan tambahkan Environment Variable pada bagian Java Options seperti gambah di bawah ini:"]}),"\n",(0,t.jsx)(a.p,{children:(0,t.jsx)(a.img,{alt:"&#39;Idea&#39;",src:i(84782).A+"",width:"1044",height:"688"})}),"\n",(0,t.jsx)(a.h2,{id:"set-profiles",children:"Set Profiles"}),"\n",(0,t.jsxs)(a.p,{children:["Untuk memasukan profiles ketika aplikasi Spring Boot dijalankan kita dapat memasukan nama profiles ke dalam CLI atau menu ",(0,t.jsx)(a.code,{children:"Edit Configuration..."}),", contoh nama profiles ",(0,t.jsx)(a.code,{children:"dev"})," masukan nama profiles dengan perintah di bawah ini:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{children:"mvn spring-boot:run -Dspring-boot.run.profiles=dev\n"})}),"\n",(0,t.jsx)(a.p,{children:"Pada menu Configuration:"}),"\n",(0,t.jsx)(a.p,{children:(0,t.jsx)(a.img,{alt:"&#39;Idea&#39;",src:i(58423).A+"",width:"1044",height:"693"})}),"\n",(0,t.jsx)(a.h2,{id:"kesimpulan",children:"Kesimpulan"}),"\n",(0,t.jsx)(a.p,{children:"Menjalankan Spring Boot di Intellij IDEA Community dapat dilakukan dengan sedikit konfigurasi karena pluginnya memang tidak tersedia di versi community, tapi dengan sedikit konfigurasi sana sini kita bisa menjalankan Spring Boot dengan menggunakan Intellij IDEA Community."})]})}function d(n={}){const{wrapper:a}={...(0,l.R)(),...n.components};return a?(0,t.jsx)(a,{...n,children:(0,t.jsx)(u,{...n})}):u(n)}},87205:(n,a,i)=>{i.d(a,{A:()=>e});const e=i.p+"assets/images/idea1-b2b2b49f082291a2bd0998618aaa20d6.png"},84782:(n,a,i)=>{i.d(a,{A:()=>e});const e=i.p+"assets/images/idea2-62a0021a8a1391aa0f6927ac85e2cc5c.png"},58423:(n,a,i)=>{i.d(a,{A:()=>e});const e=i.p+"assets/images/idea3-fc8ca4304150d0e6a35f0f77d1f0c17a.png"},28453:(n,a,i)=>{i.d(a,{R:()=>o,x:()=>s});var e=i(96540);const t={},l=e.createContext(t);function o(n){const a=e.useContext(l);return e.useMemo((function(){return"function"==typeof n?n(a):{...a,...n}}),[a,n])}function s(n){let a;return a=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:o(n.components),e.createElement(l.Provider,{value:a},n.children)}},31034:n=>{n.exports=JSON.parse('{"permalink":"/blog/tips-springboot-intellijidea-community","source":"@site/blog/2025-02-18-tips-setup-springboot-intellijidea-community.md","title":"Tips Menjalankan Spring Boot di Intellij IDEA Community","description":"Saat ini mungkin bisa dibilang Intellij IDEA adalah IDE powerfull untuk mengembangkan aplikasi di ekosistem Java. Fiturnya yang lengkap dan plugin yang banyank, membuat IDE ini menjadi yang paling powerfull saat ini. IDE yang dikembangkan oleh Jetbrains ini sangat cocok untuk mengembangkan aplikasi berskala besar. Namun untuk mendapatkan fitur lengkapnya kita harus menggunakan Intellij IDEA versi Ultimate termasuk jika kita ingin menggunakan plugin untuk Spring Boot.","date":"2025-02-18T00:00:00.000Z","tags":[{"inline":true,"label":"springboot","permalink":"/blog/tags/springboot"},{"inline":true,"label":"spring","permalink":"/blog/tags/spring"},{"inline":true,"label":"ide","permalink":"/blog/tags/ide"},{"inline":true,"label":"intellijidea","permalink":"/blog/tags/intellijidea"}],"readingTime":1.61,"hasTruncateMarker":true,"authors":[{"name":"Ucup TopekoX","title":"TimposuLabs creator","imageURL":"https://topekox.github.io/assets/images/avatar.jpeg","key":"topekox","page":null}],"frontMatter":{"slug":"tips-springboot-intellijidea-community","title":"Tips Menjalankan Spring Boot di Intellij IDEA Community","authors":"topekox","tags":["springboot","spring","ide","intellijidea"]},"unlisted":false,"prevItem":{"title":"Membuat REST API CRUD Spring Boot sederhana menggunakan Database H2","permalink":"/blog/springboot-rest-api-minimal-h2"},"nextItem":{"title":"Cara Install Eclipse Temurin JDK di Fedora/Redhat/Centos","permalink":"/blog/install-temurin-fedora"}}')}}]);