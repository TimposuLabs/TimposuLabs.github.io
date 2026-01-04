---
sidebar_position: 7
title: 'Delete Data'
---

Menghapus (DELETE) data dalam JPA/Hibernate berarti menghapus sebuah entitas/entity dari database sehingga baris datanya hilang secara permanen.

Untuk menghapus data, ada beberapa cara utama untuk melakukannya:

## A. Menghapus Menggunakan `entityManager.remove()`

Ini adalah cara yang paling umum jika kita sudah memiliki objek entity di tangan (status `Managed`).

**Langkah-langkah:**

1. Cari data terlebih dahulu berdasarkan ID.
2. Panggil method `remove()`.

```java
Transactional
public void deleteStudentById(Long id) {
    // 1. Cari data (Objek harus dalam status Managed agar bisa dihapus)
    Student student = entityManager.find(Student.class, id);

    // 2. Jika data ada, hapus
    if (student != null) {
        entityManager.remove(student);
        System.out.println("Data dengan ID " + id + " berhasil dihapus.");
    }
}
```

## B. Menghapus Menggunakan JPQL (Bulk Delete)

Gunakan cara ini jika Anda ingin menghapus data berdasarkan kriteria tertentu (misal: hapus semua mahasiswa yang emailnya mengandung "@spam.com") atau ingin menghapus data dengan cepat tanpa perlu melakukan `SELECT` terlebih dahulu.

```java
@Transactional
public int deleteByEmailDomain(String domain) {
    // Menggunakan JPQL: "DELETE FROM Student s WHERE ..."
    String jpql = "DELETE FROM Student s WHERE s.email LIKE :emailDomain";
    
    int rowsDeleted = entityManager.createQuery(jpql)
            .setParameter("emailDomain", "%" + domain)
            .executeUpdate(); // Wajib menggunakan executeUpdate()
            
    return rowsDeleted;
}
```

## ✍️ Konsep Penting dalam Penghapusan Data

### A. Soft Delete vs Hard Delete

* **Hard Delete (Materi di atas)**: Data benar-benar hilang dari tabel database.
* **Soft Delete** : Data tidak dihapus, melainkan ditandai dengan kolom dalam tabel, misalnya `is_deleted = true`. Cara ini lebih aman untuk audit data. Anda bisa menggunakan anotasi `@SQLDelete` milik Hibernate untuk mengubah perintah `DELETE` menjadi `UPDATE`.

### B. Cascade Delete

Jika entitas `Student` memiliki relasi dengan entitas `Course`, Anda bisa mengatur agar saat `Student` dihapus, data course-nya juga ikut terhapus secara otomatis dengan menambahkan `cascade = CascadeType.REMOVE` pada anotasi relasi.

### C. Pentingnya `@Transactional`

Operasi penghapusan wajib menggunakan `@Transactional`. Tanpa transaksi yang aktif, Hibernate akan melempar error `TransactionRequiredException` karena database tidak mengizinkan penghapusan data tanpa pengawasan transaksi.

## 🔥 Ringkasan

| Method	| Kapan Digunakan?	| Performa |
| --- | --- | --- |
| `remove(entity)`	| Saat Anda sudah memegang objeknya.	| Sedang (melakukan `SELECT` lalu `DELETE`). |
| `JPQL Delete`	| Menghapus banyak data sekaligus atau kriteria khusus. |	Sangat Cepat (Langsung menjalankan 1 perintah SQL). |

---

Berikut kita akan implementasikan delete data dari project tutorial sebelumnya.

## 1️⃣ Repository / DAO

* Menambahkan method baru pada interface DAO dengan menambahkan method `delete`:

```java
public interface StudentDAO {

   	void save(Student student);
	
	Student findById(Long id);
	
	List<Student> findAll();
	
	List<Student> findByLastName(String lastName);

	void update(Student student);

	void delete(Long id);
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

	@Override
	@Transactional
	public void delete(Long id) {
		Student student = entityManager.find(Student.class, id);
		entityManager.remove(student);
	}
}
```

## 2️⃣ Main Class

* Selanjutnya pada main class kita akan menjalankan proses delete data:

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

		deleteStudent(studentDAO);
			
		};
	}
	
	private void deleteStudent(StudentDAO studentDAO) {
		Long id = 8L; // sesuiakan dengan id student yang ingin di hapus
		System.out.println("Delete Student with id: " + id);
		studentDAO.delete(id);
	}
}
```

* Jika sukses maka outputnya sebagai berikut:

```
Delete Student with id: 6
Hibernate: select s1_0.id,s1_0.email,s1_0.first_name,s1_0.last_name from student s1_0 where s1_0.id=?
Hibernate: delete from student where id=?
```

* Cek database apakah data sudah terhapus:

```
mysql> select * from student;
+----+-------------------+------------+-----------+
| id | email             | first_name | last_name |
+----+-------------------+------------+-----------+
|  1 | ucup@gmail.com    | Ucup       | Topekox   |
|  2 | adep@gmail.com    | Ade        | Agustian  |
|  3 | azwar@gmail.com   | Azwar      | Anas      |
|  4 | munir@gmail.com   | Abdul      | Munir     |
|  5 | cantika@gmail.com | Made       | Cantika   |
+----+-------------------+------------+-----------+
5 rows in set (0.00 sec)
```
