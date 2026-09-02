---
slug: algoritma-machine-learning-scikit-learn
title: "Macam-Macam Algoritma dalam Machine Learning: Panduan Praktis dengan Scikit-Learn"
authors: topekox
tags: [manchine learning, data mining, ai, data science]
---

Sebagian besar kegagalan proyek machine learning bukan karena algoritmanya salah pilih, melainkan karena algoritma dipilih sebelum karakteristik datanya dipahami. Artikel ini membalik urutannya: untuk setiap algoritma, pertanyaan pertama yang dijawab adalah *data seperti apa yang cocok*, baru kemudian *bagaimana mengimplementasikannya*.

Semua contoh kode memakai scikit-learn versi 1.3 ke atas dan ditulis dalam gaya `Pipeline` supaya preprocessing tidak bocor ke data uji.

<!-- truncate -->

## Kerangka Pemilihan Algoritma

### Empat Pertanyaan Penyaring

Sebelum masuk ke algoritma satu per satu, ada empat pertanyaan yang menentukan hampir seluruh keputusan teknis.

#### Apakah Ada Label?

Ada label berarti supervised learning: klasifikasi jika targetnya kategorikal, regresi jika targetnya kontinu. Tidak ada label berarti unsupervised: clustering, reduksi dimensi, atau deteksi anomali. Ada juga kondisi setengah jalan, yaitu label tersedia tapi sangat sedikit, yang mengarah ke pendekatan semi-supervised atau deteksi anomali.

#### Berapa Rasio Jumlah Baris terhadap Jumlah Fitur?

Data lebar (fitur banyak, baris sedikit) menuntut regularisasi kuat dan model linear. Data panjang (baris banyak, fitur sedikit) memberi ruang untuk model non-linear yang kompleks. Aturan kasarnya, jika jumlah fitur mendekati atau melebihi jumlah baris, model kompleks hampir pasti overfit.

#### Apakah Hubungan Antar Variabel Linear?

Jika batas keputusan berbentuk kotak-kotak dan berbasis ambang, model berbasis pohon menang. Jika hubungannya mulus dan aditif, model linear menang. Cara termurah mengetahuinya adalah membandingkan skor validasi silang antara regresi logistik dan Random Forest di awal proyek.

#### Apa Biaya Kesalahannya?

Jika biaya false negative jauh lebih besar daripada false positive, akurasi bukan metrik yang layak dipakai. Pertanyaan ini menentukan `class_weight`, ambang keputusan, dan metrik evaluasi, dan seharusnya dijawab sebelum satu baris kode pun ditulis.

### Peta Kategori Algoritma

| Kategori | Tujuan | Contoh Algoritma |
|---|---|---|
| Supervised, regresi | Memprediksi nilai kontinu | Linear, Ridge, Lasso, Random Forest Regressor |
| Supervised, klasifikasi | Memprediksi kelas | Logistic Regression, SVM, KNN, Naive Bayes |
| Ensemble berbasis pohon | Akurasi maksimal pada data tabular | Random Forest, Gradient Boosting, Stacking |
| Clustering | Menemukan kelompok alami | K-Means, DBSCAN, GMM, Agglomerative |
| Reduksi dimensi | Memampatkan dan memvisualisasi | PCA, t-SNE |
| Deteksi anomali | Menandai pengamatan langka | Isolation Forest, One-Class SVM |

### Fondasi Kode: Pipeline dan Preprocessing

Hampir semua algoritma di bawah ini memakai kerangka yang sama. Preprocessing dibungkus dalam `ColumnTransformer`, lalu digabung dengan estimator dalam satu `Pipeline`.

#### Impor dan Konfigurasi Dasar

```python
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer, make_column_selector
from sklearn.impute import SimpleImputer
from sklearn.model_selection import StratifiedKFold, train_test_split, cross_validate
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

RANDOM_STATE = 42
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)
```

#### Varian A: Preprocessing untuk Model Sensitif Skala

Dipakai oleh KNN, SVM, regresi logistik, MLP, K-Means, dan PCA.

```python
preprocessor_scaled = ColumnTransformer(
    transformers=[
        ("num", Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]), make_column_selector(dtype_include=np.number)),
        ("cat", Pipeline([
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("ohe", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
        ]), make_column_selector(dtype_include=object)),
    ],
    remainder="drop",
)
```

#### Varian B: Preprocessing untuk Model Berbasis Pohon

Dipakai oleh Decision Tree, Random Forest, dan Gradient Boosting.

```python
preprocessor_tree = ColumnTransformer(
    transformers=[
        ("num", SimpleImputer(strategy="median"),
         make_column_selector(dtype_include=np.number)),
        ("cat", Pipeline([
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("ohe", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
        ]), make_column_selector(dtype_include=object)),
    ],
    remainder="drop",
)
```

Pemisahan dua varian ini bukan formalitas. Model berbasis jarak dan berbasis gradien rusak total jika fitur punya skala berbeda. Model berbasis pohon sama sekali tidak terpengaruh oleh transformasi monoton, sehingga standardisasi hanya membuang waktu komputasi.

## Algoritma Supervised: Regresi

### Ordinary Least Squares

#### Konsep

Mencari kombinasi linear dari fitur yang meminimalkan jumlah kuadrat galat antara nilai prediksi dan nilai sebenarnya. Solusinya tertutup dan dapat dihitung langsung tanpa iterasi.

#### Kapan Digunakan

