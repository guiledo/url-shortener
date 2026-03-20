# 🔗 URL Shortener Fullstack

A modern, high-performance URL shortener built with **TypeScript**, **React**, and **Node.js**. This project was developed to showcase fullstack engineering skills, including API design, database modeling, and cloud deployment.

## 🚀 Live Demo
- **Frontend:** [https://url-shortener-portfolio-proj.vercel.app](https://url-shortener-portfolio-proj.vercel.app/)
- **Backend API:** [https://url-shortener-knyo.onrender.com/](https://url-shortener-knyo.onrender.com/)

![url-shortener-demo](https://github.com/user-attachments/assets/0238c765-f165-40c8-a1dc-45b0bbb63674)

## ✨ Features
- **Instant Shortening:** Transform long URLs into compact, shareable links.
- **Custom Base62 Encoding:** Optimized algorithm for generating short, unique identifiers.
- **Real-time Analytics:** Track the number of clicks for every shortened link.
- **Responsive UI:** Interface built with Tailwind CSS.
- **Security First:** Includes HTTP headers protection (Helmet), CORS configuration, and request validation.

## 🛠️ Tech Stack

### Frontend
- **React 19** & **TypeScript**
- **Vite** (Build tool)
- **Tailwind CSS** (Styling)
- **Lucide React** (Iconography)

### Backend
- **Node.js** & **Express**
- **Prisma ORM** (Database management)
- **PostgreSQL** (Primary database)
- **Zod** (Schema validation)
- **Jest** & **Supertest** (Testing suite)

### DevOps & Deployment
- **Render:** Backend Hosting.
- **Supabase:** Managed PostgreSQL.
- **Vercel:** Frontend Hosting.
- **Docker:** Containerized environment for consistent development.
- **GitHub Actions:** Auto-ping (Keep Alive) every 14 minutes to prevent Render from sleeping.

## 🏗️ Architecture
The backend follows a **Layered Architecture** pattern to ensure maintainability and scalability:
- **Routes:** Entry points for API requests.
- **Controllers:** Handle HTTP logic and request/response flow.
- **Services:** Contain the core business logic (e.g., URL encoding).
- **Repositories:** Abstract database operations using Prisma.
- **Middlewares:** Handle cross-cutting concerns like validation and error handling.

## 📁 Project Structure
```text
.
├── client/                # Frontend application (React + Vite)
├── prisma/                # Database schema and migrations
└── src/                   # Backend API source code
    ├── controllers/       # Route controllers (request/response handling)
    ├── services/          # Business logic layer
    ├── repositories/      # Data access layer (Prisma)
    ├── routes/            # API endpoint definitions
    ├── middlewares/       # Custom Express middlewares
    ├── schemas/           # Data validation schemas (Zod)
    ├── utils/             # Utility functions and helpers
    └── tests/             # Test suite
```

## 🧪 Testing
The project includes integration tests to ensure API reliability.

## 📈 Skills Demonstrated
- **Type Safety:** Extensive use of TypeScript across the entire stack to catch errors at compile-time.
- **API Design:** RESTful principles, structured JSON responses, and proper HTTP status codes.
- **Database Proficiency:** Complex indexing for performance and ORM usage for type-safe queries.
- **Validation:** Strict request body validation using Zod schemas.
- **Clean Code:** Adherence to SOLID principles and clear separation of concerns.
- **Cloud Deployment:** Practical experience with CI/CD flows on Render and Vercel.

## 📧 Contact
- **LinkedIn**: [linkedin.com/in/glc42/](https://linkedin.com/in/glc42)
- **GitHub**: [@guiledo](https://github.com/guiledo)
- **Email**: glc.professional42@gmail.com
