---
sidebar_position: 11
title: 'Object-Oriented Design'
---

## 📌 Pengertian OOD
Object-Oriented Design (OOD) adalah proses merancang sistem perangkat lunak menggunakan prinsip OOP agar:
- Terstruktur
- Fleksibel
- Mudah dikembangkan
- Mudah di-maintain

## 🧱 Prinsip SOLID

SOLID adalah 5 prinsip dasar dalam OOP untuk menghasilkan desain yang baik:

- S: Single Responsibility Principle
- O: Open/Closed Principle
- L: Liskov Substitution Principle
- I: Interface Segregation Principle
- D: Dependency Inversion Principle

### 🔹 1. Single Responsibility Principle (SRP)
Satu class hanya memiliki satu tanggung jawab.

#### ❌ Contoh Salah

```java
class Report {
    public void generateReport() {
        System.out.println("Generate report...");
    }

    public void printReport() {
        System.out.println("Print report...");
    }
}
```

#### ✅ Contoh Benar

```java
class Report {
    void generate() {
        System.out.println("Generate report");
    }
}

class ReportPrinter {
    void print() {
        System.out.println("Print report");
    }
}
```

📌 Output:
```
Generate report
Print report
```

### 🔹 2. Open/Closed Principle (OCP)
Class terbuka untuk ekstensi, tetapi tertutup untuk modifikasi.

```java
interface Shape {
    double area();
}

class Rectangle implements Shape {
    private double width, height;

    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double area() {
        return width * height;
    }
}

class Circle implements Shape {
    private double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    public double area() {
        return Math.PI * radius * radius;
    }
}
```

▶️ Output

```java
Shape shape = new Circle(7);
System.out.println(shape.area());
```

```bash
153.93804002589985
```

### 🔹 3. Liskov Substitution Principle (LSP)

Subclass harus bisa menggantikan superclass tanpa merusak program.

#### ❌ Contoh Salah

```java
class Bird {
    void fly() {
        System.out.println("Flying...");
    }
}

class Ostrich extends Bird {
    void fly() {
        throw new UnsupportedOperationException("Can't fly");
    }
}
```

#### ✅ Perbaikan


```java
class Bird {}

interface Flyable {
    void fly();
}

class Sparrow extends Bird implements Flyable {
    public void fly() {
        System.out.println("Flying...");
    }
}

class Ostrich extends Bird {}
```

### 🔹 4. Interface Segregation Principle (ISP)
Jangan memaksa class mengimplementasikan method yang tidak digunakan.

#### ❌ Contoh Salah


```java
interface Worker {
    void work();
    void eat();
}
```

#### ✅ Perbaikan

```java
interface Workable {
    void work();
}

interface Eatable {
    void eat();
}

class Robot implements Workable {
    public void work() {
        System.out.println("Robot working...");
    }
}
```


### 🔹 5. Dependency Inversion Principle (DIP)
Bergantung pada abstraksi, bukan implementasi.

#### ❌ Contoh Salah

```java
class MySQLDatabase {
    void connect() {
        System.out.println("Connect MySQL");
    }
}

class Application {
    private MySQLDatabase db = new MySQLDatabase();
}
```

#### ✅ Perbaikan

```java
interface Database {
    void connect();
}

class MySQLDatabase implements Database {
    public void connect() {
        System.out.println("Connect MySQL");
    }
}

class Application {
    private Database db;

    Application(Database db) {
        this.db = db;
    }

    void start() {
        db.connect();
    }
}
```

▶️ Output

```java
Application app = new Application(new MySQLDatabase());
app.start();
```

```
Connect MySQL
```

## 📊 UML Diagram Dasar

### 🔹 Class Diagram

Class Diagram menggambarkan:

- Class
- Attribute
- Method
- Relasi antar class

Contoh sederhana:

```
+-------------------+
|     User          |
+-------------------+
| - name: String    |
| - email: String   |
+-------------------+
| + login()         |
| + logout()        |
+-------------------+
```

## 🔧 Studi Kasus Desain Sederhana (Sistem Pembayaran)

### 🎯 Tujuan

Membuat sistem pembayaran dengan berbagai metode (OVO, GoPay, Credit Card)

### 🧩 Desain (Menggunakan SOLID)

#### Interface

```java
interface PaymentMethod {
    void pay(double amount);
}
```

#### Implementasi
```java
class OVO implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Pay with OVO: " + amount);
    }
}

class GoPay implements PaymentMethod {
    public void pay(double amount) {
        System.out.println("Pay with GoPay: " + amount);
    }
}
```

#### Class Utama

```java
class PaymentService {
    private PaymentMethod paymentMethod;

    PaymentService(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    void process(double amount) {
        paymentMethod.pay(amount);
    }
}
```

#### ▶️ Main Program

```java
public class Main {
    public static void main(String[] args) {
        PaymentMethod ovo = new OVO();
        PaymentService service = new PaymentService(ovo);

        service.process(100000);
    }
}
```

#### 📌 Output:

```
Pay with OVO: 100000.0
```


## 🎯 Kesimpulan

OOD dengan prinsip SOLID membantu membuat sistem yang scalable, fleksibel, dan mudah dikembangkan dalam jangka panjang.

## 📥 Tips Penggunaan

- Gunakan interface untuk fleksibilitas
- Hindari tight coupling
- Prioritaskan composition over inheritance
- Gunakan UML sebelum coding
