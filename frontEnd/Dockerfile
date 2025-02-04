FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Expose port 5000 for the frontend
EXPOSE 5000
EXPOSE 3306
CMD ["sh", "-c", "touch /app/initialized && npm start"]
