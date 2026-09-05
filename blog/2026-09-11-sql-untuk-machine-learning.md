---
slug: sql-untuk-machine-learning
title: "SQL untuk Machine Learning: Panduan Machine Learning untuk Pemula #10"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Dalam tutorial, data selalu datang sebagai berkas CSV yang rapi. Di dunia kerja, hampir tidak pernah begitu.
 
Data yang Anda butuhkan biasanya tersebar di beberapa tabel dalam sebuah database. Kolom yang Anda inginkan ada di tabel A, targetnya di tabel B, dan riwayat transaksinya di tabel C. Tidak ada yang akan menyiapkan CSV untuk Anda.
 
SQL adalah bahasa untuk mengambil dan menggabungkan data itu. Artikel ini membahas bagian-bagian SQL yang benar-benar dipakai praktisi machine learning, dengan penekanan pada satu hal yang sering terlewat: cara membangun dataset tanpa membocorkan informasi masa depan.

<!-- truncate -->

## Daftar Isi
 
1. Kenapa Praktisi Machine Learning Perlu SQL
2. Konsep Dasar Database
3. Menyiapkan Latihan Tanpa Instalasi
4. Mengambil Data dengan SELECT
5. Menyaring Data dengan WHERE
6. Mengurutkan dan Membatasi Hasil
7. Meringkas Data dengan GROUP BY
8. Menggabungkan Tabel dengan JOIN
9. Membersihkan Data Langsung di SQL
10. Subquery dan CTE
11. Window Function
12. Membangun Dataset Machine Learning dengan SQL
13. Menghubungkan SQL ke Python
14. Tips Praktis di Dunia Kerja
15. Kesalahan Pemula yang Sering Terjadi
## Kenapa Praktisi Machine Learning Perlu SQL
 
### Kenyataan di Dunia Kerja
 
Data perusahaan tersimpan di database, bukan di folder berisi CSV. Alasannya masuk akal: database menangani jutaan baris dengan efisien, memastikan data konsisten, dan bisa diakses banyak orang sekaligus.
 
Kalau Anda tidak bisa SQL, Anda akan selalu bergantung pada orang lain untuk menyiapkan data. Itu memperlambat pekerjaan dan membuat Anda tidak bisa bereksplorasi sendiri.
 
### Kapan Pakai SQL dan Kapan Pakai pandas
 
Ini pertanyaan yang sering muncul, dan jawabannya cukup sederhana.
 
**Pakai SQL** untuk mengambil, menyaring, menggabungkan, dan meringkas data dalam jumlah besar. Database jauh lebih cepat mengerjakan ini daripada Python, karena datanya tidak perlu dipindahkan ke komputer Anda dulu.
 
**Pakai pandas** setelah data masuk ke Python, untuk analisis lanjutan, pembuatan grafik, dan pemodelan.
 
**Aturan praktisnya:** kurangi ukuran data sebanyak mungkin di SQL, baru tarik ke Python. Menarik 50 juta baris ke pandas lalu menyaringnya jadi 100 ribu adalah pemborosan besar. Menyaringnya di SQL lalu menarik 100 ribu baris jauh lebih baik.
 
### Apa yang Perlu Dikuasai
 
Kabar baiknya, Anda tidak perlu menjadi ahli database. Sekitar delapan perintah sudah mencakup 90 persen kebutuhan sehari-hari: `SELECT`, `WHERE`, `GROUP BY`, `JOIN`, `CASE WHEN`, `COALESCE`, CTE, dan window function.
 
Artikel ini membahas semuanya.
 
## Konsep Dasar Database
 
### Tabel, Baris, dan Kolom
 
**Tabel** adalah kumpulan data yang tersusun seperti spreadsheet. Satu database berisi banyak tabel.
 
**Baris** adalah satu catatan, misalnya satu pelanggan atau satu transaksi.
 
**Kolom** adalah satu jenis informasi, dan tiap kolom punya tipe data tetap seperti teks, angka, atau tanggal.
 
### Kunci Primer dan Kunci Asing
 
**Kunci primer (primary key)** adalah kolom yang nilainya unik untuk tiap baris, biasanya berupa ID. Fungsinya memastikan tiap baris bisa dibedakan.
 
**Kunci asing (foreign key)** adalah kolom yang menunjuk ke kunci primer di tabel lain. Inilah yang menghubungkan antar tabel.
 
Contohnya, tabel `transaksi` punya kolom `id_pelanggan` yang menunjuk ke kolom `id` di tabel `pelanggan`. Lewat kolom inilah kedua tabel bisa digabungkan.
 
### Kenapa Data Dipecah jadi Banyak Tabel
 
Kalau semua informasi disimpan dalam satu tabel raksasa, nama dan alamat pelanggan akan berulang di setiap barisnya. Boros ruang, dan kalau alamat berubah, Anda harus mengubahnya di ribuan tempat.
 
Dengan memecah menjadi beberapa tabel yang saling terhubung, tiap informasi disimpan sekali saja. Konsekuensinya, Anda perlu `JOIN` untuk menyatukannya kembali.
 
### Jenis Database dan Perbedaan Dialek
 
Ada beberapa sistem database yang umum: PostgreSQL, MySQL, SQL Server, SQLite, dan BigQuery.
 
Sekitar 90 persen perintah SQL sama di semuanya. Yang berbeda biasanya fungsi tanggal dan fungsi teks tertentu. Kalau Anda menguasai satu, pindah ke yang lain hanya butuh penyesuaian kecil.
 
Artikel ini memakai SQLite karena sudah tersedia di Python tanpa instalasi apa pun.
 
## Menyiapkan Latihan Tanpa Instalasi
 
Kode berikut membuat database contoh langsung di komputer Anda. Jalankan sekali, lalu semua contoh di artikel ini bisa langsung dicoba.
 
