## What changes

### 1. Make the magazine's "Press play" page a real fullscreen video experience

Right now, page 10 of `Magazine.tsx` is a static black box with a decorative ▶ icon. I'll wire it up so:

- The page shows a real `<video>` with a poster image (the photo you drop in).
- Clicking the ▶ button opens a **fullscreen lightbox** (Radix `Dialog`, already in the project) — black backdrop, grain overlay, video centered at max viewport size (`w-screen h-screen`, `object-contain`), native controls, autoplay on open, paused + reset on close, Esc / click-outside to close.
- A small "Enter fullscreen ⤢" affordance inside the lightbox calls the browser's native `requestFullscreen()` on the video element for true OS-level fullscreen (the one that hides the browser chrome).
- Respects `prefers-reduced-motion`; `playsInline` so it doesn't break on iOS.
- Same burgundy/gold/cream styling as the rest of the issue — no new design tokens.

The page itself stays inside the flipbook layout (so the magazine still flips normally); only the *playback* goes fullscreen.

### 2. Same fullscreen treatment for the Memory Wall reels

While I'm in there, I'll upgrade the existing `MemoryWall` lightbox the same way (true fullscreen button + larger default size), so all videos in the issue feel cinematic and consistent. Captions stay.

### 3. How you'll add the video and photos manually (no upload needed in chat)

Since the file is too large for chat, you drop them straight into the project's `public/` folder — Vite serves anything in `public/` at the root URL. Two clean options:

**Option A — local files in `public/` (simplest):**

```text
public/
  media/
    cover-story.mp4        ← the magazine page-10 film
    cover-story-poster.jpg ← the still frame shown before play
    reels/
      reel-01.mp4
      reel-01.jpg
      reel-02.mp4
      ...
      reel-06.mp4
      reel-06.jpg
```

Then in code I reference them as `/media/cover-story.mp4` etc. — no imports, no build step. You just drag-drop the files into `public/media/` in the Lovable file tree (or via GitHub if you've connected the repo) and they're live on next reload.

**Option B — Lovable Cloud Storage (recommended if files are >50 MB or you want CDN delivery):**

I'd create a public `media` bucket via a migration, you upload the videos through the Cloud → Storage UI, and I wire the public URLs into the components. Better for large files and faster playback worldwide. We can switch to this anytime — the component takes URLs either way.

For now I'll plan around **Option A** with the paths above. If you'd rather use Cloud Storage, say the word and I'll add the bucket + RLS in the same pass.

### Cover Story film + Memory Wall reels — what to name what

The cover-story page on the magazine wants **one** hero video (the main film). The Memory Wall wants up to **six** reels. Use these exact filenames so I don't have to ask again:

| Slot | Video file | Poster (optional) |
|---|---|---|
| Magazine p.10 hero | `public/media/cover-story.mp4` | `public/media/cover-story-poster.jpg` |
| Reel 1 | `public/media/reels/reel-01.mp4` | `public/media/reels/reel-01.jpg` |
| Reel 2 | `public/media/reels/reel-02.mp4` | `public/media/reels/reel-02.jpg` |
| Reel 3 | `public/media/reels/reel-03.mp4` | `public/media/reels/reel-03.jpg` |
| Reel 4 | `public/media/reels/reel-04.mp4` | `public/media/reels/reel-04.jpg` |
| Reel 5 | `public/media/reels/reel-05.mp4` | `public/media/reels/reel-05.jpg` |
| Reel 6 | `public/media/reels/reel-06.mp4` | `public/media/reels/reel-06.jpg` |

Posters are optional — if missing, the player just shows the first frame. MP4 (H.264 + AAC) is the safest format; `.mov` from iPhone usually works too but MP4 is more reliable across browsers.

### Files I'll touch

- `src/components/Magazine.tsx` — turn page 10's box into a real player + fullscreen dialog
- `src/components/MemoryWall.tsx` — upgrade the existing dialog to true fullscreen and wire `/media/reels/...` defaults

No new dependencies, no backend changes (unless you pick Option B).

### What I need from you to finish

1. Confirm **Option A (drop files into `public/media/`)** or **Option B (Cloud Storage bucket)**.
2. Drop the files in with the names above whenever ready — the page will work the moment they exist; missing files just show the placeholder.
