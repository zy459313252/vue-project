import request from '@/utils/request'

// 导入
export function importBaseDataExeclApi(param) {
  const formData = new FormData()
  formData.append('file', param)
  return request({
    url: '/baseData/import',
    method: 'POST',
    data: formData,
    timeout: 20000,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 获取基础数据列表
export function getBaseDataListApi(param) {
  return request({
    url: '/baseData/page',
    method: 'GET',
    params: param
  })
}

// 删除
export function batchDeleteApi(param) {
  return request({
    url: '/baseData/deleteByIds',
    method: 'GET',
    params: param
  })
}
