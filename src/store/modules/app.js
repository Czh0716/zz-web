const state = {
    windowCompsVisible: {
        dir: true,
        left: true,
        right: true
    },
    action: 'selection',
    shapes: ['rect', 'circle']
}

const mutations = {
    TOGGLE_WINDOW_COMP_VISIBLE(state, comp) {
        state.windowCompsVisible[comp] = !state.windowCompsVisible[comp]
    },
    CHANGE_ACTION(state, action) {
        state.action = action
    }
}

const actions = {
    toggleWindowCompVisible({ commit }, comp) {
        commit('TOGGLE_WINDOW_COMP_VISIBLE', comp)
    },
    changeAction({ commit }, action) {
        commit('CHANGE_ACTION', action)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
