import axios from 'axios';
import { catchError, showInfo } from '../utils';

// для тестирования api в браузерах, когда-нибудь уберу
window.axios = axios;

const state = {
  used_for_tours: null,
  submissions: [{
    id: 9, name: 'cool 2', used_for_ch: false, used_for_tours: false, lang: 'GNU C++ 17', creator: '123', opened: false, status: 'Протестировано', verdict: 'CE', created_at: '29 Jun 20:27',
  }],
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
        ctx.commit('ADD_SUBMISSION', info);
        showInfo('Посылка отправлена');
      })
      .catch(catchError);
  },
  update(ctx) {
    axios.get('/api/submissions')
      .then((response) => {
        ctx.commit('SET_SUBMISSIONS', response.data);
      })
      .catch(catchError);
  },
  useForTours(ctx, id) {
    // TODO: потыкать Сашу чтоб поменял api
    axios.get('submissions/make_used_for_tours', {
      params: {
        id,
      },
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
  ADD_SUBMISSION(state, info) {
    state.submissions.push(info);
  },
  // eslint-disable-next-line no-shadow
  SET_SUBMISSIONS(state, submissions) {
    state.submissions = submissions;
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
