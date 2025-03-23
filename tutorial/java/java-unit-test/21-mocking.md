---
sidebar_position: 21
title: 'Mocking'
---

## Ketergantungan antar class

Saat membuat aplikasi yang besar, source code pun akan semakin besar, struktur class pun akan semakin kompleks. Kita tidak bisa memungkiri lagi bahwa akan ada ketergantungan antar class. Unit test yang bagus itu bisa terprediksi dan cukup mengetest ke satu function/method, jika harus mengetes interaksi antar class, lebih disarankan integration test. Lantas bagaimana jika kita harus mengetest class yang ketergantungan dengan class lain?. Solusinya adalah melakukan mocking terhadap dependency yang dibutuhkan class yang akan kita test.

## Pengenalan Mocking

Mocking sederhananya adalah membuat object tiruan. Hal ini dilakukan agar behavior object tersebut bisa kita tentukan sesuai dengan keinginan kita. Dengan mocking, kita bisa membuat request response seolah-olah object tersebut benar dibuat.

## Mockito

Ada banyak framework untuk melakukan mocking, namun di materi ini kita akan menggunakan Mockito. Mockito adalah salah satu mocking framework paling populer di Java, dan bisa digunakan juga untuk Kotlin. Mockito juga bisa diintegrasikan baik dengan JUnit

https://site.mockito.org/

### Menambahkan dependecy Mockito

Tambahkan dependecy Mockito di file `pom.xml`, contoh versi yang digunakan `5.15.2`, untuk versi baru dapat dilihat di repository Maven.

```xml
<dependency>
	<groupId>org.mockito</groupId>
	<artifactId>mockito-junit-jupiter</artifactId>
	<version>5.15.2</version>
	<scope>test</scope>
</dependency>
```

### Membuat Test Mock

Ketika membuat mock ada beberapa step:

1. __Membuat Mock object.__
2. __Menambahkan behavior ke Mock object.__
3. __Test Mock.__
4. __Verify Mock.__

Contoh:

```java
public class DemoMockitoTest {
	
	@Test
	void testMock() {
		
		// Membuat Mock Object contoh membuat mock/object tiruan dari List
		List<String> list = Mockito.mock(List.class);
		
		// Menambahkan behaviour ke mock object
		Mockito.when(list.get(0)).thenReturn("Ucup");
		
		// Test mock
		Assertions.assertEquals("Ucup", list.get(0));
		System.out.println(list.get(0));
		
		// Verify mock
		// melakukan verifikasi berapa kali method get(0) dipanggil, jika cocok maka test berhasil
		// Contoh: method get(0) hanya 2 kali dipanggil. Jika method get(0) dipanggil selain 2 kali maka test gagal
		Mockito.verify(list, Mockito.times(2)).get(0);
	}

}
```

## Contoh Mocking Test

Mockito memiliki `MockitoExtention` yang bisa kita gunakan untuk integrasi dengan JUnit. Hal ini memudahkan kita ketika ingin membuat mock object, kita cukup gunakan `@Mock`. Contoh kasus:

* Kita punya sebuah class model dengan nama class `Person(id: String, name: String)`.
* Selanjutnya kita punya interface `PersonRepository` sebagai interaksi ke database, dan memiliki method `selectById(id: String)` untuk melakukan mendapatkan data Person di database. Dan terakhir kita memiliki class `PersonService` yang digunakan sebagai class bisnis logic, dimana di class tersebut kita akan coba gunakan `PersonRepository` untuk mendapatkan data dari database, jika gagal, kita akan throw Exception yaitu `IllegalArgumentException`.

