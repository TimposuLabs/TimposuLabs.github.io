---
sidebar_position: 26
title: 'Many-to-Many Delete'
---

![Hibernate](/img/hibernate/many-to-many.png)

Dalam relasi **Many-to-Many**, proses penghapusan memiliki dua skenario yang sangat berbeda. Anda harus memahami perbedaannya agar tidak terjadi kesalahan fatal seperti terhapusnya data Master (Mata Pelajaran) secara tidak sengaja.

## 🔥 Dua Jenis Penghapusan

### 1️⃣ Menghapus Hubungan Saja (Break Association)

Skenario ini digunakan jika seorang siswa **berhenti mengambil** suatu Mata Pelajaran. Mata Pelajarannya tetap ada di sekolah, siswanya tetap terdaftar di sekolah, hanya hubungan mereka di tabel penghubung yang dihapus.

* **Logika**: Hapus ID dari tabel tengah (`course_student`), tapi jangan hapus baris di tabel `student` atau `course`.

### 2️⃣ Menghapus Entitas Utama (Total Delete)

Skenario ini digunakan jika seorang Siswa dikeluarkan atau sebuah Mata Pelajaran ditiadakan.

* **Logika**: Hapus data siswa dari tabel `student` dan otomatis hapus semua hubungan siswa tersebut di tabel tengah (`course_student`).

---

## 🚀 Implementasi Delete

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
	
	void deleteStudentById(Integer id);

	void deleteCourseById(Integer id);
	
}
```

* Implementasi DAO delete:

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

	@Override
	@Transactional
	public void deleteCourseById(Integer id) {
		Course course = entityManager.find(Course.class, id);
		
		if (course != null) {
			// get a student
			Set<Student> students = course.getStudents();
			
			// break association
			for (Student student : students) {
				student.getCourses().remove(course);
			}
		
			entityManager.remove(course);
		}
	}
}
```

:::info
Khusus untuk menghapus entitas `Course` Dalam relasi **Many-to-Many** secara bersih (tanpa meninggalkan data sampah atau menyebabkan *error constraint*), di dalam DAO sebagai berikut penjelasan langkah demi langkahnya:

#### 1. `@Transactional`

Anotasi ini memastikan seluruh proses di dalam metode ini berada dalam satu transaksi database. Jika salah satu langkah gagal, seluruh perubahan akan dibatalkan (*rollback*). Ini sangat penting karena kita melakukan perubahan pada beberapa tabel sekaligus (`course` dan tabel penghubung `course_student`).

#### 2. `entityManager.find(Course.class, id)`

Mencari data `Course` berdasarkan ID di database. Objek yang ditemukan akan berstatus **Persistent/Managed** (terkelola oleh Hibernate).

#### 3. `course.getStudents()`

Mengambil koleksi siswa yang mengambil kursus tersebut. Karena relasinya **Many-to-Many**, data ini biasanya diambil dari tabel penghubung (junction table) seperti `course_student`.

#### 4. Break Association (Memutus Relasi)

```java
for (Student student : students) {
    student.getCourses().remove(course);
}
```
Ini adalah bagian paling krusial dalam relasi **Bi-directional Many-to-Many**.

* **Masalah**: Jika Anda langsung menghapus `course`, Hibernate mungkin akan error karena data `course` tersebut masih direferensikan oleh objek `Student` di memori Java atau di tabel penghubung.

* **Solusi**: Anda harus melakukan iterasi ke setiap siswa yang mengambil kursus tersebut, lalu menghapus kursus itu dari daftar kursus (`Set<Course>`) milik masing-masing siswa. Ini secara otomatis akan menghapus baris terkait di tabel penghubung (`course_student`) saat transaksi selesai.

#### 5. `entityManager.remove(course)`

Setelah hubungan dengan semua siswa diputus, barulah objek course itu sendiri aman untuk dihapus dari tabel course di database.

### ❓Kenapa harus ada loop "Break Association"?

Dalam relasi Many-to-Many yang menggunakan `mappedBy` (sisi Inverse), sisi `Course` bukanlah "pemilik" sah dari tabel penghubung. Pemiliknya adalah sisi `Student`.

Jika Anda menghapus `Course` tanpa memutus hubungan dari sisi `Student`, database akan menolak penghapusan karena adanya **Foreign Key Constraint Violation** (ada data di tabel penghubung yang masih menunjuk ke ID kursus tersebut).

✍️ Implementasi ini sangat standar untuk aplikasi berbasis Hibernate  atau Spring Boot agar integritas data tetap terjaga. 
:::

## ▶️ Main Class

* Kita akan menghapus dari sisi `Course` dan sisi `Student`.

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
			
			deleteCourse(dao);
			
		};
	}

	private void deleteCourse(SchoolDAO dao) {
		int id = 3;
		dao.deleteCourseById(id);
	}

	private void deleteStudent(SchoolDAO dao) {
		int id = 4;
		dao.deleteStudentById(id);		
	}


}
```

* Output pada Hibernate:

```
Hibernate: select s1_0.id,c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name,s1_0.first_name,s1_0.last_name from student s1_0 left join classes c1_0 on c1_0.id=s1_0.class_id left join teacher t1_0 on t1_0.id=c1_0.teacher_id where s1_0.id=?
Hibernate: select g1_0.student_id,g1_0.id,g1_0.score,g1_0.subject_name from grade g1_0 where g1_0.student_id=?
Hibernate: delete from course_student where student_id=?
Hibernate: delete from student where id=?
Hibernate: select c1_0.id,c1_0.course_name from course c1_0 where c1_0.id=?
Hibernate: select s1_0.course_id,s1_1.id,c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name,s1_1.first_name,s1_1.last_name from course_student s1_0 join student s1_1 on s1_1.id=s1_0.student_id left join classes c1_0 on c1_0.id=s1_1.class_id left join teacher t1_0 on t1_0.id=c1_0.teacher_id where s1_0.course_id=?
Hibernate: select c1_0.student_id,c1_1.id,c1_1.course_name from course_student c1_0 join course c1_1 on c1_1.id=c1_0.course_id where c1_0.student_id=?
Hibernate: select c1_0.student_id,c1_1.id,c1_1.course_name from course_student c1_0 join course c1_1 on c1_1.id=c1_0.course_id where c1_0.student_id=?
Hibernate: select c1_0.student_id,c1_1.id,c1_1.course_name from course_student c1_0 join course c1_1 on c1_1.id=c1_0.course_id where c1_0.student_id=?
Hibernate: delete from course_student where student_id=? and course_id=?
Hibernate: delete from course_student where student_id=?
Hibernate: delete from course_student where student_id=?
Hibernate: delete from course where id=?
```
