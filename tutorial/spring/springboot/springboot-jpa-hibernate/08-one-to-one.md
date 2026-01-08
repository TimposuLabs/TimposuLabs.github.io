---
sidebar_position: 8
title: 'One-to-One Mapping'
---

Relasi **One-to-One** (Satu-ke-Satu) terjadi ketika satu entitas memiliki hubungan eksklusif dengan satu entitas lainnya.

**Contoh Dunia Nyata**: 

* Seorang Siswa (`Student`) memiliki satu Profil Detail (`StudentDetail`). Satu Profil Detail hanya dimiliki oleh satu Siswa.
* **Guru sebagai Wali Kelas**: Satu Guru (`Teacher`) hanya bisa menjadi wali untuk satu Kelas (`Classes`) tertentu, dan satu Kelas hanya memiliki satu Guru sebagai wali kelasnya.

Pada tutorial ini kita akan mengambil contoh untuk **One-to-One** Mapping, Satu Guru (`Teacher`) yang hanya bisa menjadi wali untuk satu Kelas (`Classes`).

![Hibernate](/img/hibernate/one-to-one.png)

## 1️⃣ Entitas `Classes` (Kelas)

```java
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "classes")
public class Classes {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "class_name")
	private String className;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "teacher_id")
	private Teacher teacher;
	
	public Classes() {		
	}

	public Classes(String className) {
		this.className = className;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public Teacher getTeacher() {
		return teacher;
	}

	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}

	@Override
	public String toString() {
		return "Class [id=" + id + ", className=" + className + ", teacher=" + teacher + "]";
	}
}
```

* `@OneToOne`: Menjelaskan bahwa satu baris di tabel ini hanya boleh terhubung dengan satu baris di tabel `Teacher`. Dalam hal ini logika bisnis-nya class `Student` bertindak sebagai **Owner** pemilik relasi dan `Teacher` bertindak sebagi sisi **Non-Owning** (Referensi Terbalik).
* `cascade = CascadeType.ALL`: Ini adalah fitur "efek domino". Jika kita melakukan operasi (Create, Update, Delete) pada objek ini, maka objek `Teacher` yang terhubung akan otomatis menerima operasi yang sama.
	* Contoh: Jika kitra menghapus data pada class ini, maka data `Teacher` yang menjadi wali kelasnya juga akan ikut terhapus dari database.

## 2️⃣ Entitas `Teacher` (Guru)

```java
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "teacher")
public class Teacher {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;

	public Teacher() {
	}

	public Teacher(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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

	@Override
	public String toString() {
		return "Guru [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + "]";
	}	
}
```

## 👁️ Visualisasi Hasil Pemetaan

Jika aplikasi dijalankan (dengan konfigurasi `spring.jpa.hibernate.ddl-auto=update`), Hibernate akan secara otomatis menjalankan perintah SQL berikut ke database Anda:

* Output Hibernate:

```
Hibernate: create table classes (id integer not null auto_increment, class_name varchar(255), teacher_id integer, primary key (id)) engine=InnoDB
Hibernate: create table teacher (id integer not null auto_increment, first_name varchar(255), last_name varchar(255), primary key (id)) engine=InnoDB
Hibernate: alter table classes drop index UKq04x54tgu6ph5k0scj9r5ia7j
Hibernate: alter table classes add constraint UKq04x54tgu6ph5k0scj9r5ia7j unique (teacher_id)
Hibernate: alter table classes add constraint FK9vbmf9aq55wlc5ektka70hq1d foreign key (teacher_id) references teacher (id)
```

![Hibernate](/img/hibernate/one-to-one.png)

* Jika dalam output SQL maka akan sebagai berikut:

```sql
CREATE TABLE `classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKq04x54tgu6ph5k0scj9r5ia7j` (`teacher_id`),
  CONSTRAINT `FK9vbmf9aq55wlc5ektka70hq1d` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `teacher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-jpa-hibernate-advance/tree/main/01-hibernate-one-to-one
:::
