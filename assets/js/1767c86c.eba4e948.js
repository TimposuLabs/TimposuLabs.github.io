"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[1322],{8368:(n,a,e)=>{e.r(a),e.d(a,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>t,toc:()=>d});var t=e(6957),i=e(4848),r=e(8453);const s={slug:"menggunakan-scheduled-spring-boot",title:"Menggunakan Scheduled/Penjadwalan di Spring Boot",authors:"topekox",tags:["spring","springboot"]},o=void 0,l={authorsImageUrls:[void 0]},d=[];function p(n){const a={code:"code",img:"img",p:"p",pre:"pre",...(0,r.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.p,{children:"Dalam satu kasus biasanya kita ingin menjalankan scheduled atau penjadwalan dalam aplikasi kita. Misalnya kita ingin dalam interval waktu tertentu. Contohnya seperti aplikasi SMS Gateway yang akan mengecek dalam interval waktu tertentu akan memeriksa SMS masuk atau SMS keluar."}),"\n",(0,i.jsx)(a.p,{children:(0,i.jsx)(a.img,{src:"https://images.unsplash.com/photo-1435527173128-983b87201f4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80",alt:"Topekox"})}),"\n",(0,i.jsxs)(a.p,{children:["Di Spring Boot, terdapat Annotation ",(0,i.jsx)(a.code,{children:"@Scheduled"})," yang bisa digunakan untuk Scheduled."]}),"\n",(0,i.jsxs)(a.p,{children:["Contoh penggunaan annotation pada method yang ingin diberikan scheduled setiap 5 detik akan dieksekusi menggunakan ",(0,i.jsx)(a.code,{children:"@Scheduled"})," di Spring Boot."]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-java",children:"@Scheduled(fixedDelay = 5000)\r\nprivate void sendingProcess() {\r\n\r\n    // TODO...\r\n\r\n}\n"})}),"\n",(0,i.jsxs)(a.p,{children:["Tapi jangan lupa untuk mengaktifkannya dengan annotation ",(0,i.jsx)(a.code,{children:"@EnableScheduling"})," di class main."]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-java",children:"@SpringBootApplication\r\n@EnableScheduling // Enabled it\r\npublic class PaymentAppBackendApplication {\r\n\r\n\tpublic static void main(String[] args) {\r\n\t\tSpringApplication.run(PaymentAppBackendApplication.class, args);\r\n\t}\r\n}\n"})})]})}function u(n={}){const{wrapper:a}={...(0,r.R)(),...n.components};return a?(0,i.jsx)(a,{...n,children:(0,i.jsx)(p,{...n})}):p(n)}},8453:(n,a,e)=>{e.d(a,{R:()=>s,x:()=>o});var t=e(6540);const i={},r=t.createContext(i);function s(n){const a=t.useContext(r);return t.useMemo((function(){return"function"==typeof n?n(a):{...a,...n}}),[a,n])}function o(n){let a;return a=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:s(n.components),t.createElement(r.Provider,{value:a},n.children)}},6957:n=>{n.exports=JSON.parse('{"permalink":"/blog/menggunakan-scheduled-spring-boot","source":"@site/blog/2022-06-10-spring-boot-scheduled.md","title":"Menggunakan Scheduled/Penjadwalan di Spring Boot","description":"Dalam satu kasus biasanya kita ingin menjalankan scheduled atau penjadwalan dalam aplikasi kita. Misalnya kita ingin dalam interval waktu tertentu. Contohnya seperti aplikasi SMS Gateway yang akan mengecek dalam interval waktu tertentu akan memeriksa SMS masuk atau SMS keluar.","date":"2022-06-10T00:00:00.000Z","tags":[{"inline":true,"label":"spring","permalink":"/blog/tags/spring"},{"inline":true,"label":"springboot","permalink":"/blog/tags/springboot"}],"readingTime":0.575,"hasTruncateMarker":true,"authors":[{"name":"Ucup TopekoX","title":"TimposuLabs creator","imageURL":"https://topekox.github.io/assets/images/avatar.jpeg","key":"topekox","page":null}],"frontMatter":{"slug":"menggunakan-scheduled-spring-boot","title":"Menggunakan Scheduled/Penjadwalan di Spring Boot","authors":"topekox","tags":["spring","springboot"]},"unlisted":false,"prevItem":{"title":"Membuat Service Android - Background & Foreground","permalink":"/blog/service-android"},"nextItem":{"title":"Cara Membuat Project Spring MVC di Eclipse - XML Configuration","permalink":"/blog/spring-mvc-eclipse"}}')}}]);