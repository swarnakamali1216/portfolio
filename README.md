# ⚡ Swarna.T — Portfolio

> AI Engineer · Full-Stack Developer · Next.js 15 + Tailwind CSS + TypeScript

---

## 📁 Project Structure

```
swarna-portfolio/
│
├── frontend/                          ← Next.js 15 App
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx             ← Root layout + fonts + metadata
│   │   │   └── page.tsx               ← Main page (assembles all sections)
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx         ← Frosted glass nav + mobile drawer
│   │   │   │   └── Footer.tsx         ← Footer with links
│   │   │   │
│   │   │   ├── sections/
│   │   │   │   ├── Hero.tsx           ← Typewriter + Stats + Marquee
│   │   │   │   ├── About.tsx          ← Bio + Education + Contact info
│   │   │   │   ├── Skills.tsx         ← Category tabs + Progress bars
│   │   │   │   ├── Experience.tsx     ← Timeline layout (3 internships)
│   │   │   │   ├── Projects.tsx       ← Project cards + tech tags
│   │   │   │   ├── Certifications.tsx ← 4 cert cards
│   │   │   │   └── Contact.tsx        ← Contact form + info links
│   │   │   │
│   │   │   └── ui/
│   │   │       ├── ScrollProgress.tsx ← Top progress bar
│   │   │       └── CustomCursor.tsx   ← Lerp-smoothed cursor
│   │   │
│   │   ├── data/
│   │   │   └── portfolio.ts           ← ALL resume content (single source)
│   │   │
│   │   ├── lib/
│   │   │   └── useReveal.ts           ← Intersection Observer scroll hook
│   │   │
│   │   └── styles/
│   │       └── globals.css            ← CSS variables + base + utilities
│   │
│   ├── public/
│   │   └── resume.pdf                 ← Add your resume PDF here
│   │
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Start

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✨ 2026 Features Included

| Feature                  | Description |
|--------------------------|-------------|
| 🔤 Typewriter effect     | Role text animates through 5 titles |
| 📊 Scroll progress bar   | Shimmer gradient line at top of page |
| 🖱️ Custom cursor         | Lerp-smoothed dot + ring follower |
| 🎭 Reveal animations     | Intersection Observer fade-up on scroll |
| 🔮 Frosted glass navbar  | backdrop-blur with active section tracking |
| 📱 Mobile drawer         | Hamburger menu with slide-in animation |
| 💫 Floating orbs         | CSS-only ambient background glow |
| 🔵 Skill progress bars   | Animated on scroll entry |
| 📜 Skill tabs            | Category switcher with animation |
| ✉ Contact form          | With loading spinner and success state |
| 🏷️ Tech marquee          | Infinite scrolling skill ticker |
| 🎨 CSS custom properties | Full design token system |

---

## 🎨 Design System

| Token      | Value     | Usage |
|------------|-----------|-------|
| `--sky`    | `#0EA5E9` | Primary actions, links |
| `--sky-deep`| `#0284C7` | Hover states, buttons |
| `--ink`    | `#0C1A2E` | Headings, strong text |
| `--ink-soft`| `#64748B` | Body copy |
| `--bg`     | `#F8FBFF` | Page background |

**Fonts:** Playfair Display (headings) + Plus Jakarta Sans (body) + Space Grotesk (mono/labels)

---

## 📦 Dependencies

```json
{
  "next": "15.x",
  "react": "^18.x",
  "framer-motion": "^11.x",
  "tailwindcss": "^3.x",
  "typescript": "^5.x"
}
```

---

## 🔧 Customisation

All content lives in **one file** → `src/data/portfolio.ts`

Update your real metrics there and everything updates across the site.

---

© 2026 Swarna T. 
