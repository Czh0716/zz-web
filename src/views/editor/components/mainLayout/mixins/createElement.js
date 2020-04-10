export default {
    methods: {
        createElement() {
            const { clientX, clientY, localX, localY } = this.startPoint
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
                        'stroke-width': 2
                    },
                    on: {
                        click: () => {
                            this.initOutlined(index)
                        }
                    },
                    key: `el-${index}`
                },
                data: {
                    attrs: {}
                },
                startPoint: {
                    clientX,
                    clientY,
                    localX,
                    localY
                }
            }

            this.els.push(initOptions)
            this.activeIdx = this.els.length - 1
        },
        stretchElement(e) {
            if (Object.keys(this.startPoint).length === 0) return

            const { clientX, clientY, localX, localY } = this.startPoint

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
