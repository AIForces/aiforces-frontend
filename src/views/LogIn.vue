<template>
  <keep-alive>
  <div class="columns">
    <div class="column is-5">
      <h1 class="title">
        Вход
      </h1>
      <b-field label="Имя пользователя">
        <b-input v-model="name"></b-input>
      </b-field>

      <b-field label="Пароль">
        <b-input v-model="pass" type="password" password-reveal></b-input>
      </b-field>
      <b-field>
        <b-button @click="login({name, pass})" type="is-info">Войти</b-button>
      </b-field>
    </div>
  </div>
  </keep-alive>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LogIn',
  data() {
    return {
      name: '',
      pass: '',
    };
  },
  methods: mapActions('Users', ['login']),
};
</script>

<style scoped>

</style>
