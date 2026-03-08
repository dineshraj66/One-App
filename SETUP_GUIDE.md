# Complete Setup Guide - Life Dashboard

## Step 1: Update URLs in APPS Array

### Where to Find It
Open `dashboard.html` in a text editor and find line ~380. You'll see the `APPS` array that looks like this:

```javascript
const APPS = [
    // Row 1
    {
        id: 'happyFamily',
        name: 'HappyFamily',
        icon: '👨‍👩‍👧‍👦',
        color: 'purple',
        url: 'https://dk-happyfamily.github.io/HappyFamily/',  // ← UPDATE THIS
        description: 'Tasks assigned to Dinesh',
        type: 'stat'
    },
    {
        id: 'pageTurn',
        name: 'PageTurn',
        icon: '📖',
        color: 'cyan',
        url: 'https://dk-pageturn.github.io/PageTurn/',  // ← UPDATE THIS
        description: 'Current book reading progress',
        type: 'progress'
    },
    // ... and so on
];
```

### How to Update Each URL

Replace the placeholder URLs with YOUR actual app URLs. Here's the complete template:

```javascript
const APPS = [
    // Row 1
    {
        id: 'happyFamily',
        name: 'HappyFamily',
        icon: '👨‍👩‍👧‍👦',
        color: 'purple',
        url: 'https://YOUR_GITHUB_USERNAME.github.io/HappyFamily/',  // ← CHANGE THIS
        description: 'Tasks assigned to Dinesh',
        type: 'stat'
    },
    {
        id: 'pageTurn',
        name: 'PageTurn',
        icon: '📖',
        color: 'cyan',
        url: 'https://YOUR_GITHUB_USERNAME.github.io/PageTurn/',  // ← CHANGE THIS
        description: 'Current book reading progress',
        type: 'progress'
    },
    // Row 2
    {
        id: 'dailyReminder',
        name: 'Daily Reminder',
        icon: '🔔',
        color: 'indigo',
        url: 'https://YOUR_GITHUB_USERNAME.github.io/DailyReminder/',  // ← CHANGE THIS
        description: 'Reminders for today',
        type: 'stat'
    },
    {
        id: 'lifeLog',
        name: 'Life Log',
        icon: '📔',
        color: 'blue',
        url: 'https://YOUR_GITHUB_USERNAME.github.io/LifeLog/',  // ← CHANGE THIS
        description: 'Hours logged today',
        type: 'stat'
    },
    // Row 3
    {
        id: 'tradeTracker',
        name: 'Trade Tracker',
        icon: '📈',
        color: 'green',
        url: 'https://YOUR_GITHUB_USERNAME.github.io/TradeTracker/',  // ← CHANGE THIS
        description: 'Goal progress',
        type: 'progress'
    },
    {
        id: 'loveToday',
        name: 'Love Today',
        icon: '💕',
        color: 'amber',
        url: 'https://YOUR_GITHUB_USERNAME.github.io/LoveToday/',  // ← CHANGE THIS
        description: 'Activities today',
        type: 'stat'
    },
    // Row 4
    {
        id: 'cashLedger',
        name: 'Cash Ledger',
        icon: '💰',
        color: 'red',
        url: 'https://YOUR_GITHUB_USERNAME.github.io/CashLedger/',  // ← CHANGE THIS
        description: 'Total cash entries today',
        type: 'stat'
    },
    {
        id: 'angryBird',
        name: 'Angry Bird',
        icon: '😠',
        color: 'pink',
        url: 'https://YOUR_GITHUB_USERNAME.github.io/AngryBird/',  // ← CHANGE THIS
        description: 'Entries logged today',
        type: 'stat'
    }
];
```

### Example Update
If your GitHub username is **"dkpatel"**, the URLs would be:

```javascript
url: 'https://dkpatel.github.io/HappyFamily/'
url: 'https://dkpatel.github.io/PageTurn/'
url: 'https://dkpatel.github.io/DailyReminder/'
// ... and so on
```

---

## Step 2: Add Firebase (Optional but Recommended)

Firebase integration allows real-time data fetching from your apps. This is optional but makes the dashboard much more useful!

### Step 2.1: Get Your Firebase Config

For **each Firebase project**, do this:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (e.g., HappyFamily project)
3. Click **⚙️ Project Settings** (top left)
4. Click the **General** tab
5. Scroll down to find your config:

