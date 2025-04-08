import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { showToast } from 'vant'
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

service.interceptors.request.use(
  (config: any) => {
    config.headers.sog
    if (!config.headers) {
      throw new Error(`缺少请求头!`)
    }
    
    //   if (token) {
    // 	config.headers.Authorization = ``;
    //   }

    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    if (code == 0) {
      return response.data
    } else {
      if (response.data instanceof ArrayBuffer) {
        return response
      }
    //   showToast(msg || '系统出错')
      return Promise.reject(new Error(msg || 'Error'))
    }
  },
  (error: any) => {
    if (error.response.data) {
      const { code, msg } = error.response.data
      //   if (code === '10001') {
      //   }
    }
    return Promise.reject(error.message)
  }
)

export default service
