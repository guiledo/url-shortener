# Deployment Guide

## Render (Backend)
1. **New Web Service:** Connect GitHub repo.
2. **Environment:** Node.js.
3. **Build Command:** `npm install && npm run build`.
4. **Start Command:** `npm start`.
5. **Environment Variables:**
   - `DATABASE_URL`: Connection string from Supabase (Transaction mode recommended for serverless/pooled connections).
   - `PORT`: Render sets this automatically.

## Supabase (Database)
1. **Create Project:** Start a new project in Supabase.
2. **Database Connection:** 
   - Go to Project Settings > Database.
   - Copy the Connection String (URI).
   - Use the **Transaction** mode (port 6543) if you're using Prisma with connection pooling.

## Vercel (Frontend)
1. **Connect Repository:** Link the `client/` directory to Vercel.
2. **Rewrites:** The `vercel.json` handles proxying `/api` requests to the Render backend.

---

## Railway (Legacy)
1. **Connect Repository:** Link your GitHub repo to Railway.
2. **Database:** Add a PostgreSQL plugin in Railway.
3. **Environment Variables:**
   - `DATABASE_URL`: Set this to the value provided by the Postgres plugin.
   - `PORT`: Railway sets this automatically.
4. **Build Command:** `npm run build`.
5. **Start Command:** `npm start`.
