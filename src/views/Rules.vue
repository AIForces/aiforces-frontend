<template>
  <div v-html="rules.html">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Rules',
  computed: mapGetters('Game', ['rules']),
  watch: {
    rules() {
      // eslint-disable-next-line no-eval
      setTimeout(() => { eval(this.rules.js); }, 50);
    },
  },
};
</script>

<style scoped>

</style>
