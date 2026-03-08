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
            url: 'https://dineshraj66.github.io/PageTurn/',
            firebase: {
                apiKey: "YOUR_PAGETURN_API_KEY",
                projectId: "pageturn-project-id",
                databaseURL: "https://pageturn-db-url"
            }
        },
        dailyReminder: {
            url: 'https://dineshraj66.github.io/DailyReminder/',
            firebase: {
                apiKey: "YOUR_DAILYREMINDER_API_KEY",
                projectId: "dailyreminder-project-id",
                databaseURL: "https://dailyreminder-db-url"
            }
        },
        lifeLog: {
            url: 'https://dineshraj66.github.io/LifeLog/',
            firebase: {
                apiKey: "YOUR_LIFELOG_API_KEY",
                projectId: "lifelog-project-id",
                databaseURL: "https://lifelog-db-url"
            }
        },
        tradeTracker: {
            url: 'https://dineshraj66.github.io/TradeTracker/',
            firebase: {
                apiKey: "YOUR_TRADETRACKER_API_KEY",
                projectId: "tradetracker-project-id",
                databaseURL: "https://tradetracker-db-url"
            }
        },
        loveToday: {
            url: 'https://dineshraj66.github.io/LoveToday/',
            firebase: {
                apiKey: "YOUR_LOVETODAY_API_KEY",
                projectId: "lovetoday-project-id",
                databaseURL: "https://lovetoday-db-url"
            }
        },
        cashLedger: {
            url: 'https://dineshraj66.github.io/CashLedger/',
            firebase: {
                apiKey: "YOUR_CASHLEDGER_API_KEY",
                projectId: "cashledger-project-id",
                databaseURL: "https://cashledger-db-url"
            }
        },
        angryBird: {
            url: 'https://dineshraj66.github.io/AngryBird/',
            firebase: {
                apiKey: "YOUR_angrybird_API_KEY",
                projectId: "angrybird-project-id",
                databaseURL: "https://angrybird-db-url"
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
