---
sidebar_position: 16
title: "Evaluasi Model Klasifikasi: Classification Report"
---

Setelah membuat model klasifikasi dan mengevaluasinya menggunakan *confusion matrix*, kita perlu memahami performa model secara lebih terperinci.

Salah satu fungsi yang disediakan oleh Scikit-learn adalah `classification_report()`. Fungsi ini menampilkan beberapa metrik evaluasi, yaitu:

- **Precision**: seberapa tepat prediksi positif yang dibuat oleh model.
- **Recall**: seberapa banyak kasus positif aktual yang berhasil ditemukan oleh model.
- **F1-score**: ukuran keseimbangan antara precision dan recall.
- **Support**: jumlah sampel aktual untuk setiap kelas.
- **Macro average**: rata-rata metrik antar kelas tanpa mempertimbangkan jumlah sampel setiap kelas.
- **Weighted average**: rata-rata metrik antar kelas dengan mempertimbangkan jumlah sampel setiap kelas.

Classification report membantu kita memahami jenis kesalahan yang dilakukan model, bukan hanya mengetahui persentase prediksi yang benar.

## 1. Mengimpor Fungsi Classification Report

Gunakan kode berikut untuk mengimpor fungsi `classification_report` dari Scikit-learn.

```python
from sklearn.metrics import classification_report
```

Setelah model menghasilkan prediksi, tampilkan laporan evaluasinya menggunakan kode berikut.

```python
print(classification_report(y_test, y_preds))
```

Keterangan:

- `y_test` adalah label sebenarnya dari data pengujian.
- `y_preds` adalah label yang diprediksi oleh model.
- `classification_report()` membandingkan keduanya dan menghitung metrik evaluasi untuk setiap kelas.

Pastikan `y_preds` berasal dari model yang sudah dilatih, misalnya melalui `model.predict(X_test)`.

## 2. Memahami Metrik dalam Classification Report

Dalam proyek Heart Disease Classification, kita menggunakan dua label:

- **Kelas 0**: sampel dengan label tidak menunjukkan penyakit jantung.
- **Kelas 1**: sampel dengan label menunjukkan penyakit jantung.

Label tersebut mengikuti dataset yang digunakan. Hasil klasifikasi untuk proyek pembelajaran ini tidak dapat dianggap sebagai diagnosis medis.

### 2.1 Precision

Precision mengukur proporsi prediksi positif yang benar dibandingkan seluruh prediksi positif yang dibuat oleh model.

Rumus:

$$
\text{Precision} = \frac{TP}{TP + FP}
$$

Keterangan:

- `TP` (*True Positive*): model memprediksi kelas 1 dan label aktualnya memang kelas 1.
- `FP` (*False Positive*): model memprediksi kelas 1, tetapi label aktualnya kelas 0.

Contoh:

Model memprediksi 20 sampel sebagai kelas 1. Dari 20 sampel tersebut, 16 benar-benar memiliki label aktual kelas 1.

$$
\text{Precision} = \frac{16}{20} = 0.80
$$

Artinya, precision model adalah **80%**.

Precision yang tinggi berarti sebagian besar prediksi positif model benar. Namun, precision yang tinggi tidak otomatis berarti model berhasil menemukan sebagian besar seluruh kasus positif.

### 2.2 Recall

Recall mengukur proporsi kasus positif aktual yang berhasil ditemukan oleh model.

Rumus:

$$
\text{Recall} = \frac{TP}{TP + FN}
$$

Keterangan:

- `TP` (*True Positive*): kasus positif yang berhasil diprediksi sebagai positif.
- `FN` (*False Negative*): kasus positif aktual yang salah diprediksi sebagai negatif.

Contoh:

Terdapat 25 sampel dengan label aktual kelas 1. Model berhasil mengidentifikasi 20 sampel sebagai kelas 1.

$$
\text{Recall} = \frac{20}{25} = 0.80
$$

Artinya, recall model adalah **80%**.

Recall yang tinggi berarti model berhasil menemukan sebagian besar kasus positif aktual. Sebaliknya, recall yang rendah menunjukkan bahwa lebih banyak kasus positif terlewatkan.

### 2.3 F1-Score

F1-score merupakan rata-rata harmonis antara precision dan recall. Metrik ini berguna ketika kita ingin mempertimbangkan kedua metrik tersebut secara bersamaan.

Rumus:

$$
F_1 = 2 \times
\frac{\text{Precision} \times \text{Recall}}
{\text{Precision} + \text{Recall}}
$$

Contoh, jika precision dan recall masing-masing bernilai 0.80:

$$
F_1 = 2 \times \frac{0.80 \times 0.80}{0.80 + 0.80}
$$

