# Onboarding Flow — Visual Specification

## Overview
A 4-step immersive onboarding that introduces Jacob to Dr. Life and configures his profile. Dark, premium feel with gold accents. Each step is a full-screen takeover with smooth horizontal slide transitions.

## Step 1: Welcome
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│         ┌─────────────┐             │
│         │   [Gold     │             │  LIFE logo mark
│         │    ring     │             │  (animated)
│         │   pulse]    │             │
│         └─────────────┘             │
│                                     │
│            L.I.F.E.                 │
│      Longevity In Fitness           │
│           Everyday                  │
│                                     │
│   Your personal health concierge    │
│   powered by Dr. Life               │
│                                     │
│                                     │
│         [ Get Started ]             │  Gold pill button
│                                     │
│    Already have an account? Sign In │
│                                     │
└─────────────────────────────────────┘
```

- Background: `#0a0a0f` with subtle radial gradient from center (gold at 2% opacity)
- Logo: Animated conic-gradient gold ring (AuroraCard style, 4s rotation loop)
- Title: "L.I.F.E." in gold gradient text (`bg-gradient-to-b from-white to-[#d4af37] bg-clip-text`)
- Subtitle: "Longevity In Fitness Everyday" in secondary color, letter-spaced
- Body: "Your personal health concierge powered by Dr. Life" in muted white
- CTA: `Button` component, variant `primary`, full-width, gold gradient
- Footer link: "Already have an account? Sign In" in secondary color
- Animation: Logo scales up from 0.8→1 + fades in. Text staggers up 100ms apart. CTA slides up last.

## Step 2: Profile Basics
```
┌─────────────────────────────────────┐
│  Step 2 of 4                        │  Progress dots
│  ●○○○                               │
│                                     │
│  Let's get to know you              │
│  This helps Dr. Life personalize    │
│  your experience                    │
│                                     │
│  Name                               │
│  ┌─────────────────────────────┐    │
│  │ Jacob                       │    │  Text input
│  └─────────────────────────────┘    │
│                                     │
│  Age                                │
│  ┌─────────────────────────────┐    │
│  │ 29                          │    │
│  └─────────────────────────────┘    │
│                                     │
│  Weight (kg)                        │
│  ┌─────────────────────────────┐    │
│  │ 84.2                        │    │
│  └─────────────────────────────┘    │
│                                     │
│  Height (cm)                        │
│  ┌─────────────────────────────┐    │
│  │ 183                         │    │
│  └─────────────────────────────┘    │
│                                     │
│         [ Continue ]                │
│                                     │
└─────────────────────────────────────┘
```

- Progress dots: 4 dots, active step filled gold, others white/20%
- Inputs: `glass-panel` background, white border on focus, gold glow on focus (`box-shadow: 0 0 0 2px #d4af3740`)
- Label text: secondary color, 12px, uppercase, letter-spaced
- Input text: white, 16px, mono for numbers
- Keyboard: number pad for age/weight/height
- Slide transition: new screen enters from right, old exits left (300ms)
- `data-kimi="onboarding-step-2"`

## Step 3: Goals & Focus
```
┌─────────────────────────────────────┐
│  Step 3 of 4                        │
│  ●●●○                               │
│                                     │
│  What are you optimizing for?       │
│  Pick up to 3                       │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 💪 Build Muscle             │    │  Selectable cards
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 🏃 Improve Cardio           │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 🧠 Mental Clarity           │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 😴 Sleep Quality            │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ ⚡ Energy & Vitality        │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 🍽️ Nutrition & Diet        │    │
│  └─────────────────────────────┘    │
│                                     │
│         [ Continue ]                │
│                                     │
└─────────────────────────────────────┘
```

- Cards: `glass-chip` style, selectable
- Selected state: gold border (`border-[#d4af37]`), gold background at 10% opacity, checkmark icon appears
- Unselected: white/5% background, white/10% border
- Icons: Lucide only (no emojis in actual code — use `Dumbbell`, `Heart`, `Brain`, `Moon`, `Zap`, `Apple`)
- Selection limit: 3 max, counter below title shows "2 of 3 selected"
- Invalid state (0 selected): Continue button disabled, opacity 40%
- Animation: cards stagger in from bottom, 60ms apart
- `data-kimi="onboarding-step-3"`

## Step 4: Permissions & Dr. Life Intro
```
┌─────────────────────────────────────┐
│  Step 4 of 4                        │
│  ●●●●                               │
│                                     │
│  Meet Dr. Life                      │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  [Avatar: gold ring         │    │
│  │   with pulse]               │    │
│  │                             │    │
│  │  "I'm Dr. Life. I'll track  │    │  Chat bubble
│  │   your metrics, flag        │    │  (GlassCard)
│  │   concerns, and keep you    │    │
│  │   honest."                  │    │
│  └─────────────────────────────┘    │
│                                     │
│  Enable notifications               │
│  Dr. Life will remind you to log    │
│  workouts and meals                 │
│  [ Toggle ]                         │
│                                     │
│  Connect health data                │
│  Samsung Health / Apple Health      │
│  [ Connect ]                        │
│                                     │
│         [ Finish ]                  │
│                                     │
└─────────────────────────────────────┘
```

- Dr. Life avatar: circular gold ring with slow pulse animation (scale 1→1.05→1, 3s loop)
- Chat bubble: `GlassCard` with left gold border accent
- Quote: white text, italic, Dr. Life voice (direct, clinical, friendly)
- Notification toggle: custom switch component
  - Track: `glass-chip` background, 48px wide, 28px tall
  - Thumb: white circle, slides right on active
  - Active: gold glow behind track
- Health connect button: `Button` variant `ghost`, icon + text
- Skip link below: "Skip for now" in secondary color
- Finish button: gold primary, full-width
- On finish: confetti burst (gold particles) + navigate to HomeScreen
- `data-kimi="onboarding-step-4"`

## Global Interactions
- Swipe left/right to navigate between steps (on mobile)
- Back button on Steps 2-4 returns to previous step
- Progress dots are tappable to jump (only to completed steps)
- Keyboard avoids input fields (scrolls form up when keyboard opens)
- All transitions: 300ms, ease-out, slide horizontally

## Component Inventory
- `Button` (primary, ghost, disabled states)
- `GlassCard` (chat bubble)
- `AuroraCard` or custom (logo ring animation)
- Custom toggle switch
- Text inputs with glass styling
- Selectable goal cards
- Progress indicator (dots)

## Dr. Life Copy
- Step 1: "Your personal health concierge powered by Dr. Life"
- Step 2: "This helps Dr. Life personalize your experience"
- Step 3: "What are you optimizing for? I'll tailor your dashboard around these."
- Step 4: "I'm Dr. Life. I'll track your metrics, flag concerns, and keep you honest. Let's build something."
- Error state (incomplete): "Need a bit more info before Dr. Life can get to work."