```javascript
{
  apiKey: "AIzaSyD_...",
  projectId: "happyfamily-12345",
  databaseURL: "https://happyfamily-12345.firebaseio.com",
  // ... other fields
}
```

**Copy these 3 fields for each project:**
- `apiKey`
- `projectId`
- `databaseURL`

### Step 2.2: Update getAppMetrics() Function

Find the `getAppMetrics()` function in dashboard.html (around line 560). You'll see:

```javascript
async function getAppMetrics(app) {
    // Mock data - replace with Firebase calls
    const metrics = {
        happyFamily: { value: '3' },
        pageTurn: { value: 65 },
        dailyReminder: { value: '5' },
        lifeLog: { value: '8.5 hrs' },
        tradeTracker: { value: 78 },
        loveToday: { value: '4' },
        cashLedger: { value: '₹2,450' },
        angryBird: { value: '2' }
    };
    return metrics[app.id] || { value: '--' };
}
```

### Step 2.3: Replace with Real Firebase Queries

Replace the entire function with this template and customize for each app:

```javascript
async function getAppMetrics(app) {
    try {
        // Initialize Firebase for this app (only once)
        if (!app.db) {
            const appInstance = firebase.initializeApp(app.firebaseConfig, app.id);
            app.db = firebase.firestore(appInstance);
        }

        const db = app.db;
        let data = { value: '--' };

        // Each app has its own query logic
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
        console.error('Error fetching data for', app.id, error);
        return { value: '--' };
    }
}
```

### Step 2.4: Add Individual App Query Functions

Add these helper functions **before** the `getAppMetrics()` function:

```javascript
// ============ HAPPYFAMILY ============
async function getHappyFamilyData(db) {
    try {
        // Count tasks assigned to Dinesh that are NOT completed
        const snapshot = await db.collection('tasks')
            .where('assignedTo', '==', 'dinesh')
            .where('completed', '==', false)
            .get();
        return { value: snapshot.size.toString() };
    } catch (e) {
        console.error('HappyFamily error:', e);
        return { value: '--' };
    }
}

// ============ PAGETURN ============
async function getPageTurnData(db) {
    try {
        // Get the current book being read and get its progress percentage
        const snapshot = await db.collection('books')
            .where('status', '==', 'reading')
            .limit(1)
            .get();
        
        if (snapshot.empty) {
            return { value: 0 };
        }
        
        const bookData = snapshot.docs[0].data();
        const percentage = Math.round(bookData.progressPercentage || 0);
        return { value: percentage };
    } catch (e) {
        console.error('PageTurn error:', e);
        return { value: '--' };
    }
}

// ============ DAILY REMINDER ============
async function getDailyReminderData(db) {
    try {
        // Count reminders for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        const snapshot = await db.collection('reminders')
            .where('date', '==', todayString)
            .get();
        
        return { value: snapshot.size.toString() };
    } catch (e) {
        console.error('Daily Reminder error:', e);
        return { value: '--' };
    }
}

// ============ LIFE LOG ============
async function getLifeLogData(db) {
    try {
        // Sum all hours logged today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        const snapshot = await db.collection('activities')
            .where('date', '==', todayString)
            .get();
        
        let totalHours = 0;
        snapshot.forEach(doc => {
            totalHours += doc.data().hours || 0;
        });
        
        return { value: totalHours.toFixed(1) + ' hrs' };
    } catch (e) {
        console.error('Life Log error:', e);
        return { value: '--' };
    }
}

// ============ TRADE TRACKER ============
async function getTradeTrackerData(db) {
    try {
        // Get the active goal and its progress percentage
        const snapshot = await db.collection('goals')
            .where('active', '==', true)
            .limit(1)
            .get();
        
        if (snapshot.empty) {
            return { value: 0 };
        }
        
        const goalData = snapshot.docs[0].data();
        const percentage = Math.round(goalData.progressPercentage || 0);
        return { value: percentage };
    } catch (e) {
        console.error('Trade Tracker error:', e);
        return { value: '--' };
    }
}

// ============ LOVE TODAY ============
async function getLoveTodayData(db) {
    try {
        // Count activities/memories added today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        const snapshot = await db.collection('activities')
            .where('date', '==', todayString)
            .get();
        
        return { value: snapshot.size.toString() };
    } catch (e) {
        console.error('Love Today error:', e);
        return { value: '--' };
    }
}

// ============ CASH LEDGER ============
async function getCashLedgerData(db) {
    try {
        // Sum all cash entries/expenses for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        const snapshot = await db.collection('expenses')
            .where('date', '==', todayString)
            .get();
        
        let totalAmount = 0;
        snapshot.forEach(doc => {
            totalAmount += doc.data().amount || 0;
        });
        
        return { value: '₹' + totalAmount.toFixed(0) };
    } catch (e) {
        console.error('Cash Ledger error:', e);
        return { value: '--' };
    }
}

// ============ ANGRY BIRD ============
async function getAngryBirdData(db) {
    try {
        // Count emotion entries for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        const snapshot = await db.collection('emotions')
            .where('date', '==', todayString)
            .get();
        
        return { value: snapshot.size.toString() };
    } catch (e) {
        console.error('Angry Bird error:', e);
        return { value: '--' };
    }
}
```

