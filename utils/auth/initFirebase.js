import firebase from 'firebase/app'
import 'firebase/auth' // If you need it
import 'firebase/firestore' // If you need it
import 'firebase/storage' // If you need it
import 'firebase/analytics' // If you need it
import 'firebase/performance' // If you need it

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

export default function initFirebase() {

    // Check that `window` is in scope for the analytics module!
    if (typeof window !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp(config)
        // To enable analytics. https://firebase.google.com/docs/analytics/get-started
        if ('measurementId' in config) {
            firebase.analytics()
            firebase.performance()
        }
    }
}