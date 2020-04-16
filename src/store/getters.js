const getters = {
    action: state => state.app.action,
    subAction: state => state.app.action.split('-')[1] || '',
    shapes: state => state.app.shapes,
    isShape: state => state.app.shapes.includes(state.app.action.split('-')[1]),
    elementNameMap: state => state.app.elementNameMap,
    elements: state =>
        state.config.pages[state.config.currentPageIndex].elements,
    activeElement: (state, getters) =>
        getters.elements[state.config.currentElementIndex]
}
export default getters
