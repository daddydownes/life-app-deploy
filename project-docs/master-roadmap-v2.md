# LIFE App — Master Roadmap v2.0

## Current State (2026-05-23)
- **Components built:** 47 (Batches 1 & 2 complete)
- **Screens built:** 20
- **Missing screens:** Vitals, Onboarding, Running/Cardio, Tasks/Routines
- **Theme:** Migrating from cyan → gold dominant

---

## Phase 1: Gold Migration (Do First)

### Design System Update
- Primary accent: `#d4af37` gold (replaces `#00e5ff` cyan)
- Active states: gold glow
- Score ranges: <50 red, 50-70 yellow, 70-90 white, >90 gold
- Keep cyan ONLY for: water/liquid elements, cardio/oxygen themed things
- Add: dark gold `#8B6914`, orange highlight `#FF8C00`, purple accent `#9B59B6`

### Components to Recolour
- `tactile-pill.active`: cyan → gold gradient, gold border, gold glow
- `ScoreChip`: 70-90 range cyan → white/gold transition
- `CalendarStrip`: selected cyan → gold
- `SetLogger`: active set cyan border → gold border
- `ExerciseCard`: `isActive` cyan glow → gold glow
- `MacroCard`: carbs cyan → blue (keep blue for carbs)
- `WaterContainer`: keep cyan (water stays cyan)

---

## Phase 2: Core Screens

### Onboarding Flow (`/onboarding`)
**Auto-triggers on first launch. Dev skip button for testing.**

- Step 1: Welcome — L.I.F.E. logo with gold aurora pulse, "Get Started" gold button
- Step 2: Profile Basics — name, age, weight, height (quick data entry)
- Step 3: Goals — pick up to 3 (muscle, cardio, clarity, sleep, energy, nutrition)
- Step 4: Data Import — Samsung Health day sync, blood work upload
- Step 5: Dr. Life Intro — static avatar, "I'll track your metrics and keep you honest"
- Step 6: Permissions — real browser Notification API (not mock), health connect
- Finish: gold confetti burst → navigate to Home

### Vitals Screen (`/vitals`)
**Real-time health dashboard. Sidebar + mobile nav.**

- Hero: Overall Vitals Score (ScoreChip)
- 2-column stat grid: BP, HR, HRV, Sleep, Weight, Body Fat
- Each stat: Sparkline + TrendArrow + long-press → Dr. Life explanation
- Full-width InteractiveChart with period toggle
- Events timeline (EventMarker dots)
- Pull-to-refresh

### Running / Cardio Screen (`/running`)
**GPS-enabled outdoor tracking.**

- Pre-run: target distance/time, rival ghost (past best), warmup prompt
- During run: real-time map, pace, HR (from watch), distance, timer
- Post-run: summary with route map, pace graph, vs rival comparison
- Uses: Browser Geolocation API

### Tasks / Routines Screen (`/tasks`)
**Daily habit tracker beyond fitness.**

- Sleep hygiene checklist (cool room, no screens, etc.)
- Brush teeth, skincare, meds
- Supplement timer with gold countdown
- Custom tasks Jacob can add
- Streak tracking per task

---

## Phase 3: Interactive Features

### Breathing Exercise (`/components/breathing/BreathingCircle`)
- Expanding/contracting gold circle
- "Inhale... Hold... Exhale..." text
- Used in: rest periods between sets, post-workout cooldown, bedtime

### Warm-up Wizard (`/components/workout/WarmUpWizard`)
- Generates unique random warm-up every time
- Based on muscles being trained that day
- 3-5 minutes, no equipment needed
- Dr. Life voice: "Today we're priming chest and triceps..."

### Plate Calculator (`/components/workout/PlateCalculator`)
- Input: working weight (kg)
- Visual: barbell with plates to load each side
- Auto-calculates: 20kg plates, 10kg, 5kg, 2.5kg, 1.25kg
- Shows: total per side, confirms it matches target

### Muscle History Tap (`/components/body/MuscleHistory`)
- Tap any muscle on MuscleDiagram
- Bottom sheet slides up with: exercise history, last trained date, volume stats
- Dr. Life comment: "Chest is recovering well. Last trained 2 days ago."

### Weekly Preview (`/components/cards/WeeklyPreviewCard`)
- "What to expect this week"
- Based on: training load, recovery score, sleep trends
- Dr. Life prediction: "Wednesday will feel heavy. Plan a lighter session."

---

## Phase 4: Polish & Delight

### Visual Effects
- Gold aurora background animation (slow Northern Lights, gold version)
- Time-of-day gold shift: warmer orange mornings, deep gold evenings
- Sidebar collapses to floating gold pill on mobile scroll
- Profile picture gold ring for full-week completion
- DNA helix loading spinner (gold)
- Post-workout button press gold ripple (subtle, not crazy)

### Notifications (Real — Browser API)
- Supplement reminders
- Workout scheduled nudges
- Bedtime sleep hygiene prompt
- Water reminder (if low)
- Streak at risk warning

### PR Celebration
- Full-screen gold overlay
- Confetti burst (subtle, classy)
- Dr. Life voice text: "That's a new personal best."
- OdometerNumber rolls to new weight

### Year in Review Reel
- Highlight reel animation
- Best lifts flash by with slow-motion gold
- Stats: total volume, sessions, hours, PRs
- Shareable card format

---

## Phase 5: AI & Backend

### Recovery Score Engine
- Combines: sleep score, HRV trend, muscle soreness (manual input), training load
- AI analyzes patterns and generates 0-100 score
- Dr. Life explains: "Recovery is at 72. You're good to train, but keep an eye on HRV."

### Samsung Watch Integration
- Research: Samsung Health SDK is Android-only
- Fallback: Use Web Bluetooth API for direct HR streaming from watch
- Alternative: Manual Samsung Health data export → import into app
- Display: Live HR on home screen, rest timer sync

### Mood Check-in (Post-Workout)
- Slider: 1-10 how did it feel
- Stored with workout log
- Used by AI to adjust future recommendations

---

## Build Priority Queue

### Immediate (Next Session)
1. Update design-system.md to gold
2. Recolour existing cyan components → gold
3. Build Onboarding Flow screen
4. Build Vitals Screen
5. Add `/onboarding` and `/vitals` routes
6. Add onboarding auto-trigger + dev skip

### Short Term
7. Tasks/Routines screen
8. Running/GPS screen
9. Breathing circle component
10. Warm-up wizard
11. Plate calculator
12. Real browser notifications

### Medium Term
13. Muscle history tap
14. Weekly preview card
15. Supplement timer
16. Gold aurora background
17. Time-of-day gold shift
18. DNA helix spinner

### Long Term
19. Recovery score AI engine
20. Samsung Watch integration
21. Year-in-review highlight reel
22. PR celebration system
23. Mood check-in backend

---

## Hard Rules (Still Enforced)
- 150-line limit (flexible if functionality breaks — document the exception)
- React 19 patterns
- `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnusedLocals`
- `interface` for props, no default exports
- TSDoc on every component
- Real features over mock UI
