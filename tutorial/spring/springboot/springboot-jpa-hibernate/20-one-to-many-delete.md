---
sidebar_position: 20
title: 'One-to-Many Delete'
---

![Hibernate](/img/hibernate/one-to-many2.png)

Dalam materi kita akan membahas penghapusan data dalam relasi tabel **One-to-Many**. Pembahasan materi delete ini akan dibahas dari sisi parrent(`Classes`) dan delete dari sisi child(`Student`).

## 1️⃣ Entity Parrent: `Classes.java`

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

## 3️⃣ Delete Parrent `Classes` 

Pada contoh kasus ini kita akan menghapus data `Classes` tanpa menghapus data dalam `Student` yang terkait. Step-by-step delete data `Classes`:

* Mencari **Classes** ID.
* Memutuskan hubungan dengan **Student** yang terkait dengan **Classes** tersebut.
* Menghapus **Classes**.


### 🛢️ Update Repository / DAO

* Pada Implementasi DAO kita akan merubah `deleteClassesById`:

```java
@Repository
public class SchoolDAOImpl implements SchoolDAO {

	private EntityManager entityManager;
	
	public SchoolDAOImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public void deleteClassesById(Integer id) {
		Classes classes = entityManager.find(Classes.class, id);
		List<Student> students = classes.getStudents();
		
		// menghapus semua referensi Classes dalam data Student sebelum dihapus
		for (Student student : students) {
			student.setClasses(null);
		}
		
		// hapus referensi objek terkait dan putuskan tautan bi-directiona
		classes.getTeacher().setClasses(null);
				
		entityManager.remove(classes);	
	}

	// Implementasi method Lainnya

}
```

### ▶️ Main Class

* Studi kasus kita memiliki data dalam database sbb:

```

mysql> select * from teacher;
+----+------------+-----------+
| id | first_name | last_name |
+----+------------+-----------+
|  1 | Inti       | Astuti    |
|  2 | Hatake     | Kakashi   |
|  3 | John       | Chena     |
+----+------------+-----------+

mysql> select * from classes;
+----+------------+------------+
| id | class_name | teacher_id |
+----+------------+------------+
|  2 | Kelas 12   |          1 |
|  3 | Kelas 11   |          2 |
|  5 | Kelas 10   |          3 |
+----+------------+------------+

mysql> select * from student;
+----+------------+-----------+----------+
| id | first_name | last_name | class_id |
+----+------------+-----------+----------+
|  1 | John       | Key       |        5 |
|  2 | Abu        | Nawas     |        5 |
|  4 | Indra      | Birowo    |        2 |
|  5 | Ibnu       | Jamil     |        2 |
|  6 | Tora       | Sudiro    |        2 |
|  7 | Uzumaki    | Naruto    |        3 |
|  8 | Uciha      | Sazuke    |        3 |
|  9 | Rock       | Lee       |        3 |
+----+------------+-----------+----------+
```

Kita akan menghapus data `Classes` dengan id 5, dan data pada `Student` terkait **tidak ikut terhapus**.

* Pada main class application kita akan menghapus data `Classes` yang memiliki id 5:

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
		Integer id = 5;
		dao.deleteClassesById(id);
		System.out.println("Classes deleted with id " + id);
	}
}
```

* Output pada Hibernate SQL:

```sql
Hibernate: select c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name from classes c1_0 left join teacher t1_0 on t1_0.id=c1_0.teacher_id where c1_0.id=?
Hibernate: select s1_0.class_id,s1_0.id,s1_0.first_name,s1_0.last_name from student s1_0 where s1_0.class_id=?
Hibernate: update student set class_id=?,first_name=?,last_name=? where id=?
Hibernate: update student set class_id=?,first_name=?,last_name=? where id=?
Hibernate: delete from classes where id=?
Classes deleted with id 5
```

* Cek perubahan dalam database, data `Clases` dengan id 5 seharusnya sudah terhapus.

```
mysql> select * from classes;
+----+------------+------------+
| id | class_name | teacher_id |
+----+------------+------------+
|  2 | Kelas 12   |          1 |
|  3 | Kelas 11   |          2 |
+----+------------+------------+

mysql> select * from student;
+----+------------+-----------+----------+
| id | first_name | last_name | class_id |
+----+------------+-----------+----------+
|  1 | John       | Key       |     NULL |
|  2 | Abu        | Nawas     |     NULL |
|  4 | Indra      | Birowo    |        2 |
|  5 | Ibnu       | Jamil     |        2 |
|  6 | Tora       | Sudiro    |        2 |
|  7 | Uzumaki    | Naruto    |        3 |
|  8 | Uciha      | Sazuke    |        3 |
|  9 | Rock       | Lee       |        3 |
+----+------------+-----------+----------+
```

## 4️⃣ Delete Child `Student` 

Pada contoh kasus ini kita akan menghapus data `Student`, tanpa menghapus data `Classes` terkait.

### 🛢️ Repository / DAO

* Menambahkan method baru pada interface DAO dengan menambahkan method `deleteStudentById` untuk menghandle menghapus data `Student`:

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
	
	void deleteStudentById(Integer id);
	
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
	public void deleteStudentById(Integer id) {
		entityManager.remove(entityManager.find(Student.class, id));	
	}

	// Implementasi method Lainnya

}
```

### ▶️ Main Class

* Pada main class application kita akan menghapus data `Student` yang memiliki id 5:

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
			
			deleteStudent(dao);
			
		};
	}

	private void deleteStudent(SchoolDAO dao) {
		int id = 5;
		dao.deleteStudentById(id);		
	}
}
```

* Output pada Hibernate SQL:

```sql
Hibernate: select s1_0.id,c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name,s1_0.first_name,s1_0.last_name from student s1_0 left join classes c1_0 on c1_0.id=s1_0.class_id left join teacher t1_0 on t1_0.id=c1_0.teacher_id where s1_0.id=?
Hibernate: delete from student where id=?
```

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-jpa-hibernate-advance/tree/main/09-hibernate-one-to-many-delete
:::
