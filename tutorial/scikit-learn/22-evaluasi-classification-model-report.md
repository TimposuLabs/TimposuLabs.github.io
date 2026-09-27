---
sidebar_position: 23
title: "Evaluasi Classification Model: Classification Report"
---

**Classification Report** adalah laporan yang berisi beberapa metrik evaluasi untuk menilai performa model **klasifikasi**.

Berbeda dengan **Accuracy** yang hanya memberikan satu nilai performa, classification report menampilkan beberapa metrik sekaligus, yaitu:

- **Precision**
- **Recall**
- **F1-Score**
- **Support**

Classification report membantu kita memahami bagaimana model bekerja pada **masing-masing kelas**, terutama ketika dataset memiliki **class imbalance**.

Di Scikit-Learn, classification report dapat dibuat menggunakan `classification_report()`.

```python
from sklearn.metrics import classification_report

print(classification_report(y_test, y_preds))
```

Contoh hasil:

```text
              precision    recall  f1-score   support

           0       0.85      0.90      0.87        50
           1       0.88      0.82      0.85        50

    accuracy                           0.86       100
   macro avg       0.86      0.86      0.86       100
weighted avg       0.86      0.86      0.86       100
```

Dari laporan tersebut, kita dapat melihat performa model secara lebih detail dibandingkan hanya menggunakan accuracy.

---

## Precision

**Precision** mengukur seberapa banyak prediksi positif yang benar-benar merupakan kelas positif.

Dengan kata lain:

> Dari semua data yang diprediksi sebagai kelas tertentu, berapa banyak yang benar?

Untuk klasifikasi biner pada kelas positif:

$$
Precision = \frac{TP}{TP + FP}
$$

Keterangan:

- `TP` = True Positive
- `FP` = False Positive

### Contoh

Misalnya model memprediksi 100 orang sebagai memiliki penyakit.

Ternyata hanya 80 orang yang benar-benar memiliki penyakit.

Maka:

$$
Precision = \frac{80}{80 + 20}
$$

$$
Precision = 0.80
$$

Artinya, sekitar **80% dari prediksi positif model benar**.

### Hubungan Precision dengan False Positive

Precision akan tinggi ketika jumlah **False Positive (FP)** rendah.

Model yang tidak menghasilkan False Positive untuk kelas tertentu dapat memiliki:

$$
Precision = 1.0
$$

### Kapan Precision Penting?

Precision menjadi penting ketika **False Positive** memiliki konsekuensi yang besar.

Contohnya:

- Sistem mendeteksi transaksi penipuan.
- Sistem mendeteksi email spam.
- Sistem memberikan peringatan keamanan.
- Sistem mengklasifikasikan konten tertentu sebagai pelanggaran.

---

## Recall

**Recall** mengukur seberapa banyak kasus positif yang sebenarnya berhasil ditemukan oleh model.

Dengan kata lain:

> Dari semua data yang sebenarnya merupakan kelas positif, berapa banyak yang berhasil ditemukan oleh model?

Rumus recall:

$$
Recall = \frac{TP}{TP + FN}
$$

Keterangan:

- `TP` = True Positive
- `FN` = False Negative

### Contoh

Misalnya terdapat 100 orang yang benar-benar memiliki penyakit.

Model berhasil mendeteksi 90 orang.

Namun 10 orang tidak berhasil dideteksi.

Maka:

$$
Recall = \frac{90}{90 + 10}
$$

$$
Recall = 0.90
$$

Artinya, model berhasil menemukan **90% kasus positif yang sebenarnya**.

### Hubungan Recall dengan False Negative

Recall akan tinggi ketika jumlah **False Negative (FN)** rendah.

Jika model tidak menghasilkan False Negative untuk kelas tertentu:

$$
Recall = 1.0
$$

### Kapan Recall Penting?

Recall menjadi sangat penting ketika **False Negative** memiliki konsekuensi besar.

Contohnya:

- Deteksi penyakit.
- Deteksi serangan keamanan.
- Deteksi transaksi mencurigakan.
- Deteksi kejadian bencana.
- Deteksi permintaan bantuan darurat.

