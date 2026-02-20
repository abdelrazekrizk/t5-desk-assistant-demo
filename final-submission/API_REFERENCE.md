# T5 Desk Assistant - API Reference

**Complete API Documentation for Mock Server & Future Cloud Services**

---

## 📌 Overview

The T5 Desk Assistant exposes RESTful APIs for:
- 📅 Schedule management (Google Calendar)
- ❤️ Health monitoring & reminders
- 🏠 Tuya smart device control

---

## 🌐 Base URL

**Development:** `http://localhost:3001`  
**Production:** `https://api.t5-desk-assistant.com` (Phase 2)

---

## 🔐 Authentication

### Phase 1 (Current Mock)
- No authentication required
- All endpoints publicly accessible

### Phase 2 (Production)
- OAuth2 with Google account
- Tuya OAuth2 for device access
- API key management for third-party apps
- JWT tokens for session management

```bash
# Example OAuth2 flow
Authorization: Bearer <access_token>
X-API-Key: <api_key>
```

---

## 📅 Schedule API

### GET /api/schedule

Retrieves upcoming calendar events from Google Calendar.

**Request:**
```http
GET /api/schedule?days=7&limit=10
Authorization: Bearer <google_access_token>
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `days` | integer | 7 | Days in advance to fetch |
| `limit` | integer | 10 | Max events to return |
| `timezone` | string | UTC | Timezone for times |
| `calendar_id` | string | primary | Which calendar to query |

**Response (200 OK):**
```json
{
  "events": [
    {
      "id": "event_123",
      "time": "09:00",
      "endTime": "09:30",
      "title": "Daily Standup",
      "description": "Team sync",
      "location": "Conference Room A",
      "attendees": ["@colleague1.com", "@colleague2.com"],
      "isVirtual": true,
      "meetingLink": "https://meet.google.com/...",
      "reminder": 5,
      "duration": 30
    },
    {
      "id": "event_456",
      "time": "10:30",
      "endTime": "11:30",
      "title": "Design Review",
      "description": "Q1 mockups",
      "location": "Building B, Room 205",
      "attendees": ["@designer.com", "@pm.com"],
      "isVirtual": false,
      "reminder": 10,
      "duration": 60
    }
  ],
  "next": {
    "id": "event_123",
    "title": "Daily Standup",
    "time": "09:00",
    "minutesUntil": 15,
    "description": "Team sync"
  },
  "duration": "2 hours 30 minutes",
  "free_time_today": "4 hours 30 minutes",
  "busiest_hour": "14:00"
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired access token"
}
```

**Error Codes:**
- `200` - Success
- `400` - Invalid parameters
- `401` - Authentication failed
- `403` - Access forbidden (calendar permissions)
- `429` - Rate limit exceeded
- `500` - Server error

**Use Cases:**
```bash
# Get next 7 days of events
/api/schedule?days=7

# Get only next 3 events
/api/schedule?limit=3

# Get specific calendar
/api/schedule?calendar_id=work@company.com

# Get with specific timezone
/api/schedule?timezone=America/New_York
```

---

## ❤️ Health API

### GET /api/health

Retrieves current health reminders and wellness data.

**Request:**
```http
GET /api/health?reminder_type=all
```

**Query Parameters:**
| Parameter | Type | Options | Description |
|-----------|------|---------|-------------|
| `reminder_type` | string | all, sedentary, hydration, stretch, posture | Filter by type |
| `include_history` | boolean | true/false | Include past reminders |

**Response (200 OK):**
```json
{
  "current_reminders": [
    {
      "id": "health_001",
      "type": "sedentary",
      "severity": "high",
      "message": "You have been sitting 92 minutes. Time to move!",
      "suggested_action": "5-minute walk or stretch break",
      "trigger_time": "2026-02-20T16:45:00Z",
      "dismissible": true
    },
    {
      "id": "health_002",
      "type": "hydration",
      "severity": "medium",
      "message": "You haven't had water in 2 hours.",
      "suggested_action": "Drink 250ml of water",
      "trigger_time": "2026-02-20T15:30:00Z",
      "dismissible": true
    }
  ],
  "health_score": {
    "overall": 72,
    "sedentary_score": 45,
    "hydration_score": 68,
    "movement_score": 85,
    "sleep_quality": 78
  },
  "daily_stats": {
    "steps": 3250,
    "calories_burned": 450,
    "water_intake_ml": 1200,
    "sitting_time_minutes": 360,
    "standing_time_minutes": 120,
    "active_time_minutes": 30
  },
  "recommendations": [
    "Take a 10-minute walk in the next hour",
    "Increase water intake by 500ml today",
    "Try 2 minutes of stretching every hour"
  ]
}
```

**Response (200 OK) - Empty (No active reminders):**
```json
{
  "current_reminders": [],
  "health_score": {
    "overall": 85,
    "sedentary_score": 90,
    "hydration_score": 80,
    "movement_score": 75,
    "sleep_quality": 88
  },
  "message": "Great job! Keep up the healthy behavior."
}
```

**Sub-endpoints:**

#### GET /api/health/history
```http
GET /api/health/history?days=30&type=sedentary
```
Returns historical health events and trends.

#### GET /api/health/wearable
```http
GET /api/health/wearable?source=apple_health
```
Sync wearable device data (Phase 2).

#### POST /api/health/acknowledge
```http
POST /api/health/acknowledge
Content-Type: application/json

