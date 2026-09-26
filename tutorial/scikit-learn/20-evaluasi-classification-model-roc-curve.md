---
sidebar_position: 21
title: "Evaluasi Classification Model: ROC Curve & AUC"
---

Pada materi sebelumnya kita telah membahas **Accuracy** sebagai salah satu metrik untuk mengevaluasi classification model.

Accuracy dapat memberikan informasi mengenai proporsi prediksi yang benar. Namun, accuracy tidak selalu cukup, terutama ketika kita ingin mengetahui bagaimana performa model berubah ketika **threshold klasifikasi** diubah.

Salah satu metode yang dapat digunakan untuk melihat hal tersebut adalah:

- **ROC Curve (Receiver Operating Characteristic)**
- **AUC (Area Under the Curve)**

ROC Curve dan AUC sangat umum digunakan untuk mengevaluasi **binary classification**, terutama ketika model menghasilkan skor atau probabilitas untuk kelas positif.

---

## 1. Apa Itu ROC Curve?

**ROC Curve (Receiver Operating Characteristic Curve)** adalah grafik yang menunjukkan hubungan antara:

- **True Positive Rate (TPR)**
- **False Positive Rate (FPR)**

pada berbagai nilai **threshold**.

Secara sederhana:

> ROC Curve menunjukkan bagaimana perubahan threshold memengaruhi kemampuan model dalam mendeteksi kelas positif dan menghasilkan false positive.

ROC Curve memiliki:

- Sumbu X → **False Positive Rate (FPR)**
- Sumbu Y → **True Positive Rate (TPR)**

Secara umum:

```text
TPR
1.0 ┤          ╭────────
    │        ╭─
    │      ╭─
    │    ╭─
    │  ╭─
0.0 ┼──────────────────── FPR
    0.0                  1.0
```

Semakin dekat kurva ke **pojok kiri atas**, semakin baik kemampuan model dalam memisahkan kelas positif dan negatif berdasarkan ranking/skor prediksinya.

:::tip
* **True Positive** = model memprediksi 1 ketika kenyataan adalah 1
* **False Positive** = model memprediksi 1 ketika kenyataan adalah 0
* **True Negative** = model memprediksi 0 ketika kenyataan adalah 0
* **False Negative** = model memprediksi 0 ketika kenyataan adalah 1
:::

---

## 2. Apa Itu AUC?

**AUC (Area Under the Curve)** adalah luas area di bawah ROC Curve.

AUC mengubah informasi dari ROC Curve menjadi satu nilai numerik yang lebih mudah digunakan untuk membandingkan model.

Secara intuitif, ROC-AUC dapat dipahami sebagai kemampuan model dalam memberikan skor yang lebih tinggi kepada sampel positif dibandingkan sampel negatif.

Interpretasi sederhananya:

| AUC | Interpretasi Umum |
|---:|---|
| 1.0 | Pemisahan/ranking sempurna |
| 0.9 | Sangat baik |
| 0.8 | Baik |
| 0.7 | Cukup |
| 0.5 | Setara dengan ranking acak |
| < 0.5 | Ranking berlawanan dengan label; perlu diperiksa |

Nilai AUC secara matematis dapat berada pada rentang **0 sampai 1**.

Nilai:

```text
AUC = 1.0
```

menunjukkan pemisahan/ranking yang sempurna pada data evaluasi.

Sedangkan:

```text
AUC = 0.5
```

menunjukkan kemampuan diskriminasi setara dengan tebakan acak.

Jika:

```text
AUC < 0.5
```

model cenderung memberikan ranking yang berlawanan dengan kelas sebenarnya. Dalam situasi tertentu, membalik arah skor dapat menghasilkan AUC di atas 0.5, tetapi penyebabnya tetap perlu diperiksa.

---

## 3. Memahami True Positive Rate (TPR)

**True Positive Rate (TPR)** juga dikenal sebagai:

- Recall
- Sensitivity

TPR mengukur proporsi sampel positif yang berhasil dikenali model sebagai positif.

Rumusnya:

$$
TPR =
\frac{TP}{TP + FN}
$$

Keterangan:

- **TP (True Positive)** → positif yang diprediksi sebagai positif
- **FN (False Negative)** → positif yang diprediksi sebagai negatif

Contoh:

