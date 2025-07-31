const express = require('express');
const cors = require('cors');
require('dotenv').config();

const trainerRoutes = require('./routes/trainers');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/trainers', trainerRoutes);

// Start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
console.log(process.env.NODE_ENV); // pl. "development" vagy "production"
require('dotenv').config();
