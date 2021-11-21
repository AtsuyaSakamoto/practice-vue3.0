import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STOPAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}
console.log(process.env.API_KEY)

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const googleProvider = new firebase.auth.GoogleAuthProvider()
export { googleProvider }
export const auth = firebase.auth()
export const db = firebase.firestore()
export const Storage = firebase.storage()
export default firebase
