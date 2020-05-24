export default {
    data() {
        return {
            clutched: false,
            hideOutlined: true,
            hideOutlinedResize: false,
            hideTextEditor: true,
            resizeOrigin: [],
            outlinedStyle: {},
            outlinedStyleCopy: {} //缓存一开始的数据 并不是实时的，用于计算拖拽
        }
    },
    methods: {
        genOutlined() {
            if (this.hideOutlined || !this.activeElement) return

            const h = this.$createElement
            let children = []

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

                const activeEl = this.activeElement

                const textEditor = this.hideTextEditor
                    ? []
                    : h('textarea', {
                          staticClass: 'text-editor',
                          attrs: {
                              autoFocus: true
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

                children.push(...resizeEls, textEditor)
            }

            return h(
                'div',
                {
                    staticClass: 'auxiliary-outlined',
                    class: {
                        'line-active': this.activeElement.type === 'line'
                    },
                    style: this.outlinedStyle,
                    on: {
                        mousedown: this.onOutlinedMouseDown,
                        mouseup: this.onOutlinedMouseUp,
                        dblclick: this.onOutlinedDblclick
                    }
                },
                children
            )
        },
        initOutlined(hideResize = false) {
            if (!this.activeElement) return
            if (this.activeElement.type === 'page') return this.resizeOutlined()
            console.log(this.activeElement)
            this.hideOutlined = false
            this.hideTextEditor = true
            this.hideOutlinedResize = hideResize
            this.outlinedStyle = this.activeElement.data.style
            this.outlinedStyleCopy = { ...this.outlinedStyle }
        },
        resizeOutlined() {
            this.hideOutlined = true
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
                if (this.action.includes('selection') && this.hideTextEditor) {
                    this.clutched = true
                }
            }
        },
        onOutlinedMouseUp() {},
        onOutlinedDblclick() {
            if (this.activeElement && this.activeElement.type === 'text') {
                this.hideTextEditor = false
            }
        },
        dragElement(e) {
            const { clientX, clientY } = this.startPosition
            const startLeft = +this.outlinedStyleCopy.left.replace('px', '')
            const startTop = +this.outlinedStyleCopy.top.replace('px', '')
            const offsetX = e.clientX - clientX
            const offsetY = e.clientY - clientY

            this.outlinedStyle.left = `${startLeft + offsetX}px`
            this.outlinedStyle.top = `${startTop + offsetY}px`
        }
    }
}
