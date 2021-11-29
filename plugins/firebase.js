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
// // onAuthStateChanged()で現在のuserからidTokenを取得
// const getIdToken = () => {
//   return new Promise((resolve) => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       unsubscribe()
//       if (user) {
//         user.getIdToken().then(
//           (idToken) => resolve(idToken),
//           () => resolve(null)
//         )
//       } else {
//         resolve(null)
//       }
//     })
//   })
// }

// // URLからルートのURLを取得する処理
// const getOriginFromUrl = (url) => {
//   // https://stackoverflow.com/questions/1420881/how-to-extract-base-url-from-a-string-in-javascript
//   const pathArray = url.split('/')
//   const protocol = pathArray[0]
//   const host = pathArray[2]
//   return protocol + '//' + host
// }
// /**
//  *  Service Workderのライフサイクルでfetchしたときの処理
//  */
// self.addEventListener('fetch', (event) => {
//   // リクエストをラップして、ヘッダにFirebase AuthのIdTokenを追加する処理
//   const requestProcessor = (idToken) => {
//     let req = event.request
//     // URLを取得して、httpsもしくはlocalhostかなどをチェック
//     if (
//       self.location.origin === getOriginFromUrl(event.request.url) &&
//       (self.location.protocol === 'https:' ||
//         self.location.hostname === 'localhost') &&
//       idToken
//     ) {
//       // ヘッダ情報をクローンする
//       const headers = new Headers()
//       for (const entry of req.headers.entries()) {
//         headers.append(entry[0], entry[1])
//       }
//       // クローンしたヘッダにFirebase AuthのIdTokenを追加
//       headers.append('Authorization', 'Bearer ' + idToken)
//       try {
//         req = new Request(req.url, {
//           method: req.method,
//           headers,
//           mode: 'same-origin',
//           credentials: req.credentials,
//           cache: req.cache,
//           redirect: req.redirect,
//           referrer: req.referrer,
//           body: req.body,
//           bodyUsed: req.bodyUsed,
//           context: req.context,
//         })
//       } catch (e) {
//         console.error(e)
//       }
//     }
//     return fetch(req)
//   }

//   // 上の関数を使って、全リクエストでIdTokenの取得し、Firebase AuthのIdTokenを追加ようにする
//   event.respondWith(getIdToken().then(requestProcessor, requestProcessor))
// })

// /**
//  *  Service Workderのライフサイクルでactivateしたときの処理
//  */
// self.addEventListener('activate', (event) => {
//   event.waitUntil(clients.claim())
// })

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const googleProvider = new firebase.auth.GoogleAuthProvider()
export { googleProvider }
export const auth = firebase.auth()
export const db = firebase.firestore()
export const Storage = firebase.storage()
export default firebase