```text
Actual Positive = 100
Berhasil ditemukan = 80
Tidak ditemukan = 20
```

Maka:

$$
TPR =
\frac{80}{80 + 20}
=
0.8
$$

atau:

```text
TPR = 80%
```

Artinya, model berhasil menemukan 80% dari seluruh sampel yang sebenarnya positif.

---
### Contoh kasus True Positive Rate (TPR)

Mari kita gunakan contoh nyata berdasarkan kasus **Pasien Sakit Jantung** agar rumus ini langsung terbayang di kepala Anda.

Bayangkan di sebuah rumah sakit ada **100 orang yang aslinya beneran sakit jantung**.

Lalu, Anda meminta model AI Anda untuk memeriksa ke-100 orang tersebut. Berikut adalah hasil kerja model AI Anda:

* **80 orang** berhasil ditebak dengan benar oleh AI: "Ya, Anda sakit jantung" (**TP = 80**).
* **20 orang** gagal dideteksi oleh AI, alias kecolongan karena AI mengira mereka sehat: "*Anda sehat*" (**FN = 20**).

**Mari Masukkan ke Rumus:**

* **TP** (Tebakan Benar-Sakit) = **80**
* **Total Aktual Sakit** (Semua orang yang beneran sakit) = TP + FN = 80 + 20 = **100** 

$$
TPR=\frac{80}{100}=0.80
$$

Jika diubah ke persen, **TPR model Anda adalah 80%**.

---

## 4. Memahami False Positive Rate (FPR)

**False Positive Rate (FPR)** mengukur proporsi sampel negatif yang salah diprediksi sebagai positif.

Rumusnya:

$$
FPR =
\frac{FP}{FP + TN}
$$

Keterangan:

- **FP (False Positive)** → negatif yang diprediksi sebagai positif
- **TN (True Negative)** → negatif yang diprediksi sebagai negatif

Contoh:

```text
Actual Negative = 100
Salah diprediksi positif = 10
Benar diprediksi negatif = 90
```

Maka:

$$
FPR =
\frac{10}{10 + 90}
=
0.1
$$

atau:

```text
FPR = 10%
```

Artinya, 10% dari sampel yang sebenarnya negatif salah dianggap sebagai positif.

---

### Contoh kasus False Positive Rate (FPR)

Bayangkan di rumah sakit yang sama, ada **100 orang yang aslinya beneran sehat**.

Saat diperiksa oleh model AI Anda, berikut adalah hasil tebakannya:

* **90 orang** berhasil ditebak dengan benar oleh AI: "*Anda sehat, silakan pulang*" (**TN = 90**).
* **10 orang** salah dituduh oleh AI, alias terkena alarm palsu karena AI mengira mereka sakit jantung: "*Anda sakit jantung, harus rawat inap!*" (**FP = 10**).

**Mari Masukkan ke Rumus FPR:**

* **FP** (Salah Tuduh / Alarm Palsu) = **10**
* **Total Aktual Sehat** (Semua orang yang beneran sehat) = TN + FP = 90 + 10 = **100** 

$$
FPR=\frac{FP}{\text{Total\ Aktual\ Sehat }}=\frac{10}{100}=0.10
$$

Jika diubah ke persen, **FPR model Anda adalah 10%**.

---

## 5. Hubungan TPR dan FPR

ROC Curve menghubungkan:

```text
TPR
│
│       Model
│      ╱
│     ╱
│    ╱
│   ╱
│  ╱
│ ╱
└──────────────── FPR
```

Kita ingin mendapatkan:

```text
TPR tinggi
FPR rendah
```

Dengan kata lain, model diharapkan:

- berhasil mendeteksi banyak sampel positif;
- menghasilkan sedikit false positive.

Namun, perubahan threshold dapat menyebabkan trade-off antara keduanya.

---

## 6. Apa Itu Threshold?

Model klasifikasi tertentu dapat menghasilkan **probability atau score** untuk suatu kelas.

Misalnya:

```text
Pasien A → 0.95
Pasien B → 0.80
Pasien C → 0.60
Pasien D → 0.30
Pasien E → 0.10
```

Jika kita menggunakan threshold:

```text
0.50
```

maka secara sederhana:

```text
Score >= 0.50 → Positive
Score <  0.50 → Negative
```

Hasilnya:

```text
A → Positive
B → Positive
C → Positive
D → Negative
E → Negative
```