```java
mport org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.extension.Extensions;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.timposulabs.belajar.data.Person;
import com.timposulabs.belajar.repository.PersonRepository;
import com.timposulabs.belajar.service.PersonService;

@Extensions({
	@ExtendWith(MockitoExtension.class)
})
public class DemoPersonServiceMockTest {

	@Mock
	private PersonRepository personRepository;
	
	private PersonService personService;
	
	@BeforeEach
	void setUp() {
		personService = new PersonService(personRepository);
	}
	
	@Test
	void testGetPersonNotFound() {
		Assertions.assertThrows(IllegalArgumentException.class, () -> {
			personService.get(0);
		});
	}
	
	@Test
	void testGetPersonSuccess() {
		// menambahkan behavior ke mock object
		Mockito.when(personRepository.selectById(1))
				.thenReturn(new Person(1, "Ucup"));
		
		var person = personService.get(1);
		
		Assertions.assertNotNull(person);
		Assertions.assertEquals(1, person.getId());
		Assertions.assertNotNull("Ucup", person.getNama());
	}
	
	@Test
	void testCreatePersonSuccess() {
		var person = personService.create("Ucup");
		
		Assertions.assertNotNull(person);
		Assertions.assertEquals("Ucup", person.getNama());
		Assertions.assertNotNull(person.getId());
		
		// Verifikasi: pastikan setiap selesai memanggil mocking object pastikan melakukan verifikasi, untuk 
		// memastikan setiap method dalam mocking object telah dipanggil, dan berapa kali dipanggil.
		Mockito.verify(personRepository, Mockito.times(1))
				.insert(new Person(person.getId(), "Ucup"));
	}
}
```

## Verifikasi Mocking

Pada contoh sebelumnya, kita tidak melakukan verifikasi terhadap object mocking, apakah dipanggil atau tidak. Pada kasus sebelumnya mungkin tidak terlalu berguna karena kebetulan method nya mengembalikan value, sehingga kalo kita lupa memanggil method nya, sudah pasti unit test nya gagal. Lantas bagaimana jika method nya tidak mengembalikan value? Alias method unit. Contoh kasus kita akan melanjutkan kasus sebelumnya:

* Di interface `PersonRepository` kita akan membuat method `insert(person: Person)` yang digunakan untuk menyimpan data ke database, namun tidak mengembalikan value, alias void.
* Di class `PersonService` kita akan membuat method `register(name: String)` dimana akan membuat object Person dengan id random, lalu menyimpan ke database via `PersonRepository`, lalu mengembalikan object person tersebut.

1. Repository

```java
import com.timposulabs.belajar.data.Person;

public interface PersonRepository {

	Person selectById(int id);
	
	void insert(Person person);
	
}
```

2. Pada class Service

```java
public Person create(String name) {
	var person = new Person(new Random().nextInt(100), name); // generate random range 0 - 99
	repository.insert(person);
	return person;
}
```

3. JUnit Test

```java
void testCreatePersonSuccess() {
	var person = personService.create("Ucup");

	Assertions.assertNotNull(person);
	Assertions.assertEquals("Ucup", person.getNama());
	Assertions.assertNotNull(person.getId());
}
```

:::warning
Pada test di atas sebenarnya ada yang salah. Kalau kita hapus kode `personRepository.insert(person)` pada class Service, maka unit test nya pun tetap sukses. Hal ini terjadi karena, kita tidak melakukan verifikasi bahwa mocking object dipanggil. Hal ini sangat berbahaya, karena jika code sampai naik ke production, bisa jadi create datanya  sukses, tapi tidak masuk ke database.
:::

### Solusi = Menambahkan Verifikasi

Untuk mengatasi problem di atas kita perlu menambahkan verifikasi Mock.

```java
@Test
void testCreatePersonSuccess() {
	var person = personService.create("Ucup");
	
	Assertions.assertNotNull(person);
	Assertions.assertEquals("Ucup", person.getNama());
	Assertions.assertNotNull(person.getId());
	
	// Verifikasi: pastikan setiap selesai memanggil mocking object pastikan melakukan verifikasi, untuk 
	// memastikan setiap method dalam mocking object telah dipanggil, dan berapa kali dipanggil.
	Mockito.verify(personRepository, Mockito.times(1))
			.insert(new Person(person.getId(), "Ucup"));
}
```

Melakukan verifikasi akan memastikan setiap method yang di-mocking telah dipanggil dan berapa kali dia dipanggil.
