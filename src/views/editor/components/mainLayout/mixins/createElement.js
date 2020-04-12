export default {
    data() {
        return {}
    },
    methods: {
        createElement() {
            const { clientX, clientY, localX, localY } = this.startPosition
            const index = this.els.length
            const initOptions = {
                tag: this.createType,
                type: 'shape',
                svgData: {
                    staticClass: 'layout__element',
                    style: {
                        left: `${localX}px`,
                        top: `${localY}px`,
                        width: '0',
                        height: '0'
                    },
                    attrs: {
                        fill: 'none',
                        stroke: 'grey',
                        'stroke-width': 2,
                        'data-id': index
                    },
                    on: {
                        mousedown: this.onElementMouseDown,
                        mouseup: this.onElementMouseUp
                    },
                    key: `el-${index}`
                },
                data: {
                    attrs: {
                        x: 0,
                        y: 0
                    }
                },
                startPosition: {
                    clientX,
                    clientY,
                    localX,
                    localY
                }
            }

            this.canResizeWidth = this.canResizeHeight = true
            this.els.push(initOptions)
            this.activeIdx = index
        },
        stretchElement(e) {
            if (Object.keys(this.startPosition).length === 0) return

            const { clientX, clientY, posLeft, posTop } = this.startPosition
            const currentElOptions = this.els[this.activeIdx]
            const svgStyleData = currentElOptions.svgData.style
            const offsetX = e.clientX - clientX
            const offsetY = e.clientY - clientY
            const localX = e.clientX - posLeft
            const localY = e.clientY - posTop
            const {
                width: startWidth = '0',
                height: startHeight = '0',
                left
            } = this.outlinedStyleCopy
            let width = +startWidth.replace('px', '')
            let height = +startHeight.replace('px', '')
            let attrs = {}

            if (this.canResizeWidth) {
                // if (left && localX < 0) {
                // }
                width += offsetX

                // 判断反向拖拽
                if (width < 0) {
                    svgStyleData.left = `${localX}px`
                }
            }

            if (this.canResizeHeight) {
                height += offsetY
                // 判断反向拖拽
                if (height < 0) {
                    svgStyleData.top = `${localY}px`
                }
            }

            width = Math.abs(width)
            height = Math.abs(height)

            svgStyleData.width = `${width}px`
            svgStyleData.height = `${height}px`

            if ((currentElOptions.tag = 'rect')) {
                attrs = {
                    width,
                    height
                }
            }

            currentElOptions.data.attrs = attrs

            this.els.splice(this.activeIdx, 1, currentElOptions)
        },
        completeCreation() {
            this.initOutlined()
            this.els[this.activeIdx].svgData.attrs.fill = 'white'
        }
    }
}
