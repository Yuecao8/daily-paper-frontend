import { stringify } from 'qs'
import http from '../utils/http'
// let url = 'http://mxu-api3.dev.hoge.cn'
let url = ''
// 登录
export const userLogin = (param) => http.post(`${url}/api/auth/login`, param)

// 退出登录 /api/auth/logout?
export const userLogout = () => http.get(`${url}/api/auth/logout?`)

// 重置密码 http://api.m2o-demo.hoge.cn/api/auth/user/reset-password/217
export const resetPassword = (id, param) => http.put(`${url}/api/auth/user/reset-password/${id}`, param)

// 获取用户信息 api/auth/user/info
export const userInfo = (param) => http.get(`${url}/api/auth/user/info?${stringify(param)}`)

// 总编 - 网站统计 api/work-station/statistic/web?end_date=2019-08-12&site_id=0&start_date=2019-08-11
export const getWeb = param => http.get(`${url}/api/work-station/statistic/web?${stringify(param)}`)

// 总编 - 我的待办 /api/work-station/waiting?site_id=0
export const getWaiting = param => http.get(`${url}/api/work-station/waiting?${stringify(param)}`)

// 我的待办 忽略全部 http://mxu-api3.dev.hoge.cn/api/work-station/waiting/ignore?site_id=0
export const ignoreWaiting = param => http.get(`${url}/api/work-station/waiting/ignore?${stringify(param)}`)

// 我的动态 api/log?page=1&per_num=20&site_id=0
export const getMyLog = param => http.get(`${url}/api/log?${stringify(param)}`)

// 快速建稿 /api/content/atlas-file
export const atlasFile = param => http.get(`${url}/api/content/atlas-file?${stringify(param)}`)

// 评论栏目列表
export const getColumnList = () => http.get(`${url}/api/publish/column?site_id=0`)

// 评论
export const getComment = param => http.get(`${url}/api/comment?${stringify(param)}`)

// 回复评论
export const replyComment = (param) => http.post(`${url}/api/comment/reply`, param)

// 删除评论
export const delComment = (id, param) => http.delete(`${url}/api/comment/${id}`, param)

// 打回评论 审核评论
export const banComment = (id, param) => http.put(`${url}/api/comment/${id}?`, param)

// 图片上传 /content/atlas/upload
export const uploadImg = param => http.post(`${url}/api/content/atlas/upload`, param)

// 总编 稿件数量排行 /api/work-station/statistic/rank/{id}
export const workloadRank = (param) => http.get(`${url}/api/work-station/statistic/rank?${stringify(param)}`)

// 总编 编辑 投稿统计  工作统计 api/work-station/statistic/contents
export const workloadRate = (param) => http.get(`${url}/api/work-station/statistic/contents?${stringify(param)}`)

// 总编 编辑 互动统计 /statistic/interaction
export const interaction = (param) => http.get(`${url}/api/work-station/statistic/interaction?${stringify(param)}`)

// 工作台 上方统计数据 /api/work-station/statistic/total
export const statisticTotal = (param) => http.get(`${url}/api/work-station/statistic/total?${stringify(param)}`)

// 图片下载排行 /work-station/rank/download
export const photoDownload = (param) => http.get(`${url}/api/work-station/rank/download?${stringify(param)}`)

// 平台内容影响力 /api/work-station/rank/content
export const platformInfluence = (param) => http.get(`${url}/api/work-station/rank/content?${stringify(param)}`)

// 主编 成品库稿件统计 /api/content/category?access_token=fc44a61acb4b7b35d2f5eb67a123d70c&fid=0&type=atlas
export const category = (param) => http.get(`${url}/api/content/category?${stringify(param)}`)

// 工作台统计详情 筛选条件 /api/content/atlas/search/options?access_token=1221b20c042ace9ac0fc531d82171776
export const searchOptions = (param) => http.get(`${url}/api/content/atlas/search/options?${stringify(param)}`)

// 工作台统计详情 内容列表 /api/work-station/statistic/content-list?start_time=2020-03-12&end_time=2020-03-17&date_search&access_token=1221b20c042ace9ac0fc531d82171776&type=downloads&page=1&per_num=10
export const contentList = (param) => http.get(`${url}/api/work-station/statistic/content-list?${stringify(param)}`)
