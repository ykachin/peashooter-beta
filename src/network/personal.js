import {request} from "./request"

export const HOSTURL = 'http://129.204.247.165/'

/**
 * 根据用户名模糊搜索用户列表
 * @param username  要搜索的用户名
 * @param id  当前登录的用户id
 */
export function getUserListByUserName(username, id) {
  let formData = new FormData()
  formData.append('username', username)
  formData.append('id', id)

  return request({
    url: '/user/getbyusername',
    method: 'post',
    data: formData
  })
}

/**
 * 获取用户信息
 * @param userid  用户id
 */
export function getUserDetailInfo(userId) {
  let formData = new FormData()
  formData.append('id', userId)

  return request({
    url: '/user/searchbyid',
    method: 'post',
    data: formData
  })
}

/**
 * 获取该用户的粉丝列表
 * @param userId  该用户id
 */
export function getUserFollow(userId) {
  let formData = new FormData()
  formData.append('id', userId)

  return request({
    url: '/user/getfollow',
    method: 'post',
    data: formData
  })
}

/**
 * 获取用户的留言列表
 * @param userId  用户id
 */
export function getUserMessageList(userId) {
  let formData = new FormData()
  formData.append('id', userId)

  return request({
    url: '/user/getmessage',
    method: 'post',
    data: formData
  })
}
