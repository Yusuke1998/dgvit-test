import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ name: 'login' })
    } else {      
      next()
    }
  } else {
    next()
  }

  // if (to.matched.some(record => record.name === 'login') && store.getters.isLoggedIn) {
  //   next({ name: 'me' })
  // }
})

app.use(router)
    .use(VueAxios, axios)
    .use(store)
    .mount('#app')
