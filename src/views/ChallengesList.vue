<template>
  <div>
    <div class="level">
      <div class="level-left">
        <h1 class="title level-item">Дуэли</h1>
      </div>
      <div class="level-right">
        <b-button @click="update">
          <b-icon icon="cached"></b-icon>
        </b-button>
      </div>
    </div>
    <b-table
      :data="challenges"
    >
      <template slot-scope="props">
        <b-table-column field="id" label="ID">
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="created_at" label="Время создания">
          {{ props.row.created_at }}
        </b-table-column>

        <b-table-column field="player1" label="Игрок 1">
          {{ props.row.player1 }}
        </b-table-column>

        <b-table-column field="player2" label="Игрок 2">
          {{ props.row.player2 }}
        </b-table-column>

        <b-table-column field="level" label="Уровень">
          {{ props.row.level }}
        </b-table-column>

        <b-table-column field="status" label="Статус">
          <span :class="statusColor(props.row.status)">
            {{ props.row.status }}
          </span>
        </b-table-column>

        <b-table-column field="player1_verdict" label="Вердикт 1">
          <span :class="verdictColor(props.row.player1_verdict)">
            {{ props.row.player1_verdict }}
          </span>
        </b-table-column>

        <b-table-column field="player2_verdict" label="Вердикт 2">
           <span :class="verdictColor(props.row.player2_verdict)">
             {{ props.row.player2_verdict }}
           </span>
        </b-table-column>

        <b-table-column field="winner" label="Победитель">
          {{ props.row.winner }}
        </b-table-column>

        <b-table-column label="Игра">
          <b-button
            tag="router-link"
            :to="`/visualizer/?id=${props.row.id}`"
          >
            <b-icon icon="gamepad-variant"></b-icon>
          </b-button>
        </b-table-column>

      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ChallengeList',
  methods: {
    update() {
      this.$store.dispatch('Challenges/update');
    },
    verdictColor(verdict) {
      if (verdict === 'OK') {
        return 'has-text-success';
      }
      return 'has-text-danger';
    },
    statusColor(status) {
      if (status === 'Протестировано') {
        return 'has-text-success';
      }
      return 'has-text-warning';
    },
  },
  computed: {
    ...mapGetters('Challenges', ['challenges']),
  },
};
</script>

<style scoped>

</style>
