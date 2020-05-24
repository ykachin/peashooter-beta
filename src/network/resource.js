import {request, uploadMusic} from "./request";

export const HOSTURL = 'http://129.204.247.165/'

/**
 * 返回：全部资源 （数据库顺序）
 * @param page 页码
 * @returns {*}
 */
export function getResData(page) {
  let formData = new FormData()
  formData.append('page', page)
  
  return request({
    // url: '/shares',
    // method: 'get',
    // params: {
    //   page
    // }
    url: '/shares/get',
    method: 'post',
    data: formData
  })
}

/**
 * 根据 标签 排序 页码 来获取资源数据
 * @param tag 标签名
 * @param sort  按什么排序
 * @param page  页码
 * @returns {AxiosPromise}
 */
export function getResByTag(tag, sort, page) {
  let formData = new FormData()
  formData.append('tags', tag)
  formData.append('type', sort)
  formData.append('page', page)
  
  return request({
    url: '/shares/getbytags',
    method: 'post',
    data: formData
  })
}

/**
 * 返回：按时间排序的资源 （最新最前）
 * @param page  页码
 * @returns {*}
 */
export function getResOrderInTime(page) {
  let formData = new FormData()
  formData.append('page', page)
  
  return request({
    url: '/shares/getnew',
    method:'post',
    data: formData
  })
}

/**
 * 返回： 按下载次数排序的资源
 * @param page  页码
 * @returns {*}
 */
export function getResOrderInDownloads(page) {
  let formData = new FormData()
  formData.append('page', page)
  
  return request({
    url: '/shares/gethot',
    method: 'post',
    data: formData
  })
}

/**
 * 获得标签
 * @returns {*}
 */
export function getTags() {
  return request({
    url: '/tags',
    method: 'get'
  })
}

/**
 * 发布
 * @param formData  发布内容
 * @returns {*}
 */
export function publish(formData) {
  return request({
    url: '/shares/upload',
    method: 'post',
    data: formData
  })
}

// return uploadMusic({
//   url: '/shares/upload',
//   method: 'post',
//   data: formData
// })
/**
 * 下载资源, 参数以json的形式
 * @param id  资源id
 * @param userId  用户id
 * @returns {AxiosPromise}
 */
export function downloadFile(id, userId) {
  return request({
    url: '/shares/getfile',
    method: 'post',
    // data,
    data: {
      id: id,
      user_id: userId
    },
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

/**
 * 下载资源, 参数以 FormData 的形式
 * @param id  资源id
 * @param userId  用户id（当前要下载该资源的用户）
 */
export function downloadFile2(id, userId) {
  let formData = new FormData()
  formData.append('id', id)
  formData.append('user_id', userId)
  
  return request({
    url: '/shares/getfile',
    method: 'post',
    /*data: {
      id: 10,
      user_id: 1
    },  // data: {message: "id不能为空"}*/
    data: formData,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

/**
 * 判断用户是否下载过该资源
 * @param id  资源id
 * @param userId  用户id
 * @returns
 */
export function judUserDownloadRes(id, userId) {
  let formData = new FormData()
  formData.append('id', id)
  formData.append('user_id', userId)
  
  return request({
    url: '/shares/jud',
    method: 'post',
    data: formData,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function login() {
  return request({
    url: '/users/login',
    method: 'post',
    params: {
      username: 'testadmin',
      password: 'testadmin'
    }
  })
}

export function sigup(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}