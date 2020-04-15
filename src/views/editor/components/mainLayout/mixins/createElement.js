export default {
    data() {
        return {}
    },
    methods: {
        createElement() {
            const { clientX, clientY, localX, localY } = this.startPosition
            const index = this.els.length
            const isShape = this.isShape
            const tag = isShape ? this.subAction : 'div'
            const initOptions = {
                tag,
                type: isShape ? 'shape' : this.subAction,
                data: {
                    staticClass: 'layout__element',
                    class: {
                        'layout__element--text': this.subAction === 'text'
                    },
                    style: {
                        left: `${localX}px`,
                        top: `${localY}px`,
                        width: '0',
                        height: '0',
                        opacity: 0.4
                    },
                    attrs: {
                        ...(isShape ? { fill: 'pink' } : {}),
                        'data-id': index
                    },
                    on: {
                        mousedown: this.onElementMouseDown,
                        mouseup: this.onElementMouseUp
                    },
                    key: `el-${index}`
                },
                subData: '',
                startPosition: {
                    clientX,
                    clientY,
                    localX,
                    localY
                }
            }

            this.els.push(initOptions)
            this.activeIdx = index

            if (this.subAction === 'text') this.initOutlined(true)
        },
        stretchElement(e, isResize = false) {
            if (Object.keys(this.startPosition).length === 0) return

            const {
                clientX,
                clientY,
                localX: startLocalX,
                localY: startLocalY,
                posLeft,
                posTop
            } = this.startPosition
            const currentElOptions = this.els[this.activeIdx]
            const tag = currentElOptions.tag
            const style = currentElOptions.data.style
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
                    if (offsetX < width) style.left = `${localX}px`
                    offsetX = -offsetX
                } else if (left === '100%') {
                    if (-offsetX > width) style.left = `${localX}px`
                }
                //判断是否resize上侧的点
                if (top === '0') {
                    if (offsetY < height) style.top = `${localY}px`
                    offsetY = -offsetY
                } else if (top === '100%') {
                    if (-offsetY > height) style.top = `${localY}px`
                }

                if (left !== '50%') width += offsetX
                if (top !== '50%') height += offsetY
            } else {
                // 判断创建模式反向拖拽
                if (offsetX < 0) style.left = `${localX}px`
                if (offsetY < 0) style.top = `${localY}px`
                width += offsetX
                height += offsetY
            }

            const cacheWidth = width
            const cacheHeight = height

            width = Math.abs(width)
            height = Math.abs(height)

            if (e.shiftKey) width > height ? (height = width) : (width = height)

            style.width = `${width}px`
            style.height = `${height}px`
            if (this.isShape || this.shapes.includes(tag)) {
                if (tag === 'rect') {
                    attrs = {
                        x: 0,
                        y: 0,
                        width,
                        height
                    }
                } else if (tag === 'ellipse') {
                    attrs = {
                        cx: width / 2,
                        cy: height / 2,
                        rx: width / 2,
                        ry: height / 2
                    }
                } else if (tag === 'line') {
                    attrs = {
                        x1: cacheWidth > 0 ? 0 : width,
                        y1: cacheHeight > 0 ? 0 : height,
                        x2: cacheWidth > 0 ? width : 0,
                        y2: cacheHeight > 0 ? height : 0,
                        stroke: 'pink'
                    }
                }
                currentElOptions.subData = { attrs }
            }

            this.els.splice(this.activeIdx, 1, currentElOptions)
        },
        completeCreation() {
            this.initOutlined()
            this.outlinedStyle.opacity = '1'
            if (this.subAction === 'text')
                this.els[this.activeIdx].subData = 'Text Content'
        }
    }
}
