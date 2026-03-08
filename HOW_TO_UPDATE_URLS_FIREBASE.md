# Complete Tutorial: Update URLs & Add Firebase

This guide explains the TWO questions you asked in simple, step-by-step format.

---

## Question 1: How to Update URLs in APPS Array?

### 🎯 What You Need to Do
Change the app URLs in `dashboard.html` from the example URLs (dk-...) to YOUR actual app URLs.

### 📍 Where to Find It

1. **Open** `dashboard.html` in any text editor (Notepad, VS Code, etc.)
2. **Press Ctrl+F** (or Cmd+F on Mac) to search
3. **Search for:** `const APPS = [`
4. **You'll find it** around line 380

### 🔧 What It Looks Like Now

```javascript
const APPS = [
    {
        id: 'happyFamily',
        name: 'HappyFamily',
        icon: '👨‍👩‍👧‍👦',
        color: 'purple',
        url: 'https://dk-happyfamily.github.io/HappyFamily/',  // ← OLD
        description: 'Tasks assigned to Dinesh',
        type: 'stat'
    },
    {
        id: 'pageTurn',
        name: 'PageTurn',
        icon: '📖',
        color: 'cyan',
        url: 'https://dk-pageturn.github.io/PageTurn/',  // ← OLD
        description: 'Current book reading progress',
        type: 'progress'
    },
    // ... more apps ...
];
```

### ✏️ How to Update It

**Replace `dk-happyfamily` with `YOUR_USERNAME`**

Example: If your GitHub username is **"johnsmith"**:

```javascript
const APPS = [
    {
        id: 'happyFamily',
        name: 'HappyFamily',
        icon: '👨‍👩‍👧‍👦',
        color: 'purple',
        url: 'https://johnsmith.github.io/HappyFamily/',  // ← NEW
        description: 'Tasks assigned to Dinesh',
        type: 'stat'
    },
    {
        id: 'pageTurn',
        name: 'PageTurn',
        icon: '📖',
        color: 'cyan',
        url: 'https://johnsmith.github.io/PageTurn/',  // ← NEW
        description: 'Current book reading progress',
        type: 'progress'
    },
    // ... continue for all 8 apps ...
];
```

### 📋 All 8 URLs to Update

Here's the COMPLETE list of all URLs in the APPS array. Replace `dk-` with your username for each:

```javascript
// Row 1
url: 'https://YOUR_USERNAME.github.io/HappyFamily/',
url: 'https://YOUR_USERNAME.github.io/PageTurn/',

// Row 2
url: 'https://YOUR_USERNAME.github.io/DailyReminder/',
url: 'https://YOUR_USERNAME.github.io/LifeLog/',

// Row 3
url: 'https://YOUR_USERNAME.github.io/TradeTracker/',
url: 'https://YOUR_USERNAME.github.io/LoveToday/',

// Row 4
url: 'https://YOUR_USERNAME.github.io/CashLedger/',
url: 'https://YOUR_USERNAME.github.io/AngryBird/',
```

### ✅ Easy Way: Find & Replace

Instead of manually changing each URL:

1. **Press Ctrl+H** (or Cmd+H on Mac) for Find & Replace
2. **Find:** `dk-`
3. **Replace with:** `YOUR_USERNAME-`
4. **Click Replace All**

That's it! All 8 URLs get updated at once.

---

## Question 2: How to Add Firebase?

### 🎯 What Firebase Does
Firebase connects your dashboard to **real, live data** from your apps instead of showing dummy/example data.

### 📋 Step 1: Get Your Firebase Config Keys

For **EACH of your 8 Firebase projects**, do this:

