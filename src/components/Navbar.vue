<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h1 class="title">AIForces. Essoila 2019</h1>
      </router-link>
    </div>
    <div class="navbar-menu">
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
        <router-link class="navbar-item" to="/challenges/">
          Дуэли
        </router-link>
        <router-link class="navbar-item" to="/tournament">
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

export default {
  name: 'Navbar',
  computed: mapGetters('Users', ['authorized']),
  methods: mapActions('Users', ['logout']),
};
</script>

<style scoped>

</style>
