<template>
  <header class="site-header">
    <div class="wrapper site-header__wrapper">
      <a href="#" class="brand">Brand</a>
      <nav class="nav">
        <button class="nav__toggle" aria-expanded="false" type="button">
          menu
        </button>
        <ul class="nav__wrapper">
          <li class="nav__item"><nuxt-link to="/">サインアップ</nuxt-link></li>
          <li class="nav__item"><nuxt-link to="/login">ログイン</nuxt-link></li>
          <li class="nav__item">
            <nuxt-link to="/welcome">ユーザー専用ページ</nuxt-link>
          </li>
          <li class="nav__item"><a href="#">Hire us</a></li>
          <li class="nav__item"><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts"></script>

<style scoped>
li {
  list-style: none;
}
.brand {
  font-weight: bold;
  font-size: 20px;
}

.site-header {
  position: relative;
  background-color: #def7ff;
}

.site-header__wrapper {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
@media (min-width: 600px) {
  .site-header__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0;
    padding-bottom: 0;
  }
}
@media (min-width: 600px) {
  .nav__wrapper {
    display: flex;
  }
}

@media (max-width: 599px) {
  .nav__wrapper {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: -1;
    background-color: #d9f0f7;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  }
  .nav__wrapper.active {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
}

.nav__item a {
  display: block;
  padding: 1.5rem 1rem;
}

.nav__toggle {
  display: none;
}
@media (max-width: 599px) {
  .nav__toggle {
    display: block;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
}
</style>
