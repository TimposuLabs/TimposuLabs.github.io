---
sidebar_position: 22
title: 'Many-to-Many Mapping'
---

Relasi **Many-to-Many** terjadi ketika banyak baris di Tabel A dapat berhubungan dengan banyak baris di Tabel B. 

* **Studi Kasus**: Seorang Siswa(`Student`) dapat mengambil banyak Mata Pelajaran(`Course`), dan satu Mata Pelajaran(`Course`) dapat diikuti oleh banyak Siswa(`Student`).
* **Junction Table**: Dalam database relasional, relasi ini wajib menggunakan **tabel perantara** (misal: `course_student`) yang menyimpan pasangan ID dari kedua tabel utama.

![Hibernate](/img/hibernate/many-to-many.png)

## 🚀 Implementasi Entity

### 1️⃣ Entity `Student` (Sisi Owner)

Sisi "Owner" adalah entitas yang menentukan konfigurasi tabel penghubung menggunakan `@JoinTable`.

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
	
	@ManyToMany(
                fetch = FetchType.LAZY,
                cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	@JoinTable(
                name = "course_student", // Nama tabel penghubung di DB
                joinColumns = @JoinColumn(name = "student_id"), // FK ke tabel student
                inverseJoinColumns = @JoinColumn(name = "course_id")) // FK ke tabel course
	private Set<Course> courses = new HashSet<>();
	
	public Student() {		
	}

	public Student(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

        // HELPER METHOD: Menjaga sinkronisasi dua arah di memori
	public void addCourse(Course course) {
            if (course == null) return;

            if (courses == null) {
                courses = new HashSet<>();
            }

            // Cek apakah course sudah ada, jika belum baru tambahkan
            if (!courses.contains(course)) {
                courses.add(course);
                // Panggil sisi lawan untuk sinkronisasi
                course.addStudent(this);
            }
        }

	// Implementasi Setter & Getter lainnya

}
```

### 2️⃣ Entity `Course` (Sisi Inverse)

Sisi ini menggunakan atribut `mappedBy` yang merujuk pada nama variabel di class `Student`.

```java
@Entity
@Table(name = "course")
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "course_name")
	private String courseName;
	
	@ManyToMany(
			mappedBy = "courses",  // Harus sama dengan nama variabel di Student.java
			fetch = FetchType.LAZY,
			cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	private Set<Student> students = new HashSet<>();
	
	public Course() { }
	
	public Course(String courseName) {
		this.courseName = courseName;
	}

	public void addStudent(Student student) {
		if (student == null) return;
		
		if (students == null) {
			students = new HashSet<>();
		}
		
		if (!students.contains(student)) {
			students.add(student);
			student.addCourse(this);
		}
	}

	// Implementasi Setter & Getter lainnya

}
```

## 📌 Poin Penting

* **Gunakan `Set` Bukan `List`**: Dalam relasi **Many-to-Many**, sangat disarankan menggunakan `Set` (seperti `HashSet`) untuk performa maksimal. Penggunaan `List` sering memicu Hibernate menghapus seluruh baris di tabel penghubung lalu memasukkannya kembali setiap kali ada perubahan (**expensive operations**).
* **Hindari `CascadeType.REMOVE`**: Pada relasi N..M, jangan gunakan **cascade remove**. Jika Anda menghapus seorang Siswa, Anda tentu tidak ingin Mata Pelajaran "Matematika" ikut terhapus dari sistem.
* **Override `equals()` & `hashCode()`**: Karena menggunakan `Set`, kita wajib mengimplementasikan `equals` dan `hashCode` berdasarkan ID entitas agar pengecekan `.contains()` akurat.
* **Infinite Recursion**: Jika Anda mengonversi entitas ke JSON (misal untuk API), gunakan anotasi `@JsonIgnore` agar tidak terjadi looping antara `Student` memanggil `Course` dan `Course` memanggil `Student`.

## 📅 Penggunaan `@JoinTable` dan `@JoinColumn`

Dalam relasi **Many-to-Many**, penempatan `@JoinTable` dan `@JoinColumn` sebenarnya bebas diletakkan di entity mana saja (`Student` atau `Course`). Namun, ada aturan praktis (**best practice**) untuk menentukan siapa yang menjadi **Owner** (pemilik relasi).

Berikut adalah penjelasannya:

### 1️⃣ Siapa yang harus menjadi "Owner"?

Biasanya, sisi yang secara logis melakukan aksi dianggap sebagai pemilik relasi (Owner).

* Dalam kasus sekolah, Siswa (`Student`) yang mendaftar ke Mata Pelajaran (`Course`).
* Oleh karena itu, secara desain lebih masuk akal meletakkan `@JoinTable` dan `@JoinColumn` di entity `Student`.

### 2️⃣ Contoh Struktur di Sisi Student (Owner)

Jika Anda memilih `Student` sebagai _owner_, maka kodenya seperti ini:

```java
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(
        name = "student_courses", // Nama tabel penghubung
        joinColumns = @JoinColumn(name = "student_id"), // FK ke tabel Student
        inverseJoinColumns = @JoinColumn(name = "course_id") // FK ke tabel Course
    )
    private Set<Course> courses = new HashSet<>();
}
```

### 3️⃣ Apa yang terjadi di sisi Course (Inverse Side)?

Sisi satunya (`Course`)  **tidak boleh** menggunakan `@JoinColumn` lagi. Ia harus menggunakan atribut `mappedBy` untuk merujuk ke field yang ada di class `Student`.

```java
@Entity
public class Course {
    @Id
    private Long id;

    @ManyToMany(mappedBy = "courses") // "courses" adalah nama variabel di class Student
    private Set<Student> students = new HashSet<>();
}
```

### 🔁 Perbandingan Jika Terbalik

| Penempatan	| Kelebihan	| Keterangan |
| --- | --- | --- |
| **Di sisi `Student`**	| Logis secara bisnis.	| "Siswa mengambil Kursus". Paling umum digunakan. ✅ |
| **Di sisi `Course`** |	Secara teknis bisa.	| "Kursus diikuti oleh Siswa". Kurang lazim secara alur aplikasi. ⚠️ |

### 👍 Kesimpulan Penggunaan `@JoinTable` dan `@JoinColumn`

* **Bisa** di mana saja, tetapi pilih salah satu. **Jangan** pasang `@JoinTable` di kedua sisi karena Hibernate akan membuat dua tabel penghubung yang berbeda, yang akan merusak integritas data Anda.
* **Sangat disarankan** meletakkannya di entitas yang paling sering menjadi titik awal operasi (dalam hal ini `Student`).
*Pastikan menggunakan `Set` daripada `List` untuk performa many-to-many yang lebih baik di Hibernate.