$$
F_1 = 0.80
$$

F1-score memiliki rentang nilai 0 hingga 1. Semakin tinggi nilainya, semakin baik keseimbangan precision dan recall menurut metrik ini.

Perlu diperhatikan bahwa F1-score tidak selalu tinggi hanya karena salah satu metrik tinggi. Jika precision tinggi tetapi recall rendah, F1-score akan mempertimbangkan kedua nilai tersebut.

### 2.4 Support

Support adalah jumlah sampel aktual pada setiap kelas dalam dataset yang dievaluasi.

Misalnya, sebuah test dataset memiliki 61 sampel:

| Kelas | Keterangan | Support |
|---|---|---:|
| 0 | Label negatif | 29 |
| 1 | Label positif | 32 |
| Total | Seluruh sampel pengujian | 61 |

Angka tersebut merupakan contoh dari video pembelajaran, bukan hasil yang dijamin muncul pada setiap pembagian dataset.

Support bukan ukuran kualitas model. Nilai ini menunjukkan berapa banyak sampel aktual yang digunakan untuk menghitung metrik setiap kelas.

Jika support kelas 0 adalah 29 dan support kelas 1 adalah 32, berarti kedua kelas memiliki jumlah sampel yang relatif berdekatan pada test dataset tersebut.

## 3. Memahami Macro Average dan Weighted Average

Classification report juga menampilkan ringkasan metrik yang membantu kita mengevaluasi performa model secara keseluruhan.

### 3.1 Macro Average

Macro average menghitung rata-rata sederhana dari nilai metrik setiap kelas. Setiap kelas mendapatkan bobot yang sama, terlepas dari jumlah sampelnya.

Misalnya, precision untuk dua kelas adalah:

- Precision kelas 0 = 0.90
- Precision kelas 1 = 0.70

Maka macro average precision adalah:

$$
\text{Macro Precision} = \frac{0.90 + 0.70}{2}
$$

$$
\text{Macro Precision} = 0.80
$$

Macro average berguna untuk melihat performa model pada setiap kelas tanpa membiarkan kelas dengan jumlah sampel lebih banyak mendominasi rata-rata.

Jika dataset tidak seimbang, macro average dapat membantu mengungkap bahwa performa model pada kelas minoritas lebih rendah daripada performanya pada kelas mayoritas.

### 3.2 Weighted Average

Weighted average menghitung rata-rata metrik setiap kelas dengan menggunakan support sebagai bobotnya.

Rumus umum:

$$
\text{Weighted Average} =
\frac{\sum_{i=1}^{k} m_i s_i}
{\sum_{i=1}^{k} s_i}
$$

Keterangan:

- \(m_i\) adalah nilai metrik pada kelas ke-\(i\).
- \(s_i\) adalah jumlah sampel aktual (*support*) pada kelas ke-\(i\).
- \(k\) adalah jumlah kelas.

Contoh, terdapat dua kelas dengan nilai precision dan support berikut:

| Kelas | Precision | Support |
|---|---:|---:|
| 0 | 0.90 | 30 |
| 1 | 0.70 | 70 |

Weighted average precision dihitung sebagai berikut:

$$
\frac{(0.90 \times 30) + (0.70 \times 70)}
{30 + 70}
$$

$$
= \frac{27 + 49}{100} = 0.76
$$

Weighted average precision adalah **0.76**.

Karena kelas 1 memiliki support lebih besar, nilai precision kelas 1 memberikan pengaruh lebih besar terhadap hasil rata-rata.

### 3.3 Perbedaan Macro Average dan Weighted Average

| Aspek | Macro Average | Weighted Average |
|---|---|---|
| Cara menghitung | Rata-rata sederhana antar kelas | Rata-rata berbobot support |
| Bobot setiap kelas | Sama | Bergantung pada jumlah sampel |
| Pengaruh kelas mayoritas | Tidak lebih besar hanya karena jumlah sampelnya | Lebih besar jika support-nya lebih tinggi |
| Kegunaan | Membandingkan performa antar kelas secara setara | Merangkum performa dengan mempertimbangkan distribusi sampel |

**Catatan penting:** Macro average tidak menghilangkan dampak ketidakseimbangan kelas terhadap proses pelatihan model. Metrik ini hanya memberikan bobot yang sama ketika merata-ratakan hasil evaluasi setiap kelas.

Weighted average juga tidak selalu lebih baik daripada macro average. Pemilihan metrik harus disesuaikan dengan tujuan klasifikasi dan konsekuensi kesalahan prediksi.

## 4. Membaca Output Classification Report

Berikut contoh ilustratif output dari fungsi `classification_report()`.

