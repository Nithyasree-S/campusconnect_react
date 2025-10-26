

# CampusConnect 🏫

[![MERN](https://img.shields.io/badge/Stack-MERN-blue)](https://mern.io/) [![License: MIT](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

A **college networking and marketplace app** for students to connect, share posts, buy/sell items, and stay updated on campus events. Built with the MERN stack, it combines social interaction, e-commerce, and CRUD operations in a simple, intuitive interface.

---

## ✨ Key Features

* **JWT Authentication** – Secure signup/login
* **Posts** – Share text or image posts
* **Interactions** – Like, comment, and chat with peers
* **Marketplace** – Buy/sell secondhand books and items
* **Events** – Post and view campus events

---

## 🛠 Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js + Express.js
* **Database:** MongoDB
* **Authentication:** JWT

---

## ⚙️ MERN Architecture Diagram

```
+----------------+      +----------------+      +----------------+
|    React.js    | <--> |  Express.js    | <--> |    MongoDB     |
|  Frontend UI   |      |  REST API      |      |   Database     |
+----------------+      +----------------+      +----------------+
```

---

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/CampusConnect.git
   ```
2. Backend setup:

   ```bash
   cd backend
   npm install
   ```
3. Frontend setup:

   ```bash
   cd ../frontend
   npm install
   ```
4. Create a `.env` file in `backend` with:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
5. Run backend server:

   ```bash
   cd backend
   npm start
   ```
6. Run frontend app:

   ```bash
   cd ../frontend
   npm start
   ```

---

## 💻 Usage

1. Sign up or log in with your college credentials
2. Create and share posts (text or images)
3. Like, comment, and chat on posts
4. Browse the marketplace to buy/sell items
5. Stay updated on campus events

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**


