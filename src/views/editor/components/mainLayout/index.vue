<script>
import outlined from './mixins/outlined'
import createElement from './mixins/createElement'
import selection from './mixins/selection'
import { mapGetters, mapActions } from 'vuex'
console.log()
const type = {
    shape: ['rect', 'ellipse']
}
export default {
    mixins: [selection, outlined, createElement],
    data() {
        return {
            els: [],
            activeIdx: null,
            startPosition: {},
            operationType: 'create',
            createType: 'rect',
            selectionType: 'normal'
        }
    },
    computed: {
        ...mapGetters(['action'])
    },
    methods: {
        ...mapActions({ changeAction: 'app/changeAction' }),
        onMouseDown(e) {
            const MOUSE_KEY = e.button //0=>左键 1=>中键 2=>右键
            if (MOUSE_KEY === 0) {
                this.getStartPosition(e)

                if (e.target === e.currentTarget) {
                    this.activeIdx = null
                    this.resizeOutlined()
                }

                if (this.action.includes('create')) {
                    this.resizeOutlined()
                    this.createElement(e)
                }
            } else if ((MOUSE_KEY = 1)) {
            } else {
            }
        },
        onMouseMove(e) {
            if (this.action.includes('create')) {
                this.stretchElement(e)
            } else if (this.action.includes('selection')) {
                if (this.selectionType === 'normal') {
                    this.clutched && this.dragElement(e)
                }
            } else if (this.action.includes('resize')) {
                this.stretchElement(e, true)
            }
        },
        onMouseUp() {
            if (this.action.includes('create')) {
                this.completeCreation()
            } else if (this.action.includes('resize')) {
                this.changeAction('selection')
            }

            this.startPosition = {}
        },
        getStartPosition(e) {
            const { left, top } = this.$refs.canvas.getBoundingClientRect()
            const clientX = e.clientX
            const clientY = e.clientY
            const localX = clientX - left
            const localY = clientY - top
            this.startPosition = {
                clientX,
                clientY,
                localX,
                localY,
                posLeft: left,
                posTop: top
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

        return h(
            'div',
            {
                staticClass: 'content'
            },
            [
                h(
                    'div',
                    {
                        staticClass: 'main-layout',
                        class: {
                            [this.action]: true
                        },
                        on: {
                            mousedown: this.onMouseDown,
                            mousemove: this.onMouseMove,
                            mouseup: this.onMouseUp
                        },
                        ref: 'canvas'
                    },
                    [...layoutEls, this.genOutlined()]
                )
            ]
        )
    }
}
</script>

<style lang="less" scoped>
.content {
    flex: 1;
    display: flex;
    flex-direction: column;
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

.nwse-resize {
    cursor: nwse-resize;
}

.ns-resize {
    cursor: ns-resize;
}

.nesw-resize {
    cursor: nesw-resize;
}

.ew-resize {
    cursor: ew-resize;
}
</style>