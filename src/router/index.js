import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import JhonnyPrz from '../views/JhonnyPrz.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/iniciar-sesion',
      name: 'login',
      component: LoginView
    },
    {
      path: '/jhonny-prz',
      name: 'me',
      component: JhonnyPrz,
    },
    {
      path: '/crud',
      name: 'crud',
      component: HomeView,
    },
  ]
})

export default router
