---
sidebar_position: 8
title: 'Polymorphism'
---

## 📌 Pengertian Polymorphism
Polymorphism adalah konsep dalam OOP yang memungkinkan sebuah **method memiliki banyak bentuk (poly = banyak, morph = bentuk)**.

Artinya, satu nama method bisa memiliki perilaku berbeda tergantung konteks penggunaannya.

## 🧱 Jenis Polymorphism

### 🔹 1. Compile-time Polymorphism (Method Overloading)

Terjadi saat method memiliki **nama yang sama tetapi parameter berbeda**.

```java
class Kalkulator {
    int tambah(int a, int b) {
        return a + b;
    }

    int tambah(int a, int b, int c) {
        return a + b + c;
    }
}

public class Main {
    public static void main(String[] args) {
        Kalkulator k = new Kalkulator();
        System.out.println(k.tambah(2, 3));
        System.out.println(k.tambah(2, 3, 4));
    }
}
```

📌 Output:
```
5
9
```

### 🔹 2. Runtime Polymorphism (Method Overriding)

Terjadi saat subclass mengubah method dari superclass.

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
        Hewan h = new Kucing();
        h.suara();
    }
}
```

📌 Output:
```
Meong
```

## ⚖️ Perbedaan Overloading vs Overriding

| Overloading | Overriding |
|------------|-----------|
| Compile-time | Runtime |
| Parameter berbeda | Parameter sama |
| Satu class | Antar class |

## 🔧 Contoh Implementasi

```java
class Hewan {
    void suara() {
        System.out.println("Hewan bersuara");
    }
}

class Anjing extends Hewan {
    void suara() {
        System.out.println("Guk guk");
    }
}

class Kucing extends Hewan {
    void suara() {
        System.out.println("Meong");
    }
}

public class Main {
    public static void main(String[] args) {
        Hewan h1 = new Anjing();
        Hewan h2 = new Kucing();

        h1.suara();
        h2.suara();
    }
}
```

📌 Output:
```
Guk guk
Meong
```

## 🎯 Penutup

Polymorphism membuat kode lebih fleksibel, reusable, dan mudah dikembangkan dalam Java.

