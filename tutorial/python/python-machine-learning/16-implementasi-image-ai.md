---
sidebar_position: 16
title: "Implementasi dengan ImageAI"
---

## Implementasi Machine Learning Sederhana dengan ImageAI

### 1. Konsep Utama Machine Learning Praktis

Machine Learning modern tidak selalu mengharuskan kita membuat model dari awal atau memahami seluruh matematika dan statistik yang mendasarinya.

Salah satu pendekatan praktis adalah memanfaatkan **model pra-latih (*pre-trained model*)** yang sudah tersedia. Dengan pendekatan ini, developer dapat lebih fokus pada bagaimana model digunakan untuk menyelesaikan kebutuhan aplikasi.

Secara sederhana:

```text
Model Pre-trained
       ↓
     Input
       ↓
   Prediction
       ↓
     Output
```

Pendekatan ini sangat berguna ketika kita ingin membuat aplikasi Machine Learning sederhana tanpa harus melakukan proses training model sendiri.

---

## 2. Mengenal ImageAI

**ImageAI** adalah library Python yang menyediakan fitur untuk membangun aplikasi berbasis **Computer Vision**, khususnya untuk melakukan klasifikasi gambar menggunakan model yang telah tersedia.

Dengan ImageAI, kita dapat memanfaatkan model Machine Learning yang sudah dilatih untuk mengenali berbagai objek dalam gambar.

### Perubahan API pada Versi Terbaru

Pada materi versi lama, ImageAI menggunakan:

```python
from imageai.Prediction import ImagePrediction
```

Pada versi yang digunakan dalam materi terbaru, API tersebut sudah berubah menjadi:

```python
from imageai.Classification import ImageClassification
```

Selain itu, model **SqueezeNet** pada contoh lama telah digantikan dengan **MobileNetV2** sebagai pilihan model yang cepat pada contoh terbaru.

---

## 3. Persiapan Lingkungan

Contoh struktur proyek:

```text
really_smart_brain/
│
├── brain.py
├── house.jpg
└── mobilenet_v2-b0353104.pth
```

Keterangan:

- `brain.py` merupakan program utama.
- `house.jpg` merupakan gambar yang akan dianalisis.
- `mobilenet_v2-b0353104.pth` merupakan file model MobileNetV2.

Library yang digunakan perlu dipasang menggunakan `pip` sesuai kebutuhan dan kompatibilitas versi ImageAI yang digunakan.

---

## 4. Menggunakan ImageAI untuk Klasifikasi Gambar

Implementasi yang telah disesuaikan dengan perubahan API:

```python
from imageai.Classification import ImageClassification
import os

exec_path = os.getcwd()

prediction = ImageClassification()

prediction.setModelTypeAsMobileNetV2()
prediction.setModelPath(
    os.path.join(exec_path, "mobilenet_v2-b0353104.pth")
)

prediction.loadModel()

predictions, probabilities = prediction.classifyImage(
    os.path.join(exec_path, "house.jpg"),
    result_count=5
)

for eachPred, eachProb in zip(predictions, probabilities):
    print(f"{eachPred} : {eachProb}")
```

---

## 5. Penjelasan Kode

### Mengimpor `ImageClassification`

```python
from imageai.Classification import ImageClassification
```

Pada versi terbaru, klasifikasi gambar dilakukan menggunakan `ImageClassification`. Ini menggantikan penggunaan `ImagePrediction` pada contoh versi lama.

### Mengambil Direktori Kerja

```python
exec_path = os.getcwd()
```

`os.getcwd()` digunakan untuk mendapatkan direktori tempat program sedang dijalankan.

### Membuat Objek Klasifikasi

```python
prediction = ImageClassification()
```

Baris ini membuat objek `ImageClassification` yang digunakan untuk melakukan proses klasifikasi gambar.

### Memilih MobileNetV2

```python
prediction.setModelTypeAsMobileNetV2()
```

Pada contoh terbaru, **MobileNetV2** digunakan sebagai model klasifikasi dan menggantikan SqueezeNet pada contoh lama.

### Menentukan Lokasi Model

```python
prediction.setModelPath(
    os.path.join(exec_path, "mobilenet_v2-b0353104.pth")
)
```

`setModelPath()` digunakan untuk menentukan lokasi file model yang akan digunakan.

### Memuat Model

```python
prediction.loadModel()
```

Perintah tersebut memuat model sehingga siap digunakan untuk melakukan klasifikasi.

### Melakukan Klasifikasi Gambar

```python
predictions, probabilities = prediction.classifyImage(
    os.path.join(exec_path, "house.jpg"),
    result_count=5
)
```

Pada versi terbaru, metode `predictImage()` digantikan dengan `classifyImage()`.

Parameter `result_count=5` meminta hingga lima hasil klasifikasi.

---

## 6. Menampilkan Hasil Prediksi

Hasil klasifikasi terdiri dari:

- `predictions` → nama objek yang diprediksi.
- `probabilities` → nilai probabilitas atau tingkat keyakinan terhadap prediksi.

Keduanya dapat diproses menggunakan `zip()`:

```python
for eachPred, eachProb in zip(predictions, probabilities):
    print(f"{eachPred} : {eachProb}")
```

Contoh hasil:

```text
castle : 45.32
palace : 21.17
house : 15.84
```

