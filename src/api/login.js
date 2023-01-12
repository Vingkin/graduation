import request from '../utils/request'

export default {
  login(username, password) {
    return request({
      url: '/login',
      method: 'post',
      data: {
        username,
        password
      }
    })
  },
  register(username, password) {
    return request({
      url: '/register',
      method: 'post',
      data: {
        username,
        password
      }
    })
  },
  updateUser(username, password, oldPassword) {
    return request({
      url: '/updateUser',
      method: 'post',
      data: {
        username,
        password,
        oldPassword
      }
    })
  },
  getInfo(token) {
    return request({
      url: '/info',
      method: 'get',
      params: { token }
    })
  }
}

