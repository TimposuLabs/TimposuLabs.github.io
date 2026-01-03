---
sidebar_position: 15
title: 'One-to-Many Create'
---

![Hibernate](/img/hibernate/one-to-many2.png)

Pada meteri sebelumnya kita sudah memiliki Entity:

## 1️⃣ Entity Student (Sisi "Many" / Owner)

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

## 2️⃣ Entity Classes (Sisi "One" / Inverse)

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

## 3️⃣ Main Class

* Pada main class application kita akan membuat `Classes` dengan berisi data `Student`:

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
			
			createClassWithStudent(dao);
			
		};
	}

	private void createClassWithStudent(SchoolDAO dao) {
		Teacher teacher = new Teacher("Hatake", "Kakashi");
		
		Classes class10 = new Classes("Kelas 10", teacher);
		
		Student naruto = new Student("Uzumaki", "Naruto");
		Student sasuke = new Student("Uciha", "Sazuke");
		Student sakura = new Student("Haruno", "Sakura");
		
		class10.add(naruto);
		class10.add(sasuke);
		class10.add(sakura);
		
		dao.saveClasses(class10);
		
		System.out.println("Saved classes: " + class10);
		System.out.println("List student: " + class10.getStudents());
	}

}
```

* Output pada Hibernate SQL:

```sql
Hibernate: insert into teacher (first_name,last_name) values (?,?)
Hibernate: insert into classes (class_name,teacher_id) values (?,?)
Hibernate: insert into student (class_id,first_name,last_name) values (?,?,?)
Hibernate: insert into student (class_id,first_name,last_name) values (?,?,?)
Hibernate: insert into student (class_id,first_name,last_name) values (?,?,?)
Saved classes: Class [id=4, className=Kelas 10, teacher=Guru [id=4, firstName=Hatake, lastName=Kakashi]]
List student: [Student [id=7, firstName=Uzumaki, lastName=Naruto], Student [id=8, firstName=Uciha, lastName=Sazuke], Student [id=9, firstName=Haruno, lastName=Sakura]]
```

* Cek pada databases:

```
mysql> select * from classes;
+----+------------+------------+
| id | class_name | teacher_id |
+----+------------+------------+
|  1 | Kelas 10   |          5 |
+----+------------+------------+
1 row in set (0.00 sec)

mysql> select * from student;
+----+------------+-----------+----------+
| id | first_name | last_name | class_id |
+----+------------+-----------+----------+
|  1 | Uzumaki    | Naruto    |        1 |
|  2 | Uciha      | Sazuke    |        1 |
|  3 | Haruno     | Sakura    |        1 |
+----+------------+-----------+----------+
3 rows in set (0.01 sec)
```
