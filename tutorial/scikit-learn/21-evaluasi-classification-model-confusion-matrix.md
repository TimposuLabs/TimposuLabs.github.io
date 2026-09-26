---
sidebar_position: 22
title: "Evaluasi Classification Model: Confusion Matrix"
---

![binary classification](/img/python/4.png)

**Confusion Matrix** adalah tabel yang digunakan untuk mengevaluasi performa model klasifikasi dengan membandingkan:

- **Actual / True Label** → label sebenarnya
- **Predicted Label** → label yang diprediksi oleh model

Confusion Matrix tidak hanya menunjukkan berapa banyak prediksi yang benar, tetapi juga menunjukkan **jenis kesalahan yang dilakukan model**.

Hal ini membuat Confusion Matrix sangat berguna untuk memahami perilaku classification model.

Secara sederhana:

```text
Actual Label
     │
     │ dibandingkan dengan
     ▼
Predicted Label
     │
     ▼
Confusion Matrix
```

---

## 1. Mengapa Confusion Matrix Penting?

Accuracy hanya menjawab:

> Berapa banyak prediksi model yang benar?

Confusion Matrix memberikan informasi yang lebih detail:

> Prediksi yang salah itu terjadi pada kelas yang mana dan dalam bentuk kesalahan apa?

Misalnya sebuah model menghasilkan:

```text
Accuracy = 90%
```

Angka tersebut belum menjelaskan apakah model:

- banyak salah memprediksi kelas positif sebagai negatif;
- banyak salah memprediksi kelas negatif sebagai positif;
- atau kesalahannya relatif seimbang.

Confusion Matrix membantu kita melihat informasi tersebut.

---

## 2. Confusion Matrix pada Binary Classification

Pada binary classification terdapat dua kelas.

Misalnya:

```text
0 = Negative
1 = Positive
```

Confusion Matrix memiliki bentuk:

```text
                    Predicted
                  0          1
Actual      0    TN         FP
            1    FN         TP
```

Terdapat empat kemungkinan hasil:

| Actual | Predicted | Istilah | Keterangan |
|---:|---:|---|---|
| 0 | 0 | True Negative (TN) | Negatif diprediksi negatif |
| 0 | 1 | False Positive (FP) | Negatif diprediksi positif |
| 1 | 0 | False Negative (FN) | Positif diprediksi negatif |
| 1 | 1 | True Positive (TP) | Positif diprediksi positif |

Empat komponen tersebut menjadi dasar berbagai classification metrics seperti:

- Accuracy
- Precision
- Recall
- F1-Score
- Specificity

---

## 3. True Negative (TN)

**True Negative** terjadi ketika:

```text
Actual    = 0
Predicted = 0
```

Artinya:

> Data sebenarnya termasuk kelas negatif dan model berhasil memprediksinya sebagai negatif.

Contoh:

```text
Actual    → Tidak sakit
Prediction → Tidak sakit
```

Maka hasilnya:

```text
True Negative
```

---

## 4. True Positive (TP)

**True Positive** terjadi ketika:

```text
Actual    = 1
Predicted = 1
```

Artinya:

> Data sebenarnya termasuk kelas positif dan model berhasil memprediksinya sebagai positif.

Contoh:

```text
Actual    → Sakit
Prediction → Sakit
```

Maka hasilnya:

```text
True Positive
```

---

## 5. False Positive (FP)

**False Positive** terjadi ketika:

```text
Actual    = 0
Predicted = 1
```

Artinya:

> Data sebenarnya negatif, tetapi model memprediksinya sebagai positif.

Contoh:

```text
Actual    → Tidak sakit
Prediction → Sakit
```

Maka hasilnya:

```text
False Positive
```

False Positive sering disebut sebagai **false alarm** dalam konteks tertentu.

---

## 6. False Negative (FN)

**False Negative** terjadi ketika:

```text
Actual    = 1
Predicted = 0
```

Artinya:

> Data sebenarnya positif, tetapi model memprediksinya sebagai negatif.

Contoh:

