"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[8920],{3905:(e,n,a)=>{a.d(n,{Zo:()=>u,kt:()=>k});var t=a(7294);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function o(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function i(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?o(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function g(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},o=Object.keys(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)a=o[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=t.createContext({}),p=function(e){var n=t.useContext(l),a=n;return e&&(a="function"==typeof e?e(n):i(i({},n),e)),a},u=function(e){var n=p(e.components);return t.createElement(l.Provider,{value:n},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},c=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,u=g(e,["components","mdxType","originalType","parentName"]),s=p(a),c=r,k=s["".concat(l,".").concat(c)]||s[c]||m[c]||o;return a?t.createElement(k,i(i({ref:n},u),{},{components:a})):t.createElement(k,i({ref:n},u))}));function k(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=c;var g={};for(var l in n)hasOwnProperty.call(n,l)&&(g[l]=n[l]);g.originalType=e,g[s]="string"==typeof e?e:r,i[1]=g;for(var p=2;p<o;p++)i[p]=a[p];return t.createElement.apply(null,i)}return t.createElement.apply(null,a)}c.displayName="MDXCreateElement"},9636:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>g,toc:()=>p});var t=a(7462),r=(a(7294),a(3905));const o={slug:"spring-logging",title:"Cara Mudah Membuat Logging di Spring Boot",authors:"topekox",tags:["spring","springboot","logging"]},i=void 0,g={permalink:"/blog/spring-logging",source:"@site/blog/2022-06-19-springlogging.md",title:"Cara Mudah Membuat Logging di Spring Boot",description:"Logging sangat berguna untuk memberikan informasi jalannya program kepada programmer, atau untuk menganalisa baik masih dalam proses debug developer maupun log ketika sudah dalam production.",date:"2022-06-19T00:00:00.000Z",formattedDate:"June 19, 2022",tags:[{label:"spring",permalink:"/blog/tags/spring"},{label:"springboot",permalink:"/blog/tags/springboot"},{label:"logging",permalink:"/blog/tags/logging"}],readingTime:.73,hasTruncateMarker:!0,authors:[{name:"Ucup TopekoX",title:"Tutorial Timposu creator",url:"https://topekox.github.io",imageURL:"https://topekox.github.io/assets/images/avatar.jpeg",key:"topekox"}],frontMatter:{slug:"spring-logging",title:"Cara Mudah Membuat Logging di Spring Boot",authors:"topekox",tags:["spring","springboot","logging"]},nextItem:{title:"Cara Membuat Project Spring MVC dengan Maven - XML Configuration (Bundle Tomcat)",permalink:"/blog/spring-mvc-maven-xml"}},l={authorsImageUrls:[void 0]},p=[{value:"Menggunakan Logging Slf4j",id:"menggunakan-logging-slf4j",level:2},{value:"Konfigurasi Spring Boot",id:"konfigurasi-spring-boot",level:2}],u={toc:p},s="wrapper";function m(e){let{components:n,...a}=e;return(0,r.kt)(s,(0,t.Z)({},u,a,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Logging sangat berguna untuk memberikan informasi jalannya program kepada programmer, atau untuk menganalisa baik masih dalam proses debug developer maupun log ketika sudah dalam production. "),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://images.unsplash.com/photo-1581090587512-8bfdd1119f94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",alt:"Topekox"})),(0,r.kt)("p",null,"Di Java ada banyak framework untuk logging, namun yang paling gampang menggunakan Sl4j yang sudah dibundle dalam library ",(0,r.kt)("a",{parentName:"p",href:"https://projectlombok.org/"},"Lombok"),"."),(0,r.kt)("h2",{id:"menggunakan-logging-slf4j"},"Menggunakan Logging Slf4j"),(0,r.kt)("p",null,"Secara default aplikasi spring boot bisa langsung menggunakan Slf4j, maka kita tinggal memasukan annotation ",(0,r.kt)("inlineCode",{parentName:"p"},"@Slf4j")," ke dalam class kita, contoh:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"package com.topekox.demojunit;\n\nimport lombok.extern.slf4j.Slf4j;\n\n// inject annotation Slf4j\n@Slf4j\npublic class DemoUtilsTest {\n\n}\n")),(0,r.kt)("p",null,"Untuk menggunakannya tinggal di panggil ",(0,r.kt)("inlineCode",{parentName:"p"},"log"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'log.info("Pesan Info");\nlog.warning("Pesan Warning");\nlog.error("Pesan Error");\n')),(0,r.kt)("h2",{id:"konfigurasi-spring-boot"},"Konfigurasi Spring Boot"),(0,r.kt)("p",null,"Kita juga bisa menambahkan konfigurasi tambahan, contoh kita ingin menyimpan log ke dalam file, update ",(0,r.kt)("inlineCode",{parentName:"p"},"application.properties")," milik spring boot lalu tambahkan baris di bawah ini:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-properties"},"# Menyimpan print out log ke dalam file 'application.log' yang berada di direktori 'log'\nlogging.file.name=log/application.log\n")))}m.isMDXComponent=!0}}]);