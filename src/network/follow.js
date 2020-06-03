import {request} from "./request"

export const HOSTURL = 'http://129.204.247.165/'

/**
 * 获取用户粉丝列表
 * @param userId
 */
export function getUserFollowList(userId) {
  let formData = new FormData()
  formData.append('id', userId)

  return request({
    url: '/user/getfollow',
    method: 'post',
    data: formData
  })
}

/**
 * 关注某用户
 * @param fromUserId  关注者id
 * @param toUserId  被关注者id
 */
export function followUser(fromUserId, toUserId) {
  let formData = new FormData()
  formData.append('from_user_id', fromUserId)
  formData.append('to_user_id', toUserId)

  return request({
    url: '/follows',
    method: 'post',
    data: formData
  })
}

/**
 * 取消关注某用户
 * @param fromUserId 关注者id
 * @param toUserId  被关注者id
 */
export function cancleFollowUser(fromUserId, toUserId) {
  let formData = new FormData()
  formData.append('from_user_id', fromUserId)
  formData.append('to_user_id', toUserId)

  return request({
    url: '/follows/del',
    method: 'post',
    data: formData
  })
}
