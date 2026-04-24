# Scrape Report — Krishna Public School (legacy)

- Source: https://www.krishnapublicschoolmeerut.in
- Scraped at: 2026-04-24T05:59:05.847Z
- Pages attempted: 58
- Pages OK: 58
- Pages failed: 0
- Content images (captcha/logo excluded): 170
- Download files (PDF/DOC/etc.): 97
- Homepage slider images: 26
- Notice board items: 0

## Pages by kind

- home: 2
- about: 1
- message: 2
- mission: 1
- vision-mission: 1
- moto: 1
- song: 1
- cocurricular: 1
- photo-gallery-index: 1
- downloads: 1
- school-info: 1
- contact: 1
- homework-index: 1
- infrastructure: 13
- gallery-category: 15
- homework-category: 15

## Gallery categories captured

- 1: IMAGE GALLERY
- 2: FUNCTION
- 3: pariksha pe charcha
- 4: TOPPERS 2019 - 20
- 5: TOPPERS 2020-2021
- 6: TOPPERS 2021-2022
- 9: RESULT - 2022 - 23
- 11: KRISHNA NEWS
- 12: RESULT 2023-24

Unnamed gallery IDs: 7, 8, 10, 13, 14, 15 (some contain images — flagged as "Archive Gallery N").

## Homework categories captured

- 1: CLASS IST
- 2: CLASS IIND
- 3: CLASS IIIRD
- 4: CLASS IVTH
- 5: CLASS VTH
- 6: CLASS VITH
- 7: CLASS VIITH
- 8: CLASS VIIITH
- 9: CLASS IXTH
- 10: CLASS XTH
- 11: CLASS XITH
- 12: CLASS XII
- 13: NURSERY
- 14: LKG
- 15: UKG

## Content gaps — Phase 2 should address these

- director portrait image not found
- infrastructure InfraId=4 "Music Room" has no images
- infrastructure InfraId=7 has no heading — empty record
- infrastructure InfraId=8 has no heading — empty record
- infrastructure InfraId=10 has no heading — empty record
- infrastructure InfraId=11 has no heading — empty record
- gallery GalleryCatId=7 has 1 images but no title — flagged as archive
- gallery GalleryCatId=10 has 3 images but no title — flagged as archive
- notice board: no entries captured by scraper — will need manual seed
- school-info: legacy page has no disclosure body — needs full Phase 2 authoring
- homework DCatId=11 CLASS XITH: no PDFs

## Legacy chrome observations

The legacy layout repeats "Notice Board", "We're Social", "Contact Info",
"Usefull Links" and a "Study Material Verify TC" nav on every page; the
transform strips these. The PHP captcha (`simple-php-captcha.php`) leaks as an
image on every page — also stripped. Copyright reads "© 2017", i.e. the site
has not had a content refresh in 8 years.

## Files emitted

- src/content/scraped/messages.ts
- src/content/scraped/about.ts
- src/content/scraped/facilities.ts
- src/content/scraped/gallery.ts
- src/content/scraped/downloads.ts
- src/content/scraped/notices.ts
- src/content/scraped/school-info.ts
- src/content/scraped/contact.ts
- src/content/scraped/homework.ts
- src/content/scraped/slider.ts

## Errors during fetch

- (none)

## What's next

See the project [README](../../README.md) for quickstart, and
[docs/PROGRESS.md](../../docs/PROGRESS.md) for the log of what each phase
produced.
