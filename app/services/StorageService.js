import storage from 'electron-json-storage'

const rw = (key: string) => async (val) => {
    if (val === undefined) {
        return new Promise((resolve, reject) => {
            storage.get(key, (err, data) => {
                if (err) reject(err)
                else resolve(data.value)
            })
        })
    } else {
        if (val === '') {
            return new Promise((resolve, reject) => {
                storage.remove(key, (err) => {
                    if (err) reject(err)
                    else resolve()
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                storage.set(key, { value: val }, (err) => {
                    if (err) reject(err)
                    else resolve()
                })
            })
        }
    }
}

export default {
    currentUser: rw('currentUser'),
    subscriptions: rw('subscriptions'),
    refreshToken: rw('refreshToken'),
}