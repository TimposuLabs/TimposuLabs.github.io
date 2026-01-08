---
sidebar_position: 23
title: 'Many-to-Many Create'
---

Proses **Create Data** atau menyimpan data pada **Many-to-Many** sesuai dengan contoh kasus sebelumnya, di mana banyak Siswa (`Student`) bisa mengambil banyak Mata Pelajaran (`Course`) sekaligus. Karena database tidak bisa menghubungkan mereka langsung, Hibernate akan membuat **tabel tengah/tabel bantuan** (`course_student`) secara otomatis.

![Hibernate](/img/hibernate/many-to-many.png)

## 🚀 Implementasi Entity

### 1️⃣ Entity `Student` (Sisi Owner)

Sisi "Owner" adalah entitas yang menentukan konfigurasi tabel penghubung menggunakan `@JoinTable`.

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
			cascade = CascadeType.ALL)
	@JoinColumn(name = "student_id") // FK yang akan dibuat di tabel 'grade'
	private List<Grade> grades = new ArrayList<>();
	
	@ManyToMany(
			fetch = FetchType.LAZY,
			cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	@JoinTable(
			name = "course_student",
			joinColumns = @JoinColumn(name = "student_id"),
			inverseJoinColumns = @JoinColumn(name = "course_id"))
	private Set<Course> courses = new HashSet<>();
	
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
	}
	
	public Set<Course> getCourses() {
		return courses;
	}

	public void setCourses(Set<Course> courses) {
		this.courses = courses;
	}
	
	public void addCourse(Course course) {
		if (course == null) return;
		
		if (courses == null) {
			courses = new HashSet<>();
		}
		
		if (!courses.contains(course)) {
			courses.add(course);
			course.addStudent(this);
		}
	}

	@Override
	public String toString() {
		return "Student [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + "]";
	}
}
```

### 2️⃣ Entity `Course` (Sisi Inverse)

Sisi ini menggunakan atribut `mappedBy` yang merujuk pada nama variabel di class `Student`.

```java
@Entity
@Table(name = "course")
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "course_name")
	private String courseName;
	
	@ManyToMany(
			mappedBy = "courses",
			fetch = FetchType.LAZY,
			cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	private Set<Student> students = new HashSet<>();
	
	public Course() { }
	
	public Course(String courseName) {
		this.courseName = courseName;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	
	public Set<Student> getStudents() {
		return students;
	}

	public void setStudents(Set<Student> students) {
		this.students = students;
	}

	public void addStudent(Student student) {
		if (student == null) return;
		
		if (students == null) {
			students = new HashSet<>();
		}
		
		if (!students.contains(student)) {
			students.add(student);
			student.addCourse(this);
		}
	}

	@Override
	public String toString() {
		return "Course [id=" + id + ", courseName=" + courseName + "]";
	}
}
```

## 🛢 Implementasi DAO

* Membuat Interface DAO:

```java
public interface SchoolDAO {
	
	void saveStudent(Student student);
	
}
```

* Implementasi DAO simpan `Student` sekaligus dengan `Course`-nya:

```java
@Repository
public class SchoolDAOImpl implements SchoolDAO {

	private EntityManager entityManager;
	
	public SchoolDAOImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public void saveStudent(Student student) {
		entityManager.merge(student); // Menggunakan merge lebih aman untuk relasi Many to Many
	}
	
}
```

:::info
Berikut adalah alasan mengapa `session.merge()` dianggap lebih "aman" dan fleksibel, terutama dalam kasus relasi kompleks seperti **Many-to-Many**:

* **`persist()`**: Hanya bisa menerima objek yang benar-benar baru (Transient). Jika Anda mencoba melakukan `persist()` pada objek yang sudah punya ID (misalnya mengambil data dari Session lama atau menerima kiriman data dari Frontend), Hibernate akan melempar error `PersistentObjectException` atau `Detached entity passed to persist`.
* **`merge()`**: Sangat cerdas. Ia mengecek ID objek:
	* Jika ID **tidak ada**, ia melakukan `INSERT` (seperti `persist`).
	* Jika ID **sudah ada**, ia akan mencari data di database, lalu melakukan `UPDATE` jika ada perubahan.
:::

## ▶️ Main Class

* Kita akan membuat data `Student` beserta `Course`-nya.

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

			createStudentAndCourse(dao);
			
		};
	}

	private void createStudentAndCourse(SchoolDAO dao) {
		Student student1 = new Student("Abu", "Nawas");
		
		Course course1 = new Course("Bahasa Arab");
		Course course2 = new Course("Sejarah");
		
		student1.addCourse(course1);
		student1.addCourse(course2);
		
		dao.saveStudent(student1);
		
		System.out.println("Save Student 1  = " + student1);
		System.out.println("Student 1 Course= " + student1.getCourses());
	}
}
```

* Output pada hibernate console:

```
Hibernate: create table course (id integer not null auto_increment, course_name varchar(255), primary key (id)) engine=InnoDB
Hibernate: create table course_student (student_id integer not null, course_id integer not null, primary key (student_id, course_id)) engine=InnoDB
Hibernate: alter table course_student add constraint FKlmj50qx9k98b7li5li74nnylb foreign key (course_id) references course (id)
Hibernate: alter table course_student add constraint FK4xxxkt1m6afc9vxp3ryb0xfhi foreign key (student_id) references student (id)
Hibernate: insert into student (class_id,first_name,last_name) values (?,?,?)
Hibernate: insert into course (course_name) values (?)
Hibernate: insert into course (course_name) values (?)
Hibernate: insert into course_student (student_id,course_id) values (?,?)
Hibernate: insert into course_student (student_id,course_id) values (?,?)
Save Student 1  = Student [id=6, firstName=Abu, lastName=Nawas]
Student 1 Course= [Course [id=1, courseName=Bahasa Arab], Course [id=2, courseName=Sejarah]]
```

* Cek data dalam database:

```
mysql> select * from student;
+----+------------+-----------+----------+
| id | first_name | last_name | class_id |
+----+------------+-----------+----------+
|  6 | Abu        | Nawas     |     NULL |
+----+------------+-----------+----------+

mysql> select * from course;
+----+-------------+
| id | course_name |
+----+-------------+
|  1 | Bahasa Arab |
|  2 | Sejarah     |
+----+-------------+

mysql> select * from course_student;
+------------+-----------+
| student_id | course_id |
+------------+-----------+
|          6 |         1 |
|          6 |         2 |
+------------+-----------+
```

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-jpa-hibernate-advance/tree/main/13-hibernate-many-to-many
:::
