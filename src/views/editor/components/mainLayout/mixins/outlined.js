export default {
    methods: {
        genOutlined() {
            if (Object.keys(this.outlinedStyle).length === 0) return

            const h = this.$createElement
            const origins = [
                'left top',
                'center top',
                'right top',
                'left center',
                'right center',
                'left bottom',
                'center bottom',
                'right bottom'
            ]

            const map = {
                left: '0',
                right: '100%',
                top: '0',
                bottom: '100%',
                center: '50%'
            }

            const resizeEls = origins.map(origin => {
                const [x, y] = origin.split(' ')
                const size = 6

                return h('div', {
                    staticClass: 'outlined--resize',
                    style: {
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${map[x]}`,
                        top: `${map[y]}`,
                        marginLeft: `${-size / 2}px`,
                        marginTop: `${-size / 2}px`
                    }
                })
            })

            return h(
                'div',
                {
                    staticClass: 'auxiliary-outlined',
                    style: this.outlinedStyle
                },
                resizeEls
            )
        },
        initOutlined() {
            const activeEl = this.els[this.activeIdx]
            if (!activeEl) return

            this.outlinedStyle = activeEl.svgData.style
        }
    }
}
