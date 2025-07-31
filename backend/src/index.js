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

{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@supabase/supabase-js": "^2.52.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.0",
    "express": "^5.1.0"
  }
}