Dalam kasus seperti ini, melewatkan kasus positif dapat lebih bermasalah dibandingkan menghasilkan beberapa False Positive.

---

## F1-Score

**F1-Score** merupakan kombinasi antara Precision dan Recall menggunakan **harmonic mean**.

Rumusnya:

$$
F1 = 2 \times \frac{Precision \times Recall}{Precision + Recall}
$$

F1-Score berguna ketika kita ingin mempertimbangkan **Precision dan Recall secara bersamaan**.

### Contoh

Misalnya:

```text
Precision = 0.80
Recall    = 0.60
```

Maka:

$$
F1 = 2 \times \frac{0.80 \times 0.60}{0.80 + 0.60}
$$

Hasilnya sekitar:

```text
F1-Score = 0.686
```

F1-Score tidak hanya melihat salah satu metrik, tetapi mempertimbangkan keseimbangan antara Precision dan Recall.

### Nilai F1-Score

Secara umum:

- `1.0` → performa sempurna pada kelas tersebut
- `0.0` → performa sangat buruk pada kelas tersebut

F1-Score yang tinggi membutuhkan Precision dan Recall yang sama-sama relatif tinggi.

Jika salah satunya sangat rendah, F1-Score juga akan terpengaruh.

---

## Support

**Support** adalah jumlah sampel aktual yang termasuk ke dalam setiap kelas pada data yang dievaluasi.

Misalnya:

```text
              precision    recall  f1-score   support

           0       0.85      0.90      0.87        50
           1       0.88      0.82      0.85        50
```

Maka:

- Kelas `0` memiliki 50 sampel.
- Kelas `1` memiliki 50 sampel.

Support bukan metrik performa model.

Support hanya menunjukkan **berapa banyak sampel aktual** yang digunakan untuk menghitung metrik pada setiap kelas.

---

## Accuracy

**Accuracy** menunjukkan proporsi seluruh prediksi yang benar dibandingkan dengan seluruh data yang dievaluasi.

Rumusnya:

$$
Accuracy = \frac{Jumlah\ Prediksi\ Benar}{Jumlah\ Seluruh\ Sampel}
$$

Dalam konteks confusion matrix:

$$
Accuracy = \frac{TP + TN}{TP + TN + FP + FN}
$$

Misalnya model menghasilkan:

```text
90 prediksi benar
10 prediksi salah
```

dari 100 data.

Maka:

$$
Accuracy = \frac{90}{100} = 0.90
$$

atau:

```text
Accuracy = 90%
```

Accuracy mudah dipahami, tetapi tidak selalu cukup untuk mengevaluasi model.

---

## Macro Average

**Macro Average** menghitung rata-rata metrik dari setiap kelas dengan memberikan **bobot yang sama kepada setiap kelas**.

Misalnya terdapat dua kelas:

```text
Class 0:
Precision = 0.80

Class 1:
Precision = 0.60
```

Macro Precision:

$$
Macro\ Precision = \frac{0.80 + 0.60}{2}
$$

$$
Macro\ Precision = 0.70
$$

Setiap kelas mendapatkan kontribusi yang sama terhadap hasil akhir, terlepas dari jumlah sampelnya.

### Mengapa Macro Average Penting?

Macro Average berguna ketika kita ingin melihat apakah model bekerja dengan baik pada **semua kelas**, termasuk kelas yang memiliki jumlah sampel lebih sedikit.

Hal ini menjadi sangat relevan pada dataset **imbalanced**.

Misalnya:

```text
Kelas 0 = 9.900 sampel
Kelas 1 = 100 sampel
```

Macro Average tetap memberikan bobot yang sama kepada kelas `0` dan kelas `1` ketika menghitung rata-rata metrik antar kelas.

---

## Weighted Average

**Weighted Average** menghitung rata-rata metrik dengan mempertimbangkan **support atau jumlah sampel pada setiap kelas**.

Artinya, kelas dengan jumlah sampel lebih banyak memiliki kontribusi yang lebih besar terhadap hasil rata-rata.

Misalnya:

```text
Kelas 0 = 9.900 sampel
Kelas 1 = 100 sampel
```

