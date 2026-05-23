# LIFE App — Existing Components

## Component Registry (Already Built)

### Cards
| Component | File | Props | Notes |
|-----------|------|-------|-------|
| GlassCard | `cards/GlassCard.tsx` | children, className?, animate?, delay?, onClick?, hoverScale? | 3D tilt hover, grain texture, light sweep, GSAP entrance |
| AIQuoteCard | `cards/AIQuoteCard.tsx` | quote, className? | Gold left border, italic, Dr. Life quotes |
| ScoreBreakdownCard | `cards/ScoreBreakdownCard.tsx` | actions: ScoreAction[], className? | Sorted by impact, top item gold |

### Inputs
| Component | File | Props | Notes |
|-----------|------|-------|-------|
| SearchBar | `inputs/SearchBar.tsx` | placeholder?, onSearch?, className? | Spring expand/collapse, gold icon, clear button |

### Feedback
| Component | File | Props | Notes |
|-----------|------|-------|-------|
| TrendArrow | `feedback/TrendArrow.tsx` | direction: 'up'\|'down'\|'stable', size?, className? | Directional indicator |
| PRBadge | `feedback/PRBadge.tsx` | exerciseName, weight, onComplete? | "NEW PR" badge, spring scale |
| Skeleton | `feedback/Skeleton.tsx` | width?, height?, borderRadius?, className? | Gold shimmer sweep |
| ElasticPullRefresh | `feedback/ElasticPullRefresh.tsx` | children, onRefresh?, className? | Elastic stretch, wordmark at 60px |
| GoldInkSpread | `feedback/GoldInkSpread.tsx` | (internal) | SVG clip-mask completion animation |
| StarField | `feedback/StarField.tsx` | (internal) | Canvas star drift, night screen only |

### Layout
| Component | File | Props | Notes |
|-----------|------|-------|-------|
| PageTransition | `layout/PageTransition.tsx` | children | GSAP page transitions, kills overlapping timelines |
| PageShell | `layout/PageShell.tsx` | children | App wrapper, responsive, scroll handling |
| BottomDock | `layout/BottomDock.tsx` | (none) | Mobile nav, 5 tabs, fixed bottom |
| TopBar | `layout/TopBar.tsx` | (none) | Greeting + ScoreChip |
| Sidebar | `layout/Sidebar.tsx` | (none) | Desktop nav, 240px, hidden <768px |
| ScrollFrostedBar | `layout/ScrollFrostedBar.tsx` | children, className? | Blur intensifies on scroll |
| FloatingDrLife | `layout/FloatingDrLife.tsx` | (none) | Persistent chat button, bottom-right |

### Typography
| Component | File | Props | Notes |
|-----------|------|-------|-------|
| BubbleText | `typography/BubbleText.tsx` | children, size?, className?, as? | SVG gradient gold text, shimmer sweep |
| OdometerNumber | `typography/OdometerNumber.tsx` | value, duration?, className?, suffix?, prefix?, delay? | Digit-by-digit roll animation |
| MonoLabel | `typography/MonoLabel.tsx` | children, className?, uppercase? | DM Mono, ALL CAPS, letter-spaced |

### Score
| Component | File | Props | Notes |
|-----------|------|-------|-------|
| GoldProgressBar | `score/GoldProgressBar.tsx` | value, target, className? | Liquid mercury fill, blue→gold→red, pulse near target |
| ScoreChip | `score/ScoreChip.tsx` | score, trend, previousScore?, size?, className? | Animated count, trend arrows, rotating gold glow for 90+ |
| CompetitionModeProvider | `score/CompetitionModeProvider.tsx` | children, active? | Intensity shift when challenge active |

### Nutrition
| Component | File | Props | Notes |
|-----------|------|-------|-------|
| WaterContainer | `nutrition/WaterContainer.tsx` | current, target, className? | Liquid fill, surface wobble, bubbles |
| FoodLogRow | `nutrition/FoodLogRow.tsx` | name, calories, protein, carbs, fat, timestamp, className? | Avatar, macros, time |
| MacroCard | `nutrition/MacroCard.tsx` | type, current, target, trend?, foodSources?, className? | 3D flip card, progress bar, food sources on back |

