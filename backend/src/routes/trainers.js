import express from 'express';
import { supabase } from '../services/supabaseClient.js';


const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('trainers')
    .select('*');

  if (error) {
    console.error('Supabase hiba:', error);
    return res.status(500).json({ error: 'Nem sikerült lekérni az edzőket' });
  }

  res.json(data);
});

export default router;
