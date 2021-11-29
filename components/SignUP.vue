<template>
  <div>
    <h1>サインアップ</h1>
    <input
      type="text"
      placeholder="メールアドレスを入力"
      v-model="state.mail"
    /><br />
    <input type="text" placeholder="パスワード" /><br />
    <div class="btn" @click="signup">サインアップ</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import { auth, db } from '../plugins/firebase'

interface UserInfo {
  mail: string
  pass: string
}

export default defineComponent({
  setup(props, context) {
    props: ['state.mail']

    const state = reactive<UserInfo>({
      mail: '',
      pass: '',
    })

    const signup = async () => {
      console.log('発火')
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

    return {
      state,
      signup,
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