### Workout
| Component | File | Props | Notes |
|-----------|------|-------|-------|
| RestTimer | `workout/RestTimer.tsx` | seconds, onComplete, onSkip | Depleting arc, heartbeat pulse |
| WarmUpCard | `workout/WarmUpCard.tsx` | onComplete, onSkip | 5-min muscle-specific warm-up |
| ExerciseCard | `workout/ExerciseCard.tsx` | name, muscle, sets, reps, weight, restSeconds, isActive?, isCompleted?, onStart?, onLogSet?, className? | Glass card with 3D tilt, MuscleDiagram, action buttons |
| SetLogger | `workout/SetLogger.tsx` | exerciseName, targetSets, targetReps, initialWeight?, onCompleteSet, onFinishExercise, className? | Rep steppers, RPE slider, progress bar, checkmark animations |
| SupersetConnector | `workout/SupersetConnector.tsx` | active? | Gold vertical line between paired exercises |

### Body
| Component | File | Props | Notes |
|-----------|------|-------|-------|
| BodyMap | `body/BodyMap.tsx` | onMuscleTap?, compact? | SVG muscle diagram, 7-day intensity colouring |
| MuscleDiagram | `body/MuscleDiagram.tsx` | targetMuscles, secondaryMuscles?, className? | SVG front-view muscles, tap tooltip with exercises |

### Calendar
| Component | File | Props | Notes |
|-----------|------|-------|-------|
| CalendarStrip | `components/calendar/CalendarStrip.tsx` | days, selectedDate, onSelectDate, className? | Horizontal scrollable day pills, GSAP stagger, scroll snap |

### Charts
| Component | File | Props | Notes |
|-----------|------|-------|-------|
| InteractiveChart | `components/charts/InteractiveChart.tsx` | data, title, unit?, color?, comparisonData?, events?, className? | Recharts wrapper, period filters, 3D tilt, event markers, personal best glow |

### Effects
| Component | File | Props | Notes |
|-----------|------|-------|-------|
| VortexEngine | `effects/VortexEngine.tsx` | (none) | Background effect |
| CometTrail | `effects/CometTrail.tsx` | trigger, fromRef, toRef, onComplete?, className? | GSAP SVG path trace animation, gold glow orb |

## Key Implementation Patterns

### GlassCard Pattern (copy for new cards)
```tsx
// Grain texture overlay
<div className="absolute inset-0 pointer-events-none opacity-[0.015]" 
     style={{ backgroundImage: `url("data:image/svg+xml,...")`, backgroundSize: '128px' }} />

// Top edge light sweep
<div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent pointer-events-none" />

// 3D tilt hover
const handleMouseMove = (e: React.MouseEvent) => {
  const rect = cardRef.current.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  gsap.to(cardRef.current, { rotateY: x * 4, rotateX: -y * 3, scale: 1.008, 
    duration: 0.6, ease: EASE.gentle, transformPerspective: 1000 })
}
```

### GSAP Entrance Pattern
```tsx
useEffect(() => {
  const el = ref.current
  if (!el) return
  gsap.set(el, { y: 40, opacity: 0, scale: 0.97, willChange: 'transform, opacity' })
  const tween = gsap.to(el, { y: 0, opacity: 1, scale: 1, 
    duration: DUR.medium, ease: EASE.luxury, delay: delay / 1000, clearProps: 'willChange' })
  return () => { tween.kill() }
}, [delay])
```

### Component Template
```tsx
interface ComponentNameProps {
  // required first
  value: number
  // optional last
  className?: string
  onChange?: (val: number) => void
}

export function ComponentName({ value, className = '', onChange }: ComponentNameProps) {
  const ref = useRef<HTMLDivElement>(null)
  // ...
  return <div ref={ref} className={`glass-panel ${className}`}>...</div>
}
```
