---
sidebar_position: 33
title: "Tambahan: Membandingkan Model pada Data Split yang Sama"
---

Pada materi sebelumnya, kita telah membandingkan performa beberapa model menggunakan berbagai metric seperti:

- Accuracy
- Precision
- Recall
- F1-score

Namun, terdapat satu hal penting yang harus diperhatikan ketika membandingkan beberapa model:

> **Semua model harus dilatih dan dievaluasi menggunakan split data yang sama.**

Hal ini penting agar perbandingan antar-model benar-benar adil.

---

## Mengapa Data Split yang Sama Penting?

Misalnya kita memiliki dua model:

```python
model_1
model_2
```

Kita ingin mengetahui model mana yang memiliki performa lebih baik.

Perbandingan yang benar adalah:

```text
                 Training Data          Test Data
                     │                     │
                     ▼                     ▼
                  X_train                X_test
                  y_train                y_test
                     │                     │
             ┌───────┴───────┐
             │               │
             ▼               ▼
          model_1          model_2
             │               │
             ▼               ▼
       model_1_preds    model_2_preds
             │               │
             └───────┬───────┘
                     ▼
              Compare Metrics
```

Kedua model mendapatkan data training yang sama dan membuat prediksi pada data test yang sama.

Dengan demikian, perbedaan performa lebih dapat dikaitkan dengan **perbedaan model**, bukan karena perbedaan data yang digunakan.

---

## Contoh Perbandingan yang Benar

Misalnya kita memiliki:

```python
model_1 = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model_2 = RandomForestClassifier(
    n_estimators=500,
    random_state=42
)
```

Kedua model memiliki konfigurasi yang berbeda pada `n_estimators`.

Gunakan training data yang sama:

```python
model_1.fit(
    X_train,
    y_train
)

model_2.fit(
    X_train,
    y_train
)
```

Kemudian gunakan test data yang sama:

```python
model_1_preds = model_1.predict(
    X_test
)

model_2_preds = model_2.predict(
    X_test
)
```

Sekarang kedua prediksi dapat dibandingkan secara adil.

---

## Alur Perbandingan Model

Workflow yang benar:

```text
X_train, y_train
      │
      ├───────────────┐
      │               │
      ▼               ▼
   model_1         model_2
      │               │
      ▼               ▼
model_1_preds    model_2_preds
      │               │
      └───────┬───────┘
              ▼
       Evaluate Metrics
```

Dalam bentuk kode:

```python
model_1.fit(X_train, y_train)
model_1_preds = model_1.predict(X_test)

model_2.fit(X_train, y_train)
model_2_preds = model_2.predict(X_test)
```

Kemudian:

```python
model_1_metrics = evaluate_preds(
    y_test,
    model_1_preds
)

model_2_metrics = evaluate_preds(
    y_test,
    model_2_preds
)
```

Keduanya menggunakan:

```python
y_test
```

yang sama.

---

## Mengapa Tidak Boleh Menggunakan Test Set yang Berbeda?

Bayangkan kita melakukan:

```text
model_1
   │
   ├── Train Set A
   └── Test Set A

model_2
   │
   ├── Train Set B
   └── Test Set B
```

Kemudian mendapatkan:

```text
model_1 accuracy = 85%
model_2 accuracy = 87%
```

Apakah `model_2` benar-benar lebih baik?

Belum tentu.

Perbedaan tersebut dapat dipengaruhi oleh:

- Model yang berbeda.
- Training data yang berbeda.
- Test data yang berbeda.
- Distribusi data yang berbeda.
- Sample yang berbeda.

Karena itu kita tidak dapat mengisolasi pengaruh dari perbedaan model.

---

## Contoh Masalah

Misalnya dataset memiliki 1.000 sample.

Kita membagi data secara berbeda:

```text
Model 1
Training = 800 sample
Test     = 200 sample


Model 2
Training = 800 sample
Test     = 200 sample
```

Jumlahnya memang sama.

Namun sample yang berada dalam test set bisa berbeda.

```text
Model 1 Test Set
[A, B, C, D, E, ...]

Model 2 Test Set
[X, Y, Z, W, V, ...]
```

Jika Model 1 mendapatkan test set yang lebih mudah, sedangkan Model 2 mendapatkan test set yang lebih sulit, membandingkan accuracy keduanya menjadi kurang fair.

---

## Jumlah Data Sama Tidak Berarti Split Sama

Ini adalah konsep penting.

Misalnya:

```python
test_size=0.2
```

digunakan pada dua model.

Keduanya akan memiliki jumlah test sample yang sama.

Tetapi jika proses random split berbeda, sample yang masuk ke test set dapat berbeda.

Jadi:

```text
Jumlah data sama
        ≠
Data split sama
```

Yang kita inginkan adalah:

```text
Data split sama
        ↓
Training data sama
        ↓
Test data sama
```

---

## Cara Memastikan Split Sama

Gunakan satu kali proses `train_test_split()` dan gunakan hasilnya untuk semua model.

