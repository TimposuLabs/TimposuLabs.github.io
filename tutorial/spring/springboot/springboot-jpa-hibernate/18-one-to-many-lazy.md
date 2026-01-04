---
sidebar_position: 18
title: 'One-to-Many Lazy Fetch'
---

![Hibernate](/img/hibernate/one-to-many2.png)

**Lazy Fetching** adalah strategi pengambilan data di mana entity anak/child (relasi) **tidak akan diambil** dari database sampai kita benar-benar memanggilnya di dalam kode (misalnya saat memanggil `.getStudents()`).

Dalam kasus **Classes (1) ↔ Student (n)**:

* Saat kita mengambil data `Classes`, Hibernate hanya menjalankan 1 query untuk tabel kelas (`classes`).
* Data `Student` belum ditarik dari database; Hibernate hanya menyiapkan sebuah "Proxy" (objek kosong sementara).

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

## 3️⃣ Repository / DAO

* Menambahkan method baru pada interface DAO dengan menambahkan method `findStudentByClassId(Integer id)`:

```java
public interface SchoolDAO {

	void saveClasses(Classes classes);
	
	Classes findClassById(Integer id);
	
	void deleteClassesById(Integer id);
	
	Teacher findTeacherById(Integer id);
	
	void deleteTeacherById(Integer id);
	
	List<Student> findStudentByClassId(Integer id);

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
	@Transactional(readOnly = true)
	public Classes findClassById(Integer id) {
	    return entityManager.find(Classes.class, id);
	}
		
	@Override
	@Transactional(readOnly = true)
	public List<Student> findStudentByClassId(Integer id) {
		TypedQuery<Student> query = entityManager.createQuery(
					"FROM Student WHERE classes.id = :data", Student.class);
		query.setParameter("data", id);
		
		List<Student> students = query.getResultList();
		
		return students;
	}

	// Implementasi method Lainnya

}
```

## 4️⃣ Main Class

* Pada main class application kita akan menampilkan data `Classes` dengan berisi data `Student`. Dalam contoh di bawah ini kita akan menampilkan data `Classes` dengan id 3:

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
			
			findStudentByClassesId(dao);

		};
	}

	private void findStudentByClassesId(SchoolDAO dao) {
		int id = 3;
		Classes classes = dao.findClassById(id);
		
		System.out.println("Kelas: " + classes);
		
		// find student by classes
		List<Student> students = dao.findStudentByClassId(id);
		classes.setStudents(students);
		
		System.out.println("Menampilkan siswa berdasarkan id Kelas: " + id + ", :" + classes.getStudents());
	}
}
```

* Output pada Hibernate SQL:

Asumsi kita mempunyai data dalam database:

```
mysql> select * from teacher;
+----+------------+-----------+
| id | first_name | last_name |
+----+------------+-----------+
|  1 | Inti       | Astuti    |
|  2 | Hatake     | Kakashi   |
+----+------------+-----------+

mysql> select * from classes;
+----+------------+------------+
| id | class_name | teacher_id |
+----+------------+------------+
|  3 | Kelas 10   |          2 |
+----+------------+------------+

mysql> select * from student;
+----+------------+-----------+----------+
| id | first_name | last_name | class_id |
+----+------------+-----------+----------+
|  7 | Uzumaki    | Naruto    |        3 |
|  8 | Uciha      | Sazuke    |        3 |
|  9 | Haruno     | Sakura    |        3 |
+----+------------+-----------+----------+
```

Output JPQL:

```sql
Hibernate: select c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name from classes c1_0 left join teacher t1_0 on t1_0.id=c1_0.teacher_id where c1_0.id=?
Kelas: Class [id=3, className=Kelas 10, teacher=Guru [id=2, firstName=Hatake, lastName=Kakashi]]
Hibernate: select s1_0.id,s1_0.class_id,s1_0.first_name,s1_0.last_name from student s1_0 where s1_0.class_id=?
Hibernate: select c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name from classes c1_0 left join teacher t1_0 on t1_0.id=c1_0.teacher_id where c1_0.id=?
Menampilkan siswa berdasarkan id Kelas: 3, :[Student [id=7, firstName=Uzumaki, lastName=Naruto], Student [id=8, firstName=Uciha, lastName=Sazuke], Student [id=9, firstName=Haruno, lastName=Sakura]]
```

:::info
Dari output JPQL di atas terjadi **Query N+1**: Dimana query melakukan perulangan (loop) untuk banyak class, yang bisa memperlambat performa.
:::

---

## 🏃 Menggunakan JOIN FETCH

Pada kasus diatas merupakan tantangan dalam optimasi database yang dikenal dengan sebutan **"The N+1 Select Problem"**. Dalam desain database di atas kita telah menetapkan relasi antara **Kelas (`Classes`)** dan **Siswa (`Student`)** sebagai `LAZY`. 

Secara teori, ini adalah langkah yang baik untuk **menghemat memori**, namun tanpa penggunaan `JOIN FETCH`, muncul dua masalah utama:

### 1️⃣ Masalah N+1 Select (Pemborosan Query)

Ketika Anda ingin menampilkan data kelas beserta daftar siswanya, Hibernate tidak bekerja dalam satu langkah.

* **1 Query pertama**: Mengambil data Kelas (`Classes`).
* **N Query berikutnya**: Jika kita memiliki 10 kelas(`classes`) dan ingin melihat siswa(`student`) di tiap kelas, Hibernate akan melakukan 10 kali query tambahan ke tabel siswa.
* **Dampaknya**: Jika kita memiliki data 100 kelas(``classes`), maka aplikasi akan melakukan 101 kali bolak-balik (*round-trip*) ke database. Hal ini akan menyebabkan aplikasi terasa sangat lambat (*lag*) saat data mulai banyak.

