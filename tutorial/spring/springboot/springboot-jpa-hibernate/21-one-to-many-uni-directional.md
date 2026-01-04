---
sidebar_position: 21
title: 'One-to-Many Uni-Directional'
---

Pada materi **One-to-Many** sebelumnya, yang kita gunakan adalah **Bi-directional** (dua arah). Pada materi ini kita akan membahas **One-to-Many Uni-directional** (satu arah) menggunakan studi kasus `Student` dan `Grade` (Nilai).

![Hibernate](/img/hibernate/one-to-many-uni-directional.png)

## 📌 Konsep Dasar

Dalam relasi **Uni-directional** (Satu Arah), hanya satu entity yang memiliki referensi ke entity lain.

* **Studi Kasus**: Satu **Siswa** (`Student`) memiliki banyak **Nilai** (`Grade`).
* **Logika**: Objek `Student` akan memiliki daftar `Grade`, namun objek `Grade` tidak tahu siapa pemiliknya (tidak ada field `Student` di dalam class `Grade`).

![Hibernate](/img/hibernate/one-to-many-uni-directional2.png)

## 📅 Struktur Tabel (Database)

Secara fisik di database, Hibernate akan menempatkan *Foreign Key* pada tabel `grade`.

![Hibernate](/img/hibernate/one-to-many-uni-directional3.png)


## 🚀 Implementasi

### 1️⃣ Entity Child: `Grade.java`

```java
@Entity
@Table(name = "grade")
public class Grade {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "subject_name")
	private String subjectName;
	
	@Column(name = "score")
	private Double score;
	
	@ManyToOne
	@JoinColumn(name = "student_id")
	private Student student;

	public Grade() { }
	
	public Grade(String subjectName, Double score) {
		this.subjectName = subjectName;
		this.score = score;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	public Double getScore() {
		return score;
	}

	public void setScore(Double score) {
		this.score = score;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	@Override
	public String toString() {
		return "Grade [id=" + id + ", subjectName=" + subjectName + ", score=" + score + "]";
	}
}
```

### 2️⃣ Entity Parent: `Student.java`

Sisi ini yang mengelola relasi menggunakan `@JoinColumn`.

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
	
	@OneToMany(
		fetch = FetchType.LAZY,
		mappedBy = "student",
		cascade = CascadeType.ALL)
	private List<Grade> grades = new ArrayList<>();
	
	public Student() {		
	}

	public Student(String firstName, String lastName) {
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
	
	public Classes getClasses() {
		return classes;
	}

	public void setClasses(Classes classes) {
		this.classes = classes;
	}

	public List<Grade> getGrades() {
		return grades;
	}

	public void setGrades(List<Grade> grades) {
		this.grades = grades;
	}

	public void addGrade(Grade grade) {
		if (grades == null) {
			grades = new ArrayList<>();
		}
		
		grades.add(grade);
		
		if (grade != null) {
			grade.setStudent(this);
		}
	}
	
	@Override
	public String toString() {
		return "Student [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + "]";
	}
}
```

### 3️⃣ Implementasi DAO CRUD

* Pada contoh kasus ini kita akan menyimpan data `Student` sekaligus dengan `Grade`-nya dengan menambahkan method `saveStudentWithGrade`:

```java
public interface SchoolDAO {

	void saveStudentWithGrade(Student student);

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
	public void saveStudentWithGrade(Student student) {
		entityManager.persist(student);
	}

	// Implementasi method lainnnya...

}
```

### ▶️ Main Class

Kita akan menghapus data `Classes` dengan id 5, dan data pada `Student` terkait **tidak ikut terhapus**.

* Pada main class application kita akan menyimpan data `Student` sekaligus dengan `Grade`:

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
			
			createStudentWithGrade(dao);
			
		};
	}

	private void createStudentWithGrade(SchoolDAO dao) {
		Student student = new Student("Shino", "Aburame");
		
		student.addGrade(new Grade("Matematika", 80.5));
		student.addGrade(new Grade("Pendidikan Jasmani", 87.5));
		student.addGrade(new Grade("Biologi", 90.2));
	
		dao.saveStudentWithGrade(student);
		
		System.out.println("Saved Student");
		System.out.println("Student: " + student);
		System.out.println("Grade: " + student.getGrades());
	}
}
```

* Output pada Hibernate SQL:

```sql
Hibernate: create table grade (id integer not null auto_increment, score float(53), subject_name varchar(255), student_id integer, primary key (id)) engine=InnoDB
Hibernate: alter table grade add constraint FK5secqnjjwgh9wxk4h1xwgj1n0 foreign key (student_id) references student (id)
Hibernate: insert into student (class_id,first_name,last_name) values (?,?,?)
Hibernate: insert into grade (score,student_id,subject_name) values (?,?,?)
Hibernate: insert into grade (score,student_id,subject_name) values (?,?,?)
Hibernate: insert into grade (score,student_id,subject_name) values (?,?,?)
Saved Student
Student: Student [id=4, firstName=Shino, lastName=Aburame]
Grade: [Grade [id=1, subjectName=Matematika, score=80.5], Grade [id=2, subjectName=Pendidikan Jasmani, score=87.5], Grade [id=3, subjectName=Biologi, score=90.2]]
```

* Cek perubahan dalam database.

```
mysql> select *  from student;
+----+------------+-----------+----------+
| id | first_name | last_name | class_id |
+----+------------+-----------+----------+
|  1 | Uzumaki    | Naruto    |        1 |
|  2 | Uciha      | Sazuke    |        1 |
|  3 | Haruno     | Sakura    |        1 |
|  4 | Shino      | Aburame   |     NULL |
+----+------------+-----------+----------+

mysql> select *  from grade;
+----+-------+--------------------+------------+
| id | score | subject_name       | student_id |
+----+-------+--------------------+------------+
|  1 |  80.5 | Matematika         |          4 |
|  2 |  87.5 | Pendidikan Jasmani |          4 |
|  3 |  90.2 | Biologi            |          4 |
+----+-------+--------------------+------------+
```
