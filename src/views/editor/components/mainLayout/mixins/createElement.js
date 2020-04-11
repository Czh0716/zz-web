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
                        top: `${localY}px`
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
                    attrs: {}
                },
                startPosition: {
                    clientX,
                    clientY,
                    localX,
                    localY
                }
            }

            this.els.push(initOptions)
            this.activeIdx = index
        },
        stretchElement(e) {
            if (Object.keys(this.startPosition).length === 0) return

            const { clientX, clientY, localX, localY } = this.startPosition

            const currentElOptions = this.els[this.activeIdx]
            const svgStyleData = currentElOptions.svgData.style
            let width = e.clientX - clientX
            let height = e.clientY - clientY
            let attrs = {}

            // 判断反向拖拽
            if (width < 0) {
                svgStyleData.left = svgStyleData.left.replace(
                    /(-?[\d\.]*)/,
                    localX + width
                )
            }
            if (height < 0) {
                svgStyleData.top = svgStyleData.top.replace(
                    /(-?[\d\.]*)/,
                    localY + height
                )
            }

            // 保证宽高为正数
            width = Math.abs(width)
            height = Math.abs(height)

            svgStyleData.width = `${width}px`
            svgStyleData.height = `${height}px`

            if ((currentElOptions.tag = 'rect')) {
                attrs = {
                    x: 0,
                    y: 0,
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