```text
              precision    recall  f1-score   support

           0       0.80      0.83      0.81        29
           1       0.84      0.81      0.82        32

    accuracy                           0.82        61
   macro avg       0.82      0.82      0.82        61
weighted avg       0.82      0.82      0.82        61
```

Angka di atas hanya contoh untuk membantu memahami struktur laporan, bukan hasil aktual dari model yang sedang dilatih.

Cara membacanya:

1. **Baris kelas 0:** menunjukkan precision, recall, F1-score, dan support untuk kelas 0.
2. **Baris kelas 1:** menunjukkan metrik yang sama untuk kelas 1.
3. **Accuracy:** proporsi seluruh prediksi yang benar terhadap jumlah sampel yang dievaluasi.
4. **Macro avg:** rata-rata metrik kedua kelas dengan bobot yang sama.
5. **Weighted avg:** rata-rata metrik kedua kelas berdasarkan support.

Pada contoh tersebut, recall kelas 1 sebesar 0.81 berarti model berhasil memprediksi dengan benar sekitar 81% dari sampel yang label aktualnya kelas 1.

Jangan hanya melihat nilai accuracy. Jika model memiliki accuracy tinggi tetapi recall kelas 1 rendah, model mungkin masih melewatkan banyak sampel positif.

## 5. Menggunakan Classification Report dalam Python

### 5.1 Membuat Prediksi

Setelah model selesai dilatih, gunakan data pengujian untuk membuat prediksi.

```python
y_preds = model.predict(X_test)
```

Keterangan:

- `model` adalah model klasifikasi yang sudah dilatih.
- `X_test` adalah fitur pada dataset pengujian.
- `y_preds` berisi label hasil prediksi model.

### 5.2 Menampilkan Classification Report

Gunakan `classification_report()` untuk menampilkan seluruh metrik.

```python
from sklearn.metrics import classification_report

print(classification_report(y_test, y_preds))
```

Jika ingin menampilkan laporan dengan nama kelas yang lebih mudah dibaca, gunakan parameter `target_names`.

```python
print(
    classification_report(
        y_test,
        y_preds,
        labels=[0, 1],
        target_names=["Tidak menunjukkan penyakit", "Menunjukkan penyakit"],
        zero_division=0
    )
)
```

Parameter yang digunakan:

- `labels=[0, 1]`: menentukan urutan label yang ditampilkan.
- `target_names`: memberikan nama yang sesuai dengan urutan label.
- `zero_division=0`: mengatur nilai metrik menjadi 0 ketika suatu pembagian tidak terdefinisi, misalnya ketika model tidak memprediksi satu pun sampel sebagai kelas tertentu.

Nama kelas tersebut mengikuti label dataset dan bukan diagnosis medis.

## 6. Keterbatasan Evaluasi Menggunakan Satu Test Split

Classification report memberikan informasi lebih lengkap daripada accuracy saja. Namun, hasil evaluasinya masih dapat dipengaruhi oleh cara dataset dibagi menjadi data pelatihan dan pengujian.

Misalnya, dua pembagian dataset yang berbeda dapat menghasilkan nilai precision, recall, dan F1-score yang berbeda, meskipun menggunakan algoritma yang sama.

Hal ini dapat terjadi karena:

- Jumlah sampel dataset relatif terbatas.
- Komposisi kelas pada test dataset dapat berubah.
- Karakteristik sampel yang masuk ke test dataset dapat berbeda.
- Hasil evaluasi dari satu pembagian belum menggambarkan variasi performa model pada pembagian data lainnya.

Untuk mengurangi ketergantungan pada satu pembagian data, kita dapat menggunakan **cross-validation** pada data pelatihan.

Dalam pendekatan yang lebih baik:

1. Pisahkan dataset menjadi data pelatihan dan data pengujian.
2. Gunakan cross-validation pada data pelatihan untuk membandingkan model atau memilih hyperparameter.
3. Pilih model berdasarkan hasil validasi dan kebutuhan penelitian.
4. Evaluasi model terpilih pada test dataset yang tetap disimpan untuk evaluasi akhir.

Dengan demikian, test dataset tidak digunakan berulang kali untuk memilih model atau menyesuaikan hyperparameter.

## 7. Contoh Lengkap Kode Classification Report

Contoh berikut menggunakan dataset `heart-disease.csv` dan Logistic Regression. File CSV diasumsikan berada pada direktori kerja yang sama dengan script Python.

Kode ini mencakup pemuatan data, pemisahan fitur dan target, pembagian data, preprocessing, pelatihan model, prediksi, dan evaluasi.

