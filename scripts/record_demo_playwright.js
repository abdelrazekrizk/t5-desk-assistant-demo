const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const videoDir = path.resolve(__dirname, '..', 'videos');
  if (!fs.existsSync(videoDir)) {
    console.log('Creating videos directory:', videoDir);
    fs.mkdirSync(videoDir, { recursive: true });
  }
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: videoDir, size: { width: 1280, height: 720 } }
  });

  const page = await context.newPage();
  try {
    console.log('Navigating to demo UI...');
    await page.goto('http://127.0.0.1:3001/');

    // Short wait to let UI load and any TTS initialize
    await page.waitForTimeout(800);

    // Title card (we'll show the page as-is; you can overlay later in OBS) - 5s
    console.log('Showing title card...');
    await page.waitForTimeout(5000);

    // 05-20s: ask schedule
    console.log('Triggering schedule query...');
    await page.click('text="Ask: \"What\'s my schedule?\""');
    await page.waitForTimeout(3000);

    // 20-40s: health
    console.log('Triggering health query...');
    await page.click('text="Ask: \"Do I need a break?\""');
    await page.waitForTimeout(3000);

    // 60-75s: toggle light
    console.log('Triggering Tuya command...');
    await page.click('text="Toggle Desk Light"');
    await page.waitForTimeout(3000);

    // Wait briefly for any final audio
    await page.waitForTimeout(1500);

    // Close the page so Playwright saves the video
    const pages = context.pages();
    for (const p of pages) await p.close();
    await context.close();

    // Print video file path(s)
    try {
      const vids = fs.readdirSync(videoDir).filter(f => f.endsWith('.webm'));
      if (vids.length === 0) {
        console.warn('No .webm files found in', videoDir);
      } else {
        console.log('Videos written to:', videoDir);
        vids.forEach(v => console.log(' -', path.join(videoDir, v)));
      }
    } catch (e) {
      console.error('Failed to list videos in', videoDir, e);
    }
  } catch (err) {
    console.error('Recording failed:', err);
    await context.close();
    await browser.close();
    process.exit(1);
  }

  await browser.close();
  console.log('Done.');
})();