Namun threshold tidak harus selalu 0.50.

Misalnya threshold diubah menjadi:

```text
0.70
```

maka:

```text
A → Positive
B → Positive
C → Negative
D → Negative
E → Negative
```

Perubahan threshold dapat mengubah:

- True Positive
- False Positive
- True Negative
- False Negative

Akibatnya, nilai TPR dan FPR juga berubah.

ROC Curve menggambarkan perubahan tersebut pada berbagai threshold.

---

## 7. Mengapa ROC Curve Menggunakan Probability atau Score?

Untuk membuat ROC Curve, kita membutuhkan informasi mengenai **ranking atau skor prediksi**, bukan hanya label akhir.

Misalnya:

```text
Actual    Probability
   1          0.95
   0          0.80
   1          0.70
   0          0.40
   1          0.30
```

Informasi probabilitas tersebut memungkinkan kita mengevaluasi model menggunakan banyak threshold.

Jika kita hanya menggunakan:

```python
clf.predict(X_test)
```

kita mendapatkan label akhir seperti:

```text
[1, 1, 1, 0, 0]
```

Informasi mengenai score/probability yang digunakan untuk membentuk berbagai threshold sudah tidak tersedia.

Karena itu, untuk classifier yang mendukung probabilitas, kita dapat menggunakan:

```python
clf.predict_proba(X_test)
```

---

## 8. Mendapatkan Probability Kelas Positif

Pertama, import `roc_curve`:

```python
from sklearn.metrics import roc_curve
```

Kemudian latih model:

```python
clf.fit(X_train, y_train)
```

Selanjutnya dapatkan probabilitas:

```python
y_probs = clf.predict_proba(X_test)
```

Untuk binary classification, hasilnya biasanya berbentuk:

```text
[[prob_class_0, prob_class_1],
 [prob_class_0, prob_class_1],
 [prob_class_0, prob_class_1],
 ...]
```

Misalnya:

```text
[[0.80, 0.20],
 [0.10, 0.90],
 [0.30, 0.70]]
```

Kolom pertama merupakan probabilitas kelas pertama, sedangkan kolom kedua merupakan probabilitas kelas kedua.

Jika kelas positif adalah kelas pada indeks 1, kita dapat mengambil kolom tersebut:

```python
y_probs_positive = y_probs[:, 1]
```

Sehingga:

```text
y_probs_positive
```

berisi probabilitas untuk kelas positif.

### Catatan Penting

Jangan selalu menganggap bahwa:

```python
[:, 1]
```

pasti merupakan kelas positif.

Urutan kelas dapat diperiksa menggunakan:

```python
clf.classes_
```

Contoh:

```python
print(clf.classes_)
```

Jika hasilnya:

```text
[0 1]
```

maka:

```python
y_probs[:, 1]
```

merupakan probabilitas untuk kelas `1`.

---

## 9. Menghitung FPR, TPR, dan Threshold

Setelah mendapatkan probabilitas kelas positif:

```python
from sklearn.metrics import roc_curve

fpr, tpr, thresholds = roc_curve(
    y_test,
    y_probs_positive
)
```

Fungsi `roc_curve()` menghasilkan tiga array:

```text
fpr
tpr
thresholds
```

Contoh konseptual:

```text
threshold    FPR      TPR
   0.90      0.05     0.40
   0.70      0.10     0.65
   0.50      0.20     0.80
   0.30      0.40     0.90
   0.10      0.80     1.00
```

Setiap threshold dapat menghasilkan kombinasi FPR dan TPR yang berbeda.

---

## 10. Mengapa Perlu Memvisualisasikan ROC Curve?

Hasil dari:

```python
roc_curve(y_test, y_probs_positive)
```

berupa array angka.

Misalnya:

```text
FPR:
[0.00, 0.05, 0.10, 0.20, ...]

TPR:
[0.00, 0.40, 0.65, 0.80, ...]
```

Melihat angka-angka tersebut secara langsung tidak selalu mudah.

Dengan memvisualisasikannya sebagai grafik, kita dapat melihat hubungan antara FPR dan TPR dengan lebih jelas.

---

## 11. Membuat Fungsi untuk Plot ROC Curve

Kita dapat membuat helper function untuk memvisualisasikan ROC Curve.

