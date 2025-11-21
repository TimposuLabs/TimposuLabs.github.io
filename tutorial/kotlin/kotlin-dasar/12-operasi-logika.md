---
sidebar_position: 12
title: 'Operasi Logika'
---

Operasi logika (Logical Operators) digunakan dalam Kotlin untuk menggabungkan atau memanipulasi nilai boolean (`true` atau `false`). Hasil dari operasi logika selalu berupa nilai boolean juga. 

## Operasi Boolean

| Operator | Keterangan |
| --- | --- |
| `&&` | Dan |
| `\|\|` | Atau |
| `!` | Kebalikan / Bukan(Not) |

## Operasi `&&`

| Nilai 1 | Operator | Nilai 2 | Hasil |
|---|---|---|---|
| `true` | `&&` | `true` | `true` |
| `true` | `&&` | `false` | `false`| 
| `false` | `&&` | `true` | `false` |
| `false` | `&&` | `false` | `false` |

Contoh:

```kotlin
val umur = 25
val punyaSIM = true
val punyaKtp = false

// --- Logical AND (&&) ---
// Apakah seseorang cukup umur (>= 18) DAN punya SIM?
val bisaMengemudi = (umur >= 18) && punyaSIM
println("Bisa mengemudi? $bisaMengemudi") 
// Output: Bisa mengemudi? true (karena 25 >= 18 adalah true, dan punyaSIM adalah true)

val kondisiKedua = (umur > 30) && punyaSIM
println("Kondisi kedua? $kondisiKedua")
// Output: Kondisi kedua? false (karena 25 > 30 adalah false)
```

## Operasi `||`

| Nilai 1 | Operator | Nilai 2 | Hasil |
| --- | --- | --- | --- |
| `true` | `\|\|` | `true` | `true` |
| `true` | `\|\|` | `false` | `true` |
| `false` | `\|\|` | `true` | `true` |
| `false` | `\|\|` | `false` | `false`|

Contoh:

```kotlin
// --- Logical OR (||) ---
// Apakah seseorang punya KTP ATAU punya SIM?
val punyaIdentitas = punyaKtp || punyaSIM
println("Punya identitas? $punyaIdentitas")
// Output: Punya identitas? true (karena salah satunya, punyaSIM, adalah true)

val tidakPunyaApaApa = punyaKtp || false 
println("Tidak punya apa-apa? $tidakPunyaApaApa")
// Output: Tidak punya apa-apa? false (karena kedua-duanya false)
```

## Operasi `!`

| Operator | Nilai | Hasil |
|---|---|---|
| `!` | `true` | `false` |
| `!` | `false` | `true` |

Contoh:

```kotlin
// --- Logical NOT (!) ---
// Membalikkan nilai boolean
val tidakPunyaKtp = !punyaKtp
println("Tidak punya KTP? $tidakPunyaKtp")
// Output: Tidak punya KTP? true
```