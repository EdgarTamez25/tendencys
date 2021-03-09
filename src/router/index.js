import Vue from 'vue'
import VueRouter from 'vue-router'

import controlLogin from '@/views/Login/controlLogin.vue'
import Home         from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'login', component: controlLogin },
    { path: '/home', name: 'Home', component: Home },
]

const router = new VueRouter({
  routes
})

export default router
