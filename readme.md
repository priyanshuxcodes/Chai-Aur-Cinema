# 🎬 ChaiCode Cinema – Seat Booking System

A full-stack seat booking application built with **Node.js, PostgreSQL, Docker, and Vanilla JS UI**.

---

## 🚀 Features

* 🔐 User Registration & Login
* 🎟️ Real-time Seat Booking
* 👀 View booked vs available seats
* 🧑 Track who booked each seat
* 🐳 Fully Dockerized PostgreSQL setup

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express
* **Database:** PostgreSQL
* **Frontend:** HTML + Tailwind CSS
* **Containerization:** Docker + Docker Compose

---

## 📁 Project Structure

```
.
├── db/
│   └── init.sql          # DB schema + seed data
├── src/                  # Backend logic
├── docker-compose.yml    # PostgreSQL container setup
├── index.mjs             # Backend entry point
├── index.html            # Frontend UI
├── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Start PostgreSQL using Docker

```bash
docker-compose down -v
docker-compose up
```

> ⚠️ `-v` ensures database is reset and `init.sql` runs

---

### 2️⃣ Verify Database

```bash
docker exec -it bookmyticket-db psql -U postgres -d book_my_ticket
```

```sql
\dt
```

You should see:

* `users`
* `seats`

---

### 3️⃣ Install Dependencies

```bash
npm install
```

---

### 4️⃣ Start Backend

```bash
node index.mjs
```

---

### 5️⃣ Open Frontend

Visit:

```
http://localhost:3000
```

---

## 🧠 Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT
);
```

### Seats Table

```sql
CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isbooked INT DEFAULT 0,
  user_id INT
);
```

---

## 🔥 Important Notes

* `init.sql` runs **only once** when DB is first created
* If tables are missing → run:

```bash
docker-compose down -v
docker-compose up
```

---

## 🐞 Common Errors

### ❌ `relation "users" does not exist`

**Fix:**

```bash
docker-compose down -v
docker-compose up
```

---

### ❌ Seats not visible

* Check if data is seeded in `init.sql`
* Ensure backend is running

---

