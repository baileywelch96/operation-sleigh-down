# Operation Sleigh Down

SES Christmas training exercise plan for trainers. Vite + React + TypeScript.

## Run it locally

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

## Put it on GitHub Pages

1. Create a new repo on GitHub, e.g. `operation-sleigh-down`.
2. Push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Operation Sleigh Down"
   git branch -M main
   git remote add origin https://github.com/baileywelch96/operation-sleigh-down.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → GitHub Actions**.
4. Wait for the **Actions** tab to go green. Your site is at
   `https://baileywelch96.github.io/operation-sleigh-down/`

Every push to `main` redeploys it.

## Editing

| To change… | Edit |
| --- | --- |
| Any wording, cards, times, materials | `src/content.ts` |
| Page order, titles, intro lines | `src/sections.ts` |
| Colours and fonts | top of `src/styles.css` |
| The Mayday voice | add `public/mayday.mp3` (script in `public/README-audio.txt`) |

Wrap text in `**double asterisks**` in `content.ts` to make it bold.

## How it works

- `#/` plays the Mayday intro, `#/title` jumps to the title screen, `#/briefing` etc. are the section pages. Hash links work on GitHub Pages with no extra setup and can be sent directly.
- Left and right arrow keys move between pages.
- Tick boxes (materials, setup, questions) save in each person's own browser only.
- Without `mayday.mp3`, Santa speaks with a computer voice over radio static. The voice, pitch and speed are fixed in `voiceDefaults` in `src/content.ts`.
- With `mayday.mp3`, your recording plays through a radio filter instead.
