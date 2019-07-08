<template>
  <div v-html="statements.html">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Statements',
  computed: mapGetters('Game', ['statements']),
  created() {
    // eslint-disable-next-line no-eval
    setTimeout(() => { eval(this.statements.js); }, 100);
  },
};
</script>

<style scoped>

</style>
