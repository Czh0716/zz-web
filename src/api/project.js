import request from '@/util/request'

export function getProjects(id) {
    return request({
        url: `/getProjects?uid=${id}`,
        method: 'get'
    })
}

export function addProject(data) {
    return request({
        url: `/addProject`,
        method: 'post',
        data
    })
}

export function deleteProject(data) {
    return request({
        url: `/deleteProject`,
        method: 'post',
        data
    })
}

export function getProject(id) {
    return request({
        url: `/getProject?id=${id}`,
        method: 'get'
    })
}

export function updateProject(data) {
    return request({
        url: `/updateProject`,
        method: 'post',
        data
    })
}

export function getOperationRecord() {
    return request({
        url: `/getOperationRecord`,
        method: 'get'
    })
}