{
  "reminder_id": "health_001"
}
```
Dismiss/acknowledge a reminder.

**Response:**
```json
{
  "status": "acknowledged",
  "reminder_id": "health_001",
  "next_reminder": "2026-02-20T18:15:00Z"
}
```

**Error Codes:**
- `200` - Success
- `400` - Invalid parameters
- `401` - Unauthorized
- `404` - Reminder not found
- `500` - Server error

---

## 🏠 Tuya Device Control API

### POST /api/tuya/command

Send command to Tuya-connected smart devices.

**Request:**
```http
POST /api/tuya/command
Authorization: Bearer <tuya_access_token>
Content-Type: application/json

{
  "device_id": "desk_lamp_001",
  "command": "turn_on"
}
```

**Request Body:**
```json
{
  "device_id": "desk_lamp_001",
  "command": "turn_on",
  "parameters": {
    "brightness": 80,
    "color_temperature": "warm"
  },
  "delay_seconds": 0
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `device_id` | string | Yes | Tuya device ID |
| `command` | string | Yes | Command to execute |
|`parameters` | object | No | Command-specific parameters |
| `delay_seconds` | integer | No | Delay before execution |

**Common Commands:**
| Device Type | Commands | Parameters |
|-------------|----------|-----------|
| Light | `turn_on`, `turn_off`, `set_brightness`, `set_color` | `brightness` (0-100), `color_temp` |
| Thermostat | `set_temp`, `set_mode` | `temperature`, `mode` (heat/cool) |
| Door Lock | `lock`, `unlock` | None |
| Plug | `turn_on`, `turn_off` | None |
| Curtain | `open`, `close`, `set_position` | `position` (0-100) |

**Response (200 OK):**
```json
{
  "status": "success",
  "device_id": "desk_lamp_001",
  "command": "turn_on",
  "executed_at": "2026-02-20T16:45:32Z",
  "result": {
    "power": "on",
    "brightness": 100,
    "color_temp": "warm"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Invalid command",
  "device_id": "desk_lamp_001",
  "message": "Command 'invalid_cmd' not supported for device type 'light'",
  "supported_commands": ["turn_on", "turn_off", "set_brightness", "set_color"]
}
```

**Sub-endpoints:**

#### GET /api/tuya/devices
```http
GET /api/tuya/devices
```
List all paired Tuya devices.

**Response:**
```json
{
  "devices": [
    {
      "device_id": "desk_lamp_001",
      "name": "Desk Lamp",
      "type": "light",
      "status": "on",
      "room": "Office",
      "power": "on",
      "brightness": 85,
      "battery": null
    },
    {
      "device_id": "office_plug_002",
      "name": "Coffee Maker",
      "type": "smart_plug",
      "status": "on",
      "room": "Office",
      "power": "on",
      "power_usage": "1200W",
      "battery": null
    }
  ],
  "total_devices": 2,
  "online_count": 2
}
```

#### GET /api/tuya/devices/:device_id/status
```http
GET /api/tuya/devices/desk_lamp_001/status
```
Get current device status.

#### POST /api/tuya/scene
```http
POST /api/tuya/scene
Content-Type: application/json

{
  "scene_id": "work_mode",
  "name": "Work Mode"
}
```
Execute a predefined scene (multiple devices).

---

## 🔄 Voice Commands Integration

Typical voice command flow:

```
1. User: "Hey T5, set brightness to 50 percent"
   ↓
2. Voice Engine: Hotword detected → STT conversion
   ↓
3. Intent Parser: Command = "set_brightness", device = "lamp", value = 50
   ↓
4. API Request: POST /api/tuya/command
   {
     "device_id": "desk_lamp_001",
     "command": "set_brightness",
     "parameters": { "brightness": 50 }
   }
   ↓
5. Response: { "status": "success" }
   ↓
6. TTS Synthesis: "Setting brightness to 50 percent"
   ↓
7. User: Hears confirmation
```

---

## 📊 Analytics API (Phase 2)

### POST /api/analytics/event

Log user interactions for analytics.

```http
POST /api/analytics/event
Content-Type: application/json

{
  "event_type": "voice_command",
  "event_name": "schedule_query",
  "timestamp": "2026-02-20T16:45:32Z",
  "duration_ms": 1250,
  "success": true
}
```

---

## ⚙️ System API

### GET /api/health/status

Device health status.

**Response:**
```json
{
  "status": "healthy",
  "cpu_usage": 32,
  "memory_usage": 48,
  "disk_usage": 62,
  "uptime_hours": 24,
  "last_reboot": "2026-02-19T16:45:00Z",
  "services": {
    "voice_engine": "running",
    "schedule_service": "running",
    "health_service": "running",
    "device_controller": "running",
    "ui_service": "running"
  }
}
```

### POST /api/system/reboot

Restart the device (admin only).

---

## 🔗 Webhook Events (Phase 2)

Subscribe to real-time events:

```http
POST /api/webhooks/subscribe
Content-Type: application/json

{
  "event_types": ["schedule_change", "device_status", "health_reminder"],
  "webhook_url": "https://your-app.com/webhook",
  "secret": "webhook_signing_secret"
}
```

**Webhook Events:**
- `schedule.event_added`
- `schedule.event_updated`
- `schedule.event_deleted`
- `device.status_changed`
- `device.added`
- `device.removed`
- `health.reminder_triggered`
- `system.error`

---

## 📈 Rate Limiting

**Phase 1 (Development):** No limits  
**Phase 2 (Production):**
- Standard tier: 100 requests/minute
- Premium tier: 1000 requests/minute
- Enterprise: Custom limits

---

## 🔒 Security

### API Key Management
```bash
# Generate new API key
POST /api/auth/keys

# Revoke key
DELETE /api/auth/keys/:key_id
```

### TLS/SSL
- All Phase 2 endpoints require TLS 1.3
- Certificate pinning for mobile apps

### Rate Limiting & DDoS Protection
- CloudFlare or similar CDN
- Geographic IP blocking (configurable)
- Request validation & sanitization

---

## 📚 SDK Examples

### Python
```python
import requests

# Get schedule
response = requests.get('http://localhost:3001/api/schedule')
schedule = response.json()

# Control device
device_cmd = {
    "device_id": "desk_lamp_001",
    "command": "turn_on"
}
response = requests.post(
    'http://localhost:3001/api/tuya/command',
    json=device_cmd
)
```

### JavaScript/Node.js
```javascript
// Get health reminders
const healthResponse = await fetch('http://localhost:3001/api/health');
const health = await healthResponse.json();

// Send device command
const deviceCommand = {
  device_id: "desk_lamp_001",
  command: "set_brightness",
  parameters: { brightness: 75 }
};

const response = await fetch('http://localhost:3001/api/tuya/command', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(deviceCommand)
});
```

### cURL
```bash
# Get schedule
curl http://localhost:3001/api/schedule

# Get health
curl http://localhost:3001/api/health

# Control device
curl -X POST http://localhost:3001/api/tuya/command \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "desk_lamp_001",
    "command": "turn_on"
  }'
```

---

## 🐛 Debugging

### Enable Debug Logs
```
DEBUG=t5-assistant:* npm start
```

### Test Endpoints
```bash
# Test schedule endpoint
curl -v http://localhost:3001/api/schedule

# Test health endpoint
curl -v http://localhost:3001/api/health

# Test device command (mock should accept any command)
curl -X POST http://localhost:3001/api/tuya/command \
  -H "Content-Type: application/json" \
  -d '{"device_id":"lamp","command":"turn_on"}'
```

---

## 📝 Changelog

### v1.0.0 (Current)
- Basic schedule API
- Health reminders API
- Tuya device control API
- Mock server implementation

### Planned (v2.0.0)
- Production cloud deployment
- OAuth2 authentication
- Advanced analytics
- Webhook support
- WebSocket real-time updates
- Mobile app SDKs

---

**API Version:** 1.0.0  
**Last Updated:** February 07, 2026  
**Status:** Production-Ready for Submission
