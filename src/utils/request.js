import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    // 200	http响应成功
    // 400	Bad Request 请求出现语法错误,一般是请求参数不对
    // 404	Not Found 无法找到指定位置的资源
    // 401	Unauthorized 访问被拒绝
    // 403	Forbidden 资源不可用
    // 500	服务器内部错误,请联系Java后台开发人员!!!
    if (res.status !== 200) {
      Message({ message: res.message || 'Error', type: 'error', duration: 5 * 1000 })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.status === 401) {
        // to re-login
        MessageBox.confirm('提示', '当前登陆状态已过期', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({ message: error.message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
)

export default service
