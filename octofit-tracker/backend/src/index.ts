import express from 'express';
import { connectDatabase } from './config/database';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.status(200).json({ status: 'ok', service: 'octofit-tracker-api' });
});

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit API:', error);
    process.exit(1);
  }
}

void startServer();
