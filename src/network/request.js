import axios from 'axios'

export function request(config) {
  // 1. 创建 axios 实例
  const instance = axios.create({
    baseURL: '/api',
    timeout: 1000 * 60  //  1 分钟
  })

  // 2. 发送网络请求
  return instance(config)
}

export function uploadMusic(config) {
  // 1. 创建 axios 实例
  const instance = axios.create({
    baseURL: '/api',
    timeout: 100000  //  100 秒钟
  })

  // 2. 发送网络请求
  return instance(config)
}