Maka kelas `0` akan memberikan kontribusi jauh lebih besar terhadap weighted average karena memiliki jumlah sampel yang jauh lebih banyak.

### Perbedaan Macro dan Weighted Average

| Average | Mempertimbangkan Jumlah Sampel? | Bobot Setiap Kelas |
|---|---|---|
| Macro Average | Tidak | Sama |
| Weighted Average | Ya | Berdasarkan support |

Perbedaan ini sangat penting ketika dataset memiliki **class imbalance**.

---

## Memahami Output Classification Report

Contoh:

```text
              precision    recall  f1-score   support

           0       0.85      0.90      0.87        50
           1       0.88      0.82      0.85        50

    accuracy                           0.86       100
   macro avg       0.86      0.86      0.86       100
weighted avg       0.86      0.86      0.86       100
```

Cara membacanya:

### Kelas 0

```text
precision = 0.85
recall    = 0.90
f1-score  = 0.87
support   = 50
```

Artinya:

- Precision kelas `0` adalah `0.85`.
- Recall kelas `0` adalah `0.90`.
- F1-Score kelas `0` adalah `0.87`.
- Terdapat 50 sampel aktual kelas `0`.

### Kelas 1

```text
precision = 0.88
recall    = 0.82
f1-score  = 0.85
support   = 50
```

Artinya:

- Precision kelas `1` adalah `0.88`.
- Recall kelas `1` adalah `0.82`.
- F1-Score kelas `1` adalah `0.85`.
- Terdapat 50 sampel aktual kelas `1`.

Kemudian pada bagian bawah terdapat:

```text
accuracy
macro avg
weighted avg
```

yang memberikan gambaran performa model secara keseluruhan dan agregat antar kelas.

---

## Accuracy Trap pada Class Imbalance

Salah satu masalah penting dalam evaluasi klasifikasi adalah **accuracy trap**.

Accuracy trap terjadi ketika accuracy terlihat sangat tinggi, tetapi model sebenarnya gagal mengenali kelas yang penting.

Hal ini sering terjadi pada dataset yang memiliki **class imbalance**.

---

## Contoh Class Imbalance

Misalkan terdapat dataset:

```text
Total data = 10.000 orang

Sehat      = 9.999 orang
Penyakit   = 1 orang
```

Kita menggunakan model yang sangat buruk dan model tersebut selalu memprediksi:

```text
Semua orang → Sehat
```

Model tidak pernah memprediksi seseorang sebagai memiliki penyakit.

---

## Hasil Confusion Matrix

Secara sederhana:

```text
                       Predicted
                    Sehat    Penyakit

Actual Sehat        9999        0
Actual Penyakit        1        0
```

Untuk kelas penyakit:

```text
TP = 0
FN = 1
```

Model gagal menemukan satu-satunya pasien yang sebenarnya memiliki penyakit.

---

## Accuracy Model

Walaupun model tersebut buruk, accuracy-nya adalah:

$$
Accuracy = \frac{9999}{10000}
$$

$$
Accuracy = 0.9999
$$

atau:

```text
Accuracy = 99.99%
```

Sekilas, angka tersebut terlihat sangat tinggi.

Namun model sebenarnya **tidak berhasil menemukan satu pun kasus penyakit**.

---

## Recall Kelas Penyakit

Recall:

$$
Recall = \frac{TP}{TP + FN}
$$

Karena:

```text
TP = 0
FN = 1
```

maka:

$$
Recall = \frac{0}{0+1}
$$

$$
Recall = 0
$$

Artinya:

```text
Recall = 0.00
```

Model gagal menemukan seluruh kasus positif pada data tersebut.

---

## Precision Kelas Penyakit

Model tidak menghasilkan prediksi positif sama sekali.

Dengan kondisi seperti ini, precision untuk kelas tersebut perlu dibaca dengan hati-hati karena tidak ada sampel yang diprediksi sebagai positif.

Scikit-Learn menyediakan parameter `zero_division` untuk menentukan bagaimana kondisi pembagian dengan nol tersebut ditangani.

Contoh:

```python
print(
    classification_report(
        y_test,
        y_preds,
        zero_division=0
    )
)
```

