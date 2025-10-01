# Dashboard Icons (color + mono)

Generated PNGs from SVG sources. Two categories:
- `color` – full-color logos
- `mono` – black & white only

## Quick links

**Color (PNG 256):**
`https://raw.githubusercontent.com/okaza03/dashboard-icons/main/png/color/256/logo.png`

**Mono (PNG 256):**
`https://raw.githubusercontent.com/okaza03/dashboard-icons/main/png/mono/256/logo.png`

**SVG (color):**
`https://raw.githubusercontent.com/okaza03/dashboard-icons/main/svg/color/logo.svg`

**SVG (mono):**
`https://raw.githubusercontent.com/okaza03/dashboard-icons/main/svg/mono/logo.svg`

> Swap the size (`64, 128, 256, 512`) and the icon name.

## Adding icons
1. Put SVGs in the right folder:
   - Full-color → `svg/color/<name>.svg`
   - Black & white → `svg/mono/<name>.svg`
2. Push to `main`. CI builds PNGs and updates `index.json`.

## Naming rules
- File name = lower-kebab-case (`home-assistant.svg` → `homeassistant.svg` , `that-logo.svg` → `logo.svg`).
- Transparent background, square-friendly (`viewBox="0 0 N N"` is ideal).
- For `mono`, ensure pure black/white (no grays).

## Indexes
- `index.json` – all icons with metadata
- `index.color.json` – color only
- `index.mono.json` – mono only

## Legal
Brand assets may be trademarks. Follow brand guidelines.
