# LIFE App — Stores & Types

## Zustand Stores

### useUserStore (`src/stores/userStore.ts`)
```typescript
interface UserStore extends UserState {
  setProfile: (profile: UserProfile | null) => void
  toggleSound: () => void
  toggleNotifications: () => void
}
```

### useWorkoutStore (`src/stores/workoutStore.ts`)
```typescript
interface WorkoutStore {
  sessions: WorkoutSession[]
  currentSession: WorkoutSession | null
  activeExerciseIndex: number
  setLogs: Record<string, SetLog[]>
  prs: PR[]
  isWorkoutActive: boolean
  startWorkout: (session: WorkoutSession) => void
  completeSet: (exerciseId: string, log: SetLog) => void
  completeExercise: (exerciseId: string) => void
  endWorkout: () => void
  addPR: (pr: PR) => void
}
```

### useNutritionStore (`src/stores/nutritionStore.ts`)
```typescript
interface NutritionStore {
  todayFoods: FoodEntry[]
  todaySupplements: SupplementEntry[]
  water: number
  addFood: (food: FoodEntry) => void
  addSupplement: (supp: SupplementEntry) => void
  addWater: (amount: number) => void
  removeFood: (id: string) => void
}
```

### useScoreStore (`src/stores/scoreStore.ts`)
```typescript
interface ScoreStore {
  currentScore: number
  previousScore: number
  peakScore: number
  peakDate: string
  history: ScoreEntry[]
  challenge: PersonalChallenge | null
  setScore: (score: number) => void
  addEntry: (entry: ScoreEntry) => void
  setChallenge: (c: PersonalChallenge | null) => void
}
```

### useChatStore (`src/stores/chatStore.ts`)
```typescript
interface ChatStore {
  messages: ChatMessage[]
  isTyping: boolean
  hasUnread: boolean
  addMessage: (msg: ChatMessage) => void
  setTyping: (v: boolean) => void
  setUnread: (v: boolean) => void
  markRead: () => void
}
```

### useSleepStore (`src/stores/sleepStore.ts`)
```typescript
interface SleepStore {
  sessions: SleepSession[]
  naps: NapEntry[]
  addSession: (s: SleepSession) => void
  addNap: (n: NapEntry) => void
}
```

### useUIStore (`src/stores/uiStore.ts`)
```typescript
interface UIStore {
  activeRoute: string
  isMobile: boolean
  showChat: boolean
  toast: { message: string; type: 'info' | 'error' } | null
  setRoute: (route: string) => void
  setMobile: (v: boolean) => void
  toggleChat: () => void
  setChat: (v: boolean) => void
  showToast: (message: string, type: 'info' | 'error') => void
  clearToast: () => void
}
```

## TypeScript Types

### Workout (`src/types/workout.ts`)
```typescript
export interface Exercise {
  id: string
  name: string
  muscleGroups: string[]
  targetReps: string // e.g. "6-10"
  sets: number
  presetWeight: number // kg
  restSeconds: number
  isSuperset?: boolean
  supersetPartnerId?: string
}

export interface SetLog {
  setNumber: number
  reps: number
  weight: number
  isMaxEffort: boolean
  completed: boolean
}

export interface WorkoutSession {
  id: string
  date: string
  type: string // "Push", "Pull", "Legs", "Full Body"
  exercises: Exercise[]
  completed: boolean
  duration: number // seconds
  totalVolume: number // kg lifted
  caloriesBurned: number
  prs: PR[]
}

export interface PR {
  exerciseId: string
  exerciseName: string
  previousBest: number
  newBest: number
}

export interface WorkoutPlan {
  id: string
  name: string
  days: WorkoutDay[]
}

export interface WorkoutDay {
  day: string
  type: string
  exercises: Exercise[]
  isRestDay: boolean
}
```

### Nutrition (`src/types/nutrition.ts`)
```typescript
export interface FoodEntry {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  timestamp: string
}

export interface SupplementEntry {
  id: string
  name: string
  dose: string
  timeTaken: string
}

export interface MacroTargets {
  protein: number
  carbs: number
  fat: number
  calories: number
}

export interface DailyNutrition {
  date: string
  foods: FoodEntry[]
  supplements: SupplementEntry[]
  water: number // ml
  macroTargets: MacroTargets
}
```

### User (`src/types/user.ts`)
```typescript
export interface UserProfile {
  id: string
  name: string
  age: number
  height: number // cm
  weight: number // kg
  bodyFat: number
  biologicalAge: number
  memberSince: string
  goals: {
    targetWeight: number
    dailyCalories: number
    dailyProtein: number
    dailyWater: number
    weeklyWorkouts: number
  }
}

export interface UserState {
  profile: UserProfile | null
  soundEnabled: boolean
  darkMode: boolean
  notificationsEnabled: boolean
}
```

### Score (`src/types/score.ts`)
```typescript
export interface ScoreEntry {
  date: string
  score: number
  breakdown: ScoreAction[]
}

export interface ScoreAction {
  action: string
  points: number
}

export interface ScoreHistory {
  currentScore: number
  previousScore: number
  peakScore: number
  peakDate: string
  entries: ScoreEntry[]
}

export interface PersonalChallenge {
  id: string
  targetScore: number
  deadline: string
  currentScore: number
  daysRemaining: number
  isActive: boolean
}
```

### Sleep (`src/types/sleep.ts`)
```typescript
export interface SleepSession {
  id: string
  date: string
  duration: number // minutes
  score: number
  deepPercent: number
  remPercent: number
  hrv: number
  bedtime: string
  wakeTime: string
  debt: number // minutes
}

export interface NapEntry {
  id: string
  duration: number // minutes
  time: string
}

export interface SleepData {
  sessions: SleepSession[]
  naps: NapEntry[]
  personalBest: { score: number; date: string }
}
```

### Chat (`src/types/chat.ts`)
```typescript
export interface ChatMessage {
  id: string
  sender: 'user' | 'dr-life'
  content: string
  timestamp: string
  thumbsUp?: boolean | null
}

export interface QuickLogType {
  id: string
  label: string
  icon: string
}
```
