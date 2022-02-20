import axios from 'axios';
import router from '../router';
const token = JSON.parse(localStorage.getItem('token'));
const initialState = token
  ? { status: { loggedIn: true }, token }
  : { status: { loggedIn: false }, token: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, userData) {
      const url = "https://reqres.in/api/login";
      try {
        const { data: { token }} = (await axios.post(url, userData))
        if (token) {
          commit('loginSuccess', token);
          localStorage.setItem('token', JSON.stringify(token));
          return true;
        }
      } catch (error) {
        commit('loginFailure');
        localStorage.removeItem('token');
        return false;
      }
    },
    logout({ commit }) {
      commit('logout');
      localStorage.removeItem('token');
      router.push('/iniciar-sesion');
    },
    register({ commit }, userData) {
      const url = "https://reqres.in/api/register";
      try {
        const { data } = (axios.post(url, userData));
        commit('registerSuccess', data);
        router.push('/');
      } catch (error) {
        commit('registerFailure');
        router.push('/registro');
      }
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