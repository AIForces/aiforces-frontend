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
    <section class="section">
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
    </section>
    <b-pagination
      :current.sync="currentPage"
      :total="tournamentsList.length"
      :per-page="5"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
    </b-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TournamentsList',
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters('Tournaments', {
      tournamentsList: 'tournaments',
    }),
    tournaments() {
      return this.tournamentsList.slice((this.currentPage - 1) * 5, this.currentPage * 5);
    },
  },
  methods: {
    ...mapActions('Tournaments', ['update']),
    statusColor(status) {
      if (status.indexOf('Закончен') !== -1) {
        return 'has-text-success';
      }
      return 'has-text-warning';
    },
    getCurrentTournaments() {
      console.log('get current tournaments');
      for (let i = 0; i < this.tournaments.length; i += 1) {
        this.$store.dispatch('Tournaments/getTournament', this.tournaments[i].id);
      }
    },
  },
  watch: {
    currentPage() {
      this.getCurrentTournaments();
    },
  },
  created() {
    this.getCurrentTournaments();
  },
};
</script>

<style scoped>

</style>
