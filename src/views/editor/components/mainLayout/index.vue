<script>
import outlined from './mixins/outlined'
import createElement from './mixins/createElement'
import selection from './mixins/selection'

const type = {
    shape: ['rect', 'ellipse']
}
export default {
    mixins: [outlined, selection, createElement],
    data() {
        return {
            els: [],
            activeIdx: null,
            startPoint: {},
            operationType: 'create',
            createType: 'rect',
            selectionType: 'normal',
            hideOutlined: true,
            outlinedStyle: {}
        }
    },
    methods: {
        onMouseDown(e) {
            this.getStartPoint(e)

            if (e.target === e.currentTarget) {
                this.hideOutlined = true
                this.activeIdx = null
            }

            if (this.operationType === 'create') {
                this.createElement(e)
            }
        },
        onMouseMove(e) {
            if (this.operationType === 'create') {
                this.stretchElement(e)
            }

            if (this.operationType === 'selection') {
                if (this.selectionType === 'normal') {
                    this.els[this.activeIdx] && this.dragElement(e)
                }
            }
        },
        onMouseUp() {
            if (this.operationType === 'create') {
                this.completeCreation()
            }
            this.startPoint = {}
        },
        getStartPoint(e) {
            const pos = e.currentTarget.getBoundingClientRect()
            const clientX = e.clientX
            const clientY = e.clientY
            const localX = clientX - pos.left
            const localY = clientY - pos.top
            this.startPoint = {
                clientX,
                clientY,
                localX,
                localY
            }
        }
    },
    render(h) {
        const layoutEls = this.els.map(option => {
            if (option.type === 'shape') {
                return h('svg', { ...option.svgData }, [h(option.tag, { ...option.data })])
            }

            return h('div', { ...option })
        })

        const header = h('div', [
            h(
                'span',
                {
                    on: {
                        click: e => {
                            this.operationType = 'selection'
                            this.selectionType = 'normal'
                            e.stopPropagation()
                        }
                    }
                },
                'selection'
            ),
            h(
                'span',
                {
                    on: {
                        click: e => {
                            this.operationType = 'create'
                            this.createType = 'rect'
                            e.stopPropagation()
                        }
                    }
                },
                'create'
            )
        ])

        return h('div', { staticClass: 'content' }, [
            header,
            h(
                'div',
                {
                    staticClass: 'main-layout',
                    on: {
                        mousedown: this.onMouseDown,
                        mousemove: this.onMouseMove,
                        mouseup: this.onMouseUp
                    }
                },
                [...layoutEls, this.genOutlined()]
            )
        ])
    }
}
</script>

<style lang="less" scoped>
.content {
    flex: 1;
    display: flex;
}
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

    .auxiliary-outlined {
        position: absolute;
        border: 1px solid #4f80ff;
        .outlined--resize {
            position: absolute;
            background-color: #4f80ff;
        }
    }
}
</style>