Dengan demikian, jangan hanya melihat accuracy ketika mengevaluasi dataset yang sangat tidak seimbang.

---

## Mengapa Accuracy Saja Tidak Cukup?

Accuracy dapat menjadi misleading ketika distribusi kelas sangat tidak seimbang.

Contohnya:

```text
99.99% accuracy
```

tidak berarti model selalu bagus.

Jika hampir seluruh dataset berasal dari satu kelas, model yang selalu memilih kelas mayoritas dapat memperoleh accuracy yang sangat tinggi tanpa benar-benar mampu mengenali kelas minoritas.

Oleh karena itu, kita perlu melihat metrik lain seperti:

- Precision
- Recall
- F1-Score
- Macro Average
- Confusion Matrix
- ROC-AUC
- Precision-Recall / Average Precision

Pemilihan metrik harus disesuaikan dengan tujuan dan konsekuensi kesalahan pada masalah yang sedang dikerjakan.

---

## Precision vs Recall

Precision dan Recall sering memiliki hubungan trade-off.

Secara sederhana:

```text
Precision
    │
    │      ●
    │    ●
    │  ●
    │ ●
    └──────────────── Recall
```

Dalam beberapa kasus, meningkatkan sensitivitas model terhadap kelas positif dapat meningkatkan jumlah False Positive sehingga Precision dapat menurun.

Sebaliknya, membuat model lebih konservatif dalam memberikan prediksi positif dapat mengurangi False Positive tetapi berpotensi meningkatkan False Negative.

Tidak ada satu nilai yang selalu paling penting untuk semua kasus.

---

## Memilih Metrik Berdasarkan Tujuan

Pertimbangkan konsekuensi dari setiap jenis kesalahan.

| Situasi | Metrik yang Perlu Diperhatikan |
|---|---|
| False Positive sangat merugikan | Precision |
| False Negative sangat merugikan | Recall |
| Ingin keseimbangan Precision dan Recall | F1-Score |
| Dataset relatif seimbang | Accuracy dapat menjadi salah satu metrik |
| Dataset tidak seimbang | Macro Average, Precision, Recall, F1-Score |
| Ingin melihat jenis kesalahan | Confusion Matrix |
| Evaluasi ranking probabilitas/score | ROC-AUC atau Precision-Recall |

Tabel tersebut bukan aturan mutlak. Metrik yang digunakan tetap harus disesuaikan dengan tujuan bisnis, karakteristik data, dan konsekuensi kesalahan.

---

## Classification Report dengan Scikit-Learn

Berikut contoh sederhana menggunakan Random Forest.

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

clf = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

clf.fit(X_train, y_train)

y_preds = clf.predict(X_test)

print(classification_report(y_test, y_preds))
```

Output dapat berbentuk:

```text
              precision    recall  f1-score   support

           0       0.86      0.90      0.88        50
           1       0.89      0.84      0.86        50

    accuracy                           0.87       100
   macro avg       0.87      0.87      0.87       100
weighted avg       0.87      0.87      0.87       100
```

Nilai tersebut merupakan contoh. Hasil sebenarnya bergantung pada dataset, pembagian data, model, parameter, dan proses preprocessing.

---

## Classification Report pada Multiclass Classification

Classification report juga dapat digunakan untuk masalah dengan lebih dari dua kelas.

Misalnya kita memiliki tiga kelas:

```text
Kelas 0 → Setosa
Kelas 1 → Versicolor
Kelas 2 → Virginica
```

Model dapat menghasilkan:

```text
              precision    recall  f1-score   support

           0       0.95      0.95      0.95        20
           1       0.90      0.90      0.90        20
           2       0.95      0.95      0.95        20

    accuracy                           0.93        60
   macro avg       0.93      0.93      0.93        60
