require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const analysisRoutes = require('./routes/analysis');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'TrustGraph AI Backend',
    timestamp: new Date().toISOString(),
    aiEnabled: !!process.env.OPENAI_API_KEY
  });
});

app.use('/api', analysisRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`TrustGraph AI Backend running on port ${PORT}`);
  console.log(`AI Mode: ${process.env.OPENAI_API_KEY ? 'OpenAI GPT-4o' : 'Mock Responses'}`);
});

module.exports = app;
