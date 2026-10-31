# 🌸 SakuraCycle — Web App Manajemen dan Bank Sampah Desa

SakuraCycle merupakan project backend REST API untuk mendukung pengelolaan Bank Sampah Sakura. Aplikasi ini berfokus pada pencatatan data nasabah, jenis sampah, serta transaksi setoran sampah menggunakan database PostgreSQL.

## 📌 Ringkasan Proyek

- **Project Name:** SakuraCycle
- **Group:** EcoSakura
- **Program:** Celerates Mini Project
- **Project Type:** Backend REST API
- **Database:** PostgreSQL

## 🎯 Studi Kasus

Pengelola Bank Sampah Sakura membutuhkan sistem pencatatan setoran sampah yang lebih terstruktur agar data nasabah dan hasil penimbangan dapat disimpan serta ditelusuri dengan lebih mudah.

SakuraCycle dikembangkan sebagai solusi backend untuk membantu pengelolaan data nasabah, jenis sampah, dan transaksi setoran dalam satu database terpusat.

## 💡 Fitur

- Mengelola data nasabah (Create, Read, Update, Delete).
- Menampilkan daftar jenis sampah dan harga per kilogram.
- Mencatat transaksi setoran sampah.
- Menampilkan seluruh riwayat transaksi setoran.
- Menampilkan detail transaksi beserta berat dan subtotal.
- Menghitung subtotal setoran berdasarkan berat dan harga sampah.

## 🛠️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- node-postgres (`pg`)
- CORS
- dotenv
- Nodemon
- Postman

## 📁 Struktur Proyek

```text
sakuracycle-backend/
├── docs/
│   └── screenshots/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── nasabahController.js
│   │   ├── jenisSampahController.js
│   │   └── setoranController.js
│   ├── models/
│   │   ├── nasabahModel.js
│   │   ├── jenisSampahModel.js
│   │   └── setoranModel.js
│   ├── routes/
│   │   ├── nasabahRoutes.js
│   │   ├── jenisSampahRoutes.js
│   │   └── setoranRoutes.js
│   └── app.js
├── .env.example
├── .gitignore
├── database.sql
├── package.json
├── package-lock.json
└── README.md
```

## 🗄️ Desain Database

SakuraCycle menggunakan PostgreSQL dengan empat tabel utama:

1. **nasabah** — menyimpan data nasabah.
2. **jenis_sampah** — menyimpan jenis sampah dan harga per kilogram.
3. **setoran** — menyimpan transaksi setoran nasabah.
4. **detail_setoran** — menyimpan rincian jenis sampah, berat, harga, dan subtotal setiap transaksi.

### Entity Relationship Diagram (ERD)

