"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[7949],{6233:(n,a,e)=>{e.r(a),e.d(a,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>g,metadata:()=>i,toc:()=>s});var i=e(2047),o=e(4848),t=e(8453);const g={slug:"spring-logging",title:"Cara Mudah Membuat Logging di Spring Boot",authors:"topekox",tags:["spring","springboot","log"]},r=void 0,l={authorsImageUrls:[void 0]},s=[{value:"Menggunakan Logging Slf4j",id:"menggunakan-logging-slf4j",level:2},{value:"Konfigurasi Spring Boot",id:"konfigurasi-spring-boot",level:2}];function p(n){const a={a:"a",code:"code",h2:"h2",img:"img",p:"p",pre:"pre",...(0,t.R)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a.p,{children:"Logging sangat berguna untuk memberikan informasi jalannya program kepada programmer, atau untuk menganalisa baik masih dalam proses debug developer maupun log ketika sudah dalam production."}),"\n",(0,o.jsx)(a.p,{children:(0,o.jsx)(a.img,{src:"https://images.unsplash.com/photo-1581090587512-8bfdd1119f94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",alt:"Topekox"})}),"\n",(0,o.jsxs)(a.p,{children:["Di Java ada banyak framework untuk logging, namun yang paling gampang menggunakan Sl4j yang sudah dibundle dalam library ",(0,o.jsx)(a.a,{href:"https://projectlombok.org/",children:"Lombok"}),"."]}),"\n",(0,o.jsx)(a.h2,{id:"menggunakan-logging-slf4j",children:"Menggunakan Logging Slf4j"}),"\n",(0,o.jsxs)(a.p,{children:["Secara default aplikasi spring boot bisa langsung menggunakan Slf4j, maka kita tinggal memasukan annotation ",(0,o.jsx)(a.code,{children:"@Slf4j"})," ke dalam class kita, contoh:"]}),"\n",(0,o.jsx)(a.pre,{children:(0,o.jsx)(a.code,{className:"language-java",children:"package com.topekox.demojunit;\n\nimport lombok.extern.slf4j.Slf4j;\n\n// inject annotation Slf4j\n@Slf4j\npublic class DemoUtilsTest {\n\n}\n"})}),"\n",(0,o.jsxs)(a.p,{children:["Untuk menggunakannya tinggal di panggil ",(0,o.jsx)(a.code,{children:"log"}),"."]}),"\n",(0,o.jsx)(a.pre,{children:(0,o.jsx)(a.code,{className:"language-java",children:'log.info("Pesan Info");\nlog.warning("Pesan Warning");\nlog.error("Pesan Error");\n'})}),"\n",(0,o.jsx)(a.h2,{id:"konfigurasi-spring-boot",children:"Konfigurasi Spring Boot"}),"\n",(0,o.jsxs)(a.p,{children:["Kita juga bisa menambahkan konfigurasi tambahan, contoh kita ingin menyimpan log ke dalam file, update ",(0,o.jsx)(a.code,{children:"application.properties"})," milik spring boot lalu tambahkan baris di bawah ini:"]}),"\n",(0,o.jsx)(a.pre,{children:(0,o.jsx)(a.code,{className:"language-properties",children:"# Menyimpan print out log ke dalam file 'application.log' yang berada di direktori 'log'\nlogging.file.name=log/application.log\n"})})]})}function u(n={}){const{wrapper:a}={...(0,t.R)(),...n.components};return a?(0,o.jsx)(a,{...n,children:(0,o.jsx)(p,{...n})}):p(n)}},8453:(n,a,e)=>{e.d(a,{R:()=>g,x:()=>r});var i=e(6540);const o={},t=i.createContext(o);function g(n){const a=i.useContext(t);return i.useMemo((function(){return"function"==typeof n?n(a):{...a,...n}}),[a,n])}function r(n){let a;return a=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:g(n.components),i.createElement(t.Provider,{value:a},n.children)}},2047:n=>{n.exports=JSON.parse('{"permalink":"/blog/spring-logging","source":"@site/blog/2022-06-19-springlogging.md","title":"Cara Mudah Membuat Logging di Spring Boot","description":"Logging sangat berguna untuk memberikan informasi jalannya program kepada programmer, atau untuk menganalisa baik masih dalam proses debug developer maupun log ketika sudah dalam production.","date":"2022-06-19T00:00:00.000Z","tags":[{"inline":true,"label":"spring","permalink":"/blog/tags/spring"},{"inline":true,"label":"springboot","permalink":"/blog/tags/springboot"},{"inline":true,"label":"log","permalink":"/blog/tags/log"}],"readingTime":0.73,"hasTruncateMarker":true,"authors":[{"name":"Ucup TopekoX","title":"TimposuLabs creator","imageURL":"https://topekox.github.io/assets/images/avatar.jpeg","key":"topekox","page":null}],"frontMatter":{"slug":"spring-logging","title":"Cara Mudah Membuat Logging di Spring Boot","authors":"topekox","tags":["spring","springboot","log"]},"unlisted":false,"prevItem":{"title":"Membuat User PostgreSQL","permalink":"/blog/membuat-user-postgresql"},"nextItem":{"title":"Cara Membuat Project Spring MVC dengan Maven - XML Configuration - Bundle Tomcat","permalink":"/blog/spring-mvc-maven-xml"}}')}}]);