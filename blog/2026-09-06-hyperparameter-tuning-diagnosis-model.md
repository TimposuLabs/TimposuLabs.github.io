---
slug: hyperparameter-tuning-diagnosis-model
title: "Hyperparameter Tuning dan Diagnosis Model: Panduan Machine Learning untuk Pemula #5"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Anda sudah punya model yang jalan, skornya 0,82. Pertanyaan berikutnya selalu sama: bagaimana cara membuatnya lebih baik?
 
Jawaban yang paling sering terpikir adalah menyetel pengaturan model. Itu memang salah satu jalannya, tapi bukan satu-satunya, dan sering bukan yang paling efektif.
 
Artikel ini membahas dua hal yang saling melengkapi. Pertama, cara menyetel pengaturan model secara sistematis, dari yang paling sederhana sampai yang paling efisien. Kedua, dan ini yang sering dilewati, cara mendiagnosis dulu apa sebenarnya masalahnya, supaya Anda tidak menghabiskan berjam-jam menyetel model padahal masalahnya ada di tempat lain.

<!-- truncate -->
 
## Daftar Isi
 
1. Apa Itu Hyperparameter
2. Sebelum Menyetel: Hal yang Harus Beres Dulu
3. Menyiapkan Data dan Model Contoh
4. Cara Manual dan Kenapa Tidak Cukup
5. GridSearchCV: Mencoba Semua Kombinasi
6. RandomizedSearchCV: Mencoba Sebagian Secara Acak
7. HalvingSearchCV: Strategi Turnamen
8. Optuna: Pencarian yang Belajar dari Percobaan Sebelumnya
9. Diagnosis dengan Learning Curve
10. Diagnosis dengan Validation Curve
11. Alur Kerja Lengkap yang Disarankan
12. Hyperparameter Penting per Algoritma
13. Kesalahan Pemula yang Sering Terjadi
## Apa Itu Hyperparameter
 
### Beda Parameter dan Hyperparameter
 
Ini istilah yang mirip tapi artinya berbeda, dan sering tertukar.
 
**Parameter** adalah hal yang dipelajari model sendiri dari data selama pelatihan. Contohnya koefisien pada regresi linear, atau ambang di setiap cabang pohon keputusan. Anda tidak menentukannya, model yang menemukannya.
 
**Hyperparameter** adalah pengaturan yang Anda tentukan **sebelum** pelatihan dimulai. Contohnya berapa kedalaman maksimal pohon, berapa jumlah tetangga di KNN, atau seberapa kuat regularisasi.
 
### Analogi Sederhana
 
Bayangkan memanggang kue.
 
Suhu oven dan lama memanggang adalah hyperparameter. Anda menentukannya di awal, sebelum kue masuk oven.
 
Warna kecoklatan dan tingkat kematangan kue adalah parameter. Itu hasil dari proses, bukan sesuatu yang Anda setel langsung.
 
Kalau kuenya gosong, Anda tidak bisa memperbaiki warnanya secara langsung. Yang bisa Anda ubah adalah suhu dan waktunya, lalu memanggang ulang. Begitu juga dengan model.
 
### Kenapa Tidak Bisa Ditemukan Otomatis oleh Model
 
Karena hyperparameter menentukan **bagaimana** model belajar, sehingga harus ditetapkan sebelum proses belajar dimulai.
 
Kalau model boleh memilih sendiri, ia akan selalu memilih pengaturan yang membuat skor di data latih paling tinggi. Itu berarti selalu memilih model paling rumit, yang justru menghafal data alih-alih belajar polanya.
 
Karena itu hyperparameter harus dinilai lewat data yang tidak dipakai untuk pelatihan, dan di sinilah validasi silang berperan.
 
### Contoh Hyperparameter yang Umum
 
| Algoritma | Hyperparameter penting | Efeknya |
|---|---|---|
| Decision Tree | `max_depth` | Makin dalam, makin rumit dan mudah menghafal |
| Random Forest | `n_estimators`, `max_features` | Jumlah pohon dan berapa kolom dipertimbangkan |
| Gradient Boosting | `learning_rate`, `max_iter` | Seberapa hati-hati dan berapa lama belajar |
| KNN | `n_neighbors` | Berapa tetangga yang ditanya |
| SVM | `C`, `gamma` | Seberapa ketat dan seberapa berliku batasnya |
| Regresi Logistik | `C` | Seberapa kuat rem terhadap koefisien besar |
 
## Sebelum Menyetel: Hal yang Harus Beres Dulu
 
Menyetel model itu menyenangkan karena terasa produktif. Tapi kalau dilakukan sebelum fondasinya benar, hasilnya sia-sia.
 
### Empat Hal yang Harus Ada Lebih Dulu
 
**Metrik sudah ditentukan.** Anda harus tahu angka apa yang sedang dikejar sebelum mulai mencari. Kalau data Anda timpang, jangan pakai akurasi.
 
**Validasi silang sudah benar.** Kalau strategi pembagian datanya salah, pencarian akan mengoptimalkan angka yang tidak berarti.
 
