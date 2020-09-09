// 网站域名
let baseUrl = 'http://m2o.plus.vinj.cn'
// let baseUrl = 'http://m2o2.dev.hoge.cn'
// let baseUrl = 'http://new_m2o.hoge.cn'

const getToken = () => {
  return window.localStorage.getItem('accessToken')
}
export default {
  getToken,
  baseUrl
}
