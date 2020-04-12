export default {
    data() {
        return {
            clutched: false,
            hideOutlined: true,
            resizeOrigin: [],
            outlinedStyle: {},
            outlinedStyleCopy: {} //缓存一开始的数据 并不是实时的，用于计算拖拽
        }
    },
    methods: {
        genOutlined() {
            if (this.hideOutlined) return

            const h = this.$createElement
            const resizeOrigins = [
                { origin: '0 0', cursor: 'nwse' },
                { origin: '50% 0', cursor: 'ns' },
                { origin: '100% 0', cursor: 'nesw' },
                { origin: '0 50%', cursor: 'ew' },
                { origin: '100% 50%', cursor: 'ew' },
                { origin: '0 100%', cursor: 'nesw' },
                { origin: '50% 100%', cursor: 'ns' },
                { origin: '100% 100%', cursor: 'nwse' }
            ]

            const resizeEls = resizeOrigins.map(({ origin, cursor }) => {
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
                            this.operationType = `${cursor}-resize`
                            this.resizeOrigin = [left, top]
                            this.getStartPosition(e)
                            this.initOutlined()
                            e.stopPropagation()
                        },
                        mouseup: () => {
                            this.operationType = 'selection'
                        }
                    }
                })
            })

            return h(
                'div',
                {
                    staticClass: 'auxiliary-outlined',
                    style: this.outlinedStyle,
                    on: {
                        mousedown: this.onOutlinedMouseDown,
                        mouseup: this.onOutlinedMouseUp
                    }
                },
                resizeEls
            )
        },
        initOutlined() {
            const activeEl = this.els[this.activeIdx]
            if (!activeEl) return
            this.hideOutlined = false
            this.outlinedStyle = activeEl.svgData.style
            this.outlinedStyleCopy = { ...this.outlinedStyle }
        },
        resizeOutlined() {
            this.hideOutlined = true
            this.outlinedStyle = {}
            this.outlinedStyleCopy = {}
        },
        onOutlinedMouseDown(e) {
            if (this.operationType === 'selection') {
                this.clutched = true
                this.initOutlined()
            }
        },
        onOutlinedMouseUp(e) {
            this.clutched = false
        },
        dragElement(e) {
            const { clientX, clientY } = this.startPosition
            const startLeft = +this.outlinedStyleCopy.left.replace('px', '')
            const startTop = +this.outlinedStyleCopy.top.replace('px', '')
            const offsetX = e.clientX - clientX
            const offsetY = e.clientY - clientY

            this.outlinedStyle.left = `${startLeft + offsetX}px`
            this.outlinedStyle.top = `${startTop + offsetY}px`
        },
        resizeElement(e) {
            const { clientX, clientY } = this.startPosition
            const startStyle = this.outlinedStyleCopy
            const offsetX = e.clientX - clientX
            const offsetY = e.clientY - clientY
            const width = +startStyle.width.replace('px', '') + offsetX
            const height = +startStyle.height.replace('px', '') + offsetY
            if (this.canResizeWidth) {
                if (width < 0) {
                    this.outlinedStyle.left = `${e.clientX - posLeft}px`
                }

                this.outlinedStyle.width = `${Math.abs(width)}px`
                console.log(`${Math.abs(width)}px`, this.outlinedStyle.width)
            }
        }
    }
}
