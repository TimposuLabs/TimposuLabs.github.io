---
sidebar_position: 9
title: 'One-to-One CRUD'
---

Pada materi sebelumnya kita sudah melakukan mapping One-to-One object `Classes` dan `Teacher`, pada materi ini kita akan melakukan operasi **CRUD (Create, Read, Update, Delete)** untuk relasi **One-to-One Uni-directional** dengan studi kasus `Teacher` dan `Classes` (Wali Kelas) menggunakan Hibernate.

Dalam relasi **Uni-directional** (Satu Arah), hanya satu entitas yang mengetahui entitas lainnya. Dalam kasus ini, `Classes` mengetahui siapa gurunya, tetapi `Teacher` tidak tahu ia mengajar kelas mana (di dalam kode Java).

![Hibernate](/img/hibernate/hibernate-uni-directional.png)

## 👩‍💻 CRUD One-to-One Uni-directional

### 1️⃣ Konsep Relasi

* **Uni-directional**: Hanya ada referensi satu arah. Di dalam class `Classes` ada field `Teacher`, tapi di dalam class `Teacher` tidak ada field `Classes`.
* **Database**: Tetap sama, tabel `classes`memiliki *Foreign Key* `teacher_id`.

### 2️⃣ Implementasi Entity

#### A. Entity `Teacher` (Sisi Independen)

Sisi ini tidak tahu apa-apa tentang kelas (`Classes`).

```java
@Entity
@Table(name = "teacher")
public class Teacher {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;

	// Setter & Getter
}
```

#### B. Entity `Classes` (Sisi Pemilik Relasi)

Hanya sisi ini yang memiliki anotasi relasi.

```java
@Entity
@Table(name = "classes")
public class Classes {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "class_name")
	private String className;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "teacher_id")
	private Teacher teacher;

	// Setter & Getter
}
```

### 3️⃣ Operasi CRUD di DAO / Repository Layer

* Interface `SchoolDAO`:

```java
public interface SchoolDAO {

	void saveClasses(Classes classes);
	
	Classes findClassById(Integer id);
	
	void updateClasses(Classes classes);
	
	void deleteClassesById(Integer id);
}
```

* Implementasi `SchoolDAOImpl`:

```java
@Repository
public class SchoolDAOImpl implements SchoolDAO {

	private EntityManager entityManager;
	
	public SchoolDAOImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public void saveClasses(Classes classes) {
		entityManager.persist(classes);		
	}
	
	@Override
	@Transactional(readOnly = true)
	public Classes findClassById(Integer id) {
		return entityManager.find(Classes.class, id);
	}

	@Override
	@Transactional
	public void updateClasses(Classes classes) {
		entityManager.merge(classes);
	}
	
	@Override
	@Transactional
	public void deleteClassesById(Integer id) {
		entityManager.remove(entityManager.find(Classes.class, id));	
	}
}
```

### 🔥 Main Application

Selanjutnya pada main class kita akan menjalankan proses CRUD di atas:

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

			createClasses(dao);
			
			findClasses(dao);

			updateClasses(dao);
			
			deleteClasses(dao);

		};
	}

	private void updateClasses(SchoolDAO dao) {
		Integer id = 1;
		Classes classes = dao.findClassById(id);
		
		classes.setClassName("Kelas 9");
		dao.updateClasses(classes);
	}
	
	private void deleteClasses(SchoolDAO dao) {
		Integer id = 1;
		dao.deleteClassesById(id);
		System.out.println("Classes deleted with id " + id);
	}
	
	private void findClasses(SchoolDAO dao) {
		Integer id = 1;
		Classes classes = dao.findClassById(id);
		System.out.println("Classes found = " + classes);
	}

	private void createClasses(SchoolDAO dao) {
		Teacher teacher = new Teacher("Andi", "Fahrum");
		
		Classes class12 = new Classes("Kelas 11");
		class12.setTeacher(teacher);
		
		dao.saveClasses(class12);
	}
}
```

* Menjalankan `createClasses(dao)` untuk CREATE Data:

```
Hibernate: insert into teacher (first_name,last_name) values (?,?)
Hibernate: insert into classes (class_name,teacher_id) values (?,?)
```

Cek data dalam database:

```sql
mysql> select * from teacher;
+----+------------+-----------+
| id | first_name | last_name |
+----+------------+-----------+
|  1 | Andi       | Fahrum    |
+----+------------+-----------+
1 row in set (0.00 sec)

mysql> select * from classes;
+----+------------+------------+
| id | class_name | teacher_id |
+----+------------+------------+
|  1 | Kelas 11   |          1 |
+----+------------+------------+
1 row in set (0.01 sec)
```

* Menjalankan `findClasses(dao)` untuk READ data:

```
Hibernate: select c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name from classes c1_0 left join teacher t1_0 on t1_0.id=c1_0.teacher_id where c1_0.id=?
Classes found = Class [id=1, className=Kelas 11, teacher=Guru [id=1, firstName=Andi, lastName=Fahrum]]
```

* Menjalankan `updateClasses(dao)` untuk UPDATE data:

```
Hibernate: select c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name from classes c1_0 left join teacher t1_0 on t1_0.id=c1_0.teacher_id where c1_0.id=?
Hibernate: select c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name from classes c1_0 left join teacher t1_0 on t1_0.id=c1_0.teacher_id where c1_0.id=?
Hibernate: update classes set class_name=?,teacher_id=? where id=?
```

Cek data dalam database, data harusnya sudah berubah:

```sql
mysql> select * from classes;
+----+------------+------------+
| id | class_name | teacher_id |
+----+------------+------------+
|  1 | Kelas 9    |          1 |
+----+------------+------------+
1 row in set (0.00 sec)
```

* Menjalankan `deleteClasses(dao)` untuk DELTE data:

```
Hibernate: select c1_0.id,c1_0.class_name,t1_0.id,t1_0.first_name,t1_0.last_name from classes c1_0 left join teacher t1_0 on t1_0.id=c1_0.teacher_id where c1_0.id=?
Hibernate: delete from classes where id=?
Hibernate: delete from teacher where id=?
Classes deleted with id 1
```

Mengingat di kode sebelumnya Anda menggunakan `cascade = CascadeType.ALL` pada relasi `teacher`, baris ini memiliki efek yang sangat penting. Jika kita menghapus `Classes` dengan ID 1, maka `Teacher` (Guru) yang terhubung dengan `Classes` (kelas) tersebut juga akan ikut terhapus secara otomatis dari database.

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-jpa-hibernate-advance/tree/main/01-hibernate-one-to-one
:::
