const express = require('express');
const appRoutes = require('./routes/appRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); // Require mysql2 for MySQL connection

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost', // MySQL host
  user: 'root', // MySQL user (usually root for local)
  password: 'yourpassword', // Replace with your MySQL root password
  database: 'yourdatabase', // Replace with your MySQL database name
  port: 3306 // Default MySQL port
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL!');
});

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));

// Pass the connection to routes if necessary (for database queries)
app.use("/", appRoutes);

// Start the server and listen on the specified port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => { 
  console.log(`Server is listening on port ${PORT}`); 
});