```python
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# 1. Memuat dataset
df = pd.read_csv("heart-disease.csv")

# 2. Memisahkan fitur dan target
X = df.drop(columns=["target"])
y = df["target"]

# 3. Membagi dataset menjadi data training dan testing
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 4. Membuat pipeline preprocessing dan model
model = Pipeline([
    ("scaler", StandardScaler()),
    ("logisticregression", LogisticRegression(max_iter=1000))
])

# 5. Melatih model menggunakan data training
model.fit(X_train, y_train)

# 6. Membuat prediksi pada data testing
y_preds = model.predict(X_test)

# 7. Menampilkan accuracy
accuracy = accuracy_score(y_test, y_preds)
print(f"Accuracy: {accuracy:.4f}")

# 8. Menampilkan classification report
print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_preds,
        labels=[0, 1],
        target_names=["Kelas 0", "Kelas 1"],
        zero_division=0
    )
)

# 9. Menampilkan confusion matrix
cm = confusion_matrix(y_test, y_preds, labels=[0, 1])

print("\nConfusion Matrix:")
print(cm)
```

### Penjelasan Kode Langkah demi Langkah

**Langkah 1 - Memuat dataset**

Fungsi `pd.read_csv()` membaca file CSV ke dalam DataFrame Pandas. Pastikan nama file dan lokasi dataset sesuai dengan lingkungan kerja Anda.

**Langkah 2 - Memisahkan fitur dan target**

Variabel `X` menyimpan seluruh kolom fitur, sedangkan `y` menyimpan label target. Kolom `target` tidak dimasukkan ke dalam `X` karena akan menyebabkan kebocoran informasi apabila digunakan sebagai fitur prediksi.

**Langkah 3 - Membagi dataset**

Parameter `test_size=0.2` mengalokasikan sekitar 20% data untuk pengujian. `random_state=42` membantu menghasilkan pembagian yang konsisten ketika kode dijalankan kembali pada data yang sama. `stratify=y` membantu mempertahankan proporsi kelas pada kedua bagian data.

**Langkah 4 - Membuat pipeline**

`StandardScaler()` menstandarkan fitur berdasarkan statistik data pelatihan. `LogisticRegression()` digunakan sebagai algoritma klasifikasi. Pipeline memastikan preprocessing dipelajari dari data pelatihan, bukan dari seluruh dataset sebelum pembagian.

**Langkah 5 - Melatih model**

`model.fit(X_train, y_train)` melatih pipeline menggunakan data pelatihan.

**Langkah 6 - Membuat prediksi**

`model.predict(X_test)` menghasilkan prediksi untuk sampel yang tidak digunakan dalam pelatihan model.

**Langkah 7 - Menghitung accuracy**

Accuracy mengukur proporsi prediksi yang benar dari seluruh sampel pengujian. Nilai ini perlu dibaca bersama metrik lainnya.

**Langkah 8 - Membaca classification report**

Laporan menampilkan precision, recall, F1-score, dan support untuk masing-masing kelas, diikuti accuracy, macro average, dan weighted average.

**Langkah 9 - Membaca confusion matrix**

Confusion matrix menggunakan baris sebagai label aktual dan kolom sebagai label prediksi. Dengan `labels=[0, 1]`, susunannya adalah:

```text
                 Prediksi 0    Prediksi 1
Aktual 0             TN            FP
Aktual 1             FN            TP
```

Matriks tersebut membantu mengidentifikasi apakah model lebih sering menghasilkan False Positive atau False Negative.

Hasil aktual dapat berbeda bergantung pada versi dataset, pembagian data, dan konfigurasi model.

## 8. Kesimpulan

Classification report membantu mengevaluasi model klasifikasi melalui beberapa sudut pandang:

- **Precision** menunjukkan ketepatan prediksi positif.
- **Recall** menunjukkan kemampuan menemukan kasus positif aktual.
- **F1-score** merangkum keseimbangan precision dan recall.
- **Support** menunjukkan jumlah sampel aktual pada setiap kelas.
- **Macro average** memberikan bobot yang sama untuk setiap kelas.
- **Weighted average** mempertimbangkan jumlah sampel setiap kelas.

Dalam proyek Heart Disease Classification, metrik tersebut perlu dianalisis bersama confusion matrix dan accuracy. Tidak ada satu metrik yang selalu cukup untuk menggambarkan seluruh performa model.

Perlu diingat bahwa dataset dan model dalam materi ini digunakan untuk pembelajaran machine learning, bukan untuk menggantikan pemeriksaan atau diagnosis medis.

## Baca Juga

* [Evaluasi Classification Model: Classification Report](/scikit-learn/evaluasi-classification-model-report)
