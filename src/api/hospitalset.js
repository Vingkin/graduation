import request from '@/utils/request'

export default {
  // 医院设置列表方法
  getHospitalSetList(current, limit, searchObj) {
    return request({
      url: `/admin/hosp/hospitalSet/findPage/${ current }/${ limit }`,
      method: 'post',
      data: searchObj // 使用json形式进行传递
    })
  },
  // 删除
  deleteHospitalSet(id) {
    return request({
      url: `/admin/hosp/hospitalSet/${ id }`,
      method: 'delete'
    })
  },
  // 批量删除
  batchDeleteHospitalSet(idList) {
    return request({
      url: `/admin/hosp/hospitalSet/batchRemove`,
      method: 'delete',
      data: idList
    })
  },
  // 锁定和取消锁定
  lockHospitalSet(id, status) {
    return request({
      url: `/admin/hosp/hospitalSet/lockHospitalSet/${ id }/${ status }`,
      method: 'put'
    })
  },
  // 添加医院设置
  saveHospitalSet(hospitalSet) {
    return request({
      url: `/admin/hosp/hospitalSet/saveHospitalSet`,
      method: 'post',
      data: hospitalSet
    })
  },
  // 根据id获取医院设置
  getHospitalSetById(id) {
    return request({
      url: `/admin/hosp/hospitalSet/getHospitalSet/${ id }`,
      method: 'get'
    })
  },
  // 更新医院设置
  updateHospitalSet(hospitalSet) {
    return request({
      url: `/admin/hosp/hospitalSet/updateHospitalSet`,
      method: 'post',
      data: hospitalSet
    })
  }
}
