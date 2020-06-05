export default {
    data() {
        return {}
    },
    methods: {
        createElement() {
            const { clientX, clientY, localX, localY } = this.startPosition
            const isShape = this.isShape
            const tag = isShape ? this.subAction : 'div'
            const type = this.subAction
            const nameMap = this.elementNameMap[this.subAction]
            const specialShape = {
                star:
                    'M50 0L64.6946 29.7746L97.5528 34.5492L73.7764 57.7254L79.3893 90.4509L50 75L20.6107 90.4508L26.2236 57.7254L2.44718 34.5491L35.3054 29.7746L50 0Z',
                triangle: 'M50 0L100 100L0 100L50 0Z',
                polygon:
                    'M20.6107 90.4508L2.44718 34.5491L50 0L97.5528 34.5491L79.3893 90.4509L20.6107 90.4508Z',
                heart:
                    'M94.63,40.56,82.43,56.77,49.71,100.09,17,56.77,4.78,40.56A24.78,24.78,0,0,1,10.57,5a27.09,27.09,0,0,1,37,5.58l2.16,2.79,2.09-2.79A27.09,27.09,0,0,1,88.78,5,24.84,24.84,0,0,1,94.63,40.56Z'
            }
            const initOption = {
                name: nameMap ? `${nameMap.text}${nameMap.count}` : '未命名',
                tag,
                isShape,
                type,
                data: {
                    staticClass: 'layout__element',
                    class: {
                        'layout__element--text': this.subAction === 'text'
                    },
                    style: {
                        position: 'absolute',
                        left: `${localX}px`,
                        top: `${localY}px`,
                        width: '0',
                        height: '0',
                        opacity: 0.4,
                        filter: '',
                        transform: 'translate3d(0,0,0)',
                        ...(isShape || specialShape[this.subAction]
                            ? { fill: this.primaryElBGC }
                            : {}),
                        ...(type === 'container'
                            ? { border: '1px dashed grey' }
                            : {}),
                        backgroundColor: 'rgba(255,255,255,0)'
                    },
                    attrs: {
                        'data-type': type,
                        ...(specialShape[this.subAction]
                            ? { viewBox: '0 0 100 100' }
                            : {})
                    }
                },
                subData: {
                    attrs: {
                        ...(specialShape[this.subAction]
                            ? { d: specialShape[this.subAction] }
                            : {})
                    }
                },
                position: {},
                children: [],
                events: {},
                visible: true,
                expand: true,
                lock: false
            }
            if (this.subAction === 'text') {
                initOption.subData = 'Text Content'
                initOption.data.style.color = 'rgba(0,0,0,1)'
                initOption.data.style.fontSize = '16px'
                initOption.data.style.borderStyle = 'solid'
                initOption.data.style.borderWidth = '0px'
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
            const type = element.type
            const style = element.data.style
            const strokeWidth = style.strokeWidth
            let attrs = {}

            width = +width.replace('px', '')
            height = +height.replace('px', '')

            if (e) {
                let { clientX, clientY, localX, localY } = this.startPosition
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

            if (element.type === 'line') height = height < 3 ? 3 : height

            this.$set(style, 'width', `${width}px`)
            this.$set(style, 'height', `${height}px`)

            if (this.isShape || this.shapes.includes(type)) {
                const elAttrs = element.subData.attrs
                if (type === 'rect') {
                    attrs = {
                        x: elAttrs.x ?? 0,
                        y: elAttrs.y ?? 0,
                        width: strokeWidth ? width - strokeWidth : width,
                        height: strokeWidth ? height - strokeWidth : height
                    }
                } else if (type === 'ellipse') {
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
                } else if (type === 'line') {
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
            } else if (subAction === 'image') {
                this.$refs.upload.value = null
                this.$refs.upload.click()
            }
        }
    }
}
