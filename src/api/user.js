import request from '@/util/request'

export function register(data) {
    return request({
        url: `/register`,
        method: 'post',
        data
    })
}

export function login(data) {
    return request({
        url: `/login`,
        method: 'post',
        data
    })
}
