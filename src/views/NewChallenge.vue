<template>
  <keep-alive>
  <div>
    <div class="level">
      <div class="level-left">
        <h1 class="title level-item">Новая дуэль</h1>
      </div>
      <div class="level-right">
        <b-button @click="update">
          <b-icon icon="cached"></b-icon>
        </b-button>
      </div>
    </div>
    <div class="container">
      <h2 class="title is-5">Шаг 1. Выберите свою посылку</h2>
      <h2 class="label">Открытие посылки</h2>
      <!-- Opened Submissions -->
      <b-table
        :data="openedSubmissions"
      >
        <template slot-scope="props">
          <b-table-column label="Выбор">
            <b-button v-if="props.row.id === my_chosen_submission">
              <b-icon icon="heart" size="is-small"></b-icon>
            </b-button>
            <b-button v-else @click="my_chosen_submission = props.row.id">
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
      <br>
      <!-- Closed Submissions -->
      <h2 class="label">Закрытые посылки</h2>
      <b-table
        :data="closedSubmissions"
      >
        <template slot-scope="props">
          <b-table-column label="Выбор">
            <b-button v-if="props.row.id === my_chosen_submission">
              <b-icon icon="heart" size="is-small"></b-icon>
            </b-button>
            <b-button v-else @click="my_chosen_submission = props.row.id">
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
      <br>

      <h2 class="title is-5">Шаг 2. Выберите противника</h2>
      <b-select placeholder="Противник"
                v-model="opponent"
                :disabled="!allowUsers"
      >
        <option v-for="user in users" :value="user.id"
                :key="user.id"
        >
          {{ user.username }}
        </option>
      </b-select>
      <br>

      <h2 class="title is-5">Шаг 3. Выберите посылку противника</h2>
      <b-table
        :data="opponentSubmissions"
      >
        <template slot-scope="props">
          <b-table-column label="Выбор">
            <b-button v-if="props.row.id === opponent_chosen_submission">
              <b-icon icon="heart" size="is-small"></b-icon>
            </b-button>
            <b-button v-else @click="opponent_chosen_submission = props.row.id">
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
      <br>

      <h2 class="title is-5">Шаг 4. Выберите уровень</h2>
      <b-field>
        <template v-for="i in 5">
          <p class="control" :key="i">
            <b-button  @click="level = i" :type="(level === i) ?'is-info' : ''"> {{ i }}</b-button>
          </p>
        </template>
      </b-field>
      <br>

      <h2 class="title is-5">Шаг 5. Выберите, кто ходит первый</h2>
      <b-field>
        <p class="control">
          <b-button
            @click="first_step = 1"
            :type="(first_step === 1) ?'is-info' : ''"
          >
            Я
          </b-button>
        </p>
        <p class="control">
          <b-button
            @click="first_step = 2"
            :type="(first_step === 2) ?'is-info' : ''"
          >
            Противник
          </b-button>
        </p>
      </b-field>
      <br>

      <b-button @click="create" type="is-info" size="is-large" :disabled="!allowFight">
        К бою!
      </b-button>
    </div>

  </div>
  </keep-alive>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NewChallenge',
  data() {
    return {
      my_chosen_submission: null,
      opponent_chosen_submission: null,
      opponent: null,
      level: 1,
      first_step: 1,
    };
  },
  computed: {
    ...mapGetters('Submissions', {
      openedSubmissions: 'openedSubmissions',
      closedSubmissions: 'closedSubmissions',
      allSubmissions: 'submissions',
    }),
    ...mapGetters('Users', {
      users: 'users',
      self_id: 'selfId',
      foreignSubmissions: 'foreignSubmissions',
    }),
    allowUsers() {
      console.log(this.openedSubmissions.map(val => val.id));
      return !this.closedSubmissions.map(val => val.id).includes(this.my_chosen_submission);
    },
    allowFight() {
      return !!this.opponent
        && !!this.opponent_chosen_submission
        && !!this.my_chosen_submission
        && !!this.level
        && !!this.first_step;
    },
    opponentSubmissions() {
      if (!this.opponent) return [];
      if (this.allowUsers) return this.foreignSubmissions.get(this.opponent);
      return this.allSubmissions;
    },
  },
  methods: {
    update() {
      this.$store.dispatch('Submissions/update');
    },
    create() {
      let sub1 = this.my_chosen_submission;
      let sub2 = this.opponent_chosen_submission;
      if (this.first_step === 2) {
        [sub1, sub2] = [sub2, sub1];
      }
      this.$store.dispatch('Challenges/create', {
        sub1, sub2, level: this.level,
      });
    },
  },
  watch: {
    allowUsers(val) {
      if (!val) this.opponent = this.self_id;
    },
    opponent() {
      this.opponent_chosen_submission = null;
    },
  },
};
</script>

<style scoped>

</style>