```text
Actual    → Sakit
Prediction → Tidak sakit
```

Maka hasilnya:

```text
False Negative
```

Dalam beberapa aplikasi, False Negative dapat menjadi kesalahan yang sangat penting karena model gagal mendeteksi kondisi positif.

---

## 7. Memahami Confusion Matrix Secara Visual

Bentuk sederhana Confusion Matrix:

```text
                         Predicted
                     Negative   Positive
                  ┌──────────┬──────────┐
Actual  Negative  │    TN    │    FP    │
                  ├──────────┼──────────┤
        Positive  │    FN    │    TP    │
                  └──────────┴──────────┘
```

Bagian diagonal:

```text
TN
TP
```

merupakan prediksi yang benar.

Sedangkan:

```text
FP
FN
```

merupakan prediksi yang salah.

---

## 8. Contoh Confusion Matrix

Misalnya model melakukan prediksi terhadap 100 sampel.

Hasilnya:

```text
                    Predicted
                  0          1
Actual      0    50         10
            1     5         35
```

Maka:

```text
TN = 50
FP = 10
FN = 5
TP = 35
```

Jumlah seluruh sampel:

$$
50 + 10 + 5 + 35 = 100
$$

Prediksi benar:

$$
TN + TP = 50 + 35 = 85
$$

Prediksi salah:

$$
FP + FN = 10 + 5 = 15
$$

Sehingga accuracy:

$$
Accuracy =
\frac{TN + TP}
{TN + FP + FN + TP}
$$

$$
Accuracy =
\frac{50 + 35}{100}
=
0.85
$$

atau:

```text
Accuracy = 85%
```

---

## 9. Membuat Confusion Matrix dengan Scikit-Learn

Scikit-Learn menyediakan fungsi:

```python
from sklearn.metrics import confusion_matrix
```

Setelah model dilatih, buat prediksi:

```python
y_preds = clf.predict(X_test)
```

Kemudian:

```python
confusion_matrix(y_test, y_preds)
```

Contoh:

```python
from sklearn.metrics import confusion_matrix

y_preds = clf.predict(X_test)

cm = confusion_matrix(y_test, y_preds)

print(cm)
```

Output dapat berupa:

```text
[[50 10]
 [ 5 35]]
```

Untuk binary classification dengan label `0` dan `1`, secara default susunan matriks mengikuti urutan label:

```text
[[TN, FP],
 [FN, TP]]
```

sehingga:

```text
[[50, 10],
 [ 5, 35]]
```

berarti:

```text
TN = 50
FP = 10
FN = 5
TP = 35
```

---

## 10. Menggunakan `pandas.crosstab()`

Selain `confusion_matrix()`, kita dapat menggunakan Pandas untuk melihat hasil prediksi dalam bentuk tabel yang lebih mudah dibaca.

```python
import pandas as pd

pd.crosstab(
    y_test,
    y_preds,
    rownames=["Actual Labels"],
    colnames=["Predicted Labels"]
)
```

Contoh hasil:

```text
Predicted Labels   0   1
Actual Labels
0                 50  10
1                  5  35
```

Dengan tabel tersebut kita dapat melihat:

```text
                Predicted
              0        1
Actual  0    TN       FP
        1    FN       TP
```

---

## 11. Visualisasi dengan Heatmap

Confusion Matrix dapat divisualisasikan menggunakan heatmap.

Salah satu library yang sering digunakan adalah **Seaborn**.

```python
import matplotlib.pyplot as plt
import seaborn as sns

cm = confusion_matrix(y_test, y_preds)

sns.heatmap(
    cm,
    annot=True,
    fmt="d",
    cmap="Blues"
)

plt.xlabel("Predicted Label")
plt.ylabel("True Label")
plt.title("Confusion Matrix")
plt.show()
```

Parameter:

```python
annot=True
```

digunakan untuk menampilkan nilai angka di dalam setiap kotak.

Sedangkan:

```python
fmt="d"
```

digunakan agar angka ditampilkan sebagai bilangan integer.

