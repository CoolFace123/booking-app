const express = require('express');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./supabaseClient');

const app = express();

// CORS Renderhez is
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.get('/api/classes', async (req, res) => {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .order('time', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get('/api/bookings', async (req, res) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/bookings', async (req, res) => {
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

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API fut a ${PORT}-es porton 🚀`);
});