### Step 2.5: Update the APPS Array with Firebase Config

Go back to your `APPS` array and add the Firebase config for each app. Update it like this:

```javascript
const APPS = [
    // Row 1
    {
        id: 'happyFamily',
        name: 'HappyFamily',
        icon: '👨‍👩‍👧‍👦',
        color: 'purple',
        url: 'https://YOUR_USERNAME.github.io/HappyFamily/',
        description: 'Tasks assigned to Dinesh',
        type: 'stat',
        // ADD THIS:
        firebaseConfig: {
            apiKey: "AIzaSy...",  // From Firebase Console
            projectId: "happyfamily-xyz",  // From Firebase Console
            databaseURL: "https://happyfamily-xyz.firebaseio.com"  // From Firebase Console
        }
    },
    {
        id: 'pageTurn',
        name: 'PageTurn',
        icon: '📖',
        color: 'cyan',
        url: 'https://YOUR_USERNAME.github.io/PageTurn/',
        description: 'Current book reading progress',
        type: 'progress',
        // ADD THIS:
        firebaseConfig: {
            apiKey: "AIzaSy...",
            projectId: "pageturn-xyz",
            databaseURL: "https://pageturn-xyz.firebaseio.com"
        }
    },
    // ... add for all 8 apps
];
```

---

## Complete Working Example

Here's what it looks like all together:

```javascript
// ============ FIREBASE QUERY FUNCTIONS ============

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

// ... other functions ...

// ============ MAIN METRICS FUNCTION ============

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
            // ... other cases ...
        }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { value: '--' };
    }
}
```

---

## Troubleshooting Firebase

### Common Issues and Solutions

**1. "Cannot read property 'collection' of undefined"**
- Make sure your Firebase config is correct
- Check that the `firebaseConfig` object has all 3 required fields

**2. "Permission denied" errors**
- Check your Firestore security rules
- They should allow read access (at least for the dashboard)
- Example rule:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;  // Allow reads
      allow write: if false; // Block writes
    }
  }
}
```

**3. "No data showing"**
- Check your collection names match your actual Firestore collections
- Verify field names are correct (case-sensitive!)
- Use the date format: YYYY-MM-DD

**4. Data showing "--"**
- Check browser console (F12 → Console tab) for error messages
- Verify your Firebase project has the data you're querying
- Test your queries in Firebase Console first

---

## Quick Reference

### Field Names to Check in Your Firestore

| App | Collection | Important Fields |
|-----|-----------|------------------|
| HappyFamily | tasks | assignedTo, completed |
| PageTurn | books | status, progressPercentage |
| Daily Reminder | reminders | date |
| Life Log | activities | date, hours |
| Trade Tracker | goals | active, progressPercentage |
| Love Today | activities | date |
| Cash Ledger | expenses | date, amount |
| Angry Bird | emotions | date |

Make sure your actual Firestore field names match these!

---

## Testing

### Test Without Firebase First
1. Use the mock data (default setup)
2. Upload to GitHub Pages
3. Verify the dashboard loads and displays mock data
4. Then add Firebase

### Test Firebase Locally
```bash
# Use a local server
python3 -m http.server 8000

# Visit http://localhost:8000
# Check console (F12) for any errors
```

---

## Final Checklist

- ✅ Updated all 8 URLs in APPS array
- ✅ Added Firebase configs for each app
- ✅ Updated getAppMetrics() function
- ✅ Added all 8 helper functions
- ✅ Updated Firestore collection names to match your data
- ✅ Set Firestore security rules for read access
- ✅ Tested locally
- ✅ Uploaded to GitHub Pages
- ✅ Tested on mobile

You're all set! 🚀
