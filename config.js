// ============================================================
// DASHBOARD CONFIG - Edit this file, NOT dashboard.html!
// ============================================================
// This keeps all app configurations in one place
// Update URLs and Firebase configs here only!
// ============================================================

const DASHBOARD_CONFIG = {
    // GitHub username for your apps
    github_username: 'dineshraj66',
    
    // Base URL for all apps on GitHub Pages
    github_base_url: 'https://dineshraj66.github.io',
    
    // Firebase configuration for each app
    apps: {
        happyFamily: {
            url: 'https://dineshraj66.github.io/HappyFamily/',
            firebase: {
                apiKey: "AIzaSyAYMam4tBdUxASImlaYiHMw0RiBHUWtaWk",
                projectId: "happyfamily-e4f68",
                databaseURL: "https://happyfamily-e4f68-default-rtdb.asia-southeast1.firebasedatabase.app"
            }
        },
        pageTurn: {
        url: 'https://dineshraj66.github.io/Page_Turn/',
        firebase: {
        apiKey: "AIzaSyD-2SCMUJsrkmmWo4IUmWpjPu5TC99C-ho",
        projectId: "book-tracker-5bc5f",
        authDomain: "book-tracker-5bc5f.firebaseapp.com",
        storageBucket: "book-tracker-5bc5f.firebasestorage.app",
        messagingSenderId: "689545850122",
        appId: "1:689545850122:web:f0d244bcf9a4c9e2c51ef3"
        }
        },
        dailyReminder: {
            url: 'https://dineshraj66.github.io/Daily-Reminder-App/',
            firebase: {
                apiKey: "AIzaSyAAfFKsEwc-ZrKmtnKaCOMIB03es0dRu38",
                projectId: "taskreminderapp-28eeb",
                databaseURL: "https://taskreminderapp-28eeb-default-rtdb.asia-southeast1.firebasedatabase.app"
            }
        },
        lifeLog: {
        url: 'https://dineshraj66.github.io/Life_Log/',
        firebase: {
        apiKey: "AIzaSyCXK_X1e_K_-Wz-gE_9g6dm96vMLdKViq4",
        projectId: "daily-events-a3151",
        authDomain: "daily-events-a3151.firebaseapp.com",
        storageBucket: "daily-events-a3151.firebasestorage.app",
        messagingSenderId: "744894479261",
        appId: "1:744894479261:web:ae30525105eb58830f8d74"
        }
        },
        tradeTracker: {
        url: 'https://dineshraj66.github.io/Trade-Tracker/',
        firebase: {
        apiKey: "AIzaSyCr5O3rDc-UfazAwnqTS8KOEvn22ksHu3U",
        projectId: "trade-tracker-71027",
        authDomain: "trade-tracker-71027.firebaseapp.com",
        storageBucket: "trade-tracker-71027.firebasestorage.app",
        messagingSenderId: "702315259190",
        appId: "1:702315259190:web:e2716abba4080558dc3f97"
        }
        },
        loveToday: {
        url: 'https://dineshraj66.github.io/Love-Today/',
        firebase: {
        apiKey: "AIzaSyAtmbfK7tKPTioxoQuC0kqq9Y0MGC95wPE",
        projectId: "love-today-231dc",
        authDomain: "love-today-231dc.firebaseapp.com",
        storageBucket: "love-today-231dc.firebasestorage.app",
        messagingSenderId: "576243792568",
        appId: "1:576243792568:web:1e4acfb0c4795dc318524d"
        }
        },
        cashLedger: {
            url: 'https://dineshraj66.github.io/Cash-Ledger/',
            firebase: {
                apiKey: "AIzaSyD8R4KazYZRrms8PBb6Ok7UI5XQQed9v8s",
                projectId: "cashledger-project-id",
                databaseURL: "https://cash-ledger-app-b4f57-default-rtdb.asia-southeast1.firebasedatabase.app"
            }
        },
        angryBird: {
            url: 'https://dineshraj66.github.io/Angry-Bird/angry-bird-app.html',
            firebase: {
                apiKey: "AIzaSyAtgu0H9O1pj3abAOHUpM6qdrIGzw9WRYc",
                projectId: "angry-bird-2776f",
                databaseURL: "https://angry-bird-2776f-default-rtdb.asia-southeast1.firebasedatabase.app"
            }
        }
    }
};

// Helper function to get app config
function getAppConfig(appId) {
    return DASHBOARD_CONFIG.apps[appId];
}

// Helper function to get app URL
function getAppUrl(appId) {
    return DASHBOARD_CONFIG.apps[appId]?.url || '';
}

// Helper function to get Firebase config
function getFirebaseConfig(appId) {
    return DASHBOARD_CONFIG.apps[appId]?.firebase || {};
}

// Export for use in dashboard