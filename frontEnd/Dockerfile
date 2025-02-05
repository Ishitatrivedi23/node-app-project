FROM node
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
RUN npm run build
COPY package.json ./
EXPOSE 5000
EXPOSE 3306
CMD ["npm", "start"]

