---
sidebar_position: 2
title: 'Mapping Entity'
---

## 🌐 Mapping / Pemetaan Entity (Object-Relational Mapping)

Dalam **JPA** (Jakarta Persistence API), sebuah kelas Java biasa (POJO) diubah menjadi komponen database menggunakan **Annotation/Anotasi**. 

![Hibernate](/img/hibernate/jpa-mapping-entity.png)

Berikut adalah bedah materi sebelumnya berdasarkan kelas `Student`:

```java
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "student")
public class Student {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email")
	private String email;

	public Student() {
	}

	public Student(String firstName, String lastName, String email) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Student [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + "]";
	}
}
```

### 1️⃣ Annotation/Anotasi Tingkat Kelas (Class Level)

* `@Entity`
    * **Fungsi**: Memberitahu JPA bahwa kelas ini adalah sebuah Entity yang harus dipetakan ke tabel database.
    * **Penting**: Tanpa anotasi ini, Hibernate akan mengabaikan kelas ini saat melakukan pemindaian (scanning) database.
* `@Table(name = "student")`
    * **Fungsi**: Menentukan nama tabel spesifik di database.
    * **Penjelasan**: Jika Anda tidak menuliskan `@Table`, Hibernate secara default akan membuat tabel dengan nama yang sama dengan kelas (`Student`). Dengan menambahkan `name = "student"`, kita memastikan tabel di database bernama huruf kecil "`student`".

### 2️⃣ Annotation/Anotasi Tingkat Properti (Field Level)

* `@Id`
    * **Fungsi**: Menandai field tersebut sebagai **Primary Key** (Kunci Utama) tabel.
    * **Kaitan**: Setiap Entity wajib memiliki satu field yang ditandai sebagai `@Id`.
* `@GeneratedValue(strategy = GenerationType.IDENTITY)`
    * **Fungsi**: Mengatur strategi pembuatan ID otomatis.
    * **Penjelasan**: `IDENTITY` sangat umum digunakan untuk MySQL. Database akan mengisi kolom `id` secara otomatis (Auto Increment) setiap kali ada data baru masuk.
* `@Column(name = "first_name")`
    * **Fungsi**: Memetakan variabel Java ke kolom database dengan nama tertentu.
    * **Kasus**: Di Java kita menggunakan standar *CamelCase* (`firstName`), namun di database biasanya menggunakan *snake_case* (`first_name`). Anotasi ini berfungsi sebagai jembatan perbedaan penamaan tersebut.

:::info
Selain `GenerationType.IDENTITY` terdapat beberapa `GenerationType` jenis lain. Berikut tabel perbandingannya:

| Jenis Strategi	| Cara Kerja	| Database yang Cocok	| Kelebihan |	Kekurangan |
| --- | --- | --- | --- | --- |
| `IDENTITY`	| Database menggunakan fitur *auto-increment* untuk membuat ID setelah data dimasukkan.	| MySQL, MariaDB, SQL Server, DB2. |	Sangat sederhana dan umum digunakan.	| Tidak mendukung *batch insert* secara efisien karena ID baru diketahui setelah kueri dijalankan. |
| `SEQUENCE` |	Menggunakan objek *sequence* database untuk mengambil nilai ID sebelum data dimasukkan.	| PostgreSQL, Oracle, SQL Server. |	Sangat cepat untuk operasi *batch* (memasukkan banyak data sekaligus).	| Membutuhkan objek tambahan (*sequence*) di dalam database. |
| `TABLE`	| Menggunakan tabel database khusus untuk menyimpan dan mensimulasikan nilai ID.	| Semua Database (Universal). |	Bisa digunakan di database mana pun yang tidak punya fitur ID otomatis. |	Performa paling lambat karena ada operasi baca-tulis tambahan pada tabel ID. |
| `AUTO` |	Hibernate memilihkan strategi terbaik secara otomatis berdasarkan dialek database. |	Semua Database.  |	Praktis karena Hibernate yang menentukan pilihan terbaik. |	Perilakunya bisa berubah-ubah jika Anda mengganti jenis database. |
| `UUID`	| Membuat kode unik 128-bit secara otomatis di level aplikasi atau database. |	| **Microservices**, Sistem Terdistribusi.	| ID sangat unik secara global dan tidak bisa ditebak (aman untuk URL).	| Ukuran data lebih besar (String/UUID) dibanding angka (Long/BigInt). |

*Catatan: `GenerationType.UUID` adalah standar yang semakin sering digunakan untuk aplikasi skala besar.*
:::

### 3️⃣ Pentingnya Constructor dan Getter/Setter

* **No-Argument Constructor** (`public Student() {}`): Hibernate membutuhkan constructor kosong untuk membuat instance objek melalui teknik *reflection* sebelum mengisi datanya dari database. **Wajib ada**.
* **Parameterized Constructor**: Digunakan oleh developer untuk mempermudah pembuatan objek baru tanpa harus memanggil setter satu per satu (misal: `new Student("Budi", "Sanjaya", "budi@mail.com")`).
* **Getter & Setter**: Digunakan oleh JPA untuk membaca dan menulis nilai ke dalam variabel private kelas tersebut.

### 👁️ Visualisasi Hasil Pemetaan

Jika aplikasi dijalankan (dengan konfigurasi `spring.jpa.hibernate.ddl-auto=update`), Hibernate akan secara otomatis menjalankan perintah SQL berikut ke database Anda:

```sql
CREATE TABLE student (
    id BIGINT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    PRIMARY KEY (id)
);
```

:::tip
Banyak programmer Java mulai menggunakan **[Lombok](https://projectlombok.org/)** untuk menggantikan penulisan manual `Getter`, `Setter`, dan `Constructor` agar kode lebih bersih (clean code). **Namun**, memahami struktur manual seperti di atas adalah dasar yang wajib dikuasai sebelum menggunakan library bantuan.
:::