**Semua persiapan data ada di dalam Pipeline.** Kalau penskalaan dilakukan di luar, setiap kombinasi yang dicoba akan dinilai dengan angka yang sudah tercemar.
 
**Sudah ada patokan pembanding.** Tanpa tahu skor model sederhana tanpa penyetelan, Anda tidak bisa menilai apakah usaha penyetelan itu berbuah.
 
### Peringatan Penting: Tuning Bukan Obat Segalanya
 
Ini yang perlu dipahami sejak awal.
 
Menyetel hyperparameter biasanya hanya menaikkan skor beberapa persen, kadang kurang dari satu persen. Peningkatan besar hampir selalu datang dari sumber lain: data yang lebih banyak, fitur yang lebih baik, atau pembersihan data yang lebih teliti.
 
Urutan prioritas yang masuk akal:
 
1. Perbaiki kualitas data dan pembersihannya
2. Buat fitur baru yang bermakna
3. Ganti jenis algoritma
4. Baru setel hyperparameter
Kalau model Anda skornya 0,60 dan target Anda 0,85, penyetelan hyperparameter tidak akan menutup jarak sebesar itu. Bagian diagnosis di artikel ini akan membantu menentukan langkah mana yang sebenarnya Anda butuhkan.
 
## Menyiapkan Data dan Model Contoh
 
```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
 
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
 
RANDOM_STATE = 42
 
data = load_breast_cancer(as_frame=True)
X, y = data.data, data.target
 
# Pisahkan data uji dan simpan, jangan disentuh sampai akhir
X_kerja, X_uji, y_kerja, y_uji = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=RANDOM_STATE
)
 
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)
 
# Patokan: model tanpa penyetelan sama sekali
patokan = Pipeline([
    ("skala", StandardScaler()),
    ("model", RandomForestClassifier(random_state=RANDOM_STATE)),
])
skor_patokan = cross_val_score(patokan, X_kerja, y_kerja, cv=cv, scoring="f1")
print(f"Patokan tanpa penyetelan: {skor_patokan.mean():.4f} "
      f"(naik-turun {skor_patokan.std():.4f})")
```
 
Simpan angka patokan ini. Semua hasil penyetelan nanti dibandingkan dengan angka ini.
 
## Cara Manual dan Kenapa Tidak Cukup
 
### Cara yang Biasa Dilakukan Pemula
 
Mengubah satu angka, menjalankan ulang, melihat hasilnya, lalu mengubah lagi.
 
```python
for kedalaman in [3, 5, 10, None]:
    pipe = Pipeline([
        ("skala", StandardScaler()),
        ("model", RandomForestClassifier(max_depth=kedalaman,
                                         random_state=RANDOM_STATE)),
    ])
    skor = cross_val_score(pipe, X_kerja, y_kerja, cv=cv, scoring="f1")
    print(f"max_depth={str(kedalaman):5s} -> F1 {skor.mean():.4f}")
```
 
### Tiga Kelemahannya
 
**Melelahkan dan mudah keliru.** Dengan tiga hyperparameter saja, jumlah kombinasinya sudah puluhan.
 
**Tidak menangkap interaksi.** Nilai `max_depth` terbaik bisa berbeda tergantung nilai `min_samples_leaf`. Menyetel satu per satu akan melewatkan kombinasi terbaik.
 
**Sulit diulang.** Beberapa hari kemudian Anda lupa kombinasi mana saja yang sudah dicoba.
 
Karena itu scikit-learn menyediakan alat khusus untuk ini.
 
## GridSearchCV: Mencoba Semua Kombinasi
 
### Cara Kerjanya
 
Anda memberi daftar nilai untuk tiap hyperparameter. `GridSearchCV` mencoba **semua kemungkinan kombinasi**, menilai tiap kombinasi dengan validasi silang, lalu melaporkan yang terbaik.
 
### Analogi
 
Seperti mencoba semua kombinasi menu di restoran: setiap jenis nasi dipasangkan dengan setiap jenis lauk dan setiap jenis minuman. Menyeluruh, tapi kalau pilihannya banyak, Anda akan kekenyangan sebelum selesai.
 
### Contoh Kode
 
```python
from sklearn.model_selection import GridSearchCV
 
pipe = Pipeline([
    ("skala", StandardScaler()),
    ("model", RandomForestClassifier(random_state=RANDOM_STATE)),
])
 
# Perhatikan penulisan: namalangkah__namaparameter, pakai dua garis bawah
ruang_cari = {
    "model__n_estimators": [100, 300],
    "model__max_depth": [3, 5, 10, None],
    "model__min_samples_leaf": [1, 2, 5],
}
 
pencari = GridSearchCV(
    estimator=pipe,
    param_grid=ruang_cari,
    scoring="f1",
    cv=cv,
    n_jobs=-1,          # pakai semua inti prosesor
    verbose=1,
    refit=True,         # setelah selesai, latih ulang dengan parameter terbaik
)
 
pencari.fit(X_kerja, y_kerja)
 
print("Parameter terbaik:", pencari.best_params_)
print(f"Skor terbaik: {pencari.best_score_:.4f}")
print(f"Patokan awal: {skor_patokan.mean():.4f}")
```
 
