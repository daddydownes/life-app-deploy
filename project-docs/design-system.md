# LIFE App — Design System v2 (Gold Dominant)

## Overview
Luxury fitness tracking app. Dark glassmorphism UI, slow weighted animations, **gold dominant** with cyan/blue/purple accents. Apple Watch Hermes meets high-end spa.

## Stack
- React 19 + TypeScript + Vite
- Tailwind CSS v3
- GSAP (all animations)
- Zustand (state management)
- Lucide React (icons)
- BrowserRouter (React Router)

## Colours
| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0a0a0f` | App background |
| **Primary (gold)** | **`#d4af37`** | **Accents, active states, scores >90, achievements** |
| Gold dark | `#8B6914` | Deep gold shadows, gradients |
| Gold light | `#F4D03F` | Highlights, shimmer peaks |
| Cyan (water/oxygen) | `#00e5ff` | Water elements, cardio/oxygen only |
| Blue | `#3B82F6` | Carbs macro, cool accents |
| Purple | `#9B59B6` | Special events, rare achievements |
| Orange | `#FF8C00` | Warm highlights, sunset shift |
| Secondary text | `#a0b0c0` | Labels, captions, timestamps |
| White | `#ffffff` | Headings, primary text |
| Success green | `#00e676` | Completed, positive trends |
| Danger red | `#ff5252` | Errors, overflow, negative trends |
| Yellow | `#ffd54f` | Warnings, mid-range scores 50-70 |

## Time-of-Day Gold Shift
- **Morning (5am-11am):** Gold leans yellow `#F4D03F` — energizing, bright
- **Midday (11am-5pm):** Standard gold `#d4af37` — balanced
- **Evening (5pm-9pm):** Gold leans orange `#FF8C00` — warm, winding down
- **Night (9pm-5am):** Deep gold `#8B6914` — dim, theatre mode ready

## Glass CSS Classes

### `glass-panel`
Main cards. Heavy blur, 32px radius.
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(12px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.15);
box-shadow:
  inset 0 1px 1px rgba(255, 255, 255, 0.4),
  inset 0 0 20px rgba(255, 255, 255, 0.08),
  0 20px 50px rgba(0, 0, 0, 0.5);
border-radius: 32px;
transform: translateZ(0);
```

### `glass-chip`
Small rows, pills, list items. Light blur, 12px radius.
```css
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(8px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 12px;
transform: translateZ(0);
```
Hover: background 0.08, border 0.25. Active: scale(0.98).

### `tactile-pill`
Buttons. Gradient background, 50px radius.
```css
background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
border: 1px solid rgba(255,255,255,0.2);
box-shadow: inset 0 1px 2px rgba(255,255,255,0.2), 0 4px 10px rgba(0,0,0,0.3);
border-radius: 50px;
padding: 8px 24px;
```
Active state (`.tactile-pill.active`): **gold gradient**, **gold border**, **gold glow**.
```css
background: linear-gradient(180deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%);
border: 1px solid rgba(212,175,55,0.4);
box-shadow: 0 0 20px rgba(212,175,55,0.2), inset 0 1px 2px rgba(255,255,255,0.2);
```

### `gpu-layer`
GPU-composited wrapper for animated elements.
```css
transform: translateZ(0);
backface-visibility: hidden;
```

## Typography
- **Display**: `font-display` → Space Grotesk (headings, hero text)
- **Data/Numbers**: `font-mono-data` → JetBrains Mono (scores, weights, reps, timestamps)
- **Body**: Inter (default, no class needed)

## Animation System
Import from `@/hooks/useLuxuryAnimation`:
```typescript
import { EASE, DUR, STAGGER } from '@/hooks/useLuxuryAnimation'
```

### Easing Presets
| Name | Value | Usage |
|------|-------|-------|
| `EASE.luxury` | `'power4.out'` | Primary entrance |
| `EASE.ultra` | `'expo.out'` | Hero reveals, page transitions |
| `EASE.gentle` | `'power3.out'` | Hovers, subtle movements |
| `EASE.spring` | `'elastic.out(0.8, 0.4)'` | Interactive elements |
| `EASE.bounce` | `'back.out(1.2)'` | Playful |

### Duration Presets (seconds)
| Name | Value | Usage |
|------|-------|-------|
| `DUR.micro` | 0.3 | Button press, chip hover |
| `DUR.short` | 0.6 | Card hover, toggle |
| `DUR.medium` | 1.0 | Card entrance, content reveal |
| `DUR.long` | 1.6 | Page transition, section entrance |
| `DUR.ultra` | 2.5 | Hero elements, score reveal |
| `DUR.ambient` | 8.0 | Background breathing |

### Stagger Presets (seconds)
| Name | Value |
|------|-------|
| `STAGGER.tight` | 0.06 |
| `STAGGER.normal` | 0.12 |
| `STAGGER.relaxed` | 0.2 |
| `STAGGER.cinematic` | 0.35 |

### GSAP Rules
1. Always kill tweens on unmount: `return () => { tween.kill() }`
2. Always set `willChange` before animating
3. Always clear `willChange` in `onComplete` or with `clearProps`
4. Use `transform: translateZ(0)` for GPU layers
5. Never animate `width`, `height`, `top`, `left` — only `transform` and `opacity`

## Aurora Background
Slow gold Northern Lights effect behind screens.
- Pure CSS animation on conic-gradient
- `animation: aurora 20s linear infinite`
- Colours: deep gold `#8B6914` → gold `#d4af37` → orange `#FF8C00` → purple `#9B59B6` → deep gold
- Opacity: 0.03-0.06 (very subtle, behind all content)
- GPU-only: animates `transform: rotate()` only

## Code Conventions
- `interface` for props (NOT `type`)
- `export function ComponentName(...)` — no default exports
- `className` prop always last, defaults to `''`
- Template literal: ``className={`base-classes ${className}`}``
- Imports: `@/components/...`, `@/stores/...`, `@/types/...`, `@/hooks/...`
- Lucide icons: `import { IconName } from 'lucide-react'`
- Zustand for state. No React Context.
- No `any`. Use `unknown` if needed.
