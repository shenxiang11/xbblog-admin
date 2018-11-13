import axios from 'axios'
import store from '../store'
import router from '../router'

axios.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${store.state.token}`
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    store.dispatch('logout')
    router.push('/login')
  }
  return Promise.reject(error)
})
