---
sidebar_position: 14
title: 'Best Practice Java OOP'
---

## 📌 Pendahuluan

Best practice dalam Java OOP membantu menghasilkan kode yang:
- Bersih (clean)
- Mudah dibaca (readable)
- Mudah dirawat (maintainable)
- Dapat digunakan ulang (reusable)

## 🏷️ 1. Naming Convention

Gunakan penamaan yang konsisten dan deskriptif.

| Elemen | Aturan |
|--------|--------|
| Class | PascalCase (Mahasiswa, UserService) |
| Method | camelCase (getNama, hitungTotal) |
| Variable | camelCase (totalHarga, namaUser) |
| Constant | UPPER_CASE (MAX_SIZE) |

### ❌ Buruk:
```java
int x;
```

### ✅ Baik:
```java
int totalHarga;
```

## 🧹 2. Code Cleanliness

Kode harus mudah dibaca dan dipahami.

### ❌ Buruk:
```java
if(a>10){System.out.println("OK");}
```

### ✅ Baik:
```java
if (a > 10) {
    System.out.println("OK");
}
```

## 🔁 3. Reusability

Gunakan method atau class agar kode bisa digunakan kembali.

### Contoh:
```java
class Kalkulator {
    int tambah(int a, int b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Kalkulator k = new Kalkulator();
        System.out.println(k.tambah(2, 3));
    }
}
```

📌 Output:
```
5
```

## 🛠️ 4. Maintainability

Kode harus mudah diubah tanpa merusak sistem.

### Tips:
- Gunakan prinsip SOLID
- Hindari hard-coded value
- Pisahkan logika ke dalam class

### Contoh:
```java
class DiskonService {
    double hitungDiskon(double harga) {
        return harga * 0.1;
    }
}
```

## ⚠️ 5. Anti-Pattern yang Harus Dihindari

### 🔹 God Class
Class terlalu besar dan menangani banyak hal.

### 🔹 Spaghetti Code
Kode tidak terstruktur dan sulit dibaca.

### 🔹 Duplicate Code
Kode yang sama ditulis berulang.

### ❌ Contoh Duplicate:
```java
System.out.println("Hello");
System.out.println("Hello");
```

### ✅ Refactor:
```java
void printHello() {
    System.out.println("Hello");
}
```

## 🎯 Penutup
Dengan menerapkan best practice Java OOP, kamu bisa membuat kode yang profesional, scalable, dan siap digunakan dalam proyek besar.
