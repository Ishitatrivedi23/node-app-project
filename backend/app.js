const express = require('express');
const appRoutes = require('./routes/appRoutes');
const cors = require('cors');

const app = express();

// Enable all CORS requests for development (or configure to restrict)
app.use(cors());

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine and specify the views directory
app.set("view engine", 'ejs');
app.set('views', 'views');

// Define port
const PORT = process.env.PORT || 8000;

// Use your routes
app.use("/", appRoutes);

// Error handling for unknown routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// General error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
