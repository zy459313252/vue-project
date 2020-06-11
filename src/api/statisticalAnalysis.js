import request from '@/utils/request'

// 统计分析分页查询
export function getTableApi(date, percent) {
  return request({
    url: `/baseData/getQuailtyCount?date=${date}&percent=${percent}`,
    method: 'get'
  })
}
