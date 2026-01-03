---
sidebar_position: 3
title: 'Create Data'
---

Menyimpan data ke database (CREATE) menggunakan Hibernate melibatkan pengubahan objek Java (Entity) menjadi baris baru dalam tabel database.

### 1️⃣ Entity

Kita akan menggunakan entity `Student` yang telah kita bahas sebelumnya.

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

### 2️⃣ Repository / DAO

Kita akan membuat Layer `Repository` atau DAO (Data Access Object) yang nantinya akan berinteraksi ke database.

* Interface `StudentDAO`:

```java
import com.timposulabs.belajar.entity.Student;

public interface StudentDAO {

	void save(Student student);
}
```

* Selanjutnya membuat implementasi `StudentDAO` yaitu `StudentDAOImpl` dengan memberikan anotasi `@Repository` untuk memberitahu Spring bahwa ini adalah Repository:

```java
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.timposulabs.belajar.entity.Student;

import jakarta.persistence.EntityManager;

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
	
}
```

#### ✍️ Penjelasan

Berikut adalah penjelasan detail mengenai kode `StudentDAOImpl` yang menggunakan pendekatan manual (Low-Level) dengan `EntityManager`, yang merupakan inti dari cara kerja Hibernate di balik layar.

**1. `@Repository`**

    * **Fungsi**: Menandai kelas ini sebagai komponen pendukung akses data (DAO/Data Access Object).
    * **Peran**: Memberitahu Spring untuk mengelola kelas ini sebagai *Bean*. Selain itu, Spring akan secara otomatis menerjemahkan pengecualian (exception) database yang kompleks menjadi pengecualian yang lebih mudah dipahami oleh pengembang Java.

**2. `@Transactional`**

    * **Fungsi**: Mengelola transaksi database secara otomatis.
    * **Peran**: Setiap kali metode `save` dipanggil, Spring akan memulai transaksi baru. Jika proses berhasil, transaksi akan di-**commit** (disimpan permanen). Jika terjadi error, transaksi akan di-**rollback** (dibatalkan), sehingga integritas data terjaga dan tidak ada data "setengah jadi" di database.

**3. `EntityManager`**

    * **Fungsi**: Ini adalah Interface utama di JPA/Hibernate untuk berinteraksi dengan database.
    * **Peran**: `EntityManager` bertanggung jawab untuk mengelola siklus hidup entitas (seperti menyimpan, mencari, atau menghapus objek). Di sini, Spring secara otomatis menyuntikkan (inject) `EntityManager` yang sudah dikonfigurasi melalui **Constructor Injection**.

**4. `entityManager.persist(student)`**

    * **Fungsi**: Metode utama untuk melakukan operasi **Create**.
    * **Cara Kerja**:
        * Mengubah status objek `student` dari *Transient* (hanya ada di memori Java) menjadi *Managed/Persistent* (dikelola oleh Hibernate).
        * Hibernate kemudian akan menyusun perintah SQL `INSERT INTO student ...` untuk dijalankan di database.

### 3️⃣ Main Class

* Selanjutnya pada main class kita akan menjalankan proses penyimpanan data:

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
			
			createStudent(studentDAO);
			
		};
	}
	
	private void createStudent(StudentDAO studentDAO) {
		System.out.println("Creating Student...");
		Student student = new Student("Ucup", "Topekox", "ucup@gmail.com");
		studentDAO.save(student);
		System.out.println("Saved student.. with id " + student.getId());
	}
}
```

* Jika sukses makan akan menghasilkan output command line:

```
Creating Student...
Hibernate: insert into student (email,first_name,last_name) values (?,?,?)
Saved student.. with id 1
```

* Cek Database:

```
mysql> select * from student;
+----+----------------+------------+-----------+
| id | email          | first_name | last_name |
+----+----------------+------------+-----------+
|  1 | ucup@gmail.com | Ucup       | Topekox   |
+----+----------------+------------+-----------+
1 row in set (0.01 sec)
```

* Untuk membuat multiple save data kita dapat membuat method baru:

```java
@Bean
public CommandLineRunner commandLineRunner(StudentDAO studentDAO) {
    return runner -> {
        
        createMultipleStudent(studentDAO);

    };
}
    
private void createMultipleStudent(StudentDAO studentDAO) {
    System.out.println("Creating Student...");
    Student student1 = new Student("Ade", "Agustian", "adep@gmail.com");
    Student student2 = new Student("Azwar", "Anas", "azwar@gmail.com");
    Student student3 = new Student("Abdul", "Munir", "munir@gmail.com");
    Student student4 = new Student("Made", "Cantika", "cantika@gmail.com");
    
    studentDAO.save(student1);
    studentDAO.save(student2);
    studentDAO.save(student3);
    studentDAO.save(student4);
    
    System.out.println("Saved multiple student.. " + List.of(student1.toString(), student2.toString(), student3.toString(), student4).toString());
}
```

* Jika sukses makan akan menghasilkan output command line:

```
Creating Student...
Hibernate: insert into student (email,first_name,last_name) values (?,?,?)
Hibernate: insert into student (email,first_name,last_name) values (?,?,?)
Hibernate: insert into student (email,first_name,last_name) values (?,?,?)
Hibernate: insert into student (email,first_name,last_name) values (?,?,?)
Saved multiple student.. [Student [id=2, firstName=Ade, lastName=Agustian, email=adep@gmail.com], Student [id=3, firstName=Azwar, lastName=Anas, email=azwar@gmail.com], Student [id=4, firstName=Abdul, lastName=Munir, email=munir@gmail.com], Student [id=5, firstName=Made, lastName=Cantika, email=cantika@gmail.com]]
```

* Cek Database:

```
mysql> select * from student;
+----+-------------------+------------+-----------+
| id | email             | first_name | last_name |
+----+-------------------+------------+-----------+
|  1 | ucup@gmail.com    | Ucup       | Topekox   |
|  2 | adep@gmail.com    | Ade        | Agustian  |
|  3 | azwar@gmail.com   | Azwar      | Anas      |
|  4 | munir@gmail.com   | Abdul      | Munir     |
|  5 | cantika@gmail.com | Made       | Cantika   |
+----+-------------------+------------+-----------+
5 rows in set (0.00 sec)
```
