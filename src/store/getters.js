const getters = {
    action: state => state.app.action,
    subAction: state => state.app.action.split('-')[1] || '',
    shapes: state => state.app.shapes,
    isShape: state => state.app.shapes.includes(state.app.action.split('-')[1]),
    elementNameMap: state => state.config.elementNameMap,
    pages: state => state.config.pages,
    activePage: state => state.config.activePage,
    elements: (state, getters) => getters.activePage.children,
    activeElement: state => state.config.activeElement || state.config.pages[0],
    activeElementType: (state, getters) =>
        getters.activeElement && getters.activeElement.type,
    activeElementStyleCache: state => state.config.activeElementStyleCache,
    copiedElement: state => state.config.copiedElement,
    hasChildrenTypes: state => state.config.hasChildrenTypes,
    configRecord: state => state.config.configRecord,
    currentRecordIndex: state => state.config.currentRecordIndex,
    overflowHidden: state => state.config.overflowHidden,
    workAreaBGC: state => state.config.workAreaBGC,
    primaryElBGC: state => state.config.primaryElBGC
}
export default getters
