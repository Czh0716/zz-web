export default {
    data() {
        return {}
    },
    methods: {
        onElementMouseDown(e) {
            const MOUSE_KEY = e.button

            if (MOUSE_KEY === 0) {
                if (this.action.includes('create')) {
                } else if (this.action.includes('selection')) {
                    this.$store.commit('config/SET_CURRENT_ELEMENT', e)
                    this.clutched = true
                    this.initOutlined()
                }
            } else if (MOUSE_KEY === 2) {
            }
        },
        onElementMouseUp() {
            this.clutched = false
        },
        resizeElement(e) {}
    }
}
