---
sidebar_position: 7
title: 'Inheritance'
---

## 📌 Pengertian Inheritance

Inheritance (Pewarisan) adalah konsep dalam OOP yang memungkinkan sebuah class (**child/subclass**) mewarisi atribut dan method dari class lain (**parent/superclass**).

Tujuan:
- Reusability (menggunakan ulang kode)
- Mengurangi duplikasi
- Membentuk hubungan hierarki

## 🔑 Keyword `extends`

Keyword `extends` digunakan untuk membuat subclass dari superclass.

```java
class Hewan {
    void makan() {
        System.out.println("Hewan makan");
    }
}

class Kucing extends Hewan {
    void suara() {
        System.out.println("Meong");
    }
}
```

## 🧱 Jenis-jenis Inheritance di Java

### 🔹 1. Single Inheritance

Satu subclass mewarisi satu superclass.

```java
class Hewan {
    void makan() {
        System.out.println("Makan");
    }
}

class Kucing extends Hewan {
    void suara() {
        System.out.println("Meong");
    }
}
```

### 🔹 2. Multilevel Inheritance

Class diturunkan lebih dari satu level.

```java
class Hewan {
    void makan() {
        System.out.println("Makan");
    }
}

class Mamalia extends Hewan {
    void bernapas() {
        System.out.println("Bernapas");
    }
}

class Kucing extends Mamalia {
    void suara() {
        System.out.println("Meong");
    }
}
```

### 🔹 3. Hierarchical Inheritance

Satu superclass memiliki banyak subclass.

```java
class Hewan {
    void makan() {
        System.out.println("Makan");
    }
}

class Kucing extends Hewan {
    void suara() {
        System.out.println("Meong");
    }
}

class Anjing extends Hewan {
    void suara() {
        System.out.println("Guk guk");
    }
}
```

## 🔁 Method Overriding

Subclass dapat mengganti implementasi method dari superclass.

```java
class Hewan {
    void suara() {
        System.out.println("Hewan bersuara");
    }
}

class Kucing extends Hewan {
    @Override
    void suara() {
        System.out.println("Meong");
    }
}

public class Main {
    public static void main(String[] args) {
        Kucing k = new Kucing();
        k.suara();
    }
}
```

📌 Output:
```
Meong
```

## 🔑 Keyword `super`

Digunakan untuk mengakses method atau constructor dari superclass.

```java
class Hewan {
    void makan() {
        System.out.println("Hewan makan");
    }
}

class Kucing extends Hewan {
    void tampil() {
        super.makan();
        System.out.println("Kucing makan");
    }
}

public class Main {
    public static void main(String[] args) {
        Kucing k = new Kucing();
        k.tampil();
    }
}
```

📌 Output:
```
Hewan makan
Kucing makan
```

---

# 🚀 Keuntungan Penggunaan Inheritance

- Mengurangi duplikasi kode
- Meningkatkan reusability
- Mempermudah maintenance
- Struktur program lebih rapi
- Mendukung polymorphism

---

# 🎯 Penutup

Inheritance adalah salah satu pilar utama OOP yang memungkinkan kode lebih modular, reusable, dan mudah dikembangkan.
