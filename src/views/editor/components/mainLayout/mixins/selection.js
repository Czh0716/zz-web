export default {
    data() {
        return {}
    },
    methods: {
        onElementMouseDown(e, id) {
            this.getStartPosition(e)
            const MOUSE_KEY = e.button
            if (MOUSE_KEY === 0) {
                if (this.action.includes('create')) {
                } else if (this.action.includes('selection')) {
                    this.$store.commit('config/SET_CURRENT_ELEMENT', id)
                    this.clutched = true
                    this.initOutlined()
                    e.stopPropagation()
                }
            } else if (MOUSE_KEY === 2) {
                if (this.action.includes('selection')) {
                    this.$store.commit('config/SET_CURRENT_ELEMENT', id)
                    this.initOutlined()
                    this.menuVisibility = false
                    setTimeout(() => {
                        this.menuVisibility = true
                    }, 0)
                    e.stopPropagation()
                }
            }
        },
        onElementMouseUp(e, id) {
            if (this.action.includes('selection')) {
                this.$store.commit('config/SET_CURRENT_ELEMENT', id)
                this.initOutlined()
            }
        }
    }
}