### Memahami Penulisan Nama Parameter
 
Ini sering membingungkan pemula. Karena model dibungkus dalam `Pipeline`, nama parameternya harus menyebutkan nama langkahnya dulu.
 
Format penulisannya: `namalangkah__namaparameter`, dengan **dua** garis bawah.
 
Jadi `model__max_depth` artinya: parameter `max_depth` milik langkah yang bernama `model`.
 
Kalau Anda tidak yakin nama-nama yang tersedia, tanyakan langsung ke pipeline-nya.
 
```python
print(sorted(pipe.get_params().keys())[:15])
```
 
### Membaca Hasil Lengkapnya
 
`GridSearchCV` menyimpan hasil semua percobaan, bukan cuma yang terbaik. Ini berguna untuk memahami hyperparameter mana yang sebenarnya berpengaruh.
 
```python
hasil = pd.DataFrame(pencari.cv_results_)
 
tampil = hasil[[
    "param_model__n_estimators", "param_model__max_depth",
    "param_model__min_samples_leaf", "mean_test_score", "std_test_score",
]].sort_values("mean_test_score", ascending=False)
 
print(tampil.head(10).to_string(index=False))
```
 
Perhatikan kolom `std_test_score`. Kalau dua kombinasi punya skor rata-rata hampir sama tapi salah satunya jauh lebih stabil, pilih yang lebih stabil meski skornya sedikit lebih rendah.
 
### Masalah Ledakan Kombinasi
 
Ini kelemahan utama GridSearchCV. Jumlah pelatihan tumbuh dengan sangat cepat.
 
```python
jumlah_kombinasi = 2 * 4 * 3            # dari ruang_cari di atas
print("Kombinasi:", jumlah_kombinasi)
print("Total pelatihan model:", jumlah_kombinasi * 5)   # dikali jumlah fold
```
 
Contoh di atas menghasilkan 24 kombinasi dikali 5 fold, yaitu 120 kali pelatihan. Masih wajar.
 
Tapi kalau Anda menambah satu hyperparameter dengan 5 pilihan, jumlahnya jadi 120 kombinasi dan 600 pelatihan. Tambah satu lagi, jadi 3.000 pelatihan. Pertumbuhannya berlipat, bukan bertambah.
 
### Kapan Dipakai
 
Saat jumlah hyperparameter sedikit, di bawah sekitar 4, dan Anda sudah punya perkiraan rentang nilai yang masuk akal.
 
Juga cocok untuk pencarian tahap akhir, ketika Anda sudah tahu wilayah yang bagus dan tinggal menghaluskan pencarian di sekitar situ.
 
## RandomizedSearchCV: Mencoba Sebagian Secara Acak
 
### Cara Kerjanya
 
Alih-alih mencoba semua kombinasi, alat ini mengambil sejumlah kombinasi secara acak dari rentang yang Anda tentukan. Anda yang menentukan berapa banyak percobaan lewat parameter `n_iter`.
 
### Kenapa Acak Justru Sering Lebih Baik
 
Ini terdengar aneh pada awalnya. Kenapa mencoba sebagian secara acak bisa mengalahkan mencoba semuanya?
 
Alasannya, dalam praktik hanya sedikit hyperparameter yang benar-benar berpengaruh besar. Sisanya nyaris tidak berpengaruh.
 
Bayangkan Anda punya 2 hyperparameter, satu sangat penting dan satu tidak penting. Dengan grid 5 kali 5, Anda melakukan 25 percobaan, tapi hanya mencoba **5 nilai berbeda** untuk hyperparameter yang penting itu, karena nilai yang sama diulang lima kali dengan pasangan berbeda.
 
Dengan pencarian acak sebanyak 25 percobaan, Anda mencoba **25 nilai berbeda** untuk hyperparameter penting itu. Peluang menemukan nilai bagus jauh lebih besar dengan jumlah percobaan yang sama.
 
### Memakai Distribusi, Bukan Daftar
 
Keunggulan lain pencarian acak: Anda bisa memberi rentang kontinu, bukan daftar nilai tetap.
 
```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint, uniform, loguniform
 
ruang_acak = {
    "model__n_estimators": randint(100, 800),        # bilangan bulat 100-800
    "model__max_depth": [3, 5, 10, 20, None],        # daftar tetap juga boleh
    "model__min_samples_leaf": randint(1, 20),
    "model__max_features": uniform(0.1, 0.9),        # pecahan 0,1 sampai 1,0
}
 
pencari_acak = RandomizedSearchCV(
    estimator=pipe,
    param_distributions=ruang_acak,
    n_iter=50,                  # jumlah kombinasi yang dicoba
    scoring="f1",
    cv=cv,
    n_jobs=-1,
    random_state=RANDOM_STATE,
    verbose=1,
)
 
pencari_acak.fit(X_kerja, y_kerja)
print("Parameter terbaik:", pencari_acak.best_params_)
print(f"Skor terbaik: {pencari_acak.best_score_:.4f}")
```
 
### Memilih Jenis Distribusi
 
**`randint(a, b)`** untuk bilangan bulat, misalnya jumlah pohon atau jumlah tetangga.
 
