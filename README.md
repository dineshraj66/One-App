# Life Dashboard - Championship Living 🏅

A unified PWA dashboard that connects your 8 Firebase apps in one place with real-time metrics and quick navigation. Featuring a stunning gold medal logo that celebrates your commitment to mastering your personal ecosystem.

## 📱 Features

✅ **Gold Medal Branding** - Premium, animated medal logo symbolizing championship living
✅ **8 App Tiles** - All your life management apps in one place
✅ **Custom Displays** - Progress circles for goals, stat displays for counts
✅ **Real-time Sync** - Updates every 30 seconds
✅ **Mobile Installable** - Add to home screen on iOS/Android
✅ **Offline Support** - Service worker caching
✅ **Beautiful UI** - Modern dark theme with smooth animations
✅ **Quick Navigation** - Click any tile to open the app

---

## 🎯 Dashboard Layout (2 Columns × 4 Rows)

The dashboard is organized in a **2-column, 4-row layout** with custom displays optimized for each app:

### Row 1
| Left | Right |
|------|-------|
| **HappyFamily** 👨‍👩‍👧‍👦 | **PageTurn** 📖 |
| Tasks assigned to Dinesh | Current book progress (%) |
| *Stat Display* | *Progress Circle* |

### Row 2
| Left | Right |
|------|-------|
| **Daily Reminder** 🔔 | **Life Log** 📔 |
| Reminders for today | Hours logged today |
| *Stat Display* | *Stat Display* |

### Row 3
| Left | Right |
|------|-------|
| **Trade Tracker** 📈 | **Love Today** 💕 |
| Goal progress (%) | Activities today |
| *Progress Circle* | *Stat Display* |

### Row 4
| Left | Right |
|------|-------|
| **Cash Ledger** 💰 | **Angry Bird** 😠 |
| Total cash entries today | Entries logged today |
| *Stat Display* | *Stat Display* |

---

## 🎨 Display Types

### Progress Circle
Used for **PageTurn** and **Trade Tracker** - shows percentage progress in an animated SVG circle:
- Animated circle that fills based on percentage
- Large percentage display in center
- Color-matched to app theme
- Smooth animation on data updates

### Stat Display
Used for all other apps - shows numeric or text values:
- Large, easy-to-read value
- Descriptive label
- Color-matched icon
- Optimized for quick scanning

---

## 🚀 Quick Start

### 1. **GitHub Pages Setup**
```bash
# Create a new repository (if not already created)
# Repository name: YOUR_USERNAME.github.io/LifeDashboard

# Upload these 3 files:
# - dashboard.html
# - manifest.json
# - sw.js

# Access your dashboard at:
# https://YOUR_USERNAME.github.io/LifeDashboard/
```

### 2. **Update App URLs** (in dashboard.html)

Find the `APPS` array (around line 380) and update URLs for all 8 apps:

```javascript
const APPS = [
    {
        id: 'happyFamily',
        url: 'https://YOUR_USERNAME.github.io/HappyFamily/',  // ← Update
    },
    {
        id: 'pageTurn',
        url: 'https://YOUR_USERNAME.github.io/PageTurn/',  // ← Update
    },
    // ... and so on for all 8 apps
];
```

### 3. **Test Locally** (Optional)
```bash
# Use a local web server to test before uploading
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

---

## 🔥 Firebase Integration (Optional but Recommended)

To enable **real-time data fetching** from your Firebase apps:

### Step 1: Get Firebase Config
1. Go to each Firebase project's console
2. Project Settings → General Tab
3. Copy the config values (apiKey, projectId, databaseURL)

### Step 2: Update App Metrics Function

In `dashboard.html`, find the `getAppMetrics()` function (around line 560) and update with your actual data:

```javascript
async function getAppMetrics(app) {
    // Replace these mock values with real Firebase calls
    const metrics = {
        happyFamily: { value: '3' },      // ← Tasks assigned to Dinesh
        pageTurn: { value: 65 },          // ← Current book % progress
        dailyReminder: { value: '5' },    // ← Reminders count
        lifeLog: { value: '8.5 hrs' },    // ← Hours logged today
        tradeTracker: { value: 78 },      // ← Goal progress %
        loveToday: { value: '4' },        // ← Activities today
        cashLedger: { value: '₹2,450' },  // ← Cash entries total
        angryBird: { value: '2' }         // ← Entries today
    };
    return metrics[app.id] || { value: '--' };
}
```

### Step 3: Example Firebase Queries

```javascript
// HappyFamily - Tasks for Dinesh
const collection = await db.collection('tasks')
    .where('assignedTo', '==', 'dinesh')
    .where('completed', '==', false)
    .get();
return { value: collection.size.toString() };

// PageTurn - Current book progress
const currentBook = await db.collection('books')
    .where('status', '==', 'reading')
    .limit(1)
    .get();
const percentage = currentBook.docs[0]?.data().progressPercentage || 0;
return { value: Math.round(percentage) };

// Daily Reminder - Today's reminders
const today = new Date().toDateString();
const reminders = await db.collection('reminders')
    .where('date', '==', today)
    .get();
return { value: reminders.size.toString() };

// Trade Tracker - Goal progress
const goal = await db.collection('goals')
    .where('active', '==', true)
    .limit(1)
    .get();
const percentage = goal.docs[0]?.data().progressPercentage || 0;
return { value: Math.round(percentage) };
```

---

## 📲 Install on Mobile

### iOS (Safari)
1. Open dashboard URL in Safari
2. Tap **Share** button (bottom)
3. Select **Add to Home Screen**
4. Name it "Life Dashboard" and tap **Add**
5. App now appears on home screen!

### Android (Chrome)
1. Open dashboard URL in Chrome
2. Tap menu (⋮) at bottom right
3. Select **Install app** or **Add to Home Screen**
4. Confirm installation
5. App appears on home screen!

---

## 🎨 Customization

### Change Refresh Interval
Around line 560 in `dashboard.html`:
```javascript
setInterval(() => fetchAppData(app, tile), 30000);  // 30 seconds
// Change to: 60000 (1 min), 10000 (10 sec), 5000 (5 sec)
```

### Add/Remove Apps
Edit the `APPS` array in `dashboard.html` to reorder or modify apps. The 2-column layout will automatically adjust.

---

## 🐛 Troubleshooting

### Service Worker Issues
If the app isn't updating:

1. Open DevTools → Application → Service Workers
2. Click **Unregister** on all old workers
3. Clear Site Data → **Clear all**
4. Refresh (Ctrl+F5 or Cmd+Shift+R)

### Data Not Displaying
- Check console (F12 → Console) for errors
- Verify app URLs are correct
- Ensure Firebase config is set (if using Firebase)

### Progress Circles Not Animated
- Verify the value is numeric and between 0-100
- Clear browser cache and refresh

---

## 📊 Data Refresh

Dashboard **automatically updates every 30 seconds** when online. Offline:
- Shows cached data from last update
- Service worker serves cached assets
- Reconnects automatically when online

---

## 📦 Files Included

```
📁 LifeDashboard/
├── 📄 dashboard.html    (Main app - 670 lines)
├── 📄 manifest.json     (PWA config)
├── 📄 sw.js            (Service worker)
└── 📄 README.md        (This file)
```

---

## 🏆 You're Now a Champion!

Master your personal ecosystem one day at a time. 🚀
