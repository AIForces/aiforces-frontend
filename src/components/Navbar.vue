<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img alt="" src="/favicon.ico" class="logo">
        <h1 class="title">AIForces</h1>
      </router-link>
      <a role="button"
         :class="['navbar-burger', {'is-active': activeBurger}]"
         @click="activeBurger = !activeBurger"
         aria-label="menu" aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div :class="['navbar-menu', {'is-active': activeBurger}]">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/rules">
          Правила
        </router-link>
        <router-link class="navbar-item" to="/statements">
          Условия
        </router-link>
        <router-link class="navbar-item" to="/submissions/new">
          Отослать
        </router-link>
        <router-link class="navbar-item" to="/submissions">
          Мои посылки
        </router-link>
        <router-link class="navbar-item" to="/challenges/new">
          Новая дуэль
        </router-link>
        <router-link class="navbar-item" to="/challenges">
          Дуэли
        </router-link>
        <router-link class="navbar-item" to="/tournaments">
          Турниры
        </router-link>
      </div>
      <div v-if="!authorized" class="navbar-end">
          <router-link class="navbar-item" to="/register">
            <b-button type="is-info">Регистрация</b-button>
          </router-link>
          <router-link class="navbar-item" to="/login">
            <b-button type="is-info">Вход</b-button>
          </router-link>
      </div>
      <div v-else class="navbar-end">
        <div class="navbar-item">
         <b-button @click="logout" type="is-danger">Выход</b-button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import resetStore from '../store';

export default {
  name: 'Navbar',
  data() {
    return {
      activeBurger: false,
    };
  },
  computed: mapGetters('Users', ['authorized']),
  methods: {
    ...mapActions('Users', {
      doLogout: 'logout',
    }),
    logout() {
      // TODO: разобраться с разными аккаунтами
      this.doLogout();
      resetStore();
    },
  },
};
</script>

<style scoped>
  .logo {
    margin-right: 5px;
  }
</style>
