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
  watch: {
    visualizer() {
      // eslint-disable-next-line no-eval
      setTimeout(() => { eval(this.visualizer.js); }, 50);
    },
  },
};
</script>

<style scoped>

</style>