1. **Go to** [Firebase Console](https://console.firebase.google.com/)
2. **Select your project** (e.g., "HappyFamily project")
3. **Click ⚙️ Project Settings** (top left corner, small gear icon)
4. **Click the "General" tab**
5. **Scroll down** until you see a code block that looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD_sQ...",
  projectId: "happyfamily-xyz123",
  databaseURL: "https://happyfamily-xyz123.firebaseio.com",
  // ... other fields ...
};
```

**Copy these 3 lines for each project:**
- `apiKey: "AIzaSy..."`
- `projectId: "happyfamily..."`  
- `databaseURL: "https://..."`

### 🎯 Step 2: Add Firebase Config to dashboard.html

Go back to your `APPS` array in `dashboard.html` and add the `firebaseConfig` object to each app.

**BEFORE (without Firebase):**
```javascript
{
    id: 'happyFamily',
    name: 'HappyFamily',
    icon: '👨‍👩‍👧‍👦',
    color: 'purple',
    url: 'https://YOUR_USERNAME.github.io/HappyFamily/',
    description: 'Tasks assigned to Dinesh',
    type: 'stat'
}
```

**AFTER (with Firebase):**
```javascript
{
    id: 'happyFamily',
    name: 'HappyFamily',
    icon: '👨‍👩‍👧‍👦',
    color: 'purple',
    url: 'https://YOUR_USERNAME.github.io/HappyFamily/',
    description: 'Tasks assigned to Dinesh',
    type: 'stat',
    // ADD THIS PART:
    firebaseConfig: {
        apiKey: "AIzaSyD_sQ...",      // Copy from Firebase Console
        projectId: "happyfamily-xyz123",
        databaseURL: "https://happyfamily-xyz123.firebaseio.com"
    }
}
```

Do this for all 8 apps in your APPS array.

### 🎯 Step 3: Add Query Functions (The Code That Fetches Data)

Now you need to tell the dashboard HOW to get the data from Firebase. Add these functions BEFORE the `getAppMetrics()` function in dashboard.html:

```javascript
// ============ HAPPYFAMILY ============
async function getHappyFamilyData(db) {
    try {
        const snapshot = await db.collection('tasks')
            .where('assignedTo', '==', 'dinesh')
            .where('completed', '==', false)
            .get();
        return { value: snapshot.size.toString() };
    } catch (e) {
        return { value: '--' };
    }
}

// ============ PAGETURN ============
async function getPageTurnData(db) {
    try {
        const snapshot = await db.collection('books')
            .where('status', '==', 'reading')
            .limit(1)
            .get();
        if (snapshot.empty) return { value: 0 };
        const percentage = Math.round(snapshot.docs[0].data().progressPercentage || 0);
        return { value: percentage };
    } catch (e) {
        return { value: '--' };
    }
}

// ============ DAILY REMINDER ============
async function getDailyReminderData(db) {
    try {
        const today = new Date().toISOString().split('T')[0];
        const snapshot = await db.collection('reminders')
            .where('date', '==', today)
            .get();
        return { value: snapshot.size.toString() };
    } catch (e) {
        return { value: '--' };
    }
}

// ============ LIFE LOG ============
async function getLifeLogData(db) {
    try {
        const today = new Date().toISOString().split('T')[0];
        const snapshot = await db.collection('activities')
            .where('date', '==', today)
            .get();
        let totalHours = 0;
        snapshot.forEach(doc => {
            totalHours += doc.data().hours || 0;
        });
        return { value: totalHours.toFixed(1) + ' hrs' };
    } catch (e) {
        return { value: '--' };
    }
}

// ============ TRADE TRACKER ============
async function getTradeTrackerData(db) {
    try {
        const snapshot = await db.collection('goals')
            .where('active', '==', true)
            .limit(1)
            .get();
        if (snapshot.empty) return { value: 0 };
        const percentage = Math.round(snapshot.docs[0].data().progressPercentage || 0);
        return { value: percentage };
    } catch (e) {
        return { value: '--' };
    }
}

// ============ LOVE TODAY ============
async function getLoveTodayData(db) {
    try {
        const today = new Date().toISOString().split('T')[0];
        const snapshot = await db.collection('activities')
            .where('date', '==', today)
            .get();
        return { value: snapshot.size.toString() };
    } catch (e) {
        return { value: '--' };
    }
}

// ============ CASH LEDGER ============
async function getCashLedgerData(db) {
    try {
        const today = new Date().toISOString().split('T')[0];
        const snapshot = await db.collection('expenses')
            .where('date', '==', today)
            .get();
        let totalAmount = 0;
        snapshot.forEach(doc => {
            totalAmount += doc.data().amount || 0;
        });
        return { value: '₹' + totalAmount.toFixed(0) };
    } catch (e) {
        return { value: '--' };
    }
}