```python
import sqlite3
import numpy as np
import pandas as pd
 
rng = np.random.RandomState(42)
koneksi = sqlite3.connect("latihan.db")
 
# Tabel 1: pelanggan
n_pelanggan = 500
pelanggan = pd.DataFrame({
    "id_pelanggan": range(1, n_pelanggan + 1),
    "nama": [f"Pelanggan {i}" for i in range(1, n_pelanggan + 1)],
    "kota": rng.choice(["Jakarta", "Bandung", "Surabaya", "Palu", "Medan"],
                       n_pelanggan),
    "umur": rng.randint(18, 70, n_pelanggan),
    "tanggal_daftar": pd.to_datetime("2023-01-01") +
                      pd.to_timedelta(rng.randint(0, 500, n_pelanggan), unit="D"),
    "paket": rng.choice(["basic", "premium", "vip"], n_pelanggan, p=[.5, .35, .15]),
})
pelanggan.loc[pelanggan.sample(40, random_state=1).index, "umur"] = None
 
# Tabel 2: transaksi
n_transaksi = 5000
transaksi = pd.DataFrame({
    "id_transaksi": range(1, n_transaksi + 1),
    "id_pelanggan": rng.randint(1, n_pelanggan + 1, n_transaksi),
    "tanggal": pd.to_datetime("2024-01-01") +
               pd.to_timedelta(rng.randint(0, 400, n_transaksi), unit="D"),
    "nominal": (rng.lognormal(11, 0.8, n_transaksi)).round(0),
    "kategori": rng.choice(["pulsa", "listrik", "belanja", "transfer"], n_transaksi),
})
 
# Tabel 3: tiket dukungan
n_tiket = 1200
tiket = pd.DataFrame({
    "id_tiket": range(1, n_tiket + 1),
    "id_pelanggan": rng.randint(1, n_pelanggan + 1, n_tiket),
    "tanggal": pd.to_datetime("2024-01-01") +
               pd.to_timedelta(rng.randint(0, 400, n_tiket), unit="D"),
    "jenis": rng.choice(["keluhan", "pertanyaan", "permintaan"], n_tiket),
    "selesai": rng.choice([0, 1], n_tiket, p=[.2, .8]),
})
 
# Tabel 4: status berhenti berlangganan (target)
status = pd.DataFrame({
    "id_pelanggan": range(1, n_pelanggan + 1),
    "berhenti": rng.choice([0, 1], n_pelanggan, p=[.8, .2]),
    "tanggal_berhenti": pd.to_datetime("2025-01-01") +
                        pd.to_timedelta(rng.randint(0, 120, n_pelanggan), unit="D"),
})
 
for nama_tabel, data in [("pelanggan", pelanggan), ("transaksi", transaksi),
                         ("tiket", tiket), ("status", status)]:
    data.to_sql(nama_tabel, koneksi, if_exists="replace", index=False)
 
print("Database siap. Tabel yang tersedia:")
print(pd.read_sql("SELECT name FROM sqlite_master WHERE type='table'", koneksi))
```
 
### Fungsi Pembantu untuk Menjalankan Query
 
```python
def q(perintah):
    """Menjalankan query SQL dan menampilkan hasilnya sebagai DataFrame."""
    return pd.read_sql(perintah, koneksi)
 
print(q("SELECT * FROM pelanggan LIMIT 5"))
```
 
## Mengambil Data dengan SELECT
 
### Bentuk Paling Dasar
 
```sql
SELECT kolom1, kolom2
FROM nama_tabel;
```
 
`SELECT` menyebutkan kolom mana yang ingin diambil, `FROM` menyebutkan dari tabel mana.
 
```python
print(q("""
SELECT id_pelanggan, nama, kota, umur
FROM pelanggan
LIMIT 5
"""))
```
 
### Mengambil Semua Kolom
 
Tanda bintang berarti semua kolom.
 
```python
print(q("SELECT * FROM transaksi LIMIT 5"))
```
 
#### Peringatan
 
Jangan biasakan memakai `SELECT *` pada tabel besar. Anda akan menarik banyak kolom yang tidak dibutuhkan, dan itu lambat. Pakai hanya saat eksplorasi awal.
 
### Memberi Nama Baru pada Kolom
 
Kata `AS` mengganti nama kolom di hasil, tanpa mengubah tabel aslinya.
 
```python
print(q("""
SELECT
    nama AS nama_pelanggan,
    umur AS usia,
    kota
FROM pelanggan
LIMIT 5
"""))
```
 
Ini berguna terutama saat kolom hasil perhitungan, yang kalau tidak diberi nama akan muncul sebagai nama panjang yang aneh.
 
### Membuat Kolom Baru dari Perhitungan
 
```python
print(q("""
SELECT
    id_transaksi,
    nominal,
    nominal * 0.11 AS pajak,
    nominal * 1.11 AS total
FROM transaksi
LIMIT 5
"""))
```
 
### Melihat Nilai Unik
 
```python
print(q("SELECT DISTINCT kota FROM pelanggan"))
print(q("SELECT DISTINCT kategori FROM transaksi"))
```
 
Ini perintah pertama yang sebaiknya dijalankan saat mengenal kolom kategori baru. Anda akan langsung melihat kalau ada penulisan yang tidak seragam.
 
### Urutan Penulisan dan Urutan Eksekusi
 
Ini konsep yang penting dipahami sejak awal karena menjelaskan banyak error yang membingungkan.
 
**Urutan penulisan** dalam query:
 
```
SELECT → FROM → JOIN → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT
```
 
**Urutan yang sebenarnya dikerjakan komputer:**
 
```
FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```
 
Perhatikan bahwa `SELECT` dikerjakan hampir terakhir. Konsekuensinya, nama alias yang Anda buat di `SELECT` **belum ada** saat `WHERE` dijalankan.
 
```python
# INI ERROR: alias belum tersedia saat WHERE dijalankan
# SELECT nominal * 1.11 AS total FROM transaksi WHERE total > 100000
 
# INI BENAR: tulis ulang perhitungannya
print(q("""
SELECT nominal, nominal * 1.11 AS total
FROM transaksi
WHERE nominal * 1.11 > 500000
LIMIT 5
"""))
```
 
Menariknya, alias **boleh** dipakai di `ORDER BY`, karena `ORDER BY` dikerjakan setelah `SELECT`.
 
## Menyaring Data dengan WHERE
 
### Operator Dasar
 
```python
print(q("""
SELECT nama, umur, kota
FROM pelanggan
WHERE umur > 50
LIMIT 5
"""))
```
 
Operator yang tersedia: `=` (sama dengan), `!=` atau `<>` (tidak sama), `>`, `<`, `>=`, `<=`.
 
Perhatikan bahwa "sama dengan" di SQL memakai **satu** tanda sama dengan, bukan dua seperti di Python.
 
### Menggabungkan Beberapa Syarat
 
