/**
 * T5 Desk Assistant - Mock API Server
 * 
 * This Express.js server provides mock REST API endpoints for the T5 Desk Assistant demo.
 * It simulates integration with:
 * - Google Calendar API (schedule/events)
 * - Health monitoring service
 * - Tuya Cloud API (smart device control)
 * 
 * In production phase, these endpoints will connect to real cloud services.
 * 
 * @author Abdelrazek Rizk
 * @version 1.0.0
 * @requires express - HTTP server framework
 * @requires body-parser - JSON body parsing middleware
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express application
const app = express();
app.use(bodyParser.json());

/**
 * Serve static client files (SPA - Single Page Application)
 * All static files from /client directory are served directly
 */
app.use(express.static(path.join(__dirname, '..', 'client')));

/**
 * Root route - Serves the main UI
 * Falls back to index.html for all unmatched routes (SPA routing)
 * 
 * @route GET /
 * @returns {HTML} index.html - Main application interface
 */
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'index.html')));

/**
 * Schedule API Endpoint
 * 
 * Retrieves upcoming calendar events (mocked data).
 * In Phase 2, this will integrate with Google Calendar API.
 * 
 * @route GET /api/schedule
 * @returns {Object} JSON object containing:
 *   - events {Array} List of upcoming events with time and title
 *   - next {Object} Next scheduled event details
 * 
 * @example
 * GET /api/schedule
 * Response:
 * {
 *   "events": [
 *     { "time": "09:00", "title": "Standup" },
 *     { "time": "10:30", "title": "Design review" }
 *   ],
 *   "next": { "time": "09:00", "title": "Standup" }
 * }
 */
app.get('/api/schedule', (req, res) => {
  // Log request for debugging
  console.log(`[${new Date().toISOString()}] GET /api/schedule`);
  
  // Return mock schedule data
  // TODO Phase 2: Replace with actual Google Calendar API integration
  res.json({
    events: [
      { time: '09:00', title: 'Standup' },
      { time: '10:30', title: 'Design review' }
    ],
    next: { time: '09:00', title: 'Standup' }
  });
});

/**
 * Health Reminder API Endpoint
 * 
 * Retrieves current health reminders and wellness suggestions.
 * Includes sedentary warnings, hydration alerts, and posture reminders.
 * In Phase 2, this will integrate with wearable APIs and health services.
 * 
 * @route GET /api/health
 * @returns {Object} JSON object containing:
 *   - message {String} Health reminder message for user
 * 
 * @example
 * GET /api/health
 * Response:
 * {
 *   "message": "You have been sitting 90 minutes. Consider a 2-minute stretch."
 * }
 */
app.get('/api/health', (req, res) => {
  // Log request for debugging
  console.log(`[${new Date().toISOString()}] GET /api/health`);
  
  // Return mock health reminder
  // TODO Phase 2: Integrate with:
  // - Motion sensor data
  // - Wearable device APIs (Apple Health, Google Fit)
  // - Machine learning models for personalized recommendations
  res.json({ 
    message: 'You have been sitting 90 minutes. Consider a 2-minute stretch.' 
  });
});

/**
 * Tuya Device Control API Endpoint
 * 
 * Sends commands to Tuya-connected smart devices.
 * Supports turning on/off, dimming lights, adjusting temperature, etc.
 * 
 * @route POST /api/tuya/command
 * @param {Object} req.body - Request body
 * @param {String} req.body.command - Device command (e.g., 'turn_on', 'set_brightness')
 * @param {String} [req.body.device_id] - ID of target device (optional in mock)
 * @returns {Object} JSON object containing:
 *   - status {String} 'ok' if successful
 *   - command {String} Echo of the command sent
 *   - device_id {String} ID of controlled device
 * 
 * @example
 * POST /api/tuya/command
 * Body: { "command": "turn_on", "device_id": "desk_lamp_001" }
 * Response:
 * {
 *   "status": "ok",
 *   "command": "turn_on",
 *   "device_id": "desk_lamp_001"
 * }
 */
app.post('/api/tuya/command', (req, res) => {
  const { command, device_id } = req.body;
  
  // Log command for auditing and debugging
  console.log(`[${new Date().toISOString()}] POST /api/tuya/command - Command: ${command}, Device: ${device_id || 'default'}`);
  
  // Validate command exists
  if (!command) {
    return res.status(400).json({
      status: 'error',
      message: 'Command is required'
    });
  }
  
  // Return mock success response
  // TODO Phase 2: Connect to actual Tuya Cloud API v2.0
  // - Authenticate with Tuya OAuth2
  // - Map voice commands to device capabilities
  // - Handle errors and device status
  res.json({ 
    status: 'ok', 
    command,
    device_id: device_id || 'default'
  });
});

/**
 * Initialize Server
 * 
 * Starts the Express HTTP server on the specified port.
 * Defaults to port 3001 if PORT environment variable not set.
 * 
 * Environment Variables:
 * - PORT {Number} Server port (default: 3001)
 * - NODE_ENV {String} Environment (development/production)
 */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║          T5 Desk Assistant - Mock Server Running               ║
╠════════════════════════════════════════════════════════════════╣
║  Server started at http://localhost:${port}                          
║  
║  Available API Endpoints:
║  - GET  /api/schedule      → Calendar events (mock)
║  - GET  /api/health        → Health reminders (mock)
║  - POST /api/tuya/command  → Device control (mock)
║  
║  Static UI: http://localhost:${port}/
║  
║  Press Ctrl+C to stop the server
╚════════════════════════════════════════════════════════════════╝
  `);
});
