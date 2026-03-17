FROM node:18-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install -g ts-node typescript

COPY . .

RUN npm run build

EXPOSE 10000

CMD ["npm", "start"]