Nilai tersebut menunjukkan tingkat keyakinan model terhadap masing-masing hasil klasifikasi.

---

## 7. Perbandingan Versi Lama dan Versi Baru

Karena API ImageAI berubah, kode dari materi lama tidak dapat digunakan begitu saja pada versi baru.

| Bagian | Versi Lama | Versi Baru |
|---|---|---|
| Module | `imageai.Prediction` | `imageai.Classification` |
| Class | `ImagePrediction` | `ImageClassification` |
| Model | SqueezeNet | MobileNetV2 |
| Menentukan model | `setModelTypeAsSqueezeNet()` | `setModelTypeAsMobileNetV2()` |
| File model | `.h5` | `.pth` |
| Prediksi | `predictImage()` | `classifyImage()` |

### Versi Lama

```python
from imageai.Prediction import ImagePrediction

prediction = ImagePrediction()

prediction.setModelTypeAsSqueezeNet()
prediction.setModelPath(
    "squeezenet_weights_tf_dim_ordering_tf_kernels.h5"
)

prediction.loadModel()

predictions, probabilities = prediction.predictImage(
    "giraffe.jpg",
    result_count=5
)
```

### Versi Baru

```python
from imageai.Classification import ImageClassification

prediction = ImageClassification()

prediction.setModelTypeAsMobileNetV2()
prediction.setModelPath(
    "mobilenet_v2-b0353104.pth"
)

prediction.loadModel()

predictions, probabilities = prediction.classifyImage(
    "house.jpg",
    result_count=5
)
```

**Penting:** Jangan mencampurkan API versi lama dengan API versi baru. Jika menggunakan `ImageClassification`, gunakan metode dan konfigurasi model yang sesuai dengan versi tersebut.

---

## 8. MobileNetV2

**MobileNetV2** merupakan model jaringan saraf yang dirancang dengan mempertimbangkan efisiensi komputasi.

Dalam konteks materi ini, MobileNetV2 digunakan sebagai pilihan model yang relatif ringan sehingga cocok untuk demonstrasi klasifikasi gambar.

Secara sederhana:

```text
Gambar
  ↓
MobileNetV2
  ↓
Analisis Fitur
  ↓
Prediksi Objek
  ↓
Probability
```

---

## 9. Machine Learning Tidak Selalu 100% Akurat

Hasil klasifikasi Machine Learning bersifat **probabilistik**.

Artinya, model memberikan tingkat keyakinan terhadap beberapa kemungkinan hasil, bukan jaminan bahwa satu hasil pasti benar.

Contohnya:

```text
Object A : 72.50
Object B : 18.30
Object C :  5.20
```

Model lebih yakin bahwa gambar tersebut merupakan `Object A`, tetapi hasil tersebut tetap merupakan prediksi.

Dalam aplikasi nyata, kita perlu mempertimbangkan:

- Kualitas dataset.
- Kualitas gambar.
- Model yang digunakan.
- Kondisi data.
- Tingkat confidence.
- Kebutuhan aplikasi.

---

## 10. Konsep Penting yang Dipelajari

### Menggunakan Pre-trained Model

Kita dapat menggunakan model yang sudah dilatih tanpa harus melakukan training dari awal.

### Computer Vision

Computer Vision memungkinkan komputer melakukan analisis terhadap data berbentuk gambar.

### Classification

Model mencoba menentukan kategori atau objek yang terdapat dalam gambar.

### Probability

Model memberikan nilai probabilitas sebagai indikasi tingkat keyakinan terhadap hasil prediksi.

### Library Abstraction

Library seperti ImageAI menyederhanakan proses penggunaan model Machine Learning sehingga developer dapat fokus pada penerapan model dalam aplikasi.

---

## 11. Alur Lengkap Aplikasi

Secara keseluruhan, proses aplikasi dapat digambarkan sebagai berikut:

```text
       Gambar
          ↓
  ImageClassification
          ↓
     MobileNetV2
          ↓
   Load Pre-trained
        Model
          ↓
    classifyImage()
          ↓
 ┌─────────────────┐
 │   Predictions   │
 │  Probabilities  │
 └─────────────────┘
          ↓
      Tampilkan
        Hasil
```

---

## 12. Kesimpulan

Machine Learning modern tidak selalu berarti membuat dan melatih model sendiri dari awal. **Pre-trained model** memungkinkan developer memanfaatkan model yang sudah tersedia untuk membangun aplikasi dengan lebih cepat.

Dalam contoh ini, **ImageAI** digunakan untuk melakukan klasifikasi gambar menggunakan **MobileNetV2**.

Perlu diperhatikan bahwa API ImageAI dapat berubah antarversi. Pada contoh lama digunakan:

```python
imageai.Prediction
```

sedangkan pada versi terbaru digunakan:

```python
imageai.Classification
```

Begitu pula **SqueezeNet** pada contoh lama telah digantikan oleh **MobileNetV2** pada implementasi terbaru.

Konsep utama yang perlu diingat:

```text
Pre-trained Model
       ↓
       Input
       ↓
   Classification
       ↓
    Prediction
       ↓
 Probability Score
```

Pendekatan seperti ini menjadi dasar penting untuk memahami bagaimana Machine Learning dapat diterapkan ke dalam aplikasi nyata tanpa selalu harus membangun model dari nol.
