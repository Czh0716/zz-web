import { mapGetters } from 'vuex'

export default {
    inject: ['triggerElementStretch'],
    computed: {
        ...mapGetters(['activeElement', 'activeElementStyleCache']),
        style() {
            return this.activeElementStyleCache
        },
        filter() {
            return this.style.filter || 'drop-shadow(rgba(0,0,0,0) 0 0 0)'
        },
        shadow() {
            const shadow = this.filter
                .match(/drop-shadow\((.*)\)/)[1]
                .split(' ')
            return shadow
        }
    },
    methods: {
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
