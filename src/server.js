import express from 'express';
import generatorRoute from './routes/generatorRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin:  ['http://localhost:3001','http://127.0.0.1:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], 
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/generate', generatorRoute);

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});