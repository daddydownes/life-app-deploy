# LIFE APP — SHARED SESSION STATE
# Both CLI Kimi and Webapp Kimi read this file on start.
# CLI: reads directly from disk.
# Webapp: reads from https://raw.githubusercontent.com/daddydownes/life-app/main/SESSION.md
# Last updated: 2026-05-23

---

## CURRENT FOCUS
Fix duplicate entrance animation bug in PageTransition.tsx — DONE (commit e772f3b)

## NEXT STEP
Ask Jacob what to build next.

## BLOCKER
None.

---

## ACTIVE WORK LOG

| Date | Who | What | Commit |
|------|-----|------|--------|
| 2026-05-23 | CLI | Fixed duplicate animation bug — tlRef guard, hasMounted ref, state reset | e772f3b |
| 2026-05-23 | CLI | Added GitHub Pages auto-deploy | 06c2bad |
| 2026-05-23 | CLI | Created master PROMPT.md | 8845ffd |
| 2026-05-23 | CLI | Established LIFE-clean as canonical repo | 098d41f |

---

## KNOWN BUGS

- [ ] **PageTransition duplicate animation** — FIXED e772f3b
- [ ] **Missing components** — SetLogger, ExerciseCard, MuscleDiagram, WaterContainer, MacroCard, SearchBar, GoldProgressBar, ScoreChip, InteractiveChart, CalendarStrip, CometTrail
- [ ] **Build system** — Node path not configured on Windows. `npm run dev` works if Node is in PATH.

---

## WEBAPP KIMI — FEEDBACK BOARD
# Webapp Kimi: paste visual feedback here after browsing the deployed site.
# Deployed URL: https://daddydownes.github.io/life-app/

| Date | Screen | Issue | Severity |
|------|--------|-------|----------|
| — | — | — | — |

---

## DECISIONS PENDING
None.

---

## HOW TO USE THIS FILE

**CLI Kimi:**
```
ReadFile: C:\Users\jacob\Desktop\LIFE-clean\SESSION.md
```
Update after every commit. Push to GitHub.

**Webapp Kimi:**
Browse to: https://raw.githubusercontent.com/daddydownes/life-app/main/SESSION.md
Or ask user to paste it.

**Jacob:**
Update this file with new focus/blocker before ending any session.
