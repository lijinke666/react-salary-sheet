import obj2Query from "libs/params"
import { HOST, serverPORT } from "../../../config"
const mode = process.env.NODE_ENV || "DEV"

const helper = {
  jsonToString(params) {
    return obj2Query.toQueryString(params)
  },
  getCurrentTime(){
      const date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      h = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds(),
      hh = h < 10 ? `0${h}` : h,
      mm = m < 10 ? `0${m}` : m,
      ss = s < 10 ? `0${s}` : s

      return `${year}/${month}/${day} ${hh}:${mm}:${s}` //当前时间
  },

  /**
   * get 请求
   * params {url} String 请求地址 支持跨域
   * parmas {params} obj 请求参数 
   */

  async getJson(url, params) {
    return (await
      fetch(`${HOST}:${serverPORT}${url}${params ? '?' + (this.jsonToString(params)) : ''}`, {
        method: "GET",
        mode: "cors",
      })).json()
  },

  /**
   * post 请求
   * params {url} String 请求地址 支持跨域
   * parmas {params} obj 请求参数 
   * parmas {isForm} boolean 是否是表单提交 表单提交 如:formData 
   */

  async postJson(url, params={}, isForm = false) {
    const fetchConfig = {
      method: "POST",
      mode: "cors",
      body : isForm ? params : JSON.stringify(params)
    }
      //跨域请求不能自定义头部  ... 否者post请求会变成options请求 第一次遇到。。
      // fetchConfig.headers = {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // }
    return (await
      fetch(`${HOST}:${serverPORT}${url}`, fetchConfig)
    ).json()
  }
}
export default helper