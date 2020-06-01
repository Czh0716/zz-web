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
    components: {
        ElementMenu: () => import('../ElementMenu')
    },
    data() {
        return {
            startPosition: {},
            contentStyle: {
                transformOrigin: '50% 50%',
                transform: 'translate(-50%,-50%) scale(1)'
            },
            menuVisibility: false
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
            'activeElement',
            'overflowHidden',
            'workAreaBGC',
            'primaryElBGC'
        ])
    },
    methods: {
        ...mapActions({ changeAction: 'app/changeAction' }),
        onMouseDown(e) {
            const MOUSE_KEY = e.button //0=>左键 1=>中键 2=>右键
            const action = this.action
            if (MOUSE_KEY === 0) {
                this.getStartPosition(e)

                if (action === 'selection') {
                    if ([this.$refs.content, this.$refs.canvas].includes(e.target)) {
                        this.$store.commit('config/SET_CURRENT_ELEMENT')
                        this.resizeOutlined()
                    }
                } else if (action.includes('create')) {
                    this.resizeOutlined()
                    this.createElement(e)
                }
            } else if (MOUSE_KEY === 1) {
            } else {
            }
        },
        onMouseMove(e) {
            const action = this.action
            if (action.includes('create')) {
                this.stretchElement(e)
            } else if (action.includes('selection')) {
                this.clutched && this.dragElement(e)
            } else if (action.includes('resize')) {
                this.stretchElement(e, true)
            } else if (action.includes('rotation')) {
                this.rotationElement(e)
            }
            e.preventDefault()
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
            } else if (action.includes('rotation')) {
                this.changeAction('selection')
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
        },
        genLayoutElements(elements) {
            const h = this.$createElement
            return elements.map(element => {
                const { style } = element.data
                style.visibility = element.visible ? 'visible' : 'hidden'
                const events = {
                    on: {
                        mousedown: e => this.onElementMouseDown(e, element.id),
                        mouseup: e => this.onElementMouseUp(e, element.id)
                    }
                }
                if (element.isShape) {
                    return h('svg', { ...element.data, ...events }, [
                        h(element.tag, { ...element.subData })
                    ])
                } else if (element.type === 'text') {
                    return h('div', { ...element.data, ...events }, element.subData)
                } else if (element.type === 'container') {
                    return h(
                        'div',
                        { ...element.data, ...events },
                        this.genLayoutElements(element.children)
                    )
                } else if (element.type === 'image') {
                    return h('img', { ...element.data, ...events })
                } else if (element.type === 'input') {
                    return h('input', { ...element.data, ...events })
                } else if (['star', 'heart', 'triangle', 'polygon'].includes(element.type)) {
                    return h('svg', { ...element.data, ...events }, [
                        h('path', { ...element.subData })
                    ])
                }
            })
        }
    },
    render(h) {
        return h(
            'div',
            {
                staticClass: 'work-area',
                on: {
                    // mousewheel: this.onMousewheel
                },
                style: {
                    backgroundColor: this.workAreaBGC
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
                                staticClass: 'page__content',
                                style: {
                                    ...this.activePage.style,
                                    overflow: this.overflowHidden ? 'hidden' : ''
                                },
                                ref: 'canvas'
                            },
                            [this.genLayoutElements(this.activePage.children), this.genOutlined()]
                        ),

                        h('div', { staticClass: 'center-point', ref: 'centerPoint' })
                    ]
                ),
                <ElementMenu v-model={this.menuVisibility}></ElementMenu>,
                <input
                    ref="upload"
                    type="file"
                    accept="image/*"
                    class="global-upload"
                    on={{
                        input: () => {
                            if (this.subAction === 'image') {
                                const url = URL.createObjectURL(this.$refs.upload.files[0])
                                this.$store.commit('config/UPDATE_ELEMENT_ATTR', {
                                    key: 'src',
                                    value: url,
                                    isStyleAttr: false
                                })
                            }
                        }
                    }}
                />
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
        display: flex;
        justify-content: center;
    }
}

.global-upload {
    display: none;
}

[class*='create'] {
    cursor: crosshair;
}
.page__content {
    position: relative;
    width: 100%;
    margin: 0 auto;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);

    .auxiliary-outlined {
        @size: 6px;
        position: absolute;
        border: 1px solid #4f80ff !important;
        opacity: 1 !important;
        filter: none !important;
        .line--resize,
        .outlined--resize {
            position: absolute;
            width: @size;
            height: @size;
            background-color: #4f80ff;
            margin-left: -@size / 2;
            margin-top: -@size / 2;
        }

        .line--resize {
            position: absolute;
            border-radius: 50%;
            cursor: default;
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

        .rotation-btn {
            position: absolute;
            color: #4f80ff;
            left: 50%;
            transform: translate(-50%, -40px);
            cursor: pointer;
        }

        &.line-active {
            border: none;
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