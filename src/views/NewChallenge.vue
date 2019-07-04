<template>
  <div>
    <h1 class="title">Новая дуэль</h1>
    <h2 class="label">Открытие посылки</h2>
    <b-table
      :data="openedSubmissions"
    >
      <template slot-scope="props">
        <b-table-column label="Выбор">
          <b-button v-if="props.row.id === primary">
            <b-icon icon="heart" size="is-small"></b-icon>
          </b-button>
          <b-button v-else @click="setPrimary(props.row.id)">
            <b-icon icon="heart-outline" size="is-small"></b-icon>
          </b-button>
        </b-table-column>

        <b-table-column field="id" label="ID">
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="name" label="Название">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="created_at" label="Время создания">
          {{ props.row.created_at }}
        </b-table-column>

      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NewChallenge',
  data() {
    return {
      my_chosen_submission: null,
    };
  },
  computed: {
    ...mapGetters('Submissions', {
      openedSubmissions: 'submissions',
    }),
  },
};
</script>

<style scoped>

</style>
