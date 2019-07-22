<template>
  <div>
    <h1 class="title">Отослать код</h1>
    <b-field label="Название">
      <b-input v-model="name"></b-input>
    </b-field>
    <b-field label="Язык">
      <b-select placeholder="Выберите язык" v-model="compiler">
        <option
          v-for="option in langs.map((e, i) => {return  {el: e, id: i} })"
          :value="option.el"
          :key="option.id">
          {{ option.el }}
        </option>
      </b-select>
    </b-field>
    <b-field label="Исходный код (drag&drop поддерживается)">
      <b-upload v-model="file"
                @input="readFile"
                drag-drop
                expanded
                style="width: 100%;"
      >
        <b-input v-model="code" type="textarea" expanded></b-input>
      </b-upload>
    </b-field>
    <b-field>
      <b-button @click="create" type="is-info">Отправить</b-button>
    </b-field>
  </div>
</template>

<script>

import { showError } from '../utils';

export default {
  name: 'NewSubmission',
  data() {
    return {
      name: '',
      compiler: null,
      code: '',
      file: null,
      langs: ['Python 3.7', 'GNU C++ 17'],
    };
  },
  methods: {
    readFile(file) {
      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        this.code = reader.result;
      };
      reader.readAsText(file);
    },
    create() {
      console.log('create');
      if (!this.name) {
        showError('Укажите имя');
        return;
      }
      if (!this.code) {
        showError('Вставьте код');
        return;
      }
      if (!this.compiler) {
        showError('Укажите язык');
        return;
      }
      this.$store.dispatch('Submissions/create', {
        name: this.name,
        code: this.code,
        compiler: this.compiler,
      });
    },
  },
  computed: {
  },
  components: {
  },
};
</script>

<style lang="scss">
  .upload .upload-draggable {
    width: 100%;
  }
  .textarea {
    height: 300px;
  }
</style>
