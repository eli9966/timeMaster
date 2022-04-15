import Taro from "@tarojs/taro"
import { pageToLogin, pageToIndex } from "./utils"
import { HTTP_STATUS } from './config'

const customInterceptor = (chain) => {

  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then(res => {
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject("请求资源不存在")

    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject("服务端出现了问题")

    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      // TODO 根据自身业务修改
      return Promise.reject("没有权限访问");
    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      return Promise.reject("登录过期，请重新登录")

    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      // console.log("请求成功：", res.statusCode)
      // if (res.statusCode!=200||res.data.code!=20000){
      //   Taro.atMessage({
      //     'message': res.data.message,
      //     'type': 'warning',
      //     duration: 2000,
      //   })
      //   return Promise.reject(res.data)
      // }else{
      return res
      // }
    }
  })
}

const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]

export default interceptors
