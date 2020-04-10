export default {
    methods: {
        genOutlined() {
            if (this.hideOutlined) return

            const h = this.$createElement
            const resizeOrigin = [
                { origin: '0 0', cursor: 'nwse' },
                { origin: '50% 0', cursor: 'ns' },
                { origin: '100% 0', cursor: 'nesw' },
                { origin: '0 50%', cursor: 'ew' },
                { origin: '100% 50%', cursor: 'ew' },
                { origin: '0 100%', cursor: 'nesw' },
                { origin: '50% 100%', cursor: 'ns' },
                { origin: '100% 100%', cursor: 'nwse' }
            ]
            const resizeEls = resizeOrigin.map(({ origin, cursor }) => {
                const [left, top] = origin.split(' ')
                const size = 6

                return h('div', {
                    staticClass: 'outlined--resize',
                    style: {
                        width: `${size}px`,
                        height: `${size}px`,
                        marginLeft: `${-size / 2}px`,
                        marginTop: `${-size / 2}px`,
                        cursor: `${cursor}-resize`,
                        left,
                        top
                    },
                    on: {
                        mousedown: e => {
                            this.operationType = 'selection'
                            this.selectionType === 'resize'
                        },
                        mouseup: () => {}
                    }
                })
            })

            return h(
                'div',
                {
                    staticClass: 'auxiliary-outlined',
                    style: this.outlinedStyle
                },
                resizeEls
            )
        },
        initOutlined() {
            const activeEl = this.els[this.activeIdx]
            if (!activeEl) return
            this.hideOutlined = false
            this.outlinedStyle = activeEl.svgData.style
        }
    }
}