### 2️⃣ Kerentanan Terhadap `LazyInitializationException`

Karena data siswa(`student`) tidak diambil bersamaan dengan data kelas(`classes`), Hibernate sangat bergantung pada **Session** yang aktif.

* Jika kita mengambil data kelas di layer DAO, lalu menutup koneksinya, dan kemudian mencoba mengakses data siswa di layer Main/UI, aplikasi akan langsung crash.
* Ini terjadi karena Hibernate mencoba koneksi ke database untuk mengambil data siswa, namun pintu koneksinya sudah terkunci.

### 👍 SOLUSI dengan JOIN FETCH

Dengan menggunakan `JOIN FETCH` dalam HQL (*Hibernate Query Language*), Hibernate akan melakukan **SQL JOIN** dan langsung mengisi semua data ke dalam objek Java dalam satu kali jalan (1 query).

```java
// Mengambil Kelas DAN Siswanya sekaligus dalam 1 query
String hql = "SELECT c FROM Classes c JOIN FETCH c.students WHERE c.id = :id";
Classes tempClass = session.createQuery(hql, Classes.class)
                           .setParameter("id", 1)
                           .getSingleResult();
```

Manfaat menggunakan **JOIN FETCH**:

1. Mengatasi **N+1 Select Problem**.
2. Optimasi Performa ⚡.
3. Mencegah `LazyInitializationException` 💀.
4. Efisiensi Memory 🚀.

### 👨🏻‍💻 Implementasi JOIN FETCH

* **Repository / DAO**: Menambahkan method `findClassesByIdJoinFetch` pada interface DAO:

```java
public interface SchoolDAO {

	void saveClasses(Classes classes);
	
	Classes findClassById(Integer id);
	
	void deleteClassesById(Integer id);
	
	Teacher findTeacherById(Integer id);
	
	void deleteTeacherById(Integer id);
	
	List<Student> findStudentByClassId(Integer id);
	
	Classes findClassesByIdJoinFetch(Integer id);
}
```

* **Implementasi DAO**: menggunakan **JOIN FETCH**:

```java
@Repository
public class SchoolDAOImpl implements SchoolDAO {

	private EntityManager entityManager;
	
	public SchoolDAOImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional(readOnly = true)
	public Classes findClassById(Integer id) {
		return entityManager.find(Classes.class, id);
	}

	@Override
	@Transactional(readOnly = true)
	public Classes findClassesByIdJoinFetch(Integer id) {
		TypedQuery<Classes> query = entityManager.createQuery(
				"SELECT c FROM Classes c "
				+ "JOIN FETCH c.students "
				+ "JOIN FETCH c.teacher " // multiple join fetch
				+ "WHERE c.id = :data", Classes.class);
		query.setParameter("data", id);
		
		Classes kelas = query.getSingleResult();
		
		return kelas;
	}

	// Implementasi method Lainnya

}
```

* Main App: Pada main class application kita akan menampilkan data `Classes` dengan berisi data `Student`. Dalam contoh di bawah ini kita akan menampilkan data `Classes` dengan id 3:

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
			
			findClassesWithStudentsJoinFetch(dao);

		};
	}

	private void findClassesWithStudentsJoinFetch(SchoolDAO dao) {
		int id = 3;
		
		Classes classes = dao.findClassesByIdJoinFetch(id);
		
		System.out.println("Kelas: " + classes);
		System.out.println("Daftar siswa: " + classes.getStudents());
	}
}
```

* Output JPQL:

```
Hibernate: select c1_0.id,c1_0.class_name,s1_0.class_id,s1_0.id,s1_0.first_name,s1_0.last_name,t1_0.id,t1_0.first_name,t1_0.last_name from classes c1_0 join student s1_0 on c1_0.id=s1_0.class_id join teacher t1_0 on t1_0.id=c1_0.teacher_id where c1_0.id=?
Kelas: Class [id=3, className=Kelas 10, teacher=Guru [id=2, firstName=Hatake, lastName=Kakashi]]
Daftar siswa: [Student [id=7, firstName=Uzumaki, lastName=Naruto], Student [id=8, firstName=Uciha, lastName=Sazuke], Student [id=9, firstName=Haruno, lastName=Sakura]]
```

Terlihat dari output di atas Hibernate hanya melakukan query 1 kali saja.
