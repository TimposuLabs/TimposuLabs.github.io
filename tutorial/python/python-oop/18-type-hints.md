---
sidebar_position: 18
title: "Type Hints"
---

Type Hints atau anotasi tipe adalah fitur Python yang memungkinkan kita mendefinisikan tipe data yang diharapkan untuk variabel, parameter fungsi, dan nilai kembalian (*return value*).

Type hints diperkenalkan sejak Python 3.5. Fitur ini bersifat opsional dan tidak mengubah sifat dasar Python sebagai bahasa pemrograman yang *dynamically typed*.

## 1. Apa Itu Type Hints?

Type hints digunakan untuk menjelaskan tipe data yang diharapkan pada bagian tertentu dari kode.

Manfaat type hints antara lain:

- Membuat kode lebih mudah dibaca (*self-documenting*).
- Membantu IDE dan tools mendeteksi potensi kesalahan sebelum program dijalankan.
- Memberikan fitur *autocomplete* yang lebih akurat di IDE.
- Membantu pengembang memahami cara menggunakan fungsi atau struktur data.

Python tidak otomatis memvalidasi seluruh type hints ketika program dijalankan. Untuk memeriksa konsistensi tipe secara statis, kita dapat menggunakan alat seperti `mypy` atau `pyright`.

## 2. Sintaks Dasar Type Hints

Type hints dapat digunakan pada variabel, parameter fungsi, dan nilai kembalian fungsi.

### Anotasi Variabel

```python
nama: str = "Budi"
umur: int = 25
tinggi: float = 175.5
aktif: bool = True
```

Penjelasan:

- `nama: str` menunjukkan bahwa `nama` diharapkan berisi string.
- `umur: int` menunjukkan bahwa `umur` diharapkan berisi bilangan bulat.
- `tinggi: float` menunjukkan bahwa `tinggi` diharapkan berisi bilangan desimal.
- `aktif: bool` menunjukkan bahwa `aktif` diharapkan berisi nilai `True` atau `False`.

### Anotasi Parameter dan Return Type

```python
def sapa(nama: str) -> str:
    return f"Halo, {nama}!"


def tambah(a: int, b: int) -> int:
    return a + b
```

Pada fungsi `sapa()`, parameter `nama` diharapkan berupa `str` dan hasil fungsi juga berupa `str`.

Pada fungsi `tambah()`, kedua parameter diharapkan berupa `int`, begitu pula nilai yang dikembalikan.

### Fungsi Tanpa Nilai Kembalian

Gunakan `None` sebagai return type ketika fungsi tidak mengembalikan nilai yang bermakna.

```python
def cetak_info(pesan: str) -> None:
    print(pesan)
```

### Contoh Lengkap

Contoh lengkap penggunaan anotasi pada variabel, fungsi dengan nilai kembali, dan fungsi tanpa nilai kembali (`None`):

```python
# Anotasi variabel
nama: str = "Budi"
umur: int = 25
tinggi: float = 175.5
aktif: bool = True

# Anotasi parameter dan return type fungsi
def sapa(nama: str) -> str:
    return f"Halo, {nama}!"

def tambah(a: int, b: int) -> int:
    return a + b

# Fungsi tanpa return value
def cetak_info(pesan: str) -> None:
    print(pesan)
```

## 3. Tipe Data Dasar dan Koleksi

### Tipe Data Dasar

| Tipe | Keterangan |
|---|---|
| `int` | Bilangan bulat |
| `float` | Bilangan desimal |
| `str` | Teks |
| `bool` | Nilai benar atau salah |
| `bytes` | Data dalam bentuk byte |
| `None` | Menyatakan tidak adanya nilai |

### Type Hints untuk Koleksi

Pada Python 3.9 atau lebih baru, tipe koleksi dapat ditulis langsung menggunakan tipe bawaan Python.

```python
nama_mahasiswa: list[str] = ["Andi", "Budi"]
nilai_mahasiswa: dict[str, int] = {"Andi": 90, "Budi": 85}
koordinat: tuple[float, float] = (-0.5, 119.8)
kategori: set[str] = {"Python", "Data Science"}
```

Artinya:

