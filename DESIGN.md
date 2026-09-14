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
    fontFamily: Source Serif 4
    fontSize: 1rem
    fontWeight: 400
spacing:
  sm: 1.0rem
  md: 2.0rem
  lg: 4.0rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    padding: 12px
---

## Overview

Signal — Deep navy canvas with bone paper and a single muted-gold accent; institutional with quiet weight. Source Serif 4 typography. deep navy primary with warm bone paper alternate and a single muted-gold accent. Best for investor deck, consulting deliverable, board presentation. AI-ready design system. Signal draws from the Swiss International Style's most restrained impulse — the belief that typography and negative space alone can carry authority. But where mid-century Swiss design operated in black and white newsprint, Signal reinterprets that discipline through the lens of private banking communications and premium editorial publishing. The deep navy ground isn't decorative; it's structural. It creates the same psychological weight that leather-bound reports and engraved stationery once carried in financial institutions.

The pairing of Source Serif 4 with muted gold accents is deliberately anachronistic. Source Serif 4 has the optical refinement of a Plantin or a Times, but with contemporary spacing metrics that breathe on screen. The gold isn't aspirational — it's earned. Used sparingly, as a typographic accent or rule, it signals institutional confidence without the vulgarity of excess. This is design for contexts where trust is built through restraint, where every element present must justify its existence against the alternative of simply not being there.

- Density: 8/10 — Dense
- Variance: 8/10 — Complex
- Motion: 2/10 — Minimal

- **Style:** Institutional, Weighty, Classical-Serif, Polished
- **Keywords:** Deep navy, muted gold, Source Serif 4, institutional, weighty, polished, trustworthy, scholarly
- **Era:** Timeless Classic
- **Light/Dark:** ✓ Full / ◐ Partial

## Colors

- **Bg** (#1c2644) — Primary surface or dominant color
- **Bg Alt** (#232f55) — Accent highlight, links and focus states
- **Fg** (#e2dcd0) — Secondary accent
- **Accent** (#c8a870) — Accent color, emphasis elements
- **Bg Light** (#f0ece3) — Extended palette, decorative use


## Typography

- **Display / Hero:** Source Serif 4 — Weight 700, tight tracking, used for headline impact
- **Body:** DM Sans — Weight 400, 16px/1.6 line-height, max 72ch per line
- **UI Labels / Captions:** DM Sans — 0.875rem, weight 500, slight letter-spacing
- **Monospace:** IBM Plex Mono — Used for code, metadata, and technical values

Scale:
- Hero: clamp(2.5rem, 5vw, 4rem)
- H1: 2.25rem
- H2: 1.5rem
- Body: 1rem / 1.6
- Small: 0.875rem


## Layout

- **Grid:** CSS Grid primary. Max-width containment: 1280px centered with 1.5rem side padding.
- **Spacing rhythm:** Balanced. Base unit: 0.5rem (8px).
- **Section vertical gaps:** clamp(4rem, 8vw, 8rem).
- **Hero layout:** Split-screen (text left, visual right).
- **Feature sections:** Zig-zag alternating text+image rows. No 3-equal-columns.
- **Mobile collapse:** All multi-column layouts collapse below 768px. No horizontal overflow.
- **z-index contract:** base (0) / sticky-nav (100) / overlay (200) / modal (300) / toast (500).


## Elevation & Depth

display font Source Serif 4 for hero headlines, smooth hover transitions (200-250ms), subtle lift shadows, alternating light/dark sections for rhythm, deep navy full-bleed sections, muted-gold rule accents, bone paper cards, dense grid, compact 1.2rem gaps

- **Physics:** Ease-out curves, 200-300ms duration. Smooth and predictable.
- **Entry animations:** Fade + translate-Y (16px → 0) over 420ms ease-out. Staggered cascades for lists: 80ms between items.
- **Hover states:** Subtle color shift + shadow adjustment over 200ms.
- **Page transitions:** Fade only (200ms).
- **Performance:** Only transform and opacity animated. No layout-triggering properties.


## Shapes

Base corner radius: 4px. See rounded tokens in front matter for the full scale.


## Components

- **Primary Button:** 4px border-radius. Accent color fill. Hover: 8% darken + subtle lift shadow. Active: -1px translate tactile press. Font weight 600. No outer glows.
- **Secondary / Ghost Button:** Outline variant. 1.5px border in muted color. Text in primary color. Hover: subtle background fill.
- **Cards:** 4px corners. Surface background. Subtle shadow (0 2px 12px rgba(0,0,0,0.06)). 1px border stroke.
- **Inputs:** Label above input. 1px border stroke. Focus ring: 2px accent color offset 2px. Error text below in semantic red. No floating labels.
- **Navigation:** Primary surface background. Active item: accent color indicator. Font weight 500 when active.
- **Skeletons:** Shimmer animation matching component dimensions. No circular spinners.
- **Empty States:** Icon-based composition with descriptive text and action button.


## Do's and Don'ts

- No emojis in UI — use icon system only (Lucide, Heroicons)
- No pure black (#000000) — use off-black or charcoal variants
- No oversaturated accent colors (saturation cap: 80%)
- No 3-column equal-width feature layouts — use zig-zag or asymmetric grid
- No `h-screen` — use `min-h-[100dvh]`
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen"
- No broken external image links — use picsum.photos or inline SVG
- No generic lorem ipsum in demos

- Do Source Serif 4 display font loaded via Google Fonts
- Do Color palette variables applied consistently
- Do Typography scale: hero clamp(2.5rem,5vw,4rem)
- Do H1 2.25rem
- Do body 1rem/1.6
- Do WCAG AA contrast ratio verified (4.5:1 body text)
- Do Serif typography hierarchy clear (display vs body)
- Do Whitespace generous — section gaps ≥ 5rem
- Do Mobile responsive layout (stack below 768px)


## Use Case

investor deck, consulting deliverable, board presentation, legal / policy brief, academic deck, advisory pitch, bilingual EN/CN deck

<!-- Source: https://designmd.app/library/signal · designmd.app -->