**`uniform(a, lebar)`** untuk pecahan dengan peluang merata. Perhatikan bahwa argumen kedua adalah lebar rentang, bukan batas atas. Jadi `uniform(0.1, 0.9)` menghasilkan nilai antara 0,1 dan 1,0.
 
**`loguniform(a, b)`** untuk nilai yang rentangnya melintasi beberapa kelipatan sepuluh, misalnya `C` pada SVM atau `learning_rate`. Distribusi ini memberi peluang yang sama untuk tiap kelipatan, sehingga nilai 0,001 dan 0,01 dan 0,1 sama-sama punya kesempatan.
 
```python
# Contoh untuk parameter yang rentangnya lebar
{"model__C": loguniform(1e-3, 1e3)}
```
 
Kalau Anda memakai `uniform(0.001, 1000)` untuk `C`, hampir semua nilai yang diambil akan besar, dan wilayah nilai kecil nyaris tidak pernah dicoba.
 
### Berapa Nilai n_iter yang Tepat
 
Mulai dari 30 sampai 60 untuk eksplorasi awal. Kalau modelnya cepat dilatih dan Anda punya waktu, naikkan ke 100 atau lebih.
 
Cara praktisnya: jalankan dengan `n_iter=30`, catat hasilnya, lalu jalankan lagi dengan `n_iter=60`. Kalau hasilnya tidak banyak membaik, berarti sudah cukup.
 
### Kapan Dipakai
 
Ini pilihan default yang lebih baik daripada GridSearchCV untuk sebagian besar situasi, terutama saat hyperparameter yang disetel lebih dari tiga atau saat Anda belum tahu rentang nilai yang bagus.
 
Strategi yang umum dipakai: pakai `RandomizedSearchCV` dengan rentang lebar untuk menemukan wilayah yang bagus, lalu pakai `GridSearchCV` dengan rentang sempit di sekitar hasil terbaik untuk menghaluskan.
 
## HalvingSearchCV: Strategi Turnamen
 
### Idenya
 
Bayangkan turnamen sepak bola. Tidak semua tim dimainkan penuh 90 menit di semua pertandingan. Tim yang kalah di babak awal langsung tersingkir, dan sumber daya difokuskan ke tim yang tersisa.
 
`HalvingRandomSearchCV` bekerja begitu. Di babak pertama, banyak kombinasi diuji dengan sedikit data. Yang skornya buruk langsung disingkirkan. Kombinasi yang lolos diuji lagi dengan data lebih banyak, dan seterusnya.
 
Hasilnya, waktu komputasi tidak terbuang untuk menguji kombinasi buruk secara menyeluruh.
 
### Contoh Kode
 
```python
from sklearn.experimental import enable_halving_search_cv   # wajib diimpor dulu
from sklearn.model_selection import HalvingRandomSearchCV
 
pencari_cepat = HalvingRandomSearchCV(
    estimator=pipe,
    param_distributions=ruang_acak,
    factor=3,                # tiap babak, sepertiga kandidat terbaik yang lolos
    scoring="f1",
    cv=cv,
    n_jobs=-1,
    random_state=RANDOM_STATE,
)
 
pencari_cepat.fit(X_kerja, y_kerja)
print("Parameter terbaik:", pencari_cepat.best_params_)
print(f"Skor: {pencari_cepat.best_score_:.4f}")
```
 
### Kapan Dipakai
 
Saat dataset Anda cukup besar sehingga pelatihan terasa lambat. Pada dataset kecil, manfaatnya tidak terasa karena pelatihan sudah cepat.
 
Perhatikan satu risikonya: kombinasi yang sebenarnya bagus bisa saja tersingkir di babak awal karena kebetulan tidak cocok dengan sedikit data yang dipakai di babak itu.
 
## Optuna: Pencarian yang Belajar dari Percobaan Sebelumnya
 
### Kenapa Lebih Efisien
 
GridSearchCV dan RandomizedSearchCV punya satu kesamaan: keduanya **tidak belajar apa pun** dari percobaan sebelumnya. Percobaan ke-50 dipilih dengan cara yang sama persis seperti percobaan pertama.
 
Optuna berbeda. Setelah beberapa percobaan, ia mulai memperkirakan wilayah mana yang menjanjikan, lalu memfokuskan pencarian ke sana.
 
### Analogi
 
Bayangkan mencari harta karun di sebuah pulau.
 
Pencarian grid seperti menggali di setiap titik pada peta kotak-kotak, berurutan, tanpa peduli hasil galian sebelumnya.
 
Pencarian acak seperti menggali di titik-titik acak.
 
Optuna seperti penggali yang memperhatikan: "tiga lubang di sisi utara semuanya menemukan pecahan logam, sementara sisi selatan kosong melompong". Lalu ia menggali lebih banyak di utara.
 
### Memasang Optuna
 
```bash
pip install optuna
```
 
### Tiga Konsep Dasar
 
**Trial** adalah satu percobaan dengan satu kombinasi hyperparameter.
 
**Study** adalah keseluruhan proses pencarian yang berisi banyak trial.
 
