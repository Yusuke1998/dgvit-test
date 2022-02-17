import { createRouter, createWebHistory } from 'vue-router'
// import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import JhonnyPrz from '../views/JhonnyPrz.vue'
import HomeView from '../views/HomeView.vue'
import PageNotFound from '../components/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/iniciar-sesion',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'crud',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/jhonny-prz',
      name: 'me',
      component: JhonnyPrz,
      meta: {
        requiresAuth: true
      }
    },
    { 
      path: '/:pathMatch(.*)', 
      name: '404', 
      component: PageNotFound 
    },
  ]
})

export default router
