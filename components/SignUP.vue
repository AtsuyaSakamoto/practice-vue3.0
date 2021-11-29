<template>
  <div>
    <!-- <p>{{ state.mail }}</p>
    <p>{{ state.pass }}</p> -->
    <h1>サインアップ</h1>
    <input
      type="text"
      placeholder="メールアドレスを入力"
      v-model="state.mail"
      @input="handleInput"
    /><br />
    <input
      type="text"
      placeholder="パスワード"
      v-model="state.pass"
      @input="handleInput"
    /><br />
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
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['input'],
  setup(props, context) {
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

    const handleInput = (e: Event) => {
      const target = e.target as HTMLTextAreaElement
      context.emit('input', target.value)
    }

    return {
      state,
      signup,
      handleInput,
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