Ketika target bersifat kontinu dan yang dibutuhkan bukan hanya prediksi tapi juga interpretasi arah dan besar pengaruh tiap variabel. Ini pilihan default untuk baseline regresi dan untuk konteks yang menuntut pertanggungjawaban seperti kebijakan publik, ekonometrika, dan audit.

#### Jenis Data yang Cocok

Fitur numerik dengan hubungan yang mendekati linear terhadap target, multikolinearitas rendah, dan residual yang relatif homoskedastik. Jumlah baris harus jauh lebih besar daripada jumlah fitur.

#### Kelemahan dan Batasan

Tidak menangkap interaksi atau non-linearitas kecuali ditambahkan manual. Sangat sensitif terhadap outlier karena galat dikuadratkan. Koefisiennya menyesatkan ketika fitur saling berkorelasi tinggi.

#### Implementasi

```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

ols = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", LinearRegression()),
])
ols.fit(X_train, y_train)
pred = ols.predict(X_test)

print("MAE:", mean_absolute_error(y_test, pred))
print("R2 :", r2_score(y_test, pred))
```

### Regularisasi: Ridge, Lasso, ElasticNet

#### Konsep

Ridge menambahkan penalti L2 yang mengecilkan seluruh koefisien secara proporsional. Lasso menambahkan penalti L1 yang mampu mengenolkan koefisien sepenuhnya sehingga sekaligus melakukan seleksi fitur. ElasticNet menggabungkan keduanya dengan rasio yang bisa diatur.

#### Kapan Digunakan

Ridge dipakai ketika fitur saling berkorelasi dan semuanya diyakini relevan. Lasso dipakai ketika diduga banyak fitur tidak relevan dan diinginkan model yang ringkas. ElasticNet dipakai ketika fitur berkorelasi dalam kelompok, karena Lasso murni cenderung memilih satu fitur dari tiap kelompok secara acak.

#### Jenis Data yang Cocok

Data lebar dengan banyak fitur, misalnya data ekspresi gen, fitur TF-IDF dari teks, atau hasil rekayasa fitur otomatis. Standardisasi wajib, karena penalti bekerja pada besaran koefisien.

#### Kelemahan dan Batasan

Koefisien menjadi bias secara sengaja, sehingga tidak layak dipakai untuk inferensi statistik formal. Nilai `alpha` harus dipilih lewat validasi silang, bukan ditebak.

#### Implementasi

```python
from sklearn.linear_model import RidgeCV, LassoCV, ElasticNetCV

ridge = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", RidgeCV(alphas=np.logspace(-3, 3, 25))),
])

lasso = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", LassoCV(alphas=np.logspace(-4, 1, 50), max_iter=10_000,
                      random_state=RANDOM_STATE)),
])

elastic = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", ElasticNetCV(l1_ratio=[0.1, 0.5, 0.7, 0.9, 0.95, 1.0],
                           max_iter=10_000, random_state=RANDOM_STATE)),
])

lasso.fit(X_train, y_train)
nama_fitur = lasso.named_steps["prep"].get_feature_names_out()
koef = pd.Series(lasso.named_steps["model"].coef_, index=nama_fitur)
print("Fitur bertahan:", (koef != 0).sum(), "dari", len(koef))
print(koef[koef != 0].sort_values(key=abs, ascending=False).head(10))
```

### Regresi Robust: Huber dan RANSAC

#### Konsep

`HuberRegressor` mengganti fungsi kerugian kuadrat dengan fungsi yang tumbuh linear setelah ambang tertentu, sehingga outlier tidak mendominasi. `RANSACRegressor` berulang kali mencocokkan model pada subset acak dan memilih model dengan inlier terbanyak.

#### Kapan Digunakan

Ketika data mengandung outlier yang diketahui berasal dari kesalahan pengukuran atau proses berbeda, dan menghapusnya secara manual tidak praktis.

#### Jenis Data yang Cocok

Data numerik dengan hubungan linear yang jelas, tetapi tercemar sebagian kecil pengamatan ekstrem. RANSAC bekerja baik jika proporsi outlier di bawah sekitar 50 persen.

#### Kelemahan dan Batasan

Lebih lambat dari OLS dan punya hyperparameter tambahan (`epsilon` untuk Huber, `residual_threshold` untuk RANSAC). Jika outlier sebenarnya merupakan sinyal penting, model ini justru membuang informasi.

#### Implementasi

```python
from sklearn.linear_model import HuberRegressor, RANSACRegressor

huber = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", HuberRegressor(epsilon=1.35, alpha=1e-4, max_iter=500)),
])

ransac = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", RANSACRegressor(random_state=RANDOM_STATE)),
])
```

## Algoritma Supervised: Klasifikasi

### Logistic Regression

#### Konsep

Model linear yang memetakan kombinasi fitur ke probabilitas melalui fungsi sigmoid untuk kasus biner, atau softmax untuk multikelas. Meski namanya mengandung kata regresi, ini adalah algoritma klasifikasi.

#### Kapan Digunakan

Sebagai baseline wajib untuk setiap masalah klasifikasi. Juga menjadi pilihan akhir ketika sistem produksi menuntut latensi rendah, ukuran model kecil, dan probabilitas terkalibrasi baik tanpa post-processing tambahan.

#### Jenis Data yang Cocok

Data numerik terstandardisasi dengan batas keputusan yang mendekati linear. Sangat kuat pada data berdimensi sangat tinggi dan jarang, misalnya representasi teks bag-of-words, di mana model kompleks justru overfit.