Contoh:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)
```

Kemudian semua model menggunakan variabel yang sama:

```python
model_1.fit(X_train, y_train)
model_2.fit(X_train, y_train)
model_3.fit(X_train, y_train)
```

Dan:

```python
model_1_preds = model_1.predict(X_test)
model_2_preds = model_2.predict(X_test)
model_3_preds = model_3.predict(X_test)
```

---

## Jangan Melakukan Split Ulang untuk Setiap Model

Hindari pola seperti ini:

```python
# Model 1
X_train_1, X_test_1, y_train_1, y_test_1 = train_test_split(
    X,
    y,
    test_size=0.2
)

model_1.fit(
    X_train_1,
    y_train_1
)


# Model 2
X_train_2, X_test_2, y_train_2, y_test_2 = train_test_split(
    X,
    y,
    test_size=0.2
)

model_2.fit(
    X_train_2,
    y_train_2
)
```

Karena:

```text
X_train_1 ≠ X_train_2
```

dan:

```text
X_test_1 ≠ X_test_2
```

maka perbandingan performanya tidak lagi sepenuhnya apple-to-apple.

---

## Bagaimana dengan `random_state`?

Menentukan:

```python
random_state=42
```

dapat membuat split dapat direproduksi.

Misalnya:

```python
X_train_1, X_test_1, y_train_1, y_test_1 = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

X_train_2, X_test_2, y_train_2, y_test_2 = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Dengan input dan parameter yang sama, kedua split akan sama.

Namun, praktik yang lebih sederhana dan lebih aman adalah **melakukan split sekali**, kemudian menggunakan hasil split tersebut untuk semua model.

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Kemudian gunakan:

```python
model_1.fit(X_train, y_train)
model_2.fit(X_train, y_train)
model_3.fit(X_train, y_train)
```

---

## Perbandingan Model yang Fair

Prinsipnya dapat diringkas menjadi:

```text
SAME DATA
   │
   ├── Same X_train
   ├── Same y_train
   ├── Same X_test
   └── Same y_test
          │
          ▼
   Different Models
          │
          ▼
   Different Predictions
          │
          ▼
   Compare Metrics
```

Yang boleh berbeda:

```text
Model 1 ≠ Model 2
```

atau:

```text
Hyperparameter Model 1
        ≠
Hyperparameter Model 2
```

Yang sebaiknya sama:

```text
X_train
y_train
X_test
y_test
```

---

## Contoh Membandingkan Tiga Model

Misalnya kita memiliki tiga model:

```python
model_1 = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model_2 = RandomForestClassifier(
    n_estimators=300,
    random_state=42
)

model_3 = RandomForestClassifier(
    n_estimators=500,
    max_depth=10,
    random_state=42
)
```

Gunakan training data yang sama:

```python
model_1.fit(X_train, y_train)
model_2.fit(X_train, y_train)
model_3.fit(X_train, y_train)
```

Kemudian prediksi pada test set yang sama:

```python
model_1_preds = model_1.predict(X_test)
model_2_preds = model_2.predict(X_test)
model_3_preds = model_3.predict(X_test)
```

Evaluasi:

```python
model_1_metrics = evaluate_preds(
    y_test,
    model_1_preds
)

model_2_metrics = evaluate_preds(
    y_test,
    model_2_preds
)

model_3_metrics = evaluate_preds(
    y_test,
    model_3_preds
)
```

Sekarang hasil dapat dibandingkan:

```python
compare_metrics = pd.DataFrame({
    "model_1": model_1_metrics,
    "model_2": model_2_metrics,
    "model_3": model_3_metrics
})
```

Visualisasikan:

```python
compare_metrics.plot.bar(
    figsize=(10, 8)
)

plt.ylabel("Score")
plt.xlabel("Metrics")
plt.title("Model Comparison")
plt.xticks(rotation=0)
plt.show()
```

Sekarang perbandingan lebih valid karena seluruh model dievaluasi pada `y_test` yang sama.

---

## Hubungan dengan Hyperparameter Tuning

Konsep ini juga penting ketika melakukan hyperparameter tuning.

Misalnya kita membandingkan:

```text
Baseline Model
      │
      ▼
RandomizedSearchCV
      │
      ▼
GridSearchCV
```

Kita ingin mengetahui apakah tuning benar-benar memberikan peningkatan performa.

Maka evaluasi final harus menggunakan test set yang sama.

```text
Same Test Set
      │
      ├── Baseline
      ├── Random Search
      └── Grid Search
```

Contohnya:

```python
baseline_preds = baseline_model.predict(X_test)

rs_preds = rs_clf.predict(X_test)

gs_preds = gs_clf.predict(X_test)
```

Kemudian:

```python
baseline_metrics = evaluate_preds(
    y_test,
    baseline_preds
)

rs_metrics = evaluate_preds(
    y_test,
    rs_preds
)

gs_metrics = evaluate_preds(
    y_test,
    gs_preds
)
```

Barulah hasil tersebut dapat dibandingkan dengan lebih fair.

---

## Kesalahan pada Contoh Sebelumnya

Pada contoh sebelumnya, baseline model menggunakan data split yang berbeda dengan model-model lainnya.

