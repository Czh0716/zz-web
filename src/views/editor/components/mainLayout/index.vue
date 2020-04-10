<script>
const type = {
    shape: ['rect', 'ellipse']
}
export default {
    data() {
        return {
            els: [],
            activeEl: null,
            createStartPoint: {},
            createType: 'rect'
        }
    },
    methods: {
        onMouseDown(e) {
            if (type.shape.includes(this.createType)) {
                const pos = e.currentTarget.getBoundingClientRect()
                const clientX = e.clientX
                const clientY = e.clientY
                const localX = clientX - pos.left
                const localY = clientY - pos.top
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
                            stroke: 'blue',
                            'stroke-width': 2
                        },
                        key: `el-${this.els.length}`
                    },
                    data: {
                        attrs: {}
                    }
                }
                this.createStartPoint = {
                    clientX,
                    clientY,
                    localX,
                    localY
                }
                this.els.push(initOptions)
                this.activeEl = this.els.length - 1
            }
        },
        onMouseMove(e) {
            if (!!Object.keys(this.createStartPoint).length) return

            const { clientX, clientY, localX, localY } = this.createStartPoint

            const currentElOptions = this.els[this.activeEl]
            const svgStyleData = currentElOptions.svgData.style
            let width = e.clientX - clientX
            let height = e.clientY - clientY
            let attrs = {}

            // 判断反向拖拽
            if (width < 0) {
                svgStyleData.left = svgStyleData.left.replace(/(-?\d*)/, localX + width)
            }
            if (height < 0) {
                svgStyleData.top = svgStyleData.top.replace(/(-?\d*)/, localY + height)
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

            this.els.splice(this.activeEl, 1, currentElOptions)
        },
        onMouseUp() {
            this.createStartPoint = {}
        }
    },
    render(h) {
        const layoutEls = this.els.map(option => {
            if (option.type === 'shape') {
                return h('svg', { ...option.svgData }, [h(option.tag, { ...option.data })])
            }

            return h('div', { ...option })
        })
        return h(
            'div',
            {
                staticClass: 'main-layout',
                on: {
                    mousedown: this.onMouseDown,
                    mousemove: this.onMouseMove,
                    mouseup: this.onMouseUp
                }
            },
            layoutEls
        )
    }
}
</script>

<style lang="less" scoped>
.main-layout {
    position: relative;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    .test {
        top: 0;
        position: absolute;
        width: 100%;
        height: 50vh;
        pointer-events: none;
    }

    .layout__element {
        position: absolute;
        width: 0;
        height: 0;
    }
}
</style>