#### Kelemahan dan Batasan

Batas keputusan linear. Untuk pola berbentuk XOR atau melingkar, performanya buruk kecuali fitur direkayasa lebih dulu, misalnya lewat `PolynomialFeatures`.

#### Implementasi

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, average_precision_score

logreg = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", LogisticRegression(
        penalty="l2",
        C=1.0,
        solver="lbfgs",
        max_iter=2000,
        class_weight="balanced",
        random_state=RANDOM_STATE,
    )),
])

logreg.fit(X_train, y_train)
proba = logreg.predict_proba(X_test)[:, 1]

print(classification_report(y_test, logreg.predict(X_test), digits=4))
print("PR-AUC:", average_precision_score(y_test, proba))
```

#### Catatan untuk Data Tidak Seimbang

Parameter `class_weight="balanced"` menaikkan bobot kelas minoritas secara otomatis. Pada kasus dengan biaya false negative tinggi seperti deteksi penipuan, deteksi intrusi jaringan, atau skrining penyakit, pendekatan ini biasanya lebih efektif dan lebih murah daripada oversampling. Untuk data dengan ribuan fitur dan kebutuhan seleksi otomatis, gunakan `penalty="l1"` dengan `solver="saga"`.

### K-Nearest Neighbors

#### Konsep

Tidak ada proses pelatihan dalam arti sebenarnya. Prediksi dilakukan dengan mencari *k* tetangga terdekat dari titik uji lalu mengambil suara mayoritas untuk klasifikasi atau rata-rata untuk regresi.

#### Kapan Digunakan

Dataset kecil sampai sedang dengan batas keputusan yang sangat tidak beraturan, atau ketika dibutuhkan baseline non-parametrik yang cepat dibangun. Juga berguna sebagai komponen sistem rekomendasi berbasis kemiripan.

#### Jenis Data yang Cocok

Fitur numerik dalam jumlah sedikit, idealnya di bawah 20, sudah distandardisasi, dan padat. Sampel per kelas harus cukup banyak agar tetangga yang ditemukan representatif.

#### Kelemahan dan Batasan

Ini algoritma yang paling cepat runtuh oleh *curse of dimensionality*. Pada dimensi tinggi, semua titik menjadi berjarak hampir sama sehingga konsep tetangga kehilangan makna. Biaya prediksi juga tumbuh linear terhadap ukuran data latih, sehingga tidak layak untuk sistem real-time berskala besar.

#### Implementasi

```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import GridSearchCV

knn = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", KNeighborsClassifier(n_jobs=-1)),
])

grid = GridSearchCV(
    knn,
    param_grid={
        "model__n_neighbors": [3, 5, 11, 21],
        "model__weights": ["uniform", "distance"],
        "model__metric": ["euclidean", "manhattan"],
    },
    scoring="f1_macro",
    cv=cv,
    n_jobs=-1,
)
grid.fit(X_train, y_train)
print(grid.best_params_, grid.best_score_)
```

Gunakan `weights="distance"` ketika kepadatan data tidak seragam antar wilayah.

### Naive Bayes

#### Konsep

Menerapkan teorema Bayes dengan asumsi bahwa semua fitur saling bebas jika kelas diketahui. Asumsi ini hampir selalu salah, tetapi modelnya tetap sering bekerja baik karena yang dibutuhkan hanya urutan probabilitas yang benar, bukan nilainya.

#### Kapan Digunakan

Klasifikasi teks seperti penyaringan spam, analisis sentimen, dan kategorisasi dokumen. Juga sebagai baseline sangat cepat ketika data latih sedikit, karena pelatihannya praktis satu kali lewat data.

#### Jenis Data yang Cocok

`MultinomialNB` untuk data cacahan seperti frekuensi kata atau TF-IDF. `BernoulliNB` untuk fitur biner. `GaussianNB` untuk fitur kontinu yang distribusinya mendekati normal per kelas. `CategoricalNB` untuk fitur kategorikal murni.

#### Kelemahan dan Batasan

Probabilitas keluarannya buruk secara kalibrasi karena cenderung ekstrem mendekati 0 atau 1. Performa turun tajam ketika fitur sangat berkorelasi, misalnya ketika unigram dan bigram dipakai bersamaan tanpa penyesuaian.

#### Implementasi

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

teks_clf = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(1, 2), min_df=2, sublinear_tf=True)),
    ("model", MultinomialNB(alpha=0.1)),
])
teks_clf.fit(dokumen_train, label_train)
```

Parameter `alpha` adalah Laplace smoothing yang mencegah probabilitas nol untuk kata yang tidak pernah muncul saat pelatihan.

### Support Vector Machine

#### Konsep

Mencari hyperplane yang memaksimalkan margin antar kelas. Dengan kernel trick, data dipetakan ke ruang berdimensi lebih tinggi sehingga batas non-linear di ruang asal menjadi linear di ruang baru.

#### Kapan Digunakan

Dataset kecil sampai menengah, di bawah sekitar 50.000 baris, dengan batas keputusan kompleks dan margin antar kelas yang cukup jelas. Sangat kuat pada data berdimensi tinggi dengan jumlah sampel terbatas, seperti klasifikasi citra sederhana atau data biomedis.

#### Jenis Data yang Cocok

Fitur numerik terstandardisasi. `LinearSVC` untuk data sparse berdimensi tinggi. `SVC(kernel="rbf")` untuk data padat berdimensi rendah sampai menengah.

