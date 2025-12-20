const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const serverPath = path.join(__dirname, 'index.js');
const proc = spawn('node', [serverPath], { stdio: ['ignore', 'pipe', 'pipe'] });

proc.stdout.on('data', (d) => process.stdout.write(d));
proc.stderr.on('data', (d) => process.stderr.write(d));

function waitForServer(url, attempts = 20) {
  return new Promise((resolve, reject) => {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      http.get(url, (res) => {
        const { statusCode } = res;
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          clearInterval(timer);
          resolve({ statusCode, body: data });
        });
      }).on('error', (err) => {
        if (tries >= attempts) {
          clearInterval(timer);
          reject(err);
        }
      });
    }, 500);
  });
}

(async () => {
  try {
    const schedule = await waitForServer('http://127.0.0.1:3001/api/schedule');
    console.log('SCHEDULE:', schedule.body);
    const health = await new Promise((res, rej) => {
      http.get('http://127.0.0.1:3001/api/health', (r) => {
        let d = '';
        r.on('data', (c) => d += c);
        r.on('end', () => res(d));
      }).on('error', rej);
    });
    console.log('HEALTH:', health);

    const postData = JSON.stringify({ command: 'toggle_light' });
    const opts = { hostname: '127.0.0.1', port: 3001, path: '/api/tuya/command', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) } };
    const req = http.request(opts, (res) => {
      let d = '';
      res.on('data', (c) => d += c);
      res.on('end', () => {
        console.log('TUYA POST:', d);
        proc.kill();
      });
    });
    req.on('error', (e) => { console.error('POST ERR', e); proc.kill(); });
    req.write(postData);
    req.end();
  } catch (err) {
    console.error('Test failed:', err);
    proc.kill();
    process.exit(1);
  }
})();