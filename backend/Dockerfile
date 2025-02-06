FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8000
EXPOSE 8001
EXPOSE 5000
EXPOSE 3306



CMD ["node", "app.js"]
