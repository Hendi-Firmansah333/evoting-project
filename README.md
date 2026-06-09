# 🗳️ E-Voting Project

Aplikasi E-Voting berbasis web yang digunakan untuk melakukan pemilihan secara digital dengan sistem login, voting, dan dashboard administrator.

## ✨ Fitur

### User
- Registrasi akun
- Login
- Melihat daftar kandidat
- Melakukan voting
- Voting hanya 1 kali

### Admin
- Dashboard statistik
- Menambah kandidat
- Menghapus kandidat
- Melihat total suara
- Melihat kandidat unggulan
- Upload foto kandidat

---

## 🛠️ Teknologi

### Frontend
- React JS
- React Router DOM
- Tailwind CSS
- Recharts
- Axios

### Backend
- Node JS
- Express JS
- Prisma ORM
- JWT Authentication
- Multer Upload

### Database
- MySQL

---

## 📂 Struktur Project

```
evoting-project
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── prisma
│   ├── routes
│   └── server.js
│
└── README.md
```

---

## ⚙️ Instalasi

### Clone Repository

```bash
git clone https://github.com/Hendi-Firmansah333/evoting-project.git
```

Masuk ke folder project:

```bash
cd evoting-project
```

---

## Frontend

Masuk ke folder client:

```bash
cd client
```

Install dependency:

```bash
npm install
```

Jalankan:

```bash
npm run dev
```

---

## Backend

Masuk ke folder server:

```bash
cd server
```

Install dependency:

```bash
npm install
```

Jalankan:

```bash
npm start
```

---

## Database

Buat database MySQL:

```sql
CREATE DATABASE evoting;
```

Atur file:

```env
DATABASE_URL="mysql://user:password@localhost:3306/evoting"
JWT_SECRET="your_secret_key"
```

Lalu jalankan:

```bash
npx prisma generate
npx prisma db push
```

---

## 🔒 Environment Variables

Buat file:

```env
DATABASE_URL=
JWT_SECRET=
```

File `.env` tidak disertakan ke GitHub demi keamanan.

---

## 👨‍💻 Developer

Nama : Hendi Firmansah

Program Studi : Teknologi Informasi

Universitas : Universitas Muhammadiyah Kotabumi

---

## 📄 License

Project ini dibuat untuk keperluan pembelajaran, penelitian, dan pengembangan sistem E-Voting.