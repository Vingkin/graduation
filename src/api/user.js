import request from '../utils/request'

export default {
  queryAllUser(pageNo, size, KeyWord) {
    return request({
      url: '/queryAllUser',
      method: 'get',
      params: {
        pageNo,
        size,
        KeyWord
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
  }
}
