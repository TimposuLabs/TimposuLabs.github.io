"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[9257],{78357:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>r,toc:()=>c});var r=t(40584),a=t(74848),i=t(28453);const s={slug:"spring-mvc-eclipse",title:"Cara Membuat Project Spring MVC di Eclipse - XML Configuration",authors:"topekox",tags:["spring","spring mvc","eclipse"]},o=void 0,p={authorsImageUrls:[void 0]},c=[{value:"Gunakan Eclipse versi Enterprise Java and Web",id:"gunakan-eclipse-versi-enterprise-java-and-web",level:2},{value:"Buat Project Dynamic Web Project",id:"buat-project-dynamic-web-project",level:2},{value:"Konfigurasi pom.xml",id:"konfigurasi-pomxml",level:3},{value:"Konfigurasi web.xml",id:"konfigurasi-webxml",level:3},{value:"Buat Controller",id:"buat-controller",level:3},{value:"Buat View",id:"buat-view",level:3},{value:"Running",id:"running",level:3}];function l(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"Eclipse adalah salah satu IDE favorit untuk membuat aplikasi Java, baik itu aplikasi standard maupun untuk skala Enterprise salah satunya membuat project Spring MVC. Salah satu kelebihannya karena lebih ringan dibanding IDE saingannya yaitu Intelij IDEA."}),"\n",(0,a.jsx)(n.p,{children:"Akan tetapi membuat project Spring MVC mungkin sedikit ribet bagi pemula. Ada beberapa konfigurasi yang diperlukan, berikut tutorial membuat aplikasi Spring MVC di Eclipse."}),"\n",(0,a.jsx)(n.h2,{id:"gunakan-eclipse-versi-enterprise-java-and-web",children:"Gunakan Eclipse versi Enterprise Java and Web"}),"\n",(0,a.jsxs)(n.p,{children:["Ketika mendownload Eclipse halaman default pada ",(0,a.jsx)(n.a,{href:"https://www.eclipse.org/downloads/",children:"https://www.eclipse.org/downloads/"}),", Eclipse versi ini berisi package untuk Eclipse for Java Developer yang berisi package standard untuk pemrograman Java Standard. Gunakan yang versi Eclipse Enterprise Java and Web di halaman ",(0,a.jsx)(n.a,{href:"https://www.eclipse.org/downloads/packages/",children:"https://www.eclipse.org/downloads/packages/"}),". Kenapa menggunakan versi Enterpise Java and Web, karena plugin untuk pemrograman web di Java sudah tersedia dalam package versi Eclipse ini."]}),"\n",(0,a.jsx)(n.h2,{id:"buat-project-dynamic-web-project",children:"Buat Project Dynamic Web Project"}),"\n",(0,a.jsx)(n.p,{children:"Buka Eclipse dan buat Project Dynamic Web Project."}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Spring MVC Eclipse",src:t(20273).A+"",width:"577",height:"230"})}),"\n",(0,a.jsx)(n.p,{children:"Kemudian sesuaikan Project Name:"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Spring MVC Eclipse",src:t(99162).A+"",width:"1364",height:"840"})}),"\n",(0,a.jsx)(n.p,{children:"Struktur direktori Dynamic Web Project di Eclipse:"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Spring MVC Eclipse",src:t(63267).A+"",width:"312",height:"210"})}),"\n",(0,a.jsxs)(n.p,{children:["Selanjutnya kita convert projectnya ke Maven Project. Klik kanan pada project ",(0,a.jsx)(n.em,{children:"Configure > Convert to Maven Project"}),"."]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Spring MVC Eclipse",src:t(87020).A+"",width:"618",height:"294"})}),"\n",(0,a.jsx)(n.p,{children:"Struktur direktori akan berubah menjadi struktur direktori maven."}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Spring MVC Eclipse",src:t(22933).A+"",width:"312",height:"388"})}),"\n",(0,a.jsx)(n.h3,{id:"konfigurasi-pomxml",children:"Konfigurasi pom.xml"}),"\n",(0,a.jsxs)(n.p,{children:["Kita masukan dependency Spring MVC stadard, ubah konfigurasi ",(0,a.jsx)(n.code,{children:"pom.xml"})," seperti di bawah ini:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-xml",metastring:"title=pom.xml",children:'<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">\r\n\t<modelVersion>4.0.0</modelVersion>\r\n\t<groupId>com.tutorialtimposu</groupId>\r\n\t<artifactId>DemoSpringMVC</artifactId>\r\n\t<version>0.0.1-SNAPSHOT</version>\r\n\t<packaging>war</packaging>\r\n\t<properties>\r\n\t\t<spring.version>5.3.18</spring.version>\r\n\t</properties>\r\n\r\n\t<dependencies>\r\n\t\t<dependency>\r\n\t\t\t<groupId>org.springframework</groupId>\r\n\t\t\t<artifactId>spring-context</artifactId>\r\n\t\t\t<version>${spring.version}</version>\r\n\t\t</dependency>\r\n\t\t<dependency>\r\n\t\t\t<groupId>org.springframework</groupId>\r\n\t\t\t<artifactId>spring-webmvc</artifactId>\r\n\t\t\t<version>${spring.version}</version>\r\n\t\t</dependency>\r\n\t\t<dependency>\r\n\t\t\t<groupId>org.springframework</groupId>\r\n\t\t\t<artifactId>spring-web</artifactId>\r\n\t\t\t<version>${spring.version}</version>\r\n\t\t</dependency>\r\n\t\t<dependency>\r\n\t\t\t<groupId>javax.servlet</groupId>\r\n\t\t\t<artifactId>jstl</artifactId>\r\n\t\t\t<version>1.2</version>\r\n\t\t</dependency>\r\n\t\t<dependency>\r\n\t\t\t<groupId>javax.servlet.jsp.jstl</groupId>\r\n\t\t\t<artifactId>jstl-api</artifactId>\r\n\t\t\t<version>1.2</version>\r\n\t\t</dependency>\r\n\t</dependencies>\r\n\r\n\t<build>\r\n\t\t<plugins>\r\n\t\t\t<plugin>\r\n\t\t\t\t<artifactId>maven-compiler-plugin</artifactId>\r\n\t\t\t\t<version>3.8.1</version>\r\n\t\t\t\t<configuration>\r\n\t\t\t\t\t<source>17</source>\r\n\t\t\t\t\t<target>17</target>\r\n\t\t\t\t</configuration>\r\n\t\t\t</plugin>\r\n\t\t\t<plugin>\r\n\t\t\t\t<artifactId>maven-war-plugin</artifactId>\r\n\t\t\t\t<version>3.2.3</version>\r\n\t\t\t</plugin>\r\n\t\t</plugins>\r\n\t</build>\r\n</project>\n'})}),"\n",(0,a.jsx)(n.h3,{id:"konfigurasi-webxml",children:"Konfigurasi web.xml"}),"\n",(0,a.jsxs)(n.p,{children:["Masukan konfigurasi ",(0,a.jsx)(n.code,{children:"web.xml"})," pada direktor ",(0,a.jsx)(n.code,{children:"/WEB-INF/web.xml"})," seperti di bawah ini:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-xml",metastring:"title=web.xml",children:'<?xml version="1.0" encoding="UTF-8"?>\r\n<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\r\n\txmlns="http://xmlns.jcp.org/xml/ns/javaee"\r\n\txsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"\r\n\tid="WebApp_ID" version="3.1">\r\n\t<display-name>DemoSpringMVC</display-name>\r\n\t\x3c!-- Spring MVC Configs --\x3e\r\n\r\n\t\x3c!-- Step 1: Configure Spring MVC Dispatcher Servlet --\x3e\r\n\t<servlet>\r\n\t\t<servlet-name>dispatcher</servlet-name>\r\n\t\t<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>\r\n\t\t<init-param>\r\n\t\t\t<param-name>contextConfigLocation</param-name>\r\n\t\t\t<param-value>/WEB-INF/spring-mvc-demo-servlet.xml</param-value>\r\n\t\t</init-param>\r\n\t\t<load-on-startup>1</load-on-startup>\r\n\t</servlet>\r\n\r\n\t\x3c!-- Step 2: Set up URL mapping for Spring MVC Dispatcher Servlet --\x3e\r\n\t<servlet-mapping>\r\n\t\t<servlet-name>dispatcher</servlet-name>\r\n\t\t<url-pattern>/</url-pattern>\r\n\t</servlet-mapping>\r\n</web-app>\n'})}),"\n",(0,a.jsxs)(n.p,{children:["Dari konfigurasi di atas kita harus membuat konfigurasi context nya di ",(0,a.jsx)(n.code,{children:"/WEB-INF/spring-mvc-demo-servlet.xml"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-xml",metastring:"title=spring-mvc-demo-servlet.xml",children:'<?xml version="1.0" encoding="UTF-8"?>\r\n<beans xmlns="http://www.springframework.org/schema/beans"\r\n\txmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\r\n\txmlns:context="http://www.springframework.org/schema/context"\r\n\txmlns:mvc="http://www.springframework.org/schema/mvc"\r\n\txsi:schemaLocation="\r\n\t\thttp://www.springframework.org/schema/beans\r\n    \thttp://www.springframework.org/schema/beans/spring-beans.xsd\r\n    \thttp://www.springframework.org/schema/context\r\n    \thttp://www.springframework.org/schema/context/spring-context.xsd\r\n    \thttp://www.springframework.org/schema/mvc\r\n        http://www.springframework.org/schema/mvc/spring-mvc.xsd">\r\n\r\n\t\x3c!-- Step 3: Add support for component scanning --\x3e\r\n\t<context:component-scan\r\n\t\tbase-package="com.topekox.mvc" />\r\n\r\n\t\x3c!-- Step 4: Add support for conversion, formatting and validation support --\x3e\r\n\t<mvc:annotation-driven />\r\n\r\n\t\x3c!-- Step 5: Define Spring MVC view resolver --\x3e\r\n\t<bean\r\n\t\tclass="org.springframework.web.servlet.view.InternalResourceViewResolver">\r\n\t\t<property name="prefix" value="/WEB-INF/view/" />\r\n\t\t<property name="suffix" value=".jsp" />\r\n\t</bean>\r\n\t\r\n</beans>\n'})}),"\n",(0,a.jsxs)(n.p,{children:["Sesuaikan base package component nya disini saya buat ",(0,a.jsx)(n.code,{children:"com.topekox.mvc"})," dan untuk bagian view nya saya buat di ",(0,a.jsx)(n.code,{children:"/WEB-INF/view/"})," dengan ekstensi ",(0,a.jsx)(n.code,{children:"jsp"}),"."]}),"\n",(0,a.jsx)(n.h3,{id:"buat-controller",children:"Buat Controller"}),"\n",(0,a.jsxs)(n.p,{children:["Selanjutnya kita buat controller, tapi sebelumnya kita buat package ",(0,a.jsx)(n.code,{children:"com.topekox.mvc"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",metastring:"title=HomeController.java",children:'package com.topekox.mvc;\r\n\r\nimport org.springframework.stereotype.Controller;\r\nimport org.springframework.ui.Model;\r\nimport org.springframework.web.bind.annotation.RequestMapping;\r\n\r\n@Controller\r\npublic class HomeController {\r\n\t\r\n\t@RequestMapping(name = "/")\r\n\tpublic String home(Model model) {\r\n\t\t\r\n\t\tmodel.addAttribute("name", "Ucup");\r\n\t\treturn "home";\r\n\t}\r\n\r\n}\n'})}),"\n",(0,a.jsx)(n.h3,{id:"buat-view",children:"Buat View"}),"\n",(0,a.jsxs)(n.p,{children:["Buat file ",(0,a.jsx)(n.code,{children:"home.jsp"})," di direktori ",(0,a.jsx)(n.code,{children:"/WEB-INF/view/home.jsp"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-html",metastring:"title=home.jsp",children:'<%@ page language="java" contentType="text/html; charset=UTF-8"\r\n    pageEncoding="UTF-8"%>\r\n<!DOCTYPE html>\r\n<html>\r\n<head>\r\n<meta charset="UTF-8">\r\n<title>Demo Spring MVC</title>\r\n</head>\r\n<body>\r\n\t<h2>Hello ${name}</h2>\r\n</body>\r\n</html>\n'})}),"\n",(0,a.jsx)(n.h3,{id:"running",children:"Running"}),"\n",(0,a.jsx)(n.p,{children:"Review struktur direktori:"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Spring MVC Eclipse",src:t(37182).A+"",width:"311",height:"507"})}),"\n",(0,a.jsxs)(n.p,{children:["Running dengan Tomcat klik kanan pada project ",(0,a.jsx)(n.em,{children:"Run As > Run on Server"})," kemudian pilih server tomcat server anda kemudian lihat di browser:"]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Spring MVC Eclipse",src:t(89671).A+"",width:"737",height:"549"})}),"\n",(0,a.jsx)(n.admonition,{type:"info",children:(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://github.com/TutorialTimposu/tutorial-spring-from-blog/tree/main/SpringMVCEclipse",children:"Source Code"})})})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},20273:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/1-76b3cfa4bebff7c3cd38be6117eddadb.png"},99162:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/2-af336d0e2c26af5c934cc9b561e6d080.png"},63267:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/3-4f35ebebb8ed9dcedddf0d404698d7f6.png"},87020:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/4-1ba9d86f5544ab391ce22a9ac482919d.png"},22933:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/5-d2f30da6895117179dcdfb9bca42a94f.png"},37182:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/6-2229bb2f7ffe966ddd7e3b31aea0cecd.png"},89671:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/7-0babe2c8a9646c052160cc27c5397a55.png"},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>o});var r=t(96540);const a={},i=r.createContext(a);function s(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),r.createElement(i.Provider,{value:n},e.children)}},40584:e=>{e.exports=JSON.parse('{"permalink":"/blog/spring-mvc-eclipse","source":"@site/blog/2022-05-15-spring-mvc-eclipse/index.md","title":"Cara Membuat Project Spring MVC di Eclipse - XML Configuration","description":"Eclipse adalah salah satu IDE favorit untuk membuat aplikasi Java, baik itu aplikasi standard maupun untuk skala Enterprise salah satunya membuat project Spring MVC. Salah satu kelebihannya karena lebih ringan dibanding IDE saingannya yaitu Intelij IDEA.","date":"2022-05-15T00:00:00.000Z","tags":[{"inline":true,"label":"spring","permalink":"/blog/tags/spring"},{"inline":true,"label":"spring mvc","permalink":"/blog/tags/spring-mvc"},{"inline":true,"label":"eclipse","permalink":"/blog/tags/eclipse"}],"readingTime":2.735,"hasTruncateMarker":true,"authors":[{"name":"Ucup TopekoX","title":"TimposuLabs creator","imageURL":"https://topekox.github.io/assets/images/avatar.jpeg","key":"topekox","page":null}],"frontMatter":{"slug":"spring-mvc-eclipse","title":"Cara Membuat Project Spring MVC di Eclipse - XML Configuration","authors":"topekox","tags":["spring","spring mvc","eclipse"]},"unlisted":false,"prevItem":{"title":"Menggunakan Scheduled/Penjadwalan di Spring Boot","permalink":"/blog/menggunakan-scheduled-spring-boot"},"nextItem":{"title":"Tutorial Membuat Aplikasi Web Spring Boot dan Angular - READ Only","permalink":"/blog/spring-boot-angular"}}')}}]);