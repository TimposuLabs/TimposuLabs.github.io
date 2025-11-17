---
sidebar_position: 17
title: 'Grouping & Partition'
---

## Grouping By

`Collectors` juga bisa digunakan untuk melakukan grouping by sebuah Stream. Hasil dari grouping by adalah `Map<Group, List<Value>>`.

```java
Map<String, List<Integer>> collect = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        .collect(Collectors.groupingBy(number -> {
        if ((number % 2) == 0) {
            return "Genap";
        } else {
            return "Ganjil";
        }
    }));

System.out.println(collect);
```

Output:

```
{Genap=[2, 4, 6, 8, 10], Ganjil=[1, 3, 5, 7, 9]}
```

Contoh lain:

```java
Map<String, List<String>> map = Stream.of("Aco", "Dandi", "Masyita", "Ade", "Recky", "Restu")
        .collect(Collectors.groupingBy(name -> {
            if (name.length() >= 5) {
                return "Panjang";
            } else {
                return "Pendek";
            }
        }));

System.out.println(map);
```

Output:

```
{Panjang=[Dandi, Masyita, Recky, Restu], Pendek=[Aco, Ade]}
```

## Partitioning By

Selain Grouping by, `Collectors` juga bisa digunakan untuk Partitioning by, hanya saja hasil dari partitioning by hanyalah 2 buah group boolean (true, false). Hal ini berarti partitioning by hanya akan menghasilkan `Map<Boolean, List<Value>>`.

```java
Map<Boolean, List<Integer>> collect = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        .collect(Collectors.partitioningBy(number -> {
            if ((number % 2) == 0) {
                return true;
            } else {
                return false;
            }
        }));

System.out.println(collect);
```

Output:

```
{false=[1, 3, 5, 7, 9], true=[2, 4, 6, 8, 10]}
```

Contoh lain:

```java
Map<Boolean, List<String>> collect = Stream.of("Messi", "Ronaldo", "Kaka", "Rivaldo", "Maldini", "Buffon")
        .collect(Collectors.partitioningBy(name -> {
            if (name.length() > 5) {
                return true;
            } else {
                return false;
            }
        }));

System.out.println(collect);
```

Output:

```
{false=[Messi, Kaka], true=[Ronaldo, Rivaldo, Maldini, Buffon]}
```