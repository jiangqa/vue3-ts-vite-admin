import httpRequest, { request } from '../utils/http'
import { Menu } from '../types'
import { Methods } from './methods'
import config from '../../config'
import { Storage } from '../utils/storage'

export function user_login(data: any) {
    return request({
        url: '/api/xf-auth/oauth/token',
        method: Methods.POST,
        params: {
            tenantId: '000000',
            grant_type: 'password',
            scope: 'all',
            type: 'account',
            ...data
        }
    })
}
export function getUserInfo(): Promise<any> {
    return httpRequest({
        url: '/api/xf-user/info',
        method: 'get'
    })
}
export function fetchRouters(): Promise<Menu> {
    return httpRequest({
        url: '/api/xf-system/menu/routes',
        method: 'get',
        params: {
            systemId: Storage.getItem('systemId') || config.systemId
        }
    })
}
