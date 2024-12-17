const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Car = require('../models/Car');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`),
});

const upload = multer({ storage });

// Submit Car Data
router.post('/submit', authMiddleware, upload.array('images', 10), async (req, res) => {
  const { carModel, price, phone, city } = req.body;
  const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

  try {
    const car = new Car({
      user: req.user.id,
      carModel,
      price,
      phone,
      city,
      images: imageUrls,
    });

    await car.save();
    res.status(201).json({ message: 'Car submitted successfully', car });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