```python
print(q("""
SELECT nama, umur, kota, paket
FROM pelanggan
WHERE umur > 40
  AND kota = 'Jakarta'
  AND paket != 'basic'
LIMIT 10
"""))
```
 
Teks ditulis dalam tanda kutip tunggal, angka tanpa kutip.
 
#### Jebakan Urutan AND dan OR
 
`AND` dikerjakan lebih dulu daripada `OR`. Kalau mencampur keduanya, **selalu pakai tanda kurung** supaya maksudnya jelas.
 
```python
# Tanpa kurung, hasilnya mungkin bukan yang Anda maksud
print(q("""
SELECT COUNT(*) AS jumlah FROM pelanggan
WHERE kota = 'Jakarta' OR kota = 'Bandung' AND umur > 50
"""))
 
# Dengan kurung, maksudnya jelas
print(q("""
SELECT COUNT(*) AS jumlah FROM pelanggan
WHERE (kota = 'Jakarta' OR kota = 'Bandung') AND umur > 50
"""))
```
 
### IN untuk Beberapa Pilihan
 
```python
print(q("""
SELECT nama, kota
FROM pelanggan
WHERE kota IN ('Jakarta', 'Bandung', 'Palu')
LIMIT 5
"""))
```
 
Ini lebih ringkas daripada menulis `kota = 'Jakarta' OR kota = 'Bandung' OR ...`.
 
### BETWEEN untuk Rentang
 
```python
print(q("""
SELECT nama, umur
FROM pelanggan
WHERE umur BETWEEN 30 AND 40
LIMIT 5
"""))
```
 
`BETWEEN` bersifat inklusif, artinya nilai 30 dan 40 ikut masuk.
 
### LIKE untuk Pencarian Teks
 
```python
print(q("""
SELECT nama FROM pelanggan
WHERE nama LIKE '%1%'
LIMIT 5
"""))
```
 
Tanda `%` berarti "karakter apa pun, berapa pun jumlahnya". Tanda `_` berarti "tepat satu karakter apa pun".
 
- `'A%'` berarti diawali huruf A
- `'%A'` berarti diakhiri huruf A
- `'%A%'` berarti mengandung huruf A di mana pun
### Menangani Nilai Kosong
 
Ini jebakan yang paling sering menjerat pemula.
 
```python
# INI SALAH dan tidak akan menghasilkan apa-apa
print(q("SELECT COUNT(*) AS salah FROM pelanggan WHERE umur = NULL"))
 
# INI BENAR
print(q("SELECT COUNT(*) AS benar FROM pelanggan WHERE umur IS NULL"))
print(q("SELECT COUNT(*) AS terisi FROM pelanggan WHERE umur IS NOT NULL"))
```
 
#### Kenapa Begitu
 
`NULL` berarti "tidak diketahui", bukan "kosong" atau "nol". Membandingkan sesuatu yang tidak diketahui dengan apa pun akan menghasilkan "tidak diketahui", bukan benar atau salah.
 
Karena itu harus memakai `IS NULL`, bukan `= NULL`.
 
#### Jebakan Lanjutan
 
`NULL` juga tidak ikut terjaring pada penyaringan biasa.
 
```python
print(q("""
SELECT
    (SELECT COUNT(*) FROM pelanggan) AS total,
    (SELECT COUNT(*) FROM pelanggan WHERE umur > 50) AS diatas_50,
    (SELECT COUNT(*) FROM pelanggan WHERE umur <= 50) AS sampai_50
"""))
```
 
Perhatikan bahwa `diatas_50` ditambah `sampai_50` **tidak sama** dengan total. Selisihnya adalah baris yang umurnya `NULL`, yang tidak masuk ke keduanya.
 
Ini bisa membuat Anda kehilangan data tanpa sadar.
 
## Mengurutkan dan Membatasi Hasil
 
### ORDER BY
 
```python
print(q("""
SELECT nama, nominal
FROM transaksi
ORDER BY nominal DESC
LIMIT 5
""".replace("nama, ", "id_transaksi, ")))
```
 
`ASC` berarti menaik (bawaan), `DESC` berarti menurun.
 
### Mengurutkan Berdasarkan Beberapa Kolom
 
```python
print(q("""
SELECT kota, umur, nama
FROM pelanggan
WHERE umur IS NOT NULL
ORDER BY kota ASC, umur DESC
LIMIT 10
"""))
```
 
Diurutkan berdasarkan kota dulu, lalu di dalam tiap kota diurutkan berdasarkan umur.
 
### LIMIT dan OFFSET
 
```python
print(q("SELECT * FROM pelanggan ORDER BY id_pelanggan LIMIT 5 OFFSET 10"))
```
 
`OFFSET 10` berarti melewati 10 baris pertama. Berguna untuk menampilkan data secara bertahap.
 
#### Kebiasaan Penting
 
**Selalu pakai `LIMIT` saat eksplorasi.** Menjalankan query tanpa batas pada tabel berisi 500 juta baris bisa membuat komputer Anda macet atau membebani server perusahaan.
 
## Meringkas Data dengan GROUP BY
 
### Fungsi Agregasi
 
Fungsi agregasi meringkas banyak baris menjadi satu angka.
 
```python
print(q("""
SELECT
    COUNT(*) AS jumlah_transaksi,
    SUM(nominal) AS total_nominal,
    AVG(nominal) AS rata_nominal,
    MIN(nominal) AS terkecil,
    MAX(nominal) AS terbesar
FROM transaksi
"""))
```
 
### Jebakan COUNT
 
Ini perbedaan halus yang penting.
 
```python
print(q("""
SELECT
    COUNT(*) AS semua_baris,
    COUNT(umur) AS umur_terisi,
    COUNT(DISTINCT kota) AS jumlah_kota
FROM pelanggan
"""))
```
 
**`COUNT(*)`** menghitung semua baris, termasuk yang punya nilai kosong.
 
**`COUNT(kolom)`** hanya menghitung baris yang kolom itu **tidak kosong**.
 
Selisih antara keduanya adalah jumlah nilai kosong. Ini trik cepat untuk memeriksa kelengkapan data.
 
Hal serupa berlaku untuk `AVG`, yang mengabaikan `NULL` saat menghitung rata-rata. Kadang itu yang Anda mau, kadang bukan.
 
### Meringkas per Kelompok
 
