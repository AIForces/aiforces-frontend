<template>
  <div v-html="visualizer.html"></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'visualizer',
  computed: {
    ...mapGetters('Game', ['visualizer']),
  },
  created() {
    // eslint-disable-next-line no-eval
    this.$nextTick(() => { eval(this.visualizer.js); });
  },
};
</script>

<style scoped>

</style>