**Objective** adalah fungsi yang Anda tulis, berisi cara menilai satu kombinasi. Fungsi ini mengembalikan angka yang ingin dimaksimalkan atau diminimalkan.
 
### Contoh Kode Pertama
 
```python
import optuna
 
optuna.logging.set_verbosity(optuna.logging.WARNING)   # kurangi keluaran
 
def objective(trial):
    # Optuna yang mengusulkan nilai, kita yang menentukan rentangnya
    n_estimators = trial.suggest_int("n_estimators", 100, 800)
    max_depth = trial.suggest_int("max_depth", 2, 30)
    min_samples_leaf = trial.suggest_int("min_samples_leaf", 1, 20)
    max_features = trial.suggest_float("max_features", 0.1, 1.0)
 
    model = Pipeline([
        ("skala", StandardScaler()),
        ("model", RandomForestClassifier(
            n_estimators=n_estimators,
            max_depth=max_depth,
            min_samples_leaf=min_samples_leaf,
            max_features=max_features,
            random_state=RANDOM_STATE,
            n_jobs=-1,
        )),
    ])
 
    skor = cross_val_score(model, X_kerja, y_kerja, cv=cv, scoring="f1")
    return skor.mean()      # angka inilah yang dioptimalkan
 
study = optuna.create_study(
    direction="maximize",                                  # F1 makin tinggi makin baik
    sampler=optuna.samplers.TPESampler(seed=RANDOM_STATE),
)
study.optimize(objective, n_trials=50, show_progress_bar=True)
 
print("Parameter terbaik:", study.best_params)
print(f"Skor terbaik: {study.best_value:.4f}")
```
 
### Jenis Saran Nilai yang Tersedia
 
```python
trial.suggest_int("nama", 1, 100)                    # bilangan bulat
trial.suggest_float("nama", 0.0, 1.0)                # pecahan
trial.suggest_float("nama", 1e-5, 1e-1, log=True)    # pecahan skala logaritma
trial.suggest_categorical("nama", ["gini", "entropy"])  # pilihan dari daftar
```
 
Pakai `log=True` untuk parameter seperti `learning_rate` dan `C`, dengan alasan yang sama seperti `loguniform` tadi.
 
### Keunggulan: Ruang Pencarian Bersyarat
 
Ini yang tidak bisa dilakukan GridSearchCV. Anda bisa membuat pilihan hyperparameter bergantung pada pilihan sebelumnya.
 
```python
def objective_bersyarat(trial):
    jenis = trial.suggest_categorical("jenis", ["rf", "gb"])
 
    if jenis == "rf":
        model_inti = RandomForestClassifier(
            n_estimators=trial.suggest_int("rf_n", 100, 500),
            max_depth=trial.suggest_int("rf_depth", 2, 20),
            random_state=RANDOM_STATE,
        )
    else:
        from sklearn.ensemble import HistGradientBoostingClassifier
        model_inti = HistGradientBoostingClassifier(
            learning_rate=trial.suggest_float("gb_lr", 0.01, 0.3, log=True),
            max_iter=trial.suggest_int("gb_iter", 100, 500),
            random_state=RANDOM_STATE,
        )
 
    model = Pipeline([("skala", StandardScaler()), ("model", model_inti)])
    return cross_val_score(model, X_kerja, y_kerja, cv=cv, scoring="f1").mean()
```
 
Dengan cara ini, Optuna bisa memilih algoritma **dan** menyetel parameternya sekaligus dalam satu pencarian.
 
### Melihat Hyperparameter Mana yang Paling Berpengaruh
 
```python
kepentingan = optuna.importance.get_param_importances(study)
for nama, nilai in kepentingan.items():
    print(f"{nama:20s} {nilai:.4f}")
```
 
Ini informasi yang sangat berguna. Kalau ternyata `n_estimators` hampir tidak berpengaruh, Anda bisa mengunci nilainya dan memfokuskan pencarian berikutnya ke parameter yang benar-benar penting.
 
### Melihat Riwayat Semua Percobaan
 
```python
riwayat = study.trials_dataframe()
print(riwayat[["number", "value", "params_max_depth", "params_n_estimators"]]
      .sort_values("value", ascending=False).head(10).to_string(index=False))
```
 
### Kapan Mulai Memakai Optuna
 
**Belum perlu** kalau hyperparameter yang disetel hanya dua atau tiga, dan pelatihan modelnya cepat. `RandomizedSearchCV` sudah cukup dan lebih sederhana.
 
**Mulai berguna** kalau hyperparameter lebih dari lima, pelatihan makan waktu lama, atau Anda ingin memilih algoritma sekaligus menyetelnya.
 
Saran praktis untuk pemula: kuasai dulu `RandomizedSearchCV` sampai betul-betul paham konsepnya. Optuna adalah alat yang lebih canggih, tapi konsep dasarnya tetap sama.
 
## Diagnosis dengan Learning Curve
 
Sekarang kita masuk ke bagian yang sering dilewati padahal sangat berguna. Sebelum menghabiskan waktu menyetel, cari tahu dulu apa sebenarnya masalah model Anda.
 