```python
print(q("""
SELECT
    kota,
    COUNT(*) AS jumlah_pelanggan,
    AVG(umur) AS rata_umur,
    MIN(umur) AS umur_termuda,
    MAX(umur) AS umur_tertua
FROM pelanggan
GROUP BY kota
ORDER BY jumlah_pelanggan DESC
"""))
```
 
#### Aturan Penting GROUP BY
 
Semua kolom di `SELECT` harus berupa salah satu dari dua hal: kolom yang ada di `GROUP BY`, atau kolom yang dibungkus fungsi agregasi.
 
Kalau Anda menulis kolom lain, sebagian database akan menolak dengan pesan error, dan SQLite akan memberi hasil yang tidak bisa diprediksi.
 
### Mengelompokkan Berdasarkan Beberapa Kolom
 
```python
print(q("""
SELECT
    kota,
    paket,
    COUNT(*) AS jumlah,
    ROUND(AVG(umur), 1) AS rata_umur
FROM pelanggan
GROUP BY kota, paket
ORDER BY kota, jumlah DESC
LIMIT 12
"""))
```
 
### HAVING: Menyaring Hasil Ringkasan
 
Ini perbedaan yang sering membingungkan pemula.
 
**`WHERE`** menyaring baris **sebelum** diringkas.
 
**`HAVING`** menyaring hasil **setelah** diringkas.
 
```python
print(q("""
SELECT
    id_pelanggan,
    COUNT(*) AS jumlah_transaksi,
    SUM(nominal) AS total
FROM transaksi
WHERE kategori != 'transfer'        -- menyaring baris dulu
GROUP BY id_pelanggan
HAVING COUNT(*) >= 15               -- menyaring kelompok setelah dihitung
ORDER BY total DESC
LIMIT 10
"""))
```
 
Kalau Anda ingin menyaring berdasarkan hasil `COUNT` atau `SUM`, `WHERE` tidak bisa dipakai karena angka itu belum ada saat `WHERE` dijalankan.
 
## Menggabungkan Tabel dengan JOIN
 
### Analogi Sederhana
 
Bayangkan dua buku catatan. Buku pertama berisi daftar nama dan nomor identitas siswa. Buku kedua berisi nomor identitas dan nilai ujian.
 
Untuk membuat daftar nama beserta nilainya, Anda harus mencocokkan nomor identitas dari kedua buku. Itulah `JOIN`.
 
### INNER JOIN
 
Hanya mengambil baris yang **cocok di kedua tabel**.
 
```python
print(q("""
SELECT
    p.nama,
    p.kota,
    t.tanggal,
    t.nominal
FROM pelanggan AS p
INNER JOIN transaksi AS t
    ON p.id_pelanggan = t.id_pelanggan
LIMIT 10
"""))
```
 
#### Memahami Penulisannya
 
`AS p` dan `AS t` adalah singkatan nama tabel, supaya tidak perlu menulis nama panjang berulang kali.
 
`ON` menyebutkan kolom mana yang dipakai untuk mencocokkan.
 
Kalau nama kolom sama di kedua tabel, Anda harus menulis `p.id_pelanggan` bukan sekadar `id_pelanggan`, supaya jelas yang mana yang dimaksud.
 
### LEFT JOIN
 
Ini yang paling penting untuk machine learning.
 
`LEFT JOIN` mengambil **semua baris dari tabel kiri**, dan menambahkan data dari tabel kanan kalau ada. Kalau tidak ada pasangannya, kolom dari tabel kanan diisi `NULL`.
 
```python
print(q("""
SELECT
    p.id_pelanggan,
    p.nama,
    COUNT(t.id_transaksi) AS jumlah_transaksi
FROM pelanggan AS p
LEFT JOIN transaksi AS t
    ON p.id_pelanggan = t.id_pelanggan
GROUP BY p.id_pelanggan, p.nama
ORDER BY jumlah_transaksi ASC
LIMIT 10
"""))
```
 
#### Kenapa LEFT JOIN Penting untuk ML
 
Karena Anda tidak ingin kehilangan baris.
 
Bayangkan Anda punya 500 pelanggan, dan 50 di antaranya belum pernah bertransaksi. Kalau memakai `INNER JOIN`, 50 pelanggan itu **hilang** dari dataset Anda.
 
Padahal fakta bahwa mereka belum pernah bertransaksi justru mungkin informasi paling penting untuk memprediksi apakah mereka akan berhenti berlangganan.
 
Dengan `LEFT JOIN`, mereka tetap ada dengan jumlah transaksi `NULL`, yang bisa Anda ubah menjadi nol.
 
### Membandingkan Keduanya
 
```python
print(q("""
SELECT
    (SELECT COUNT(*) FROM pelanggan) AS total_pelanggan,
    (SELECT COUNT(DISTINCT p.id_pelanggan)
     FROM pelanggan p INNER JOIN transaksi t
       ON p.id_pelanggan = t.id_pelanggan) AS punya_transaksi,
    (SELECT COUNT(DISTINCT p.id_pelanggan)
     FROM pelanggan p LEFT JOIN transaksi t
       ON p.id_pelanggan = t.id_pelanggan) AS hasil_left_join
"""))
```
 
Angka `hasil_left_join` selalu sama dengan `total_pelanggan`, sementara `punya_transaksi` bisa lebih sedikit.
 
### Jebakan Terbesar: Baris Menggandakan
 
Ini masalah yang sering merusak dataset tanpa disadari.
 
```python
print(q("SELECT COUNT(*) AS jumlah_pelanggan FROM pelanggan"))
 
print(q("""
SELECT COUNT(*) AS jumlah_baris_setelah_join
FROM pelanggan p
LEFT JOIN transaksi t ON p.id_pelanggan = t.id_pelanggan
"""))
```
 
Hasilnya melonjak dari 500 menjadi ribuan.
 
#### Kenapa Terjadi
 
Karena satu pelanggan punya banyak transaksi. Saat digabungkan, baris pelanggan itu **diulang** sebanyak jumlah transaksinya.
 
Kalau Anda memakai hasil ini langsung sebagai dataset, pelanggan yang sering bertransaksi akan muncul ratusan kali dan mendominasi pelatihan model.
 
#### Solusinya
 
Ringkas dulu tabel yang banyak barisnya, baru gabungkan.
 
