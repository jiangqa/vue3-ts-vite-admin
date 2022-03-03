import { getUserInfo } from '../api'
import { Storage } from '@/utils/storage'

export default function useUserInfo() {
    const getUser = () => {
        return Storage.getItem('user')
    }
    const fetchUser = async () => {
        const res = await getUserInfo()
        Storage.setItem('user', res.data || {})
    }
    return { getUser, fetchUser }
}
