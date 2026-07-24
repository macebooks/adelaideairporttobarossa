# Image Shotlist — AdelaideAirportToBarossa.com.au

Art direction: **"The Itinerary"** — an editorial travel-document / private-concierge aesthetic. Images are treated as **inset printed plates** (thin ink border, small monospace caption underneath), NOT glossy full-bleed hero backgrounds. All imagery is **muted, grainy, film-stock** — desaturated, overcast, quiet. The page also applies a light CSS `saturate(.82)` filter to every plate for consistency.

> **Status:** A film-toned Imagen-4 set is **already generated and wired** into `index.html` (slots marked ✅ below), living in `assets/img/`. Testimonial ("passenger notes") avatars are monogram/initials — **no AI faces** (correct). Prices, `[PHONE]`, and ABN remain placeholders in copy.

Palette to match: paper `#efe7d6` / `#f5f0e6`, ink `#1c1a17`, oxblood `#8a2f24`, botanical green `#3d4a3a`. Keep future images muted and grainy — avoid glossy, saturated, or "premium-stock" looks (that reads AI-generated).

General specs for any replacement: export WebP (+ JPEG fallback), sRGB, quality 80–85, strip EXIF/GPS.

---

## 1. HERO — "Plate I", the road up into the valley ✅ in place (`assets/img/hero-road.jpg`, 1408×768, preloaded + eager, `fetchpriority=high`)
Rendered as a **bordered inset plate** in the hero left column with a mono caption ("Plate I — the road up into the valley / Sturt Hwy, SA"), NOT a full-bleed background.

**(a) Ideal real photo:** A moody, overcast country road curving up into the vine-covered hills on the Sturt Highway approach to the Barossa. Low contrast, soft light, film grain, no glare. Quiet and cinematic rather than glossy-golden.

**(b) Gemini / Imagen prompt (if regenerating):**
> A moody overcast country road curving into low vine-covered hills, South Australia wine country, shot on 35mm film stock, muted desaturated palette of warm stone, faded green and grey sky, soft flat light, visible film grain, quiet cinematic editorial travel mood, no people, no text, no glossy saturation. Aspect ratio 16:9.

---

## 2. HOW-IT-WORKS band — "Plate II", gate to grape ✅ in place (`assets/img/car-window.jpg`, 1200×655, lazy)
Inset plate beside the four itinerary "legs".

**(a) Ideal real photo:** The view of vineyard rows and a stone gateway seen **through a car side mirror or side window** on the drive in — journey-perspective, "gate to grape". Muted, slightly grainy.

**(b) Gemini / Imagen prompt:**
> View through a car side mirror of Barossa vineyard rows and an old stone gateway, journey point-of-view, 35mm film look, muted desaturated tones, soft overcast light, subtle grain, reflective glass, no people, no text. Aspect ratio 16:9.

---

## 3. VEHICLE — "Plate III", the car on the road ✅ AI stand-in in place (`assets/img/sedan-road.jpg`, 1000×545, lazy) — **swap for the operator's real vehicle**
Caption already flags it as a demo to replace.

**(a) Ideal real photo:** The operator's **actual** dark sedan on an open country road, understated, film-toned — not a glossy showroom shot.

**(b) Gemini / Imagen prompt (atmosphere stand-in only):**
> A dark sedan on an open country road through South Australian farmland, understated, shot on 35mm film, muted overcast light, faded colour, visible grain, no brand badges or number plates, no people, quiet editorial mood. Aspect ratio 16:9.

---

## 4. WINERY ADD-ON — "Plate IV", a glass by the window ✅ in place (`assets/img/table-wine.jpg`, 900×630, lazy)
Inset plate on the botanical-green day-tour band (plate uses a darker green border variant).

**(a) Ideal real photo:** A single quiet glass of red wine on a table beside a window, soft daylight, muted film tones — restrained, not a busy "wine lifestyle" scene.

**(b) Gemini / Imagen prompt:**
> A single glass of red wine on a wooden table beside a window with soft daylight, quiet and restrained, 35mm film stock, muted desaturated palette, gentle grain, shallow depth of field, no people, no text. Aspect ratio 10:7.

---

## 5. `vine-detail.jpg` (900×630) — old Shiraz vines, film ✅ generated, held in reserve
Currently **not placed** on the page (the layout uses Plates I–IV). Keep on hand as an optional swap for Plate II/IV, a future gallery, or an OG variant.

**(b) Gemini / Imagen prompt:**
> Close detail of gnarled old Shiraz grapevines in a Barossa vineyard, textured trunks and leaves, 35mm film stock, muted earthy tones, soft overcast light, visible grain, no people, no text. Aspect ratio 10:7.

---

## 6. OG / SOCIAL SHARE ✅ in place (`assets/img/og-image.jpg`, 1200×655) — referenced by `og:image` + `twitter:image`
Film-toned share crop. If regenerating, keep a darker/quieter zone for any overlaid wordmark.

**(b) Gemini / Imagen prompt:**
> Social share image, film-toned Barossa vine hills and country road under overcast sky, muted desaturated palette, 35mm grain, calm editorial travel mood, quiet area on one side for a wordmark, no baked-in text. Aspect ratio 1.83:1.

---

## 7. PASSENGER-NOTE avatars — monogram/initials only (no image files)
**Do not** generate or use AI faces or stock people as real customers. Keep the mono initial tiles until genuine, consented guest photos exist.

---

## Replacement checklist before launch
- [x] Hero plate (`hero-road.jpg`) in place, preloaded + eager; OG image in place.
- [x] Journey plate (`car-window.jpg`) and add-on plate (`table-wine.jpg`) in place — film-toned, fine to keep.
- [ ] Swap the vehicle plate (`sedan-road.jpg`) for a photo of the operator's **real** sedan/van (keep the muted film treatment for consistency).
- [ ] Replace placeholder "passenger notes" with genuine, consented guest reviews (avatars stay monograms unless real, consented photos exist).
- [ ] Optional: convert JPEGs to WebP (+ JPEG fallback) for a further ~30% weight cut.
- [x] Below-fold plates use `loading="lazy"` + explicit `width`/`height`; hero is eager/preloaded.
- [ ] Strip EXIF/GPS metadata from any real photos added later.
