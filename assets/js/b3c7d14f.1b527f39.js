"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[7619],{8302:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>p,frontMatter:()=>s,metadata:()=>i,toc:()=>o});var i=a(2648),r=a(4848),t=a(8453);const s={slug:"install-temurin-fedora",title:"Cara Install Eclipse Temurin JDK di Fedora/Redhat/Centos",authors:"topekox",tags:["java","jdk","linux","fedora","redhat"]},l=void 0,d={authorsImageUrls:[void 0]},o=[{value:"Install Temurin",id:"install-temurin",level:2},{value:"Setting update alternatives java",id:"setting-update-alternatives-java",level:2},{value:"Referensi",id:"referensi",level:2}];function u(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:["Secara default pada mayoritas distro linux sudah menyertakan paket Openjdk pada repository mereka, termasuk Redhat dan turunannya. Tetapi kita dapat menginstall versi distribusi JDK lain termasuk distribusi ",(0,r.jsx)(n.a,{href:"https://adoptium.net/temurin",children:"Eclipse Temurin JDK"})," (Temurin). Temurin sendiri dulunya bernama AdoptOpenJDK/Adoptium, yang saat ini berada di bawah project Eclipse Temurin."]}),"\n",(0,r.jsx)(n.h2,{id:"install-temurin",children:"Install Temurin"}),"\n",(0,r.jsxs)(n.p,{children:["Tambahkan RPM Repo ke dalam ",(0,r.jsx)(n.code,{children:"/etc/yum.repos.d/adoptium.repo"}),". Pastikan kita mengganti nama distribution yang digunakan pada parameter ",(0,r.jsx)(n.code,{children:"baseurl"}),", contoh disini saya menggunakan fedora, untuk format nama distro lain dapat di lihat ",(0,r.jsx)(n.a,{href:"https://packages.adoptium.net/ui/native/rpm/",children:"di sini"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"[Adoptium]\r\nname=Adoptium\r\nbaseurl=https://packages.adoptium.net/artifactory/rpm/fedora/$releasever/$basearch\r\nenabled=1\r\ngpgcheck=1\r\ngpgkey=https://packages.adoptium.net/artifactory/api/gpg/key/public\n"})}),"\n",(0,r.jsx)(n.p,{children:"Install Temurin JDK 21"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"sudo dnf install temurin-21-jdk -y\n"})}),"\n",(0,r.jsx)(n.h2,{id:"setting-update-alternatives-java",children:"Setting update alternatives java"}),"\n",(0,r.jsxs)(n.p,{children:["Karena sebelumnya sudah terinstall Openjdk, kita dapat mengganti versi JDK yang akan digunakan dengan peintah ",(0,r.jsx)(n.code,{children:"alternatives --config"}),"."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Mengubah versi ",(0,r.jsx)(n.code,{children:"java"})," yang akan digunakan."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"$ sudo alternatives --config java\r\n\r\nThere are 2 programs which provide 'java'.\r\n\r\n  Selection    Command\r\n-----------------------------------------------\r\n*+ 1           java-21-openjdk.x86_64 (/usr/lib/jvm/java-21-openjdk-21.0.6.0.7-1.fc41.x86_64/bin/java)\r\n   2           /usr/lib/jvm/temurin-21-jdk/bin/java\r\n\r\nEnter to keep the current selection[+], or type selection number: 2\n"})}),"\n",(0,r.jsx)(n.p,{children:"Di atas saya memilih no 2 untuk menggunakan java versi temurin."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Kita juga bisa mengganti versi ",(0,r.jsx)(n.code,{children:"javac"}),":"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"$ sudo alternatives --config javac\r\n\r\nThere are 2 programs which provide 'javac'.\r\n\r\n  Selection    Command\r\n-----------------------------------------------\r\n*+ 1           java-21-openjdk.x86_64 (/usr/lib/jvm/java-21-openjdk-21.0.6.0.7-1.fc41.x86_64/bin/javac)\r\n   2           /usr/lib/jvm/temurin-21-jdk/bin/javac\r\n\r\nEnter to keep the current selection[+], or type selection number: 2\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Cek versi ",(0,r.jsx)(n.code,{children:"java"}),":"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'$ java -version\r\n\r\nopenjdk version "21.0.6" 2025-01-21 LTS\r\nOpenJDK Runtime Environment Temurin-21.0.6+7 (build 21.0.6+7-LTS)\r\nOpenJDK 64-Bit Server VM Temurin-21.0.6+7 (build 21.0.6+7-LTS, mixed mode, sharing)\n'})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Cek versi ",(0,r.jsx)(n.code,{children:"javac"}),":"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"$ javac -version\r\n\r\njavac 21.0.6\n"})}),"\n",(0,r.jsx)(n.h2,{id:"referensi",children:"Referensi"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://adoptium.net/installation/linux/",children:"https://adoptium.net/installation/linux/"})}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},8453:(e,n,a)=>{a.d(n,{R:()=>s,x:()=>l});var i=a(6540);const r={},t=i.createContext(r);function s(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(t.Provider,{value:n},e.children)}},2648:e=>{e.exports=JSON.parse('{"permalink":"/blog/install-temurin-fedora","source":"@site/blog/2025-02-07-install-temurin-jdk-fedora.md","title":"Cara Install Eclipse Temurin JDK di Fedora/Redhat/Centos","description":"Secara default pada mayoritas distro linux sudah menyertakan paket Openjdk pada repository mereka, termasuk Redhat dan turunannya. Tetapi kita dapat menginstall versi distribusi JDK lain termasuk distribusi Eclipse Temurin JDK (Temurin). Temurin sendiri dulunya bernama AdoptOpenJDK/Adoptium, yang saat ini berada di bawah project Eclipse Temurin.","date":"2025-02-07T00:00:00.000Z","tags":[{"inline":true,"label":"java","permalink":"/blog/tags/java"},{"inline":true,"label":"jdk","permalink":"/blog/tags/jdk"},{"inline":true,"label":"linux","permalink":"/blog/tags/linux"},{"inline":true,"label":"fedora","permalink":"/blog/tags/fedora"},{"inline":true,"label":"redhat","permalink":"/blog/tags/redhat"}],"readingTime":1.295,"hasTruncateMarker":true,"authors":[{"name":"Ucup TopekoX","title":"TimposuLabs creator","imageURL":"https://topekox.github.io/assets/images/avatar.jpeg","key":"topekox","page":null}],"frontMatter":{"slug":"install-temurin-fedora","title":"Cara Install Eclipse Temurin JDK di Fedora/Redhat/Centos","authors":"topekox","tags":["java","jdk","linux","fedora","redhat"]},"unlisted":false,"prevItem":{"title":"Tips Menjalankan Spring Boot di Intellij IDEA Community","permalink":"/blog/tips-springboot-intellijidea-community"},"nextItem":{"title":"Install Aplikasi Spring Boot menjadi Service di Linux","permalink":"/blog/install-springboot-linux-service"}}')}}]);