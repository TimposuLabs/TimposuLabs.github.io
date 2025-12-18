---
sidebar_position: 6
title: 'Java Set'
---

`Set` adalah salah satu collection yang berisikan elemen-elemen yang unik, atau tidak boleh duplicate.

 * `Set` tidak memiliki index seperti di `List`, oleh karena itu tidak ada jaminan data yang ada di `Set` itu akan terurut sesuai dengan waktu kita memasukkan data ke `Set`.
 * `Set` tidak memiliki method baru, jadi hanya menggunakan method yang ada di interface parent-nya, yaitu `Collection` dan `Iterable`.
 * Karena tidak memiliki index, untuk mengambil data di `Set` juga kita harus melakukan iterasi satu per satu.

Jadi bisa dikatakan `Set` adalah collection yang menampung elemen-elemenya secara unik sehingga datanya tidak ada yang ganda/sama.

Method yang dapat digunakan pada `Set`:

![](/img/java/set-method.png)

`Set` memiliki implentasi diantaranya:

 ![](https://www.programiz.com/sites/tutorial2program/files/java-set-implementation.png)
 ___source___: https://www.programiz.com/sites/tutorial2program/files/java-set-implementation.png
 
 ## Implentasi Set

Berikut beberapa implementasi Interface `Set`:

 | Nama | Uraian |
 | --- | --- |
 | `HashSet` | menampung datanya secara acak berdasarkan Hash |
 | `LinkedHashSet` | menampung datanya secara berurut menurut waktu pemasukan data (data  baru ditambah di bawah) |
 | `EnumSet` | implementasi `Set` yang datanya harus Enum |
 | `TreeSet` | menyimpan elemen-elemen unik dalam urutan yang terurut (secara otomatis atau melalui comparator kustom) |

 ### HashSet

Berikut contoh `HashSet` yang menampung datanya secara acak berdasarkan Hash.

```java
import java.util.HashSet;
import java.util.Set;

public class DemoSet {
	
	public static void main(String[] args) {
		
		Set<String> persons = new HashSet<String>();
		persons.add("Ucup");
		persons.add("Ade");
		persons.add("Restu");
		persons.add("Ade");
		persons.add("Ucup");
		
		for (var p : persons) {
			System.out.println(p);
		}
	}
	
}
```

Output:

```
Ucup
Restu
Ade
```

Dari output di atas data dapat dilihat bahwa data yang ditampung dalam `HashSet` tidak ada yang sama, dan ditampung secara acak tidak berdasarkan waktu memasukan data.

## LinkedHashSet

Berikut contoh `LinkedHashSet`:

```java
Set<String> persons = new LinkedHashSet<String>();

persons.add("Ucup");
persons.add("Ade");
persons.add("Restu");
persons.add("Ade");
persons.add("Ucup");

for (var p : persons) {
	System.out.println(p);
}
```

Output:

```
Ucup
Ade
Restu
```

Dari output di atas data dapat dilihat bahwa data yang ditampung dalam `LinkedHashSet` tidak ada yang sama, dan ditampung berdasarkan waktu memasukan data.

## EnumSet

Berikut contoh `EnumSet`:

```java
public class DemoSet {
	
	static enum Color {
		RED, GREEN, BLUE, YELLOW
	}

	public static void main(String[] args) {

		Set<Color> colors = EnumSet.allOf(Color.class);
			for(var c : colors) {
				System.out.println(c);
			}
		}
}
```

Output:

```
RED
GREEN
BLUE
YELLOW
```

Jika hanya menggunakan beberapa data pada `Enum`, gunakan method `of()`:

```java
Set<Color> colors = EnumSet.of(Color.BLUE, Color.YELLOW);

for(var c : colors) {
	System.out.println(c);
}
```

## TreeSet

Beberapa poin penting `TreeSet`:

* __Terurut secara Otomatis__: Elemen dalam `TreeSet` akan selalu tersusun secara urut (ascendending) secara default.
* __Elemen Unik__: Tidak mengizinkan adanya duplikasi data. Jika Anda memasukkan elemen yang sudah ada, elemen tersebut akan diabaikan.
* __Struktur Data__: Di balik layar, `TreeSet` menggunakan struktur data *Red-Black Tree* (pohon pencarian biner yang seimbang).
* __Performa__: Waktu akses untuk operasi dasar seperti `add`, `remove`, dan `contains` lebih lambat dibandingkan `HashSet`, tetapi memberikan keuntungan berupa data yang selalu terurut.
* __Tidak Mengizinkan Nilai Null__: `TreeSet` tidak memperbolehkan penyimpanan nilai null karena akan menimbulkan NullPointerException saat mencoba membandingkan elemen.
* __Tidak Thread-Safe__: Secara default, TreeSet tidak sinkron. Jika digunakan dalam lingkungan multi-thread, harus dikelola secara eksternal.

Contoh:

```java
import java.util.Set;
import java.util.TreeSet;

public class DemoTreeSet {

	public static void main(String[] args) {
		Set<Integer> number = new TreeSet<Integer>();
		number.add(5);
		number.add(34);
		number.add(0);
		
		for (int n : number) {
			System.out.println(n);
		}
	}

}
```

Output:

```
0
5
34
```
