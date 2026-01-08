---
sidebar_position: 13
title: 'One-to-One Cascade'
---

Pada materi sebelumnya kita sudah membahas tentang Cascading. Pada materi ini kita akan mengimplementasikan penggunaan **Cascade Delete** pada project **One-to-One** antara `Classes` dan `Teacher`.

## 1️⃣ Menggunakan Cascade `ALL` (Agresif)

### ⚙️ Setup Entity

* Menggunakan Cascade `All` akan membuat Child(`Classes`) tidak bisa hidup tanpa Parent (`Teacher`). Jadi efeknya ketika kita memanggil `entityManager.remove(teacher1)` untuk menghapus data `Teacher`, maka data `Classes` yang terhubung juga **akan hilang** dari database.

![Hibernate](/img/hibernate/one-to-one-cascade-delete-all.png)

* Pada `Teacher.java`:

```java
@OneToOne(mappedBy = "teacher", cascade = CascadeType.ALL)
private Classes classes;
```

### 🔁 Setup DAO

* Menambahkan method `deleteTeacherById(Integer id)` pada Interface DAO:

```java
public interface SchoolDAO {

	void saveClasses(Classes classes);
	
	Classes findClassById(Integer id);
	
	void deleteClassesById(Integer id);
	
	Teacher findTeacherById(Integer id);
	
	void deleteTeacherById(Integer id);
}
```

* Implementasi DAO:

```java
@Override
@Transactional
public void deleteTeacherById(Integer id) {
	entityManager.remove(entityManager.find(Teacher.class, id));
}
```

### 🏃 Main App

* Kita akan melakukan penghapusan data dengan **Cascade ALL** di mana ketika menghapus data pada `Teacher` **akan menghapus juga** data pada `Classes`.
* Contoh kita punya data `Teacher` dan `Classes` dalam databases:

```
mysql> select * from teacher;
+----+------------+-----------+
| id | first_name | last_name |
+----+------------+-----------+
|  1 | Andi       | Fahrum    |
|  2 | Budi       | Sudarsono |
|  3 | Beddu      | Kendeng   |
+----+------------+-----------+
3 rows in set (0.00 sec)

mysql> select * from classes;
+----+------------+------------+
| id | class_name | teacher_id |
+----+------------+------------+
|  1 | Kelas 9    |          1 |
|  2 | Kelas 10   |          2 |
|  3 | Kelas 11   |          3 |
+----+------------+------------+
3 rows in set (0.00 sec)
```

* Pada Class Main kita akan mencoba menghapus data `Teacher` dengan ID 2, maka seharusnya data `Classes` terkait **juga akan terhapus**:

```java
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	// Bean ini akan dieksekusi di command line
	@Bean
	public CommandLineRunner commandLineRunner(SchoolDAO dao) {
		return runner -> {

			deleteTeacher(dao); // delete bi-directional (Cascade ALL)
			
		};
	}

	private void deleteTeacher(SchoolDAO dao) {
		Integer id = 2;
		dao.deleteTeacherById(id);
		System.out.println("Teacher deleted with id " + id);		
	}	
}
```

* Output Hibernate SQL:

```
Hibernate: select t1_0.id,c1_0.id,c1_0.class_name,t1_0.first_name,t1_0.last_name from teacher t1_0 left join classes c1_0 on t1_0.id=c1_0.teacher_id where t1_0.id=?
Hibernate: delete from classes where id=?
Hibernate: delete from teacher where id=?
Teacher deleted with id 2
```

* Cek data dalam database:

```
mysql> select * from teacher;
+----+------------+-----------+
| id | first_name | last_name |
+----+------------+-----------+
|  1 | Andi       | Fahrum    |
|  3 | Beddu      | Kendeng   |
+----+------------+-----------+
2 rows in set (0.00 sec)

mysql> select * from classes;
+----+------------+------------+
| id | class_name | teacher_id |
+----+------------+------------+
|  1 | Kelas 9    |          1 |
|  3 | Kelas 11   |          3 |
+----+------------+------------+
2 rows in set (0.00 sec)
```

## 2️⃣ Menggunakan Cascade Terpilih (Spesifik)

Contoh kasus kita ingin data `Classes` (Parent) otomatis melakukan simpan, update, reload dan detach, tapi **tidak ingin** otomatis menghapus data `Teacher` (Child). Karena dalam kasus ini secara logika ketika kelas(`Classes`) dihapus data guru(`Teacher`) jangan ikut terhapus, karena bisa saja guru suatu saat akan menjadi walikelas di kelas lain. 

