import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/passport/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {
  return new Promise((r, j) => {
    r({ 'code': 20000, 'data': { 'roles': ['admin'], 'introduction': 'I am a super administrator', 'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 'name': 'Super Admin' }})
  })
}

export function logout() {
  return new Promise((r, j) => {
    r({ 'code': 20000, 'data': 'success' })
  })
}
