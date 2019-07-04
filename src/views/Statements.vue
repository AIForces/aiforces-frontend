<template>
  <div v-html="statements">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Statements',
  computed: mapGetters('Game', ['statements']),
};
</script>

<style scoped>

</style>
