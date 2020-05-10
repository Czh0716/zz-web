import Vue from 'vue'
import { cloneDeep } from 'lodash'
import { v4 as uuidV4 } from 'uuid'

function removeUnit(obj) {
    Object.keys(obj).forEach(key => {
        obj[key] = String(obj[key]).replace(/px/g, '')
    })
    return obj
}

function getElementById(arr, id) {
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

const state = {
    configRecord: [],
    currentRecordIndex: -1,
    currentPageIndex: 0,
    currentElementIndex: null,
    pages: [],
    activeElement: null,
    activeElementStyleCache: {},
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
    }
}

const mutations = {
    ADD_PAGE(state) {
        const length = state.pages.length
        const page = {
            name: `页面${length}`,
            id: uuidV4(),
            type: 'page',
            style: {
                backgroundColor: 'rgba(255,255,255,1)',
                width: '375px',
                height: '667px'
            },
            children: [],
            visible: true
        }
        state.pages.push(page)
        state.activeElement = page
        state.currentPageIndex = length
    },
    UPDATE_PAGE_ATTR(state, { key, value, isStyleAttr = true }) {
        const currentPage = state.pages[state.currentPageIndex]

        Vue.set(isStyleAttr ? currentPage.style : currentPage, key, value)
    },
    SET_CURRENT_PAGE(state, index) {
        state.currentPageIndex = index
    },
    ADD_ELEMENT(state, element) {
        const activeElement = state.activeElement
        const parent = ['page', 'group'].includes(activeElement.type)
            ? activeElement
            : getElementById(state.pages, activeElement.parentId)

        const children = parent.children

        state.elementNameMap[element.tag].count++

        element.visible = true
        element.id = uuidV4()
        element.parentId = parent.id

        children.push(element)
        state.activeElement = element
        state.activeElementStyleCache = removeUnit({ ...element.data.style })
    },
    SET_ELEMENT_BY_ID(state, id) {
        const element = getElementById(state.pages, id)
        if (element) state.activeElement = element
    },
    SET_CURRENT_ELEMENT(state, id) {
        if (id) {
            const element = getElementById(state.pages, id)
            state.activeElement = element
            state.activeElementStyleCache = removeUnit({
                ...element.data.style
            })
        } else {
            state.activeElement = null
            state.activeElementStyleCache = {}
        }
    },
    UPDATE_CURRENT_ELEMENT(state, newVal) {
        const currentPage = state.pages[state.currentPageIndex]
        const children = currentPage.children
        children.splice(state.currentElementIndex, 1, newVal)
    },
    UPDATE_ELEMENT_CACHE() {
        const currentPage = state.pages[state.currentPageIndex]
        const element = currentPage.children[state.currentElementIndex]
        if (!element) return

        state.activeElementStyleCache = removeUnit({
            ...element.data.style
        })
    },
    UPDATE_ELEMENT_ATTR(state, { key, value, isStyleAttr = true }) {
        const element = state.activeElement
        if (!element) return

        Vue.set(isStyleAttr ? element.data.style : element, key, value)
        state.activeElementStyleCache = removeUnit({
            ...element.data.style
        })
    },
    TOGGLE_PAGE_VISIBLE(state, index) {
        const page = state.pages[index]
        page.visible = !page.visible
    },
    TOGGLE_ELEMENT_VISIBLE(state, { pageIndex, elementIndex }) {
        const element = state.pages[pageIndex].children[elementIndex]
        element.visible = !element.visible
    },
    SET_CONFIG_RECORD(state) {
        const {
            currentPageIndex,
            currentElementIndex,
            pages,
            activeElementStyleCache
        } = state
        state.configRecord.splice(state.currentRecordIndex + 1)
        state.configRecord.push(
            cloneDeep({
                currentPageIndex,
                currentElementIndex,
                pages,
                activeElementStyleCache
            })
        )

        state.currentRecordIndex++
    },
    BACK_CONFIG_RECORD(state) {
        state.currentRecordIndex--

        const config = cloneDeep(state.configRecord[state.currentRecordIndex])
        Object.keys(config).forEach(key => (state[key] = config[key]))
    },
    FORWARD_CONFIG_RECORD(state) {
        state.currentRecordIndex++
        const config = cloneDeep(state.configRecord[state.currentRecordIndex])
        Object.keys(config).forEach(key => (state[key] = config[key]))
    }
}

const actions = {
    addPage({ commit }) {
        commit('ADD_PAGE')
        commit('SET_CONFIG_RECORD')
    },
    togglePageVisible({ commit }, index) {
        commit('TOGGLE_PAGE_VISIBLE', index)
        commit('SET_CONFIG_RECORD')
    },
    toggleElementVisible({ commit }, value) {
        commit('TOGGLE_ELEMENT_VISIBLE', value)
        commit('SET_CONFIG_RECORD')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
