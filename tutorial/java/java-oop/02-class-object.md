---
sidebar_position: 5
title: 'Class & Object'
---

## 📌 Definisi Class
Class adalah blueprint atau template untuk membuat object. Class berisi:
- Attribute (data)
- Method (perilaku)

## 🏗️ Struktur Class di Java

```java
class NamaClass {
    // attribute
    String nama;

    // constructor
    NamaClass() {}

    // method
    void tampil() {
        System.out.println("Hello");
    }
}
```

## 🧩 Membuat Object dari Class

Object adalah instance dari class.

```java
NamaClass obj = new NamaClass();
```

## ⚙️ Constructor

Constructor adalah method khusus yang dipanggil saat object dibuat.

### 🔹 Default Constructor

Constructor tanpa parameter.

```java
class Mobil {
    String merk;

    Mobil() {
        merk = "Default";
    }
}
```

### 🔹 Parameterized Constructor

Constructor dengan parameter.

```java
class Mobil {
    String merk;

    Mobil(String merk) {
        this.merk = merk;
    }
}
```

## 🔑 Keyword `this`

`this` digunakan untuk mereferensikan object saat ini.

```java
class Mobil {
    String merk;

    Mobil(String merk) {
        this.merk = merk;
    }
}
```

## 🔧 Contoh Implementasi Sederhana

```java
class Mobil {
    String merk;
    int tahun;

    // constructor
    Mobil(String merk, int tahun) {
        this.merk = merk;
        this.tahun = tahun;
    }

    void tampilkanInfo() {
        System.out.println("Merk: " + merk);
        System.out.println("Tahun: " + tahun);
    }
}

public class Main {
    public static void main(String[] args) {
        Mobil mobil1 = new Mobil("Toyota", 2022);
        mobil1.tampilkanInfo();
    }
}
```

📌 Output:
```
Merk: Toyota
Tahun: 2022
```

## 🎯 Penutup

Class dan Object adalah fondasi utama dalam OOP Java. Dengan memahami keduanya, kamu bisa membangun program yang modular, reusable, dan terstruktur.

