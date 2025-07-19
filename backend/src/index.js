const express = require('express');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./supabaseClient');

const app = express();

// 🔧 CORS beállítás: engedélyezzük a frontendet (Next.js localhost:3000)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// 📦 JSON body-k olvasása
app.use(express.json());

/**
 * GET /classes – jógaórák listázása
 */
app.get('/classes', async (req, res) => {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .order('time', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

/**
 * GET /bookings – összes foglalás lekérdezése (egyelőre globálisan)
 * Később szűrni fogjuk user_id alapján
 */
app.get('/bookings', async (req, res) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

/**
 * POST /bookings – új foglalás létrehozása
 */
app.post('/bookings', async (req, res) => {
  const { user_id, class_id, status } = req.body;

  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        user_id,
        class_id,
        status: status || 'confirmed',
      },
    ])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});

// 🚀 Indítjuk a szervert
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API fut a ${PORT}-es porton 🚀`);
});