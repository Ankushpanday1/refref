# 🎮 RefRef Gamification Suite

RefRef now features an industry-leading **Gamification Engine** inspired by top consumer apps (CRED, Zepto, Duolingo, Paytm, MyNaksh), turning standard referral reward links into high-conversion dopamine events.

---

## ✨ Available Gamification Mechanics (9 Live Modules)

| # | Mechanic | App Source / Inspiration | Highlights |
|---|----------|--------------------------|------------|
| 1 | **Zepto Purple Scratch Card** | Zepto | Realistic HTML5 Canvas metallic foil scraping, reveal chimes, confetti blast |
| 2 | **MyNaksh Daily Streak & Rewards Hub** | MyNaksh | 1:1 screen-faithful 7-day stepper, neon active border, refer & earn card, mantra jaap, sunburst modal |
| 3 | **InstaAstro Points Hub** | InstaAstro | Milestone tier progression, top floating "+50 Points" toast, animated coin cascade |
| 4 | **Paytm Cashback Chest Flip** | Paytm | Royal maroon card flip into animated treasure chest with mechanical rolling odometer |
| 5 | **Paytm Spin & Win** | Paytm | 8-segment wheel with countdown timer & 4-point yellow starburst celebration |
| 6 | **Duolingo 4-Stage Flow** | Duolingo | Lesson Complete ➔ Streak Ignite ➔ Commit Goal ➔ Rare Chest opening (Lottie) with 3x XP potion |
| 7 | **CRED Spin the Wheel** | CRED | Luxury 4-quadrant wheel, glowing `YOU WON` neon rim, animated voucher ticket flyout |
| 8 | **CRED 3D Arcade Slot Machine** | CRED | Obsidian chassis, mechanical pull lever, 3 spinning reels, physical ticket dispenser |
| 9 | **Triple Podium Leaderboard** | RefRef Core | Region / National / Global tabs, floating 5-point golden crown, glowing avatar rings, trend arrows |

---

## 🎧 Unified Audio Foley Engine

Web Audio API synthesized sound effects paired with real extracted APK sound effects:
- Metallic foil scratching noise
- Mechanical odometer rolling ticks
- Wheel peg tick clicks
- Slot machine reel spinning (`cred_slot_spin.mp3`) & win fanfare (`cred_slot_win.mp3`)
- Wheel victory chime (`cred_wheel_win.mp3`)
- Coin cascade drops & star chime rewards

---

## 🚀 Embedding in Any Web App (2 Lines of Code)

### 1. Script Tag
```html
<script src="https://your-refref-domain.com/gamify/gamify.js" data-api-key="pk_live_refref_9821"></script>
```

### 2. Launch in Modal
```javascript
const gamify = new Gamify();

// Launch CRED Slot Machine
gamify.launchModal('cred_slot_09');

// Launch Duolingo 4-Stage Flow
gamify.launchModal('duolingo_flow_06');

// Launch MyNaksh 7-Day Streak
gamify.launchModal('mynaksh_checkin_02');
```

### 3. Mount Inline Slot
```html
<div id="gamify-slot"></div>

<script>
  gamify.mount('#gamify-slot', 'gamify_leaderboard_08');
</script>
```

---

## 🛠️ RefRef SDK Integration

If you are using the `@refref/widget` package:

```typescript
import { RefRef } from '@refref/widget';

// Trigger gamification modal directly from RefRef client
window.RefRef.gamify.launchModal('cred_slot_09');

// Mount inline slot
window.RefRef.gamify.mount('#container', 'cred_wheel_07');
```

---

## 📊 Live Gamification Studio

Navigate to `/gamification` in the RefRef Webapp:
- **Mechanics Catalog**: Browse and test all 9 modules live.
- **Interactive Simulator**: Real-time iPhone device mockup with full audio and physics.
- **Customizer**: Customize rewards, promo codes, brand colors, spin costs, and sound settings.
- **1-Click Code Generator**: Copy embed snippets for Next.js, React, HTML, Webflow, and Shopify.
