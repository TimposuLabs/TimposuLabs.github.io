---
sidebar_position: 9
title: 'Abstraction'
---

## 📌 Pengertian Abstraction
Abstraction adalah konsep dalam OOP yang digunakan untuk **menyembunyikan detail implementasi** dan hanya menampilkan **fungsi penting (essential features)** kepada pengguna.

Tujuan:
- Menyederhanakan kompleksitas
- Fokus pada apa yang dilakukan, bukan bagaimana cara kerjanya

## 🧱 Abstract Class

Abstract class adalah class yang tidak bisa diinstansiasi dan dapat memiliki:
- Method abstract (tanpa body)
- Method biasa (dengan body)

### Contoh:
```java
abstract class Hewan {
    abstract void suara();

    void makan() {
        System.out.println("Hewan makan");
    }
}

class Kucing extends Hewan {
    void suara() {
        System.out.println("Meong");
    }
}

public class Main {
    public static void main(String[] args) {
        Hewan h = new Kucing();
        h.suara();
        h.makan();
    }
}
```

📌 Output:
```
Meong
Hewan makan
```

## 🔌 Interface

Interface adalah blueprint yang hanya berisi method abstract (secara default) dan konstanta.

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
        Kendaraan k = new Mobil();
        k.jalan();
    }
}
```

📌 Output:
```
Mobil berjalan
```

## ⚖️ Perbedaan Abstract Class vs Interface

| Abstract Class | Interface |
|---------------|----------|
| Bisa punya method biasa | Hanya method abstract (default) |
| Bisa punya constructor | Tidak punya constructor |
| Menggunakan `extends` | Menggunakan `implements` |
| Single inheritance | Bisa multiple inheritance |

## 🔧 Implementasi dalam Java

```java
abstract class Shape {
    abstract double luas();
}

class Lingkaran extends Shape {
    double r;

    Lingkaran(double r) {
        this.r = r;
    }

    double luas() {
        return 3.14 * r * r;
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Lingkaran(7);
        System.out.println(s.luas());
    }
}
```

📌 Output:
```
153.86
```

## 🧠 Kapan Menggunakan Abstraction

Gunakan abstraction ketika:
- Ingin menyembunyikan detail implementasi
- Membuat kontrak (interface) antar class
- Mengurangi kompleksitas sistem
- Membuat sistem scalable dan fleksibel

## 🎯 Penutup

Abstraction membantu developer fokus pada fitur utama tanpa harus memahami detail kompleks di balik layar, sehingga membuat kode lebih modular dan mudah dikembangkan.
