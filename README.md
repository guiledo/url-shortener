# 🔗 URL Shortener Fullstack

A modern, high-performance URL shortener built with **TypeScript**, **React**, and **Java / Spring Boot**. This project was developed to showcase fullstack engineering skills, including API design, database modeling, and cloud deployment.

## 🚀 Live Demo
- **Frontend:** [https://url-shortener-portfolio-proj.vercel.app](https://url-shortener-portfolio-proj.vercel.app/)
- **Backend API:** [https://url-shortener-knyo.onrender.com/](https://url-shortener-knyo.onrender.com/)

<img width="1024" height="549" alt="url-shortener-demo" src="https://github.com/user-attachments/assets/60e4dc7a-a797-42f4-8872-fa16b11ee7db" />


## ✨ Features
- **Instant Shortening:** Transform long URLs into compact, shareable links.
- **Custom Base62 Encoding:** Optimized algorithm for generating short, unique identifiers.
- **Real-time Analytics:** Track the number of clicks for every shortened link.
- **Responsive UI:** Interface built with Tailwind CSS.
- **Security First:** Includes HTTP headers protection, CORS configuration, and an in-memory Rate Limiting Interceptor.

## 🛠️ Tech Stack

### Frontend
- **React 19** & **TypeScript**
- **Vite** (Build tool)
- **Tailwind CSS** (Styling)
- **Lucide React** (Iconography)

### Backend
- **Java 21** & **Spring Boot 3**
- **Spring Data JPA** (Database management)
- **PostgreSQL** (Primary database)
- **Jakarta Validation** (Schema validation)
- **JUnit 5** (Testing suite)
- **Maven** (Build Tool)

### DevOps & Deployment
- **Render:** Backend Hosting (Dockerized).
- **Supabase:** Managed PostgreSQL.
- **Vercel:** Frontend Hosting.
- **Docker:** Containerized environment with Multi-stage builds.
- **GitHub Actions:** Auto-ping (Keep Alive) every 14 minutes to prevent Render from sleeping.

## 🏗️ Architecture
The backend follows a **Layered Architecture** pattern to ensure maintainability and scalability:
- **Controllers:** Entry points for API requests, handling HTTP logic and request/response flow.
- **Services:** Contain the core business logic (e.g., URL encoding and uniqueness verification).
- **Repositories:** Abstract database operations using Spring Data JPA.
- **Interceptors:** Handle cross-cutting concerns like Rate Limiting.
- **DTOs:** Data Transfer Objects with Jakarta Validation.

## 📁 Project Structure
```text
.
├── client/                # Frontend application (React + Vite)
├── pom.xml                # Maven configuration
├── Dockerfile             # Multi-stage Dockerfile
└── src/                   # Backend API source code
    ├── main/java/.../     # Java Source Files
    │   ├── config/        # CORS, Security Headers, Exceptions, Rate Limits
    │   ├── controller/    # Route controllers (request/response handling)
    │   ├── dto/           # Data Transfer Objects
    │   ├── model/         # JPA Entities
    │   ├── repository/    # Data access layer
    │   ├── service/       # Business logic layer
    │   └── util/          # Utility functions (Base62)
    └── test/              # Test suite (JUnit)
```

## 🚀 Environment Variables (Backend)
If you are deploying this to Render or another platform, ensure the following environment variables are set:
- `SPRING_DATASOURCE_URL`: The JDBC connection string (e.g. `jdbc:postgresql://host:port/database`)
- `POSTGRES_USER`: Database username
- `POSTGRES_PASSWORD`: Database password
- `FRONTEND_URL`: URL of the frontend (for redirects and CORS)

## 📈 Skills Demonstrated
- **Type Safety:** Extensive use of Java's static typing and TypeScript across the stack.
- **API Design:** RESTful principles, structured JSON responses, and proper HTTP status codes.
- **Database Proficiency:** Complex indexing for performance and JPA usage for type-safe queries.
- **Validation:** Strict request body validation using Jakarta constraints.
- **Clean Code:** Adherence to SOLID principles and clear separation of concerns.
- **Cloud Deployment:** Practical experience with containerized deployments on Render and serverless hosting on Vercel.

## 📧 Contact
- **LinkedIn**: [linkedin.com/in/glc42/](https://linkedin.com/in/glc42)
- **GitHub**: [@guiledo](https://github.com/guiledo)
- **Email**: glc.professional42@gmail.com
