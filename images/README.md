# EEG Image Asset Pipeline

This folder holds every real photo/graphic used on the site. The site never hard-codes
an image path inline — every `<img>` is wired through **`assets/image-manifest.js`**,
so swapping a picture is a two-step job:

1. Drop the new file into the matching subfolder below, using the **exact filename**
   the manifest expects (or update the manifest's `src` if you'd rather rename it).
2. Commit + push to `main`. GitHub Pages redeploys automatically — no HTML/JS changes needed.

If a file is missing or fails to load, the site falls back cleanly to the existing
vector logo mark / gradient background / icon cards — nothing ever shows a broken-image icon.

## Folder map

| Folder | Used for | Expected filename(s) | Status |
|---|---|---|---|
| `images/logo/` | Header + footer brand mark; `eeg-logo-with-flags.jpg` powers the partnership badge in the Trust section | `eeg-logo.jpg`, `eeg-logo-with-flags.jpg` | ✅ delivered |
| `images/hero/` | Homepage hero background | `hero-school.jpg` | ✅ delivered |
| `images/programs/` | Crèche / Maternelle / Primaire banner (shown above the "Nos Cycles" section) | `niveaux-creche-maternelle-primaire.jpg` | ⏳ not yet provided |
| `images/admissions/` | Admissions section banner + downloadable flyer | `admissions-2025-2026.jpg` | ✅ delivered |
| `images/facilities/` | Campus & Facilities cards (one per card) | `classroom.jpg` ✅, `computer-lab.jpg`, `library.jpg`, `sports-field.jpg`, `slojd-workshop.jpg`, `garden.jpg` | classroom delivered; rest pending |
| `images/news/` | Calendar/News feed cards | `news-1.jpg`, `news-2.jpg`, `news-3.jpg` | ⏳ not yet provided |
| `images/leadership/` | Leadership/faculty profile photos, once named | `lead-1.jpg`, `lead-2.jpg`, `lead-3.jpg` | ⏳ not yet provided |
| `images/archive/` | Superseded assets kept for record, not referenced anywhere on the site | `admissions-2024-superseded.jpg` | ✅ archived (2024 flyer replaced by the 2026 one) |

## Adding a brand-new image slot

Add a new entry to the `EEG_IMAGES` object in `assets/image-manifest.js` with a `src`
path and bilingual `alt` text, then reference that key from an `<img data-asset="yourKey">`
tag (or call `mountImage('yourKey', ...)` for a load-probed background image). See the
comments at the top of `assets/image-manifest.js` for the exact pattern.
