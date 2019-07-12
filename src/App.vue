<template>
  <div>
    <v-navbar/>
    <div class="сolumns">
      <div class="column is-11 is-offset-1" style="margin: auto">
        <div class="notification">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <v-footer/>
  </div>
</template>

<script>
import VNavbar from './components/Navbar.vue';
import VFooter from './components/Footer.vue';

export default {
  components: {
    VNavbar,
    VFooter,
  },
};
</script>

<style lang="scss">
</style>
