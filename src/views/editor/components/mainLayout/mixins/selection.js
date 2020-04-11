export default {
    data() {
        return {}
    },
    methods: {
        onElementMouseDown(e) {
            const MOUSE_KEY = e.button

            if (MOUSE_KEY === 0) {
                if (this.operationType === 'create') {
                } else if (this.operationType === 'selection') {
                    this.activeIdx = e.currentTarget.dataset.id
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
