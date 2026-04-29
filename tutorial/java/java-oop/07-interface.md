---
sidebar_position: 10
title: 'Interface'
---

## 📌 Definisi Interface
Interface adalah blueprint dalam Java yang digunakan untuk mendefinisikan **kontrak (contract)** yang harus diimplementasikan oleh class.

Interface berisi:
- Method abstract (secara default)
- Konstanta (public static final)

Tujuan:
- Mendukung abstraction
- Mendukung multiple inheritance
- Membuat kode lebih fleksibel

## 🔑 Keyword `implements`

Keyword `implements` digunakan untuk mengimplementasikan interface pada class.

### Contoh:
```java
interface Kendaraan {
    void jalan();
}

class Mobil implements Kendaraan {
    public void jalan() {
        System.out.println("Mobil berjalan");
    }
}

public class Main {
    public static void main(String[] args) {
        Mobil m = new Mobil();
        m.jalan();
    }
}
```

📌 Output:
```
Mobil berjalan
```

## 🔁 Multiple Inheritance dengan Interface

Java tidak mendukung multiple inheritance pada class, tetapi mendukung melalui interface.

### Contoh:
```java
interface A {
    void methodA();
}

interface B {
    void methodB();
}

class C implements A, B {
    public void methodA() {
        System.out.println("Method A");
    }

    public void methodB() {
        System.out.println("Method B");
    }
}

public class Main {
    public static void main(String[] args) {
        C obj = new C();
        obj.methodA();
        obj.methodB();
    }
}
```

📌 Output:
```
Method A
Method B
```

## ⚙️ Default Method dan Static Method

Sejak Java 8, interface dapat memiliki method dengan implementasi.

### 🔹 Default Method

```java
interface Kendaraan {
    default void info() {
        System.out.println("Ini kendaraan");
    }
}

class Mobil implements Kendaraan {}

public class Main {
    public static void main(String[] args) {
        Mobil m = new Mobil();
        m.info();
    }
}
```

📌 Output:
```
Ini kendaraan
```

### 🔹 Static Method

```java
interface Kendaraan {
    static void kategori() {
        System.out.println("Transportasi");
    }
}

public class Main {
    public static void main(String[] args) {
        Kendaraan.kategori();
    }
}
```

📌 Output:
```
Transportasi
```

## ⚡ Functional Interface (Java 8+)

Functional Interface adalah interface yang hanya memiliki **satu method abstract**.

Digunakan untuk:
- Lambda expression
- Functional programming

### Contoh:
```java
@FunctionalInterface
interface Operasi {
    int hitung(int a, int b);
}

public class Main {
    public static void main(String[] args) {
        Operasi tambah = (a, b) -> a + b;
        System.out.println(tambah.hitung(5, 3));
    }
}
```

📌 Output:
```
8
```

## 🎯 Penutup

Interface adalah komponen penting dalam Java OOP yang memungkinkan pembuatan sistem yang fleksibel, modular, dan scalable.
