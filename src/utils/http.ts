import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import useIndexStore from '../store'
import { Base64 } from 'js-base64'
import { HttpData, LoginData } from '../types'
import { Message } from './message'
import { Storage } from './storage'
import axiosRetry from 'axios-retry'
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
} as AxiosRequestConfig)

request.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (config.method !== 'get') {
            const store = useIndexStore()
            store.addLoading()
        }
        if (config.headers) {
            if (Storage.getItem('token')) {
                const token = Storage.getItem('token')
                config.headers['pitaya-Auth'] = 'bearer ' + token // 请求头带上token
            }
            config.headers['Authorization'] = `Basic ${Base64.encode(`saber:saber_secret`)}`
        }
        if (process.env.NODE_ENV === 'production') {
            config.url = config.url?.replace('/api/', '/')
        }
        return config
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error)
    }
)
request.interceptors.response.use(
    async (response: AxiosResponse) => {
        if (response.config.method !== 'get') {
            const store = useIndexStore()
            store.subLoading()
        }
        // Do something before request is sent
        if ((response.config.url as string).indexOf('/xf-auth') > -1) {
            return Promise.resolve(response)
        }
        if (response.config.responseType === 'blob') {
            return Promise.resolve(response)
        }
        if (response.data && response.data.code !== 200) {
            if (response.data.code === 401) {
                // 401, token失效
                Storage.clearStorage()
            }
            await Message.longError(response.data.message || response.data.error_description || '出错了')
        }
        return Promise.resolve(response)
    },
    async (error) => {
        await Message.longError(error.response.data.msg || error.response.data.error_description || '出错了')
        const store = useIndexStore()
        store.subLoading()
        return Promise.reject(error)
    }
)
axiosRetry(request, { retries: 3 })
const httpRequest = async (config: AxiosRequestConfig): Promise<HttpData<any>> => {
    // return new Promise((resolve, reject) => {
    //     request(config)
    //         .then((res: AxiosResponse) => {
    //             resolve(res.data)
    //         })
    //         .catch((err) => {
    //             reject(err)
    //         })
    // })
    const res = await request(config)
    return res.data
}
export { request }
export default httpRequest
