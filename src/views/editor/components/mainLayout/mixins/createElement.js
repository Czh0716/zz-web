export default {
    data() {
        return {}
    },
    methods: {
        createElement() {
            const { clientX, clientY, localX, localY } = this.startPosition
            const isShape = this.isShape
            const tag = isShape ? this.subAction : 'div'
            const nameMap = this.elementNameMap[this.subAction]
            const initOption = {
                name: nameMap ? `${nameMap.text}${nameMap.count}` : '未命名',
                tag,
                isShape,
                type: this.subAction,
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
                        opacity: 0.4,
                        filter: '',
                        transform: 'translate3d(0,0,0)',
                        ...(isShape ? { fill: 'rgba(255,192,203,1)' } : {})
                    },
                    attrs: {},
                    on: {
                        mousedown: this.onElementMouseDown,
                        mouseup: this.onElementMouseUp
                    }
                },
                subData: this.subAction === 'text' ? 'Text Content' : {},
                startPosition: {
                    clientX,
                    clientY,
                    localX,
                    localY
                }
            }

            this.$store.dispatch('config/addElement', initOption)

            if (this.subAction === 'text') this.initOutlined(true)
        },
        stretchElement(e, isResize = false, forced = false) {
            if (Object.keys(this.startPosition).length === 0 && !forced) return
            const element = this.activeElement
            if (!element) return

            let { width = '0', height = '0' } = forced
                ? element.data.style
                : this.outlinedStyleCopy
            let cacheWidth = width
            let cacheHeight = height
            const tag = element.tag
            const style = element.data.style
            let attrs = {}

            width = +width.replace('px', '')
            height = +height.replace('px', '')

            if (e) {
                const { clientX, clientY, posLeft, posTop } = this.startPosition
                const localX = e.clientX - posLeft
                const localY = e.clientY - posTop
                let offsetX = e.clientX - clientX
                let offsetY = e.clientY - clientY

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

                cacheWidth = width
                cacheHeight = height

                width = Math.abs(width)
                height = Math.abs(height)

                if (e.shiftKey)
                    width > height ? (height = width) : (width = height)
            }

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
                element.subData = { attrs }
            }

            this.$store.commit('config/UPDATE_CURRENT_ELEMENT', element)
        },
        completeCreation() {
            this.initOutlined()
            this.outlinedStyle.opacity = '1'
            const subAction = this.subAction
            if (subAction === 'text') {
            } else if (subAction === 'resize') {
            } else if (this.shapes.includes(subAction)) {
            }
        }
    }
}
