import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { JSEncrypt } from 'jsencrypt'

const k = "-----BEGIN ENCRYPTED PRIVATE KEY-----MIICxjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIvAHyBhwXDeACAggAMBQGCCqGSIb3DQMHBAiQZXnPj7ks+ASCAoCIgC173PFLtRAmPd6unnZzxMHnumDlNp3JuW1hDdL1PyzTuph8oW9sgHE4/f5Gb+BqHY43Kx815QBACaUeshK3Co3ZnvWhZcdeDRkaVH0tc72NIOd4daO8HNv2i5vSO6YsdkhoDw5XhG2xUdkBgtV3DulGAKsjNDTxm7rXqCUBsDAJtmb2R6tvKeGMkGcJ2/Mu0hXNe2884pJYxNjerbXnaRhxhtQ5g/5vi61iE5KwUAFUyV4ViQq7j2CBo607vCVEF1FeNPldrdau115eEYUZuj17Lh0ky0azH04tRz2DnvBwCFuozJC8AJfqJJFKXXsoOPqiMBK9EaT/EJcMQ7FbyxaEADmxgpDX+DPzItb/97s15LJi/xYNz2rgJfUYEeP8UE12jh4rPVDlKLX1o0sehf2DAv9mdVs1BqCYV9uCzDijvAR4Pl8IfN37rHL920Pk4ovtNxeiJIjzKJ0T38QS9HusBFBpe5xkHxgV5/KJqs5l+BWPn7eNl2uRws6ZuBz41NJDgrNdRLz0wIBPkkJhl8UVQcz0T+MSYHfD7pxtohV/SzmpScEDKqfxVX4HpKxb0SglPfP9ZrTMreqSsQyObAvzPHmiWChBqx9xww6eWN75cuxyeBSYho1323FDQ6Oku6FedhwDgkN8BAdcP1YMwFJNjzBnPITDgYSpfs6YSYbRVlpl7QQYCxdTYqQMLtddylfcWj4e9xDLWLyA7HPIowhpgNcn5bpKy4nWjQTEph6IUIbybkp4z3RwP05la96BE30wyKQBughEI4aWb4ndDH3poKedw+QnWAifKWldBoLn3l5gXg2lQdd5GbS7sDnCEJryHB/tRa8nM8ozCVOe-----END ENCRYPTED PRIVATE KEY-----"
const decrypt = new JSEncrypt();
// 设置私钥
decrypt.setPrivateKey(k);
// 创建 axios 请求
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {

    // 解密数据
    const r = decrypt.decrypt(response.data);
    console.log(decrypt, r)
    const res = response.data
    const { code, msg, message } = res || {}

    // 判断请求返回状态
    if (code !== 20000) {
      Message({
        message: msg || message || '请求信息错误，请联系管理员',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if ([401].includes(code)) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(msg || message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
