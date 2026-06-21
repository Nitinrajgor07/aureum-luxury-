# 💎 Aureum Luxury — Full-Stack E-Commerce Platform

A full-stack luxury e-commerce web application with a modern React frontend and a secure Spring Boot backend — built for scalable product browsing, order management, and authenticated user flows.

---

## 🚀 Features

- **JWT Authentication** — Secure login/signup with token-based auth
- **Order Management APIs** — Place, track, and manage orders end-to-end
- **Advanced Search & Filter** — Fast product search/filtering using Java Streams
- **Product Catalog** — Browse luxury product collections with detail views
- **Responsive UI** — Built with Tailwind CSS for a clean, modern shopping experience
- **One-Click Launcher** — `start-all.bat` script to run frontend + backend together

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS |
| Backend | Spring Boot (Java) |
| Auth | JWT (JSON Web Tokens) |
| Database | MySQL |
| Search/Filter Logic | Java Streams API |

---

## 📸 Screenshots

> _Add screenshots of the homepage, product listing, product detail page, and checkout flow here._

---

## ⚙️ Installation & Setup

### Backend (Spring Boot)
```bash
cd backend
# Configure MySQL credentials in application.properties
mvn clean install
mvn spring-boot:run
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

### Quick Start (Windows)
```bash
# Runs both frontend and backend together
start-all.bat
```

---

## 📂 Project Structure

```
aureum-luxury/
├── backend/
│   ├── src/main/java/com/aureum/
│   │   ├── controller/        # REST API controllers
│   │   ├── service/           # Business logic
│   │   ├── repository/        # JPA repositories
│   │   ├── model/             # Entity classes
│   │   └── security/          # JWT auth & config
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/                # Axios/fetch calls to backend
│   └── package.json
├── start-all.bat
└── README.md
```

---

## 🧠 How It Works

1. User registers/logs in — backend issues a JWT on successful authentication.
2. Frontend stores the token and attaches it to subsequent API requests.
3. Product listings support advanced filtering (price, category, etc.) handled efficiently via Java Streams on the backend.
4. Orders are created through dedicated REST endpoints, with status tracking persisted in MySQL.
5. React frontend consumes these APIs to render a smooth, single-page shopping experience.

---

## 🔮 Future Improvements

- Payment gateway integration (Razorpay/Stripe)
- Admin dashboard for inventory management
- Wishlist and cart persistence
- Dockerized deployment setup

---

## 👤 Author

**Nitin Rajgor**
M.Sc. CS & IT, Jain University, Bengaluru
📧 rajgornitin2308@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
