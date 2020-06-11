import request from '@/utils/request'

// 导入
export function importBaseDataExeclApi(param) {
  const formData = new FormData()
  formData.append('execl', param)
  return request({
    url: '/baseData/import',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 删除
export function batchDeleteApi(param) {
  return request({
    url: '/baseData/deleteByIds',
    method: 'POST',
    data: param
  })
}
