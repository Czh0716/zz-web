import { VIcon } from 'vuetify/lib'

export default {
    data() {
        return {
            clutched: false,
            hideOutlined: true,
            hideOutlinedResize: false,
            hideTextEditor: true,
            resizeOrigin: [],
            outlinedStyle: {},
            outlinedStyleCopy: {}, //缓存一开始的数据 并不是实时的，用于计算拖拽,
            elementOrigin: []
        }
    },
    methods: {
        genOutlined() {
            if (this.hideOutlined || !this.activeElement) return

            const h = this.$createElement
            let children = []
            const expandStyle = {}
            if (this.activeElement.onContainer) {
                const parent = document.querySelector(
                    `[data-id="${this.activeElement.id}"]`
                ).parentNode
                expandStyle.top = `${+this.outlinedStyle.top.replace('px', '') +
                    +parent.style.top.replace('px', '')}px`
                expandStyle.left = `${+this.outlinedStyle.left.replace(
                    'px',
                    ''
                ) + +parent.style.left.replace('px', '')}px`
            }

            if (this.activeElement.type === 'line') {
                const { x1, x2, y1, y2 } = this.activeElement.subData.attrs
                const maxX = x1 > x2 ? 0 : 1
                const maxY = y1 > y2 ? 0 : 1

                const resizeELs = [0, 1].map(i => {
                    const left = i === maxX ? '100%' : '0'
                    const top = i === maxY ? '100%' : '0'
                    return h('div', {
                        staticClass: 'line--resize',
                        style: {
                            left,
                            top
                        },
                        on: {
                            mousedown: e => {
                                this.changeAction('line-resize')
                                this.getStartPosition(e)
                                this.resizeOrigin = [left, top]
                                this.initOutlined()
                                e.stopPropagation()
                            }
                        }
                    })
                })
                children.push(resizeELs)
            } else {
                const resizeOrigins = [
                    { origin: '0 0', cursor: 'nwse' },
                    { origin: '50% 0', cursor: 'ns' },
                    { origin: '100% 0', cursor: 'nesw' },
                    { origin: '0 50%', cursor: 'ew' },
                    { origin: '100% 50%', cursor: 'ew' },
                    { origin: '0 100%', cursor: 'nesw' },
                    { origin: '50% 100%', cursor: 'ns' },
                    { origin: '100% 100%', cursor: 'nwse' }
                ]

                const resizeEls = this.hideOutlinedResize
                    ? []
                    : resizeOrigins.map(({ origin, cursor }) => {
                          const [left, top] = origin.split(' ')

                          return h('div', {
                              staticClass: 'outlined--resize',
                              style: {
                                  cursor: `${cursor}-resize`,
                                  left,
                                  top
                              },
                              on: {
                                  mousedown: e => {
                                      this.changeAction(`${cursor}-resize`)
                                      this.resizeOrigin = [left, top]
                                      this.getStartPosition(e)
                                      this.initOutlined()
                                      e.stopPropagation()
                                  }
                              }
                          })
                      })

                const rotationEl = this.hideOutlinedResize
                    ? []
                    : h(
                          VIcon,
                          {
                              staticClass: 'rotation-btn',
                              on: {
                                  mousedown: e => {
                                      const {
                                          left,
                                          top,
                                          width,
                                          height
                                      } = this.$refs.outlined.getBoundingClientRect()
                                      this.elementOrigin = [
                                          left + width / 2,
                                          top + height / 2
                                      ]
                                      this.changeAction(`rotation`)
                                  }
                              }
                          },
                          'mdi-rotate-3d-variant'
                      )

                const activeEl = this.activeElement

                const textEditor = this.hideTextEditor
                    ? []
                    : h('textarea', {
                          staticClass: 'text-editor',
                          attrs: {
                              autoFocus: true
                          },
                          style: {
                              borderWidth: this.outlinedStyle.borderWidth,
                              borderColor: this.outlinedStyle.borderColor,
                              borderRadius: this.outlinedStyle.borderRadius,
                              borderStyle: this.outlinedStyle.borderStyle
                          },
                          domProps: {
                              value: activeEl.subData
                          },
                          on: {
                              input(e) {
                                  activeEl.subData = e.target.value
                              }
                          }
                      })

                children.push(...resizeEls, textEditor, rotationEl)
            }

            return h(
                'div',
                {
                    ref: 'outlined',
                    staticClass: 'auxiliary-outlined',
                    class: {
                        'line-active': this.activeElement.type === 'line'
                    },
                    style: { ...this.outlinedStyle, ...expandStyle },
                    on: {
                        mousedown: this.onOutlinedMouseDown,
                        mouseup: this.onOutlinedMouseUp
                    }
                },
                children
            )
        },
        initOutlined(hideResize = false) {
            const active = this.activeElement
            if (!active) return
            if (active.type === 'page') return this.resizeOutlined()
            if (active.type === 'text') this.hideTextEditor = false
            this.hideOutlined = false
            this.hideOutlinedResize = hideResize || active.lock
            this.outlinedStyle = active.data.style
            this.outlinedStyleCopy = { ...this.outlinedStyle }
        },
        resizeOutlined() {
            this.hideOutlined = true
            this.hideTextEditor = true
            this.outlinedStyle = {}
            this.outlinedStyleCopy = {}
        },
        onOutlinedMouseDown(e) {
            const MOUSE_KEY = e.button
            this.initOutlined()
            if (MOUSE_KEY === 2) {
                if (this.action.includes('selection')) {
                    this.menuVisibility = false
                    setTimeout(() => {
                        this.menuVisibility = true
                    }, 0)
                    e.stopPropagation()
                }
            } else {
                if (this.action.includes('selection')) {
                    this.clutched = true
                }
            }
        },
        onOutlinedMouseUp() {},
        dragElement(e) {
            if (this.activeElement.lock) return

            const { clientX, clientY } = this.startPosition
            const startLeft = +this.outlinedStyleCopy.left.replace('px', '')
            const startTop = +this.outlinedStyleCopy.top.replace('px', '')
            const offsetX = e.clientX - clientX
            const offsetY = e.clientY - clientY

            this.outlinedStyle.left = `${startLeft + offsetX}px`
            this.outlinedStyle.top = `${startTop + offsetY}px`
        },
        rotationElement(e) {
            const [centerX, centerY] = this.elementOrigin
            let end =
                Math.atan2(e.clientX - centerX, centerY - e.clientY) /
                (Math.PI / 180)

            if (Math.abs(end % 90) <= 3) end = Math.round(end / 90) * 90

            this.$store.commit('config/UPDATE_ELEMENT_ATTR', {
                key: 'transform',
                value: `rotate(${end}deg) translate3d(0,0,0)`
            })
        }
    }
}