- `list[str]` adalah list yang elemennya diharapkan berupa string.
- `dict[str, int]` adalah dictionary dengan key berupa string dan value berupa integer.
- `tuple[float, float]` adalah tuple yang berisi dua nilai float.
- `set[str]` adalah set yang elemennya diharapkan berupa string.

Pada Python 3.5 hingga 3.8, penulisan generik koleksi umumnya menggunakan tipe dari modul `typing`.

```python
from typing import List, Dict, Tuple, Set

nama_mahasiswa: List[str] = ["Andi", "Budi"]
nilai_mahasiswa: Dict[str, int] = {"Andi": 90, "Budi": 85}
koordinat: Tuple[float, float] = (-0.5, 119.8)
kategori: Set[str] = {"Python", "Data Science"}
```

## 4. Fitur Lanjutan Type Hints

### Optional dan Union

`Union` digunakan ketika suatu nilai dapat memiliki lebih dari satu tipe. Pada Python 3.10 atau lebih baru, kita dapat menggunakan operator `|`.

```python
def proses(data: str | int) -> str:
    return str(data)
```

Parameter `data` pada fungsi tersebut dapat berupa string atau integer.

Untuk menyatakan bahwa nilai dapat berupa tipe tertentu atau `None`, kita dapat menggunakan `Optional` atau operator `| None`.

```python
from typing import Optional


def cari_user(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "Andi"
    return None
```

Bentuk ekuivalen pada Python 3.10 atau lebih baru:

```python
def cari_user(user_id: int) -> str | None:
    if user_id == 1:
        return "Andi"
    return None
```

### Callable

`Callable` digunakan ketika parameter fungsi diharapkan menerima fungsi lain sebagai argumen.

```python
from typing import Callable


def apply_twice(func: Callable[[int], int], value: int) -> int:
    return func(func(value))
```

`Callable[[int], int]` berarti fungsi yang diterima diharapkan memiliki satu parameter bertipe `int` dan menghasilkan nilai bertipe `int`.

Contoh penggunaan:

```python
def tambah_satu(angka: int) -> int:
    return angka + 1


print(apply_twice(tambah_satu, 3))
```

Output:

```text
5
```

### Any

`Any` digunakan ketika suatu nilai dapat memiliki tipe apa pun atau ketika tipe pastinya belum diketahui.

```python
from typing import Any


def proses_apapun(data: Any) -> Any:
    return data
```

Gunakan `Any` secara bijak karena penggunaan berlebihan dapat mengurangi manfaat pemeriksaan tipe.

### Type Aliases

Type alias digunakan untuk memberikan nama yang lebih sederhana pada tipe yang kompleks atau sering digunakan.

```python
from typing import TypeAlias

UserId: TypeAlias = int
Matrix: TypeAlias = list[list[float]]
```

### Generic Types dengan `TypeVar`

`TypeVar` memungkinkan kita membuat fungsi generik yang dapat mempertahankan informasi tipe dari input ke output.

```python
from typing import TypeVar

T = TypeVar("T")


def first_element(items: list[T]) -> T:
    return items[0]
```

Fungsi `first_element()` mengambil elemen pertama dari list. Jika list berisi string, hasilnya bertipe string; jika list berisi integer, hasilnya bertipe integer.

Contoh penggunaan:

```python
angka = first_element([10, 20, 30])
nama = first_element(["Andi", "Budi"])

print(angka)
print(nama)
```

Output:

```text
10
Andi
```

Contoh tersebut mengasumsikan list tidak kosong. Jika list kosong, akses `items[0]` akan menghasilkan `IndexError`.

### Literal Types

`Literal` digunakan untuk membatasi nilai yang diharapkan pada pilihan tertentu.

```python
from typing import Literal


def set_status(status: Literal["active", "inactive", "pending"]) -> None:
    print(f"Status: {status}")
```

Parameter `status` diharapkan hanya berisi salah satu dari tiga nilai yang disebutkan. Type checker dapat memperingatkan jika nilai lain diberikan, tetapi anotasi ini sendiri tidak melakukan validasi runtime.

### TypedDict

`TypedDict` digunakan untuk mendeskripsikan struktur dictionary dengan key tertentu dan tipe nilai yang diharapkan.

