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
            startPosition: {},
            contentStyle: {
                transformOrigin: '50% 50%',
                transform: 'translate(-50%,-50%) scale(1)'
            }
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
                    this.$store.commit('config/SET_CURRENT_ELEMENT')
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
            const action = this.action
            if (action.includes('create')) {
                this.completeCreation()
                this.$store.commit('config/SET_CONFIG_RECORD')
            } else if (action.includes('resize')) {
                this.$store.commit('config/SET_CONFIG_RECORD')
                this.changeAction('selection')
            } else if (action.includes('selection')) {
                if (this.clutched) {
                    this.clutched = false
                    this.$store.commit('config/SET_CONFIG_RECORD')
                }
            }

            this.$store.commit('config/UPDATE_ELEMENT_CACHE')

            this.startPosition = {}
        },
        onMousewheel(e) {
            if (e.altKey) {
                const deltaY = e.deltaY
                const multiple = +this.contentStyle.transform.match(/scale\((.*)\)/)[1]

                this.$set(
                    this.contentStyle,
                    'transform',
                    `translate(-50%,-50%) scale(${multiple + (deltaY < 0 ? 0.15 : -0.15)})`
                )

                e.preventDefault()
            }
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
        },
        setTransformOrigin(e) {
            const { top, left } = this.$refs.content.getBoundingClientRect()

            const clientX = e.clientX
            const clientY = e.clientY
            const multiple = +this.contentStyle.transform.match(/scale\((.*)\)/)[1]
            const originX = (-left + clientX) / multiple
            const originY = (-top + clientY) / multiple
            this.$set(this.contentStyle, 'transformOrigin', `${originX}px ${originY}px`)
        }
    },
    render(h) {
        const layoutEls = this.elements.map(option => {
            const { style } = option.data
            style.visibility = option.visible ? 'visible' : 'hidden'

            const events = {
                on: {
                    mousedown: e => this.onElementMouseDown(e, option.id),
                    mouseup: e => this.onElementMouseUp(e, option.id)
                }
            }
            if (option.isShape) {
                return h('svg', { ...option.data, ...events }, [
                    h(option.tag, { ...option.subData })
                ])
            } else {
                return h('div', { ...option.data, ...events }, option.subData)
            }
        })
        return h(
            'div',
            {
                staticClass: 'work-area',
                on: {
                    // mousewheel: this.onMousewheel
                },
                ref: 'workArea'
            },
            [
                h(
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
                        ),
                        h('div', { staticClass: 'center-point', ref: 'centerPoint' })
                    ]
                )
            ]
        )
    }
}
</script>

<style lang="less" scoped>
.work-area {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .content {
        // position: absolute;
        // transition: 0.2s;
        // width: 10000px;
        // height: 10000px;
        // .center-point {
        //     position: absolute;
        //     left: 50%;
        //     top: 50%;
        // }
    }
}

[class*='create'] {
    cursor: crosshair;
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