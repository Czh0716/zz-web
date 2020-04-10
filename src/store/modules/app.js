const state = {
    windowCompsVisible: {
        dir: true,
        left: true,
        right: true
    }
}

const mutations = {
    TOGGLE_WINDOW_COMP_VISIBLE(state, comp) {
        state.windowCompsVisible[comp] = !state.windowCompsVisible[comp]
    }
}

const actions = {
    toggleWindowCompVisible({ commit }, comp) {
        console.log(comp)
        commit('TOGGLE_WINDOW_COMP_VISIBLE', comp)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
