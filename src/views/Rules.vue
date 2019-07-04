<template>
  <div v-html="rules">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Rules',
  computed: mapGetters('Game', ['rules']),
};
</script>

<style scoped>

</style>