```python
import matplotlib.pyplot as plt

def plot_roc_curve(fpr, tpr):
    """
    Menampilkan ROC Curve berdasarkan FPR dan TPR.
    """
    plt.plot(fpr, tpr,  color="orange", label="ROC Curve")

    # Garis baseline random guessing
    plt.plot(
        [0, 1],
        [0, 1],
        color="darkblue",
        linestyle="--",
        label="Random Guessing"
    )

    plt.xlabel("False Positive Rate (FPR)")
    plt.ylabel("True Positive Rate (TPR)")
    plt.title("Receiver Operating Characteristic (ROC) Curve")
    plt.legend()
    plt.show()
```

Kemudian:

```python
plot_roc_curve(fpr, tpr)
```

![scikit learn](/img/python/54.png)

---

## 12. Memahami Garis Baseline ROC

Pada ROC Curve terdapat garis diagonal:

```text
TPR
1.0 ┤             /
    │           /
    │         /
    │       /
    │     /
    │   /
0.0 ┼──────────────── FPR
    0.0             1.0
```

Garis tersebut merupakan **baseline random guessing**.

Jika model tidak memiliki kemampuan diskriminasi, performanya secara umum berada di sekitar garis tersebut.

Luas area di bawah garis diagonal adalah:

$$
AUC = 0.5
$$

---

## 13. Karakteristik Model yang Lebih Baik pada ROC Curve

Secara umum, ROC Curve yang berada lebih dekat dengan:

```text
TPR = 1
FPR = 0
```

menunjukkan kemampuan diskriminasi yang lebih baik.

Visualisasinya secara sederhana:

```text
TPR
1.0 ┤       ╭────────
    │      ╱
    │     ╱
    │    ╱
    │   ╱
    │  ╱
0.0 ┼──────────────── FPR
    0.0             1.0
```

![scikit learn](/img/python/55.png)

Perlu diperhatikan bahwa bentuk kurva harus dilihat bersama konteks masalah dan tujuan penggunaan model.

ROC-AUC mengukur kemampuan diskriminasi/ranking secara keseluruhan, tetapi tidak secara langsung menentukan threshold operasional terbaik untuk suatu aplikasi.

---

## 14. Menghitung AUC dengan `roc_auc_score`

Selain melihat grafik ROC Curve, kita dapat menghitung nilai AUC secara langsung menggunakan:

```python
from sklearn.metrics import roc_auc_score
```

Kemudian:

```python
auc_score = roc_auc_score(
    y_test,
    y_probs_positive
)

print(f"AUC Score: {auc_score:.4f}")
```

Contoh output:

```text
AUC Score: 0.8732
```

Artinya model memiliki ROC-AUC sekitar:

```text
0.8732
```

---

## 15. Interpretasi ROC-AUC

Beberapa interpretasi umum:

```text
AUC = 1.00
```

Menunjukkan ranking/pemisahan kelas yang sempurna pada data evaluasi.

```text
AUC = 0.50
```

Menunjukkan kemampuan diskriminasi setara dengan random guessing.

```text
AUC < 0.50
```

Menunjukkan bahwa ranking score model cenderung berlawanan dengan label.

Sedangkan nilai di antara 0.5 dan 1.0 menunjukkan berbagai tingkat kemampuan diskriminasi.

Namun, tidak ada batas universal seperti:

```text
AUC > 0.90 = selalu bagus
AUC > 0.80 = selalu bagus
```

Interpretasi performa harus mempertimbangkan konteks masalah, distribusi data, biaya kesalahan, dan tujuan model.

---

## 16. ROC-AUC sebagai Kemampuan Ranking

Salah satu cara intuitif memahami ROC-AUC adalah:

> Seberapa baik model memberikan score yang lebih tinggi kepada sampel positif dibandingkan sampel negatif?

Misalnya terdapat:

```text
Positive → 0.90
Negative → 0.20
```

Model memberikan score yang lebih tinggi kepada positive.

Ini merupakan ranking yang baik.

Sebaliknya:

```text
Positive → 0.20
Negative → 0.90
```

Model memberikan score lebih tinggi kepada negative.

Ranking seperti ini berlawanan dengan yang diharapkan.

ROC-AUC dapat dipahami secara intuitif sebagai probabilitas bahwa sebuah sampel positif yang dipilih secara acak akan mendapatkan score lebih tinggi daripada sebuah sampel negatif yang dipilih secara acak.

