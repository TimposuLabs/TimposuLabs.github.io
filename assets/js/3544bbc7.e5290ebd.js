"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[6717],{20857:(a,e,i)=>{i.r(e),i.d(e,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>d,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"java-dasar/cara-install-java","title":"Cara Install Java","description":"Untuk mengembangkan aplikasi Java, setidaknya kita membutuhkan compiler dan runtime Java. Seperti yang sudah diterangkan pada artikel sebelumnya, kita membutuhkan dua paket aplikasi yaitu :","source":"@site/tutorial/java/java-dasar/03-cara-install-java.md","sourceDirName":"java-dasar","slug":"/java-dasar/cara-install-java","permalink":"/java/java-dasar/cara-install-java","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5,"title":"Cara Install Java"},"sidebar":"tutorialSidebar","previous":{"title":"JDK, JRE dan JVM","permalink":"/java/java-dasar/jdk-jre-jvm"},"next":{"title":"Program Hello World","permalink":"/java/java-dasar/program-hello-world"}}');var s=i(74848),t=i(28453);const d={sidebar_position:5,title:"Cara Install Java"},r=void 0,l={},c=[{value:"Download OpenJDK",id:"download-openjdk",level:2},{value:"Setting Path",id:"setting-path",level:2},{value:"Setting Path di Windows",id:"setting-path-di-windows",level:3},{value:"Setting Path di Linux",id:"setting-path-di-linux",level:3},{value:"Setting Path di MacOS",id:"setting-path-di-macos",level:3}];function o(a){const e={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...a.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(e.p,{children:["Untuk mengembangkan aplikasi Java, setidaknya kita membutuhkan compiler dan runtime Java. Seperti yang sudah diterangkan pada ",(0,s.jsx)(e.a,{href:"/java/java-dasar/jdk-jre-jvm",children:"artikel sebelumnya"}),", kita membutuhkan dua paket aplikasi yaitu :"]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"JDK (Java Development Kit), paket aplikasi untuk melakukan kompilasi source kode Java menjadi binary/bytecode Java."}),"\n",(0,s.jsx)(e.li,{children:"JRE (Java Runtime Environment), paket aplikasi untuk menjalankan file binary/bytecode Java yang telah dicompile Java."}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"Tapi kita cukup menginstall JDK saja, karena di dalam paket JDK sudah terdapat JRE. Jadi, kita cukup mendownload JDK saja, untuk menginstall Java."}),"\n",(0,s.jsx)(e.p,{children:"Untuk mengistall JDK sebenarnya ada beberapa cara, bisa dengan cara instalasi manual dan instalasi melalui repositori. Pada tutorial ini kita akan menggunakan cara manual."}),"\n",(0,s.jsx)(e.h2,{id:"download-openjdk",children:"Download OpenJDK"}),"\n",(0,s.jsxs)(e.p,{children:["Pada seri tutorial ini distribusi JDK yang digunakan adalah OpenJDK karena OpenJDK adalah salah satu compiler dan runtime Java yang Free dan Opensoure, sehingga bebas untuk digunakan. OpenJDK dapat didownload di ",(0,s.jsx)(e.a,{href:"https://jdk.java.net/",children:"https://jdk.java.net/"}),"."]}),"\n",(0,s.jsx)(e.admonition,{type:"info",children:(0,s.jsxs)(e.p,{children:["Apabila teman-teman ingin menggunakan distribusi JDK lain misalnya ",(0,s.jsx)(e.a,{href:"https://www.oracle.com/java/technologies/downloads/",children:"OracleJDK"}),", kalian tetap bisa mengikuti seri tutorial ini dan proses installasi JDK-nya hampir sama, jadi silahkan menyesuaikan."]})}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Download OpenJDK",src:i(72869).A+"",title:"Download OpenJDK",width:"772",height:"634"})}),"\n",(0,s.jsx)(e.p,{children:"Pada tutorial ini versi JDK yang digunakan adalah versi JDK 17. Download JDK sesuai sistem operasi kalian."}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Download OpenJDK",src:i(45038).A+"",title:"Download OpenJDK",width:"576",height:"394"})}),"\n",(0,s.jsx)(e.p,{children:"JDK tersedia di sistem operasi Linux, Windows dan MacOS dan format filenya adalah archive (zip/tar.gz) jadi tinggal didownload dan diekstrak ke direktori / folder yang diinginkan. Isi direktori JDK setelah diekstrak kurang lebih seperti gambar di bawah ini (isi direktori setiap sistem operasi mungkin ada perbedaan, di bawah ini isi direktori JDK pada Linux)."}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Direktori JDK",src:i(8283).A+"",title:"Direktori JDK",width:"1003",height:"668"})}),"\n",(0,s.jsx)(e.h2,{id:"setting-path",children:"Setting Path"}),"\n",(0,s.jsxs)(e.p,{children:["Agar lokasi JDK bisa diketahui sistem operasi, kita perlu mendaftarkan lokasi direktori/folder ",(0,s.jsx)(e.code,{children:"bin"})," yang ada di dalam direktori/folder JDK ke variable Path sistem operasi. Cara ini diperlukan agar kita bisa mengakses JDK dan JRE dari mana saja menggunakan command prompt / terminal."]}),"\n",(0,s.jsx)(e.h3,{id:"setting-path-di-windows",children:"Setting Path di Windows"}),"\n",(0,s.jsxs)(e.p,{children:["Untuk setting path, bisa dilakukan di pengaturan Environment Variables Windows, pada menu Search Windows Start ketik ",(0,s.jsx)(e.code,{children:"Environment"})," lalu pilih ",(0,s.jsx)(e.code,{children:"Edit the system environmet variables"}),"."]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Environment Variables",src:i(2571).A+"",title:"Environment Variables",width:"844",height:"698"})}),"\n",(0,s.jsx)(e.p,{children:"Selanjunya akan muncul window system properties, lanjut pilih Environment Variables."}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Environment Variables",src:i(85121).A+"",title:"Environment Variables",width:"412",height:"468"})}),"\n",(0,s.jsxs)(e.p,{children:["Kemudian pada bagian System variables edit variable yang bernama ",(0,s.jsx)(e.strong,{children:"Path"})," lalu klik edit untuk mengubahnya."]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Environment Variables",src:i(7076).A+"",title:"Environment Variables",width:"618",height:"585"})}),"\n",(0,s.jsxs)(e.p,{children:["Klik ",(0,s.jsx)(e.strong,{children:"New"})," untuk menambah variable baru."]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Environment Variables",src:i(15663).A+"",title:"Environment Variables",width:"527",height:"501"})}),"\n",(0,s.jsxs)(e.p,{children:["Tambahkan lokasi folder OpenJDK yang sudah diekstrak, contoh lokasi ada di ",(0,s.jsx)(e.code,{children:"C:\\Program Files\\Java\\jdk-17\\bin"}),", lalu klik ",(0,s.jsx)(e.strong,{children:"OK"}),"."]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Environment Variables",src:i(75643).A+"",title:"Environment Variables",width:"527",height:"501"})}),"\n",(0,s.jsxs)(e.p,{children:["Selanjutnya kita akan mencoba JDK dan JRE apakah sudah terinstal dengan baik dan benar di Windosws. Buka command prompt dengan cara ketik ",(0,s.jsx)(e.code,{children:"cmd"})," pada menu start windows dan masukan perintah ",(0,s.jsx)(e.code,{children:"java -version"})," dan ",(0,s.jsx)(e.code,{children:"javac -version"}),"."]}),"\n",(0,s.jsxs)(e.p,{children:["Perintah ",(0,s.jsx)(e.code,{children:"java -version"})," untuk melakukan pengecekan terhadap versi JRE yang ada. Jika versi Java keluar seperti gambar dibawah ini, maka JRE berhasil terinstall."]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Java Version Windows",src:i(39416).A+"",title:"Java Version Windows",width:"654",height:"344"})}),"\n",(0,s.jsxs)(e.p,{children:["Perintah ",(0,s.jsx)(e.code,{children:"javac -version"})," untuk melakukan pengecekan terhadap versi Java Compiler yang ada. Jika versi ",(0,s.jsx)(e.code,{children:"javac"})," keluar seperti gambar dibawah ini, maka JDK berhasil terinstall."]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Javac Version Windows",src:i(74421).A+"",title:"Javac Version Windows",width:"654",height:"344"})}),"\n",(0,s.jsx)(e.p,{children:"Jika berhasil, kita sudah sudah siap membuat program Java di Windows."}),"\n",(0,s.jsx)(e.h3,{id:"setting-path-di-linux",children:"Setting Path di Linux"}),"\n",(0,s.jsxs)(e.p,{children:["Untuk setting path di Linux, kita perlu menambahkan kode dibawah ini ke dalam file ",(0,s.jsx)(e.code,{children:".bashrc"})," atau ",(0,s.jsx)(e.code,{children:".profile"})," atau ",(0,s.jsx)(e.code,{children:".zshrc"})," yang ada pada directory home system anda. Misalnya lokasi direktori JDK berada di ",(0,s.jsx)(e.code,{children:"/opt/jdk-17.0.2/"}),"."]}),"\n",(0,s.jsxs)(e.ol,{children:["\n",(0,s.jsx)(e.li,{children:"Pindah ke home directory anda:"}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{children:"cd $HOME\n"})}),"\n",(0,s.jsxs)(e.ol,{start:"2",children:["\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:["Buka file ",(0,s.jsx)(e.code,{children:".bashrc"})," atau ",(0,s.jsx)(e.code,{children:".profile"})," atau ",(0,s.jsx)(e.code,{children:".zshrc"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"Tambahkan baris dibawah ini, ganti direktori JDK dengan lokasi direktori instalasi Java anda."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{children:"export JAVA_HOME=/opt/jdk-17.0.2\r\nexport PATH=$JAVA_HOME/bin:$PATH\n"})}),"\n",(0,s.jsxs)(e.p,{children:["Selanjutnya kita akan mencoba JDK dan JRE apakah sudah terinstal dengan baik dan benar di Linux. Sebaiknya lakukan restart komputer anda dan buka terminal console dan masukan perintah ",(0,s.jsx)(e.code,{children:"java -version"})," dan ",(0,s.jsx)(e.code,{children:"javac -version"}),"."]}),"\n",(0,s.jsxs)(e.p,{children:["Perintah ",(0,s.jsx)(e.code,{children:"java -version"})," untuk melakukan pengecekan terhadap versi JRE yang ada. Jika versi Java keluar seperti gambar dibawah ini, maka JRE berhasil terinstall."]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Linux Java",src:i(52909).A+"",title:"Linux Java Terminal",width:"653",height:"323"})}),"\n",(0,s.jsxs)(e.p,{children:["Perintah ",(0,s.jsx)(e.code,{children:"javac -version"})," untuk melakukan pengecekan terhadap versi Java Compiler yang ada. Jika versi ",(0,s.jsx)(e.code,{children:"javac"})," keluar seperti gambar dibawah ini, maka JDK berhasil terinstall."]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Linux Javac",src:i(72306).A+"",title:"Linux Javac Terminal",width:"653",height:"323"})}),"\n",(0,s.jsx)(e.p,{children:"Jika berhasil, kita sudah sudah siap membuat program Java di Linux."}),"\n",(0,s.jsx)(e.h3,{id:"setting-path-di-macos",children:"Setting Path di MacOS"}),"\n",(0,s.jsxs)(e.p,{children:["Untuk setting path di MacOS hampir sama dengan di Linux, pertama kita simpan direktori jdk yang sudah di ekstrak ketempat yang kita inginkan, misalnya disimpan di ",(0,s.jsx)(e.code,{children:"/Library/Java/JavaVirtualMachines/"}),", lalu kita perlu menambahkan kode dibawah ini ke dalam file ",(0,s.jsx)(e.code,{children:".bashrc"})," atau ",(0,s.jsx)(e.code,{children:".profile"})," atau ",(0,s.jsx)(e.code,{children:".zshrc"}),"."]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:'export PATH="/Library/Java/JavaVirtualMachines/jdk-17.0.2.jdk/Contents/Home/bin:$PATH"\n'})}),"\n",(0,s.jsxs)(e.p,{children:["Selanjutnya kita akan mencoba JDK dan JRE apakah sudah terinstal dengan baik dan benar di MacOS. Buka terminal console dan masukan perintah ",(0,s.jsx)(e.code,{children:"java -version"})," dan ",(0,s.jsx)(e.code,{children:"javac -version"}),"."]}),"\n",(0,s.jsxs)(e.p,{children:["Perintah ",(0,s.jsx)(e.code,{children:"java -version"})," untuk melakukan pengecekan terhadap versi JRE yang ada. Jika versi Java keluar seperti gambar dibawah ini, maka JRE berhasil terinstall."]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Mac Java",src:i(96192).A+"",title:"Mac Java Terminal",width:"738",height:"429"})}),"\n",(0,s.jsxs)(e.p,{children:["Perintah ",(0,s.jsx)(e.code,{children:"javac -version"})," untuk melakukan pengecekan terhadap versi Java Compiler yang ada. Jika versi ",(0,s.jsx)(e.code,{children:"javac"})," keluar seperti gambar dibawah ini, maka JDK berhasil terinstall."]}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Mac Javac",src:i(83753).A+"",title:"Mac Javac Terminal",width:"738",height:"429"})}),"\n",(0,s.jsx)(e.p,{children:"Jika berhasil, kita sudah sudah siap membuat program Java di MacOS."})]})}function h(a={}){const{wrapper:e}={...(0,t.R)(),...a.components};return e?(0,s.jsx)(e,{...a,children:(0,s.jsx)(o,{...a})}):o(a)}},2571:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/environment-windows-3ae17576b7ae142f0174e9e676e9ea12.jpg"},85121:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/environment-windows2-2e50d51b79a95c250424b166bd22e13a.jpg"},7076:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/environment-windows3-5aaadb22f7dbfef6eb55374d568dd1a5.jpg"},15663:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/environment-windows4-5432ead3028a5bdd798582f8c43b5980.jpg"},75643:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/environment-windows-path-6cdcc72f2bfba77396d775c6d6560402.jpg"},72869:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/install-jdk-1-48f6a69164933c65889c5575e48d0cc7.png"},45038:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/install-jdk-2-10d68f1953f7e784ffb976cfb3fb9a0b.png"},8283:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/isi-jdk-f2daed95d1453c131c5f0c806ccb7dc3.png"},39416:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/java-version-win-a69a8f81d97fba546972f60db7031a65.jpg"},74421:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/javac-version-win-40c556a4a96d4e50154ab4ddd8fcb19e.jpg"},52909:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/linux-java-6a34ba419c60bee7da8d62f8fbaa680b.png"},72306:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/linux-javac-2509a6e8eedefa066e89ecb1fa0393a5.png"},96192:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/mac-java-ea254e953efcf282e1e7df315f3e6ef8.png"},83753:(a,e,i)=>{i.d(e,{A:()=>n});const n=i.p+"assets/images/mac-javac-ca1d5a2a0c0a9c1e93990ad363882ae5.png"},28453:(a,e,i)=>{i.d(e,{R:()=>d,x:()=>r});var n=i(96540);const s={},t=n.createContext(s);function d(a){const e=n.useContext(t);return n.useMemo((function(){return"function"==typeof a?a(e):{...e,...a}}),[e,a])}function r(a){let e;return e=a.disableParentContext?"function"==typeof a.components?a.components(s):a.components||s:d(a.components),n.createElement(t.Provider,{value:e},a.children)}}}]);