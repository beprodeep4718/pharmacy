require("dotenv").config();
const express = require("express");
 
const app = express();
const cors = require('cors');


const connectDB = require("./utils/db");
const cookieParser = require("cookie-parser");
require("./cron/schedule");

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(cors({
  origin: process.env.CLIENT_URL, // Ensure this matches exactly with your Vercel app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/user", require("./routes/user.routes"));
app.use("/reminder", require("./routes/reminder.routes"));

app.use('/api/products', require('./routes/product.routes'))
// Default route
app.get("/", (req, res) => {
  res.send("Hello, Node.js Server!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
connectDB(process.env.MONGO_URI);
