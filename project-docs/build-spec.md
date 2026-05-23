# LIFE App — Build Spec

## Hard Rules — Breaking Any of These Causes Build Failure

### React 19 Rules
- `useRef` MUST pass `null`: `useRef<HTMLDivElement>(null)` — never `useRef<HTMLDivElement>()`
- NEVER use `React.FC` — use explicit props interface only
- NEVER use `JSX.Element` as return type — use `React.ReactElement` or omit return type

### TypeScript Hard Blockers (tsconfig will FAIL the build)
- **`verbatimModuleSyntax: true`** — type-only imports MUST use `import type { Foo }` not `import { Foo }`
- **`erasableSyntaxOnly: true`** — `enum` is BANNED. Use `const Direction = { Up: 'up' } as const`
- **`noUnusedLocals: true` + `noUnusedParameters: true`** — any unused variable/parameter = build error

### Architecture Rules
- **150-line file limit** — split into sub-components if needed
- **`src/lib/` = third-party clients ONLY** (Supabase, Howler setup) — components NEVER import from `@/lib/`
- **`src/services/` = all data logic** — components import from `@/services/`
- **No new dependencies** without explicit note in the code comment

### Component Rules
- Every component MUST have a TSDoc comment at top explaining what it does
- Export as `export function ComponentName(...)` — no default exports
- `className` prop always last, defaults to `''`
- Use `interface` for props, NOT `type`

## Status: Priority Queue — ALL BUILT ✅

The following 8 components were built on 2026-05-23 and are in the codebase:

1. ✅ ExerciseCard — `src/components/workout/ExerciseCard.tsx`
2. ✅ SetLogger — `src/components/workout/SetLogger.tsx`
3. ✅ ScoreChip — `src/components/score/ScoreChip.tsx`
4. ✅ MacroCard — `src/components/nutrition/MacroCard.tsx`
5. ✅ CalendarStrip — `src/components/calendar/CalendarStrip.tsx`
6. ✅ MuscleDiagram — `src/components/body/MuscleDiagram.tsx`
7. ✅ InteractiveChart — `src/components/charts/InteractiveChart.tsx`
8. ✅ CometTrail — `src/components/effects/CometTrail.tsx`

---

## Remaining Components (from Master Build Guide)

### 9. RippleEffect
**File:** `src/components/feedback/RippleEffect.tsx`

**Requirements:**
- Gold ring: opacity 0.6→0, scale 1→2.5, 600ms
- Used for ScoreChip pulse, button presses

---

### 10. Toast
**File:** `src/components/feedback/Toast.tsx`

**Requirements:**
- Gold for info, red for errors
- Slides down from top, auto-dismiss 4s
- Connects to uiStore toast state

---

### 11. ErrorBoundary
**File:** `src/components/feedback/ErrorBoundary.tsx`

**Requirements:**
- Catches React render errors
- Shows fallback UI with retry button

---

### 12. Button
**File:** `src/components/inputs/Button.tsx`

**Requirements:**
- Variants: primary (gold pill), icon (circular), ghost (outline)
- Every press: light haptic + scale 0.97 for 100ms

---

### 13. PersonalChallengeRing
**File:** `src/components/score/PersonalChallengeRing.tsx`

**Requirements:**
- Arc ring: current → target as fill percentage
- Gold fill grows
- Shows: current, target, days remaining

---

### 14. Sparkline
**File:** `src/components/charts/Sparkline.tsx`

**Requirements:**
- Mini chart for blood work marker cards
- Last 3 tests as small gold line
- No interactivity

---

### 15. SupplementRow
**File:** `src/components/nutrition/SupplementRow.tsx`

**Requirements:**
- Name, dose, time taken
- Used in Supplements screen

---

### 16. SupplementChip
**File:** `src/components/nutrition/SupplementChip.tsx`

**Requirements:**
- Small gold chip
- Used in "today's stack" summary

---

### 17. StatRow
**File:** `src/components/cards/StatRow.tsx`

**Requirements:**
- Label left, bold value right
- Optional TrendArrow
- Divider between rows
- Long-press → Dr. Life explanation sheet

---

### 18. EventMarker
**File:** `src/components/charts/EventMarker.tsx`

**Requirements:**
- Gold dot on score history chart
- Tap → tooltip with event description

---

## Archive: Priority Queue Specs (for reference)

### 1. ExerciseCard
**File:** `src/components/workout/ExerciseCard.tsx`

```typescript
interface ExerciseCardProps {
  name: string
  muscle: string
  sets: number
  reps: string       // e.g. "8-12"
  weight: number
  restSeconds: number
  imageUrl?: string
  isActive?: boolean
  isCompleted?: boolean
  onStart?: () => void
  onLogSet?: () => void
  className?: string
}
```

**Requirements:**
- Glass card with `glass-panel` class
- GSAP entrance using `EASE.luxury`, `DUR.medium`
- 3D tilt on hover (rotateY/rotateX from mouse position, `transformPerspective: 1000`)
- Exercise name (large white), muscle group (small `#a0b0c0`), sets/reps/weight row with `font-mono-data`
- `isActive`: pulsing cyan border glow, "Active" badge
- `isCompleted`: green checkmark overlay, opacity 0.6, green border tint
- `onStart` → "Start" button (tactile-pill)
- `onLogSet` → "Log Set" button
- Rest timer display: "Rest: 90s" with countdown
- Include grain texture + top edge light sweep (copy from GlassCard)
- Keep under 150 lines — split into sub-components if needed

---

### 2. SetLogger
**File:** `src/components/workout/SetLogger.tsx`

