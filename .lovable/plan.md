# Birthday Site — Editorial Luxury, Maximum Polish

A Vogue-style, password-gated birthday experience for your girlfriend. Cream + gold + ink palette, refined serif typography, slow editorial pacing, with a centerpiece e-magazine, scroll-driven memory timeline, handwritten letter, and a fireworks finale.

## Visual Direction

- **Palette:** Cream `#F4EFE6`, ink black `#0E0E10`, gold leaf `#C8A86B`, blush `#E8C7C0`, deep burgundy accent `#5B1A1A`
- **Typography:** Display serif (Playfair Display / Cormorant) + refined sans (Inter) + handwriting font (Caveat) for letter
- **Motifs:** Drop caps, pull quotes, hairline rules, gold foil shimmer, paper grain texture, polaroid edges
- **Motion language:**
  - Default entrance: blur-to-sharp + 20px rise, 700ms ease-out
  - Accent hero moments: spring with slight overshoot
  - Scene transitions: clip-path reveals & cross-dissolves
  - One coherent motion system applied everywhere

## Site Structure (single-page, scroll-driven + magazine sub-experience)

```
1. Loader        →  Gold monogram draws in, paper unfolds
2. Password Gate →  Editorial cover; her name + a hint; passcode unlocks
3. Cover Hero    →  "ISSUE 01 · HER BIRTHDAY" masthead, name letter-by-letter
4. Editor's Note →  Short intro from you, drop cap, pull quote
5. E-Magazine    →  3D page-flip book (centerpiece)
6. Memory Timeline → Horizontal parallax scroll of "us"
7. Handwritten Letter → Typewriter-reveal in Caveat font
8. Countdown    →  Live timer; at 00:00 morphs to "Happy Birthday"
9. Fireworks Finale → WebGL canvas + final photo + signature
```

## E-Magazine (the centerpiece)

A real page-flip book using `react-pageflip` (3D curl) with editorial spreads:

1. **Cover** — Her photo, masthead, cover lines ("The woman of the year", "Inside: 100 reasons", "Exclusive: a love letter")
2. **Table of Contents** — numbered, hairline rules
3. **Cover Story** — feature article about her, drop cap, pull quotes, polaroid inserts
4. **The Interview** — Q&A styled spread (her favorite things, inside jokes)
5. **Style File** — outfit/photo grid
6. **Top 10 Memories** — numbered editorial list with photos
7. **Horoscope of the Year** — playful predictions
8. **Letters to the Editor** — placeholder for friends/family notes (you'll add later)
9. **Back Cover** — gold foil "Happy Birthday" + signature

Magazine has its own immersive mode (click cover → expands fullscreen, ambient music swells, page flip sounds).

## Polish Layer (maximum detailing)

- **Smooth scroll** via Lenis
- **Custom cursor** — small ink dot + gold trailing ring; morphs over interactive elements
- **Ambient music** — soft piano loop, tasteful mute toggle in corner
- **Scroll-linked animations** — Framer Motion `useScroll` for parallax photos, masthead pinning, magazine title morphs
- **Page grain** — subtle SVG noise overlay
- **Gold foil shimmer** — animated gradient on key headings
- **Day → Dusk → Night** background gradient shift across scroll
- **Page transitions** between sections via clip-path reveals
- **Easter eggs:**
  - Konami code triggers a hidden love note
  - Triple-click the masthead drops confetti
  - Hover the cover photo long enough → secret polaroid stack appears
- **Loader** with progress and a draw-on monogram
- **Micro-detail:** hairline dividers, asymmetric grids, edge-aligned section labels, page numbers in corners

## Privacy

- **Passcode gate** before any content loads
- Implemented with **Lovable Cloud**: a single edge function verifies the passcode against a server-stored secret (never in client code) and issues a short-lived signed token kept in `sessionStorage`
- Wrong passcode → playful editorial 403 spread
- Optional hint shown ("Our anniversary, ddmm")

## Content Strategy ("Mix as we go")

I'll scaffold every section with elegant placeholders (lorem-style editorial copy, stock-style placeholder images via gradient + initials) and clearly mark each swap point. You drop content in incrementally — her name, photos, your letter, magazine articles, friends' notes — and I replace placeholders one section at a time.

## Technical Details

- React 18 + Vite + TypeScript + Tailwind (existing stack)
- **Animation:** Framer Motion (primary), GSAP only if needed for timeline scrubbing
- **Smooth scroll:** `lenis`
- **Page flip:** `react-pageflip`
- **Fireworks:** lightweight canvas particle system (no heavy WebGL deps)
- **Fonts:** Google Fonts — Playfair Display, Cormorant Garamond, Inter, Caveat
- **Auth:** Lovable Cloud edge function `verify-passcode` + secret `BIRTHDAY_PASSCODE`; client stores returned token in `sessionStorage`; `<Gate>` component blocks rendering until validated
- **Design tokens:** all colors/fonts/shadows defined in `index.css` + `tailwind.config.ts` as semantic HSL tokens (cream, ink, gold, blush, burgundy)
- **Routes:** `/` (gate → site), `/magazine` (immersive magazine view)
- **Accessibility:** `prefers-reduced-motion` disables heavy animations; mute by default for music with a clear toggle

## Build Order

1. Design system tokens, fonts, paper grain, cursor, Lenis, loader
2. Lovable Cloud + passcode gate
3. Cover hero + editor's note + scroll choreography
4. Memory timeline (horizontal parallax)
5. E-magazine with page-flip + 9 spreads
6. Handwritten letter + countdown
7. Fireworks finale
8. Easter eggs, ambient music, final polish pass
9. Spot-check key viewport states & reduced-motion fallback

## What I Need From You As We Go

Send these whenever ready (in any order):

- Her first name + nickname
- The passcode + an optional hint
- 8–15 favorite photos of her / you two
- Your letter text (or bullet points and I'll draft it editorially)
- A few inside jokes / favorite things for the Interview & Style File spreads
- Optional: an audio file for ambient music (else I'll use a royalty-free piano loop)

After you approve, I'll start with the design system + gate so you can see the vibe within the first build, then we layer in content.