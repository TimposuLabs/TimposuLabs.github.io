"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[8601],{92346:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>d,default:()=>p,frontMatter:()=>r,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"maven/maven-dependency","title":"Maven Dependency","description":"Proyek  aplikasi jarang sekali berdiri sendiri, biasanya membutuhkan dukungan dari pihak lain, seperti tool atau library. Tanpa build tool seperti Apache Maven, untuk menambahkan library dari luar, kita harus melakukannya secara manual. Apache Maven mendukung dependency management, dimana kita tidak perlu me-manage secara manual proses penambahkan dependency (tool atau library) ke dalam proyek aplikasi kita.","source":"@site/tutorial/java/maven/07-maven-dependency.md","sourceDirName":"maven","slug":"/maven/maven-dependency","permalink":"/java/maven/maven-dependency","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"sidebar_position":7,"title":"Maven Dependency"},"sidebar":"tutorialSidebar","previous":{"title":"Maven Build Project","permalink":"/java/maven/maven-build-project"},"next":{"title":"Maven Properties","permalink":"/java/maven/maven-properties"}}');var i=a(74848),s=a(28453);const r={sidebar_position:7,title:"Maven Dependency"},d=void 0,l={},c=[{value:"Memasang Dependency",id:"memasang-dependency",level:2},{value:"Uji Coba",id:"uji-coba",level:2}];function o(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"Proyek  aplikasi jarang sekali berdiri sendiri, biasanya membutuhkan dukungan dari pihak lain, seperti tool atau library. Tanpa build tool seperti Apache Maven, untuk menambahkan library dari luar, kita harus melakukannya secara manual. Apache Maven mendukung dependency management, dimana kita tidak perlu me-manage secara manual proses penambahkan dependency (tool atau library) ke dalam proyek aplikasi kita."}),"\n",(0,i.jsx)(n.p,{children:"Saat kita menambahkan dependency ke project Maven, kita harus menentukan scope dependency tersebut, ada banyak scope yang ada di Maven, namun sebenarnya hanya beberapa saja yang sering kita gunakan, seperti:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"compile"}),", ini adalah  scope default. Compile artinya dependency tersebut akan digunakan untuk build project, test project dan menjalankan project."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"test"}),", ini adalah scope untuk test project, hanya akan di include di bagian test project"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Contoh dalam ",(0,i.jsx)(n.code,{children:"pom.xml"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-xml",children:"<dependencies>\n\n    <dependency>\n        <groupId>org.junit.jupiter</groupId>\n        <artifactId>junit-jupiter-api</artifactId>\n        <scope>test</scope>\n    </dependency>\n\n</dependencies>\n"})}),"\n",(0,i.jsx)(n.h2,{id:"memasang-dependency",children:"Memasang Dependency"}),"\n",(0,i.jsx)(n.p,{children:"Untuk mencari dependency di maven bisa mengunjungi:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://search.maven.org/",children:"https://search.maven.org/"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://mvnrepository.com/",children:"https://mvnrepository.com/"})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Contoh misalkan kita memasang dependecy Gson, ke dalam ",(0,i.jsx)(n.code,{children:"pom.xml"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-xml",children:"<dependency>\n    <groupId>com.google.code.gson</groupId>\n    <artifactId>gson</artifactId>\n    <version>2.12.1</version>\n</dependency>\n"})}),"\n",(0,i.jsx)(n.p,{children:"Jika menggunakan IDE biasanya akan langsung mendownload dependency tersebut. Jika dilakukan secara manual bisa menggunakan perintah:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"mvn install\n"})}),"\n",(0,i.jsx)(n.h2,{id:"uji-coba",children:"Uji Coba"}),"\n",(0,i.jsx)(n.p,{children:"Melakukan ujicoba dependency Gson yang sudah terpasang."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Membuat Model"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:"public class Person {\n\n\tprivate String firstName;\n\tprivate String lastName;\n\t\n\tpublic Person() {\n\t}\n\t\n\tpublic Person(String firstName, String lastName) {\n\t\tthis.firstName = firstName;\n\t\tthis.lastName = lastName;\n\t}\n\n\tpublic String getFirstName() {\n\t\treturn firstName;\n\t}\n\n\tpublic void setFirstName(String firstName) {\n\t\tthis.firstName = firstName;\n\t}\n\n\tpublic String getLastName() {\n\t\treturn lastName;\n\t}\n\n\tpublic void setLastName(String lastName) {\n\t\tthis.lastName = lastName;\n\t}\n\t\n}\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Class Main"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:'import com.google.gson.Gson;\n\npublic class App {\n    public static void main(String[] args) {\n        Gson gson = new Gson();\n        \n        Person ariel = new Person("Ariel", "Peterpan");\n        String toJson = gson.toJson(ariel);\n        \n        System.out.println(toJson);\n    }\n}\n'})}),"\n",(0,i.jsx)(n.p,{children:"Output:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'{"firstName":"Ariel","lastName":"Peterpan"}\n'})}),"\n",(0,i.jsx)(n.p,{children:"Jika sukses maka akan menampilkan output seperti di atas."})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},28453:(e,n,a)=>{a.d(n,{R:()=>r,x:()=>d});var t=a(96540);const i={},s=t.createContext(i);function r(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);