import axios from 'axios';
const token = JSON.parse(localStorage.getItem('token'));
const initialState = token
  ? { status: { loggedIn: true }, token }
  : { status: { loggedIn: false }, token: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, userData) {
      const url = "https://reqres.in/api/login";
      axios.post(url, userData)
      .then(res => {
          commit('loginSuccess', res.data.token);
          localStorage.setItem('token', JSON.stringify(res.data.token));
        })
        .catch(err => {
          commit('loginFailure');
        });
        
    },
    logout({ commit }) {
      commit('logout');
    },
    register({ commit }, userData) {
      const url = "https://reqres.in/api/register";
      axios.post(url, userData)
      .then(res => {
          commit('registerSuccess');
        })
        .catch(err => {
          commit('registerFailure');
        });
    }
  },
  mutations: {
    loginSuccess(state, token) {
      state.status.loggedIn = true;
      state.token = token;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.token = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.token = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};