import axios from 'axios'
// 因为用户登录的信息保存在store中
import store from '@/store'

// axios用于创建一个axios实例，该实例和axios的功能是一样的，说白了就是克隆了一个axios
// 为什么：我们可能拥有多个不同的请求函数，而他们的配置可能是不一样的
// 例如有些项目中可能会涉及使用不同的接口路径
const request = axios.create({
  // baseURL: 'http://toutiao.course.itcast.cn'
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 获取存储在容器中的登录用户信息
  const { user } = store.state
  // 如果有用户信息说明已经登录了，就把信息中的token给请求中的headers
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 如果响应结果对象中有data，则直接返回这个data数据，如果结果对象中没有data则不作任何处理，直接原样返回这个数据
  return response.data.data || response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出，后面谁用谁导入
export default request
