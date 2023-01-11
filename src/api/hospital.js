import request from '@/utils/request'

export default {
  // 医院列表
  getHospitalList(page, limit, searchObj) {
    return request({
      url: `/admin/hosp/hospital/list/${ page }/${ limit }`,
      method: 'get',
      params: searchObj
    })
  },
  // 根据dictCode查询所有的省
  getProvinceByDictCode(dictCode) {
    return request({
      url: `/admin/cmn/dict/findByDictCode/${ dictCode }`,
      method: 'get'
    })
  },
  // 根据id查询下面所有子节点
  getChildDataById(id) {
    return request({
      url: `/admin/cmn/dict/findChildData/${ id }`,
      method: 'get'
    })
  },
  // 更新医院上线状态
  updateHospitalStatus(id, status) {
    return request({
      url: `/admin/hosp/hospital/updateHospitalStatus/${ id }/${ status }`,
      method: 'get'
    })
  },
  // 查看医院详细信息
  showHospitalDetail(id) {
    return request({
      url: `/admin/hosp/hospital/showHospitalDetail/${ id }`,
      method: 'get'
    })
  },
  // 根据医院编号获得排班信息
  getScheduleByHoscode(hoscode) {
    return request({
      url: `/admin/hosp/department/getDeptList/${ hoscode }`,
      method: 'get'
    })
  },
  getScheduleRule(page, limit, hoscode, depcode) {
    return request({
      url: `/admin/hosp/schedule/getSchedule/${ page }/${ limit }/${ hoscode }/${ depcode }`,
      method: 'get'
    })
  },
  // 查询排班详情信息
  getScheduleDetail(hoscode, depcode, workDate) {
    return request({
      url: `/admin/hosp/schedule/getScheduleDetail/${ hoscode }/${ depcode }/${ workDate }`,
      method: 'get'
    })
  }
}
