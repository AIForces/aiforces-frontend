<template>
  <div v-html="rules.html">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Rules',
  computed: mapGetters('Game', ['rules']),
  created() {
    // eslint-disable-next-line no-eval
    this.$nextTick(() => { eval(this.rules.js); });
  },
};
</script>

<style scoped>

</style>
