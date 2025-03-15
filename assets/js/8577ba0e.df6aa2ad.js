"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[9462],{25597:(a,i,e)=>{e.r(i),e.d(i,{assets:()=>d,contentTitle:()=>o,default:()=>g,frontMatter:()=>u,metadata:()=>n,toc:()=>r});var n=e(19208),t=e(74848),s=e(28453);const u={slug:"custom-domain-github",title:"Cara Custom Domain Github Pages",authors:"topekox",tags:["github","github pages"]},o=void 0,d={authorsImageUrls:[void 0]},r=[{value:"Konfigurasi domain",id:"konfigurasi-domain",level:2},{value:"Konfigurasi Github Pages",id:"konfigurasi-github-pages",level:2},{value:"Lihat Juga",id:"lihat-juga",level:2}];function l(a){const i={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...a.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(i.p,{children:["GitHub Pages adalah layanan hosting situs web statis yang memanfaatkan repositori GitHub. Layanan ini mengambil file HTML, CSS, dan JavaScript dari repositori GitHub, kemudian menerbitkan situs web. GitHub Pages dapat digunakan untuk membuat situs web pribadi, seperti portofolio atau blog. Situs web yang dibuat menggunakan GitHub Pages dapat diakses secara publik di internet. Secara default domain yang digunakan memiliki url path ",(0,t.jsx)(i.code,{children:"<nama-repo>.github.io"}),", tetapi kita dapat menghosting situs web di ",(0,t.jsx)(i.code,{children:"github.io"})," atau di domain kustom Anda sendiri."]}),"\n",(0,t.jsx)(i.h2,{id:"konfigurasi-domain",children:"Konfigurasi domain"}),"\n",(0,t.jsxs)(i.p,{children:["Untuk menyiapkan domain apex, seperti ",(0,t.jsx)(i.code,{children:"example.com"}),", Anda harus mengonfigurasi domain kustom dalam pengaturan repositori github anda dan setidaknya satu ",(0,t.jsx)(i.code,{children:"ALIAS"}),", ",(0,t.jsx)(i.code,{children:"ANAME"}),", atau ",(0,t.jsx)(i.code,{children:"A"})," record dengan konfigurasi DNS anda."]}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["Untuk membuat ",(0,t.jsx)(i.code,{children:"A"})," record, arahkan domain apex ke alamat IP untuk GitHub Pages."]}),"\n"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:"185.199.108.153\r\n185.199.109.153\r\n185.199.110.153\r\n185.199.111.153\n"})}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Masuk ke dalam konfugirasi DNS anda, masukan IP Github Pages di atas ke pengaturan DNS anda. Berikut contoh pengaturan untuk nama host timposulabs.com."}),"\n"]}),"\n",(0,t.jsx)(i.p,{children:(0,t.jsx)(i.img,{alt:"&quot;Konfigurasi DNS&quot;",src:e(11871).A+"",width:"835",height:"645"})}),"\n",(0,t.jsxs)(i.p,{children:["Tunggu beberapa saat, jika cepat tidak sampai 1 jam domain dapat aktif, kalau belum biasanya mununggu sampai 24 jam hingga domain aktif. Untuk mengetahui domain aktif atau belum bisa di cek di ",(0,t.jsx)(i.a,{href:"https://dnschecker.org/",children:"dnschecker.org"}),"."]}),"\n",(0,t.jsx)(i.h2,{id:"konfigurasi-github-pages",children:"Konfigurasi Github Pages"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["Masuk ke dalam menu setting repository Github Pages anda masuk ke ",(0,t.jsx)(i.em,{children:(0,t.jsx)(i.code,{children:"Settings"})})," > ",(0,t.jsx)(i.em,{children:(0,t.jsx)(i.code,{children:"Pages"})})," dan masukan domain pada form ",(0,t.jsx)(i.code,{children:"Custom domain"})," dan Save, centang Enforce HTTPS untuk menghaktifkan HTTPS pada domain kita."]}),"\n"]}),"\n",(0,t.jsx)(i.p,{children:"Jika berhasil, maka akan seperti gambar di bawah ini."}),"\n",(0,t.jsx)(i.p,{children:(0,t.jsx)(i.img,{alt:"&quot;Konfigurasi DNS&quot;",src:e(83253).A+"",width:"1441",height:"870"})}),"\n",(0,t.jsxs)(i.p,{children:["Jangan lupa buat file dengan nama ",(0,t.jsx)(i.code,{children:"CNAME"})," di root direktori static github pages anda dan isi file tersebut dengan nama domain anda, contoh isi file ",(0,t.jsx)(i.code,{children:"CNAME"}),":"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:"timposulabs.com\n"})}),"\n",(0,t.jsx)(i.p,{children:"File ini nantinya di baca oleh github pages sebagai nama domain kita setiap kita melakukan deploy he host github repository."}),"\n",(0,t.jsxs)(i.admonition,{type:"success",children:[(0,t.jsx)(i.p,{children:"Untuk video pengaturan domain dapat dilihat pada:"}),(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.a,{href:"https://www.youtube.com/watch?v=uh0yu7kxijQ",children:"Video tutorial untuk apex domain"})}),"\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.a,{href:"https://www.youtube.com/watch?v=JqwjVIGJQ10",children:"Video tutorial untuk sub domain"})}),"\n"]})]}),"\n",(0,t.jsx)(i.h2,{id:"lihat-juga",children:"Lihat Juga"}),"\n",(0,t.jsx)(i.p,{children:"Jika mengalami kendala dapat merujuk ke dokumentasi resmi Github Pages:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.a,{href:"https://docs.github.com/en/pages/quickstart",children:"https://docs.github.com/en/pages/quickstart"})}),"\n"]})]})}function g(a={}){const{wrapper:i}={...(0,s.R)(),...a.components};return i?(0,t.jsx)(i,{...a,children:(0,t.jsx)(l,{...a})}):l(a)}},83253:(a,i,e)=>{e.d(i,{A:()=>n});const n=e.p+"assets/images/ghpages2-bf6f59659716c3c5b173a074815a7eb0.png"},11871:(a,i,e)=>{e.d(i,{A:()=>n});const n=e.p+"assets/images/github-pages1-04dcfa9a1296d58a7afeb9b9ddf53c0b.png"},28453:(a,i,e)=>{e.d(i,{R:()=>u,x:()=>o});var n=e(96540);const t={},s=n.createContext(t);function u(a){const i=n.useContext(s);return n.useMemo((function(){return"function"==typeof a?a(i):{...i,...a}}),[i,a])}function o(a){let i;return i=a.disableParentContext?"function"==typeof a.components?a.components(t):a.components||t:u(a.components),n.createElement(s.Provider,{value:i},a.children)}},19208:a=>{a.exports=JSON.parse('{"permalink":"/blog/custom-domain-github","source":"@site/blog/2025-02-05-custom-domain-github.md","title":"Cara Custom Domain Github Pages","description":"GitHub Pages adalah layanan hosting situs web statis yang memanfaatkan repositori GitHub. Layanan ini mengambil file HTML, CSS, dan JavaScript dari repositori GitHub, kemudian menerbitkan situs web. GitHub Pages dapat digunakan untuk membuat situs web pribadi, seperti portofolio atau blog. Situs web yang dibuat menggunakan GitHub Pages dapat diakses secara publik di internet. Secara default domain yang digunakan memiliki url path .github.io, tetapi kita dapat menghosting situs web di github.io atau di domain kustom Anda sendiri.","date":"2025-02-05T00:00:00.000Z","tags":[{"inline":true,"label":"github","permalink":"/blog/tags/github"},{"inline":true,"label":"github pages","permalink":"/blog/tags/github-pages"}],"readingTime":1.6,"hasTruncateMarker":true,"authors":[{"name":"Ucup TopekoX","title":"TimposuLabs creator","imageURL":"https://topekox.github.io/assets/images/avatar.jpeg","key":"topekox","page":null}],"frontMatter":{"slug":"custom-domain-github","title":"Cara Custom Domain Github Pages","authors":"topekox","tags":["github","github pages"]},"unlisted":false,"prevItem":{"title":"Install Aplikasi Spring Boot menjadi Service di Linux","permalink":"/blog/install-springboot-linux-service"},"nextItem":{"title":"Cara melihat log service pada Linux","permalink":"/blog/melihat-log-service-linux"}}')}}]);