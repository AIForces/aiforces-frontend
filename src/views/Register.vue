<template>
  <keep-alive>
  <div class="columns">
    <div class="column is-5">
      <h1 class="title">
        Регистрация
      </h1>
      <b-field label="Имя пользователя">
        <b-input v-model="username"></b-input>
      </b-field>

      <b-field label="Имя">
        <b-input v-model="name"></b-input>
      </b-field>

      <b-field label="Фамилия">
        <b-input v-model="surname"></b-input>
      </b-field>

      <b-field label="Пароль">
        <b-input v-model="pass" type="password" password-reveal></b-input>
      </b-field>

      <b-field label="Подтвердите пароль">
        <b-input v-model="pass_confirm" type="password" password-reveal></b-input>
      </b-field>


      <b-field>
        <b-button @click.enter="register" type="is-info">Зарегестрироваться</b-button>
      </b-field>
    </div>
  </div>
  </keep-alive>
</template>

<script>
import { showError } from '../utils';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      name: '',
      surname: '',
      pass: '',
      pass_confirm: '',
    };
  },
  methods: {
    register() {
      if (this.pass !== this.pass_confirm) {
        showError('Пароли не совпадают');
      }

      const data = {
        username: this.username,
        name: this.name,
        surname: this.surname,
        password: this.pass,
      };

      this.$store.dispatch('Users/register', data);
    },
  },
};
</script>

<style scoped>

</style>
