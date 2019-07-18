<template>
  <keep-alive>
  <div v-html="statements.html">
  </div>
  </keep-alive>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Statements',
  computed: mapGetters('Game', ['statements']),
  created() {
    // eslint-disable-next-line no-eval
    this.$nextTick(() => { eval(this.statements.js); });
  },
};
</script>

<style scoped>

</style>
