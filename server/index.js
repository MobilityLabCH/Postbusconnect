import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
app.use(express.static(PUBLIC_DIR));

app.get('/health', (_req,res)=>res.json({ok:true, ts: Date.now()}));

app.get('/api/routes', (_req,res)=>{
  try {
    const routes = require(path.join(PUBLIC_DIR, 'data', 'routes.json'));
    res.json(routes);
  } catch (e) {
    res.status(500).json({error:'routes load failed', detail: e.message});
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('✅ Server http://localhost:'+PORT));