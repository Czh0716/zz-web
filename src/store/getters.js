const getters = {
    action: state => state.app.action,
    subAction: state => state.app.action.split('-')[1] || '',
    isShape: state => state.app.shapes.includes(state.app.action.split('-')[1])
}
export default getters
