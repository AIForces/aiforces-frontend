import axios from 'axios';
import { catchError, showInfo } from '../utils';

// для тестирования api в браузерах, когда-нибудь уберу
window.axios = axios;

const state = {
  primary: null,
  submissions: [],
};


const actions = {
  create(ctx, info) {
    const data = {
      submission: {
        ...info,
      },
    };
    axios.post('/api/submissions/create', data)
      .then(() => {
        showInfo('Посылка отправлена');
      })
      .catch(catchError);
  },
  update(ctx) {
    axios.get('/api/submissions', {
      params: {
        keys: ['id', 'name', 'created_at', 'lang', 'status', 'verdict', 'opened', 'primary'],
      },
    })
      .then((response) => {
        console.log(response);
        const mp = new Map(response.data.map(val => [val.id, val]));

        ctx.commit('SET_SUBMISSIONS', mp);
      })
      .catch(catchError);
  },
  getCode(ctx, id) {
    axios.get(`/api/submissions/${id}`, {
      params: {
        keys: ['code'],
      },
    })
      .then((response) => {
        ctx.commit('SET_CODE', { id, code: response.data.code });
      })
      .catch(catchError);
  },
  setPrimary(ctx, id) {
    // TODO: потыкать Сашу чтоб поменял api
    axios.post(`/api/submissions/${id}/make_primary`, {})
      .then(() => {
        ctx.commit('SET_PRIMARY', id);
        showInfo(`Посылка №${id} будет использоваться для турниров`);
      })
      .catch(catchError);
  },
  openSubmission(ctx, id) {
    axios.post(`/api/submissions/${id}/make_public`, {})
      .then(() => {
        ctx.commit('SET_SUBMISSION_OPEN', id);
        showInfo(`Посылка №${id} будет использоваться для дуэлей`);
      })
      .catch(catchError);
  },
};


const mutations = {
  // eslint-disable-next-line no-shadow
  SET_SUBMISSIONS(state, submissions) {
    for (let i = 0; i < state.submissions.length; i += 1) {
      const { id } = state.submissions[i];
      if (submissions.has(id)) {
        state.submissions[i] = {
          ...state.submissions[i],
          ...submissions.get(id),
        };
        submissions.delete(id);
      }
      if (state.submissions[i].primary) {
        state.primary = state.submissions[i].id;
      }
    }
    const arr = [];
    submissions.forEach((val) => {
      if (val.code === undefined) {
        val.code = undefined;
      }
      arr.push(val);
    });
    state.submissions = arr.concat(state.submissions);
  },
  // eslint-disable-next-line no-shadow
  SET_PRIMARY(state, id) {
    state.primary = id;
  },
  // eslint-disable-next-line no-shadow
  SET_SUBMISSION_OPEN(state, id) {
    for (let i = 0; i < state.submissions.length; i += 1) {
      if (state.submissions[i].id === id) {
        state.submissions[i].opened = true;
      }
    }
  },
  // eslint-disable-next-line no-shadow
  SET_CODE(state, { id, code }) {
    console.log(id, code);
    state.submissions.forEach((s) => {
      if (s.id === id) {
        s.code = code;
      }
    });
  },
};


const getters = {
  // eslint-disable-next-line no-shadow
  submissions(state) {
    return state.submissions;
  },
  // eslint-disable-next-line no-shadow
  primary(state) {
    return state.primary;
  },
  // eslint-disable-next-line no-shadow
  openSubmissions(state) {
    return state.submissions.filter(val => val.used_for_ch);
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
