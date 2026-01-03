---
sidebar_position: 10
title: 'Uni-Directional vs Bi-Directional'
---

Pada materi sebelumnya kita sudah melakukan mapping One-to-One object `Classes` dan `Teacher`, untuk relasi **One-to-One Uni-directional**. Kali ini kita akan membahas tentang **Bi-Directional**.

![Hibernate](/img/hibernate/one-to-one.png)

## 1️⃣ Uni-Directional

Dalam relasi **Uni-directional** (Satu Arah), hanya satu entitas yang mengetahui entitas lainnya. Dalam kasus ini, `Classes` mengetahui siapa gurunya, tetapi `Teacher` tidak tahu ia mengajar kelas mana (di dalam kode Java).

![Hibernate](/img/hibernate/hibernate-uni-directional.png)

## 2️⃣ Bi-Directional

**Bi-directional** (dua arah) adalah sebuah desain relasi di mana kedua entity saling mengetahui keberadaan satu sama lain.

![Hibernate](/img/hibernate/hibernate-bi-directional.png)

### Perbandingan Relasi

| Fitur |	Uni-directional (Satu Arah) |	Bi-directional (Dua Arah) |
| --- | --- | --- |
| Navigasi Objek |	Hanya satu sisi (A ➡️ B)	| Kedua sisi (A ↔️ B) |
| Database |	Menggunakan 1 Foreign Key |	Menggunakan 1 Foreign Key (Sama) |
| Kode Java |	Lebih sederhana	| Lebih kompleks (butuh sinkronisasi) |
| Kemudahan Query |	Terbatas pada satu sisi	| Sangat fleksibel dari kedua sisi |

Sebagai contoh, jika Anda memiliki tabel `Teacher` (Guru) dan `Classes` (Kelas):

* **Uni-directional** (Satu Arah): Hanya `Classes` yang tahu siapa `Teacher`-nya (lewat *Foreign Key*), tapi objek `Teacher` tidak punya daftar kelas yang ia ajar.
* **Bi-directional** (Dua Arah): `Classes` tahu siapa `Teacher`-nya, **DAN** `Teacher` juga punya daftar (`List`) kelas-kelas yang ia miliki.

### Perbedaan Visual

**1. Uni-directional (Hanya satu sisi yang punya referensi)**

Di dalam kode Java, kita hanya bisa melakukan ini:

* `myClass.getTeacher();` ✅

Tapi kita tidak bisa melakukan ini:

* `myTeacher.getClasses();` ❌ (Karena objek Teacher tidak menyimpan data kelas).

**2. Bi-directional (Kedua sisi punya referensi)**

Kita bisa melakukan keduanya:

* `myClass.getTeacher();` ✅

* `myTeacher.getClasses();` ✅ (Objek `Teacher` memiliki `Collections` / `List` kelas).

### Implementasi Bi-Directional (Hibernate)

Untuk membuat relasi dua arah di Hibernate, kita harus menggunakan atribut `mappedBy`.

Dalam skenario ini, satu Guru (`Teacher`) hanya bisa menjadi wali kelas di satu Kelas (`Classes`), dan satu Kelas hanya memiliki satu Guru sebagai wali kelasnya.

**A. Sisi Owner (Classes)**

Sisi ini yang memiliki kendali atas tabel database (memegang *Foreign Key*).

```java
@Entity
@Table(name = "classes")
public class Classes {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "class_name")
	private String className;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "teacher_id", referencedColumnName = "id")
	private Teacher teacher; // Navigasi: Classes -> Teacher

	// Setter & Getter
}
```

**B. Sisi Non-Owning (Teacher)**

Sisi ini tidak membuat kolom baru di database, tetapi bisa memanggil data kelas melalui atribut `mappedBy`.

```java
@Entity
@Table(name = "teacher")
public class Teacher {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@OneToOne(mappedBy = "teacher", // Merujuk ke field 'teacher' di class Classes
				cascade = CascadeType.ALL) // setiap operasi yang dilakukan pada entity ini akan otomatis diteruskan ke entity yang terhubung (Child).
	private Classes classes; // Navigasi: Teacher -> Classes

	// Setter & Getter
}
```

**C. Cara Penggunaan dalam Kode**

Untuk menjaga sinkronisasi data di kedua sisi (**Bi-directional**), sangat disarankan membuat **Helper Method**:

```java
// Di dalam class Teacher.java
public void setClasses(Classes classes) {
    this.classes = classes;
    // Cek dulu apakah parameter classes tidak null sebelum memanggil method-nya
    if (classes != null) {
        classes.setTeacher(this); // Memastikan sisi Classes juga tahu siapa gurunya
    } 
}
```

**Contoh Eksekusi:**

```java
Teacher guruBaru = new Teacher();
guruBaru.setName("Pak Budi");

Classes kelas10A = new Classes();
kelas10A.setClassName("10-A");

// Menghubungkan secara dua arah
guruBaru.setClasses(kelas10A);

session.persist(guruBaru);
session.persist(kelas10A);
```

### ❌ Masalah Umum: Infinite Recursion (Looping)

Saat menggunakan relasi dua arah, metode `toString()` atau serialisasi JSON (Jackson) bisa menyebabkan error *StackOverflow* karena `Teacher` memanggil `Classes`, dan `Classes` memanggil `Teacher` kembali tanpa henti.

**Solusi:** 

* Jangan sertakan field relasi di dalam method `toString()`.
* Gunakan anotasi `@JsonIgnore` atau `@JsonManagedReference` jika Anda membangun REST API.

### 🫰 Kesimpulan

Gunakan relasi **Bi-directional** jika aplikasi Anda membutuhkan navigasi data yang intens dari kedua sisi entity. Jika hubungan hanya dibutuhkan satu arah (misal: Log Transaksi hanya butuh User, tapi User tidak perlu daftar semua lognya), lebih baik gunakan **Uni-directional** untuk menjaga kesederhanaan kode.
