---
sidebar_position: 11
title: 'One-to-One Bi-Directional'
---

Pada materi sebelumnya kita sudah membahas tentang **Bi-Directional** dan **Uni-Directional**. Sekarang kita akan mengimplementasikan dalam relasi **One-to-One**, dimana dalam kasus ini `Classes` mengetahui siapa gurunya, tetapi `Teacher` tidak tahu ia mengajar kelas mana (di dalam kode Java). Dengan **Bi-directional** (dua arah) nantinya kedua entity saling mengetahui keberadaan satu sama lain.

![Hibernate](/img/hibernate/hibernate-bi-directional.png)

## 1️⃣ Konsep Utama: The `mappedBy` Attribute

Dalam relasi dua arah, harus ada satu sisi yang menjadi **Pemilik (Owner)** dan satu sisi yang menjadi **Pendukung (Non-Owner)**.

* **Owner (Classes)**: Sisi yang memiliki kolom *Foreign Key* (`teacher_id`) di tabel database.
* **Non-Owner (Teacher)**: Sisi yang menggunakan atribut `mappedBy`. Atribut ini memberitahu Hibernate: *"Jangan buat kolom baru di tabelku, lihat saja pemetaan yang sudah ada di kelas `Classes`."*

## 2️⃣  Implementasi Entity

![Hibernate](/img/hibernate/one-to-one.png)

### A. Sisi Pemilik (Owner) - `Classes`

Di sini kita meletakkan `@JoinColumn`.

```java
@Entity
@Table(name = "classes")
public class Classes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "class_name")
    private String className;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    private Teacher teacher; // Navigasi: Classes -> Teacher

    // Setter & Getter

}
```

### B. Sisi Pendukung (Non-Owner) - `Teacher`

Di sini kita menggunakan `mappedBy` yang merujuk pada nama variabel di kelas `Classes`.

```java
@Entity
@Table(name = "teacher")
public class Teacher {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @OneToOne(mappedBy = "teacher", // Merujuk ke field 'teacher' di class Classes
        cascade = CascadeType.ALL) // setiap operasi yang dilakukan pada entity ini akan otomatis diteruskan ke entity yang terhubung (Child).
    private Classes classes; // Navigasi: Teacher -> Classes

    // Setter & Getter

}
```

### 🤑 Keuntungan Bi-Directional

1. **Navigasi Mudah**: Anda bisa mendapatkan data `Classes` hanya dengan objek `Teacher`.
	
```java
Teacher tempTeacher = dao.findTeacherById(1);
System.out.println("Guru ini wali kelas dari: " + tempTeacher.getClasses().getClassName());
```

2. **Fleksibilitas Query**: Memudahkan penulisan JPQL karena Anda bisa melakukan join dari kedua sisi.

### 3️⃣ Implementasi DAO

Dalam hubungan dua arah, kita bisa melakukan pencarian data dari sisi mana pun. Kita dapat menambahkan metode untuk mencari dan menghapus baik dari sisi `Classes` maupun `Teacher`. 

Pada materi **Uni-Directional One-to-One** sebelumnya kita hanya dapat menampilkan data hanya dari sisi `Classes`, kali ini kita akan menampilkan data dari sisi `Teacher`:

* Tambahkan kontrak metode `findTeacherById(Integer id)` pada interface DAO:

```java
public interface SchoolDAO {

	void saveClasses(Classes classes);
	
	Classes findClassById(Integer id);
	
	void deleteClassesById(Integer id);
	
	Teacher findTeacherById(Integer id);
    
}
```

* Implementasi pada `SchoolDAOImpl`:

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
	public void deleteClassesById(Integer id) {
		entityManager.remove(entityManager.find(Classes.class, id));	
	}

	@Override
	@Transactional(readOnly = true)
	public Teacher findTeacherById(Integer id) {
		return entityManager.find(Teacher.class, id);
	}
}
```

### 🔥 Main Application

* Dengan implementasi **Bi-Directional** ini, Anda bisa melakukan navigasi "bolak-balik" seperti contoh di bawah ini:

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

			findTeacher(dao);

		};
	}
	
	private void findTeacher(SchoolDAO dao) {
		Integer id = 1;
		Teacher teacher = dao.findTeacherById(id);
		System.out.println("Teacher found = " + teacher);
		System.out.println("Teacher Class detail = " + teacher.getClasses());
	}
}
```

* Output pada console hibernate:

```
Hibernate: select t1_0.id,c1_0.id,c1_0.class_name,t1_0.first_name,t1_0.last_name from teacher t1_0 left join classes c1_0 on t1_0.id=c1_0.teacher_id where t1_0.id=?
Teacher found = Guru [id=1, firstName=Andi, lastName=Fahrum]
Teacher Class detail = Class [id=1, className=Kelas 9, teacher=Guru [id=1, firstName=Andi, lastName=Fahrum]]
```

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-jpa-hibernate-advance/tree/main/02-hibernate-one-to-one-bi-directional
:::