```python
print(q("""
SELECT
    p.id_pelanggan,
    p.nama,
    p.kota,
    COALESCE(r.jumlah_transaksi, 0) AS jumlah_transaksi,
    COALESCE(r.total_nominal, 0) AS total_nominal
FROM pelanggan p
LEFT JOIN (
    SELECT
        id_pelanggan,
        COUNT(*) AS jumlah_transaksi,
        SUM(nominal) AS total_nominal
    FROM transaksi
    GROUP BY id_pelanggan
) AS r ON p.id_pelanggan = r.id_pelanggan
LIMIT 10
"""))
```
 
Tabel dalam kurung meringkas transaksi menjadi satu baris per pelanggan lebih dulu. Setelah digabung, jumlah barisnya tetap 500.
 
### Kebiasaan Wajib: Periksa Jumlah Baris
 
Setiap kali melakukan `JOIN`, selalu bandingkan jumlah baris sebelum dan sesudahnya.
 
```python
def cek_join(query, harapan):
    hasil = q(f"SELECT COUNT(*) AS n FROM ({query})")["n"][0]
    status = "AMAN" if hasil == harapan else "PERIKSA LAGI"
    print(f"Baris: {hasil} (diharapkan {harapan}) -> {status}")
 
cek_join("""
SELECT p.id_pelanggan FROM pelanggan p
LEFT JOIN transaksi t ON p.id_pelanggan = t.id_pelanggan
""", 500)
```
 
Kalau jumlahnya bertambah, ada penggandaan. Kalau berkurang, Anda memakai `INNER JOIN` padahal seharusnya `LEFT JOIN`.
 
## Membersihkan Data Langsung di SQL
 
Banyak pembersihan bisa dilakukan di SQL sebelum data ditarik ke Python. Ini lebih efisien.
 
### COALESCE: Mengisi Nilai Kosong
 
```python
print(q("""
SELECT
    nama,
    umur,
    COALESCE(umur, 0) AS umur_diisi_nol,
    COALESCE(umur, (SELECT AVG(umur) FROM pelanggan)) AS umur_diisi_rata
FROM pelanggan
WHERE umur IS NULL
LIMIT 5
"""))
```
 
`COALESCE` mengembalikan nilai pertama yang tidak kosong dari daftar yang diberikan.
 
#### Peringatan untuk Machine Learning
 
Hati-hati mengisi nilai kosong di SQL. Kalau Anda mengisinya dengan rata-rata dari **seluruh** data, itu bentuk kebocoran karena rata-rata itu ikut menghitung data uji.
 
Untuk keperluan pemodelan, lebih aman mengisi `NULL` dengan nol untuk hitungan (misalnya jumlah transaksi yang memang nol), dan membiarkan sisanya untuk diisi lewat `Pipeline` di Python.
 
### CASE WHEN: Membuat Kategori
 
Ini padanan `if-else` di SQL, dan sangat berguna untuk membuat fitur baru.
 
```python
print(q("""
SELECT
    nama,
    umur,
    CASE
        WHEN umur IS NULL THEN 'tidak diketahui'
        WHEN umur < 25 THEN 'muda'
        WHEN umur < 45 THEN 'dewasa'
        WHEN umur < 60 THEN 'paruh baya'
        ELSE 'senior'
    END AS kelompok_umur
FROM pelanggan
LIMIT 10
"""))
```
 
Syarat diperiksa berurutan dari atas, dan yang pertama cocok yang dipakai. Karena itu urutannya penting.
 
### CASE WHEN untuk Menghitung Bersyarat
 
Ini pola yang sangat sering dipakai dalam rekayasa fitur.
 
```python
print(q("""
SELECT
    id_pelanggan,
    COUNT(*) AS total_tiket,
    SUM(CASE WHEN jenis = 'keluhan' THEN 1 ELSE 0 END) AS jumlah_keluhan,
    SUM(CASE WHEN selesai = 0 THEN 1 ELSE 0 END) AS belum_selesai,
    ROUND(AVG(CASE WHEN jenis = 'keluhan' THEN 1.0 ELSE 0.0 END), 3) AS rasio_keluhan
FROM tiket
GROUP BY id_pelanggan
ORDER BY jumlah_keluhan DESC
LIMIT 10
"""))
```
 
Pola `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` adalah cara menghitung berapa baris yang memenuhi syarat tertentu di dalam tiap kelompok.
 
### Membersihkan Teks
 
```python
print(q("""
SELECT
    kota,
    LOWER(TRIM(kota)) AS kota_bersih,
    UPPER(kota) AS kota_kapital,
    LENGTH(kota) AS panjang
FROM pelanggan
LIMIT 5
"""))
```
 
`TRIM` menghapus spasi di awal dan akhir, `LOWER` mengubah jadi huruf kecil, `REPLACE` mengganti bagian teks.
 
### Bekerja dengan Tanggal
 
Fungsi tanggal adalah bagian yang paling berbeda antar jenis database. Contoh berikut untuk SQLite.
 
```python
print(q("""
SELECT
    tanggal,
    STRFTIME('%Y', tanggal) AS tahun,
    STRFTIME('%m', tanggal) AS bulan,
    STRFTIME('%w', tanggal) AS hari_ke,
    JULIANDAY('2025-06-01') - JULIANDAY(tanggal) AS selisih_hari
FROM transaksi
LIMIT 5
"""))
```
 
Di PostgreSQL, padanannya adalah `EXTRACT(YEAR FROM tanggal)` dan pengurangan tanggal langsung. Di MySQL ada `YEAR()` dan `DATEDIFF()`.
 
Kalau pindah database, ini bagian pertama yang perlu disesuaikan.
 
## Subquery dan CTE
 
### Subquery
 
Subquery adalah query di dalam query.
 
```python
print(q("""
SELECT nama, umur
FROM pelanggan
WHERE umur > (SELECT AVG(umur) FROM pelanggan)
LIMIT 5
"""))
```
 
Query di dalam kurung dijalankan lebih dulu, hasilnya dipakai oleh query luar.
 
### CTE: Cara yang Lebih Mudah Dibaca
 
CTE singkatan dari *Common Table Expression*. Fungsinya sama seperti subquery, tapi ditulis di depan dengan nama, sehingga jauh lebih mudah dibaca.
 
