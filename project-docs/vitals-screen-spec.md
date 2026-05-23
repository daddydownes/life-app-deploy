# Vitals Screen — Visual Specification

## Overview
A premium health dashboard showing Jacob's key biometric trends. Dark glassmorphism UI with gold accents. Feels like a luxury health concierge, not a medical chart.

## Layout Structure
```
┌─────────────────────────────────────┐
│  ← Back              Today ▼        │  Header
├─────────────────────────────────────┤
│                                     │
│   ┌─────────────────────────────┐   │
│   │  Overall Vitals Score       │   │  Hero ScoreCard
│   │  [ 87 ]  ↑ +2 from last wk  │   │  (ScoreChip component)
│   └─────────────────────────────┘   │
│                                     │
│   Blood Pressure    Heart Rate      │  2-column grid
│   [122/78] mmHg     [62] bpm        │  (StatRow + Sparkline)
│   ────────          ────────        │
│                                     │
│   HRV               Sleep Score     │
│   [48] ms           [82]            │
│   ────────          ────────        │
│                                     │
│   Weight            Body Fat        │
│   [84.2] kg         [14.2] %        │
│   ────────          ────────        │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  [Sparkline chart]          │   │  Trend section
│   │  Last 7 days                │   │  (InteractiveChart)
│   └─────────────────────────────┘   │
│                                     │
│   Recent Events                     │
│   ● Started creatine    May 20      │  (EventMarker list)
│   ● Deload week         May 15      │
│                                     │
└─────────────────────────────────────┘
```

## Color & Styling
- Background: `#0a0a0f` (deep space black)
- Card background: `glass-panel` class (white 5% opacity, blur 16px, border white 8%)
- Primary accent: `#d4af37` (gold) for scores, active trends, highlights
- Secondary text: `#a0b0c0` (muted steel blue)
- Success: `#00e676` (green) for positive trends
- Danger: `#ff5252` (red) for alerts/negative trends
- Data font: `font-mono-data` for numbers
- Divider: `border-b border-white/5` between StatRows

## Component Breakdown

### Header
- Left: back chevron (←) in white
- Right: "Today" with dropdown chevron in secondary color
- Height: 56px, fixed at top

### Hero ScoreCard
- Uses `ScoreChip` component
- Large centered score (87)
- Gold rotating glow animation behind the number
- Subtitle: "↑ +2 from last week" in success green
- `data-kimi="vitals-hero-score"`

### Stat Grid (2 columns)
- Each cell: `StatRow` component
- Label in secondary color (`#a0b0c0`), value in white bold mono
- Optional `TrendArrow` (up/down/stable) beside value
- Mini `Sparkline` SVG below each value showing last 3-5 readings
- Long-press any stat → Dr. Life explanation sheet slides up
- `data-kimi="vitals-stat-grid"`

### Trend Chart Section
- Full-width `InteractiveChart` component
- Period toggle: 7D | 30D | 90D | 1Y
- Gold line (`#d4af37`) on dark background
- Y-axis labels in secondary color
- Grid lines at 20% opacity white
- Event markers (gold dots) on significant dates
- 3D tilt on hover (subtle, 2-3 degrees)
- `data-kimi="vitals-trend-chart"`

### Events Timeline
- Vertical list of `EventMarker` dots with labels
- Each event: gold dot + label + date
- Tap event → tooltip with description
- `data-kimi="vitals-events"`

## Animations
- Screen entrance: fade in + slide up (`y: 20 → 0`, 400ms, `power3.out`)
- StatRows stagger in: 50ms delay between each
- ScoreChip gold glow: continuous slow rotation (8s loop)
- Sparklines draw in left-to-right on mount (600ms)
- Chart area fade in after stats (200ms delay)

## Interactions
- Pull down → refresh data (spinner in header)
- Long-press stat → Dr. Life bottom sheet with explanation
- Tap chart period → smooth transition between datasets
- Tap event dot → tooltip flips open with details

## Data Structure (mock)
```ts
const vitalsData = {
  score: 87,
  scoreTrend: +2,
  stats: [
    { label: 'Blood Pressure', value: '122/78', unit: 'mmHg', trend: 'stable', sparkline: [118, 120, 122, 121, 122, 123, 122] },
    { label: 'Heart Rate', value: '62', unit: 'bpm', trend: 'down', sparkline: [68, 66, 65, 64, 63, 62, 62] },
    { label: 'HRV', value: '48', unit: 'ms', trend: 'up', sparkline: [42, 43, 44, 45, 46, 47, 48] },
    { label: 'Sleep Score', value: '82', unit: '', trend: 'stable', sparkline: [78, 80, 79, 81, 82, 81, 82] },
    { label: 'Weight', value: '84.2', unit: 'kg', trend: 'down', sparkline: [85.5, 85.2, 85.0, 84.8, 84.5, 84.3, 84.2] },
    { label: 'Body Fat', value: '14.2', unit: '%', trend: 'down', sparkline: [15.0, 14.8, 14.6, 14.5, 14.4, 14.3, 14.2] },
  ],
  events: [
    { date: '2026-05-20', label: 'Started creatine', description: '5g daily monohydrate' },
    { date: '2026-05-15', label: 'Deload week', description: 'Reduced volume 40%' },
  ]
}
```

## Dr. Life Copy Examples
- Score explanation: "Your vitals score is 87. Blood pressure and HRV are trending well. Keep the consistency."
- Stat long-press: "HRV of 48ms is solid for your training load. Higher is generally better — it means your nervous system is recovering."
- Empty event state: "No events logged. Tap + to add a supplement change, deload, or lifestyle shift."
