---
sidebar_position: 4
title: 'Kosep Dasar OOP dalam Java'
---

## 📌 Pengertian OOP
Object-Oriented Programming (OOP) adalah paradigma pemrograman yang berfokus pada **objek** sebagai representasi data dan perilaku (behavior).

Dalam OOP, program dibangun menggunakan konsep:
- Object (objek)
- Class (kelas)
- Method (fungsi dalam class)
- Attribute (data dalam class)

## 🔄 Perbedaan OOP vs Procedural Programming

| OOP | Procedural |
|-----|-----------|
| Berbasis objek | Berbasis fungsi |
| Modular & reusable | Cenderung linear |
| Lebih mudah dikembangkan | Sulit untuk skala besar |
| Menggunakan class & object | Menggunakan prosedur |

## 🧱 Konsep Utama OOP

Konsep utama OOP:
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction

## 🏗️ Class

Class adalah blueprint untuk membuat object.

### Contoh:
```java
class Mobil {
    String merk;
    int tahun;
}
```

## 🧩 Object

Object adalah instance dari class.

### Contoh:
```java
Mobil mobil1 = new Mobil();
```

## ⚙️ Method

Method adalah fungsi di dalam class.

### Contoh:
```java
class Mobil {
    void jalan() {
        System.out.println("Mobil berjalan");
    }
}
```

## 📦 Attribute

Attribute adalah variabel dalam class.

### Contoh:
```java
class Mobil {
    String merk;
    int tahun;
}
```

## 🔧 Contoh Lengkap OOP

```java
class Mobil {
    String merk;
    int tahun;

    void tampilkanInfo() {
        System.out.println("Merk: " + merk);
        System.out.println("Tahun: " + tahun);
    }
}

public class Main {
    public static void main(String[] args) {
        Mobil mobil1 = new Mobil();
        mobil1.merk = "Toyota";
        mobil1.tahun = 2022;

        mobil1.tampilkanInfo();
    }
}
```

📌 Output:
```
Merk: Toyota
Tahun: 2022
```

## 🚀 Keuntungan Menggunakan OOP

- Kode lebih terstruktur
- Mudah dikembangkan (scalable)
- Reusable (bisa digunakan ulang)
- Mudah maintenance
- Representasi dunia nyata lebih jelas

## 🎯 Penutup

OOP adalah konsep fundamental dalam Java yang memungkinkan developer membangun aplikasi yang kompleks dengan struktur yang rapi dan mudah dikembangkan.