```python
print(q("""
WITH ringkasan_transaksi AS (
    SELECT
        id_pelanggan,
        COUNT(*) AS jumlah,
        SUM(nominal) AS total,
        AVG(nominal) AS rata_rata
    FROM transaksi
    GROUP BY id_pelanggan
),
ringkasan_tiket AS (
    SELECT
        id_pelanggan,
        COUNT(*) AS jumlah_tiket,
        SUM(CASE WHEN jenis = 'keluhan' THEN 1 ELSE 0 END) AS keluhan
    FROM tiket
    GROUP BY id_pelanggan
)
SELECT
    p.id_pelanggan,
    p.kota,
    p.paket,
    COALESCE(rt.jumlah, 0) AS jumlah_transaksi,
    COALESCE(rt.total, 0) AS total_nominal,
    COALESCE(tk.jumlah_tiket, 0) AS jumlah_tiket,
    COALESCE(tk.keluhan, 0) AS jumlah_keluhan
FROM pelanggan p
LEFT JOIN ringkasan_transaksi rt ON p.id_pelanggan = rt.id_pelanggan
LEFT JOIN ringkasan_tiket tk ON p.id_pelanggan = tk.id_pelanggan
LIMIT 10
"""))
```
 
### Kenapa CTE Lebih Disukai
 
**Lebih mudah dibaca.** Query dipecah menjadi langkah-langkah bernama, dibaca dari atas ke bawah.
 
**Lebih mudah diperbaiki.** Anda bisa menjalankan tiap bagian CTE secara terpisah untuk memeriksa hasilnya.
 
**Bisa dipakai berulang.** Satu CTE bisa dirujuk beberapa kali di query yang sama.
 
Untuk query yang panjang, hampir selalu pakai CTE alih-alih subquery bertingkat.
 
## Window Function
 
### Bedanya dengan GROUP BY
 
Ini konsep yang butuh sedikit waktu untuk dipahami, tapi sangat berguna.
 
**`GROUP BY`** meringkas banyak baris menjadi satu. Data aslinya hilang.
 
**Window function** menghitung sesuatu per kelompok, tapi **semua baris tetap ada**.
 
```python
print(q("""
SELECT
    id_pelanggan,
    tanggal,
    nominal,
    SUM(nominal) OVER (PARTITION BY id_pelanggan) AS total_pelanggan,
    AVG(nominal) OVER (PARTITION BY id_pelanggan) AS rata_pelanggan,
    nominal - AVG(nominal) OVER (PARTITION BY id_pelanggan) AS selisih_dari_rata
FROM transaksi
WHERE id_pelanggan <= 3
ORDER BY id_pelanggan, tanggal
LIMIT 15
"""))
```
 
Perhatikan bahwa tiap transaksi tetap muncul sebagai baris tersendiri, tapi masing-masing sekarang punya informasi tentang total dan rata-rata pelanggannya.
 
`PARTITION BY` adalah padanan `GROUP BY` untuk window function.
 
### ROW_NUMBER: Mengambil Baris Terbaru per Kelompok
 
Ini pola yang sangat sering dipakai.
 
```python
print(q("""
WITH bernomor AS (
    SELECT
        id_pelanggan,
        tanggal,
        nominal,
        kategori,
        ROW_NUMBER() OVER (PARTITION BY id_pelanggan ORDER BY tanggal DESC) AS urutan
    FROM transaksi
)
SELECT id_pelanggan, tanggal, nominal, kategori
FROM bernomor
WHERE urutan = 1
ORDER BY id_pelanggan
LIMIT 10
"""))
```
 
Cara kerjanya: tiap transaksi diberi nomor urut di dalam kelompok pelanggannya, diurutkan dari yang terbaru. Lalu diambil yang bernomor 1.
 
Ini cara standar mengambil "catatan terakhir per entitas", yang sering dibutuhkan saat membangun dataset.
 
### LAG dan LEAD: Melihat Baris Sebelum atau Sesudah
 
```python
print(q("""
SELECT
    id_pelanggan,
    tanggal,
    nominal,
    LAG(nominal) OVER (PARTITION BY id_pelanggan ORDER BY tanggal) AS nominal_sebelumnya,
    nominal - LAG(nominal) OVER (PARTITION BY id_pelanggan ORDER BY tanggal) AS perubahan,
    JULIANDAY(tanggal) - JULIANDAY(
        LAG(tanggal) OVER (PARTITION BY id_pelanggan ORDER BY tanggal)
    ) AS jeda_hari
FROM transaksi
WHERE id_pelanggan <= 2
ORDER BY id_pelanggan, tanggal
LIMIT 12
"""))
```
 
Ini sangat berguna untuk rekayasa fitur. Kolom `jeda_hari` misalnya, menunjukkan seberapa sering pelanggan bertransaksi, dan jeda yang makin panjang sering menjadi tanda awal pelanggan akan berhenti.
 
### Perhitungan Berjalan
 
```python
print(q("""
SELECT
    id_pelanggan,
    tanggal,
    nominal,
    SUM(nominal) OVER (
        PARTITION BY id_pelanggan ORDER BY tanggal
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS total_berjalan,
    AVG(nominal) OVER (
        PARTITION BY id_pelanggan ORDER BY tanggal
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS rata_3_terakhir
FROM transaksi
WHERE id_pelanggan = 1
ORDER BY tanggal
LIMIT 10
"""))
```
 
Perhatikan `ROWS BETWEEN ... AND CURRENT ROW`. Ini memastikan perhitungan hanya memakai baris **sampai baris ini saja**, tidak melihat ke depan.
 
Ini bukan sekadar detail teknis. Untuk data berurutan waktu, ini yang mencegah kebocoran informasi masa depan.
 
## Membangun Dataset Machine Learning dengan SQL
 
### Masalah Terbesar: Kebocoran Waktu
 
Ini bagian paling penting dari seluruh artikel ini.
 
Bayangkan Anda memprediksi apakah pelanggan akan berhenti berlangganan. Anda membuat fitur "jumlah transaksi pelanggan ini".
 
Pertanyaannya: transaksi sampai kapan?
 
Kalau Anda menghitung **seluruh** transaksi yang ada di database, Anda memasukkan transaksi yang terjadi **setelah** pelanggan itu berhenti. Model Anda akan tampak sangat akurat, karena pelanggan yang sudah berhenti tentu saja tidak punya transaksi baru.
 
Di dunia nyata, saat Anda ingin memprediksi pelanggan yang **masih aktif**, informasi masa depan itu tidak ada. Model Anda akan gagal total.
 
