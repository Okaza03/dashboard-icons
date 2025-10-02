# Dashboard Icons

Easily use high-quality PNG and SVG icons for dashboards. Icons are available in two styles:
- **Color**: Full-color logos
- **Mono**: Black & white only

---

## Quick Links

| Type         | PNG (256px)                                                                 | SVG                                                                |
|--------------|-----------------------------------------------------------------------------|--------------------------------------------------------------------|
| **Color**    | [`color/256/logo.png`](https://raw.githubusercontent.com/okaza03/dashboard-icons/main/png/color/256/logo.png) | [`color/logo.svg`](https://raw.githubusercontent.com/okaza03/dashboard-icons/main/svg/color/logo.svg) |
| **Mono**     | [`mono/256/logo.png`](https://raw.githubusercontent.com/okaza03/dashboard-icons/main/png/mono/256/logo.png)   | [`mono/logo.svg`](https://raw.githubusercontent.com/okaza03/dashboard-icons/main/svg/mono/logo.svg)   |

> Change the size (`64`, `128`, `256`, `512`) and icon name as needed.

---

## Available Icons

See the [overview.txt](https://raw.githubusercontent.com/okaza03/dashboard-icons/main/overview.txt) for a full list of icons.

---

## How to Add Icons

1. Place SVG files in the correct folder:
   - **Color**: `svg/color/<name>.svg`
   - **Mono**: `svg/mono/<name>.svg`
2. Push changes to `main`. CI will build PNGs and update `index.json`.

---

## Naming & Format Rules

- Use lower-kebab-case for file names (`home-assistant.svg` → `homeassistant.svg`, `that-logo.svg` → `logo.svg`)
- Transparent backgrounds, square-friendly (`viewBox="0 0 N N"` preferred)
- Mono icons must be pure black/white (no grays)

---

## Index Files

- `index.json`: All icons with metadata
- `index.color.json`: Color icons only
- `index.mono.json`: Mono icons only

---

## Legal

Brand assets may be trademarks. Please follow brand guidelines.
