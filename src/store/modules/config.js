import Vue from 'vue'
import { cloneDeep } from 'lodash'
import { v4 as uuidV4 } from 'uuid'
import { getElementById, removeUnit, resizeChildrenId } from '@/util/tool.js'

function deleteElementById(elements, id) {
    let length = elements.length
    let i = 0
    while (length > i) {
        const element = elements[i]

        if (element.id === id) {
            const activeId =
                element.type === 'page'
                    ? i === length - 1
                        ? elements[i - 1].id
                        : elements[i + 1].id
                    : element.pageId
            elements.splice(i, 1)
            return activeId
        }
        if (element.children) {
            const activeId = deleteElementById(element.children, id)

            if (activeId) return activeId
        }

        i++
    }
}

const state = {
    configRecord: [],
    currentRecordIndex: -1,
    pages: [],
    activePage: null,
    activeElement: null,
    activeElementStyleCache: {},
    copiedElement: null,
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
    overflowHidden: false,
    workAreaBGC: 'rgba(250,250,250,1)'
}

const mutations = {
    ADD_PAGE(state, page) {
        const length = state.pages.length
        if (!page) {
            page = {
                type: 'page',
                style: {
                    backgroundColor: 'rgba(255,255,255,1)',
                    width: '375px',
                    height: '667px'
                },
                children: [],
                visible: true
            }
        }

        page.name = `页面${length}`
        page.id = uuidV4()
        resizeChildrenId(page.children, page.id)

        state.pages.push(page)
        state.activeElement = page
        state.activePage = page
    },
    UPDATE_PAGE_ATTR(state, { key, value, isStyleAttr = true }) {
        const element = state.activeElement
        if (!element) return

        Vue.set(isStyleAttr ? element.style : element, key, value)
        state.activeElementStyleCache = removeUnit({
            ...element.style
        })
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
        element.pageId = state.activePage.id
        element.parentId = parent.id

        children.push(element)
        state.activeElement = element
        state.activeElementStyleCache = removeUnit({ ...element.data.style })
    },
    DELETE_ELEMENT(state) {
        //因为暂时没有多选功能，所以默认只删除激活元素
        //删除完元素后返回该元素所在页面元素Id，将该页面元素设为激活

        const id = deleteElementById(state.pages, state.activeElement.id)
        state.activeElement = getElementById(state.pages, id)
        if (state.activeElement.type === 'page')
            state.activePage = state.activeElement
    },
    COPY_ELEMENT(state) {
        state.copiedElement = state.activeElement
    },
    MOVE_ELEMENT(state, status) {
        //status代表移动的操作，0：前移1，1：前移顶，2：后移1，3：后移底
        const { arr, i } = getElementById(
            state.pages,
            state.activeElement.id,
            true
        )

        switch (status) {
            case 0:
                if (i === 0) return
                ;[arr[i], arr[i - 1]] = [arr[i - 1], arr[i]]
                break
            case 1:
                if (i === 0) return
                ;[arr[i], arr[0]] = [arr[0], arr[i]]
                break
            case 2:
                if (i === arr.length - 1) return
                ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
                break
            case 3:
                if (i === arr.length - 1) return
                ;[arr[i], arr[arr.length - 1]] = [arr[arr.length - 1], arr[i]]
                break
        }
    },
    SET_ELEMENT_BY_ID(state, id) {
        const element = getElementById(state.pages, id)
        if (element) state.activeElement = element
    },
    SET_CURRENT_ELEMENT(state, id) {
        if (id) {
            const element = getElementById(state.pages, id)
            state.activeElement = element
            state.activePage = getElementById(state.pages, element.pageId)

            if (element.type === 'page') {
                state.activePage = element
            } else {
                state.activeElementStyleCache = removeUnit({
                    ...element.data.style
                })
            }
        } else {
            state.activeElement = state.activePage
            state.activeElementStyleCache = {}
        }
    },
    UPDATE_ELEMENT_CACHE(state) {
        const element = state.activeElement
        if (!element || element.type === 'page') return

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
    TOGGLE_ELEMENT_VISIBLE(state, id) {
        const element = getElementById(state.pages, id)
        Vue.set(element, 'visible', !element.visible)
    },
    SET_CONFIG_RECORD(state) {
        const { pages, activePage, activeElementStyleCache } = state
        state.configRecord.splice(state.currentRecordIndex + 1)
        state.configRecord.push(
            cloneDeep({
                pages,
                activePage,
                activeElementStyleCache
            })
        )

        state.currentRecordIndex++
    },
    BACK_CONFIG_RECORD(state) {
        if (state.currentRecordIndex <= 0) return

        state.currentRecordIndex--
        state.activeElement = state.activePage
        const config = cloneDeep(state.configRecord[state.currentRecordIndex])
        Object.keys(config).forEach(key => (state[key] = config[key]))
    },
    FORWARD_CONFIG_RECORD(state) {
        if (state.currentRecordIndex >= state.configRecord.length - 1) return

        state.currentRecordIndex++
        state.activeElement = state.activePage
        const config = cloneDeep(state.configRecord[state.currentRecordIndex])
        Object.keys(config).forEach(key => (state[key] = config[key]))
    },
    TOGGLE_PAGE_OVERFLOW(state) {
        state.overflowHidden = !state.overflowHidden
    },
    SET_WORKAREA_BGC(state, color) {
        state.workAreaBGC = color
    }
}

const actions = {
    addPage({ commit }) {
        commit('ADD_PAGE')
        commit('SET_CONFIG_RECORD')
    },
    deleteElement({ commit }) {
        commit('DELETE_ELEMENT')
        commit('SET_CONFIG_RECORD')
    },
    toggleElementVisible({ commit }, value) {
        commit('TOGGLE_ELEMENT_VISIBLE', value)
        commit('SET_CONFIG_RECORD')
    },
    pasteElement({ commit, state }) {
        const copiedElement = cloneDeep(state.copiedElement)
        if (!copiedElement) return
        const shape = copiedElement.tag
        const elementName = state.elementNameMap[shape]
        copiedElement.name = elementName
            ? `${elementName.text}${elementName.count}`
            : `${copiedElement.name} 2`

        commit(
            copiedElement.type === 'page' ? 'ADD_PAGE' : 'ADD_ELEMENT',
            copiedElement
        )
        commit('SET_CONFIG_RECORD')
    },
    cutElement({ commit, dispatch }) {
        commit('COPY_ELEMENT')
        dispatch('deleteElement')
        commit('SET_CONFIG_RECORD')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