weighted avg       0.93      0.93      0.93        60
```

Dalam multiclass classification, Precision, Recall, dan F1-Score dihitung untuk setiap kelas.

Kemudian Scikit-Learn menyediakan beberapa metode averaging, seperti:

- `macro`
- `weighted`
- `micro`

Untuk classification report secara default, bagian `macro avg` dan `weighted avg` ditampilkan.

---

## Menghubungkan Classification Report dengan Confusion Matrix

Classification Report dan Confusion Matrix saling melengkapi.

**Confusion Matrix** membantu kita melihat:

> Kesalahan model terjadi di kelas mana dan dalam bentuk apa?

Sedangkan **Classification Report** membantu menjawab:

> Seberapa baik model mendeteksi masing-masing kelas berdasarkan Precision, Recall, dan F1-Score?

Alur evaluasinya dapat digambarkan sebagai:

```text
                Model
                  │
                  ▼
             Predictions
                  │
                  ▼
          ┌───────────────┐
          │ Confusion     │
          │ Matrix        │
          └───────┬───────┘
                  │
                  ▼
       ┌─────────────────────┐
       │ Classification      │
       │ Report              │
       └─────────┬───────────┘
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
    Precision  Recall   F1-Score
```

Confusion Matrix memberikan gambaran jumlah kesalahan, sedangkan Classification Report memberikan metrik yang dihitung dari hasil tersebut.

---

## Workflow Evaluasi Classification Model

Workflow evaluasi klasifikasi yang dapat digunakan:

```text
Dataset
   │
   ▼
Persiapan Data
   │
   ▼
Train-Test Split
   │
   ├───────────────┐
   ▼               ▼
Training Data    Test Data
   │               │
   ▼               │
Training Model     │
   │               │
   ▼               │
Predictions ───────┘
   │
   ▼
Evaluation
   │
   ├── Accuracy
   ├── Confusion Matrix
   ├── Precision
   ├── Recall
   ├── F1-Score
   ├── ROC-AUC
   └── Classification Report
```

Jika digunakan cross-validation, evaluasi dapat dilakukan pada data training untuk membantu memilih model atau hyperparameter sebelum final test evaluation.

---

## Contoh Evaluasi Lengkap

Berikut contoh workflow sederhana:

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)
from sklearn.model_selection import train_test_split

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Membuat model
clf = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# Training
clf.fit(X_train, y_train)

# Prediction
y_preds = clf.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_preds)

print(f"Accuracy: {accuracy:.2f}")

# Confusion Matrix
cm = confusion_matrix(y_test, y_preds)

print("Confusion Matrix:")
print(cm)

# Classification Report
print("Classification Report:")
print(classification_report(y_test, y_preds))
```

Dengan workflow tersebut kita tidak hanya mengetahui accuracy, tetapi juga dapat melihat bagaimana model menangani setiap kelas.

---

## Cara Membaca Classification Report Secara Sistematis

Ketika mendapatkan classification report, gunakan langkah berikut.

### Langkah 1 - Lihat Support

Periksa jumlah data pada setiap kelas.

```text
support
```

Tujuannya untuk mengetahui apakah dataset memiliki distribusi kelas yang seimbang.

### Langkah 2 - Lihat Accuracy

Accuracy dapat memberikan gambaran umum performa model.

Namun jangan berhenti pada accuracy.

### Langkah 3 - Periksa Precision

Tanyakan:

> Ketika model memprediksi suatu kelas, seberapa sering prediksi tersebut benar?

### Langkah 4 - Periksa Recall

Tanyakan:

> Dari semua data yang sebenarnya termasuk kelas tersebut, berapa banyak yang berhasil ditemukan?

### Langkah 5 - Periksa F1-Score

Gunakan F1-Score untuk melihat keseimbangan antara Precision dan Recall.

### Langkah 6 - Bandingkan Macro dan Weighted Average

Jika keduanya berbeda cukup jauh, periksa distribusi kelas dan performa masing-masing kelas.

### Langkah 7 - Kembali ke Confusion Matrix

Jika terdapat performa yang rendah pada suatu kelas, gunakan confusion matrix untuk mengetahui bentuk kesalahannya.

---

## Kesalahan yang Sering Terjadi

### Hanya Melihat Accuracy

Kesalahan:

```text
Accuracy = 99%
```

kemudian langsung menyimpulkan bahwa model sangat baik.

Solusi:

Periksa juga:

- Precision
- Recall
- F1-Score
- Confusion Matrix
- Support
- Distribusi kelas

---

### Mengabaikan Class Imbalance