```python
from typing import TypedDict


class User(TypedDict):
    nama: str
    umur: int
    email: str
```

Contoh:

```python
user: User = {
    "nama": "Andi",
    "umur": 22,
    "email": "andi@example.com",
}
```

`TypedDict` terutama membantu pemeriksaan tipe statis; definisi ini tidak otomatis memvalidasi dictionary pada runtime.

## 5. Type Hints pada Class dan Dataclasses

### Class Biasa

Type hints dapat digunakan pada atribut dan method di dalam class.

```python
class Produk:
    def __init__(self, nama: str, harga: float) -> None:
        self.nama = nama
        self.harga = harga

    def tampilkan_info(self) -> str:
        return f"{self.nama}: Rp{self.harga}"
```

### Dataclasses

Modul `dataclasses` membantu membuat class yang terutama digunakan untuk menyimpan data. Dengan `@dataclass`, Python dapat menghasilkan beberapa method umum secara otomatis, termasuk `__init__()`.

```python
from dataclasses import dataclass


@dataclass
class Produk:
    nama: str
    harga: float
    stok: int = 0

    def total_nilai(self) -> float:
        return self.harga * self.stok


produk = Produk(nama="Keyboard", harga=250000.0, stok=3)

print(produk)
print(produk.total_nilai())
```

Output:

```text
Produk(nama='Keyboard', harga=250000.0, stok=3)
750000.0
```

Type hints tetap tidak secara otomatis memaksa nilai yang diberikan saat runtime sesuai dengan anotasinya.

## 6. Tools untuk Type Checking

Karena type hints tidak secara otomatis memvalidasi semua tipe ketika program berjalan, kita dapat menggunakan alat pemeriksa tipe (*type checker*).

### mypy

`mypy` adalah alat pemeriksaan tipe statis untuk Python.

Instalasi:

```bash
python -m pip install mypy
```

Jalankan pemeriksaan pada file Python:

```bash
mypy script.py
```

### Pyright dan Pylance

Pyright adalah type checker untuk Python. Pylance mengintegrasikan fitur analisis kode dan pemeriksaan tipe ke dalam Visual Studio Code.

Keduanya dapat membantu menampilkan peringatan tipe, navigasi kode, dan autocomplete saat menulis program.

### pytype

`pytype` adalah alat pemeriksaan tipe Python yang dikembangkan oleh Google. Alat ini menganalisis kode untuk menemukan masalah terkait tipe.

Pilihan alat dapat disesuaikan dengan editor, proyek, dan alur kerja yang digunakan.

## 7. Ringkasan

| Fitur | Kegunaan |
|---|---|
| Anotasi variabel | Menjelaskan tipe yang diharapkan untuk variabel |
| Parameter dan return type | Mendokumentasikan tipe input dan output fungsi |
| `list[str]`, `dict[str, int]` | Memberi anotasi tipe koleksi |
| `Union` atau `|` | Menyatakan beberapa kemungkinan tipe |
| `Optional` atau `| None` | Menyatakan nilai yang dapat berupa `None` |
| `Callable` | Menjelaskan tipe fungsi yang diterima sebagai argumen |
| `Any` | Menyatakan tipe yang tidak dibatasi secara spesifik |
| `TypeAlias` | Memberi nama pada tipe yang digunakan kembali |
| `TypeVar` | Membuat fungsi atau struktur generik |
| `Literal` | Menyatakan pilihan nilai yang spesifik |
| `TypedDict` | Menjelaskan struktur dictionary |
| `dataclass` | Mempermudah pembuatan class penyimpan data |
| `mypy`, `pyright`, `pytype` | Membantu pemeriksaan tipe secara statis |

## 8. Kesimpulan

Type hints membantu membuat kode Python lebih jelas, terstruktur, dan lebih mudah dianalisis oleh IDE maupun type checker.

Type hints dapat diterapkan pada variabel, parameter fungsi, nilai kembalian, koleksi, class, dan struktur data yang lebih kompleks. Walaupun bersifat opsional dan tidak otomatis memvalidasi tipe saat runtime, type hints tetap bermanfaat untuk dokumentasi kode dan mendeteksi potensi kesalahan lebih awal.
