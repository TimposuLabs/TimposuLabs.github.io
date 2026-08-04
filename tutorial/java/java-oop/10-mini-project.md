---
sidebar_position: 13
title: 'Mini Project Java OOP'
---

## 📌 Deskripsi
Mini project ini mendemonstrasikan penerapan OOP pada sistem sederhana (Studi Kasus Mini Project: Sistem Manajemen Mahasiswa):
- Mengelola data **Mahasiswa**, **Dosen**, dan **Mata Kuliah**
- Relasi antar object (association)
- Penerapan encapsulation, composition, dan basic polymorphism

## 🧱 Desain Class

### 🔹 Class Mahasiswa
- atribut: nim, nama, daftar mata kuliah
- method: `tambahMataKuliah()`, `tampilkanData()`

### 🔹 Class Dosen
- atribut: nidn, nama
- method: `tampilkanData()`

### 🔹 Class MataKuliah
- atribut: kode, nama, dosen
- method: `tampilkanInfo()`

## 🔧 Implementasi Awal (Versi Sederhana)

### 📁 `Mahasiswa.java`
```java
import java.util.ArrayList;

class Mahasiswa {
    private String nim;
    private String nama;
    private ArrayList<MataKuliah> listMK = new ArrayList<>();

    public Mahasiswa(String nim, String nama) {
        this.nim = nim;
        this.nama = nama;
    }

    public void tambahMataKuliah(MataKuliah mk) {
        listMK.add(mk);
    }

    public void tampilkanData() {
        System.out.println("NIM: " + nim);
        System.out.println("Nama: " + nama);
        System.out.println("Mata Kuliah:");
        for (MataKuliah mk : listMK) {
            System.out.println("- " + mk.getNama());
        }
    }
}
```

### 📁 `Dosen.java`
```java
class Dosen {
    private String nidn;
    private String nama;

    public Dosen(String nidn, String nama) {
        this.nidn = nidn;
        this.nama = nama;
    }

    public String getNama() {
        return nama;
    }
}
```

### 📁 `MataKuliah.java`
```java
class MataKuliah {
    private String kode;
    private String nama;
    private Dosen dosen;

    public MataKuliah(String kode, String nama, Dosen dosen) {
        this.kode = kode;
        this.nama = nama;
        this.dosen = dosen;
    }

    public String getNama() {
        return nama;
    }

    public void tampilkanInfo() {
        System.out.println(kode + " - " + nama + " (Dosen: " + dosen.getNama() + ")");
    }
}
```

### 📁 `Main.java`
```java
public class Main {
    public static void main(String[] args) {
        Dosen d1 = new Dosen("D001", "Pak Budi");

        MataKuliah mk1 = new MataKuliah("IF101", "Pemrograman Java", d1);
        MataKuliah mk2 = new MataKuliah("IF102", "Struktur Data", d1);

        Mahasiswa m1 = new Mahasiswa("M001", "Ucup");
        m1.tambahMataKuliah(mk1);
        m1.tambahMataKuliah(mk2);

        m1.tampilkanData();
    }
}
```

📌 Output:
```
NIM: M001
Nama: Ucup
Mata Kuliah:
- Pemrograman Java
- Struktur Data
```

## ♻️ Refactoring dengan Prinsip OOP

### 🔹 Perbaikan:
- Tambahkan method tampilkan detail MataKuliah
- Gunakan encapsulation lebih baik
- Kurangi duplikasi tanggung jawab

### 📁 Mahasiswa (Refactored)
```java
public void tampilkanData() {
    System.out.println("NIM: " + nim);
    System.out.println("Nama: " + nama);
    System.out.println("Mata Kuliah:");
    for (MataKuliah mk : listMK) {
        mk.tampilkanInfo();
    }
}
```

📌 Output setelah refactor:
```
NIM: M001
Nama: Ucup
Mata Kuliah:
IF101 - Pemrograman Java (Dosen: Pak Budi)
IF102 - Struktur Data (Dosen: Pak Budi)
```

## 🧠 Analisis OOP

| Konsep | Implementasi |
|------|-------------|
| Encapsulation | attribute private |
| Composition | Mahasiswa memiliki MataKuliah |
| Association | MataKuliah memiliki Dosen |
| Abstraction | method tampilkanInfo() |

## 🚀 Pengembangan Lanjutan

- Tambah fitur CRUD Mahasiswa
- Tambah validasi data
- Gunakan interface untuk service layer
- Integrasi dengan database

## 🎯 Penutup
Mini project ini menunjukkan bagaimana konsep OOP digunakan untuk membangun sistem yang terstruktur, modular, dan scalable.
