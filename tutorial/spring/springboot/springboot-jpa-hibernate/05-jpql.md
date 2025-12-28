---
sidebar_position: 5
title: 'JPQL'
---

**JPQL (Java Persistence Query Language)** adalah bahasa queri berorientasi objek yang digunakan untuk melakukan operasi pada database dalam ekosistem Java Persistence API (JPA) dan Hibernate.

Meskipun terlihat sangat mirip dengan SQL (Structured Query Language), JPQL memiliki perbedaan mendasar dalam cara kerjanya. Berikut adalah poin-poin penting untuk memahaminya:

#### 1. Berorientasi Objek, Bukan Tabel

Perbedaan utama JPQL dengan SQL adalah apa yang "diajak bicara":

* **SQL**: Berinteraksi langsung dengan tabel dan kolom di database.
* **JPQL**: Berinteraksi dengan **Class Entity** dan atribut/field di Java.

Contoh Perbandingan:

* **SQL**: `SELECT * FROM tbl_student WHERE first_name = 'Budi'`;
* **JPQL**: `SELECT s FROM Student s WHERE s.firstName = 'Budi'`;
*(Perhatikan bahwa `Student` merujuk pada nama Class Java, dan `firstName` merujuk pada variabel di kelas tersebut).*

#### 2. Fitur Utama JPQL

* **Database Independent**: Anda menulis satu kueri JPQL, dan Hibernate akan otomatis menerjemahkannya ke dialek database apa pun yang Anda gunakan (MySQL, PostgreSQL, Oracle, dll).
* **Case Sensitive** (untuk Nama Kelas): JPQL tidak peduli jika kata kunci seperti `SELECT atau FROM` ditulis huruf kecil, tetapi **sangat peduli** pada nama kelas dan atribut. `Student` tidak sama dengan `student`.
* **Mendukung Relasi Objek**: JPQL sangat kuat dalam menangani hubungan antar objek (seperti `JOIN`) karena dapat memahami mapping `@OneToMany` atau `@ManyToOne`.

#### 3. Cara Kerja di Belakang Layar
Saat Anda menjalankan kueri JPQL, prosesnya adalah:

1. **Aplikasi** mengirim queri JPQL ke **EntityManager**.
2. **Hibernate/JPA Provider** menerjemahkan JPQL tersebut menjadi **SQL Murni** berdasarkan database yang terhubung.
3. **Database** mengeksekusi SQL tersebut dan mengembalikan hasilnya.
4. **Hibernate** mengubah hasil (baris database) kembali menjadi **Object Java (Entity)**.

#### 4. Contoh Penulisan JPQL Modern

Penulisan JPQL sering kali disingkat untuk kemudahan:

* **Mengambil semua data**:
	* `FROM Student` (Secara otomatis dianggap `SELECT s FROM Student s`).

* **Pencarian dengan parameter (Aman dari SQL Injection)**:
	* `SELECT s FROM Student s WHERE s.email = :emailParameter`

* **Update data massal**:
	* `UPDATE Student s SET s.lastName = 'Sanjaya' WHERE s.id = 1`

JPQL adalah "bahasa jembatan" yang memungkinkan Anda tetap berpikir sebagai programmer Java (berbasis objek) tanpa harus terlalu pusing dengan detail sintaksis database yang berbeda-beda.

---

Pada [tutorial sebelumnya](/spring/springboot/springboot-jpa-hibernate/read-data) kita akan menggunakan `EntityManager` untuk mengambil satu baris data jika Anda sudah tahu ID-nya. Jika ingin mengambil semua data atau data dengan kriteria tertentu, kita bisa menggunakan **JPQL (Java Persistence Query Language)**. JPQL mirip SQL, tetapi ia mereferensikan **Nama Class/Entity**, bukan nama tabel database

### 1️⃣ Repository / DAO

* Menambahkan method baru pada interface DAO dengan menambahkan method `findAll` dan `findByLastName`:

```java
public interface StudentDAO {

	void save(Student student);
	
	Student findById(Long id);
	
	List<Student> findAll();
	
	List<Student> findByLastName(String lastName);
}
```

* Implementasi DAO:

```java
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.timposulabs.belajar.entity.Student;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Repository
public class StudentDAOImpl implements StudentDAO {

	private EntityManager entityManager;
	
	public StudentDAOImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public void save(Student student) {
		entityManager.persist(student);
	}

	@Override
	@Transactional(readOnly = true)
	public Student findById(Long id) {
		return entityManager.find(Student.class, id);
	}
		
	@Override
	@Transactional(readOnly = true)
	public List<Student> findAll() {		
		TypedQuery<Student> query = entityManager.createQuery("FROM Student ORDER BY lastName asc", Student.class);	// jika query berupa update data (CREATE, UPDATE, DELETE) tambhakan method 'executeUpdate()'
		return query.getResultList();
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<Student> findByLastName(String lastName) {
		TypedQuery<Student> query = entityManager.createQuery("FROM Student WHERE lastName=:theLastName", Student.class);
		query.setParameter("theLastName", lastName);
		return query.getResultList();
	}
}
```

### 2️⃣ Main Class

* Selanjutnya pada main class kita akan menjalankan proses read data:

```java
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	// Method ini akan mencetak di command line
	@Bean
	public CommandLineRunner commandLineRunner(StudentDAO studentDAO) {
		return runner -> {

			findAllQuery(studentDAO);
			
			findStudentByLastName(studentDAO);
			
		};
	}
	
	private void findAllQuery(StudentDAO studentDAO) {
		List<Student> studentList = studentDAO.findAll();
		
		for (var student : studentList) {
			System.out.println(student);
		}
	}

	private void findStudentByLastName(StudentDAO studentDAO) {
		List<Student> studentList = studentDAO.findByLastName("Topekox");
		
		for (var student : studentList) {
			System.out.println(student);
		}		
	}
}
```

* Jika sukses maka outputnya sebagai berikut:

```
Hibernate: select s1_0.id,s1_0.email,s1_0.first_name,s1_0.last_name from student s1_0 order by s1_0.last_name
Menampilkan semua data student: 
Student [id=2, firstName=Ade, lastName=Agustian, email=adep@gmail.com]
Student [id=3, firstName=Azwar, lastName=Anas, email=azwar@gmail.com]
Student [id=5, firstName=Made, lastName=Cantika, email=cantika@gmail.com]
Student [id=4, firstName=Abdul, lastName=Munir, email=munir@gmail.com]
Student [id=6, firstName=Inaya, lastName=Rusli, email=inay@gmail.com]
Student [id=1, firstName=Ucup, lastName=Topekox, email=ucup@gmail.com]
Hibernate: select s1_0.id,s1_0.email,s1_0.first_name,s1_0.last_name from student s1_0 where s1_0.last_name=?
Menampilkan semua data student dengan by Lastname:
Student [id=1, firstName=Ucup, lastName=Topekox, email=ucup@gmail.com]
```
