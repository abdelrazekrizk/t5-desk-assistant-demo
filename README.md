# t5-desk-assistant-demo

**One-liner:** Voice-first desktop assistant for schedule queries, health nudges, and Tuya device control.



# T5 Desk Assistant — Video & Submission 📽️


**One-line:** Voice-first desktop assistant demo showcasing quick schedule queries, health nudges, and Tuya device control.

---

## Links

- **Repository:** https://github.com/abdelrazekrizk/t5-desk-assistant-demo
- **Demo Video (YouTube):** https://www.youtube.com/watch?v=QkxGZkfOvdM

---

## Quick demo summary

- Length: **~90s**
- Key moments: hotword → schedule query → health nudge → toggle desk lamp (Tuya mock)
- Local playback filename suggestion: `t5_desk_assistant_90s_demo_1280x720.mp4`

---
## Files & structure

- `server/` — mock API for schedule/health/tuya
- `client/` — demo UI (hotword buttons, TTS)
- `Doc/Project_Intro.pdf` — one-page intro (submission-ready)

## How to run this demo locally (fast)

1. Install dependencies:

```bash
cd /t5-desk-assistant-demo/server
npm install
```

2. Start the mock server:

```bash
npm start
# server listens on http://127.0.0.1:3001
```

3. Run smoke tests (optional):

```bash
node server/run_and_test_server.js
```

4. Open the UI:

- Open `t5-desk-assistant-demo/client/index.html` in a browser and follow the buttons from the storyboard.

---

## Reproduce / record the demo (automation)

1. Install Playwright browsers:

```bash
npm run install-browsers
```

2. Run the Playwright recording script:

```bash
npm run record-demo
# Output: videos/*.webm
```

3. Convert webm to MP4 (example using ffmpeg):

```bash
ffmpeg -i videos/clip.webm -c:v libx264 -crf 23 -c:a aac -b:a 128k t5_desk_assistant_90s_demo_1280x720.mp4
```

4. If multiple webm files were produced, concatenate then convert:

```bash
# create list.txt with lines like: file 'videos/part1.webm'\nfile 'videos/part2.webm'
ffmpeg -f concat -safe 0 -i list.txt -c copy combined.webm
ffmpeg -i combined.webm -c:v libx264 -crf 23 -c:a aac final.mp4
```

## Submission checklist (for judges)

- [ ] One-page PDF: `.doc/Project_Intro.pdf`
- [ ] Demo video on YouTube (link above)
- [ ] Repo pushed to GitHub (link above)
- [ ] Smoke tests pass: `node server/run_and_test_server.js`

---

## Contact & License

- **Author:** Abdelrazek Rizk — GitHub: @abdelrazekrizk
- **License:** MIT 

--