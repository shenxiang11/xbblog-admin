import axios from 'axios'
import * as types from './mutation-types'
import router from '../router'

export const login = async (context, data) => {
  const res = await axios({
    method: 'post',
    url: '/api/auth/admin-login',
    data
  })

  context.commit(types.SET_TOKEN, res.data.result.token)
  router.push('/')
}

export const logout = (context) => {
  context.commit(types.SET_TOKEN, null)
  router.push('/login')
}

export const getCategories = async (context) => {
  const res = await axios({
    method: 'get',
    url: '/api/category/list'
  })

  context.commit(types.SET_CATEGORIES, res.data.result)
}