---

## 12. Memasang Seaborn dari Jupyter Notebook

Jika Seaborn belum tersedia pada environment yang digunakan oleh Jupyter Notebook, kita mungkin mendapatkan error:

```text
ModuleNotFoundError: No module named 'seaborn'
```

Jika menggunakan environment Conda, package dapat dipasang dari cell notebook.

```python
import sys

!conda install --yes --prefix {sys.prefix} seaborn
```

Penjelasan:

### `!`

Tanda:

```text
!
```

memberitahu Jupyter untuk menjalankan perintah sebagai perintah shell/terminal.

### `--yes`

Secara otomatis menyetujui konfirmasi instalasi.

### `--prefix {sys.prefix}`

Mengarahkan instalasi ke environment Python yang sedang digunakan oleh notebook.

Setelah instalasi selesai, kernel Jupyter mungkin perlu direstart sebelum package dapat digunakan.

---

## 13. Mengecek Versi Scikit-Learn

Scikit-Learn menyediakan class `ConfusionMatrixDisplay` untuk memvisualisasikan Confusion Matrix.

Kita dapat melihat versi Scikit-Learn dengan:

```python
import sklearn

print(sklearn.__version__)
```

Namun, daripada bergantung pada versi tertentu, sebaiknya periksa dokumentasi Scikit-Learn yang sesuai dengan versi yang sedang digunakan.

---

## 14. Menggunakan `ConfusionMatrixDisplay`

Scikit-Learn menyediakan:

```python
from sklearn.metrics import ConfusionMatrixDisplay
```

Class tersebut dapat digunakan untuk membuat visualisasi Confusion Matrix secara langsung.

Terdapat dua pendekatan utama:

```text
ConfusionMatrixDisplay
       │
       ├── from_estimator()
       │
       └── from_predictions()
```

Keduanya memiliki tujuan yang sedikit berbeda.

---

## 15. `ConfusionMatrixDisplay.from_estimator()`

Jika kita sudah mempunyai estimator/model yang telah dilatih, kita dapat menggunakan:

```python
from sklearn.metrics import ConfusionMatrixDisplay

ConfusionMatrixDisplay.from_estimator(
    estimator=clf,
    X=X_test,
    y=y_test
)
```

Metode ini menggunakan estimator untuk menghasilkan prediksi dari `X_test`, kemudian membuat Confusion Matrix berdasarkan `y_test` dan hasil prediksi tersebut.

Secara konseptual:

```text
Trained Model
     │
     ▼
   X_test
     │
     ▼
 Predictions
     │
     ├──────────────┐
     │              │
     ▼              ▼
  y_test       Predictions
     │              │
     └───────┬──────┘
             ▼
     Confusion Matrix
```

Dengan pendekatan ini, kita tidak perlu membuat `y_preds` secara manual terlebih dahulu.

---

## 16. Contoh `from_estimator()`

```python
from sklearn.metrics import ConfusionMatrixDisplay

ConfusionMatrixDisplay.from_estimator(
    estimator=clf,
    X=X_test,
    y=y_test
)

plt.title("Confusion Matrix")
plt.show()
```

![confusion matrix](/img/python/57.png)

Pendekatan ini praktis ketika model sudah tersedia dan kita ingin langsung membuat visualisasi.

---

## 17. `ConfusionMatrixDisplay.from_predictions()`

Jika kita sudah memiliki hasil prediksi:

```python
y_preds = clf.predict(X_test)
```

kita dapat menggunakan:

```python
ConfusionMatrixDisplay.from_predictions(
    y_true=y_test,
    y_pred=y_preds
)
```

Contoh lengkap:

```python
from sklearn.metrics import ConfusionMatrixDisplay

y_preds = clf.predict(X_test)

ConfusionMatrixDisplay.from_predictions(
    y_true=y_test,
    y_pred=y_preds
)

plt.show()
```

Pendekatan ini cocok ketika hasil prediksi sudah tersedia.

---

## 18. Perbedaan `from_estimator()` dan `from_predictions()`

