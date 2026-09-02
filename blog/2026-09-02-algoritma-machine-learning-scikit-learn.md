---
slug: algoritma-machine-learning-scikit-learn
title: "Macam-Macam Algoritma dalam Machine Learning: Panduan Praktis dengan Scikit-Learn"
authors: topekox
tags: [manchine learning, data mining, ai, data science]
---

Sebagian besar kegagalan proyek machine learning bukan karena algoritmanya salah pilih, melainkan karena algoritma dipilih sebelum karakteristik datanya dipahami. Artikel ini membalik urutannya: untuk setiap algoritma, pertanyaan pertama yang dijawab adalah *data seperti apa yang cocok*, baru kemudian *bagaimana mengimplementasikannya*.

Semua contoh kode memakai scikit-learn versi 1.3 ke atas dan ditulis dalam gaya `Pipeline` supaya preprocessing tidak bocor ke data uji.

<!-- truncate -->

## Cara Membaca Artikel Ini

Sebelum masuk ke algoritma satu per satu, ada empat pertanyaan yang menentukan hampir seluruh keputusan teknis:

1. **Apakah ada label?** Ada label berarti supervised (klasifikasi atau regresi). Tidak ada label berarti unsupervised (clustering, reduksi dimensi, deteksi anomali).
2. **Berapa rasio jumlah baris terhadap jumlah fitur?** Data lebar (fitur banyak, baris sedikit) menuntut regularisasi kuat dan model linear. Data panjang (baris banyak, fitur sedikit) memberi ruang untuk model non-linear yang kompleks.
3. **Apakah hubungan antar variabel linear?** Jika batas keputusan berbentuk kotak-kotak dan berbasis ambang (threshold), model berbasis pohon menang. Jika hubungannya mulus dan aditif, model linear menang.
4. **Apa biaya kesalahannya?** Jika biaya false negative jauh lebih besar daripada false positive, akurasi bukan metrik yang layak dipakai. Ini menentukan `class_weight`, ambang keputusan, dan metrik evaluasi.

## Fondasi: Struktur Kode yang Dipakai di Seluruh Artikel

Hampir semua algoritma di bawah ini memakai kerangka yang sama. Preprocessing dibungkus dalam `ColumnTransformer`, lalu digabung dengan estimator dalam satu `Pipeline`.

```python
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer, make_column_selector
from sklearn.impute import SimpleImputer
from sklearn.model_selection import StratifiedKFold, train_test_split, cross_validate
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

RANDOM_STATE = 42

# Preprocessing untuk model yang sensitif terhadap skala
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

# Preprocessing untuk model berbasis pohon (tanpa scaling)
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

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)
```

Dua varian preprocessing ini bukan formalitas. Model berbasis jarak dan berbasis gradien (KNN, SVM, regresi logistik, MLP, K-Means, PCA) rusak total jika fitur punya skala berbeda. Model berbasis pohon sama sekali tidak terpengaruh oleh transformasi monoton, sehingga standardisasi hanya membuang waktu komputasi.

## Regresi Linear dan Variannya

**Konsep.** Mencari kombinasi linear dari fitur yang meminimalkan jumlah kuadrat galat. Ridge menambahkan penalti L2 (mengecilkan koefisien), Lasso menambahkan penalti L1 (mengenolkan koefisien), ElasticNet menggabungkan keduanya.

**Kapan dipakai.** Ketika target bersifat kontinu dan yang dibutuhkan bukan hanya prediksi tapi juga interpretasi arah dan besar pengaruh tiap variabel. Ini pilihan default untuk baseline regresi dan untuk konteks yang menuntut pertanggungjawaban (kebijakan, ekonometrika, audit).

**Jenis data yang cocok.** Fitur numerik dengan hubungan yang mendekati linear terhadap target, multikolinearitas rendah sampai sedang, residual yang relatif homoskedastik. Lasso dan ElasticNet unggul pada data lebar dengan banyak fitur tidak relevan (misalnya data ekspresi gen atau fitur teks TF-IDF), karena keduanya melakukan seleksi fitur secara implisit.

