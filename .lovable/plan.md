## Personalize the site with Maithili's details

Wire in the content you've shared, leave clean placeholders for what's coming later.

### 1. Name & nicknames → Cover, Magazine, Letter

- `Cover.tsx`: change `NAME` from `"AMARA"` to `"MAITHILI"`. Add nicknames as a rotating subtitle under the masthead — *baby · bachha · madam ji* — animated in sequence.
- `EditorsNote.tsx`: weave the nicknames into the editor's letter so it reads personal.
- Cover lines updated to: *The Woman, The Myth* / *A Letter From Krishna* / *Top 10 Memories*.

### 2. Birthday → 06 June 2009 (turning 17)

- `Countdown.tsx`: replace the auto-May-2 logic with a fixed June 6 anchor that picks the next upcoming June 6 each year. Heading becomes *Until her seventeenth*.
- Add a small "17" monogram flourish on the cover and on the countdown "Today" state.

### 3. Favourite song = "PERFECT" (her)

- `MusicToggle.tsx`: replace the track label with *Now playing — "You" (her favourite)* and style the toggle as a vinyl-needle indicator. Audio file you'll send later; for now it points to a silent placeholder so the UI still works.

### 4. The letter (full text from you)

- `Letter.tsx`: replace the placeholder letter with your exact text, preserving the all-caps emphasis and line breaks. Title becomes *To, the love of my life*. Sign-off styled in handwritten script: *Yours, only yours — Krishna*.
- Typewriter speed slowed slightly so the all-caps reads with weight, not noise.

### 5. Magazine personalization (text-only pass)

- Issue masthead: *Maithili · The 17th Edition*.
- "The Interview" answers kept generic but Q's tweaked to feel like her.
- "Top 10 Memories" left as labelled placeholders so we can drop in real ones when you send them.
- **Final page reserved for the video edit** — a dedicated last spread titled *"And finally — press play"* with a video frame placeholder. When you send the video, I drop it in and it autoplays when that page is flipped open.

### 6. Placeholders staying clean

- Style File (6 frames), Memory Timeline photos, Polaroid grid → all keep their elegant "No. 1 / No. 2…" placeholder treatment so the site looks intentional until you send images.
- Passcode hint on the gate: I'll add a soft hint line *"the name only I call you"* — tell me if you want different wording, or leave it blank.

### What I still need from you (later, no rush)

- Photos (timeline, style file, cover portrait)
- The video edit (for the magazine's final page)
- The passcode itself (already a secret — confirm it's set), and the hint text you want shown
- Any friends' letters for the "Letters to the Editor" page

### Technical notes

- Files touched: `Cover.tsx`, `EditorsNote.tsx`, `Letter.tsx`, `Countdown.tsx`, `Magazine.tsx`, `MusicToggle.tsx`.
- No schema or backend changes. No new dependencies.
- Letter text rendered with `whitespace-pre-wrap` so your line breaks survive exactly as written.