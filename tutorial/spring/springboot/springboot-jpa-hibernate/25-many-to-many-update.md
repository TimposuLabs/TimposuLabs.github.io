---
sidebar_position: 25
title: 'Many-to-Many Update'
---

![Hibernate](/img/hibernate/many-to-many.png)

Dalam relasi **Many-to-Many**, konsep "*Update*" cara kerjanya sedikit berbeda dengan tabel biasa. Kita membagi Update menjadi dua jenis: **Update data entity** dan **Update hubungan (relasi)**.

Berikut penjelasannya secara ringkas:

### 1️⃣ Update Data Entitas (Informasi Dasar)

Ini adalah update biasa jika Anda ingin mengubah nama Siswa(`Student`) atau nama Mata Pelakaran (`Course`). Operasi ini tidak memengaruhi hubungan di tabel penghubung.

* **Contoh**: Mengubah nama "Bahasa Jerman" menjadi "Bahasa Jerman Tingkat Lanjut".
* **Cara**: Cukup ambil objeknya, ubah isinya, lalu lakukan `session.merge()`.

### 2️⃣ Update Hubungan/Relasi (Inilah yang Sering Dimaksud)

Update relasi berarti **menambah** atau **menghapus** koneksi antara Siswa(`Student`) dan Mata Pelajaran(`Course`) di tabel penghubung (*junction table*). Di Hibernate, kita tidak mengubah isi baris di tabel penghubung, melainkan **memanipulasi koleksi (Set/List)** di memori Java.

**Contoh Kasus**: Siswa Budi ingin berhenti mengambil Mata Pelajaran "Biologi" dan ganti mengambil "Fisika".

**Langkah-langkah Updatenya:**

1. **Ambil** objek Siswa beserta daftar Mata Pelajarannya (menggunakan `JOIN FETCH`).
2. **Hapus** Mata Pelajaran lama dari koleksi: `student.getCourses().remove(biologi)`.
3. **Tambah** Mata Pelajaran baru ke koleksi: `student.addCourse(fisika)`.
4. **Simpan** dengan `session.merge(student)`.

### 3️⃣ Mengapa Menggunakan `merge()` Sangat Penting di Sini?

Seperti yang kita bahas di materi sebelumnya, `merge()` jauh lebih aman untuk update **Many-to-Many** karena:

* Hibernate akan membandingkan daftar Mata Pelajaran (`Course`) di memori Java dengan daftar Mata Pelajaran (`Course`) di database.
* Hibernate secara otomatis tahu baris mana yang harus di-`DELETE` dari tabel penghubung dan baris mana yang harus di-`INSERT` baru.
* Anda tidak perlu menulis query SQL `DELETE` atau `INSERT` secara manual ke tabel tengah.

### 4️⃣ Contoh Kode Update Relasi (DAO)

```java
@Transactional
public void updateStudentCourses(int studentId, int oldCourseId, int newCourseId) {
    // 1. Ambil data lengkap
    Student student = session.get(Student.class, studentId);
    Course oldCourse = session.get(Course.class, oldCourseId);
    Course newCourse = session.get(Course.class, newCourseId);

    // 2. Putus hubungan lama
    student.getCourses().remove(oldCourse);
    oldCourse.getStudents().remove(student);

    // 3. Tambah hubungan baru
    student.addCourse(newCourse);

    // 4. Sinkronisasi ke DB
    session.merge(student);
}
```

### 👍 Kesimpulan

Jadi, **Update tetap ada**, tetapi metodenya adalah dengan mengelola koleksi di dalam objek Java. Hibernate akan mendeteksi perubahan tersebut (fitur ini disebut *Dirty Checking*) dan melakukan perubahan yang diperlukan pada tabel penghubung saat transaksi di-commit.

---

## 🚀 Implementasi Update menggunakan `merge`

Dari penjelasan di atas kita akan menggunakan `merge` pada project kita sebelumnya:

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
	
	Course findCourseAndStudentByCourseId(Integer id);

	void update(Course course);
	
}
```

* Implementasi DAO update:

```java
@Repository
public class SchoolDAOImpl implements SchoolDAO {

	private EntityManager entityManager;
	
	public SchoolDAOImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
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
	
	@Override
	@Transactional
	public void update(Course course) {
		entityManager.merge(course);		
	}
	
}
```

## ▶️ Main Class

* Kita akan memperbaharui `Course` yang memiliki id 3 dengan menambahkan `Student` yang baru.

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

			addMoreStudentForCourse(dao);
			
		};
	}

	private void addMoreStudentForCourse(SchoolDAO dao) {
		int id = 3;
		Course course = dao.findCourseAndStudentByCourseId(id);
		
		Student student1 = new Student("Ibnu", "Jamil");
		Student student2 = new Student("Tora", "Sudiro");
		
		course.addStudent(student1);
		course.addStudent(student2);
		
		dao.update(course);
		
		System.out.println("Update course: " + course);
		System.out.println("Student of course: " + course.getStudents());
	}
}
```

* Output pada Hibernate:

```
Hibernate: select c1_0.id,c1_0.course_name,s1_0.course_id,s1_1.id,s1_1.class_id,s1_1.first_name,s1_1.last_name from course c1_0 join course_student s1_0 on c1_0.id=s1_0.course_id join student s1_1 on s1_1.id=s1_0.student_id where c1_0.id=?
Hibernate: select c1_0.id,c1_0.course_name,s1_0.course_id,s1_1.id,c2_0.id,c2_0.class_name,c2_0.teacher_id,s1_1.first_name,s1_1.last_name from course c1_0 left join course_student s1_0 on c1_0.id=s1_0.course_id left join student s1_1 on s1_1.id=s1_0.student_id left join classes c2_0 on c2_0.id=s1_1.class_id where c1_0.id=?
Hibernate: select g1_0.student_id,g1_0.id,g1_0.score,g1_0.subject_name from grade g1_0 where g1_0.student_id=?
Hibernate: select c1_0.student_id,c1_1.id,c1_1.course_name from course_student c1_0 join course c1_1 on c1_1.id=c1_0.course_id where c1_0.student_id=?
Hibernate: insert into student (class_id,first_name,last_name) values (?,?,?)
Hibernate: insert into student (class_id,first_name,last_name) values (?,?,?)
Hibernate: insert into course_student (student_id,course_id) values (?,?)
Hibernate: insert into course_student (student_id,course_id) values (?,?)
Update course: Course [id=3, courseName=Sejarah]
Student of course: [Student [id=null, firstName=Tora, lastName=Sudiro], Student [id=7, firstName=Abu, lastName=Jahal], Student [id=null, firstName=Ibnu, lastName=Jamil]]
```

* Cek data di database:

```
mysql> select * from course;
+----+-------------+
| id | course_name |
+----+-------------+
|  1 | Bahasa Arab |
|  3 | Sejarah     |
|  4 | Bahasa Arab |
+----+-------------+

mysql> select * from student;
+----+------------+-----------+----------+
| id | first_name | last_name | class_id |
+----+------------+-----------+----------+
|  6 | Abu        | Nawas     |     NULL |
|  8 | Tora       | Sudiro    |     NULL |
|  9 | Ibnu       | Jamil     |     NULL |
+----+------------+-----------+----------+

mysql> select * from course_student;
+------------+-----------+
| student_id | course_id |
+------------+-----------+
|          6 |         1 |
|          6 |         2 |
|          7 |         3 |
|          8 |         3 |
|          9 |         3 |
|          7 |         4 |
+------------+-----------+
```

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-jpa-hibernate-advance/tree/main/15-hibernate-many-to-many-add-more-data
:::
