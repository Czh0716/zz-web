export function getElementById(arr, id) {
    let length = arr.length
    let i = 0
    while (length > i) {
        const element = arr[i]

        if (element.id === id) return element

        if (element.children) {
            const target = getElementById(element.children, id)
            if (target) return target
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
