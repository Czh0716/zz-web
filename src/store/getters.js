const getters = {
    action: state => state.app.action,
    subAction: state => state.app.action.split('-')[1] || '',
    shapes: state => state.app.shapes,
    isShape: state => state.app.shapes.includes(state.app.action.split('-')[1]),
    elementNameMap: state => state.config.elementNameMap,
    activePage: state => state.config.pages[state.config.currentPageIndex],
    elements: (state, getters) => getters.activePage.elements,
    activeElement: (state, getters) =>
        getters.elements[state.config.currentElementIndex],
    activeElementStyleCache: state => state.config.activeElementStyleCache
}
export default getters
