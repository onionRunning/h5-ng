import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios'

// import {machineIdSync} from 'node-machine-id'

// 请求前的拦截器
const requestInterceptors = (config: InternalAxiosRequestConfig) => {
  return config
}

// 响应后的拦截器
function responseInterceptors(response: AxiosResponse) {
  return response
}

const errHandler = (error: {response: {config: any; data: {code: string; msg: string}}}) => {
  return Promise.reject(error.response)
}

export const request = axios.create()

request.interceptors.request.use(requestInterceptors)

request.interceptors.response.use(responseInterceptors, errHandler)