#### Kelemahan dan Batasan

Kompleksitas pelatihan `SVC` berada di kisaran kuadratik sampai kubik terhadap jumlah sampel, sehingga tidak praktis untuk data besar. Model tidak memberi probabilitas secara langsung; `probability=True` memicu kalibrasi internal yang memperlambat pelatihan berkali lipat. Interpretasinya rendah.

#### Implementasi

```python
from sklearn.svm import SVC, LinearSVC

svm_rbf = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", SVC(kernel="rbf", C=10, gamma="scale",
                  class_weight="balanced", random_state=RANDOM_STATE)),
])

# Untuk data besar dan sparse, misalnya TF-IDF
svm_linear = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", LinearSVC(C=1.0, class_weight="balanced", dual="auto",
                        max_iter=5000, random_state=RANDOM_STATE)),
])
```

Parameter `C` mengendalikan trade-off antara margin lebar dan kesalahan klasifikasi. Nilai `C` besar membuat model lebih ketat dan berisiko overfit.

## Algoritma Berbasis Pohon dan Ensemble

### Decision Tree

#### Konsep

Membagi ruang fitur secara rekursif dengan aturan ambang tunggal per node, memilih pemisahan yang paling menurunkan impurity, diukur dengan Gini atau entropi.

#### Kapan Digunakan

Ketika interpretasi menjadi kebutuhan utama dan aturan keputusan harus bisa dibaca manusia atau diterjemahkan menjadi prosedur operasional. Juga menjadi blok dasar bagi semua metode ensemble berbasis pohon.

#### Jenis Data yang Cocok

Campuran fitur numerik dan kategorikal. Tidak sensitif terhadap skala, toleran terhadap outlier, dan mampu menangkap interaksi antar fitur tanpa spesifikasi manual.

#### Kelemahan dan Batasan

Varians tinggi. Perubahan kecil pada data latih dapat menghasilkan struktur pohon yang sangat berbeda. Pohon tunggal tanpa pembatasan kedalaman hampir pasti overfit.

#### Implementasi

```python
from sklearn.tree import DecisionTreeClassifier, export_text

tree = Pipeline([
    ("prep", preprocessor_tree),
    ("model", DecisionTreeClassifier(
        criterion="gini",
        max_depth=8,
        min_samples_leaf=20,
        ccp_alpha=0.0,
        class_weight="balanced",
        random_state=RANDOM_STATE,
    )),
])
tree.fit(X_train, y_train)

print(export_text(
    tree.named_steps["model"],
    feature_names=list(tree.named_steps["prep"].get_feature_names_out()),
    max_depth=3,
))
```

#### Mengendalikan Kompleksitas dengan Pruning

Cara paling bersih mengendalikan kompleksitas adalah cost-complexity pruning. Ambil jalur alpha dengan `cost_complexity_pruning_path()`, lalu pilih `ccp_alpha` terbaik melalui validasi silang, bukan dengan menebak `max_depth`.

### Random Forest

#### Konsep

Membangun banyak pohon pada sampel bootstrap yang berbeda, dan pada setiap pemisahan hanya mempertimbangkan subset fitur secara acak. Prediksi akhir adalah agregasi seluruh pohon. Dekorelasi antar pohon inilah yang menurunkan varians.

#### Kapan Digunakan

Ini default terbaik untuk data tabular ketika waktu tuning terbatas. Performanya kuat dengan hyperparameter bawaan, sulit dibuat overfit parah, dan berjalan paralel dengan baik.

#### Jenis Data yang Cocok

Data tabular berukuran sedang sampai besar, campuran tipe fitur, dengan interaksi non-linear. Tahan terhadap fitur tidak relevan dan skala yang berbeda-beda.

#### Kelemahan dan Batasan

Ukuran model besar dan lambat saat inferensi jika jumlah pohon banyak. Tidak mampu melakukan ekstrapolasi di luar rentang nilai target yang pernah dilihat, sehingga lemah untuk regresi dengan tren. Ukuran kepentingan fitur berbasis impurity bias terhadap fitur berkardinalitas tinggi.

#### Implementasi

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance

rf = Pipeline([
    ("prep", preprocessor_tree),
    ("model", RandomForestClassifier(
        n_estimators=500,
        max_depth=None,
        min_samples_leaf=2,
        max_features="sqrt",
        class_weight="balanced_subsample",
        n_jobs=-1,
        random_state=RANDOM_STATE,
    )),
])
rf.fit(X_train, y_train)

hasil = permutation_importance(rf, X_test, y_test, n_repeats=10,
                               scoring="f1_macro", random_state=RANDOM_STATE,
                               n_jobs=-1)
peringkat = pd.Series(hasil.importances_mean, index=X_test.columns)
print(peringkat.sort_values(ascending=False).head(10))
```

### Gradient Boosting dan HistGradientBoosting

#### Konsep

Pohon dibangun secara berurutan, masing-masing memperbaiki residual atau gradien galat dari model sebelumnya. Berbeda dengan Random Forest yang menurunkan varians, boosting menurunkan bias.

#### Kapan Digunakan

Ketika akurasi maksimal pada data tabular menjadi tujuan dan tersedia waktu untuk tuning. Pada sebagian besar benchmark data tabular, gradient boosting mengungguli Random Forest maupun jaringan saraf.

#### Jenis Data yang Cocok

Sama seperti Random Forest, tetapi hasilnya lebih baik ketika sinyalnya halus dan dataset cukup besar. `HistGradientBoostingClassifier` menangani nilai hilang secara native dan melakukan binning histogram, sehingga jauh lebih cepat pada data dengan puluhan ribu baris ke atas.

#### Kelemahan dan Batasan

Lebih sensitif terhadap hyperparameter dibandingkan Random Forest, terutama `learning_rate` dan jumlah iterasi. Pelatihan bersifat sekuensial sehingga tidak bisa diparalelkan sepenuhnya. Rentan overfit pada data berisik jika early stopping tidak dipakai.

#### Implementasi

```python
from sklearn.ensemble import HistGradientBoostingClassifier

