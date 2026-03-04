# Portfolio — JD-gated booking site

A portfolio website where recruiters must upload a job description PDF. Claude scores the match against your profile, and only unlocks your Google Calendar booking embed if the score meets your threshold.

## Tech stack & cost

| Thing | Service | Cost |
|---|---|---|
| Hosting + CI/CD | Vercel free tier | $0 |
| AI analysis | Anthropic Claude Haiku | ~$0.001 per analysis |
| Calendar booking | Google Calendar embed | $0 |
| Domain | Your own | $0 extra |

**Estimated running cost: < $1/month** even with heavy recruiter traffic.

---

## Setup in 5 steps

### 1. Clone & install

```bash
git clone <your-repo>
cd portfolio
npm install
```

### 2. Get your Anthropic API key

- Go to [console.anthropic.com](https://console.anthropic.com)
- Create an account (free credits included)
- Create an API key under "API Keys"

### 3. Get your Google Calendar embed URL

1. Open [Google Calendar](https://calendar.google.com)
2. Click the gear → **Settings**
3. Under **My calendars**, click your calendar name
4. Scroll to **Integrate calendar**
5. Copy the **Public URL** or the `src` value from the embed `<iframe>`
6. Make sure the calendar is set to **public** (same settings page)

> **Tip**: Create a separate Google Calendar just for recruiter bookings so it only shows times you've blocked off for interviews.

### 4. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL=https://calendar.google.com/calendar/embed?src=...
NEXT_PUBLIC_MATCH_THRESHOLD=70
```

### 5. Personalise your profile

Open `app/api/analyze/route.ts` and edit the `MY_PROFILE` constant at the top:

```ts
const MY_PROFILE = `
Name: Your Name
Title: ...
Core skills: ...
...
`;
```

Also update the placeholder text in:
- `components/HeroSection.tsx` — name, links, tagline
- `components/AboutSection.tsx` — bio, stats
- `components/WorkSection.tsx` — projects
- `app/layout.tsx` — page title & meta description

---

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Then in the Vercel dashboard:
1. Go to your project → **Settings** → **Environment Variables**
2. Add all three variables from `.env.local`
3. Add your custom domain under **Domains**

That's it — Vercel auto-deploys on every `git push`.

---

## Adjusting the match threshold

The `NEXT_PUBLIC_MATCH_THRESHOLD` env var (default: `70`) controls when the calendar unlocks. Set it to:
- `60` — more open (unlocks for decent-fit roles)
- `75` — more selective
- `85` — very selective (only near-perfect matches)

---

## Architecture

```
Recruiter uploads PDF
        ↓
POST /api/analyze
  1. Validate file (PDF, <5MB)
  2. Extract text with pdf-parse
  3. Send to Claude Haiku with your profile
  4. Parse JSON response: {score, summary, skills, gaps}
        ↓
Client receives result
  score >= threshold → show Google Calendar iframe
  score < threshold  → show low-match message
```

The analysis is **stateless** — nothing is stored. Each upload is analysed fresh.

---

## Customisation ideas

- **Add rate limiting**: Use [Upstash Redis](https://upstash.com) (free tier) to limit analyses per IP
- **Add email notification**: Use [Resend](https://resend.com) (free tier) to get notified when someone uploads a JD
- **Password-protect** the result with a short code so only recruiters you've spoken to can unlock it
