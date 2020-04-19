import Vue from 'vue'

const state = {
    currentPageIndex: 0,
    currentElementIndex: null,
    pages: [
        {
            name: '页面1',
            id: 'page-1',
            type: 'page',
            style: {
                backgroundColor: 'rgba(255,255,255,1)',
                width: '375px',
                height: '667px'
            },
            elements: [],
            visible: true
        }
    ],
    elementNameMap: {
        rect: {
            text: '矩形',
            count: 0
        },
        ellipse: {
            text: '椭圆',
            count: 0
        },
        line: {
            text: '直线',
            count: 0
        }
    },
    activeElementStyleCache: {}
}

const mutations = {
    ADD_PAGE(state) {
        state.pages.push({
            name: `页面${state.pages.length}`,
            type: 'page',
            style: {
                backgroundColor: 'rgba(255,255,255,1)',
                width: '375px',
                height: '667px'
            },
            elements: [],
            visible: true
        })
    },
    UPDATE_PAGE_ATTR(state, { key, value, isStyleAttr = true }) {
        const currentPage = state.pages[state.currentPageIndex]

        Vue.set(isStyleAttr ? currentPage.style : currentPage, key, value)
    },
    ADD_ELEMENT(state, element) {
        const currentPage = state.pages[state.currentPageIndex]
        const elements = currentPage.elements
        const length = elements.length
        const key = `${state.currentPageIndex}-${length}`

        state.elementNameMap[element.tag].count++

        element.visible = true
        element.id = key
        element.data.key = key
        element.data.attrs['data-id'] = key
        elements.push(element)
        state.activeElementStyleCache = { ...element.data.style }
        state.currentElementIndex = length
    },
    SET_CURRENT_ELEMENT(state, e) {
        if (e) {
            const id = e.currentTarget.dataset.id
            const [page, element] = id.split('-')
            state.currentPageIndex = page
            state.currentElementIndex = element

            state.activeElementStyleCache = {
                ...state.pages[state.currentPageIndex].elements[
                    state.currentElementIndex
                ].data.style
            }
        } else {
            state.currentElementIndex = null
            state.activeElementStyleCache = {}
        }
    },
    UPDATE_CURRENT_ELEMENT(state, newVal) {
        const currentPage = state.pages[state.currentPageIndex]
        const elements = currentPage.elements
        elements.splice(state.currentElementIndex, 1, newVal)
    },
    UPDATE_ELEMENT_CACHE() {
        const currentPage = state.pages[state.currentPageIndex]
        const element = currentPage.elements[state.currentElementIndex]
        if (!element) return

        state.activeElementStyleCache = {
            ...element.data.style
        }
    },
    UPDATE_ELEMENT_ATTR(state, { key, value, isStyleAttr = true }) {
        const currentPage = state.pages[state.currentPageIndex]
        const element = currentPage.elements[state.currentElementIndex]
        if (!element) return

        Vue.set(isStyleAttr ? element.data.style : element, key, value)
    },
    TOGGLE_PAGE_VISIBLE(state, index) {
        const page = state.pages[index]
        page.visible = !page.visible
    },
    TOGGLE_ELEMENT_VISIBLE(state, { pageIndex, elementIndex }) {
        const element = state.pages[pageIndex].elements[elementIndex]
        element.visible = !element.visible
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