---

## 17. ROC Curve dan `predict()` vs `predict_proba()`

Perhatikan perbedaannya:

### `predict()`

```python
y_preds = clf.predict(X_test)
```

Menghasilkan label:

```text
[0, 1, 1, 0, 1]
```

### `predict_proba()`

```python
y_probs = clf.predict_proba(X_test)
```

Menghasilkan probabilitas untuk masing-masing kelas, jika estimator mendukungnya:

```text
[
    [0.80, 0.20],
    [0.10, 0.90],
    [0.30, 0.70],
    ...
]
```

Untuk ROC Curve, kita membutuhkan score/probability agar dapat mengevaluasi berbagai threshold.

---

## 18. Workflow Lengkap ROC Curve

Workflow secara umum:

```text
Dataset
   │
   ▼
Train/Test Split
   │
   ├──────────────┐
   ▼              ▼
Training Data    Test Data
   │
   ▼
Train Model
   │
   ▼
Predict Probability / Score
   │
   ▼
Positive Class Score
   │
   ▼
ROC Curve
   │
   ├── FPR
   ├── TPR
   └── Thresholds
   │
   ▼
ROC-AUC
```

---

## 19. Contoh Implementasi Lengkap

Berikut contoh lengkap menggunakan `RandomForestClassifier`:

```python
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_curve, roc_auc_score

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

# Probability
y_probs = clf.predict_proba(X_test)

# Probability untuk kelas positif
y_probs_positive = y_probs[:, 1]

# ROC Curve
fpr, tpr, thresholds = roc_curve(
    y_test,
    y_probs_positive
)

# AUC
auc_score = roc_auc_score(
    y_test,
    y_probs_positive
)

print(f"AUC Score: {auc_score:.4f}")

# Plot
plt.plot(
    fpr,
    tpr,
    color="orange",
    label=f"ROC Curve (AUC = {auc_score:.2f})"
)

plt.plot(
    [0, 1],
    [0, 1],
    color="darkblue",
    linestyle="--",
    label="Random Guessing"
)

plt.xlabel("False Positive Rate (FPR)")
plt.ylabel("True Positive Rate (TPR)")
plt.title("Receiver Operating Characteristic (ROC) Curve")
plt.legend()
plt.show()
```

![scikit learn](/img/python/56.png)

---

## 20. Perfect ROC Curve

Secara konseptual, model dengan ranking sempurna dapat menghasilkan ROC Curve seperti:

```text
TPR
1.0 ┤       ┌────────────
    │       │
    │       │
    │       │
    │       │
0.0 ┼───────┴──────────── FPR
    0.0                1.0
```

Kurva tersebut memiliki:

```text
AUC = 1.0
```

Artinya seluruh sampel positif mendapatkan ranking yang lebih tinggi daripada seluruh sampel negatif.

Namun, AUC 1.0 pada data evaluasi **tidak otomatis membuktikan bahwa model mengalami data leakage atau overfitting**.

Jika mendapatkan hasil sempurna, kita sebaiknya melakukan pemeriksaan terhadap:

- preprocessing,
- pembagian data,
- kemungkinan data leakage,
- duplikasi data,
- feature yang secara tidak sengaja mengandung target,
- cara pengumpulan dataset,
- perbedaan antara data training dan data evaluasi.

---

## 21. ROC-AUC dan Accuracy Memiliki Fokus yang Berbeda

Accuracy dan ROC-AUC tidak mengukur hal yang persis sama.

| Metrik | Fokus |
|---|---|
| Accuracy | Proporsi prediksi label yang benar pada threshold yang digunakan |
| ROC-AUC | Kemampuan model membedakan/ranking kelas pada berbagai threshold |
| ROC Curve | Hubungan TPR dan FPR pada berbagai threshold |

Contohnya:

```text
Accuracy
   │
   ▼
Prediksi Label
   │
   ▼
Benar / Salah
```

Sedangkan:

```text
ROC-AUC
   │
   ▼
Probability / Score
   │
   ▼
Berbagai Threshold
   │
   ├── TPR
   └── FPR
```

Karena itu, sebuah model dapat memiliki accuracy tertentu pada threshold tertentu dan tetap memiliki ROC-AUC yang memberikan informasi tambahan mengenai kemampuan ranking model.

