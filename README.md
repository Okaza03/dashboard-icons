# Dashboard Icons

A tiny repo of service/app logos rendered to PNG + WebP at multiple sizes from SVG source.

## Quick use

- PNG (256):  
  `https://raw.githubusercontent.com/okaza03/dashboard-icons/main/png/256/pihole.png`

- WebP (256):  
  `https://raw.githubusercontent.com/okaza03/dashboard-icons/main/webp/256/pihole.webp`

- SVG:  
  `https://raw.githubusercontent.com/okaza03/dashboard-icons/main/svg/pihole.svg`

> Swap `pihole` and sizes (`64, 128, 256, 512`) as needed.

## Adding icons
1. Add an SVG to `svg/your-icon.svg`.
2. Push to `main`. GitHub Actions will generate PNG/WebP + `index.json`.

## Naming rules
- File name = lower-kebab-case (`home-assistant.svg`, `pi-hole.svg` → `pihole.svg`).
- Transparent background only.
- Square viewBox preferred (e.g., `0 0 512 512`).

## Legal
- Many brand assets are trademarks. Use at your own discretion and follow brand guidelines.
- If using Simple Icons SVGs, they’re under CC0, but trademarks still apply.
