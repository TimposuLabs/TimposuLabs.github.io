---
sidebar_position: 6
title: 'Update Data'
---

Dalam Hibernate, melakukan pembaruan (update) data sedikit berbeda dengan SQL biasa. Hibernate menggunakan konsep **Dirty Checking**, di mana ia secara otomatis mendeteksi perubahan pada objek yang sedang "dikelola" (managed) dan menyimpannya ke database saat transaksi selesai.

### A. Mekanisme Update: Cara "Managed Entity"

Langkah-langkah:

1. Ambil data dari database (objek menjadi status *managed*).
2. Ubah nilai pada objek menggunakan `setter`.
3. Selesaikan transaksi (Hibernate otomatis menjalankan SQL `UPDATE`)

### B. Update dengan EntityManager (Pendekatan DAO)

Jika menggunakan EntityManager secara manual (seperti contoh DAO sebelumnya), kita menggunakan method `merge()`.

```java
@Override
@Transactional
public void update(Student student) {
    // Membawa objek kembali ke status 'managed' dan memperbarui database
    entityManager.merge(student);
}
```

### C. Update Manual dengan JPQL

Gunakan cara ini jika Anda ingin mengubah data tanpa harus mengambilnya ke memori Java terlebih dahulu (lebih efisien untuk update banyak data sekaligus / rekomendasi jika ingin **Bulk Update**).

```java
@Override
@Transactional
public int updateEmailById(Long id, String newEmail) {
	// 1. Definisikan JPQL
	String jpql = "UPDATE Student s SET s.email = :emailBaru WHERE s.id = :idStudent";

	// 2. Buat TypedQuery
	// Meskipun ini operasi update, kita definisikan return type-nya sebagai Student (atau Integer)
	TypedQuery<Integer> query = (TypedQuery<Integer>) entityManager.createQuery(jpql);

	// 3. Set Parameter (Mencegah SQL Injection)
	query.setParameter("emailBaru", newEmail);
	query.setParameter("idStudent", id);

	// 4. Eksekusi Update
	// Output: jumlah baris yang berhasil diubah
	int rowsUpdated = query.executeUpdate();

	return rowsUpdated;
}
```

---

Berikut kita akan implementasikan update data dari project tutorial sebelumnya.

## 1️⃣ Repository / DAO

* Menambahkan method baru pada interface DAO dengan menambahkan method `update`:

```java
public interface StudentDAO {

   	void save(Student student);
	
	Student findById(Long id);
	
	List<Student> findAll();
	
	List<Student> findByLastName(String lastName);

	void update(Student student);
}
```

* Implementasi DAO:

```java
@Repository
public class StudentDAOImpl implements StudentDAO {

	private EntityManager entityManager;
	
	public StudentDAOImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public void save(Student student) {
		entityManager.persist(student);
	}

	@Override
	@Transactional(readOnly = true)
	public Student findById(Long id) {
		return entityManager.find(Student.class, id);
	}
		
	@Override
	@Transactional(readOnly = true)
	public List<Student> findAll() {		
		TypedQuery<Student> query = entityManager.createQuery("FROM Student ORDER BY lastName asc", Student.class);		
		return query.getResultList();
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<Student> findByLastName(String lastName) {
		TypedQuery<Student> query = entityManager.createQuery("FROM Student WHERE lastName=:theLastName", Student.class);
		query.setParameter("theLastName", lastName);
		return query.getResultList();
	}
	
	@Override
	@Transactional
	public void update(Student student) {
		entityManager.merge(student);
	}
}
```

## 2️⃣ Main Class

* Selanjutnya pada main class kita akan menjalankan proses update data:

```java
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	// Method ini akan mencetak di command line
	@Bean
	public CommandLineRunner commandLineRunner(StudentDAO studentDAO) {
		return runner -> {

		updateStudent(studentDAO);
			
		};
	}
	
	private void updateStudent(StudentDAO studentDAO) {
		Long id = 6L; // sesuiakan dengan id student yang ingin di ubah
		System.out.println("Get student with id = " + id);
		Student student = studentDAO.findById(id);	
		
		System.out.println("Update Student...");
		student.setEmail("aco@gmail.com");
		
		studentDAO.update(student);
		System.out.println("Updated student= " + student);
	}
}
```

* Jika sukses maka outputnya sebagai berikut:

```
Get student with id = 6
Hibernate: select s1_0.id,s1_0.email,s1_0.first_name,s1_0.last_name from student s1_0 where s1_0.id=?
Update Student...
Hibernate: select s1_0.id,s1_0.email,s1_0.first_name,s1_0.last_name from student s1_0 where s1_0.id=?
Hibernate: update student set email=?,first_name=?,last_name=? where id=?
Updated student= Student [id=6, firstName=Inaya, lastName=Rusli, email=aco@gmail.com]
```

* Cek database apakah data sudah terupdate:

```
mysql> select * from student where id=6;
+----+---------------+------------+-----------+
| id | email         | first_name | last_name |
+----+---------------+------------+-----------+
|  6 | aco@gmail.com | Inaya      | Rusli     |
+----+---------------+------------+-----------+
1 row in set (0.00 sec)
```

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-jpa-hibernate-basic/tree/main/05-belajar-hibernate-update-data
:::
