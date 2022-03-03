export interface HttpData<T> {
    code: number
    msg: string
    success: boolean
    data: T
}

export interface LoginData {
    access_token: string
    user_name: string
    nick_name: string
    [propName: string]: any
}
export interface MenuData {
    name: string
    path: string
    source: string
    children: MenuData[]
    [propName: string]: any
}
export type Menu = HttpData<MenuData[]>
