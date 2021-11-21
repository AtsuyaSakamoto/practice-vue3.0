<template>
  <div>
    <h1>Nuxt.js(CompositionAPI)+TypeScriptでFirebaseと連携する！</h1>
    <h2>メール、パスワードでログイン↓</h2>
    <p>メールアドレス：<input v-model="state.mail" type="text" /></p>
    <p>パスワード：<input v-model="state.pass" type="text" /></p>
    <button @click="signup">サインアップ</button>
    <p><button @click="login">ログイン</button></p>
    <p><button @click="logout">ログアウト</button></p>
    <hr />
    <input v-model="memo.text" type="text" />
    <button @click="addMemo">追加</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { auth } from '../plugins/firebase'

interface State {
  mail: string
  pass: string
}
export default defineComponent({
  setup(_, { root }) {
    /**
     * ログイン機能
     */

    const state = reactive<State>({
      mail: '',
      pass: '',
    })

    const signup = async () => {
      await auth
        .createUserWithEmailAndPassword(state.mail, state.pass)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
        })
        .catch((e) => alert(`失敗:${e.message}`))
      console.log(state.mail)
      console.log(state.pass)
    }
    const login = async () => {
      await auth
        .signInWithEmailAndPassword(state.mail, state.pass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
        })
    }
    const logout = () => {
      auth
        .signOut()
        .then(() => {
          console.log('ログアウトしました')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    /**
     * メモ機能
     */
    const memo = reactive({
      text: null,
    })
    const addMemo = async () => {
      try {
        await root.$fire.firestore.collection('memos').add({
          text: memo.text,
        })
        memo.text = null
      } catch (e) {
        console.error(e)
      }
    }

    return { signup, memo, addMemo, state, logout, login }
  },
})
</script>