Dataset dengan distribusi:

```text
Class 0 = 99%
Class 1 = 1%
```

memerlukan perhatian khusus.

Accuracy yang tinggi belum tentu menunjukkan bahwa model mampu mendeteksi kelas minoritas.

---

### Menganggap Precision dan Recall Sama

Precision dan Recall mengukur hal yang berbeda.

**Precision:**

> Dari prediksi positif, berapa yang benar?

**Recall:**

> Dari seluruh positif sebenarnya, berapa yang berhasil ditemukan?

---

### Menganggap F1 Selalu Lebih Penting

F1-Score bukan otomatis metrik terbaik untuk semua masalah.

Jika False Negative jauh lebih berbahaya, Recall mungkin lebih relevan.

Jika False Positive jauh lebih berbahaya, Precision mungkin lebih relevan.

Pemilihan metrik harus mengikuti tujuan sistem.

---

### Mengabaikan Support

Nilai metric tanpa melihat jumlah sampel dapat menyesatkan.

Misalnya:

```text
Class 0 → F1 = 0.95 → support = 10.000
Class 1 → F1 = 0.60 → support = 10
```

Performa kelas minoritas perlu diperhatikan meskipun jumlah datanya kecil.

---

## Ringkasan

Classification Report menyediakan beberapa informasi penting untuk mengevaluasi model klasifikasi.

| Metrik | Pertanyaan Utama |
|---|---|
| Precision | Dari prediksi suatu kelas, berapa yang benar? |
| Recall | Dari seluruh data aktual suatu kelas, berapa yang ditemukan? |
| F1-Score | Seberapa seimbang Precision dan Recall? |
| Support | Berapa jumlah data aktual pada kelas tersebut? |
| Accuracy | Berapa proporsi seluruh prediksi yang benar? |
| Macro Avg | Bagaimana rata-rata performa antar kelas dengan bobot sama? |
| Weighted Avg | Bagaimana rata-rata performa dengan mempertimbangkan jumlah sampel tiap kelas? |

Untuk dataset yang seimbang, Accuracy dapat menjadi salah satu metrik yang berguna.

Untuk dataset yang tidak seimbang, jangan hanya mengandalkan Accuracy. Perhatikan Precision, Recall, F1-Score, Macro Average, Weighted Average, dan Confusion Matrix.

---

## Checklist Evaluasi Classification Model

Gunakan checklist berikut ketika mengevaluasi model klasifikasi:

- [ ] Sudah membagi data training dan testing dengan benar.
- [ ] Tidak terjadi data leakage.
- [ ] Sudah melihat distribusi kelas.
- [ ] Sudah menghitung Accuracy.
- [ ] Sudah melihat Confusion Matrix.
- [ ] Sudah menghitung Precision.
- [ ] Sudah menghitung Recall.
- [ ] Sudah menghitung F1-Score.
- [ ] Sudah memeriksa Support setiap kelas.
- [ ] Sudah membandingkan Macro Average dan Weighted Average.
- [ ] Sudah mempertimbangkan dampak False Positive dan False Negative.
- [ ] Tidak hanya mengandalkan Accuracy pada dataset imbalanced.
- [ ] Metrik yang digunakan sesuai dengan tujuan masalah.

---

## Kesimpulan

**Classification Report** merupakan salah satu alat penting dalam evaluasi model klasifikasi karena memberikan gambaran performa model secara lebih lengkap.

Empat komponen utama yang perlu dipahami adalah:

```text
Precision
Recall
F1-Score
Support
```

Kemudian kita juga perlu memahami:

```text
Accuracy
Macro Average
Weighted Average
```

Hal terpenting adalah memahami bahwa **tidak ada satu metrik yang selalu cocok untuk semua masalah**.

Model dengan Accuracy tinggi belum tentu mampu mendeteksi kelas yang penting, terutama ketika dataset memiliki **class imbalance**.

Oleh karena itu, evaluasi model sebaiknya dilakukan dengan melihat beberapa metrik secara bersamaan dan mempertimbangkan konsekuensi dari setiap jenis kesalahan prediksi.

## Referensi

* https://scikit-learn.org/stable/modules/model_evaluation.html