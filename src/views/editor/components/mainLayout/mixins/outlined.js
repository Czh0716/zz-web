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
            if (this.hideOutlined) return

            const h = this.$createElement
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
                      const size = 6

                      return h('div', {
                          staticClass: 'outlined--resize',
                          style: {
                              width: `${size}px`,
                              height: `${size}px`,
                              marginLeft: `${-size / 2}px`,
                              marginTop: `${-size / 2}px`,
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
                              },
                              mouseup: () => {
                                  this.changeAction('selection')
                              }
                          }
                      })
                  })

            const activeEl = this.els[this.activeIdx]

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

            return h(
                'div',
                {
                    staticClass: 'auxiliary-outlined',
                    style: this.outlinedStyle,
                    on: {
                        mousedown: this.onOutlinedMouseDown,
                        mouseup: this.onOutlinedMouseUp,
                        dblclick: this.onOutlinedDblclick
                    }
                },
                [...resizeEls, textEditor]
            )
        },
        initOutlined(hideResize = false) {
            if (!this.activeElement) return
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
            if (this.action.includes('selection') && this.hideTextEditor) {
                this.clutched = true
                this.initOutlined()
            }
        },
        onOutlinedMouseUp(e) {
            this.clutched = false
        },
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