**Kelemahan.** Tidak menangkap interaksi atau non-linearitas kecuali ditambahkan manual, sangat sensitif terhadap outlier, dan koefisiennya menyesatkan ketika fitur berkorelasi tinggi.

```python
from sklearn.linear_model import LinearRegression, RidgeCV, LassoCV, ElasticNetCV

ridge = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", RidgeCV(alphas=np.logspace(-3, 3, 25))),
])

lasso = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", LassoCV(alphas=np.logspace(-4, 1, 50), max_iter=10_000,
                      random_state=RANDOM_STATE)),
])

ridge.fit(X_train, y_train)

# Membaca koefisien: hanya bermakna jika fitur sudah distandardisasi
nama_fitur = ridge.named_steps["prep"].get_feature_names_out()
koef = pd.Series(ridge.named_steps["model"].coef_, index=nama_fitur)
print(koef.sort_values(key=abs, ascending=False).head(10))
```

Untuk data dengan outlier berat, ganti dengan `HuberRegressor` atau `RANSACRegressor` yang jauh lebih tahan terhadap pencilan.

## Regresi Logistik

**Konsep.** Model linear yang memetakan kombinasi fitur ke probabilitas melalui fungsi sigmoid (biner) atau softmax (multikelas). Meski namanya regresi, ini algoritma klasifikasi.

**Kapan dipakai.** Sebagai baseline wajib untuk setiap masalah klasifikasi. Juga menjadi pilihan akhir ketika sistem produksi menuntut latensi rendah, ukuran model kecil, dan probabilitas yang terkalibrasi baik tanpa post-processing tambahan.

**Jenis data yang cocok.** Data numerik terstandardisasi dengan batas keputusan yang mendekati linear di ruang fitur. Sangat kuat pada data berdimensi sangat tinggi dan jarang (sparse), misalnya representasi teks bag-of-words, di mana model kompleks justru overfit.

**Kelemahan.** Batas keputusan linear. Untuk pola berbentuk XOR atau melingkar, performanya akan buruk kecuali fitur direkayasa terlebih dahulu.

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
        class_weight="balanced",   # penting saat kelas tidak seimbang
        random_state=RANDOM_STATE,
    )),
])

logreg.fit(X_train, y_train)
proba = logreg.predict_proba(X_test)[:, 1]

