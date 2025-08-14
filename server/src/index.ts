import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router as api } from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/widget', express.static(path.resolve(__dirname, '../../widget/dist')));

app.use(api);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`PostBus Connect API running on :${port}`);
});
