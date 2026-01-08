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

:::tip
Baca materi: [**Uni-Directional vs Bi-Directional**](/spring/springboot/springboot-jpa-hibernate/uni-directional-bi-directional)
:::

## 📅 Struktur Tabel (Database)

Secara fisik di database, Hibernate akan menempatkan *Foreign Key* pada tabel `grade`.

![Hibernate](/img/hibernate/one-to-many-uni-directional3.png)


## 🚀 Implementasi

### 1️⃣ Entity Child: `Grade.java`

Sisi ini bersifat independen dan tidak memiliki referensi ke `Student`.

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
	
	// Relasi Satu Arah (Uni-directional)
	@OneToMany(
		fetch = FetchType.LAZY,
		cascade = CascadeType.ALL)
	@JoinColumn(name = "student_id") // FK yang akan dibuat di tabel 'grade'
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

	// Helper method untuk menambah data Grade
	public void addGrade(Grade grade) {
		if (grades == null) {
			grades = new ArrayList<>();
		}
		
		grades.add(grade);
	}
	
	@Override
	public String toString() {
		return "Student [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + "]";
	}
}
```

:::info
Dalam relasi **One-to-Many**, aturan utamanya adalah: `@JoinColumn` selalu diletakkan di sisi "**Many**" (tabel yang memiliki kolom Foreign Key di database), tapi dalam kasus relasi satu arah(**Uni-Directional**), karena dalam table `Grade` bersifat independen maka `@JoinColum` digunakan pada `Student` (yang mengelola relasi).
:::

:::tip
**Tambahkan Orphan Removal**: Fitur `orphanRemoval = true` sangat direkomendasikan. Jika seorang siswa(`Student`) dikeluarkan dari daftar nilai(`Grade`), baris nilainya di database akan langsung terhapus secara otomatis.

```java
 @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
```
:::

### 3️⃣ Implementasi DAO CRUD

* Pada contoh kasus ini kita akan membuat DAO umtuk operasi CRUD:
	* 💾 Create **Student** sekaligus dengan **Grade**-nya.
	* 🔎 Find data **Student** sekaligus dengan data **Grade** terkait.
	* ❌ Menghapus data **Student** sekaligus dengan data **Grade** terkait.

```java
public interface SchoolDAO {

	void saveStudentWithGrade(Student student);

	Student findStudentAndGradeByStudentId(Integer id);

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
	public void saveStudentWithGrade(Student student) {
		entityManager.persist(student);
	}

	@Override
	@Transactional(readOnly = true)
	public Student findStudentAndGradeByStudentId(Integer id) {
		TypedQuery<Student> query = entityManager.createQuery(
				"SELECT s FROM Student s "
				+ "JOIN FETCH s.grades "
				+ "WHERE s.id = :data", Student.class);
		query.setParameter("data", id);
		
		Student student = query.getSingleResult();
		return student;
	}

	@Override
	@Transactional
	public void deleteStudentById(Integer id) {
		entityManager.remove(entityManager.find(Student.class, id));	
	}

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

			findStudentAndGrade(dao);
			
			deleteStudentAndGrade(dao);
			
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

	private void findStudentAndGrade(SchoolDAO dao) {
		int id = 4;
		Student student = dao.findStudentAndGradeByStudentId(id);
		
		System.out.println("Get Student= " + student);
		System.out.println("Get Grade Student= " + student.getGrades());
	}

	private void deleteStudentAndGrade(SchoolDAO dao) {
		int id = 4;
		
		dao.deleteStudentById(id);
		System.out.println("Delete Student by id = " + id);
	}

}
```

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-jpa-hibernate-advance/tree/main/12-hibernate-one-to-many-uni-directional-delete
:::
