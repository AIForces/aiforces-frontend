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
      eval(this.statements.js);
    },
  },
};
</script>

<style scoped>

</style>
