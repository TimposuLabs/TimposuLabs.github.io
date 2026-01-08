---
sidebar_position: 19
title: 'One-to-Many Update'
---

![Hibernate](/img/hibernate/one-to-many2.png)

Operasi *update* pada kasus relasi `Classes` dan `Student`, akan menggunakan methode `merge()` dan mekanisme *Dirty Checking* otomatis yang memungkinkan pembaruan data secara efisien tanpa harus menulis query SQL manual, sekaligus memastikan perubahan tersinkronisasi secara dua arah (*bi-directional*).

Pembahasan materi update ini akan dibahas dari sisi parrent(`Classes`) dan update dari sisi child(`Student`).

## 1️⃣ Entity Parrent: `Classes.java`

Ubah fetch type menjadi **Lazy** `fetch = FetchType.LAZY`:

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
	
	@OneToMany(
		mappedBy = "classes",
		fetch = FetchType.LAZY,
		cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	List<Student> students = new ArrayList<>();

	// Setter & Getter

}
```

## 2️⃣ Entity Child: `Student.java`

Sisi `@ManyToOne` secara default bersifat **EAGER**, pada kasus ini kita tidak perlu mengubahnya kecuali kita ingin menjadikannya **LAZY**.

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

## 3️⃣ Update Parrent `Classes` 

### 🛢️ Repository / DAO

* Menambahkan method baru pada interface DAO dengan menambahkan method `updateClasses(Classes classes)`:

```java
public interface SchoolDAO {

	void saveClasses(Classes classes);
	
	Classes findClassById(Integer id);
	
	void deleteClassesById(Integer id);
	
	Teacher findTeacherById(Integer id);
	
	void deleteTeacherById(Integer id);
	
	List<Student> findStudentByClassId(Integer id);
	
	Classes findClassesByIdJoinFetch(Integer id);
	
	void updateClasses(Classes classes);
	
}
```

* Implementasi DAO:

```java
@Repository
public class SchoolDAOImpl implements SchoolDAO {

	private EntityManager entityManager;
	
	public SchoolDAOImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public void updateClasses(Classes classes) {
		entityManager.merge(classes);	
	}

	// Implementasi method Lainnya

}
```

### ▶️ Main Class

* Pada main class application kita akan mengubah data `Classes` yang memiliki id 3:

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
			
			updateClasses(dao);
			
		};
	}

	private void updateClasses(SchoolDAO dao) {
		int id = 3;
		
		Classes classes = dao.findClassesByIdJoinFetch(id);
		classes.setClassName("Kelas 12");
		dao.updateClasses(classes);		
	}
}
```

* Output pada Hibernate SQL:

```sql
Hibernate: select c1_0.id,c1_0.class_name,s1_0.class_id,s1_0.id,s1_0.first_name,s1_0.last_name,t1_0.id,t1_0.first_name,t1_0.last_name from classes c1_0 join student s1_0 on c1_0.id=s1_0.class_id join teacher t1_0 on t1_0.id=c1_0.teacher_id where c1_0.id=?
Hibernate: select c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name,s1_0.class_id,s1_0.id,s1_0.first_name,s1_0.last_name from classes c1_0 left join teacher t1_0 on t1_0.id=c1_0.teacher_id left join student s1_0 on c1_0.id=s1_0.class_id where c1_0.id=?
Hibernate: update classes set class_name=?,teacher_id=? where id=?
```

* Cek perubahan dalam database dengan id 3.

```
mysql> select * from classes;

+----+------------+------------+
| id | class_name | teacher_id |
+----+------------+------------+
|  3 | Kelas 12   |          2 |
+----+------------+------------+
```

## 4️⃣ Update Child `Student` 

### 🛢️ Repository / DAO

* Menambahkan method baru pada interface DAO dengan menambahkan method `findStudentById(Integer id)` dan `updateStudent(Student student)` untuk menghandle update data `Student`:

```java
public interface SchoolDAO {

	void saveClasses(Classes classes);
	
	Classes findClassById(Integer id);
	
	void deleteClassesById(Integer id);
	
	Teacher findTeacherById(Integer id);
	
	void deleteTeacherById(Integer id);
	
	List<Student> findStudentByClassId(Integer id);
	
	Classes findClassesByIdJoinFetch(Integer id);
	
	void updateClasses(Classes classes);

	Student findStudentById(Integer id);
	
	void updateStudent(Student student);
	
}
```

* Implementasi DAO:

```java
@Repository
public class SchoolDAOImpl implements SchoolDAO {

	private EntityManager entityManager;
	
	public SchoolDAOImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	// handle update data Classes
	@Override
	@Transactional
	public void updateClasses(Classes classes) {
		entityManager.merge(classes);	
	}

	// handle update data Student
	@Override
	@Transactional(readOnly = true)
	public Student findStudentById(Integer id) {
		return entityManager.find(Student.class, id);
	}
	
	@Override
	@Transactional
	public void updateStudent(Student student) {
		entityManager.merge(student);
	}

	// Implementasi method Lainnya

}
```

### ▶️ Main Class

* Pada main class application kita akan mengubah data `Student` yang memiliki id 9:

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
			
			updateStudent(dao);

		};
	}

	private void updateStudent(SchoolDAO dao) {
		int id = 9;
		
		Student student = dao.findStudentById(id);
		student.setFirstName("Rock");
		student.setLastName("Lee");
		dao.updateStudent(student);
	}
}
```

* Output pada Hibernate SQL:

```sql
Hibernate: select s1_0.id,c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name,s1_0.first_name,s1_0.last_name from student s1_0 left join classes c1_0 on c1_0.id=s1_0.class_id left join teacher t1_0 on t1_0.id=c1_0.teacher_id where s1_0.id=?
Hibernate: select s1_0.id,c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name,s1_0.first_name,s1_0.last_name from student s1_0 left join classes c1_0 on c1_0.id=s1_0.class_id left join teacher t1_0 on t1_0.id=c1_0.teacher_id where s1_0.id=?
Hibernate: select s1_0.class_id,s1_0.id,s1_0.first_name,s1_0.last_name from student s1_0 where s1_0.class_id=?
Hibernate: update student set class_id=?,first_name=?,last_name=? where id=?
```

* Cek perubahan dalam database, dalam tabel `Student` data dengan id 9 sudah berubah.

```
mysql> select * from student;
+----+------------+-----------+----------+
| id | first_name | last_name | class_id |
+----+------------+-----------+----------+
|  7 | Uzumaki    | Naruto    |        3 |
|  8 | Uciha      | Sazuke    |        3 |
|  9 | Rock       | Lee       |        3 |
+----+------------+-----------+----------+
```

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-jpa-hibernate-advance/tree/main/08-hibernate-one-to-many-update
:::
