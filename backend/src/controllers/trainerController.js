const { supabase } = require('../services/supabaseClient');

async function getAllTrainers(req, res) {
  try {
    const { data, error } = await supabase.from('trainers').select('*');
    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching trainers:', err.message);
    res.status(500).json({ message: 'Failed to fetch trainers' });
  }
}

module.exports = {
  getAllTrainers,
};