print(classification_report(y_test, logreg.predict(X_test), digits=4))
print("PR-AUC:", average_precision_score(y_test, proba))
```

Parameter `class_weight="balanced"` menaikkan bobot kelas minoritas secara otomatis. Pada kasus dengan biaya false negative tinggi (deteksi penipuan, deteksi intrusi jaringan, skrining penyakit), ini biasanya lebih efektif dan lebih murah daripada oversampling.

Untuk data dengan ribuan fitur dan kebutuhan seleksi otomatis, gunakan `penalty="l1"` dengan `solver="liblinear"` atau `solver="saga"`.

## K-Nearest Neighbors (KNN)

**Konsep.** Tidak ada proses pelatihan dalam arti sebenarnya. Prediksi dilakukan dengan mencari *k* tetangga terdekat dari titik uji dan mengambil suara mayoritas (klasifikasi) atau rata-rata (regresi).

**Kapan dipakai.** Dataset kecil sampai sedang dengan batas keputusan yang sangat tidak beraturan, atau ketika dibutuhkan baseline non-parametrik yang cepat dibangun. Juga berguna sebagai komponen sistem rekomendasi berbasis kemiripan.

**Jenis data yang cocok.** Fitur numerik dalam jumlah sedikit (idealnya di bawah 20), sudah distandardisasi, dan padat. Sampel per kelas harus cukup banyak agar tetangga yang ditemukan representatif.

**Kelemahan.** Ini algoritma yang paling cepat runtuh oleh *curse of dimensionality*. Pada dimensi tinggi, semua titik menjadi berjarak hampir sama sehingga konsep "tetangga" kehilangan makna. Biaya prediksi juga tumbuh linear terhadap ukuran data latih, sehingga tidak layak untuk sistem real-time berskala besar.

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

## Naive Bayes

**Konsep.** Menerapkan teorema Bayes dengan asumsi bahwa semua fitur saling bebas jika kelas diketahui. Asumsi ini hampir selalu salah, tetapi modelnya tetap sering bekerja baik.

**Kapan dipakai.** Klasifikasi teks (spam, sentimen, kategorisasi dokumen), dan sebagai baseline yang sangat cepat ketika data latih sangat sedikit. Waktu pelatihan praktis sekali lewat data.

**Jenis data yang cocok.** `MultinomialNB` untuk data cacahan seperti frekuensi kata atau TF-IDF. `BernoulliNB` untuk fitur biner. `GaussianNB` untuk fitur kontinu yang distribusinya mendekati normal per kelas. `CategoricalNB` untuk fitur kategorikal murni.

**Kelemahan.** Probabilitas keluarannya buruk secara kalibrasi (cenderung ekstrem mendekati 0 atau 1), dan performa turun tajam ketika fitur sangat berkorelasi.

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

## Support Vector Machine (SVM)

**Konsep.** Mencari hyperplane yang memaksimalkan margin antar kelas. Dengan kernel trick, data dipetakan ke ruang berdimensi lebih tinggi sehingga batas non-linear di ruang asal menjadi linear di ruang baru.

**Kapan dipakai.** Dataset berukuran kecil sampai menengah (di bawah sekitar 50.000 baris) dengan batas keputusan kompleks dan margin antar kelas yang cukup jelas. Sangat kuat pada data berdimensi tinggi dengan jumlah sampel terbatas, seperti klasifikasi citra sederhana atau data biomedis.

**Jenis data yang cocok.** Fitur numerik terstandardisasi. `LinearSVC` untuk data sparse berdimensi tinggi. `SVC(kernel="rbf")` untuk data padat berdimensi rendah sampai menengah.

**Kelemahan.** Kompleksitas pelatihan `SVC` berada di kisaran kuadratik sampai kubik terhadap jumlah sampel, sehingga tidak praktis untuk data besar. Model juga tidak memberi probabilitas secara langsung; `probability=True` memicu kalibrasi internal yang memperlambat pelatihan berkali lipat. Interpretasinya rendah.

```python
from sklearn.svm import SVC, LinearSVC

svm_rbf = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", SVC(kernel="rbf", C=10, gamma="scale",
                  class_weight="balanced", random_state=RANDOM_STATE)),
])

# Untuk data besar dan sparse (misalnya TF-IDF)
svm_linear = Pipeline([
    ("prep", preprocessor_scaled),
    ("model", LinearSVC(C=1.0, class_weight="balanced", dual="auto",
                        max_iter=5000, random_state=RANDOM_STATE)),
])
```

`C` mengendalikan trade-off antara margin lebar dan kesalahan klasifikasi. Nilai `C` besar membuat model lebih ketat dan berisiko overfit.

## Decision Tree

**Konsep.** Membagi ruang fitur secara rekursif dengan aturan ambang tunggal per node, memilih pemisahan yang paling menurunkan impurity (Gini atau entropi).

**Kapan dipakai.** Ketika interpretasi menjadi kebutuhan utama dan aturan keputusan harus bisa dibaca manusia atau diterjemahkan menjadi prosedur operasional. Juga menjadi blok dasar bagi semua metode ensemble berbasis pohon.

**Jenis data yang cocok.** Campuran fitur numerik dan kategorikal, tidak sensitif terhadap skala, toleran terhadap outlier, dan mampu menangkap interaksi antar fitur tanpa spesifikasi manual.

**Kelemahan.** Varians tinggi. Perubahan kecil pada data latih dapat menghasilkan struktur pohon yang sangat berbeda. Pohon tunggal tanpa pembatasan kedalaman hampir pasti overfit.

```python
from sklearn.tree import DecisionTreeClassifier, export_text

