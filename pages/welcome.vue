<template>
  <div>
    <h1>会員専用ページです</h1>
    <NuxtLink to="/">ホームへ戻る</NuxtLink>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { auth } from '../plugins/firebase'

export default defineComponent({
  setup() {
    const logout = () => {
      auth
        .signOut()
        .then(() => {
          console.log('ログアウトメソッド')
        })
        .catch((e) => {
          console.log('エラー')
        })
    }
    onMounted(() => {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          console.log('login')
        } else {
          console.log('logout')
        }
      })
    })
    return {
      logout,
    }
  },
})
</script>

<style scoped></style>
