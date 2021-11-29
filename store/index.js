// export const actions = {
//   async nuxtServerInit(
//     { state, commit, dispatch },
//     { app, error, route, redirect, req }
//   ) {
//     // requestのAuthorizationからIDトークンを取得
//     const authorizationHeader = req.headers.authorization || ''

//     //配列化
//     const components = authorizationHeader.split(' ')

//     //配列の２番目の要素がトークンID
//     const token = components.length > 1 ? components[1] : ''
//     if (!token) return

//     // firebase-adminの初期化
//     const admin = require('~/utils/firebaseAdmin').default
//     if (!admin) return

//     // IDトークンの検証＆デコード: 有効期限などをFirebaseでチェック
//     const decodedClaims = await admin.auth().verifyIdToken(token)

//     // 検証結果からuser情報を取得
//     //decodedClaims:デコードした属性情報
//     const user = decodedClaims

//     // TODO:user.user_idがuid
//     // uid使った処理を以下に書く
//   },
// }
