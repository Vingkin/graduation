import request from '@/utils/request'

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
  }
}

