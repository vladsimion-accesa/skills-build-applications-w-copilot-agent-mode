import express, { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { apiBaseUrl } from './config/api';
import { connectDatabase } from './config/database';
import apiRouter from './routes';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    service: 'octofit-tracker-api',
    baseUrl: apiBaseUrl,
  });
});

const handleApiError: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    response.status(400).json({ error: error.message });
    return;
  }

  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(handleApiError);

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening at ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit API:', error);
    process.exit(1);
  }
}

void startServer();
