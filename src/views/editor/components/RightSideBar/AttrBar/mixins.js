import { mapGetters } from 'vuex'

export default {
    inject: ['triggerElementStretch'],
    computed: {
        ...mapGetters(['activeElement', 'activeElementStyleCache']),
        styles() {
            const element = this.activeElement
            return element ? (element.data ? element.data.style : {}) : {}
        },
        filter() {
            return (
                this.styles.filter || 'drop-shadow(rgba(0,0,0,0) 0px 0px 0px)'
            )
        },
        shadow() {
            const shadow = this.filter
                .match(/drop-shadow\((.*)\)/)[1]
                .split(' ')
            return shadow
        }
    },
    methods: {
        removeUnit(value) {
            if (!value) return 0

            const str = String(value)
            return +str.replace('px', '')
        },
        updateAttr(e, key) {
            if (!this.activeElement) return

            const value = typeof e === 'object' ? e.target.value : e

            this.$store.commit('config/UPDATE_ELEMENT_ATTR', {
                key,
                value,
                isStyleAttr: false
            })
        },
        updateStyle(e, key, hasUnit = true) {
            if (!this.activeElement) return

            const unit = 'px'
            const value = typeof e === 'object' ? e.target.value : e

            this.$store.commit('config/UPDATE_ELEMENT_ATTR', {
                key,
                value: hasUnit ? value + unit : value
            })
            if (key !== 'opacity') this.triggerElementStretch()
        }
    }
}
