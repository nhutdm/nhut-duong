---
version: "alpha"
name: "Signal"
description: "Signal — Deep navy canvas with bone paper and a single muted-gold accent; institutional with quiet weight. Source Serif 4 typography. deep navy primary with warm bone paper alternate and a single muted-gold accent. Best for investor deck, consulting deliverable, board presentation. AI-ready design system."
colors:
  primary: "#1c2644"
  secondary: "#232f55"
  tertiary: "#e2dcd0"
  neutral: "#c8a870"
  surface: "#f0ece3"
typography:
  h1:
    fontFamily: Source Serif 4
    fontSize: 2.5rem
    fontWeight: 700
  body-md:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: 400
spacing:
  sm: 1.0rem
  md: 2.0rem
  lg: 4.0rem
components:
  button-primary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    padding: 12px
---

# Signal

Institutional, weighty, classical-serif, polished. Trust built through restraint.

## Color Palette

| Role | Hex | Usage |
| --- | --- | --- |
| Bg (primary) | `#1c2644` | Deep navy canvas — dark-mode background, full-bleed sections |
| Bg Alt | `#232f55` | Secondary navy — dark hover accent, code blocks in dark |
| Fg | `#e2dcd0` | Bone — text on navy |
| Accent | `#c8a870` | Muted gold — the ONLY accent: rules, focus rings, primary buttons, active indicators |
| Bg Light | `#f0ece3` | Bone paper — light-mode background, cards |

Light/Dark mapping for this site: **light mode = bone paper canvas with navy text; dark mode = deep navy canvas with bone text.** Gold is constant in both.

## Typography

- **Display / Hero:** Source Serif 4 — 700, tight tracking. Hero: `clamp(2.5rem, 5vw, 4rem)`
- **H1:** Source Serif 4 — 2.25rem
- **Body:** DM Sans — 1rem / 1.6 line-height, max 72ch
- **UI Labels / Captions:** DM Sans — 0.875rem, 500, slight letter-spacing
- **Monospace:** IBM Plex Mono — code, metadata, technical values

## Layout

- Max-width containment centered with 1.5rem side padding
- Spacing rhythm: base unit 0.5rem (8px); section vertical gaps `clamp(4rem, 8vw, 8rem)`
- No 3-equal-column feature layouts — zig-zag or asymmetric grid
- Mobile: stack below 768px, no horizontal overflow

## Shapes

Base corner radius: **4px** everywhere.

## Components

- **Primary Button:** gold fill, navy text, 4px radius, font-weight 600. Hover: 8% darken + subtle lift shadow. Active: -1px translate. No outer glows.
- **Secondary / Ghost Button:** 1.5px border in muted color, text in foreground. Hover: subtle background fill.
- **Cards:** 4px corners, surface background, `0 2px 12px rgba(0,0,0,0.06)` shadow, 1px border.
- **Inputs:** label above input, 1px border. Focus ring: 2px gold offset 2px.
- **Navigation:** active item: gold indicator + font-weight 500.
- **Prose:** navy code blocks with bone text in both modes; links are navy (light) / gold (dark), underlined.

## Motion

- Ease-out, 200–300ms. Hover: color shift + shadow. Page transitions: fade only.
- Entry: fade + translateY(16px → 0) over 420ms, 80ms stagger (optional, CSS-only).
- Only `transform` and `opacity` animated. Respect `prefers-reduced-motion`.

## Rules

- Color is punctuation, never decoration — gold marks emphasis the way an editor marks a pull quote
- No emojis in UI; icon system only (Lucide-style stroke icons)
- No pure black (`#000000`); saturation cap 80%
- WCAG AA: 4.5:1 body text, 3:1 focus indicators — gold swaps to a darker tone on light backgrounds where needed
- Whitespace is load-bearing; section gaps ≥ 5rem on landing layouts
- Restraint compounds trust — each element removed strengthens what remains
