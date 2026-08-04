---
sidebar_position: 12
title: 'Exception Handling'
---

## 📌 Pengertian Exception
Exception adalah **kejadian/error saat runtime** yang mengganggu alur normal program.

Contoh:
- Pembagian dengan nol
- File tidak ditemukan
- Input tidak valid

Tujuan exception handling:
- Mencegah program crash
- Menangani error dengan elegan
- Memberikan pesan yang jelas

## 🧱 Try-Catch-Finally

### 🔹 Struktur Dasar

```java
try {
    // kode berpotensi error
} catch (Exception e) {
    // penanganan error
} finally {
    // selalu dijalankan
}
```

### 🔹 Contoh

```java
public class Main {
    public static void main(String[] args) {
        try {
            int a = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Terjadi error: " + e.getMessage());
        } finally {
            System.out.println("Program selesai");
        }
    }
}
```

📌 Output:
```
Terjadi error: / by zero
Program selesai
```

## 🔑 Throw dan Throws

### 🔹 `throw`
Digunakan untuk melempar exception secara manual.

```java
public class Main {
    public static void cekUmur(int umur) {
        if (umur < 18) {
            throw new IllegalArgumentException("Umur harus >= 18");
        }
    }

    public static void main(String[] args) {
        cekUmur(15);
    }
}
```

📌 Output:
```
Exception in thread "main" java.lang.IllegalArgumentException: Umur harus >= 18
```

## 🔹 `throws`
Digunakan untuk mendeklarasikan exception pada method.

```java
import java.io.*;

public class Main {
    public static void bacaFile() throws IOException {
        FileReader file = new FileReader("data.txt");
    }

    public static void main(String[] args) {
        try {
            bacaFile();
        } catch (IOException e) {
            System.out.println("File tidak ditemukan");
        }
    }
}
```

📌 Output:
```
File tidak ditemukan
```

## 🛠️ Custom Exception

Custom exception adalah exception yang dibuat sendiri.

### 🔹 Contoh

```java
class UmurException extends Exception {
    public UmurException(String message) {
        super(message);
    }
}

public class Main {
    public static void cekUmur(int umur) throws UmurException {
        if (umur < 18) {
            throw new UmurException("Umur tidak valid");
        }
    }

    public static void main(String[] args) {
        try {
            cekUmur(15);
        } catch (UmurException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

📌 Output:
```
Umur tidak valid
```

## 🎯 Penutup

Exception handling adalah bagian penting dalam Java untuk membuat program lebih robust, aman, dan profesional dalam menangani error.