tree = Pipeline([
    ("prep", preprocessor_tree),
    ("model", DecisionTreeClassifier(
        criterion="gini",
        max_depth=8,
        min_samples_leaf=20,
        ccp_alpha=0.0,            # pruning berbasis cost-complexity
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

Cara paling bersih mengendalikan kompleksitas adalah cost-complexity pruning. Ambil jalur alpha dengan `cost_complexity_pruning_path()`, lalu pilih `ccp_alpha` terbaik melalui validasi silang.

## Random Forest

**Konsep.** Membangun banyak pohon pada sampel bootstrap yang berbeda, dan pada setiap pemisahan hanya mempertimbangkan subset fitur secara acak. Prediksi akhir adalah agregasi dari seluruh pohon. Dekorelasi antar pohon inilah yang menurunkan varians.

**Kapan dipakai.** Ini default terbaik untuk data tabular ketika waktu tuning terbatas. Performanya kuat dengan hyperparameter bawaan, sulit dibuat overfit parah, dan berjalan paralel dengan baik.

**Jenis data yang cocok.** Data tabular berukuran sedang sampai besar, campuran tipe fitur, dengan interaksi non-linear. Tahan terhadap fitur tidak relevan dan skala yang berbeda-beda.

**Kelemahan.** Ukuran model besar dan lambat saat inferensi jika jumlah pohon banyak. Tidak mampu melakukan ekstrapolasi di luar rentang nilai target yang pernah dilihat, sehingga lemah untuk regresi dengan tren. Ukuran kepentingan fitur berbasis impurity juga bias terhadap fitur berkardinalitas tinggi.

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

# Gunakan permutation importance, bukan feature_importances_ bawaan
hasil = permutation_importance(rf, X_test, y_test, n_repeats=10,
                               scoring="f1_macro", random_state=RANDOM_STATE, n_jobs=-1)
peringkat = pd.Series(hasil.importances_mean, index=X_test.columns)
print(peringkat.sort_values(ascending=False).head(10))
```

## Gradient Boosting dan HistGradientBoosting

**Konsep.** Pohon dibangun secara berurutan, masing-masing memperbaiki residual atau gradien galat dari model sebelumnya. Berbeda dengan Random Forest yang menurunkan varians, boosting menurunkan bias.

**Kapan dipakai.** Ketika akurasi maksimal pada data tabular menjadi tujuan dan tersedia waktu untuk tuning. Pada sebagian besar kompetisi dan benchmark data tabular, gradient boosting mengungguli Random Forest maupun jaringan saraf.

**Jenis data yang cocok.** Sama seperti Random Forest, tetapi hasilnya lebih baik ketika sinyalnya halus dan dataset cukup besar. `HistGradientBoostingClassifier` menangani nilai hilang secara native dan melakukan binning histogram, sehingga jauh lebih cepat pada data dengan puluhan ribu baris ke atas.

**Kelemahan.** Lebih sensitif terhadap hyperparameter dibandingkan Random Forest, terutama `learning_rate` dan jumlah iterasi. Pelatihan bersifat sekuensial sehingga tidak bisa diparalelkan sepenuhnya. Rentan overfit pada data berisik jika early stopping tidak dipakai.

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

Aturan praktis untuk tuning: turunkan `learning_rate`, naikkan `max_iter`, dan biarkan early stopping menentukan titik berhenti.

## Multi-Layer Perceptron

**Konsep.** Jaringan saraf feed-forward dengan satu atau lebih lapisan tersembunyi, dilatih dengan backpropagation.

**Kapan dipakai.** Ketika hubungan antara fitur dan target sangat non-linear dan data cukup besar. Pada data tabular, MLP jarang mengalahkan gradient boosting, sehingga pemakaiannya lebih sering dibenarkan pada data tidak terstruktur atau embedding.

**Jenis data yang cocok.** Fitur numerik terstandardisasi, jumlah sampel besar (puluhan ribu ke atas), dan sinyal yang benar-benar non-linear.

**Kelemahan.** Membutuhkan tuning arsitektur dan learning rate, tidak interpretable, sensitif terhadap inisialisasi, dan `MLPClassifier` scikit-learn tidak mendukung GPU. Untuk kebutuhan deep learning serius, pindah ke PyTorch atau TensorFlow.

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

Perhatikan bahwa `MLPClassifier` tidak punya parameter `class_weight`. Untuk data tidak seimbang, tangani lewat resampling atau penyesuaian ambang keputusan.

## K-Means

**Konsep.** Membagi data menjadi *k* klaster dengan meminimalkan jumlah kuadrat jarak setiap titik ke centroid klasternya.

**Kapan dipakai.** Segmentasi pelanggan, kompresi warna, kuantisasi vektor, dan pembuatan fitur baru dari data tanpa label. Cepat dan mudah diskalakan.

**Jenis data yang cocok.** Fitur numerik terstandardisasi, klaster yang berbentuk relatif bulat dengan ukuran dan kepadatan setara, serta jumlah klaster yang bisa diperkirakan dari domain.

**Kelemahan.** Jumlah klaster harus ditentukan di awal. Asumsi bentuk bulat membuatnya gagal pada klaster memanjang atau melengkung. Sangat sensitif terhadap outlier dan skala fitur.

```python
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X_scaled = preprocessor_scaled.fit_transform(X)

skor = {}
for k in range(2, 11):
    km = KMeans(n_clusters=k, n_init="auto", random_state=RANDOM_STATE)
    label = km.fit_predict(X_scaled)
    skor[k] = silhouette_score(X_scaled, label)

for k, s in skor.items():
    print(f"k={k}  silhouette={s:.4f}  inertia dievaluasi terpisah")
```

Metode elbow pada inertia sering ambigu. Silhouette score dan Davies-Bouldin index memberi sinyal yang lebih tegas. Untuk data sangat besar, gunakan `MiniBatchKMeans`.

## DBSCAN

**Konsep.** Mengelompokkan titik berdasarkan kepadatan. Titik yang punya cukup banyak tetangga dalam radius `eps` menjadi inti klaster; titik yang tidak masuk klaster mana pun diberi label -1 sebagai noise.

**Kapan dipakai.** Ketika bentuk klaster tidak beraturan, jumlah klaster tidak diketahui, dan data mengandung outlier yang justru ingin diidentifikasi. Cocok untuk data spasial dan deteksi pola geografis.

**Jenis data yang cocok.** Fitur numerik berdimensi rendah sampai menengah dengan perbedaan kepadatan yang jelas antara klaster dan latar belakang.

**Kelemahan.** Sangat sensitif terhadap `eps`. Gagal ketika klaster punya kepadatan yang sangat berbeda-beda. Performanya menurun pada dimensi tinggi karena jarak kehilangan daya diskriminasi.

```python
from sklearn.cluster import DBSCAN
from sklearn.neighbors import NearestNeighbors

# Menentukan eps lewat grafik k-distance
k = 5
jarak, _ = NearestNeighbors(n_neighbors=k).fit(X_scaled).kneighbors(X_scaled)
k_dist = np.sort(jarak[:, k - 1])
# Titik siku pada kurva k_dist adalah kandidat eps

db = DBSCAN(eps=0.8, min_samples=10, n_jobs=-1)
label = db.fit_predict(X_scaled)
print("Jumlah klaster:", len(set(label)) - (1 if -1 in label else 0))
print("Proporsi noise:", np.mean(label == -1))
```

Jika kepadatan antar klaster bervariasi, gunakan `HDBSCAN` yang sudah tersedia di scikit-learn sejak versi 1.3.

## Agglomerative Clustering

**Konsep.** Clustering hierarkis bottom-up. Setiap titik dimulai sebagai klaster sendiri, lalu pasangan klaster terdekat digabung berulang kali hingga terbentuk struktur pohon (dendrogram).

**Kapan dipakai.** Ketika struktur hierarki antar kelompok punya makna substantif, misalnya taksonomi produk, pengelompokan dokumen, atau analisis filogenetik. Dendrogram memungkinkan pemilihan jumlah klaster setelah melihat strukturnya.

**Jenis data yang cocok.** Dataset kecil sampai menengah (kompleksitasnya kuadratik terhadap jumlah sampel), dengan metrik jarak yang bermakna secara domain.

**Kelemahan.** Tidak skalabel untuk data besar dan penggabungan bersifat final, tidak bisa dikoreksi di iterasi berikutnya.

```python
from sklearn.cluster import AgglomerativeClustering

agg = AgglomerativeClustering(n_clusters=None, distance_threshold=15.0,
                              linkage="ward", metric="euclidean")
label = agg.fit_predict(X_scaled)
```

Linkage `ward` hanya bekerja dengan metrik Euclidean. Untuk metrik lain (cosine, manhattan), gunakan `average` atau `complete`.

## Gaussian Mixture Model

**Konsep.** Mengasumsikan data dihasilkan dari campuran beberapa distribusi Gaussian, dan mengestimasi parameternya dengan algoritma Expectation-Maximization. Berbeda dengan K-Means, keanggotaan klaster bersifat probabilistik.

**Kapan dipakai.** Ketika dibutuhkan soft clustering (satu titik boleh sebagian milik beberapa klaster), atau ketika klaster berbentuk elips dengan orientasi berbeda. Juga berguna sebagai model densitas untuk deteksi anomali.

**Jenis data yang cocok.** Fitur numerik kontinu yang plausibel dimodelkan sebagai campuran Gaussian.

**Kelemahan.** Lebih lambat dari K-Means, bisa konvergen ke optimum lokal, dan membutuhkan cukup banyak sampel per komponen agar matriks kovarians stabil.

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

## Principal Component Analysis

**Konsep.** Memproyeksikan data ke arah-arah ortogonal yang menangkap varians terbesar. Bersifat linear dan tidak menggunakan label.

**Kapan dipakai.** Mengurangi dimensi sebelum melatih model yang lambat pada dimensi tinggi, mengatasi multikolinearitas, mempercepat komputasi, atau memvisualisasikan struktur global data.

**Jenis data yang cocok.** Fitur numerik terstandardisasi yang saling berkorelasi. Jika fitur hampir tidak berkorelasi, PCA tidak akan banyak membantu.

**Kelemahan.** Komponen hasil PCA adalah kombinasi linear dari fitur asli, sehingga interpretasinya hilang. PCA juga bisa membuang arah dengan varians kecil yang justru paling diskriminatif untuk klasifikasi.

```python
from sklearn.decomposition import PCA

pca = PCA(n_components=0.95, svd_solver="full", random_state=RANDOM_STATE)
X_pca = pca.fit_transform(X_scaled)
print("Dimensi:", X_scaled.shape[1], "->", X_pca.shape[1])
print("Varians kumulatif:", np.cumsum(pca.explained_variance_ratio_)[:10])

# PCA sebagai langkah dalam pipeline
pipe_pca = Pipeline([
    ("prep", preprocessor_scaled),
    ("pca", PCA(n_components=0.95)),
    ("model", LogisticRegression(max_iter=2000)),
])
```

Menuliskan `n_components=0.95` berarti mempertahankan komponen secukupnya untuk menjelaskan 95 persen varians.

## t-SNE dan Reduksi Dimensi Non-Linear

**Konsep.** t-SNE memetakan data ke dua atau tiga dimensi dengan mempertahankan kemiripan lokal antar titik.

**Kapan dipakai.** Khusus untuk visualisasi eksplorasi. Ini bukan alat preprocessing.

**Jenis data yang cocok.** Data berdimensi tinggi dengan struktur klaster yang ingin dilihat secara visual, misalnya embedding, data ekspresi gen, atau representasi hasil autoencoder.

**Kelemahan.** Tidak punya metode `transform` untuk data baru, jarak antar klaster pada plot tidak bermakna kuantitatif, dan hasilnya berubah tergantung `perplexity` serta seed. Jangan pernah memasukkan hasil t-SNE sebagai fitur ke model prediktif.

```python
from sklearn.manifold import TSNE

# Reduksi awal dengan PCA sangat disarankan untuk stabilitas dan kecepatan
X_awal = PCA(n_components=50, random_state=RANDOM_STATE).fit_transform(X_scaled)
X_tsne = TSNE(n_components=2, perplexity=30, learning_rate="auto",
              init="pca", random_state=RANDOM_STATE).fit_transform(X_awal)
```

## Deteksi Anomali: Isolation Forest dan One-Class SVM

**Konsep.** Isolation Forest mengisolasi titik dengan pemisahan acak; anomali terisolasi dengan lebih sedikit pemisahan sehingga skornya berbeda. One-Class SVM mempelajari batas yang membungkus data normal.

**Kapan dipakai.** Ketika label anomali sangat sedikit atau tidak ada sama sekali, misalnya deteksi intrusi jaringan, deteksi kecurangan transaksi, atau pemantauan kondisi mesin. Ini pendekatan yang tepat ketika kelas positif terlalu langka untuk dilatih secara supervised.

**Jenis data yang cocok.** Isolation Forest bekerja baik pada data tabular berdimensi menengah sampai tinggi dan berskala besar. One-Class SVM lebih cocok untuk data kecil dengan batas normal yang kompleks, tetapi jauh lebih lambat.

**Kelemahan.** Keduanya membutuhkan estimasi proporsi anomali (`contamination`) yang sering hanya bisa ditebak. Hasilnya juga sulit divalidasi tanpa label.

```python
from sklearn.ensemble import IsolationForest

iso = IsolationForest(
    n_estimators=300,
    contamination=0.02,       # perkiraan proporsi anomali
    max_samples="auto",
    random_state=RANDOM_STATE,
    n_jobs=-1,
)
iso.fit(X_train_normal)

skor = -iso.score_samples(X_test)      # semakin tinggi semakin anomali
prediksi = iso.predict(X_test)         # -1 anomali, 1 normal
```

Jika ada sebagian kecil label yang tersedia, pakai untuk mengatur ambang skor, bukan untuk melatih modelnya.

## Ensemble Lanjutan: Voting dan Stacking

**Konsep.** Voting menggabungkan prediksi beberapa model melalui suara mayoritas (hard) atau rata-rata probabilitas (soft). Stacking melatih meta-model di atas prediksi model-model dasar.

**Kapan dipakai.** Pada tahap akhir ketika beberapa model dengan karakteristik berbeda punya performa setara tetapi membuat kesalahan pada sampel yang berbeda. Semakin rendah korelasi galat antar model dasar, semakin besar keuntungannya.

**Jenis data yang cocok.** Sama seperti model dasarnya. Yang penting adalah keberagaman model, bukan jumlahnya.

**Kelemahan.** Biaya pelatihan dan inferensi berlipat, interpretasi makin jauh, dan keuntungan performanya sering hanya sepersekian persen. Pertimbangkan biaya operasionalnya sebelum dipakai di produksi.

```python
from sklearn.ensemble import StackingClassifier, VotingClassifier

estimators = [
    ("logreg", logreg),
    ("rf", rf),
    ("hgb", Pipeline([("prep", preprocessor_tree),
                      ("model", HistGradientBoostingClassifier(random_state=RANDOM_STATE))])),
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

## Tabel Ringkas Pemilihan Algoritma

| Karakteristik data | Algoritma yang layak dicoba lebih dulu | Yang sebaiknya dihindari |
|---|---|---|
| Tabular, sedang, campuran tipe fitur | HistGradientBoosting, Random Forest | KNN, SVM-RBF |
| Fitur sangat banyak, sampel sedikit | Logistic Regression L1/L2, LinearSVC, Naive Bayes | KNN, Decision Tree dalam, MLP |
| Teks (bag-of-words, TF-IDF) | MultinomialNB, LinearSVC, Logistic Regression | KNN, Random Forest |
| Butuh interpretasi aturan | Decision Tree, model linear | Boosting, MLP, Stacking |
| Kelas sangat tidak seimbang | Model dengan `class_weight` + tuning ambang | Optimasi berbasis accuracy |
| Batas keputusan sangat non-linear, data kecil | SVM-RBF, KNN | Model linear |
| Tanpa label, klaster bulat | K-Means, GMM | DBSCAN |
| Tanpa label, bentuk tidak beraturan + outlier | DBSCAN, HDBSCAN | K-Means |
| Anomali sangat langka | Isolation Forest, One-Class SVM | Klasifikasi supervised biasa |
| Latensi inferensi kritis | Logistic Regression, Decision Tree | KNN, Stacking, SVM besar |

## Kesalahan Umum yang Menghabiskan Waktu

**Melakukan scaling atau imputasi sebelum split.** Statistik dari data uji bocor ke data latih dan skor validasi menjadi terlalu optimistis. Selalu bungkus preprocessing dalam `Pipeline`.

**Memakai accuracy pada data tidak seimbang.** Pada dataset dengan 1 persen kelas positif, model yang selalu memprediksi negatif mencapai akurasi 99 persen dan sama sekali tidak berguna. Gunakan recall, F1-macro, atau PR-AUC sesuai biaya kesalahan yang sebenarnya. Untuk kelas yang sangat langka, PR-AUC (`average_precision_score`) lebih informatif daripada ROC-AUC karena ROC-AUC dapat terlihat tinggi meski precision-nya buruk.

**Mengandalkan `feature_importances_` bawaan model pohon.** Ukuran ini bias terhadap fitur kontinu dan berkardinalitas tinggi. `permutation_importance` pada data uji jauh lebih dapat dipercaya.

**Tuning hyperparameter pada data uji.** Data uji hanya boleh disentuh satu kali di akhir. Gunakan validasi silang di dalam data latih untuk semua pemilihan model.

**Langsung melompat ke model kompleks.** Baseline sederhana (`DummyClassifier`, regresi logistik) menetapkan garis dasar. Tanpa itu, tidak ada cara mengetahui apakah gradient boosting benar-benar memberi nilai tambah.

**Mengabaikan struktur temporal atau kelompok.** Jika data punya urutan waktu atau pengamatan berulang dari entitas yang sama, `StratifiedKFold` biasa akan membocorkan informasi. Gunakan `TimeSeriesSplit` atau `GroupKFold`.

## Penutup

Tidak ada algoritma yang unggul di semua situasi. Yang bisa dilakukan adalah mempersempit ruang kandidat dengan cepat berdasarkan bentuk data, ukuran data, kebutuhan interpretasi, dan biaya kesalahan, lalu membandingkan kandidat yang tersisa secara jujur dengan validasi silang dan metrik yang benar-benar mencerminkan tujuan.

Urutan kerja yang hampir selalu efisien untuk data tabular: mulai dari baseline dummy, lalu regresi logistik atau linear, lalu Random Forest, lalu HistGradientBoosting dengan tuning. Berhenti ketika penambahan kompleksitas tidak lagi memberi perbaikan yang berarti terhadap metrik yang menjadi target.