| Method | Input utama | Prediksi dibuat oleh method? |
|---|---|---|
| `from_estimator()` | Model + `X` + `y` | Ya |
| `from_predictions()` | `y_true` + `y_pred` | Tidak |

### `from_estimator()`

```python
ConfusionMatrixDisplay.from_estimator(
    clf,
    X_test,
    y_test
)
```

Kita memberikan model dan data.

### `from_predictions()`

```python
y_preds = clf.predict(X_test)

ConfusionMatrixDisplay.from_predictions(
    y_test,
    y_preds
)
```

Kita memberikan actual labels dan predicted labels.

---

## 19. Menampilkan Nama Kelas

Jika dataset mempunyai nama kelas yang lebih informatif, kita dapat memberikan `display_labels`.

Misalnya:

```python
ConfusionMatrixDisplay.from_predictions(
    y_test,
    y_preds,
    display_labels=["Negative", "Positive"]
)

plt.show()
```

Sehingga informasi pada grafik menjadi lebih mudah dipahami daripada hanya:

```text
0
1
```

Contoh lainnya:

```python
ConfusionMatrixDisplay.from_predictions(
    y_test,
    y_preds,
    display_labels=["Sehat", "Sakit"]
)

plt.show()
```

---

## 20. Normalisasi Confusion Matrix

Selain menampilkan jumlah sampel, Confusion Matrix juga dapat dinormalisasi.

Contohnya:

```python
ConfusionMatrixDisplay.from_predictions(
    y_test,
    y_preds,
    normalize="true"
)

plt.show()
```

Dengan:

```python
normalize="true"
```

nilai pada setiap baris dinormalisasi terhadap jumlah aktual pada kelas tersebut.

Hal ini berguna ketika jumlah sampel antar kelas berbeda secara signifikan.

Kita juga dapat menggunakan:

```python
normalize="pred"
```

atau:

```python
normalize="all"
```

sesuai perspektif yang ingin dianalisis.

---

## 21. Confusion Matrix pada Multiclass Classification

Confusion Matrix tidak hanya digunakan untuk binary classification.

Misalnya terdapat tiga kelas:

```text
0 = Cat
1 = Dog
2 = Bird
```

Confusion Matrix dapat berbentuk:

```text
                Predicted
              Cat  Dog  Bird
Actual Cat    40    3    2
       Dog     4   35    1
       Bird    2    3   38
```

Diagonal:

```text
Cat → Cat
Dog → Dog
Bird → Bird
```

menunjukkan prediksi yang benar.

Sedangkan nilai di luar diagonal menunjukkan kelas mana yang sering tertukar.

Contohnya:

```text
Actual Dog
Predicted Cat
```

berarti model salah mengklasifikasikan beberapa data Dog sebagai Cat.

---

## 22. Confusion Matrix dan Jenis Kesalahan

Salah satu keunggulan utama Confusion Matrix adalah kemampuannya menunjukkan **arah kesalahan model**.

Misalnya:

```text
                Predicted
              0        1
Actual  0    950      50
        1     5       95
```

Model melakukan:

```text
False Positive = 50
False Negative = 5
```

Artinya model lebih sering melakukan kesalahan:

```text
Actual 0 → Predicted 1
```

daripada:

```text
Actual 1 → Predicted 0
```

Informasi seperti ini tidak dapat terlihat secara langsung hanya dari satu angka accuracy.

---

## 23. Hubungan Confusion Matrix dengan Classification Metrics

Confusion Matrix menjadi dasar untuk menghitung berbagai metrik.

Strukturnya:

```text
                 Predicted
               0        1
Actual     0   TN       FP
           1   FN       TP
```

Dari empat nilai tersebut kita dapat menghitung:

### Accuracy

$$
Accuracy =
\frac{TP + TN}
{TP + TN + FP + FN}
$$

### Precision

$$
Precision =
\frac{TP}
{TP + FP}
$$

### Recall

$$
Recall =
\frac{TP}
{TP + FN}
$$

