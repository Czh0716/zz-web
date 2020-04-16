const state = {
    currentPageIndex: 0,
    currentElementIndex: null,
    pages: [{ name: '页面1', elements: [] }]
}

const mutations = {
    ADD_PAGE(state) {
        state.pages.push({
            name: `页面${state.pages.length}`,
            elements: []
        })
    },
    ADD_ELEMENT(state, element) {
        const currentPage = state.pages[state.currentPageIndex]
        const elements = currentPage.elements
        const length = elements.length
        const key = `${state.currentPageIndex}-${length}`

        element.data.key = key
        element.data.attrs['data-id'] = key
        elements.push(element)
        state.currentElementIndex = length
    },
    SET_CURRENT_ELEMENT(state, e) {
        if (e) {
            const id = e.currentTarget.dataset.id
            const [page, element] = id.split('-')
            state.currentPageIndex = page
            state.currentElementIndex = element
        } else {
            state.currentElementIndex = null
        }
    },
    UPDATE_CURRENT_ELEMENT(state, newVal) {
        const currentPage = state.pages[state.currentPageIndex]
        const elements = currentPage.elements
        elements.splice(state.currentElementIndex, 1, newVal)
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
