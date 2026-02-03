# Deployment Guide

## Railway
1. **Connect Repository:** Link your GitHub repo to Railway.
2. **Database:** Add a PostgreSQL plugin in Railway.
3. **Environment Variables:**
   - `DATABASE_URL`: Set this to the value provided by the Postgres plugin.
   - `PORT`: Railway sets this automatically (usually matches `src/server.ts` fallback or overrides it).
4. **Build Command:** `npm run build` (Railway detects `package.json` scripts).
5. **Start Command:** `npm start` (defined in `package.json` as `node dist/server.js`).
6. **Migrations:** Add a "Pre-deploy" command or run manually: `npx prisma db push` (or `migrate deploy` if using migrations).

## Render
1. **New Web Service:** Connect GitHub repo.
2. **Environment:** Node.js.
3. **Build Command:** `npm install && npm run build`.
4. **Start Command:** `npm start`.
5. **Database:** Create a Render PostgreSQL database.
6. **Environment Variables:**
   - `DATABASE_URL`: Connection string from Render DB.
