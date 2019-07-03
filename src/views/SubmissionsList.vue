<template>
  <div>
    <div class="level">
      <div class="level-left">
        <h1 class="title level-item">Мои посылки</h1>
      </div>
      <div class="level-right">
        <b-button @click="update">
          <b-icon icon="update"></b-icon>
        </b-button>
      </div>
    </div>
    <b-table
      :data="submissions"
    >
      <template slot-scope="props">
        <b-table-column field="opened" label="Открыть">
          <b-button v-if="!props.row.opened" @click="confirmOpening(props.row.id)">
            <b-icon icon="lock" size="is-small"></b-icon>
          </b-button>
          <b-button v-else disabled>
            <b-icon icon="lock-open" size="is-small"></b-icon>
          </b-button>
        </b-table-column>

        <b-table-column field="primary" label="Турнир">
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

        <b-table-column field="lang" label="Язык">
          {{ props.row.lang }}
        </b-table-column>

        <b-table-column field="status" label="Статус">
          <span :class="statusColor(props.row.status)"> {{ props.row.status }}</span>
        </b-table-column>

        <b-table-column field="verdict" label="Вердикт">
          <span :class="verdictColor(props.row.verdict)"> {{ props.row.verdict }}</span>
        </b-table-column>
        <b-table-column label="Код">
          <show-code-button
            @getCode="getCode(props.row.id)"
            :code="props.row.code"
            :language="props.row.lang"
          >
          </show-code-button>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ShowCodeButton from '../components/ShowCodeButton.vue';

export default {
  name: 'SubmissionsList',
  components: {
    ShowCodeButton,
  },
  data() {
    return {
      columns: [
        {
          field: 'used_for_ch',
          label: 'Открыть',
        },
        {
          field: 'primary',
          label: 'Турнир',
        },
        {
          field: 'id',
          label: 'ID',
        },
        {
          field: 'name',
          label: 'Название',
        },
        {
          field: 'created_at',
          label: 'Время создания',
        },
        {
          field: 'lang',
          label: 'Язык',
        },
        {
          field: 'status',
          label: 'Статус',
        },
        {
          field: 'verdict',
          label: 'Вердикт',
        },
      ],
    };
  },
  computed: mapGetters('Submissions', ['submissions', 'primary']),
  methods: {
    ...mapActions('Submissions', ['openSubmission', 'setPrimary']),
    update() {
      this.$store.dispatch('Submissions/update');
    },
    confirmOpening(id) {
      this.$dialog.confirm({
        message: 'вы уверены, что хотите открыть посылку? Это действие невозможно отменить',
        onConfirm: () => { this.openSubmission(id); },
      });
    },
    getCode(id) {
      console.log('getCode', id);
      this.$store.dispatch('Submissions/getCode', id);
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
};
</script>

<style scoped>

</style>