### Solusinya: Tanggal Potong
 
Tetapkan satu tanggal sebagai batas. Semua fitur dihitung dari data **sebelum** tanggal itu. Target diambil dari kejadian **sesudah** tanggal itu.
 
```
        Fitur dihitung di sini          Target diamati di sini
    |------------------------------|----------------------------|
   awal                      tanggal potong                   akhir
```
 
### Contoh Query Lengkap
 
```python
TANGGAL_POTONG = "2024-10-01"
 
query_dataset = f"""
WITH fitur_transaksi AS (
    SELECT
        id_pelanggan,
        COUNT(*) AS jumlah_transaksi,
        SUM(nominal) AS total_nominal,
        AVG(nominal) AS rata_nominal,
        MAX(nominal) AS nominal_terbesar,
        COUNT(DISTINCT kategori) AS ragam_kategori,
        JULIANDAY('{TANGGAL_POTONG}') - JULIANDAY(MAX(tanggal)) AS hari_sejak_transaksi_terakhir
    FROM transaksi
    WHERE tanggal < '{TANGGAL_POTONG}'          -- kunci pencegah kebocoran
    GROUP BY id_pelanggan
),
fitur_tiket AS (
    SELECT
        id_pelanggan,
        COUNT(*) AS jumlah_tiket,
        SUM(CASE WHEN jenis = 'keluhan' THEN 1 ELSE 0 END) AS jumlah_keluhan,
        SUM(CASE WHEN selesai = 0 THEN 1 ELSE 0 END) AS tiket_belum_selesai
    FROM tiket
    WHERE tanggal < '{TANGGAL_POTONG}'          -- syarat yang sama
    GROUP BY id_pelanggan
)
SELECT
    p.id_pelanggan,
    p.kota,
    p.paket,
    p.umur,
    JULIANDAY('{TANGGAL_POTONG}') - JULIANDAY(p.tanggal_daftar) AS umur_akun_hari,
 
    COALESCE(ft.jumlah_transaksi, 0) AS jumlah_transaksi,
    COALESCE(ft.total_nominal, 0) AS total_nominal,
    COALESCE(ft.rata_nominal, 0) AS rata_nominal,
    COALESCE(ft.ragam_kategori, 0) AS ragam_kategori,
    ft.hari_sejak_transaksi_terakhir,
 
    COALESCE(tk.jumlah_tiket, 0) AS jumlah_tiket,
    COALESCE(tk.jumlah_keluhan, 0) AS jumlah_keluhan,
    COALESCE(tk.tiket_belum_selesai, 0) AS tiket_belum_selesai,
 
    s.berhenti AS target
FROM pelanggan p
LEFT JOIN fitur_transaksi ft ON p.id_pelanggan = ft.id_pelanggan
LEFT JOIN fitur_tiket tk ON p.id_pelanggan = tk.id_pelanggan
INNER JOIN status s ON p.id_pelanggan = s.id_pelanggan
WHERE p.tanggal_daftar < '{TANGGAL_POTONG}'     -- hanya yang sudah ada saat itu
"""
 
dataset = q(query_dataset)
print("Ukuran dataset:", dataset.shape)
print(dataset.head())
print("\nProporsi target:", dataset["target"].mean().round(3))
```
 
### Poin Penting dalam Query Ini
 
**Setiap CTE punya syarat `WHERE tanggal < TANGGAL_POTONG`.** Ini yang mencegah kebocoran. Lupa satu saja sudah cukup untuk merusak seluruh dataset.
 
**`LEFT JOIN` untuk fitur, `INNER JOIN` untuk target.** Pelanggan tanpa transaksi tetap dipertahankan, tapi pelanggan tanpa label target dibuang karena tidak bisa dipakai melatih.
 
**`COALESCE(..., 0)` untuk hitungan.** Pelanggan yang tidak punya transaksi seharusnya bernilai nol, bukan kosong.
 
**`hari_sejak_transaksi_terakhir` sengaja dibiarkan `NULL`.** Untuk pelanggan yang belum pernah bertransaksi, tidak ada angka yang masuk akal. Biarkan kosong dan tangani di Python dengan `add_indicator=True`.
 
**Menyaring pelanggan yang mendaftar setelah tanggal potong.** Mereka belum ada saat prediksi dibuat, jadi tidak layak masuk dataset.
 
### Memeriksa Hasilnya
 
```python
print("Jumlah baris:", len(dataset))
print("ID unik:", dataset["id_pelanggan"].nunique())     # harus sama
print("\nSel kosong per kolom:")
print(dataset.isna().sum())
print("\nRingkasan:")
print(dataset.describe().T.round(2))
```
 
Kalau jumlah baris tidak sama dengan jumlah ID unik, ada penggandaan yang harus diperbaiki.
 
### Memeriksa Kebocoran
 
```python
# Kalau ada fitur yang bisa memprediksi target hampir sempurna sendirian, curigai
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import cross_val_score
 
X = dataset.drop(columns=["id_pelanggan", "target", "kota", "paket"]).fillna(-999)
y = dataset["target"]
 
for kolom in X.columns:
    skor = cross_val_score(DecisionTreeClassifier(max_depth=3, random_state=42),
                           X[[kolom]], y, cv=3, scoring="roc_auc").mean()
    if skor > 0.9:
        print(f"CURIGA BOCOR: {kolom} -> AUC sendirian {skor:.3f}")
```
 
## Menghubungkan SQL ke Python
 
### Cara Paling Sederhana
 
```python
import sqlite3
import pandas as pd
 
koneksi = sqlite3.connect("latihan.db")
df = pd.read_sql("SELECT * FROM pelanggan LIMIT 100", koneksi)
koneksi.close()
```
 
### Untuk Database Lain
 
```python
# pip install sqlalchemy psycopg2-binary
from sqlalchemy import create_engine
 
# PostgreSQL
mesin = create_engine("postgresql://pengguna:sandi@alamat:5432/nama_database")
 
# MySQL
# mesin = create_engine("mysql+pymysql://pengguna:sandi@alamat:3306/nama_database")
 
df = pd.read_sql("SELECT * FROM tabel LIMIT 100", mesin)
```
 
### Jangan Menyusun Query dengan f-string untuk Input Pengguna
 
Ini soal keamanan yang penting diketahui.
 
