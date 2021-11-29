<template>
  <div>
    {{ posts }}
    <h1>会員専用ページです</h1>
    <input size="30" v-model="userMessage" /><br />
    <div class="btn" @click="postMessage">投稿</div>
    <NuxtLink to="/">ホームへ戻る</NuxtLink>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  useRouter,
  ref,
} from '@nuxtjs/composition-api'
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
    const router = useRouter()

    onMounted(() => {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          console.log('login')
        } else {
          console.log('logout')
          router.push('/')
        }
      })
    })
    const posts = ref<any>([])

    const userMessage = ref<string>('')

    const postMessage = () => {
      console.log(userMessage)
      posts.value.push(userMessage)
    }
    return {
      logout,
      postMessage,
      userMessage,
      posts,
    }
  },
})
</script>

<style scoped>
div {
  /* background-color: pink; */
  text-align: center;
}
input {
  margin-bottom: 10px;
  height: 30px;
  /* width: 200px; */
  /* border-radius: 30px 30px 30px 30px; */
}
.btn {
  height: 35px;
  width: 120px;
  margin: 0 auto;
  padding-top: 10px;
  background-color: #eb6100;
  border-radius: 100vh;
  color: white;
  margin-bottom: 30px;
}
</style>
