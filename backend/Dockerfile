FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000
EXPOSSE 3306

ENV NODE_ENV=production

CMD ["npm", "start"]
