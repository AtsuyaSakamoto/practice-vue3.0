let admin

if (process.server) {
  // eslint-disable-next-line no-const-assign
  admin = require('firebase-admin')
  if (!admin.apps.length) {
    const serviceAccount = require('./path/serviceAccountKey.json')
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: '自分のdatabaseURL',
    })
  }
}

export default admin