[View SakuraCycle Database Diagram on dbdiagram.io](https://dbdiagram.io/d/SakuraCycle-—-Manajemen-Setoran-Sampah-6ae5645ff99a5c458bc19540)

## 🚀 Instalasi & Setup

### Requirements

- Node.js
- npm
- PostgreSQL

### 1. Clone Repository

```bash
git clone <URL_GITHUB_REPOSITORY>
```

### 2. Masuk ke Folder Project

```bash
cd sakuracycle-backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Buat Database

Buat database PostgreSQL dengan nama:

```text
sakuracycle_db
```

Jalankan file `database.sql` pada database tersebut untuk membuat tabel dan relasinya.

### 5. Konfigurasi Environment

Salin `.env.example` menjadi `.env`, lalu sesuaikan konfigurasi PostgreSQL:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sakuracycle_db
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
```

**Penting:** Jangan mengunggah file `.env` yang berisi password asli ke GitHub.

### 6. Jalankan Server

```bash
npm run dev
```

Server berjalan di:

```text
http://localhost:3000
```

## 🔗 Dokumentasi API

Base URL:

```text
http://localhost:3000
```

### 1. Nasabah

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/nasabah` | Mengambil seluruh data nasabah |
| GET | `/api/nasabah/:id` | Mengambil detail nasabah |
| POST | `/api/nasabah` | Menambahkan nasabah |
| PUT | `/api/nasabah/:id` | Mengubah data nasabah |
| DELETE | `/api/nasabah/:id` | Menghapus nasabah |

### 2. Jenis Sampah

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jenis-sampah` | Mengambil seluruh jenis sampah |
| GET | `/api/jenis-sampah/:id` | Mengambil detail jenis sampah |

### 3. Setoran

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/setoran` | Mengambil seluruh transaksi setoran |
| GET | `/api/setoran/:id` | Mengambil detail transaksi setoran |
| POST | `/api/setoran` | Membuat transaksi setoran baru |

## 🧪 Pengujian API

Pengujian REST API dilakukan menggunakan Postman untuk memastikan setiap endpoint dapat berjalan sesuai fungsinya.

### 1. Nasabah

**GET — Mengambil Seluruh Data Nasabah**

![GET All Nasabah](docs/screenshots/GET-Mengambil%20Seluruh%20Data%20Nasabah.png)

**GET — Mengambil Detail Nasabah**

![GET Nasabah By ID](docs/screenshots/GET-Mengambil%20Detail%20Nasabah.png)

**POST — Menambahkan Nasabah**

![POST Nasabah](docs/screenshots/POST-Menambahkan%20Nasabah.png)

**PUT — Mengubah Data Nasabah**

![PUT Nasabah](docs/screenshots/PUT-Mengubah%20Data%20Nasabah.png)

**DELETE — Menghapus Data Nasabah**

![DELETE Nasabah](docs/screenshots/DELETE-Menghapus%20Nasabah.png)

### 2. Jenis Sampah

**GET — Mengambil Seluruh Jenis Sampah**

![GET All Jenis Sampah](docs/screenshots/GET-Mengambil%20Seluruh%20Jenis%20Sampah.png)

**GET — Mengambil Detail Jenis Sampah**

![GET Jenis Sampah By ID](docs/screenshots/GET-Mengambil%20Detail%20Jenis%20Sampah.png)

### 3. Setoran

**GET — Mengambil Seluruh Transaksi Setoran**

![GET All Setoran](docs/screenshots/GET-Mengambil%20Seluruh%20Transaksi%20Setoran.png)

**GET — Mengambil Detail Transaksi Setoran**

![GET Setoran By ID](docs/screenshots/GET-Mengambil%20Detail%20Transaksi%20Setoran%20ID.png)

**POST — Membuat Transaksi Setoran**

![POST Setoran](docs/screenshots/POST-Membuat%20Transaksi%20Setoran.png)

## 📍 Project Information

**Nama Proyek:** SakuraCycle  
**Nama Kelompok:** EcoSakura  
**Program:** Celerates Mini Project

**Lokasi Bank Sampah Sakura:**  
[Google Maps — Bank Sampah Sakura](https://maps.app.goo.gl/VVD3L1gZKNG3EKpFA)

**Berita Referensi:**  
[Bank Sampah Sakura Srengseng Sawah: Warga Bergerak, Sampah Terkelola, Ekonomi Tumbuh — Kementerian Lingkungan Hidup](https://kemenlh.go.id/news/detail/bank-sampah-sakura-srengseng-sawah-warga-bergerak-sampah-terkelola-ekonomi-tumbuh)

**Database DB Diagram:**  
[View ERD SakuraCycle](https://dbdiagram.io/d/SakuraCycle-—-Manajemen-Setoran-Sampah-6ae5645ff99a5c458bc19540)

## 👥 Team — EcoSakura

| Name | Role |
|---|---|
| Zahra Tsabitah | Project Manager |
| Rifki Budiyanto | UI/UX Designer 1 |
| Shafiq Usman Nurhananto | UI/UX Designer 2 |
| Muhammad Haikal Erlana | Frontend / Coder 1 |
| Reza Brema Ginting | Backend / Coder 2 |