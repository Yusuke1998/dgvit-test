import { createStore } from "vuex";
import { auth } from "./auth.module";
const store = createStore({
  modules: {
    auth,
  },
  getters: {
    isLoggedIn: (state) => {
      return state.auth.status.loggedIn;
    }
  }
});
export default store;