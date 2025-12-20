const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.json());

// Serve static client UI
app.use(express.static(path.join(__dirname, '..', 'client')));
// Fallback to index.html for SPA routing
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'index.html')));


// Mock schedule
app.get('/api/schedule', (req, res) => {
  res.json({
    events: [
      { time: '09:00', title: 'Standup' },
      { time: '10:30', title: 'Design review' }
    ],
    next: { time: '09:00', title: 'Standup' }
  });
});

// Mock health reminder
app.get('/api/health', (req, res) => {
  res.json({ message: 'You have been sitting 90 minutes. Consider a 2-minute stretch.' });
});

// Mock Tuya cloud command
app.post('/api/tuya/command', (req, res) => {
  const { command } = req.body;
  console.log('Mock Tuya command:', command);
  res.json({ status: 'ok', command });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Mock server listening on ${port}`));