hgb = HistGradientBoostingClassifier(
    learning_rate=0.05,
    max_iter=1000,
    max_leaf_nodes=31,
    min_samples_leaf=20,
    l2_regularization=1.0,
    early_stopping=True,
    validation_fraction=0.15,
    n_iter_no_change=30,
    class_weight="balanced",
    random_state=RANDOM_STATE,
)
hgb.fit(X_train_numerik, y_train)   # menerima NaN secara langsung
print("Iterasi terpakai:", hgb.n_iter_)
```

#### Strategi Tuning

Aturan praktisnya: turunkan `learning_rate`, naikkan `max_iter`, dan biarkan early stopping menentukan titik berhenti. Setelah itu baru sesuaikan `max_leaf_nodes` dan `l2_regularization`. Mengubah banyak parameter sekaligus membuat sumber perbaikan tidak bisa dilacak.

### Voting dan Stacking

#### Konsep

Voting menggabungkan prediksi beberapa model melalui suara mayoritas (hard) atau rata-rata probabilitas (soft). Stacking melatih meta-model di atas prediksi model-model dasar.

#### Kapan Digunakan

Pada tahap akhir ketika beberapa model dengan karakteristik berbeda punya performa setara tetapi membuat kesalahan pada sampel yang berbeda. Semakin rendah korelasi galat antar model dasar, semakin besar keuntungannya.

#### Jenis Data yang Cocok

Sama seperti model dasarnya. Yang menentukan adalah keberagaman model, bukan jumlahnya. Menggabungkan tiga varian Random Forest hampir tidak memberi manfaat.

#### Kelemahan dan Batasan

Biaya pelatihan dan inferensi berlipat, interpretasi makin jauh, dan keuntungan performanya sering hanya sepersekian persen. Pertimbangkan biaya operasionalnya sebelum dipakai di produksi.

#### Implementasi

```python
from sklearn.ensemble import StackingClassifier, VotingClassifier

estimators = [
    ("logreg", logreg),
    ("rf", rf),
    ("hgb", Pipeline([
        ("prep", preprocessor_tree),
        ("model", HistGradientBoostingClassifier(random_state=RANDOM_STATE)),
    ])),
]

stack = StackingClassifier(
    estimators=estimators,
    final_estimator=LogisticRegression(max_iter=2000, class_weight="balanced"),
    cv=cv,                 # wajib, untuk mencegah kebocoran data
    stack_method="predict_proba",
    n_jobs=-1,
)
stack.fit(X_train, y_train)
```

## Jaringan Saraf Tiruan

### Multi-Layer Perceptron

#### Konsep

Jaringan saraf feed-forward dengan satu atau lebih lapisan tersembunyi, dilatih dengan backpropagation. Non-linearitas diperoleh dari fungsi aktivasi seperti ReLU.

#### Kapan Digunakan

Ketika hubungan antara fitur dan target sangat non-linear dan data cukup besar. Pada data tabular, MLP jarang mengalahkan gradient boosting, sehingga pemakaiannya lebih sering dibenarkan pada data tidak terstruktur atau pada representasi embedding.

#### Jenis Data yang Cocok

Fitur numerik terstandardisasi, jumlah sampel besar dalam orde puluhan ribu ke atas, dan sinyal yang benar-benar non-linear.

#### Kelemahan dan Batasan

Membutuhkan tuning arsitektur dan learning rate, tidak interpretable, sensitif terhadap inisialisasi, dan `MLPClassifier` scikit-learn tidak mendukung GPU. Untuk kebutuhan deep learning serius, pindah ke PyTorch atau TensorFlow.

#### Implementasi

```python
from sklearn.neural_network import MLPClassifier

mlp = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", MLPClassifier(
        hidden_layer_sizes=(128, 64),
        activation="relu",
        solver="adam",
        alpha=1e-4,
        learning_rate_init=1e-3,
        batch_size=256,
        max_iter=300,
        early_stopping=True,
        n_iter_no_change=15,
        random_state=RANDOM_STATE,
    )),
])
```

`MLPClassifier` tidak punya parameter `class_weight`. Untuk data tidak seimbang, tangani lewat resampling atau penyesuaian ambang keputusan pada probabilitas keluaran.

## Algoritma Unsupervised: Clustering

### K-Means

#### Konsep

Membagi data menjadi *k* klaster dengan meminimalkan jumlah kuadrat jarak setiap titik ke centroid klasternya, lewat iterasi penugasan dan pembaruan centroid.

#### Kapan Digunakan

Segmentasi pelanggan, kompresi warna, kuantisasi vektor, dan pembuatan fitur baru dari data tanpa label. Cepat dan mudah diskalakan.

#### Jenis Data yang Cocok

Fitur numerik terstandardisasi, klaster berbentuk relatif bulat dengan ukuran dan kepadatan setara, serta jumlah klaster yang bisa diperkirakan dari domain.

#### Kelemahan dan Batasan

Jumlah klaster harus ditentukan di awal. Asumsi bentuk bulat membuatnya gagal pada klaster memanjang atau melengkung. Sangat sensitif terhadap outlier dan skala fitur.

#### Implementasi

```python
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score, davies_bouldin_score

