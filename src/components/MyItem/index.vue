
<script>
export default {
    name: 'my-item',
    inject: {
        itemGroup: {
            default: null
        }
    },
    props: {
        activeClass: String,
        value: {
            required: false
        }
    },
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        toggle() {
            this.$emit('change')
        }
    },
    created() {
        this.itemGroup.register(this)
    },
    render(h) {
        let element = this.$scopedSlots.default({
            active: this.isActive,
            toggle: this.toggle
        })

        return element
    }
}
</script>

<style lang="less" scoped>
.my-item {
}
</style>