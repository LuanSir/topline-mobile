// 将操作本地存储中用户数据的信息封装为一个模块，然后在其他任何需要操作本地存储中user的地方去使用

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem('user'))
}

export const saveUser = (data) => {
  window.localStorage.setItem('user', JSON.stringify(data))
}

export const removeUser = () => {
  window.localStorage.removeItem('user')
}
