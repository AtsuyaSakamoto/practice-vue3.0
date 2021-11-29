<template>
  <div>
    <h1>CompositionAPI</h1>

    <!-- <SignUp :value="[state.mail, state.pass]" /> -->
    <SignUp v-model="state.mail" />

    <!-- <p><button @click="login" v-show="!signInUser">ログイン</button></p>
    <p><button @click="logout" v-show="signInUser">ログアウト</button></p> -->

    <hr />
    <input v-model="memo.text" type="text" />
    <button @click="addMemo">追加</button>

    <!-- ① モーダル表示ボタン -->
    <button @click="showModal" class="p-btn">モーダル表示ボタン</button>

    <!-- ② モーダル -->
    <div v-if="modalVisible" @click="closeModal" class="l-modal">
      <div @click="cancelEvent" class="p-modal">
        <h2 class="p-modal__title">Vueモーダル</h2>
        <p>Hello World!</p>

        <!-- モーダルを閉じるボタン -->
        <div @click="closeModal" class="p-modal__btn--close">×</div>
      </div>
    </div>

    <!-- ③ モーダル表示時の背景色（薄い黒） -->
    <div v-if="modalBgVisible" class="l-modal__bg"></div>
    <!-- ハンバーガーメニュー -->
    <button type="button" class="menu-btn" @click="open = !open">
      <!-- <i class="fa fa-bars" aria-hidden="true"></i> -->ボタン
    </button>
    <!-- <div class="menu" v-bind:class="{ 'is-active': open }">
      <div class="menu__item">TOP</div>
      <div class="menu__item">ABOUT</div>
      <div class="menu__item">BLOG</div>
      <div class="menu__item">CONTACT</div>
    </div> -->
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
    /**
     * ログイン機能
     */

    const state = reactive<State>({
      mail: '',
      pass: '',
    })

    let signInUser = ref<boolean>(false)

    let userMail = reactive<any>({})
    // watchEffect(() => console.log(userMail))
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

    /**
     * メモ機能
     */
    const memo = reactive({
      text: null,
    })
    const addMemo = async () => {
      try {
        await db.collection('memos').add({
          text: memo.text,
        })
        memo.text = null
      } catch (e) {
        console.error(e)
      }
      console.log('発火')
    }
    let modalVisible = ref<boolean>(false) // モーダル
    let modalBgVisible = ref<boolean>(false) //モーダル背景色（薄黒）
    const showModal = () => {
      modalVisible.value = true
      modalBgVisible.value = true
    }
    const closeModal = () => {
      modalVisible.value = false
      modalBgVisible.value = false
    }
    const cancelEvent = (event: Event) => {
      event.stopPropagation()
    }

    let open = ref<boolean>(false)

    return {
      memo,
      addMemo,
      state,
      logout,
      login,
      modalVisible,
      modalBgVisible,
      showModal,
      closeModal,
      cancelEvent,
      open,
      userMail,
      signInUser,
    }
  },
})
</script>

<style scoped>
/* ==================================
// モーダル背景（薄黒）
// ==================================*/
.l-modal__bg {
  width: 100%;
  height: 100%;
  background: rgba(89, 89, 89, 0.6);
  position: fixed;
  top: 0;
  left: 0;
}

/* ==================================
// モーダル
// ==================================*/
/* レイアウト */
.l-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}

/* モーダルのサイズなど */
.p-modal {
  width: 600px;
  background: #fff;
  border-radius: 3px;
  padding: 10px 25px;
  box-sizing: border-box;
  position: relative;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

/* モーダル内 タイトル */
.p-modal__title {
  font-size: 24px;
  margin-bottom: 25px;
  font-weight: bold;
}

/* モーダル閉じるボタン */
.p-modal__btn--close {
  font-size: 36px;
  position: absolute;
  top: 0px;
  right: 20px;
}

.p-modal__btn--close:hover {
  cursor: pointer;
}

/* ==================================
// ボタン
// ==================================*/
.p-btn {
  background: #4f9df4;
  outline: none;
  border: none;
  display: block;
  width: 200px;
  height: 50px;
  margin: 100px auto;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 2px 3px -2px rgba(0, 0, 0, 0.15);
  color: #fff;
  font-size: 16px;
  border-radius: 7px;
  transition: 0.5s;
}
</style>
