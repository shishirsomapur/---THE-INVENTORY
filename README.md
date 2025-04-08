# ಗೋದಾಮು - THE INVENTORY 📦

**ಗೋದಾಮು** (pronounced *Godaamu*) is the Kannada word for **Inventory**, and that's exactly what this app is all about — a clean, simple, and efficient inventory management system built with modern web technologies.

---

## 🚀 Project Overview

**ಗೋದಾಮು - THE INVENTORY** is a full-stack inventory management application that allows you to:

- 📦 Add, edit, and delete products
- 💸 Sell products and manage stock
- 📊 View a clean stock and revenue overview
- 🔐 Use Google OAuth2 login for access control

---

## 🛠 Tech Stack

| Layer        | Tech                            |
|-------------|----------------------------------|
| Frontend     | React.js + Vite + Tailwind CSS  |
| Backend      | Node.js + Express.js            |
| Database     | MySQL (hosted on Railway)       |
| Auth         | Google OAuth2                   |
| Hosting      | Vercel (frontend), Render (backend), Railway (DB) |

---

## ✨ Features

- 🔐 **Secure Google OAuth2 Login** – Only authenticated users can access routes (except `/`)
- ➕ **Add Product** – Add new items to your inventory
- ✏️ **Edit Product** – Update name, price, quantity, category, or description
- ❌ **Delete Product** – Remove products from the system
- 💰 **Sell Product** – Sell a selected quantity and update the stock in real-time
- 📊 **Stock Overview** – Visual representation of stock levels and revenue using Chart.js

---

## 🔗 Live Demo

- 🌐 **Vercel:** (https://the-inventory-jmb2.vercel.app/)

---
## 🛠️ Installation

Follow these steps to get the application up and running on your local machine:

### 📁 1. Clone the Repository

```bash
git clone https://github.com/shishirsomapur/godaamu-inventory.git
```

### 📁 2. Navigate to the Project Directory

cd ಗೋದಾಮು - THE INVENTORY

### 📦 3. Setup Frontend (Client)

```bash
cd client
npm install
npm run dev
```

Now, open your browser and navigate to:

```bash
Copy
Edit
http://localhost:5173
```

### ⚙️ 4. Setup Backend (Server)
Open a new terminal window:

```bash
bash
Copy
Edit
cd server
npm install
nodemon server.js
```


### 🗄️ 5. Database Setup (MySQL)
Create a MySQL database using Railway or any other provider.

Create the following two tables:

📦 products table:

| Column      | Type             |
|-------------|------------------|
| id          | VARCHAR(20)      |
| name        | VARCHAR(20)      |
| category    | 	VARCHAR(20)     |
| quantity    | INT              |
| price       | INT              |
| description | VARCHAR(255)     |
| is_deleted  | BOOLEAN          |
	
	
💰 transactions table:

| Column      | Type             |
|-------------|------------------|
| txn_id      | VARCHAR(20) (PRIMARY KEY)     |
| product_id  | VARCHAR(20)      |
| category    | 	VARCHAR(20)     |
| quantity    | INT              |
| price       | INT              |
| total_amount| INT              |

Update the db.js file in the /server directory with your MySQL credentials:

```bash
js
Copy
Edit
```

config/db.js
```bash
const pool = mysql.createPool({
  host: "localhost",
  user: "your-username",
  password: "your-password",
  database: "your-database-name",
})
```

## ⚙️ Technologies Used
### 🧠 Frontend
React.js – Component-based UI framework

Vite – Lightning-fast build tool

Tailwind CSS – Utility-first CSS framework

### 🖥️ Backend
Node.js + Express.js – RESTful API server

MySQL – Relational database

Passport.js + Google OAuth2 – Secure authentication

### 🚀 Deployment
Frontend: Vercel

Backend: Render

Database: Railway (MySQL)



