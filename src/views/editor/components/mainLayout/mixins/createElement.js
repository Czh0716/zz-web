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
                    attrs: {}
                },
                subData:
                    this.subAction === 'text' ? 'Text Content' : { attrs: {} },
                startPosition: {
                    clientX,
                    clientY,
                    localX,
                    localY
                }
            }

            this.$store.commit('config/ADD_ELEMENT', initOption)
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
            const strokeWidth = style.strokeWidth
            let attrs = {}

            width = +width.replace('px', '')
            height = +height.replace('px', '')

            if (e) {
                let {
                    clientX,
                    clientY,
                    localX,
                    localY,
                    posLeft,
                    posTop
                } = this.startPosition
                let offsetX = e.clientX - clientX
                let offsetY = e.clientY - clientY
                localX += offsetX
                localY += offsetY
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
                const elAttrs = element.subData.attrs
                if (tag === 'rect') {
                    attrs = {
                        x: elAttrs.x ?? 0,
                        y: elAttrs.y ?? 0,
                        width: strokeWidth ? width - strokeWidth : width,
                        height: strokeWidth ? height - strokeWidth : height
                    }
                } else if (tag === 'ellipse') {
                    attrs = {
                        cx: width / 2,
                        cy: height / 2,
                        rx: strokeWidth
                            ? width / 2 - strokeWidth / 2
                            : width / 2,
                        ry: strokeWidth
                            ? height / 2 - strokeWidth / 2
                            : height / 2
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
                this.$set(element.subData, 'attrs', attrs)
            }
        },
        completeCreation() {
            this.initOutlined()
            this.$store.commit('config/UPDATE_ELEMENT_ATTR', {
                key: 'opacity',
                value: '1'
            })

            const subAction = this.subAction
            if (subAction === 'text') {
            } else if (subAction === 'resize') {
            } else if (this.shapes.includes(subAction)) {
            }
        }
    }
}
