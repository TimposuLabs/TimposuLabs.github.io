---
sidebar_position: 6
title: 'Lambda pada Collection'
---

Saat fitur Lambda keluar di Java 8, ada banyak sekali default method yang ditambahkan ke Java Collection. Beberapa ada default method yang banyak memanfaatkan fitur Lambda. Di materi ini kita akan bahas beberapa method yang memanfaatkan Lambda.

## 1️⃣ `Iterable.forEach`

Di dalam interface `Iterable` terdapat method `forEach` yang memiliki parameter `Consumer`, yang merupakan iterface function yang berasal dari package `java.util.function`, yang artinya kita dapat menggunakan ekspresi lambda terhadap method tersebut untuk menerima data.

:::info
📑 Baca: [Functional Interface Consumer](/java/java-lambda/functional-interface#consumer)
:::

Method `forEach` pada interface `Iterable`:

```java
default void forEach(Consumer<? super T> action) {
    Objects.requireNonNull(action);
    for (T t : this) {
        action.accept(t);
    }
}
```

Contoh penggunaan Lambda pada Collection `forEach`:

```java
List<String> names = List.of("Ayu", "Novi", "Eby");

// predicate menggunakan for loop
for (var name : names) {
    System.out.println(name);
}

// predicate menggunakan anonymous class
names.forEach(new Consumer<String>() {
    @Override
    public void accept(String value) {
        System.out.println(value);
    }
});

// predicate menggunakan lambda
names.forEach(value -> System.out.println(value));

// predicate menggunakan lambda method reference
names.forEach(System.out::println);
```

## 2️⃣ `Collection.removeIf`

Untuk menghapus elemen menggunakan lambda expression pada collection bisa meggunakan method `removeIf` yang ada pada class `Collection`, yang memiliki parameter `Predicate`, yang merupakan iterface function yang berasal dari package `java.util.function` yang akan mengembalikan nilai boolean.

:::info
📑 Baca: [Functional Interface Predicate](/java/java-lambda/functional-interface#predicate)
:::

Method `removeIf` pada interface `Collection`:

```java
default boolean removeIf(Predicate<? super E> filter) {
    Objects.requireNonNull(filter);
    boolean removed = false;
    final Iterator<E> each = iterator();
    while (each.hasNext()) {
        if (filter.test(each.next())) {
            each.remove();
            removed = true;
        }
    }
    return removed;
}
```

Contoh penggunaan Lambda pada Collection `removeIf`:

```java
List<String> names = new ArrayList<>(List.of("Aprizal", "Aan", "Komang", "Abid", "Agy", "Sultan"));

// removeif anonymous class
names.removeIf(new Predicate<String>() {
    @Override
    public boolean test(String value) {
        return value.length() > 5;
    }
});

// removeif menggunakan lambda
names.removeIf(value -> value.length() > 5);
```

:::warning
jika melakukan penghapusan data elemen, ketika dalam kondisi for loop
akan mengakibatkan kesalahan. Karena dapat mempengaruhi kondisi struktur elemen dalam collection. Contoh for loop remove data, ketika menghapus n pada contoh di bawah, `length() > 5` maka elemen sesudahnya akan dimajukan
untuk mengisi elemen yang sudah dihapus sehingga struktur elemen berubah, sehingga logic program tidak berjalan sebagaimana mestinya.

```java
List<String> names = new ArrayList<>(List.of("Aprizal", "Aan", "Komang", "Abid", "Agy", "Sultan"));

// dapat menimbulkan Error: ConcurrentModificationException
for (var n : names) {
   if (n.length() > 5) {
        names.remove(n); 
   }
}
```
:::

## 3️⃣ `Map.forEach`

Di dalam interface `Map` juga terdapat method `forEach` yang memiliki parameter `BiConsumer`, yang merupakan iterface function yang berasal dari package `java.util.function`, yang artinya kita dapat menggunakan ekspresi lambda terhadap method tersebut untuk menerima data dengan Key dan Value.

Method `forEach` pada interface `Map`:

```java
default void forEach(BiConsumer<? super K, ? super V> action) {
    Objects.requireNonNull(action);
    for (Map.Entry<K, V> entry : entrySet()) {
        K k;
        V v;
        try {
            k = entry.getKey();
            v = entry.getValue();
        } catch (IllegalStateException ise) {
            // this usually means the entry is no longer in the map.
            throw new ConcurrentModificationException(ise);
        }
        action.accept(k, v);
    }
}
```

Contoh penggunaan Lambda pada Map `forEach`:

```java
Map<String, String> map = new LinkedHashMap<>();
map.put("id", "Indonesia");
map.put("my", "Malaysia");
map.put("th", "Thailand");
map.put("ph", "Philippine");

// menggunakan for each loop
for (var m : map.entrySet()) {
    System.out.println("Key: " + m.getKey() + ", Value: " + m.getValue());
}

System.out.println();

// menggunakan forEach anonymous class
map.forEach(new BiConsumer<String, String>() {
    @Override
    public void accept(String key, String value) {
        System.out.println("Key: " + key + ", Value: " + value);

    }
});

// menggunakan lambda
map.forEach((key, value) -> System.out.println("Key: " + key + ", Value: " + value));
```

## Dan Masih Banyak Lagi

Sebenarnya masih banyak ekspresi lambda yang terdapat dalam Java Collection, untuk lebih lanjut bisa melihat dokumentasi dari Java Collection.
