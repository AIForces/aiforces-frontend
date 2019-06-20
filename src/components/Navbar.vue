<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h1 class="title">AIForces. Essoila 2019</h1>
      </router-link>
    </div>

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
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>

</style>