### Apa yang Digambarkan
 
Learning curve menjawab satu pertanyaan: **apa yang terjadi kalau data latih ditambah?**
 
Grafiknya menampilkan dua garis:
 
- Skor di data latih, saat jumlah data latih bertambah
- Skor di data validasi, saat jumlah data latih bertambah
### Kenapa Berguna
 
Grafik ini menjawab pertanyaan yang sangat praktis: apakah usaha Anda sebaiknya dipakai untuk mengumpulkan lebih banyak data, atau untuk memperbaiki modelnya?
 
Mengumpulkan data itu mahal. Kalau ternyata tidak akan membantu, lebih baik tahu sejak awal.
 
### Contoh Kode
 
```python
from sklearn.model_selection import learning_curve
 
def gambar_learning_curve(model, X, y, judul):
    ukuran, skor_latih, skor_validasi = learning_curve(
        model, X, y,
        cv=cv,
        scoring="f1",
        train_sizes=np.linspace(0.1, 1.0, 10),
        n_jobs=-1,
        random_state=RANDOM_STATE,
    )
 
    plt.figure(figsize=(7, 4))
    plt.plot(ukuran, skor_latih.mean(axis=1), "o-", label="Skor data latih")
    plt.plot(ukuran, skor_validasi.mean(axis=1), "o-", label="Skor data validasi")
    plt.fill_between(ukuran,
                     skor_validasi.mean(axis=1) - skor_validasi.std(axis=1),
                     skor_validasi.mean(axis=1) + skor_validasi.std(axis=1),
                     alpha=0.15)
    plt.xlabel("Jumlah data latih")
    plt.ylabel("Skor F1")
    plt.title(judul)
    plt.legend()
    plt.grid(alpha=0.3)
    plt.show()
 
    print(f"Skor latih akhir    : {skor_latih.mean(axis=1)[-1]:.4f}")
    print(f"Skor validasi akhir : {skor_validasi.mean(axis=1)[-1]:.4f}")
    print(f"Jarak antar keduanya: {skor_latih.mean(axis=1)[-1] - skor_validasi.mean(axis=1)[-1]:.4f}")
 
# Model terlalu sederhana
gambar_learning_curve(
    Pipeline([("skala", StandardScaler()),
              ("model", DecisionTreeClassifier(max_depth=1, random_state=RANDOM_STATE))]),
    X_kerja, y_kerja, "Model terlalu sederhana"
)
 
# Model terlalu rumit
gambar_learning_curve(
    Pipeline([("skala", StandardScaler()),
              ("model", DecisionTreeClassifier(max_depth=None, random_state=RANDOM_STATE))]),
    X_kerja, y_kerja, "Model terlalu rumit"
)
```
 
### Membaca Tiga Pola Utama
 
#### Pola 1: Underfitting, Model Terlalu Sederhana
 
**Cirinya:** kedua garis rendah dan berdekatan. Keduanya mendatar sejak awal.
 
**Artinya:** model terlalu sederhana untuk menangkap pola dalam data. Menambah data tidak akan membantu, karena masalahnya bukan kekurangan contoh.
 
**Yang harus dilakukan:**
 
- Pakai model yang lebih kuat, misalnya dari regresi logistik ke Random Forest
- Longgarkan pembatasan, misalnya naikkan `max_depth` atau turunkan regularisasi
- Buat fitur baru yang lebih informatif
#### Pola 2: Overfitting, Model Terlalu Rumit
 
**Cirinya:** garis data latih sangat tinggi, hampir sempurna. Garis validasi jauh di bawahnya. Jarak antara keduanya lebar dan tidak menutup.
 
**Artinya:** model menghafal data latih alih-alih belajar polanya.
 
**Yang harus dilakukan:**
 
- Tambah data latih, karena garis validasi biasanya masih naik dan jaraknya akan menyempit
- Batasi kerumitan model, misalnya turunkan `max_depth` atau naikkan `min_samples_leaf`
- Perkuat regularisasi
- Kurangi jumlah fitur
#### Pola 3: Sudah Pas
 
**Cirinya:** kedua garis cukup tinggi dan mendekat satu sama lain. Garis validasi sudah mendatar di ujung kanan.
 
**Artinya:** model sudah menyerap sebagian besar informasi yang tersedia dalam data.
 
**Yang harus dilakukan:** menambah data lagi tidak akan banyak membantu. Kalau ingin lebih baik, perbaiki fiturnya atau ganti pendekatannya.
 
### Pertanyaan Praktis: Perlukah Menambah Data
 
Lihat ujung kanan garis validasi.
 
**Kalau masih menanjak**, artinya menambah data kemungkinan besar masih akan meningkatkan performa. Ini investasi yang sepadan.
 
**Kalau sudah mendatar**, artinya menambah data tidak akan banyak membantu. Fokuskan usaha ke tempat lain.
 
## Diagnosis dengan Validation Curve
 
### Apa Bedanya dengan Learning Curve
 
Learning curve melihat efek **jumlah data**.
 
Validation curve melihat efek **satu hyperparameter tertentu**, dengan jumlah data tetap.
 
