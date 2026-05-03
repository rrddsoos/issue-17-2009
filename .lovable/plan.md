## Two changes

### 1. Fix the "now playing" label

In `MusicToggle.tsx`, replace the current label *"You" — her favourite* with simply:

> Now playing — *"Perfect"*

No more subtitle, no "her favourite". Same vinyl toggle, same placement.

### 2. New section: The Memory Wall (videos)

A new component `MemoryWall.tsx`, slotted into `Index.tsx` between `Magazine` and `Letter` so it reads as a feature spread inside the issue.

**Theme match (cream paper · burgundy · gold · grain texture):**

- Section header styled like the rest of the magazine: tiny tracked uppercase eyebrow (*Feature · The Memory Wall*), display-serif title *"Moving pictures."*, italic serif subtitle *"Press play, on us."*
- Background: `bg-cream-deep` with the shared grain overlay so it sits naturally between Magazine and Letter.
- Hairline gold dividers consistent with other sections.

**Layout — a polaroid-style video wall:**

```text
┌─────────┐   ┌─────────┐   ┌─────────┐
│  ▶ vid  │   │  ▶ vid  │   │  ▶ vid  │
│         │   │         │   │         │
└─ caption┘   └─ caption┘   └─ caption┘
   tilt -2°      tilt +1.5°     tilt -1°
```

- 6 video tiles in a responsive grid (1 col mobile, 2 sm, 3 md+).
- Each tile uses the existing `polaroid` class with a slight random rotation (framer-motion `whileInView` fade + tilt-in) — visually consistent with `MemoryTimeline` and the Style File spread.
- Each tile shows: video thumbnail/poster, a centered ▶ play button (same circular cream-bordered style used on Magazine page 10), and a handwritten caption in `font-hand text-burgundy` underneath.
- Click a tile → opens a lightbox modal (Radix `Dialog`, already in the project) with the video playing full-size, dark backdrop, grain overlay, close on click-outside / Esc.

**Video sources:**

- Component accepts a `videos` array `{ src, poster?, caption }`.
- For now, ship with 6 placeholder slots labelled *Reel No. 1 … No. 6* with empty `src` — same intentional-placeholder treatment as the Style File and Memory Timeline. When you send the videos, we drop them into the array (or upload to Lovable Cloud storage and reference the public URLs).

**Behavior details:**

- Videos are `<video>` tags, `playsInline`, `preload="metadata"`, no autoplay in the grid (only in the lightbox).
- Pause any playing video when the modal closes.
- Respects `prefers-reduced-motion` for the tilt animation.

### Files touched

- edit `src/components/MusicToggle.tsx` (label only)
- create `src/components/MemoryWall.tsx`
- edit `src/pages/Index.tsx` (insert `<MemoryWall />` after `<Magazine />`)

No new dependencies, no backend changes.  
  
**on the cover page ill give you  a picture of her gradient it into the cover page where is says maithili like actual magazines**

### What I'll need from you later

- The video files (or URLs) and a one-line caption for each — send whenever, I'll wire them in.