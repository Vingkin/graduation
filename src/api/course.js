import request from '@/utils/request'

export default {
  // 数据字典列表
  getAll() {
    return request({
      url: `/getAll`,
      method: 'get'
    })
  },
  getCourseByModule(module) {
    return request({
      url: `/getByModule/${ module }/`,
      method: 'post'
    })
  }
}