// ============ ANGRY BIRD ============
async function getAngryBirdData(db) {
    try {
        const today = new Date().toISOString().split('T')[0];
        const snapshot = await db.collection('emotions')
            .where('date', '==', today)
            .get();
        return { value: snapshot.size.toString() };
    } catch (e) {
        return { value: '--' };
    }
}
```

### 🎯 Step 4: Replace getAppMetrics() Function

Find the `getAppMetrics()` function (search for it: Ctrl+F) and **replace the ENTIRE function** with this:

```javascript
async function getAppMetrics(app) {
    try {
        if (!app.db) {
            const appInstance = firebase.initializeApp(app.firebaseConfig, app.id);
            app.db = firebase.firestore(appInstance);
        }

        const db = app.db;
        let data = { value: '--' };

        switch(app.id) {
            case 'happyFamily':
                data = await getHappyFamilyData(db);
                break;
            case 'pageTurn':
                data = await getPageTurnData(db);
                break;
            case 'dailyReminder':
                data = await getDailyReminderData(db);
                break;
            case 'lifeLog':
                data = await getLifeLogData(db);
                break;
            case 'tradeTracker':
                data = await getTradeTrackerData(db);
                break;
            case 'loveToday':
                data = await getLoveTodayData(db);
                break;
            case 'cashLedger':
                data = await getCashLedgerData(db);
                break;
            case 'angryBird':
                data = await getAngryBirdData(db);
                break;
        }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { value: '--' };
    }
}
```

### 🎯 Step 5: Check Your Firestore Field Names

Make sure your Firestore collections have these exact field names:

| App | Collection | Field Names |
|-----|-----------|-------------|
| HappyFamily | tasks | `assignedTo`, `completed` |
| PageTurn | books | `status`, `progressPercentage` |
| Daily Reminder | reminders | `date` |
| Life Log | activities | `date`, `hours` |
| Trade Tracker | goals | `active`, `progressPercentage` |
| Love Today | activities | `date` |
| Cash Ledger | expenses | `date`, `amount` |
| Angry Bird | emotions | `date` |

⚠️ **IMPORTANT: Field names are CASE-SENSITIVE!** If your field is named `Date` instead of `date`, it won't work.

---

## Testing Your Setup

### Test Without Firebase (Easiest First)
1. Update only the URLs (Step 1 above)
2. Upload to GitHub Pages
3. Visit your dashboard
4. Click tiles - they should open your apps ✅
5. See mock data displayed ✅

### Test With Firebase
1. Follow all steps above
2. Save the file
3. Open in browser locally: `Open dashboard.html`
4. Check console for errors: Press F12 → Console tab
5. If you see errors, read the error message - it usually tells you what's wrong!

### Common Errors & Fixes

**Error: "Cannot read property 'collection' of undefined"**
- ❌ Your Firebase config is missing or wrong
- ✅ Double-check the `firebaseConfig` object has all 3 fields

**Error: "Permission denied"**
- ❌ Your Firestore security rules block reads
- ✅ Update Firestore Rules to allow reads:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
    }
  }
}
```

**Data showing "--"**
- ❌ Your collection names don't match
- ✅ Check Firestore console and update collection names in the code
- ✅ Make sure field names match exactly (case-sensitive!)

---

## Summary

### ✅ What You Need to Do

1. **Update URLs** (5 minutes)
   - Find APPS array
   - Replace `dk-` with your GitHub username

2. **Add Firebase** (30 minutes - Optional but recommended)
   - Get Firebase configs from each project
   - Add `firebaseConfig` to each app in APPS array
   - Add 8 query functions
   - Replace `getAppMetrics()` function
   - Check your Firestore field names

That's it! Upload to GitHub and your dashboard will show real data! 🎉

---

## Need More Help?

Read these files in this order:
1. **QUICK_START.txt** ← Start here for overview
2. **SETUP_GUIDE.md** ← Detailed instructions (this guide)
3. **README.md** ← Full documentation

Good luck! 🚀
