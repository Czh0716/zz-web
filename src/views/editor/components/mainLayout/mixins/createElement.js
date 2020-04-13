export default {
    data() {
        return {}
    },
    methods: {
        createElement() {
            const { clientX, clientY, localX, localY } = this.startPosition
            const index = this.els.length
            const shape = this.action.split('-')[1]
            const initOptions = {
                tag: shape,
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
                        fill: 'pink',
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
        stretchElement(e, isResize = false) {
            if (Object.keys(this.startPosition).length === 0) return

            const { clientX, clientY, posLeft, posTop } = this.startPosition
            const currentElOptions = this.els[this.activeIdx]
            const shape = currentElOptions.tag
            const styleData = currentElOptions.svgData.style
            const localX = e.clientX - posLeft
            const localY = e.clientY - posTop
            let { width = '0', height = '0' } = this.outlinedStyleCopy
            let offsetX = e.clientX - clientX
            let offsetY = e.clientY - clientY
            let attrs = {}

            width = +width.replace('px', '')
            height = +height.replace('px', '')

            if (isResize) {
                const [left, top] = this.resizeOrigin
                //判断是否resize左侧的点
                if (left === '0') {
                    if (offsetX < width) styleData.left = `${localX}px`
                    offsetX = -offsetX
                } else if (left === '100%') {
                    if (-offsetX > width) styleData.left = `${localX}px`
                }
                //判断是否resize上侧的点
                if (top === '0') {
                    if (offsetY < height) styleData.top = `${localY}px`
                    offsetY = -offsetY
                } else if (top === '100%') {
                    if (-offsetY > height) styleData.top = `${localY}px`
                }

                if (left !== '50%') width += offsetX
                if (top !== '50%') height += offsetY
            } else {
                // 判断创建模式反向拖拽
                if (offsetX < 0) styleData.left = `${localX}px`
                if (offsetY < 0) styleData.top = `${localY}px`
                width += offsetX
                height += offsetY
            }

            width = Math.abs(width)
            height = Math.abs(height)

            if (e.shiftKey) width > height ? (height = width) : (width = height)

            styleData.width = `${width}px`
            styleData.height = `${height}px`

            if (shape === 'rect') {
                attrs = {
                    width,
                    height
                }
            } else if (shape === 'ellipse') {
                attrs = {
                    cx: width / 2,
                    cy: height / 2,
                    rx: width / 2,
                    ry: height / 2
                }
            }

            currentElOptions.data.attrs = attrs

            this.els.splice(this.activeIdx, 1, currentElOptions)
        },
        completeCreation() {
            this.initOutlined()
            // this.els[this.activeIdx].svgData.attrs.fill = 'white'
        }
    }
}