---

## 22. Kapan ROC-AUC Berguna?

ROC-AUC dapat berguna ketika:

- kita ingin membandingkan kemampuan diskriminasi beberapa classifier;
- model menghasilkan probability atau decision score;
- kita ingin melihat performa pada berbagai threshold;
- kita tidak ingin evaluasi hanya bergantung pada satu threshold tertentu.

Namun, ROC-AUC bukan selalu metrik terbaik untuk setiap masalah.

Pada dataset dengan **class imbalance yang sangat ekstrem**, misalnya ketika kelas positif sangat jarang, **Precision-Recall Curve dan Average Precision** juga penting untuk dipertimbangkan.

Hal ini karena ROC-AUC dapat terlihat cukup baik meskipun precision pada kelas positif masih rendah.

---

## 23. Hal yang Perlu Diingat

Beberapa poin penting mengenai ROC Curve dan AUC:

- ROC adalah singkatan dari **Receiver Operating Characteristic**.
- ROC Curve menunjukkan hubungan antara **TPR dan FPR**.
- TPR juga dikenal sebagai **Recall atau Sensitivity**.
- FPR mengukur proporsi negatif yang salah diprediksi sebagai positif.
- ROC Curve menggunakan berbagai threshold.
- Untuk classifier yang mendukungnya, `predict_proba()` dapat digunakan untuk memperoleh probability.
- `predict()` menghasilkan label akhir, bukan seluruh informasi threshold.
- `roc_curve()` menghasilkan FPR, TPR, dan thresholds.
- `roc_auc_score()` digunakan untuk menghitung ROC-AUC.
- AUC = 0.5 menunjukkan performa diskriminasi setara dengan random guessing.
- AUC = 1.0 menunjukkan ranking/pemisahan sempurna pada data evaluasi.
- AUC di bawah 0.5 menunjukkan ranking yang cenderung berlawanan dengan label.
- ROC-AUC mengukur kemampuan diskriminasi/ranking, bukan secara langsung menentukan threshold operasional terbaik.
- Pada class imbalance ekstrem, Precision-Recall Curve juga perlu dipertimbangkan.
- Final test set tetap harus dipisahkan dari proses model selection dan hyperparameter tuning.

---

## 24. Ringkasan

ROC Curve digunakan untuk melihat hubungan antara:

$$
TPR
\quad\text{dan}\quad
FPR
$$

pada berbagai threshold.

TPR:

$$
TPR =
\frac{TP}{TP + FN}
$$

FPR:

$$
FPR =
\frac{FP}{FP + TN}
$$

Sedangkan AUC merupakan luas area di bawah ROC Curve.

Secara intuitif:

```text
ROC Curve
     │
     ├── TPR
     ├── FPR
     └── Threshold
            │
            ▼
          AUC
```

Jika:

```text
AUC = 0.5
```

model memiliki kemampuan diskriminasi yang setara dengan random guessing.

Jika:

```text
AUC = 1.0
```

model memiliki ranking/pemisahan yang sempurna pada data evaluasi.

Namun, performa model tidak sebaiknya dinilai hanya dari satu metrik. Accuracy, ROC-AUC, Confusion Matrix, Precision, Recall, F1-Score, dan metrik lainnya dapat memberikan perspektif yang berbeda.

## 25. Tambahan

Saat pertama kali menjumpainya, metrik ROC Curve dan AUC (*area under curve*) mungkin terasa agak membingungkan. Namun, jangan khawatir; dengan sedikit latihan, konsep ini akan menjadi lebih mudah dipahami.

Singkatnya, hal yang perlu Anda ingat adalah:

* ROC Curve dan metrik AUC merupakan metrik evaluasi untuk model klasifikasi biner (model yang memprediksi salah satu dari dua kemungkinan, misalnya apakah seseorang menderita penyakit jantung atau tidak).
* ROC Curve membandingkan *true positive rate* (TPR) dengan *false positive rate* (FPR) pada berbagai ambang batas (*threshold*) klasifikasi.
* Metrik AUC menunjukkan seberapa baik kemampuan model Anda dalam membedakan antar-kelas (contohnya, seberapa akurat model tersebut dalam menentukan apakah seseorang mengidap penyakit jantung atau tidak). Model yang sempurna akan memperoleh skor AUC sebesar 1.
