FROM node:18-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate && npx prisma db push && npm run build

EXPOSE 10000

CMD ["node", "dist/server.js"]

