<template>
  <div>
    <h1 class="title">Мои посылки</h1>
    <b-table
      :data="submissions"
    >
      <template slot-scope="props">
        <b-table-column field="used_for_ch" label="Открыть">
          <b-button v-if="!props.row.used_for_ch" @click="confirmOpening(props.row.id)">
            <b-icon icon="lock" size="is-small"></b-icon>
          </b-button>
          <b-button v-else disabled>
            <b-icon icon="lock-open" size="is-small"></b-icon>
          </b-button>
        </b-table-column>

        <b-table-column field="used_for_tours" label="Турнир">
          <b-button v-if="props.row.id === used_for_tours">
            <b-icon icon="heart" size="is-small"></b-icon>
          </b-button>
          <b-button v-else @click="useForTours(props.row.id)">
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
          {{ props.row.status }}
        </b-table-column>

        <b-table-column field="verdict" label="Вердикт">
          {{ props.row.verdict }}
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SubmissionsList',
  data() {
    return {
      columns: [
        {
          field: 'used_for_ch',
          label: 'Открыть',
        },
        {
          field: 'used_for_tours',
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
  computed: mapGetters('Submissions', ['submissions', 'used_for_tours']),
  methods: {
    ...mapActions('Submissions', ['openSubmission', 'useForTours']),
    confirmOpening(id) {
      this.$dialog.confirm({
        message: 'вы уверены, что хотите открыть посылку? Это действие невозможно отменить',
        onConfirm: () => { this.openSubmission(id); },
      });
    },
  },
};
</script>

<style scoped>

</style>
