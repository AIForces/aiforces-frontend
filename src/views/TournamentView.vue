<template>
  <div>
    <div class="level">
      <div class="level-left">
        <h1 class="title level-item">{{ tournament.name }}</h1>
      </div>
      <div class="level-right">
        <b-button @click="update">
          <b-icon icon="cached"></b-icon>
        </b-button>
      </div>
    </div>

    <h1 class="title is-4">Рейтинг участников</h1>
    <b-table
      :data="rating"
    >
      <template slot-scope="props">
        <b-table-column label="№">
          <span>{{ props.index + 1 }}</span>
        </b-table-column>

        <b-table-column label="Игрок">
          <span>{{ users[props.row[0]].username }}</span>
        </b-table-column>

        <b-table-column label="Счёт">
          <span>{{ props.row[1] }}</span>
        </b-table-column>
      </template>
    </b-table>
    <br>

    <b-field grouped group-multiline>
      <p class="control" v-for="user in users" :key="user.id">
        <b-button
          :type=" (active_user === user.id) ? 'is-success' : 'is-info'"
          @click="active_user = user.id"
        >
          {{ user.username }}
        </b-button>
      </p>
    </b-field>

    <b-table
      :data="fightTable"
    >
      <template slot-scope="props">
        <b-table-column label="Игрок">
          <span> {{ users[props.row[0]].username }}</span>
        </b-table-column>

        <b-table-column label="Противник">
          <span>{{ users[props.row[1]].username }}</span>
        </b-table-column>

        <b-table-column label="Побед" centered>
          <span class="tag is-success">{{props.row[2][0]}}</span>
        </b-table-column>

        <b-table-column label="В ничью" centered>
          <span class="tag is-warning"> {{props.row[2][1]}} </span>
        </b-table-column>

        <b-table-column label="Поражений" centered>
          <span class="tag is-danger">{{props.row[2][2]}} </span>
        </b-table-column>

      </template>
    </b-table>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'TournamentView',
  data() {
    return {
      active_user: null,
    };
  },
  computed: {
    ...mapGetters('Tournaments', { tournamentsInfo: 'tournamentsInfo' }),
    ...mapGetters('Users', { getUsers: 'users', self_id: 'selfId' }),
    tournament() {
      return this.tournamentsInfo[Number(this.id)];
    },
    users() {
      const users = {};
      for (let i = 0; i < this.getUsers.length; i += 1) {
        const user = this.getUsers[i];
        if (this.tournament.data[user.id]) users[user.id] = user;
      }
      return users;
    },
    fightTable() {
      const firstStep = [];
      console.log('active user', this.active_user);
      Object.entries(this.tournament.data[this.active_user]).forEach((value) => {
        if (Number(value[0]) !== this.active_user) {
          firstStep.push([this.active_user, ...value]);
        }
      });
      const secondStep = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const [user, fights] of Object.entries(this.tournament.data)) {
        if (Number(user) !== this.active_user) {
          // eslint-disable-next-line no-restricted-syntax
          for (const [opponent, fight] of Object.entries(fights)) {
            if (Number(opponent) === this.active_user) {
              const f = [user, opponent, fight];
              secondStep.push(f);
            }
          }
        }
      }
      return firstStep.concat(secondStep);
    },
    rating() {
      const rating = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const userId of Object.keys(this.users)) {
        rating[userId] = 0;
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const [id, data] of Object.entries(this.tournament.data)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [opponentId, fight] of Object.entries(data)) {
          if (opponentId !== id) {
            rating[id] += fight[0] * 3 + fight[1];
            rating[opponentId] += fight[1] + fight[2] * 3;
          }
        }
      }
      return Object.entries(rating)
        .sort((a, b) => {
          if (a[1] < b[1]) return 1;
          if (a[1] === b[1]) return 0;
          return -1;
        });
    },
  },
  methods: {
    update() {
      this.$store.dispatch('Tournaments/getTournament', this.id);
    },
  },
  created() {
    console.log('tournament created', this.self_id);
    this.active_user = this.self_id;
  },
  props: ['id'],
};
</script>

<style scoped>

</style>
