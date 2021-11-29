<template>
  <div>
    <input
      type="text"
      placeholder="メールアドレスを入力"
      v-model="state.mail"
    /><br />
    <input type="text" placeholder="パスワード" v-model="state.pass" /><br />
    <p><button @click="login" v-show="!signInUser">ログイン</button></p>
    <p><button @click="logout" v-show="signInUser">ログアウト</button></p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useRouter,
  watchEffect,
} from '@nuxtjs/composition-api'
import { auth, db } from '../plugins/firebase'
import SignUp from '@/components/SignUP.vue'

interface State {
  mail: string
  pass: string
}
export default defineComponent({
  components: {
    SignUp,
  },
  setup(_, { root }) {
    const state = reactive<State>({
      mail: '',
      pass: '',
    })

    let signInUser = ref<boolean>(false)

    const router = useRouter()
    onMounted(() => {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          console.log('login')
          signInUser.value = true
          // router.push('/welcome')
        } else {
          console.log('logout')
          signInUser.value = false
        }
      })
    })

    const login = async () => {
      await auth
        .signInWithEmailAndPassword(state.mail, state.pass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          // userMail.value = 'henkou@aaa.com'
          console.log(state.mail)
          console.log(state.pass)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
          console.log(state.mail)
          console.log(state.pass)
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

    return {
      state,
      logout,
      login,
      signInUser,
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
  width: 200px;
  border-radius: 30px 30px 30px 30px;
}
.btn {
  height: 35px;
  width: 120px;
  margin: 0 auto;
  padding-top: 10px;
  background-color: #eb6100;
  border-radius: 100vh;
  color: white;
}
</style>
