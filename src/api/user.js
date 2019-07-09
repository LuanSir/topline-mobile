// 封装用户相关的接口请求函数
import request from '@/utils/request'

export const login = ({ mobile, code }) => {
  // return返回一个promise，让调用者得到request的结果
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
