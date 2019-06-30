<template>
<div>
  <b-button @click="active = true">
    <b-icon icon="code-braces" size="is-small"></b-icon>
  </b-button>
  <b-modal :active.sync="active">
    <highlight-code :lang="validateLanguage()">
      {{ code }}
    </highlight-code>
  </b-modal>
</div>
</template>

<script>
export default {
  name: 'ShowCodeButton',
  props: ['code', 'language'],
  data() {
    return {
      active: false,
    };
  },
  methods: {
    validateLanguage() {
      if (this.language.indexOf('C++') !== -1) {
        return 'c++';
      } if (this.language.indexOf('Python') !== -1) {
        return 'py';
      }
      return '';
    },
  },
};
</script>

<style scoped>

</style>
