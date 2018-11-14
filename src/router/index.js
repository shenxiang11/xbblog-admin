import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const Dashboard = () => import('@/pages/dashboard')
const Login = () => import('@/pages/login')
const TagList = () => import('@/pages/tag/list')
const ArticleList = () => import('@/pages/article/list')
const ArticleDetail = () => import('@/pages/article/detail')

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: checkLogin
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: checkLogout
    },
    {
      path: '/tag/list',
      redirect: '/tag/list/1'
    },
    {
      path: '/tag/list/:page',
      name: 'TagList',
      component: TagList,
      beforeEnter: checkLogin
    },
    {
      path: '/article/list',
      redirect: '/article/list/1'
    },
    {
      path: '/article/list/:page',
      name: 'ArticleList',
      component: ArticleList,
      beforeEnter: checkLogin
    },
    {
      path: '/article/:_id',
      name: 'ArticleDetail',
      component: ArticleDetail,
      beforeEnter: checkLogin
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

function checkLogin (to, from, next) {
  if (store.state.token) {
    next()
  } else {
    next('/login')
  }
}

function checkLogout (to, from, next) {
  if (store.state.token) {
    next('/')
  } else {
    next()
  }
}

export default router
