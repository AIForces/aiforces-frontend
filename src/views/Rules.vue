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
      eval(this.rules.js);
    },
  },
};
</script>

<style scoped>

</style>