```python
# BERBAHAYA kalau nilainya berasal dari input pengguna
kota = "Jakarta"
df = pd.read_sql(f"SELECT * FROM pelanggan WHERE kota = '{kota}'", koneksi)
 
# AMAN: pakai parameter
df = pd.read_sql("SELECT * FROM pelanggan WHERE kota = ?", koneksi, params=(kota,))
```
 
Kalau memakai f-string, seseorang bisa mengirim teks yang berisi perintah SQL berbahaya. Ini disebut *SQL injection*.
 
Untuk skrip analisis pribadi, f-string dengan nilai yang Anda tulis sendiri masih dapat diterima, seperti pada contoh tanggal potong di atas. Tapi begitu nilainya berasal dari luar, selalu pakai parameter.
 
### Membaca Data Besar Secara Bertahap
 
```python
potongan = pd.read_sql("SELECT * FROM transaksi", koneksi, chunksize=1000)
 
total = 0
for bagian in potongan:
    total += bagian["nominal"].sum()
print("Total:", total)
```
 
Berguna kalau tabelnya terlalu besar untuk dimuat sekaligus ke memori.
 
## Tips Praktis di Dunia Kerja
 
### Selalu Mulai dengan LIMIT
 
Sebelum menjalankan query pada tabel produksi, coba dulu dengan `LIMIT 100`. Query yang salah pada tabel berisi ratusan juta baris bisa membebani server dan membuat rekan kerja Anda tidak senang.
 
### Periksa Jumlah Baris di Setiap Tahap
 
Setelah tiap `JOIN`, hitung jumlah barisnya. Ini kebiasaan yang menyelamatkan banyak waktu.
 
### Bangun Query Secara Bertahap
 
Jangan langsung menulis query 80 baris. Mulai dari satu tabel, pastikan hasilnya benar, tambahkan satu `JOIN`, periksa lagi, dan seterusnya.
 
### Format Penulisan yang Rapi
 
```sql
SELECT
    p.id_pelanggan,
    p.nama,
    COUNT(t.id_transaksi) AS jumlah
FROM pelanggan AS p
LEFT JOIN transaksi AS t
    ON p.id_pelanggan = t.id_pelanggan
WHERE p.kota = 'Jakarta'
GROUP BY p.id_pelanggan, p.nama
HAVING COUNT(t.id_transaksi) > 5
ORDER BY jumlah DESC;
```
 
Kata kunci di awal baris, kolom menjorok ke dalam, satu kolom per baris. Query yang rapi jauh lebih mudah diperiksa saat ada yang salah.
 
### Beri Komentar pada Bagian yang Rumit
 
```sql
-- Menghitung fitur hanya dari periode sebelum tanggal potong
-- untuk mencegah kebocoran informasi masa depan
WHERE tanggal < '2024-10-01'
```
 
### Menyimpan Query, Bukan Hasilnya
 
Simpan file `.sql` Anda di version control. Kalau data berubah, tinggal jalankan ulang. Menyimpan CSV hasil ekspor membuat Anda tidak tahu bagaimana data itu dibuat.
 
## Kesalahan Pemula yang Sering Terjadi
 
### Memakai INNER JOIN Padahal Butuh LEFT JOIN
 
Ini menghilangkan baris tanpa peringatan apa pun. Pelanggan yang belum pernah bertransaksi lenyap dari dataset, padahal justru merekalah kelompok yang paling menarik.
 
### Tidak Memeriksa Penggandaan Baris Setelah JOIN
 
Kalau jumlah baris melonjak setelah `JOIN`, dataset Anda rusak. Selalu bandingkan sebelum dan sesudah.
 
### Membocorkan Informasi Masa Depan
 
Kesalahan paling mahal. Menghitung fitur dari seluruh riwayat termasuk periode setelah target terjadi akan menghasilkan model yang tampak sempurna tapi gagal total di dunia nyata.
 
Selalu tetapkan tanggal potong, dan pastikan **setiap** bagian query menghormatinya.
 
### Memakai = NULL
 
Harus `IS NULL`. Memakai `= NULL` tidak akan menghasilkan error, tapi hasilnya selalu kosong, dan Anda mungkin mengira memang tidak ada data yang kosong.
 
### Lupa bahwa NULL Tidak Terjaring WHERE
 
Baris dengan nilai `NULL` tidak masuk ke `WHERE umur > 50` maupun `WHERE umur <= 50`. Kalau tidak sadar, Anda kehilangan data diam-diam.
 
### Menarik Semua Data ke Python Lalu Menyaringnya
 
Menarik 10 juta baris ke pandas lalu menyaringnya jadi 50 ribu adalah pemborosan besar. Saring di SQL.
 
### Bingung antara WHERE dan HAVING
 
`WHERE` menyaring baris sebelum diringkas, `HAVING` menyaring hasil ringkasan. Memakai `WHERE` untuk menyaring hasil `COUNT` akan menghasilkan error.
 
### Memakai SELECT * di Query Produksi
 
Menarik kolom yang tidak dibutuhkan memperlambat query. Selain itu, kalau struktur tabel berubah, kode Anda bisa rusak tanpa peringatan.
 
### Menyalin Query Panjang Tanpa Memahaminya
 
Query yang disalin dari rekan kerja mungkin punya asumsi yang tidak berlaku untuk kasus Anda, misalnya tanggal potong yang berbeda. Periksa dan pahami sebelum dipakai.
 
## Penutup
 
SQL bukan bahasa yang rumit. Sebagian besar pekerjaan sehari-hari hanya memakai selusin perintah, dan Anda bisa produktif setelah beberapa hari berlatih.
 
Tiga hal untuk diingat:
 
**Pertama**, `LEFT JOIN` adalah pilihan default saat membangun dataset. Kehilangan baris tanpa disadari adalah kesalahan yang mahal, dan `INNER JOIN` melakukannya diam-diam.
 
**Kedua**, selalu periksa jumlah baris setelah setiap `JOIN`. Penggandaan baris merusak dataset dengan cara yang sulit dideteksi setelah data masuk ke Python.
 
**Ketiga**, tetapkan tanggal potong dan pastikan setiap bagian query menghormatinya. Kebocoran informasi masa depan adalah kesalahan yang paling sering terjadi saat membangun dataset dari database, dan gejalanya justru terlihat menyenangkan: skor model yang luar biasa tinggi.
 