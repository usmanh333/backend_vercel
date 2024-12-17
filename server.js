const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors'); // Import CORS middleware

dotenv.config();

const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');

const app = express();

// CORS configuration
const corsOptions = {
  origin: "https://frontend-vercel-gamma.vercel.app", // Allow frontend Vercel domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Add the HTTP methods you need to support
  allowedHeaders: ["Content-Type", "Authorization"], // Add any headers you need to support
};

// Use CORS middleware
app.use(cors(corsOptions));

// Enable CORS for all requests
app.use(cors());

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/car', carRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch((err) => console.log(err));
