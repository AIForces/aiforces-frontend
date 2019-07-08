<template>
  <div>
    <div class="level">
      <div class="level-left">
        <h1 class="title level-item">Турниры</h1>
      </div>
      <div class="level-right">
        <b-button @click="update">
          <b-icon icon="cached"></b-icon>
        </b-button>
      </div>
    </div>
    <b-table
      :data="tournaments"
    >
      <template slot-scope="props">
        <b-table-column label="ID">
          {{ props.row.id }}
        </b-table-column>

        <b-table-column label="Название">
          <router-link class="is-link" :to="`/tournaments/${props.row.id}`">
            {{ props.row.name }}
          </router-link>
        </b-table-column>

        <b-table-column label="Статус">
          <span :class="statusColor(props.row.status)"> {{ props.row.status }}</span>
        </b-table-column>

        <b-table-column label="Время начала">
          {{ props.row.start_at }}
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TournamentsList',
  computed: mapGetters('Tournaments', ['tournaments']),
  methods: {
    ...mapActions('Tournaments', ['update']),
    statusColor(status) {
      if (status.indexOf('Закончен') !== -1) {
        return 'has-text-success';
      }
      return 'has-text-warning';
    },
  },
};
</script>

<style scoped>

</style>