X_scaled = preprocessor_scaled.fit_transform(X)

for k in range(2, 11):
    km = KMeans(n_clusters=k, n_init="auto", random_state=RANDOM_STATE)
    label = km.fit_predict(X_scaled)
    print(f"k={k}  silhouette={silhouette_score(X_scaled, label):.4f}"
          f"  db={davies_bouldin_score(X_scaled, label):.4f}"
          f"  inertia={km.inertia_:.1f}")
```

Metode elbow pada inertia sering ambigu. Silhouette score dan Davies-Bouldin index memberi sinyal yang lebih tegas. Untuk data sangat besar, gunakan `MiniBatchKMeans`.

### DBSCAN

#### Konsep

Mengelompokkan titik berdasarkan kepadatan. Titik yang punya cukup banyak tetangga dalam radius `eps` menjadi inti klaster, sementara titik yang tidak masuk klaster mana pun diberi label -1 sebagai noise.

#### Kapan Digunakan

Ketika bentuk klaster tidak beraturan, jumlah klaster tidak diketahui, dan data mengandung outlier yang justru ingin diidentifikasi. Cocok untuk data spasial dan deteksi pola geografis.

#### Jenis Data yang Cocok

Fitur numerik berdimensi rendah sampai menengah dengan perbedaan kepadatan yang jelas antara klaster dan latar belakang.

#### Kelemahan dan Batasan

Sangat sensitif terhadap `eps`. Gagal ketika klaster punya kepadatan yang sangat berbeda-beda. Performanya menurun pada dimensi tinggi karena jarak kehilangan daya diskriminasi.

#### Implementasi

```python
from sklearn.cluster import DBSCAN
from sklearn.neighbors import NearestNeighbors

# Menentukan eps lewat grafik k-distance
k = 5
jarak, _ = NearestNeighbors(n_neighbors=k).fit(X_scaled).kneighbors(X_scaled)
k_dist = np.sort(jarak[:, k - 1])   # titik siku pada kurva ini adalah kandidat eps

db = DBSCAN(eps=0.8, min_samples=10, n_jobs=-1)
label = db.fit_predict(X_scaled)
print("Jumlah klaster:", len(set(label)) - (1 if -1 in label else 0))
print("Proporsi noise:", np.mean(label == -1))
```

Jika kepadatan antar klaster bervariasi, gunakan `HDBSCAN` yang sudah tersedia di scikit-learn sejak versi 1.3.

### Agglomerative Clustering

#### Konsep

Clustering hierarkis bottom-up. Setiap titik dimulai sebagai klaster sendiri, lalu pasangan klaster terdekat digabung berulang kali hingga terbentuk dendrogram.

#### Kapan Digunakan

Ketika struktur hierarki antar kelompok punya makna substantif, misalnya taksonomi produk, pengelompokan dokumen, atau analisis filogenetik. Dendrogram memungkinkan pemilihan jumlah klaster setelah melihat strukturnya.

#### Jenis Data yang Cocok

Dataset kecil sampai menengah, karena kompleksitasnya kuadratik terhadap jumlah sampel, dengan metrik jarak yang bermakna secara domain.

#### Kelemahan dan Batasan

Tidak skalabel untuk data besar, dan penggabungan bersifat final sehingga tidak bisa dikoreksi di iterasi berikutnya.

#### Implementasi

```python
from sklearn.cluster import AgglomerativeClustering

agg = AgglomerativeClustering(n_clusters=None, distance_threshold=15.0,
                              linkage="ward", metric="euclidean")
label = agg.fit_predict(X_scaled)
```

Linkage `ward` hanya bekerja dengan metrik Euclidean. Untuk metrik lain seperti cosine atau manhattan, gunakan `average` atau `complete`.

### Gaussian Mixture Model

#### Konsep

Mengasumsikan data dihasilkan dari campuran beberapa distribusi Gaussian, dan mengestimasi parameternya dengan algoritma Expectation-Maximization. Berbeda dengan K-Means, keanggotaan klaster bersifat probabilistik.

#### Kapan Digunakan

Ketika dibutuhkan soft clustering, yaitu satu titik boleh sebagian menjadi anggota beberapa klaster, atau ketika klaster berbentuk elips dengan orientasi berbeda. Juga berguna sebagai model densitas untuk deteksi anomali.

#### Jenis Data yang Cocok

Fitur numerik kontinu yang plausibel dimodelkan sebagai campuran Gaussian, dengan jumlah sampel per komponen cukup banyak agar matriks kovarians stabil.

#### Kelemahan dan Batasan

Lebih lambat dari K-Means dan bisa konvergen ke optimum lokal. Pada dimensi tinggi dengan `covariance_type="full"`, jumlah parameter meledak dan estimasi menjadi tidak stabil.

#### Implementasi

```python
from sklearn.mixture import GaussianMixture

kandidat = {}
for k in range(2, 11):
    gmm = GaussianMixture(n_components=k, covariance_type="full",
                          n_init=5, random_state=RANDOM_STATE).fit(X_scaled)
    kandidat[k] = gmm.bic(X_scaled)   # semakin kecil semakin baik

