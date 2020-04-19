const getters = {
    action: state => state.app.action,
    subAction: state => state.app.action.split('-')[1] || '',
    shapes: state => state.app.shapes,
    isShape: state => state.app.shapes.includes(state.app.action.split('-')[1]),
    elementNameMap: state => state.config.elementNameMap,
    pages: state => state.config.pages,
    activePage: state => state.config.pages[state.config.currentPageIndex],
    elements: (state, getters) => getters.activePage.elements,
    activeElement: (state, getters) =>
        getters.elements[state.config.currentElementIndex],
    activeElementStyleCache: state => state.config.activeElementStyleCache,
    configRecord: state => state.config.configRecord,
    currentRecordIndex: state => state.config.currentRecordIndex
}
export default getters
