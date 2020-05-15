import { v4 as uuidV4 } from 'uuid'
export function getElementById(arr, id, forMove = false) {
    let length = arr.length
    let i = 0
    while (length > i) {
        const element = arr[i]
        const obj = {
            el: element,
            i,
            arr
        }

        if (element.id === id) return forMove ? obj : element

        if (element.children) {
            const res = getElementById(element.children, id, forMove)
            if (res) return res
        }

        i++
    }
}

export function removeUnit(obj) {
    Object.keys(obj).forEach(key => {
        obj[key] = String(obj[key]).replace(/px/g, '')
    })
    return obj
}

export function resizeChildrenId(arr, parentId) {
    arr.forEach(target => {
        const children = target.children
        target.id = uuidV4()
        target.parentId = parentId
        if (children) resizeChildrenId(children, target.id)
    })
}