Secara konseptual:

```text
Baseline
   │
   ├── Split A
   └── Test A


Random Search
   │
   ├── Split B
   └── Test B


Grid Search
   │
   ├── Split B
   └── Test B
```

Walaupun semua model terlihat memiliki metric yang dapat dibandingkan, baseline tidak sepenuhnya comparable karena dievaluasi pada data yang berbeda.

Seharusnya:

```text
                    Same Split
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
       Baseline    Random Search  Grid Search
          │            │            │
          ▼            ▼            ▼
       Predictions  Predictions  Predictions
          │            │            │
          └────────────┼────────────┘
                       ▼
                Compare Metrics
```

---

## Apakah Model Harus Menghasilkan Prediksi yang Sama?

Tidak.

Justru yang diharapkan adalah setiap model menghasilkan prediksi masing-masing.

Misalnya:

```python
model_1_preds
model_2_preds
model_3_preds
```

Prediksi tersebut boleh berbeda.

Yang harus sama adalah data yang digunakan untuk menghasilkan prediksi:

```python
X_test
```

dan data ground truth:

```python
y_test
```

Jadi:

```text
Same X_test
     │
     ├── Model 1 → model_1_preds
     ├── Model 2 → model_2_preds
     └── Model 3 → model_3_preds
```

Kemudian semua dibandingkan terhadap:

```python
y_test
```

---

## Prinsip Apple-to-Apple Comparison

Dalam machine learning, kita dapat menggunakan prinsip:

> **Compare models on the same data splits and evaluation procedure.**

Artinya, jika ingin membandingkan dua model, usahakan:

1. Training data sama.
2. Test data sama.
3. Target data sama.
4. Metric sama.
5. Prosedur evaluasi sama.

Contoh:

```text
Model A
X_train + y_train
       ↓
Model A
       ↓
X_test
       ↓
Prediction A
       ↓
Metric A


Model B
X_train + y_train
       ↓
Model B
       ↓
X_test
       ↓
Prediction B
       ↓
Metric B
```

Dengan demikian perbedaan metric lebih merepresentasikan perbedaan model.

---

## Catatan tentang Cross-Validation

Untuk evaluasi menggunakan cross-validation, prinsip yang sama tetap berlaku.

Jika kita ingin membandingkan dua model menggunakan `cross_val_score()`, sebaiknya keduanya menggunakan prosedur cross-validation yang sama.

Contoh:

```python
from sklearn.model_selection import cross_val_score

model_1_scores = cross_val_score(
    model_1,
    X,
    y,
    cv=5,
    scoring="accuracy"
)

model_2_scores = cross_val_score(
    model_2,
    X,
    y,
    cv=5,
    scoring="accuracy"
)
```

Keduanya menggunakan:

```python
cv=5
```

dan:

```python
scoring="accuracy"
```

Sehingga perbandingan lebih konsisten.

Untuk eksperimen yang lebih terkontrol, kita juga dapat membuat objek CV yang sama dan memberikannya ke kedua model.

---

## Checklist Fair Model Comparison

Sebelum membandingkan model, periksa:

- [ ] Apakah semua model menggunakan `X_train` yang sama?
- [ ] Apakah semua model menggunakan `y_train` yang sama?
- [ ] Apakah semua model menggunakan `X_test` yang sama?
- [ ] Apakah semua model dievaluasi menggunakan `y_test` yang sama?
- [ ] Apakah metric yang digunakan sama?
- [ ] Apakah prosedur preprocessing sama?
- [ ] Apakah preprocessing dilakukan tanpa data leakage?
- [ ] Jika menggunakan cross-validation, apakah `cv` dan scoring konsisten?
- [ ] Apakah test set hanya digunakan untuk evaluasi final?

---

## Ringkasan

Ketika membandingkan beberapa model Machine Learning, perbedaan model harus menjadi faktor utama yang membedakan eksperimen.

Cara yang benar:

```python
model_1.fit(X_train, y_train)
model_1_preds = model_1.predict(X_test)

model_2.fit(X_train, y_train)
model_2_preds = model_2.predict(X_test)
```

Kemudian:

```python
model_1_metrics = evaluate_preds(
    y_test,
    model_1_preds
)

model_2_metrics = evaluate_preds(
    y_test,
    model_2_preds
)
```

Dengan demikian:

```text
Same Training Data
        +
Same Test Data
        +
Same Evaluation Metrics
        +
Different Models
        =
Fair Model Comparison
```

Kesalahan kecil dalam proses data splitting dapat membuat perbandingan model menjadi kurang valid.

Oleh karena itu, selalu pastikan bahwa model-model yang dibandingkan dievaluasi menggunakan **data split dan prosedur evaluasi yang sama**.

---

## Takeaway

Hal terpenting dari materi ini:

```text
Jangan hanya bertanya:

"Model mana yang memiliki score paling tinggi?"

Tanyakan juga:

"Apakah semua model diuji menggunakan data dan prosedur evaluasi yang sama?"
```

Jika jawabannya **ya**, maka perbandingan performa menjadi jauh lebih dapat dipercaya.
