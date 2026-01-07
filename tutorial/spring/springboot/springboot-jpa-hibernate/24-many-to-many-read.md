---
sidebar_position: 24
title: 'Many-to-Many Read'
---

![Hibernate](/img/hibernate/many-to-many.png)

## 💪 Tantangan Utama: Lazy Loading

Secara default, relasi `@ManyToMany` di Hibernate bersifat **LAZY**. Artinya, saat kita mengambil data `Student`, Hibernate tidak akan mengambil data `Course` sampai kita memanggilnya (`student.getCourses()`).

**Permasalahannya**: Jika Session sudah ditutup sebelum kita memanggil daftar kursus (`Course`), maka akan muncul error `LazyInitializationException`.

## ✅ Solusi: Menggunakan HQL dengan JOIN FETCH (Sangat Direkomendasikan)

Teknik ini memaksa Hibernate untuk mengambil data Siswa dan Kursus dalam **satu query SQL** saja. Ini adalah cara paling efisien untuk menghindari masalah **N+1**.

:::tip
Baca: [**Eager vs Lazy**](/spring/springboot/springboot-jpa-hibernate/eager-lazy)
:::

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
	
	Student findStudentAndCourseByStudentId(Integer id);
	
	Course findCourseAndStudentByCourseId(Integer id);
	
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
	@Transactional(readOnly = true)
	public Student findStudentAndCourseByStudentId(Integer id) {
		TypedQuery<Student> query = entityManager.createQuery(
				"SELECT s FROM Student s "
				+ "JOIN FETCH s.courses "
				+ "WHERE s.id = :id", Student.class);
		query.setParameter("id", id);
		
		Student student = query.getSingleResult();
		
		return student;
	}
	
	@Override
	@Transactional(readOnly = true)
	public Course findCourseAndStudentByCourseId(Integer id) {
		TypedQuery<Course> query = entityManager.createQuery(
				"SELECT c FROM Course c "
				+ "JOIN FETCH c.students "
				+ "WHERE c.id = :id", Course.class);
		query.setParameter("id", id);
		
		Course course = query.getSingleResult();
		
		return course;
	}
	
}
```

## ▶️ Main Class

* Kita akan membuat read data `Student` beserta `Course`-nya. Contoh kasus menampilkan data `Course` beserta data `Student` terkait berdasarkan `Course` dengan id 4 (`findCourseAndStudent`) dan menampilkan data `Student` beserta `Course` terkait berdasarkan `Student` dengan id 6 (`findStudentAndCourse`).

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

			findStudentAndCourse(dao);
			
			findCourseAndStudent(dao);
		};
	}

	private void findCourseAndStudent(SchoolDAO dao) {
		int id = 4;
		Course course = dao.findCourseAndStudentByCourseId(id);
		
		System.out.println("Load course: " + course);
		System.out.println("student of course: : " + course.getStudents());
	}

	private void findStudentAndCourse(SchoolDAO dao) {
		int id = 6;
		Student student = dao.findStudentAndCourseByStudentId(id);
		
		System.out.println("Load student: " + student);
		System.out.println("student course: " + student.getCourses());
	}
}
```

* Contoh output Hibernate:

```
Hibernate: select s1_0.id,s1_0.class_id,c1_0.student_id,c1_1.id,c1_1.course_name,s1_0.first_name,s1_0.last_name from student s1_0 join course_student c1_0 on s1_0.id=c1_0.student_id join course c1_1 on c1_1.id=c1_0.course_id where s1_0.id=?
Load student: Student [id=6, firstName=Abu, lastName=Nawas]
student course: [Course [id=1, courseName=Bahasa Arab], Course [id=2, courseName=Sejarah]]
Hibernate: select c1_0.id,c1_0.course_name,s1_0.course_id,s1_1.id,s1_1.class_id,s1_1.first_name,s1_1.last_name from course c1_0 join course_student s1_0 on c1_0.id=s1_0.course_id join student s1_1 on s1_1.id=s1_0.student_id where c1_0.id=?
Load course: Course [id=4, courseName=Bahasa Arab]
student of course: : [Student [id=7, firstName=Abu, lastName=Jahal]]
```
