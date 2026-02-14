# 🔗 URL Shortener Fullstack

A modern, high-performance URL shortener built with **TypeScript**, **React**, and **Node.js**. This project was developed to showcase fullstack engineering skills, including API design, database modeling, and cloud deployment.

## 🚀 Live Demo
- **Frontend:** [https://url-shortener-portfolio-proj.vercel.app](https://url-shortener-portfolio-proj.vercel.app/)
- **Backend API:** [https://url-short-gledo.up.railway.app/](https://url-short-gledo.up.railway.app/)

 ![URL Shortener Demo](https://github.com/user-attachments/assets/0cbfe9d7-3631-4e46-9562-f869de12be26)

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
- **Railway:** Backend Hosting & Managed PostgreSQL.
- **Vercel:** Frontend Hosting.
- **Docker:** Containerized environment for consistent development.

## 🏗️ Architecture
The backend follows a **Layered Architecture** pattern to ensure maintainability and scalability:
- **Routes:** Entry points for API requests.
- **Controllers:** Handle HTTP logic and request/response flow.
- **Services:** Contain the core business logic (e.g., URL encoding).
- **Repositories:** Abstract database operations using Prisma.
- **Middlewares:** Handle cross-cutting concerns like validation and error handling.

## 🧪 Testing
The project includes integration tests to ensure API reliability.

## 📈 Skills Demonstrated
- **Type Safety:** Extensive use of TypeScript across the entire stack to catch errors at compile-time.
- **API Design:** RESTful principles, structured JSON responses, and proper HTTP status codes.
- **Database Proficiency:** Complex indexing for performance and ORM usage for type-safe queries.
- **Validation:** Strict request body validation using Zod schemas.
- **Clean Code:** Adherence to SOLID principles and clear separation of concerns.
- **Cloud Deployment:** Practical experience with CI/CD flows on Railway and Vercel.

## 📧 Contact
- **LinkedIn**: [linkedin.com/in/glc42/](https://linkedin.com/in/glc42)
- **GitHub**: [@guiledo](https://github.com/guiledo)
- **Email**: glc.professional42@gmail.com