```typescript
// NOTE: Use the existing SetLog from @/types/workout.ts as base
// It has: setNumber, reps, weight, isMaxEffort, completed
// Add rpe field locally for the logger interface:
interface SetLoggerLog extends SetLog {
  rpe?: number      // 1-10, optional
}

interface SetLoggerProps {
  exerciseName: string
  targetSets: number
  targetReps: string    // e.g. "8-12"
  onCompleteSet: (log: SetLoggerLog) => void
  onFinishExercise: () => void
  className?: string
}
```

**Requirements:**
- Vertical stack of set rows
- Each row: set number, rep stepper (+/- buttons), weight input, RPE slider 1-10
- Completed sets: green checkmark, greyed out
- Current active set: cyan left border, pulse animation
- "Finish Exercise" button: tactile-pill, full width
- GSAP stagger entrance per row (`STAGGER.tight`)
- Checkmark animation: `EASE.spring` scale 0→1
- Progress: "Set 2 of 4" with thin cyan progress bar
- Must work one-handed, thumb-sized buttons, haptic on every tap

---

### 3. ScoreChip
**File:** `src/components/score/ScoreChip.tsx`

```typescript
interface ScoreChipProps {
  score: number      // 0-100
  trend: 'up' | 'down' | 'flat'
  previousScore?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
```

**Requirements:**
- Circular or pill chip showing score number
- Sizes: sm (32px), md (48px), lg (64px)
- Number animates on change with GSAP count up/down
- Colour: <50 red, 50-70 yellow `#ffd54f`, 70-90 cyan, >90 gold
- Trend arrow: up green, down red, flat grey (Lucide: TrendingUp, TrendingDown, Minus)
- Score > 90: rotating glow border (8s rotation, gold gradient)
- Glass background
- GSAP scale bounce on mount: `EASE.spring`
- Used in TopBar on every screen

---

### 4. MacroCard (3D Flip)
**File:** `src/components/nutrition/MacroCard.tsx`

```typescript
interface MacroCardProps {
  type: 'protein' | 'carbs' | 'fat'
  current: number
  target: number
  trend?: number     // percentage change from yesterday
  foodSources?: string[]
  className?: string
}
```

**Requirements:**
- 3D flip card: front = macro info, back = food sources
- Front: large Lucide icon (Beef=protein, Wheat=carbs, Droplets=fat), current/target with `font-mono-data`, progress bar
- Back: food source list with contribution bars
- Flip on click: GSAP rotationY 0→180, `ease: 'power2.inOut'`, 0.6s
- `transformStyle: 'preserve-3d'`, `backfaceVisibility: 'hidden'` on both faces
- Colours: protein=#00e676, carbs=#00e5ff, fat=#ffd54f
- GSAP entrance with `EASE.luxury`
- Shows: value, target, progress bar. Tap → flip → micronutrients on back

---

### 5. CalendarStrip
**File:** `src/components/calendar/CalendarStrip.tsx`

```typescript
interface DayData {
  date: string        // ISO date
  label: string       // "Mon", "Tue", etc.
  dayNum: number      // 1-31
  isToday: boolean
  hasWorkout: boolean
  hasMeal: boolean
  score?: number
}

interface CalendarStripProps {
  days: DayData[]
  selectedDate: string
  onSelectDate: (date: string) => void
  className?: string
}
```

**Requirements:**
- Horizontal scrollable strip of day pills
- Each day: label (Mon), day number, dot indicators (cyan=workout, green=meal)
- Selected: `tactile-pill active` class (cyan background)
- Today: gold border
- Score > 80: tiny gold star
- GSAP entrance stagger (`STAGGER.tight`)
- Tap → `onSelectDate`, scale pulse `EASE.spring`
- Scroll snap: `scroll-snap-type: x mandatory`, `scroll-snap-align: start`
- Past: gold tick (completed), dim (missed). Rest days: gold dot.

---

### 6. MuscleDiagram
**File:** `src/components/body/MuscleDiagram.tsx`

```typescript
interface MuscleDiagramProps {
  targetMuscles: string[]
  secondaryMuscles?: string[]
  className?: string
}
```

**Requirements:**
- SVG muscle diagram (front view)
- Target muscles: gold fill
- Secondary muscles: 40% opacity soft gold
- Tap → tooltip with muscle name + exercises
- Inline in ExerciseCard
- Replaces exercise videos

---

### 7. InteractiveChart (base)
**File:** `src/components/charts/InteractiveChart.tsx`

```typescript
interface ChartDataPoint {
  date: string
  value: number
  event?: string
}

interface InteractiveChartProps {
  data: ChartDataPoint[]
  title: string
  unit?: string
  comparisonData?: ChartDataPoint[]
  events?: { date: string; label: string }[]
  className?: string
}
```

**Requirements:**
- Recharts wrapper
- drawOn: SVG stroke-dashoffset draws line left→right, 1200ms
- 3D line effect: perspective tilt + drop shadow
- Pinch zoom + light haptic at boundaries
- Period buttons: 1W/2W/1M/3M/6M/1Y
- Tap point → tooltip
- Comparison overlay: this period vs last
- Event markers: gold dots for life events
- Personal best glow on peak points
- Most complex component — budget extra time

---

### 8. CometTrail
**File:** `src/components/effects/CometTrail.tsx`

```typescript
interface CometTrailProps {
  trigger: boolean
  fromRef: React.RefObject<HTMLElement>
  toRef: React.RefObject<HTMLElement>
  onComplete?: () => void
  className?: string
}
```

**Requirements:**
- Gold SVG path trace animation
- FloatingDrLife button launch animation
- Button scales down 0.85
- Gold path traces arc to destination
- GSAP path drawing with `stroke-dashoffset`
- Dr. Life entry delight moment

---

## Output Rules
- Output ONLY raw TypeScript code for each file
- No markdown fences around the whole file
- Use `=== FILE: path ===` header per component
- Match existing component patterns exactly
- No new dependencies without explicit note
