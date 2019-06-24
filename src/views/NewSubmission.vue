<template>
  <div>
    <h1>Отослать код</h1>
    <b-field label="Название">
      <b-input v-model="name"></b-input>
    </b-field>
    <b-field label="Язык">
      <b-select placeholder="Выберите язык"></b-select>
    </b-field>
    <b-field label="Имя пользователя">
      <b-input v-model="name"></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'NewSubmission',
  data() {
    return {
      name: '',
      compiler: '',
      code: '',
    };
  },
};
</script>

<style scoped>

</style>