### Kenapa Berguna
 
Grafik ini menunjukkan dengan jelas di mana batas antara underfitting dan overfitting untuk satu pengaturan. Anda bisa melihat sendiri titik manisnya, bukan sekadar menerima angka dari hasil pencarian otomatis.
 
### Contoh Kode
 
```python
from sklearn.model_selection import validation_curve
 
rentang = [1, 2, 3, 5, 7, 10, 15, 20, 30]
 
skor_latih, skor_validasi = validation_curve(
    Pipeline([("skala", StandardScaler()),
              ("model", DecisionTreeClassifier(random_state=RANDOM_STATE))]),
    X_kerja, y_kerja,
    param_name="model__max_depth",
    param_range=rentang,
    cv=cv,
    scoring="f1",
    n_jobs=-1,
)
 
plt.figure(figsize=(7, 4))
plt.plot(rentang, skor_latih.mean(axis=1), "o-", label="Skor data latih")
plt.plot(rentang, skor_validasi.mean(axis=1), "o-", label="Skor data validasi")
plt.xlabel("max_depth (kedalaman pohon)")
plt.ylabel("Skor F1")
plt.title("Validation Curve")
plt.legend()
plt.grid(alpha=0.3)
plt.show()
 
terbaik = rentang[int(np.argmax(skor_validasi.mean(axis=1)))]
print("Nilai max_depth terbaik:", terbaik)
```
 
### Cara Membacanya
 
**Di sisi kiri grafik**, kedua garis rendah dan berdekatan. Ini wilayah underfitting. Model terlalu dibatasi.
 
**Di tengah**, garis validasi mencapai puncaknya. Inilah titik manisnya.
 
**Di sisi kanan**, garis latih terus naik mendekati sempurna sementara garis validasi mulai turun. Jarak antara keduanya melebar. Ini wilayah overfitting.
 
Bentuk seperti ini sangat khas dan akan Anda lihat berulang kali pada hyperparameter yang mengatur kerumitan model.
 
### Cara Memilih Nilai dari Grafik
 
Jangan otomatis pilih nilai dengan skor validasi tertinggi. Kalau ada dua nilai dengan skor hampir sama, pilih yang membuat model lebih sederhana.
 
Model yang lebih sederhana lebih cepat, lebih mudah dijelaskan, dan biasanya lebih tahan menghadapi data baru yang sedikit berbeda.
 
### Hyperparameter yang Paling Cocok Digambarkan
 
`max_depth` dan `min_samples_leaf` pada pohon, `C` pada SVM dan regresi logistik, `n_neighbors` pada KNN, serta `alpha` pada Ridge dan Lasso. Semuanya mengatur kerumitan model, sehingga grafiknya informatif.
 
## Alur Kerja Lengkap yang Disarankan
 
Berikut urutan yang masuk akal untuk pemula, dari awal sampai model siap dipakai.
 
**Langkah 1.** Sisihkan data uji di awal dan jangan sentuh sampai akhir.
 
**Langkah 2.** Buat patokan dengan model sederhana tanpa penyetelan apa pun. Catat angkanya.
 
**Langkah 3.** Gambar learning curve. Kalau hasilnya underfitting, ganti model yang lebih kuat atau perbaiki fitur dulu. Penyetelan tidak akan menolong.
 
**Langkah 4.** Gambar validation curve untuk satu atau dua hyperparameter utama, supaya Anda tahu rentang nilai yang masuk akal.
 
**Langkah 5.** Jalankan `RandomizedSearchCV` dengan rentang lebar dan sekitar 50 percobaan.
 
**Langkah 6.** Persempit rentang di sekitar hasil terbaik, lalu jalankan `GridSearchCV` untuk menghaluskan.
 
**Langkah 7.** Bandingkan dengan patokan di langkah 2. Kalau peningkatannya kecil, pertimbangkan apakah kerumitan tambahan itu sepadan.
 
**Langkah 8.** Latih model final dengan parameter terbaik pada seluruh data kerja, lalu ukur sekali di data uji.
 
```python
# Langkah 8
model_final = pencari_acak.best_estimator_
model_final.fit(X_kerja, y_kerja)
 
from sklearn.metrics import classification_report
print(classification_report(y_uji, model_final.predict(X_uji), digits=4))
```
 
### Catatan Penting tentang best_score_
 
Angka `best_score_` dari hasil pencarian adalah **skor terbaik dari puluhan percobaan**, sehingga cenderung terlalu optimistis.
 
Angka yang layak dilaporkan adalah skor di data uji yang Anda sisihkan di langkah 1, atau hasil nested cross-validation.
 
## Hyperparameter Penting per Algoritma
 
Tabel ini bisa dipakai sebagai titik awal saat menyusun ruang pencarian.
 