![Hibernate](/img/hibernate/one-to-one-cascade-delete.png)

### ⚙️ Setup Entity

* Pada bagian `cascade`, `CascadeType` harus diisi manual secara spesifik, disini kita **tidak memasukan** `CascadeType.REMOVE`.

```java
@OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
@JoinColumn(name = "teacher_id")
private Teacher teacher;
```

* **Efek**: Menyimpan, update, reload dan detach pada kelas(`Classes`) akan otomatis terjadi juga pada guru(`Teacher`). Namun, menghapus kelas(`Classes`) **tidak akan menghapus** gurunya(`Teacher`). Ini lebih aman untuk data referensi seperti Guru.

### 🔁 Setup DAO

* Pada Interface DAO:

```java
public interface SchoolDAO {

	// ...

	void deleteClassesById(Integer id);
	
	// ...
}
```

* Implementasi DAO:

```java
@Override
@Transactional
public void deleteClassesById(Integer id) {
	Classes classes = entityManager.find(Classes.class, id);
	
	// remove the associated object reference and break bi-directional link
	classes.getTeacher().setClasses(null);
			
	entityManager.remove(classes);	
}
```

### 🏃 Main App

* Kita akan melakukan penghapusan data dimana ketika menghapus data pada `Classes` **tidak akan menghapus** data pada `Teacher`.
* Contoh kita punya data `Teacher` dan `Classes` dalam databases:

```
mysql> select * from teacher;
+----+------------+-----------+
| id | first_name | last_name |
+----+------------+-----------+
|  1 | Andi       | Fahrum    |
|  3 | Beddu      | Kendeng   |
+----+------------+-----------+
2 rows in set (0.00 sec)

mysql> select * from classes;
+----+------------+------------+
| id | class_name | teacher_id |
+----+------------+------------+
|  1 | Kelas 9    |          1 |
|  3 | Kelas 11   |          3 |
+----+------------+------------+
```

* Pada Class Main kita akan mencoba menghapus data `Classes` dengan ID 1, maka seharusnya data `Teacher` terkait **tidak akan terhapus**:

```java
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	// Bean ini akan dieksekusi di command line
	@Bean
	public CommandLineRunner commandLineRunner(SchoolDAO dao) {
		return runner -> {

			deleteClasses(dao);
			
		};
	}

	private void deleteClasses(SchoolDAO dao) {
		Integer id = 1;
		dao.deleteClassesById(id);
		System.out.println("Classes deleted with id " + id);
	}
}
```

* Output Hibernate SQL:

```
Hibernate: select c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name from classes c1_0 left join teacher t1_0 on t1_0.id=c1_0.teacher_id where c1_0.id=?
Hibernate: delete from classes where id=?
Classes deleted with id 1
```

* Cek data dalam database:

```
mysql> select * from teacher;
+----+------------+-----------+
| id | first_name | last_name |
+----+------------+-----------+
|  1 | Andi       | Fahrum    |
|  3 | Beddu      | Kendeng   |
+----+------------+-----------+
2 rows in set (0.00 sec)

mysql> select * from classes;
+----+------------+------------+
| id | class_name | teacher_id |
+----+------------+------------+
|  3 | Kelas 11   |          3 |
+----+------------+------------+
1 row in set (0.00 sec)
```

* Dapat terlihat di atas bahwa data pada tabel `Teacher` tetap ada walaupun data pada tabel `Classes` dengan id 1 sudah terhapus.

## 🔥 Kesimpulan: Kapan Harus Menggunakan Cascading?

1. **Gunakan Cascading** jika ada hubungan ketergantungan yang kuat (Parent-Child).
	* *Contoh*: Menghapus sebuah `Account` maka harus menghapus `AccountSettings`.
2. **Jangan Gunakan Cascading REMOVE** jika data Child masih dibutuhkan oleh entitas lain atau merupakan data master.
	* Contoh: Jangan hapus Guru (`Teacher`) hanya karena kelasnya (`Classes`) dibubarkan, karena Guru (`Teacher`) tersebut mungkin mengajar di kelas (`Classes`) lain.	

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-jpa-hibernate-advance/tree/main/03-hibernate-one-to-one-bi-directional-delete-cascade
:::
