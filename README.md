# ✦ Aureum Luxury — Full Stack E-Commerce Platform

A premium luxury e-commerce frontend built with **React + TypeScript + Tailwind CSS v4**, featuring a full shopping experience with cart management, product filtering, fragrance quiz, concierge booking, and VIP club access.

🔗 **[Live Demo →](https://aureum-luxury.vercel.app)** *(update with your link after deploy)*

---

## ✨ Features

- **Product Gallery** — Filter by category (Suits, Watches, Leather, Accessories) with smooth transitions
- **Shopping Cart** — Slide-out drawer with quantity management, SKU-level tracking, and order summary
- **Fragrance Quiz** — Interactive 3-step style profile quiz with personalized recommendations
- **Concierge Booking** — Atelier appointment booking form with location selection
- **VIP Club Portal** — Exclusive membership modal with benefit showcase
- **Testimonials** — Client reviews section with ratings
- **Fully Responsive** — Mobile-first design optimized across all screen sizes

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Build Tool | Vite 6 |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/aureum-luxury.git
cd aureum-luxury

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation + cart icon + VIP button
│   ├── Hero.tsx            # Full-screen hero with CTA
│   ├── Collections.tsx     # Category showcase cards
│   ├── Gallery.tsx         # Product grid with filtering
│   ├── CartDrawer.tsx      # Slide-out shopping cart
│   ├── FragranceQuiz.tsx   # Interactive style quiz
│   ├── ConciergeBooking.tsx # Appointment booking form
│   ├── Testimonials.tsx    # Customer reviews
│   ├── VIPClub.tsx         # VIP membership modal
│   └── PremiumFooter.tsx   # Footer with atelier locations
├── data.ts                 # Product & content data
├── types.ts                # TypeScript interfaces
├── App.tsx                 # Root component + state management
└── main.tsx                # Entry point
```

---

## 🔜 Upcoming — Backend Integration (Spring Boot)

This project is being extended with a **Java Spring Boot REST API** backend:

- `GET /api/products` — Serve products from MySQL database
- `POST /api/cart` — Persist cart sessions
- `POST /api/orders` — Order placement + confirmation
- `POST /api/auth/login` — JWT-based authentication
- `POST /api/bookings` — Concierge appointment scheduling

**Backend Stack:** Java 17 · Spring Boot 3 · Spring Security · JDBC/JPA · MySQL · REST API · JWT

---

## 📸 Screenshots

> *(Add screenshots here after deploying — paste image links)*

---

## 👤 Author

Built by **[Your Name]** — Java Full Stack Developer  
📧 your@email.com · [LinkedIn](https://linkedin.com/in/yourprofile) · [GitHub](https://github.com/yourusername)

---

*This project was built as a portfolio demonstration of React/TypeScript frontend skills, with a Spring Boot backend integration in progress.*