| Algoritma | Hyperparameter | Rentang awal yang wajar | Efek kalau dinaikkan |
|---|---|---|---|
| Decision Tree | `max_depth` | 2 sampai 30 | Lebih rumit, mudah overfit |
| Decision Tree | `min_samples_leaf` | 1 sampai 50 | Lebih sederhana, tahan overfit |
| Random Forest | `n_estimators` | 100 sampai 800 | Lebih stabil, tapi lebih lambat |
| Random Forest | `max_features` | 0,1 sampai 1,0 | Pohon jadi mirip, keragaman turun |
| Gradient Boosting | `learning_rate` | 0,01 sampai 0,3 (log) | Belajar cepat tapi berisiko lewat |
| Gradient Boosting | `max_iter` | 100 sampai 1000 | Lebih akurat sampai titik tertentu |
| KNN | `n_neighbors` | 1 sampai 50 | Lebih halus, lebih sederhana |
| SVM | `C` | 0,001 sampai 1000 (log) | Lebih ketat, mudah overfit |
| SVM | `gamma` | 0,0001 sampai 10 (log) | Batas lebih berliku |
| Regresi Logistik | `C` | 0,001 sampai 1000 (log) | Rem melemah, model bebas |
| Ridge dan Lasso | `alpha` | 0,001 sampai 100 (log) | Rem menguat, model sederhana |
 
Tanda "(log)" artinya sebaiknya dicari dalam skala logaritma, memakai `loguniform` atau `log=True`.
 
### Aturan Praktis untuk Gradient Boosting
 
Ada hubungan yang perlu diingat: `learning_rate` dan jumlah iterasi bergerak berlawanan.
 
Kalau `learning_rate` diturunkan, jumlah iterasi harus dinaikkan. Kombinasi learning rate kecil dengan banyak iterasi biasanya menghasilkan model yang lebih baik, dengan biaya waktu pelatihan lebih lama.
 
Cara termudah: pakai `learning_rate` kecil, `max_iter` besar, dan aktifkan `early_stopping=True` supaya pelatihan berhenti sendiri saat sudah tidak membaik.
 
## Kesalahan Pemula yang Sering Terjadi
 
### Menyetel Sebelum Fondasinya Beres
 
Kalau data masih kotor, fitur masih seadanya, atau metriknya salah, penyetelan hanya mengoptimalkan hal yang salah. Bereskan itu dulu.
 
### Menyetel Tanpa Pipeline
 
Kalau penskalaan atau pengisian sel kosong dilakukan di luar, setiap kombinasi dinilai dengan angka yang sudah tercemar kebocoran data. Kombinasi yang terpilih pun jadi tidak benar-benar terbaik.
 
### Melaporkan best_score_ sebagai Hasil Akhir
 
Angka itu adalah pemenang dari puluhan undian, jadi cenderung terlalu bagus. Laporkan skor di data uji yang disisihkan.
 
### Memakai Data Uji untuk Menyetel
 
Begitu data uji dipakai untuk memilih parameter, ia berhenti menjadi data uji. Semua penyetelan harus terjadi di dalam data latih lewat validasi silang.
 
### Membuat Ruang Pencarian Terlalu Besar Sejak Awal
 
Grid dengan 5 hyperparameter yang masing-masing punya 5 pilihan menghasilkan 3.125 kombinasi, dikali 5 fold jadi lebih dari 15 ribu pelatihan. Komputer Anda akan sibuk semalaman untuk hasil yang mungkin cuma naik 0,3 persen.
 
Mulai dari 2 sampai 3 hyperparameter yang paling berpengaruh.
 
### Memakai Rentang Linear untuk Parameter Skala Logaritma
 
Untuk `C`, `alpha`, dan `learning_rate`, rentang linear membuat sebagian besar percobaan terkumpul di nilai besar. Pakai `loguniform` atau `log=True`.
 
### Mengejar Peningkatan yang Tidak Berarti
 
Kalau skor naik dari 0,847 menjadi 0,851 sementara naik-turunnya 0,03, peningkatan itu berada di dalam wilayah keacakan. Bukan perbaikan nyata.
 
Selalu bandingkan selisih peningkatan dengan angka standar deviasi validasi silang.
 
### Tidak Pernah Menggambar Learning Curve
 
Ini yang paling disayangkan. Banyak orang menghabiskan berjam-jam menyetel model yang sebenarnya underfitting, padahal grafik sederhana bisa menunjukkan dalam satu menit bahwa masalahnya di tempat lain.
 
## Penutup
 
Menyetel hyperparameter adalah keterampilan yang berguna, tapi manfaatnya sering dilebih-lebihkan oleh pemula. Peningkatan besar hampir selalu datang dari data dan fitur yang lebih baik, bukan dari kombinasi angka yang lebih pas.
 
Tiga hal untuk diingat:
 
**Pertama**, diagnosis dulu sebelum menyetel. Learning curve memberi tahu apakah masalahnya kurang data atau model terlalu sederhana, dan jawaban itu menentukan langkah selanjutnya.
 
**Kedua**, mulai dari `RandomizedSearchCV` dengan rentang lebar, baru persempit dengan `GridSearchCV`. Optuna berguna nanti, saat hyperparameternya banyak dan pelatihannya lama.
 
**Ketiga**, angka dari hasil pencarian selalu lebih optimistis daripada kenyataan. Simpan data uji dari awal, dan pakai sekali di akhir untuk angka yang benar-benar bisa dilaporkan.
 
