---
sidebar_position: 5
title: 'Cara Install Java'
---

Untuk mengembangkan aplikasi Java, setidaknya kita membutuhkan compiler dan runtime Java. Seperti yang sudah diterangkan pada [artikel sebelumnya](/java/java-dasar/jdk-jre-jvm), kita membutuhkan dua paket aplikasi yaitu :

* JDK (Java Development Kit), paket aplikasi untuk melakukan kompilasi source kode Java menjadi binary/bytecode Java.
* JRE (Java Runtime Environment), paket aplikasi untuk menjalankan file binary/bytecode Java yang telah dicompile Java.

Tapi kita cukup menginstall JDK saja, karena di dalam paket JDK sudah terdapat JRE. Jadi, kita cukup mendownload JDK saja, untuk menginstall Java.

Untuk mengistall JDK sebenarnya ada beberapa cara, bisa dengan cara instalasi manual dan instalasi melalui repositori. Pada tutorial ini kita akan menggunakan cara manual.

## Download OpenJDK

Pada seri tutorial ini distribusi JDK yang digunakan adalah OpenJDK karena OpenJDK adalah salah satu compiler dan runtime Java yang Free dan Opensoure, sehingga bebas untuk digunakan. OpenJDK dapat didownload di [https://jdk.java.net/](https://jdk.java.net/).

:::info
Apabila teman-teman ingin menggunakan distribusi JDK lain misalnya [OracleJDK](https://www.oracle.com/java/technologies/downloads/), kalian tetap bisa mengikuti seri tutorial ini dan proses installasi JDK-nya hampir sama, jadi silahkan menyesuaikan. 
:::

![Download OpenJDK](/img/java/install-jdk-1.png "Download OpenJDK")

Pada tutorial ini versi JDK yang digunakan adalah versi JDK 17. Download JDK sesuai sistem operasi kalian.

![Download OpenJDK](/img/java/install-jdk-2.png "Download OpenJDK")

JDK tersedia di sistem operasi Linux, Windows dan MacOS dan format filenya adalah archive (zip/tar.gz) jadi tinggal didownload dan diekstrak ke direktori / folder yang diinginkan. Isi direktori JDK setelah diekstrak kurang lebih seperti gambar di bawah ini (isi direktori setiap sistem operasi mungkin ada perbedaan, di bawah ini isi direktori JDK pada Linux).

![Direktori JDK](/img/java/isi-jdk.png "Direktori JDK")

## Setting Path

Agar lokasi JDK bisa diketahui sistem operasi, kita perlu mendaftarkan lokasi direktori/folder `bin` yang ada di dalam direktori/folder JDK ke variable Path sistem operasi. Cara ini diperlukan agar kita bisa mengakses JDK dan JRE dari mana saja menggunakan command prompt / terminal.

### Setting Path di Windows

Untuk setting path, bisa dilakukan di pengaturan Environment Variables Windows, pada menu Search Windows Start ketik `Environment` lalu pilih `Edit the system environmet variables`. 

![Environment Variables](/img/general/environment-windows.jpg "Environment Variables")

Selanjunya akan muncul window system properties, lanjut pilih Environment Variables.

![Environment Variables](/img/general/environment-windows2.jpg "Environment Variables")

Kemudian pada bagian System variables edit variable yang bernama **Path** lalu klik edit untuk mengubahnya.

![Environment Variables](/img/general/environment-windows3.jpg "Environment Variables")

Klik **New** untuk menambah variable baru.

![Environment Variables](/img/general/environment-windows4.jpg "Environment Variables")

Tambahkan lokasi folder OpenJDK yang sudah diekstrak, contoh lokasi ada di `C:\Program Files\Java\jdk-17\bin`, lalu klik **OK**. 

![Environment Variables](/img/java/environment-windows-path.jpg "Environment Variables")

Selanjutnya kita akan mencoba JDK dan JRE apakah sudah terinstal dengan baik dan benar di Windosws. Buka command prompt dengan cara ketik `cmd` pada menu start windows dan masukan perintah `java -version` dan `javac -version`.

Perintah `java -version` untuk melakukan pengecekan terhadap versi JRE yang ada. Jika versi Java keluar seperti gambar dibawah ini, maka JRE berhasil terinstall.

![Java Version Windows](/img/java/java-version-win.jpg "Java Version Windows")

Perintah `javac -version` untuk melakukan pengecekan terhadap versi Java Compiler yang ada. Jika versi `javac` keluar seperti gambar dibawah ini, maka JDK berhasil terinstall.

![Javac Version Windows](/img/java/javac-version-win.jpg "Javac Version Windows")

Jika berhasil, kita sudah sudah siap membuat program Java di Windows.

### Setting Path di Linux

Untuk setting path di Linux, kita perlu menambahkan kode dibawah ini ke dalam file `.bashrc` atau `.profile` atau `.zshrc` yang ada pada directory home system anda. Misalnya lokasi direktori JDK berada di `/opt/jdk-17.0.2/`.

1. Pindah ke home directory anda:

```
cd $HOME
```

2. Buka file `.bashrc` atau `.profile` atau `.zshrc`.

3. Tambahkan baris dibawah ini, ganti direktori JDK dengan lokasi direktori instalasi Java anda.

```
export JAVA_HOME=/opt/jdk-17.0.2
export PATH=$JAVA_HOME/bin:$PATH
```

Selanjutnya kita akan mencoba JDK dan JRE apakah sudah terinstal dengan baik dan benar di Linux. Sebaiknya lakukan restart komputer anda dan buka terminal console dan masukan perintah `java -version` dan `javac -version`.

Perintah `java -version` untuk melakukan pengecekan terhadap versi JRE yang ada. Jika versi Java keluar seperti gambar dibawah ini, maka JRE berhasil terinstall.

![Linux Java](/img/java/linux-java.png "Linux Java Terminal")

Perintah `javac -version` untuk melakukan pengecekan terhadap versi Java Compiler yang ada. Jika versi `javac` keluar seperti gambar dibawah ini, maka JDK berhasil terinstall.

![Linux Javac](/img/java/linux-javac.png "Linux Javac Terminal")

Jika berhasil, kita sudah sudah siap membuat program Java di Linux.

### Setting Path di MacOS

Untuk setting path di MacOS hampir sama dengan di Linux, pertama kita simpan direktori jdk yang sudah di ekstrak ketempat yang kita inginkan, misalnya disimpan di `/Library/Java/JavaVirtualMachines/`, lalu kita perlu menambahkan kode dibawah ini ke dalam file `.bashrc` atau `.profile` atau `.zshrc`. 

```bash
export PATH="/Library/Java/JavaVirtualMachines/jdk-17.0.2.jdk/Contents/Home/bin:$PATH"
```

Selanjutnya kita akan mencoba JDK dan JRE apakah sudah terinstal dengan baik dan benar di MacOS. Buka terminal console dan masukan perintah `java -version` dan `javac -version`.

Perintah `java -version` untuk melakukan pengecekan terhadap versi JRE yang ada. Jika versi Java keluar seperti gambar dibawah ini, maka JRE berhasil terinstall.

![Mac Java](/img/java/mac-java.png "Mac Java Terminal")

Perintah `javac -version` untuk melakukan pengecekan terhadap versi Java Compiler yang ada. Jika versi `javac` keluar seperti gambar dibawah ini, maka JDK berhasil terinstall.

![Mac Javac](/img/java/mac-javac.png "Mac Javac Terminal")

Jika berhasil, kita sudah sudah siap membuat program Java di MacOS.
