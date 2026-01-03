---
sidebar_position: 17
title: 'One-to-Many Eager Fetch'
---

![Hibernate](/img/hibernate/one-to-many2.png)

**Eager Fetching** adalah strategi pengambilan data di mana Hibernate secara otomatis mengambil entitas utama beserta seluruh entitas relasinya dalam satu waktu.

Jika pada **Lazy Loading** data anak (`Students`) baru diambil saat dipanggil (`getStudents()`), pada *Eager Fetching*, saat kita memanggil `Classes`, semua data `Students` sudah langsung tersedia di memori (RAM).

## 1️⃣ Entity Induk: `Classes.java`

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
			fetch = FetchType.EAGER,
			cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	List<Student> students = new ArrayList<>();

	public Classes() {		
	}

	public Classes(String className, Teacher teacher) {
		this.className = className;
		this.teacher = teacher;
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public Teacher getTeacher() {
		return teacher;
	}

	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}

	public List<Student> getStudents() {
		return students;
	}

	public void setStudents(List<Student> students) {
		this.students = students;
	}

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
	
	
	@Override
	public String toString() {
		return "Class [id=" + id + ", className=" + className + ", teacher=" + teacher + "]";
	}
}
```

## 2️⃣ Entity Anak: `Student.java`

Sisi `@ManyToOne` secara default sudah bersifat **EAGER**, jadi kita tidak perlu mengubahnya kecuali ingin menjadikannya **LAZY**.

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

	@Override
	public String toString() {
		return "Student [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + "]";
	}
}
```

## 3️⃣ Main Class

* Pada main class application kita akan menampilkan data `Classes` dengan berisi data `Student`:

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
			
			findClassWithStudent(dao);			

		};
	}

	private void findClassWithStudent(SchoolDAO dao) {
		int id = 1;
		Classes classes = dao.findClassById(id);
		
		System.out.println("Kelas: " + classes);
		System.out.println("Daftar siswa: " + classes.getStudents());
	}
}
```

* Output pada Hibernate SQL:

Asumsi kita mempunyai data dalam database:

```
mysql> select * from classes;
+----+------------+------------+
| id | class_name | teacher_id |
+----+------------+------------+
|  3 | Kelas 10   |          2 |
+----+------------+------------+
3 rows in set (0.00 sec)

mysql> select * from student;
+----+------------+-----------+----------+
| id | first_name | last_name | class_id |
+----+------------+-----------+----------+
|  7 | Uzumaki    | Naruto    |        3 |
|  8 | Uciha      | Sazuke    |        3 |
|  9 | Haruno     | Sakura    |        3 |
+----+------------+-----------+----------+
8 rows in set (0.00 sec)
```

Output HSQL:

```sql
Hibernate: select c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name,s1_0.class_id,s1_0.id,s1_0.first_name,s1_0.last_name from classes c1_0 left join teacher t1_0 on t1_0.id=c1_0.teacher_id left join student s1_0 on c1_0.id=s1_0.class_id where c1_0.id=?
Kelas: Class [id=3, className=Kelas 10, teacher=Guru [id=2, firstName=Hatake, lastName=Kakashi]]
Daftar siswa: [Student [id=7, firstName=Uzumaki, lastName=Naruto], Student [id=8, firstName=Uciha, lastName=Sazuke], Student [id=9, firstName=Haruno, lastName=Sakura]]
```
