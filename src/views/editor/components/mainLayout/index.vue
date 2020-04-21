<script>
import outlined from './mixins/outlined'
import createElement from './mixins/createElement'
import selection from './mixins/selection'
import { mapGetters, mapActions } from 'vuex'
const type = {
    shape: ['rect', 'ellipse']
}
export default {
    mixins: [selection, outlined, createElement],
    data() {
        return {
            startPosition: {}
        }
    },
    computed: {
        ...mapGetters([
            'action',
            'shapes',
            'isShape',
            'subAction',
            'activePage',
            'elementNameMap',
            'elements',
            'activeElement'
        ])
    },
    methods: {
        ...mapActions({ changeAction: 'app/changeAction' }),
        onMouseDown(e) {
            const MOUSE_KEY = e.button //0=>左键 1=>中键 2=>右键
            if (MOUSE_KEY === 0) {
                this.getStartPosition(e)

                if ([this.$refs.content, this.$refs.canvas].includes(e.target)) {
                    this.resizeOutlined()
                    this.$store.commit('config/SET_CURRENT_ELEMENT')
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
            e.preventDefault()

            if (this.action.includes('create')) {
                this.stretchElement(e)
            } else if (this.action.includes('selection')) {
                this.clutched && this.dragElement(e)
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

            this.$store.commit('config/UPDATE_ELEMENT_CACHE')

            this.startPosition = {}
        },
        getStartPosition(e) {
            const { left, top } = this.$refs.content.getBoundingClientRect()
            const { left: canvasLeft, top: canvasTop } = this.$refs.canvas.getBoundingClientRect()
            const clientX = e.clientX
            const clientY = e.clientY
            const localX = clientX - canvasLeft
            const localY = clientY - canvasTop
            this.startPosition = {
                clientX,
                clientY,
                localX,
                localY,
                posLeft: canvasLeft,
                posTop: canvasTop
            }
        }
    },
    render(h) {
        const layoutEls = this.elements.map(option => {
            const { style } = option.data
            style.visibility = option.visible ? 'visible' : 'hidden'
            if (option.isShape) {
                return h('svg', { ...option.data, style }, [h(option.tag, { ...option.subData })])
            } else {
                return h('div', { ...option.data, style }, option.subData)
            }
        })
        return h(
            'div',
            {
                staticClass: 'content',
                class: {
                    [this.action]: true
                },
                on: {
                    mousedown: this.onMouseDown,
                    mousemove: this.onMouseMove,
                    mouseup: this.onMouseUp
                },
                ref: 'content'
            },
            [
                h(
                    'div',
                    {
                        staticClass: 'main-layout',

                        style: {
                            ...this.activePage.style
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
    width: 100%;
    overflow: hidden;
}
.main-layout {
    position: relative;
    width: 100%;
    margin: 0 auto;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
    .layout__element {
        position: absolute;
        width: 0;
        height: 0;
        overflow: hidden;
    }
    .layout__element--text {
        line-height: 24px;
    }

    .auxiliary-outlined {
        position: absolute;
        border: 1px solid #4f80ff;
        opacity: 1 !important;
        filter: none !important;
        .outlined--resize {
            position: absolute;
            background-color: #4f80ff;
        }
        .text-editor {
            position: absolute;
            width: 100%;
            height: 100%;
            left: -1px;
            right: -1px;
            top: -1px;
            bottom: -1px;
            resize: none;
            outline: none;
            color: inherit;
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