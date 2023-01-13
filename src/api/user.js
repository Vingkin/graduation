import request from '../utils/request'

export default {
  queryAllUser(pageNo, size, keyWord) {
    return request({
      url: '/queryAllUser',
      method: 'get',
      params: {
        pageNo,
        size,
        keyWord
      }
    })
  },
  deleteById(id) {
    return request({
      url: '/deleteById',
      method: 'get',
      params: {
        id
      }
    })
  },
  setAdmin(id) {
    return request({
      url: '/setAdmin',
      method: 'get',
      params: {
        id
      }
    })
  },
  setMember(id) {
    return request({
      url: '/setMember',
      method: 'get',
      params: {
        id
      }
    })
  }
}
