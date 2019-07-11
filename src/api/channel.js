// 封装频道相关的接口请求函数
import request from '@/utils/request'

// 获取首页频道列表
// 已经登录的（携带token数据）:显示用户自己的频道列表//在请求拦截器中为接口添加token
// 未登录的显示默认推荐列表
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
