---
sidebar_position: 4
title: 'Read Data'
---

Membaca data (Read) menggunakan JPA/Hibernate dapat dilakukan dengan beberapa cara, mulai dari yang paling otomatis hingga yang paling fleksibel (manual). Pada tutorial ini kita akan menggunakan `EntityManager` (Cara Manual/DAO).

### 1️⃣ Repository / DAO

* Menambahkan method baru untuk menampilkan data berdasarkan ID:

```java
public interface StudentDAO {

    void save(Student student);
	
    Student findById(Long id);
}
```

* Implementasi DAO:

```java
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
		
}
```

:::info
Anotasi `@Transactional(readOnly = true)` adalah instruksi kepada Spring dan Hibernate bahwa transaksi yang dilakukan hanya bersifat "read only" dan tidak akan ada perubahan data (INSERT, UPDATE, DELETE) ke database.

Ini adalah **best practice**, karena berdampak besar pada kecepatan aplikasi saat menangani banyak request sekaligus.
:::

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

		readStudent(studentDAO);
			
		};
	}
	
	private void readStudent(StudentDAO studentDAO) {
		// create student
		System.out.println("Create Student");
		Student student = new Student("Inaya", "Rusli", "inay@gmail.com");
		
		// save student
		System.out.println("Save Student");
		studentDAO.save(student);
		
		// display id
		Long id = student.getId();
		System.out.println("Student saved with id = " + id);
		
		// load id form database
		System.out.println("Search student form database with id: " + id);
		Student studentSearch = studentDAO.findById(id);
		
		// display student
		System.out.println("Found student: " + studentSearch.toString());
	}
}
```

* Jika sukses maka outputnya sebagai berikut:

```
Create Student
Save Student
Hibernate: insert into student (email,first_name,last_name) values (?,?,?)
Student saved with id = 6
Search student form database with id: 6
Hibernate: select s1_0.id,s1_0.email,s1_0.first_name,s1_0.last_name from student s1_0 where s1_0.id=?
Found student: Student [id=6, firstName=Inaya, lastName=Rusli, email=inay@gmail.com]
```
