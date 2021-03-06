import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

import Home from './components/Home.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'
import Secure from './components/Secure.vue'
import Register from './components/Register.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name: 'home',
      component : Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/secure',
      name: 'secure',
      component: Secure,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.getters.isLoggedIn){
      next()
      return
    }
    next('/login')
  }else{
    next()
  }
})

export default router


//some help
/*
1-"beforeEach()" conditions
    we can go on to add any condition to our route. 
    In our vuex store, we can then define actions to check these conditions and getters to return them.
*/