k_terbaik = min(kandidat, key=kandidat.get)
gmm = GaussianMixture(n_components=k_terbaik, random_state=RANDOM_STATE).fit(X_scaled)
proba_klaster = gmm.predict_proba(X_scaled)
```

Kriteria BIC atau AIC memberi cara objektif memilih jumlah komponen, keunggulan yang tidak dimiliki K-Means.

## Algoritma Unsupervised: Reduksi Dimensi

### Principal Component Analysis

#### Konsep

Memproyeksikan data ke arah-arah ortogonal yang menangkap varians terbesar. Bersifat linear dan tidak menggunakan label.

#### Kapan Digunakan

Mengurangi dimensi sebelum melatih model yang lambat pada dimensi tinggi, mengatasi multikolinearitas, mempercepat komputasi, atau memvisualisasikan struktur global data.

#### Jenis Data yang Cocok

Fitur numerik terstandardisasi yang saling berkorelasi. Jika fitur hampir tidak berkorelasi, PCA tidak akan banyak membantu karena varians tersebar merata di semua arah.

#### Kelemahan dan Batasan

Komponen hasil PCA adalah kombinasi linear dari fitur asli, sehingga interpretasinya hilang. PCA juga bisa membuang arah dengan varians kecil yang justru paling diskriminatif untuk klasifikasi, karena label tidak pernah dilihat.

#### Implementasi

```python
from sklearn.decomposition import PCA

pca = PCA(n_components=0.95, svd_solver="full", random_state=RANDOM_STATE)
X_pca = pca.fit_transform(X_scaled)
print("Dimensi:", X_scaled.shape[1], "->", X_pca.shape[1])
print("Varians kumulatif:", np.cumsum(pca.explained_variance_ratio_)[:10])

pipe_pca = Pipeline([
    ("prep", preprocessor_scaled),
    ("pca", PCA(n_components=0.95)),
    ("model", LogisticRegression(max_iter=2000)),
])
```

Menuliskan `n_components=0.95` berarti mempertahankan komponen secukupnya untuk menjelaskan 95 persen varians.

### t-SNE

#### Konsep

Memetakan data ke dua atau tiga dimensi dengan mempertahankan kemiripan lokal antar titik, mengorbankan struktur global.

#### Kapan Digunakan

Khusus untuk visualisasi eksplorasi. Ini bukan alat preprocessing dan hasilnya tidak boleh dijadikan fitur untuk model prediktif.

#### Jenis Data yang Cocok

Data berdimensi tinggi dengan struktur klaster yang ingin dilihat secara visual, misalnya embedding, data ekspresi gen, atau representasi hasil autoencoder.

#### Kelemahan dan Batasan

Tidak punya metode `transform` untuk data baru. Jarak antar klaster pada plot tidak bermakna kuantitatif. Hasilnya berubah tergantung `perplexity` dan seed, sehingga kesimpulan visual harus diverifikasi dengan cara lain.

#### Implementasi

```python
from sklearn.manifold import TSNE

# Reduksi awal dengan PCA disarankan untuk stabilitas dan kecepatan
X_awal = PCA(n_components=50, random_state=RANDOM_STATE).fit_transform(X_scaled)
X_tsne = TSNE(n_components=2, perplexity=30, learning_rate="auto",
              init="pca", random_state=RANDOM_STATE).fit_transform(X_awal)
```

## Algoritma Deteksi Anomali

### Isolation Forest

#### Konsep

Mengisolasi titik dengan pemisahan acak berulang. Anomali terisolasi dengan lebih sedikit pemisahan karena letaknya jauh dari kerumunan, sehingga skor kedalamannya berbeda dari titik normal.

#### Kapan Digunakan

Ketika label anomali sangat sedikit atau tidak ada sama sekali, misalnya deteksi intrusi jaringan, deteksi kecurangan transaksi, atau pemantauan kondisi mesin. Ini pendekatan yang tepat ketika kelas positif terlalu langka untuk dilatih secara supervised.

#### Jenis Data yang Cocok

Data tabular berdimensi menengah sampai tinggi dan berskala besar. Tidak menuntut standardisasi karena berbasis pemisahan ambang.

#### Kelemahan dan Batasan

Membutuhkan estimasi proporsi anomali lewat parameter `contamination`, yang sering hanya bisa ditebak. Hasilnya sulit divalidasi tanpa label.

#### Implementasi

```python
from sklearn.ensemble import IsolationForest

iso = IsolationForest(
    n_estimators=300,
    contamination=0.02,
    max_samples="auto",
    random_state=RANDOM_STATE,
    n_jobs=-1,
)
iso.fit(X_train_normal)

skor = -iso.score_samples(X_test)   # semakin tinggi semakin anomali
prediksi = iso.predict(X_test)      # -1 anomali, 1 normal
```

Jika ada sebagian kecil label yang tersedia, pakai untuk mengatur ambang skor, bukan untuk melatih modelnya.

### One-Class SVM

#### Konsep

Mempelajari batas yang membungkus wilayah data normal di ruang fitur, lalu menandai titik di luar batas sebagai anomali.

#### Kapan Digunakan

Ketika data normal punya struktur kompleks yang tidak bisa dibungkus bentuk sederhana, dan ukuran data cukup kecil untuk ditangani kernel method.

#### Jenis Data yang Cocok

Fitur numerik terstandardisasi dengan jumlah sampel terbatas dan data latih yang benar-benar bersih dari anomali.

#### Kelemahan dan Batasan

Jauh lebih lambat daripada Isolation Forest dan sangat sensitif terhadap `nu` dan `gamma`. Tidak praktis di atas beberapa puluh ribu baris.

#### Implementasi

```python
from sklearn.svm import OneClassSVM

