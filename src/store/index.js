import axios from "axios";
import { createStore } from "vuex";
import { auth } from "./auth.module";
const usersLocal = localStorage.getItem('usersLocal');

const updateLocalU = (user) => {
  let usersLocal = localStorage.getItem('usersLocal')
  usersLocal = usersLocal ? JSON.parse(usersLocal) : []

  if (usersLocal) {
    let updLocal = usersLocal.findIndex(u => u.email == user.email)
    if (updLocal !== -1) {
      usersLocal[updLocal] = user
      localStorage.setItem('usersLocal', JSON.stringify(usersLocal))
    }
  }
}

const store = createStore({
  state: {
    users: [],
    usersLocal: usersLocal ?? [],
  },
  modules: {
    auth
  },
  getters: {
    isLoggedIn: (state) => {
      return state.auth.status.loggedIn;
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const { status, data: { data } } = (await axios.get('https://reqres.in/api/users'))
        if (status === 200) {
          commit('fetchUsers', data);
        }
      } catch (error) {
        commit('fetchUsersLocal');
      }
    },
    async makeUser({ commit }, user) {
      try {
        const { status, data } = (await axios.post(`https://reqres.in/api/users`, user))
        if (status === 201) {
          commit('makeUser', data);
        }
      } catch (error) {
        commit('makeUser', user);
      } finally {
        return true;
      }
    },
    async updateUser({ commit }, user) {
      if (!user.id) {
        updateLocalU(user)
        return true
      }
      const { status, data } = (await axios.put(`https://reqres.in/api/users/${user.id}`, user))
      if (status === 200) {
        commit('updateUser', data);
        return true;
      }
      return false;
    },
    async deleteUser({ commit }, user) {
      const { status } = (await axios.delete(`https://reqres.in/api/users/${user.id}`))
      if (status === 204) {
        commit('deleteUser', user);
        return true;
      }
      return false;
    }
  },
  mutations: {
    fetchUsers (state, users) {
      let usersLocal = localStorage.getItem('usersLocal')
      usersLocal = usersLocal ? JSON.parse(usersLocal) : []
      
      // si hay mas usuarios locales es porque se crearon sin conexion
      if (usersLocal.length >= users.length) {
        state.users = usersLocal;
      } else {
        state.users = users;
        localStorage.setItem('usersLocal', JSON.stringify(users));
      }
      
      // usersToCreate tiene todos los users creados mientras no habia conexion
      const usersToCreate = state.users.filter(user => !user.id)
      usersToCreate.forEach(user => {
        store.dispatch('makeUser', user);
      })
    },
    fetchUsersLocal(state) {
      let usersLocal = localStorage.getItem('usersLocal')
      if (usersLocal) {
        state.users = JSON.parse(usersLocal)
      }
    },
    updateUser(state, user) {
      let upd = state.users.findIndex(u => u.id == user.id)
      if (upd !== -1) {
        state.users[upd] = user
      }
      updateLocalU(user)
    },
    async deleteUser(state, user) {
      let usersLocal = localStorage.getItem('usersLocal')
      usersLocal = usersLocal ? JSON.parse(usersLocal) : []
      state.users = state.users.filter(u => u.id !== user.id);

      if (usersLocal) {
        usersLocal = usersLocal.filter(u => u.id !== user.id);
        localStorage.setItem('usersLocal', JSON.stringify(usersLocal))
      }
    },
    makeUser(state, user) {
      let usersLocal = localStorage.getItem('usersLocal')
      if (usersLocal) {
        usersLocal = JSON.parse(usersLocal)
        if (usersLocal.filter(userLocal => userLocal.email === user.email && !userLocal.id).length === 0) {
          state.users.push(user);
          usersLocal.push(user)
          localStorage.setItem('usersLocal', JSON.stringify(usersLocal))
        } else {
          let upd = state.users.findIndex(u => u.email == user.email)
          let updLocal = usersLocal.findIndex(u => u.email == user.email)
          if (upd !== -1 && updLocal !== -1) {
            state.users[upd] = user;
            usersLocal[updLocal] = user
            localStorage.setItem('usersLocal', JSON.stringify(usersLocal))
          }
        }
      }
    }
  }
});
export default store;