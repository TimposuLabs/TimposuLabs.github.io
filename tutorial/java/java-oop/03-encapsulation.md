---
sidebar_position: 6
title: 'Encapsulation'
---

## 📌 Pengertian Encapsulation
Encapsulation adalah konsep dalam OOP yang digunakan untuk **membungkus data (attribute) dan method dalam satu class**, serta membatasi akses langsung ke data tersebut.

Tujuannya:
- Melindungi data (data hiding)
- Mengontrol akses
- Menjaga integritas data

## 🔐 Access Modifier

Access modifier digunakan untuk mengatur tingkat akses suatu class, method, atau attribute.

### 🔹`private`
Hanya bisa diakses dalam class yang sama.

```java
class User {
    private String nama;
}
```

### 🔹`protected`
Bisa diakses dalam package yang sama dan subclass.

```java
class User {
    protected String nama;
}
```

### 🔹`public`
Bisa diakses dari mana saja.

```java
class User {
    public String nama;
}
```

### 🔹default (tanpa modifier)
Hanya bisa diakses dalam package yang sama.

```java
class User {
    String nama;
}
```


## 🔁 Getter dan Setter

Getter dan Setter digunakan untuk mengakses dan mengubah nilai attribute private.

```java
class User {
    private String nama;

    // getter
    public String getNama() {
        return nama;
    }

    // setter
    public void setNama(String nama) {
        this.nama = nama;
    }
}
```

## 🔧 Contoh Implementasi Encapsulation

```java
class User {
    private String nama;

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getNama() {
        return nama;
    }
}

public class Main {
    public static void main(String[] args) {
        User user = new User();
        user.setNama("Ucup");

        System.out.println(user.getNama());
    }
}
```

📌 Output:
```
Ucup
```

## 🚀 Keuntungan Encapsulation

- Data lebih aman (tidak bisa diakses langsung)
- Kontrol penuh terhadap perubahan data
- Kode lebih terstruktur
- Mudah maintenance
- Mendukung prinsip OOP lainnya

## 🧠 Best Practice dalam Encapsulation

- Gunakan `private` untuk attribute
- Gunakan getter dan setter untuk akses
- Validasi data di setter
- Hindari expose field secara langsung
- Gunakan immutable object jika memungkinkan

## 🎯 Penutup

Encapsulation adalah konsep penting dalam OOP untuk menjaga keamanan dan integritas data, serta membuat kode lebih rapi dan terstruktur.