### Specificity

$$
Specificity =
\frac{TN}
{TN + FP}
$$

### F1-Score

$$
F1 =
2
\times
\frac{Precision \times Recall}
{Precision + Recall}
$$

Dengan demikian, memahami Confusion Matrix merupakan dasar penting sebelum mempelajari classification metrics lainnya.

---

## 24. Workflow Evaluasi Classification Model

Confusion Matrix dapat ditempatkan dalam workflow evaluasi seperti berikut:

```text
Dataset
   │
   ▼
Train / Test Split
   │
   ├──────────────┐
   ▼              ▼
Training Data    Test Data
   │
   ▼
Train Model
   │
   ▼
Predict
   │
   ▼
y_preds
   │
   ▼
Confusion Matrix
   │
   ├── TN
   ├── FP
   ├── FN
   └── TP
        │
        ▼
Classification Metrics
        │
        ├── Accuracy
        ├── Precision
        ├── Recall
        ├── F1-Score
        └── Specificity
```

---

## 25. Contoh Workflow Lengkap

Berikut contoh sederhana menggunakan `RandomForestClassifier`.

```python
import matplotlib.pyplot as plt

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import ConfusionMatrixDisplay

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

# Training
clf.fit(X_train, y_train)

# Visualisasi Confusion Matrix
ConfusionMatrixDisplay.from_estimator(
    estimator=clf,
    X=X_test,
    y=y_test
)

plt.title("Confusion Matrix")
plt.show()
```

Dengan pendekatan tersebut, kita dapat langsung melihat hasil klasifikasi model pada data test.

---

## 26. Hal yang Perlu Diperhatikan

Beberapa hal penting ketika menggunakan Confusion Matrix:

- Confusion Matrix membandingkan label aktual dengan label prediksi.
- Pada binary classification terdapat empat komponen utama: TN, FP, FN, dan TP.
- Diagonal utama biasanya menunjukkan prediksi benar.
- Di luar diagonal menunjukkan prediksi salah.
- `confusion_matrix()` menghasilkan array Confusion Matrix.
- `pd.crosstab()` dapat digunakan untuk membuat tabel Confusion Matrix yang mudah dibaca.
- `ConfusionMatrixDisplay` dapat digunakan untuk visualisasi.
- `from_estimator()` menerima model dan data.
- `from_predictions()` menerima actual labels dan predicted labels.
- `display_labels` dapat digunakan untuk memberikan nama kelas.
- Confusion Matrix dapat dinormalisasi menggunakan parameter `normalize`.
- Pada multiclass classification, ukuran matriks mengikuti jumlah kelas.
- Confusion Matrix menjadi dasar untuk memahami Accuracy, Precision, Recall, F1-Score, dan Specificity.

---

## 27. Ringkasan

Confusion Matrix memberikan gambaran mengenai **jenis prediksi yang benar dan salah** yang dilakukan oleh classification model.

Untuk binary classification:

```text
                    Predicted
                  0          1
Actual      0    TN         FP
            1    FN         TP
```

Keempat komponen tersebut adalah:

```text
TN → True Negative
FP → False Positive
FN → False Negative
TP → True Positive
```

Kita dapat membuat Confusion Matrix menggunakan:

```python
from sklearn.metrics import confusion_matrix

confusion_matrix(y_test, y_preds)
```

atau memvisualisasikannya secara langsung menggunakan:

```python
from sklearn.metrics import ConfusionMatrixDisplay

ConfusionMatrixDisplay.from_estimator(
    clf,
    X_test,
    y_test
)
```

Jika hasil prediksi sudah tersedia:

```python
ConfusionMatrixDisplay.from_predictions(
    y_test,
    y_preds
)
```

Confusion Matrix sangat penting karena tidak hanya menunjukkan **berapa banyak prediksi yang benar**, tetapi juga menunjukkan **jenis kesalahan yang dilakukan model**.

## 28. Referensi

* https://scikit-learn.org/stable/modules/generated/sklearn.metrics.confusion_matrix.html
