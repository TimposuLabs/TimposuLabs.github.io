---
sidebar_position: 2
---

# Classification

**Supervised Learning Classification** adalah salah satu jenis Machine Learning yang digunakan untuk memprediksi kategori atau kelas berdasarkan pola yang dipelajari dari data berlabel.

Model belajar dari contoh yang sudah memiliki jawaban, kemudian menggunakan pola tersebut untuk mengklasifikasikan data baru.

## Contoh Kasus: Klasifikasi Email Spam

Bayangkan kita ingin membuat sistem yang dapat membedakan email spam dan bukan spam.

Dataset yang digunakan memiliki contoh email beserta labelnya.

| Isi Email | Label |
|---|---|
| Anda memenangkan hadiah, klik tautan ini! | Spam |
| Rapat akan dilaksanakan besok pukul 09.00 | Bukan Spam |
| Klaim hadiah Anda sekarang! | Spam |
| Berikut laporan pekerjaan minggu ini | Bukan Spam |

Model mempelajari pola dari isi email dan label yang tersedia. Setelah dilatih, model dapat digunakan untuk memprediksi apakah email baru termasuk kategori spam atau bukan spam.

## Alur Kerja Proyek Machine Learning

Secara umum, proyek klasifikasi dapat dilakukan melalui beberapa tahap berikut.

### 1. Persiapan Lingkungan

Menyiapkan lingkungan kerja menggunakan MiniConda, membuat folder proyek, dan memasang pustaka yang diperlukan.

### 2. Menyiapkan Dataset

Menggunakan file CSV yang berisi data email dan label klasifikasinya sebagai sumber data utama.

### 3. Analisis dan Pengolahan Data

Menggunakan beberapa pustaka Python untuk memahami dan menyiapkan dataset:

- **NumPy:** mendukung komputasi numerik.
- **Pandas:** membaca, menganalisis, dan mengolah data.
- **Matplotlib dan Seaborn:** membantu memvisualisasikan data.

Proses ini dilakukan menggunakan Jupyter Notebook agar setiap langkah dapat dijalankan dan diperiksa secara interaktif.

### 4. Membangun Model Classification

Menggunakan Scikit-Learn untuk melatih model berdasarkan dataset yang telah disiapkan.

Model kemudian digunakan untuk memprediksi kategori email baru, yaitu spam atau bukan spam.

## Kesimpulan

Supervised Learning Classification membantu komputer mempelajari pola dari data berlabel untuk memprediksi kategori pada data baru.

Melalui contoh klasifikasi email spam, kita dapat memahami gambaran umum proyek Machine Learning, mulai dari menyiapkan lingkungan kerja dan dataset hingga membangun model klasifikasi.
