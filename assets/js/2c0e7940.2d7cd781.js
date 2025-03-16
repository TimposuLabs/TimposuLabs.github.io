"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[1455],{19818:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>c,contentTitle:()=>d,default:()=>p,frontMatter:()=>s,metadata:()=>r,toc:()=>o});const r=JSON.parse('{"id":"java-lambda/method-reference","title":"Method Reference","description":"Method Reference berfungsi untuk mempersingkat gaya penulisan yang berasal dari isi lambda yang sudah ada.  Method reference hanya mengakses method lain atau mengakses method yang ada di parameter method lambda-nya. Jadi singkatnya method reference menyederhanakan gaya lambda yang sudah ada menjadi lebih sederhana.","source":"@site/tutorial/java/java-lambda/05-method-reference.md","sourceDirName":"java-lambda","slug":"/java-lambda/method-reference","permalink":"/java/java-lambda/method-reference","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5,"title":"Method Reference"},"sidebar":"tutorialSidebar","previous":{"title":"Functional Interface","permalink":"/java/java-lambda/functional-interface"},"next":{"title":"Lambda pada Collection","permalink":"/java/java-lambda/lambda-collection"}}');var t=n(74848),i=n(28453);const s={sidebar_position:5,title:"Method Reference"},d=void 0,c={},o=[{value:"Menggunakan Method Reference Static",id:"menggunakan-method-reference-static",level:2},{value:"Menggunakan Method Reference Non Static",id:"menggunakan-method-reference-non-static",level:2},{value:"1\ufe0f\u20e3 Mengakses method reference menggunakan <code>this</code> untuk object yang sama",id:"1\ufe0f\u20e3-mengakses-method-reference-menggunakan-this-untuk-object-yang-sama",level:3},{value:"2\ufe0f\u20e3 Mengakses method reference untuk object",id:"2\ufe0f\u20e3-mengakses-method-reference-untuk-object",level:3},{value:"Method Reference di Parameter",id:"method-reference-di-parameter",level:2},{value:"Full Code",id:"full-code",level:2}];function l(e){const a={admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.p,{children:"Method Reference berfungsi untuk mempersingkat gaya penulisan yang berasal dari isi lambda yang sudah ada.  Method reference hanya mengakses method lain atau mengakses method yang ada di parameter method lambda-nya. Jadi singkatnya method reference menyederhanakan gaya lambda yang sudah ada menjadi lebih sederhana."}),"\n",(0,t.jsx)(a.p,{children:"Method reference digunakan apabila kita hanya butuh pengembalian value saja atau tidak perlu melakukan kondisi untuk pengembalian value."}),"\n",(0,t.jsx)(a.p,{children:"Perhatikan contoh ekspresi lambda di bawah ini:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:"Predicate<String> predicate = (s) -> s.isBlank();\n"})}),"\n",(0,t.jsxs)(a.p,{children:["Dengan menggunakan method ekspression kode lambda di atas dapat disederhanakan dengan method reference menggunakan karakter ",(0,t.jsx)(a.code,{children:"::"})," contohnya di bawah ini:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:"Predicate<String> predicate = String::isBlank;\n"})}),"\n",(0,t.jsx)(a.h2,{id:"menggunakan-method-reference-static",children:"Menggunakan Method Reference Static"}),"\n",(0,t.jsxs)(a.p,{children:["Disini kita akan mencoba menggunakan object lain sebagai type data dalam method reference pada ekspresi lambda. Disini saya membuat sebuah class String utils sederhana yang akan melakukan pengecekan apakah karakter String lowercase atau tidak dengan menggunakan static method ",(0,t.jsx)(a.code,{children:"isLowerCase"}),", jika semua karakter string lowercase maka akan mengembalikan true jika ada salah satu yang tidak lowercase maka akan mengembalikan false."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:"class StringUtils {\n    static boolean isLowerCase(String value) {\n        for (var c : value.toCharArray()) {\n            if (!Character.isLowerCase(c)) return false;\n        }\n        return true;\n    }\n}\n"})}),"\n",(0,t.jsxs)(a.p,{children:["Kita dapat menggunakan class ",(0,t.jsx)(a.code,{children:"StringUtils"})," di atas dengan menggunakan lambda ekspresi seperti contoh di bawah ini:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:"Predicate<String> predicate1 = (s) -> StringUtils.isLowerCase(s);\n"})}),"\n",(0,t.jsx)(a.p,{children:"Jika menggunakan method reference maka dapat ditulis seperti di bawah ini:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:"Predicate<String> predicate1 = StringUtils::isLowerCase;\n"})}),"\n",(0,t.jsx)(a.admonition,{type:"info",children:(0,t.jsxs)(a.p,{children:["\ud83d\udcdd ",(0,t.jsx)(a.strong,{children:"Catatan"}),": Pada method reference, seperti contoh di atas kita tidak perlu memasukan lagi parameter pada method ",(0,t.jsx)(a.code,{children:"isLowerCase"}),", karena tipe data yang digunakan sudah sama dengan ekspresi ",(0,t.jsx)(a.code,{children:"(s)"})," dengan ",(0,t.jsx)(a.code,{children:"isLowerCase(s)"}),", sehingga tidak perlu didefinisikan lagi pada method reference. Tipe data harus sama antara ",(0,t.jsx)(a.code,{children:"(s)"})," dan dan yang berada pada method rerence ",(0,t.jsx)(a.code,{children:"isLowerCase(s)"}),"."]})}),"\n",(0,t.jsx)(a.p,{children:"Dengan menggunakan method reference maka kode ekspresi lambda menjadi lebih efisien \ud83d\udc4c."}),"\n",(0,t.jsx)(a.h2,{id:"menggunakan-method-reference-non-static",children:"Menggunakan Method Reference Non Static"}),"\n",(0,t.jsxs)(a.p,{children:["Pada method reference non static, kita dapat menggunakan keyword ",(0,t.jsx)(a.code,{children:"this"})," jika method reference berada pada object yang sama, atau membuat object baru jika kita memanggil object yang lain."]}),"\n",(0,t.jsxs)(a.h3,{id:"1\ufe0f\u20e3-mengakses-method-reference-menggunakan-this-untuk-object-yang-sama",children:["1\ufe0f\u20e3 Mengakses method reference menggunakan ",(0,t.jsx)(a.code,{children:"this"})," untuk object yang sama"]}),"\n",(0,t.jsx)(a.p,{children:"Misalnya terdapat method sederhana yang berada pada object yang sama, dengan fungsi method yang akan mengecek apakah karakter String adalah Uppercase:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:"boolean isUpperCase(String value) {\n    for (var c : value.toCharArray()) {\n        if (!Character.isUpperCase(c)) return false;\n    }\n    return true;\n}\n"})}),"\n",(0,t.jsx)(a.p,{children:"Jika menggunakan method reference maka dapat ditulis seperti di bawah ini:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:"// Predicate<String> predicate = (s) -> MethodReferenceApp.this.isUpperCase(s); // tanpa method reference\nPredicate<String> predicate = this::isUpperCase;\n"})}),"\n",(0,t.jsx)(a.p,{children:"Berikut contoh full code mengakses method reference jika berada pada object yang sama."}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:'class MethodReferenceApp {\n\n    void toDo() {\n        // Method Reference mengakses dalam object yang sama\n        // Predicate<String> predicate = (s) -> MethodReferenceApp.this.isUpperCase(s);\n        Predicate<String> predicate = this::isUpperCase;\n\n        System.out.println(predicate.test("ucup"));\n        System.out.println(predicate.test("UCUP"));\n    }   \n\n    boolean isUpperCase(String value) {\n        for (var c : value.toCharArray()) {\n            if (!Character.isUpperCase(c)) return false;\n        }\n        return true;\n    }\n}\n'})}),"\n",(0,t.jsx)(a.h3,{id:"2\ufe0f\u20e3-mengakses-method-reference-untuk-object",children:"2\ufe0f\u20e3 Mengakses method reference untuk object"}),"\n",(0,t.jsxs)(a.p,{children:["Pada contoh sebelumnya kita menggunakan ",(0,t.jsx)(a.code,{children:"this"})," untuk mengakses method reference dalam object yang sama, nah bagaimana jika object berasal dari object lain, caranya cukup mendefinisikan object tersebut lebih dahulu:"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:"MethodReferenceApp app = new MethodReferenceApp(); // membuat object terlebih dahulu\n\n// Predicate<String> predicate2 = (s) -> app.isUpperCase(s);\nPredicate<String> predicate2 = app::isUpperCase;\n"})}),"\n",(0,t.jsx)(a.h2,{id:"method-reference-di-parameter",children:"Method Reference di Parameter"}),"\n",(0,t.jsx)(a.p,{children:"Contoh lain dalam menggunakan method reference, jika kita hanya memanggil method yang ada di parameternya."}),"\n",(0,t.jsx)(a.p,{children:"Contoh:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:"Function<String, String> toUpper = (String s) -> s.toUpperCase();\n"})}),"\n",(0,t.jsx)(a.p,{children:"Atau lebih sederhananya:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:"Function<String, String> toUpper = (s) -> s.toUpperCase();\n"})}),"\n",(0,t.jsxs)(a.p,{children:["Pada ekspresi lambda di atas dapat disederhanakan lagi dengan menggunakan method reference, karena pada parameter ",(0,t.jsx)(a.code,{children:"String s"})," yang mana ",(0,t.jsx)(a.code,{children:"s"})," adalah bertype data ",(0,t.jsx)(a.code,{children:"String"})," yang memiliki method ",(0,t.jsx)(a.code,{children:"toUpperCase()"}),", yang dimana parameternya ",(0,t.jsx)(a.code,{children:"String"})," sama dengan ",(0,t.jsx)(a.code,{children:"s"}),". Sehingga ekspresi lambda jika menggunakan method reference tidak perlu lagi menggunakan ",(0,t.jsx)(a.code,{children:"s"}),":"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:"Function<String, String> toUpper = String::toUpperCase;\n"})}),"\n",(0,t.jsx)(a.h2,{id:"full-code",children:"Full Code"}),"\n",(0,t.jsx)(a.p,{children:"Berikut contoh lengkap full code method reference:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-java",children:'import java.util.function.Function;\nimport java.util.function.Predicate;\n\npublic class DemoLambdaMethodReference {\n    public static void main(String[] args) {\n\n        // Method reference untuk mempersingkat gaya penulisan yang berasal dari isi\n        // lambda yang hanya mengakses method lain atau mengakses method yang ada di parameter\n        // method lambda-nya. Jadi singkatnya method reference menyederhanakan gaya lambda yang sudah ada\n    \t// menjadi lebih sederhana.\n\n        // Method reference digunakan apabila kita hanya butuh pengembalian value saja atau\n        // tidak perlu melakukan kondisi untuk pengembalian value.\n        //\n        // Predicate<String> predicate = (s) -> s.isBlank();\n        Predicate<String> predicate = String::isBlank;\n\n        System.out.println(predicate.test("Budi"));\n\n        // 1. Method reference method static\n        // Predicate<String> predicate1 = (s) -> StringUtils.isLowerCase(s);\n        Predicate<String> predicate1 = StringUtils::isLowerCase;\n\n        System.out.println(predicate1.test("ucup"));\n        System.out.println(predicate1.test("UCUP"));\n\n        // 2. Method reference dalam object yang sama.\n        new MethodReferenceApp().toDo();\n        \n        // 3. Method reference dengan object\n        \n        MethodReferenceApp app = new MethodReferenceApp(); // membuat object terlebih dahulu\n        // Predicate<String> predicate2 = (s) -> app.isUpperCase(s);\n        Predicate<String> predicate2 = app::isUpperCase;\n        \n        System.out.println(predicate2.test("ucup"));\n        System.out.println(predicate2.test("UCUP"));\n        \n        // 4. Method reference di parameter.\n        // Function<String, String> toUpper = (String s) -> s.toUpperCase(); // contoh method reference di parameter (String s)\n        Function<String, String> toUpper = String::toUpperCase;\n        \n        System.out.println(toUpper.apply("yudi"));\n    }\n}\n\nclass StringUtils {\n    static boolean isLowerCase(String value) {\n        for (var c : value.toCharArray()) {\n            if (!Character.isLowerCase(c)) return false;\n        }\n        return true;\n    }\n}\n\nclass MethodReferenceApp {\n\n    void toDo() {\n        // Method Reference mengakses dalam object yang sama\n        // Predicate<String> predicate = (s) -> MethodReferenceApp.this.isUpperCase(s);\n         Predicate<String> predicate = this::isUpperCase;\n\n        System.out.println(predicate.test("ucup"));\n        System.out.println(predicate.test("UCUP"));\n    }\n\n    boolean isUpperCase(String value) {\n        for (var c : value.toCharArray()) {\n            if (!Character.isUpperCase(c)) return false;\n        }\n        return true;\n    }\n}\n'})})]})}function p(e={}){const{wrapper:a}={...(0,i.R)(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},28453:(e,a,n)=>{n.d(a,{R:()=>s,x:()=>d});var r=n(96540);const t={},i=r.createContext(t);function s(e){const a=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function d(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),r.createElement(i.Provider,{value:a},e.children)}}}]);