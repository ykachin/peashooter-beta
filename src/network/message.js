import {request} from "./request"

export const HOSTURL = 'http://129.204.247.165/'

/**
 * 给用户留言
 * @param fromUserId 留言方id
 * @param toUserId  用户id
 * @param content 内容
 */
export function leaveAMessageToUser(fromUserId, toUserId, content) {
  let formData = new FormData()
  formData.append('from_user_id', fromUserId)
  formData.append('to_user_id', toUserId)
  formData.append('content', content)

  return request({
    url: '/messages',
    method: 'post',
    data: formData
  })
}
