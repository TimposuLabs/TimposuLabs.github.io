"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[3636],{3905:(e,n,a)=>{a.d(n,{Zo:()=>c,kt:()=>d});var t=a(7294);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function i(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function p(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?i(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function o(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},i=Object.keys(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=t.createContext({}),l=function(e){var n=t.useContext(s),a=n;return e&&(a="function"==typeof e?e(n):p(p({},n),e)),a},c=function(e){var n=l(e.components);return t.createElement(s.Provider,{value:n},e.children)},m="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},u=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=l(a),u=r,d=m["".concat(s,".").concat(u)]||m[u]||g[u]||i;return a?t.createElement(d,p(p({ref:n},c),{},{components:a})):t.createElement(d,p({ref:n},c))}));function d(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=a.length,p=new Array(i);p[0]=u;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o[m]="string"==typeof e?e:r,p[1]=o;for(var l=2;l<i;l++)p[l]=a[l];return t.createElement.apply(null,p)}return t.createElement.apply(null,a)}u.displayName="MDXCreateElement"},546:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>s,contentTitle:()=>p,default:()=>g,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var t=a(7462),r=(a(7294),a(3905));const i={slug:"spring-mvc-eclipse",title:"Cara Membuat Project Spring MVC di Eclipse - XML Configuration",authors:"topekox",tags:["spring","spring mvc","eclipse"]},p=void 0,o={permalink:"/blog/spring-mvc-eclipse",source:"@site/blog/2022-05-15-spring-mvc-eclipse/index.md",title:"Cara Membuat Project Spring MVC di Eclipse - XML Configuration",description:"Eclipse adalah salah satu IDE favorit untuk membuat aplikasi Java, baik itu aplikasi standard maupun untuk skala Enterprise salah satunya membuat project Spring MVC. Salah satu kelebihannya karena lebih ringan dibanding IDE saingannya yaitu Intelij IDEA.",date:"2022-05-15T00:00:00.000Z",formattedDate:"May 15, 2022",tags:[{label:"spring",permalink:"/blog/tags/spring"},{label:"spring mvc",permalink:"/blog/tags/spring-mvc"},{label:"eclipse",permalink:"/blog/tags/eclipse"}],readingTime:2.735,hasTruncateMarker:!0,authors:[{name:"Ucup TopekoX",title:"Tutorial Timposu creator",url:"https://topekox.github.io",imageURL:"https://topekox.github.io/assets/images/avatar.jpeg",key:"topekox"}],frontMatter:{slug:"spring-mvc-eclipse",title:"Cara Membuat Project Spring MVC di Eclipse - XML Configuration",authors:"topekox",tags:["spring","spring mvc","eclipse"]},prevItem:{title:"Menggunakan Scheduled/Penjadwalan di Spring Boot",permalink:"/blog/menggunakan-scheduled-spring-boot"},nextItem:{title:"Tutorial Membuat Aplikasi Web Spring Boot dan Angular - READ Only",permalink:"/blog/spring-boot-angular"}},s={authorsImageUrls:[void 0]},l=[{value:"Gunakan Eclipse versi Enterprise Java and Web",id:"gunakan-eclipse-versi-enterprise-java-and-web",level:2},{value:"Buat Project Dynamic Web Project",id:"buat-project-dynamic-web-project",level:2},{value:"Konfigurasi pom.xml",id:"konfigurasi-pomxml",level:3},{value:"Konfigurasi web.xml",id:"konfigurasi-webxml",level:3},{value:"Buat Controller",id:"buat-controller",level:3},{value:"Buat View",id:"buat-view",level:3},{value:"Running",id:"running",level:3}],c={toc:l},m="wrapper";function g(e){let{components:n,...i}=e;return(0,r.kt)(m,(0,t.Z)({},c,i,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Eclipse adalah salah satu IDE favorit untuk membuat aplikasi Java, baik itu aplikasi standard maupun untuk skala Enterprise salah satunya membuat project Spring MVC. Salah satu kelebihannya karena lebih ringan dibanding IDE saingannya yaitu Intelij IDEA."),(0,r.kt)("p",null,"Akan tetapi membuat project Spring MVC mungkin sedikit ribet bagi pemula. Ada beberapa konfigurasi yang diperlukan, berikut tutorial membuat aplikasi Spring MVC di Eclipse."),(0,r.kt)("h2",{id:"gunakan-eclipse-versi-enterprise-java-and-web"},"Gunakan Eclipse versi Enterprise Java and Web"),(0,r.kt)("p",null,"Ketika mendownload Eclipse halaman default pada ",(0,r.kt)("a",{parentName:"p",href:"https://www.eclipse.org/downloads/"},"https://www.eclipse.org/downloads/"),", Eclipse versi ini berisi package untuk Eclipse for Java Developer yang berisi package standard untuk pemrograman Java Standard. Gunakan yang versi Eclipse Enterprise Java and Web di halaman ",(0,r.kt)("a",{parentName:"p",href:"https://www.eclipse.org/downloads/packages/"},"https://www.eclipse.org/downloads/packages/"),". Kenapa menggunakan versi Enterpise Java and Web, karena plugin untuk pemrograman web di Java sudah tersedia dalam package versi Eclipse ini."),(0,r.kt)("h2",{id:"buat-project-dynamic-web-project"},"Buat Project Dynamic Web Project"),(0,r.kt)("p",null,"Buka Eclipse dan buat Project Dynamic Web Project."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Spring MVC Eclipse",src:a(3745).Z,width:"577",height:"230"})),(0,r.kt)("p",null,"Kemudian sesuaikan Project Name:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Spring MVC Eclipse",src:a(747).Z,width:"1364",height:"840"})),(0,r.kt)("p",null,"Struktur direktori Dynamic Web Project di Eclipse:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Spring MVC Eclipse",src:a(3616).Z,width:"312",height:"210"})),(0,r.kt)("p",null,"Selanjutnya kita convert projectnya ke Maven Project. Klik kanan pada project ",(0,r.kt)("em",{parentName:"p"},"Configure > Convert to Maven Project"),"."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Spring MVC Eclipse",src:a(100).Z,width:"618",height:"294"})),(0,r.kt)("p",null,"Struktur direktori akan berubah menjadi struktur direktori maven."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Spring MVC Eclipse",src:a(2344).Z,width:"312",height:"388"})),(0,r.kt)("h3",{id:"konfigurasi-pomxml"},"Konfigurasi pom.xml"),(0,r.kt)("p",null,"Kita masukan dependency Spring MVC stadard, ubah konfigurasi ",(0,r.kt)("inlineCode",{parentName:"p"},"pom.xml")," seperti di bawah ini:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml",metastring:"title=pom.xml",title:"pom.xml"},'<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">\n    <modelVersion>4.0.0</modelVersion>\n    <groupId>com.tutorialtimposu</groupId>\n    <artifactId>DemoSpringMVC</artifactId>\n    <version>0.0.1-SNAPSHOT</version>\n    <packaging>war</packaging>\n    <properties>\n        <spring.version>5.3.18</spring.version>\n    </properties>\n\n    <dependencies>\n        <dependency>\n            <groupId>org.springframework</groupId>\n            <artifactId>spring-context</artifactId>\n            <version>${spring.version}</version>\n        </dependency>\n        <dependency>\n            <groupId>org.springframework</groupId>\n            <artifactId>spring-webmvc</artifactId>\n            <version>${spring.version}</version>\n        </dependency>\n        <dependency>\n            <groupId>org.springframework</groupId>\n            <artifactId>spring-web</artifactId>\n            <version>${spring.version}</version>\n        </dependency>\n        <dependency>\n            <groupId>javax.servlet</groupId>\n            <artifactId>jstl</artifactId>\n            <version>1.2</version>\n        </dependency>\n        <dependency>\n            <groupId>javax.servlet.jsp.jstl</groupId>\n            <artifactId>jstl-api</artifactId>\n            <version>1.2</version>\n        </dependency>\n    </dependencies>\n\n    <build>\n        <plugins>\n            <plugin>\n                <artifactId>maven-compiler-plugin</artifactId>\n                <version>3.8.1</version>\n                <configuration>\n                    <source>17</source>\n                    <target>17</target>\n                </configuration>\n            </plugin>\n            <plugin>\n                <artifactId>maven-war-plugin</artifactId>\n                <version>3.2.3</version>\n            </plugin>\n        </plugins>\n    </build>\n</project>\n')),(0,r.kt)("h3",{id:"konfigurasi-webxml"},"Konfigurasi web.xml"),(0,r.kt)("p",null,"Masukan konfigurasi ",(0,r.kt)("inlineCode",{parentName:"p"},"web.xml")," pada direktor ",(0,r.kt)("inlineCode",{parentName:"p"},"/WEB-INF/web.xml")," seperti di bawah ini:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml",metastring:"title=web.xml",title:"web.xml"},'<?xml version="1.0" encoding="UTF-8"?>\n<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n    xmlns="http://xmlns.jcp.org/xml/ns/javaee"\n    xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"\n    id="WebApp_ID" version="3.1">\n    <display-name>DemoSpringMVC</display-name>\n    \x3c!-- Spring MVC Configs --\x3e\n\n    \x3c!-- Step 1: Configure Spring MVC Dispatcher Servlet --\x3e\n    <servlet>\n        <servlet-name>dispatcher</servlet-name>\n        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>\n        <init-param>\n            <param-name>contextConfigLocation</param-name>\n            <param-value>/WEB-INF/spring-mvc-demo-servlet.xml</param-value>\n        </init-param>\n        <load-on-startup>1</load-on-startup>\n    </servlet>\n\n    \x3c!-- Step 2: Set up URL mapping for Spring MVC Dispatcher Servlet --\x3e\n    <servlet-mapping>\n        <servlet-name>dispatcher</servlet-name>\n        <url-pattern>/</url-pattern>\n    </servlet-mapping>\n</web-app>\n')),(0,r.kt)("p",null,"Dari konfigurasi di atas kita harus membuat konfigurasi context nya di ",(0,r.kt)("inlineCode",{parentName:"p"},"/WEB-INF/spring-mvc-demo-servlet.xml"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml",metastring:"title=spring-mvc-demo-servlet.xml",title:"spring-mvc-demo-servlet.xml"},'<?xml version="1.0" encoding="UTF-8"?>\n<beans xmlns="http://www.springframework.org/schema/beans"\n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n    xmlns:context="http://www.springframework.org/schema/context"\n    xmlns:mvc="http://www.springframework.org/schema/mvc"\n    xsi:schemaLocation="\n        http://www.springframework.org/schema/beans\n        http://www.springframework.org/schema/beans/spring-beans.xsd\n        http://www.springframework.org/schema/context\n        http://www.springframework.org/schema/context/spring-context.xsd\n        http://www.springframework.org/schema/mvc\n        http://www.springframework.org/schema/mvc/spring-mvc.xsd">\n\n    \x3c!-- Step 3: Add support for component scanning --\x3e\n    <context:component-scan\n        base-package="com.topekox.mvc" />\n\n    \x3c!-- Step 4: Add support for conversion, formatting and validation support --\x3e\n    <mvc:annotation-driven />\n\n    \x3c!-- Step 5: Define Spring MVC view resolver --\x3e\n    <bean\n        class="org.springframework.web.servlet.view.InternalResourceViewResolver">\n        <property name="prefix" value="/WEB-INF/view/" />\n        <property name="suffix" value=".jsp" />\n    </bean>\n    \n</beans>\n')),(0,r.kt)("p",null,"Sesuaikan base package component nya disini saya buat ",(0,r.kt)("inlineCode",{parentName:"p"},"com.topekox.mvc")," dan untuk bagian view nya saya buat di ",(0,r.kt)("inlineCode",{parentName:"p"},"/WEB-INF/view/")," dengan ekstensi ",(0,r.kt)("inlineCode",{parentName:"p"},"jsp"),"."),(0,r.kt)("h3",{id:"buat-controller"},"Buat Controller"),(0,r.kt)("p",null,"Selanjutnya kita buat controller, tapi sebelumnya kita buat package ",(0,r.kt)("inlineCode",{parentName:"p"},"com.topekox.mvc"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java",metastring:"title=HomeController.java",title:"HomeController.java"},'package com.topekox.mvc;\n\nimport org.springframework.stereotype.Controller;\nimport org.springframework.ui.Model;\nimport org.springframework.web.bind.annotation.RequestMapping;\n\n@Controller\npublic class HomeController {\n    \n    @RequestMapping(name = "/")\n    public String home(Model model) {\n        \n        model.addAttribute("name", "Ucup");\n        return "home";\n    }\n\n}\n')),(0,r.kt)("h3",{id:"buat-view"},"Buat View"),(0,r.kt)("p",null,"Buat file ",(0,r.kt)("inlineCode",{parentName:"p"},"home.jsp")," di direktori ",(0,r.kt)("inlineCode",{parentName:"p"},"/WEB-INF/view/home.jsp"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html",metastring:"title=home.jsp",title:"home.jsp"},'<%@ page language="java" contentType="text/html; charset=UTF-8"\n    pageEncoding="UTF-8"%>\n<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<title>Demo Spring MVC</title>\n</head>\n<body>\n    <h2>Hello ${name}</h2>\n</body>\n</html>\n')),(0,r.kt)("h3",{id:"running"},"Running"),(0,r.kt)("p",null,"Review struktur direktori:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Spring MVC Eclipse",src:a(5170).Z,width:"311",height:"507"})),(0,r.kt)("p",null,"Running dengan Tomcat klik kanan pada project ",(0,r.kt)("em",{parentName:"p"},"Run As > Run on Server")," kemudian pilih server tomcat server anda kemudian lihat di browser:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Spring MVC Eclipse",src:a(721).Z,width:"737",height:"549"})),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"https://github.com/TutorialTimposu/tutorial-spring-from-blog/tree/main/SpringMVCEclipse"},"Source Code"))))}g.isMDXComponent=!0},3745:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/1-76b3cfa4bebff7c3cd38be6117eddadb.png"},747:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/2-af336d0e2c26af5c934cc9b561e6d080.png"},3616:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/3-4f35ebebb8ed9dcedddf0d404698d7f6.png"},100:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/4-1ba9d86f5544ab391ce22a9ac482919d.png"},2344:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/5-d2f30da6895117179dcdfb9bca42a94f.png"},5170:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/6-2229bb2f7ffe966ddd7e3b31aea0cecd.png"},721:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/7-0babe2c8a9646c052160cc27c5397a55.png"}}]);