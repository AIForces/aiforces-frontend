import axios from 'axios';
import { catchError, showInfo } from '../utils';

// для тестирования api в браузерах, когда-нибудь уберу
window.axios = axios;

const state = {
  used_for_tours: null,
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
        keys: ['id', 'name', 'created_at', 'lang', 'status', 'verdict', 'used_for_ch', 'used_for_tours'],
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
  useForTours(ctx, id) {
    // TODO: потыкать Сашу чтоб поменял api
    axios.get('submissions/make_used_for_tours', {
      params: {
        id,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        ctx.commit('SET_USED_FOR_TOURS', id);
        showInfo(`Посылка №${id} будет использоваться для турниров`);
      })
      .catch(catchError);
  },
  openSubmission(ctx, id) {
    axios.get('submissions/make_opened', {
      params: {
        id,
      },
    })
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
  SET_USED_FOR_TOURS(state, id) {
    state.used_for_tours = id;
  },
  // eslint-disable-next-line no-shadow
  SET_SUBMISSION_OPEN(state, id) {
    for (let i = 0; i < state.submissions.length; i += 1) {
      if (state.submissions[i].id === id) {
        state.submissions[i].used_for_ch = true;
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
  used_for_tours(state) {
    return state.used_for_tours;
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
