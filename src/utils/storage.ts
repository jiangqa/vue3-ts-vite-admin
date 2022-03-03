export class Storage {
    static clearStorage() {
        sessionStorage.clear()
        localStorage.clear()
    }
    static setItem(key: string, val: any) {
        sessionStorage.setItem(key, JSON.stringify(val))
    }
    static getItem(key: string): any {
        if (sessionStorage.getItem(key)) {
            return JSON.parse(<string>sessionStorage.getItem(key))
        } else {
            return ''
        }
    }
}
