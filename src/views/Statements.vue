<template>
  <div v-html="statements.html">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Statements',
  computed: mapGetters('Game', ['statements']),
  watch: {
    statements() {
      // eslint-disable-next-line no-eval
      setTimeout(() => { eval(this.statements.js); }, 50);
    },
  },
};
</script>

<style scoped>

</style>
