import express from 'express';
import cors from 'cors';
import trainersRoute from './routes/trainers.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/trainers', trainersRoute);

app.listen(PORT, () => {
  console.log(`Backend fut a http://localhost:${PORT} címen`);
});