ocsvm = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", OneClassSVM(kernel="rbf", nu=0.02, gamma="scale")),
])
ocsvm.fit(X_train_normal)
prediksi = ocsvm.predict(X_test)
```

## Panduan Pemilihan Cepat

### Tabel Pemetaan Karakteristik Data

| Karakteristik data | Algoritma yang layak dicoba lebih dulu | Yang sebaiknya dihindari |
|---|---|---|
| Tabular, sedang, campuran tipe fitur | HistGradientBoosting, Random Forest | KNN, SVM-RBF |
| Fitur sangat banyak, sampel sedikit | Logistic Regression L1/L2, LinearSVC, Naive Bayes | KNN, Decision Tree dalam, MLP |
| Teks (bag-of-words, TF-IDF) | MultinomialNB, LinearSVC, Logistic Regression | KNN, Random Forest |
| Butuh interpretasi aturan | Decision Tree, model linear | Boosting, MLP, Stacking |
| Kelas sangat tidak seimbang | Model dengan `class_weight` dan tuning ambang | Optimasi berbasis accuracy |
| Batas keputusan non-linear, data kecil | SVM-RBF, KNN | Model linear murni |
| Target kontinu dengan outlier | HuberRegressor, RANSAC | OLS biasa |
| Tanpa label, klaster bulat | K-Means, GMM | DBSCAN |
| Tanpa label, bentuk tidak beraturan | DBSCAN, HDBSCAN | K-Means |
| Anomali sangat langka | Isolation Forest, One-Class SVM | Klasifikasi supervised biasa |
| Latensi inferensi kritis | Logistic Regression, Decision Tree | KNN, Stacking, SVM besar |

### Urutan Kerja yang Disarankan

1. Tetapkan metrik evaluasi berdasarkan biaya kesalahan, sebelum melihat model.
2. Bangun baseline dengan `DummyClassifier` atau `DummyRegressor`.
3. Jalankan model linear (regresi logistik atau Ridge) sebagai pembanding pertama yang serius.
4. Jalankan Random Forest dengan parameter bawaan untuk menguji apakah ada sinyal non-linear.
5. Jika Random Forest jauh lebih baik, lanjutkan ke HistGradientBoosting dengan tuning.
6. Berhenti ketika penambahan kompleksitas tidak lagi memperbaiki metrik target secara berarti.

## Kesalahan Umum yang Menghabiskan Waktu

### Kebocoran Data lewat Preprocessing

Melakukan scaling, imputasi, atau seleksi fitur sebelum split membuat statistik dari data uji bocor ke data latih, sehingga skor validasi menjadi terlalu optimistis. Selalu bungkus seluruh preprocessing dalam `Pipeline` agar transformasi dipelajari ulang di setiap fold.

### Memilih Metrik yang Keliru

Pada dataset dengan 1 persen kelas positif, model yang selalu memprediksi negatif mencapai akurasi 99 persen dan sama sekali tidak berguna. Gunakan recall, F1-macro, atau PR-AUC sesuai biaya kesalahan yang sebenarnya. Untuk kelas yang sangat langka, `average_precision_score` lebih informatif daripada ROC-AUC, karena ROC-AUC dapat terlihat tinggi meski precision-nya buruk.

### Salah Membaca Kepentingan Fitur

Atribut `feature_importances_` pada model pohon bias terhadap fitur kontinu dan berkardinalitas tinggi. `permutation_importance` yang dihitung pada data uji jauh lebih dapat dipercaya, meski lebih mahal secara komputasi.

### Tuning pada Data Uji

Data uji hanya boleh disentuh satu kali di akhir. Semua pemilihan model dan hyperparameter harus dilakukan lewat validasi silang di dalam data latih. Setiap kali data uji dipakai untuk mengambil keputusan, estimasi performanya menjadi bias ke atas.

### Mengabaikan Struktur Temporal atau Kelompok

Jika data punya urutan waktu atau pengamatan berulang dari entitas yang sama, `StratifiedKFold` biasa akan membocorkan informasi antar fold. Gunakan `TimeSeriesSplit` untuk data deret waktu dan `GroupKFold` untuk data dengan pengelompokan entitas.

### Langsung Melompat ke Model Kompleks

Baseline sederhana menetapkan garis dasar. Tanpa itu, tidak ada cara mengetahui apakah gradient boosting benar-benar memberi nilai tambah atau hanya menambah biaya komputasi dan kesulitan pemeliharaan.

## Penutup

Tidak ada algoritma yang unggul di semua situasi. Yang bisa dilakukan adalah mempersempit ruang kandidat dengan cepat berdasarkan bentuk data, ukuran data, kebutuhan interpretasi, dan biaya kesalahan, lalu membandingkan kandidat yang tersisa secara jujur dengan validasi silang dan metrik yang benar-benar mencerminkan tujuan.

Keputusan yang paling menentukan hasil akhir biasanya bukan pemilihan algoritma, melainkan kualitas fitur, kebersihan proses validasi, dan kesesuaian metrik dengan tujuan organisasi. Algoritma hanyalah langkah terakhir dari rangkaian keputusan yang sudah dibuat jauh sebelumnya.