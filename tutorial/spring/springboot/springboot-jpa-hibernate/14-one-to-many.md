---
sidebar_position: 14
title: 'One-to-Many Mapping'
---

## 1️⃣ Konsep Dasar

Relasi **One-to-Many** berarti satu baris di tabel utama berhubungan dengan banyak baris di tabel lain.

* **Contoh:** Satu **Kelas** (`Classes`) memiliki banyak **Siswa** (`Student`).
* **Foreign Key (FK) 🔑**: Secara fisik di database, kolom FK (`class_id`) selalu diletakkan di sisi "Banyak/Many" yaitu tabel **student**.

![Hibernate](/img/hibernate/one-to-many.png)

## 2️⃣ Implementasi Entity (Bi-directional)

Dalam relasi dua arah, kedua class saling mengenal. Kita menggunakan atribut `mappedBy` di sisi "One" agar Hibernate tahu bahwa relasi diatur oleh field di sisi "Many".

### A. Entity Student (Sisi "Many" / Owner)

Sisi ini yang memegang `@JoinColumn`.

```java
@Entity
@Table(name = "student")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	@JoinColumn(name = "class_id")
	private Classes classes;

	// Setter & Getter

}
```

### B. Entity Classes (Sisi "One" / Inverse)

Sisi ini menggunakan `mappedBy` dan memiliki koleksi (`List` atau `Set`).

```java
@Entity
@Table(name = "classes")
public class Classes {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "class_name")
	private String className;
	
	@OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	@JoinColumn(name = "teacher_id")
	private Teacher teacher;
	
	@OneToMany(mappedBy = "classes", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	List<Student> students = new ArrayList<>();


	// HELPER METHOD: Sangat penting untuk sinkronisasi 2 arah di memori
	// menambah method 'add()' memastikan kedua sisi terhubung secara konsisten dalam memori Java dengan Bi-Direction
	public void add(Student student) {
		if (students == null) {
			students = new ArrayList<>();			
		}
		students.add(student);
		
		if (student != null) {
			student.setClasses(this);
		}
	}

	// Setter & Getter

}
```

### C. Kenapa `Classes` yang menggunakan `mappedBy`?

Dalam aturan database relasional, `Foreign Key` (kolom kunci) selalu diletakkan di tabel yang "Banyak/Many" (`Student`). Karena tabel `Student` yang memegang kunci fisik di database, maka dalam kode Java:

* `Student` disebut sebagai **Owner** (Pemilik Relasi).
* `Classes` disebut sebagai **Inverse Side** (Sisi Referensi), sehingga ia harus menggunakan `mappedBy`.

**Ringkasan Aturan `mappedBy`**

| Posisi |	Entitas	 | Anotasi	Menggunakan `mappedBy`? |	Keterangan |
| --- | --- | --- | --- |
| **One**	| `Classes` |	`@OneToMany` |	**Ya**	| Memberitahu Hibernate bahwa relasi diatur oleh entity `Student`.|
| **Many**	| `Student`	| `@ManyToOne`	| **Tidak** |	Menggunakan `@JoinColumn` karena ia pemilik `Foreign Key` secara fisik. |

:::tip
* __Inisialisasi List :__ Selalu inisialisasi `List<Student> students = new ArrayList<>();` di sisi `Classes` untuk menghindari `NullPointerException`.
* __Helper Method :__ Disarankan membuat method `addStudent(Student s)` di dalam entity `Classes` untuk memastikan kedua sisi terhubung secara konsisten dalam memori Java sebelum disimpan ke database menggunakan Spring Data JPA.
:::

Jika dijalankan akan menghasilkan 2 tabel yang saling terhubung:

```
Hibernate: alter table student add column class_id integer
Hibernate: alter table student add constraint FKnsl7w2nw6o6eq53hqlxfcijpm foreign key (class_id) references classes (id)
```

![Hibernate](/img/hibernate/one-to-many2.png)

## 3️⃣ Poin Penting

1. **Lazy vs Eager Fetching**: Secara default, `@OneToMany` bersifat **Lazy**. Artinya, data siswa tidak akan ditarik dari DB kecuali Anda memanggil `getStudents()`. Jika Anda mencoba mengakses data ini setelah `session.close()`, akan terjadi `LazyInitializationException`.
2. **`mappedBy`**: Atribut ini sangat krusial. Ini akan memberitahu Hibernate bahwa sisi `Classes` hanyalah "mirror". Pemilik sebenarnya dari relasi ini adalah sisi `Student` (yang memegang FK).
3. **Orphan Removal**: Jika Anda menambahkan `orphanRemoval = true` pada `@OneToMany`, maka saat Anda menghapus seorang siswa dari `List<Student>`, Hibernate akan otomatis menghapus siswa tersebut dari database (bukan hanya mengosongkan FK-nya).
4. **Inisialisasi List**: Selalu inisialisasi `List` dengan `new ArrayList<>()` untuk menghindari `NullPointerException`.

