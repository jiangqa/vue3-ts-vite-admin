import { Storage } from './src/utils/storage'

const getSystemId = () => {
    return Storage.getItem('systemId') || '1386496845039759362'
}
export default {
    title: 'name',
    systemId: getSystemId()
}
