<template>
    <div class="my-item-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'my-item-group',
    provide() {
        return {
            itemGroup: this
        }
    },
    data() {
        return {
            items: [],
            activeItem: null
        }
    },
    watch: {
        items(val) {}
    },

    methods: {
        change(changed) {
            this.items.forEach(item => item._uid !== changed._uid && (item.isActive = false))
        },
        onChange(item) {
            return () => {
                this.activeItem = item
                this.updateItemsState()
            }
        },
        register(item) {
            const index = this.items.push(item) - 1
            item.$on('change', this.onChange(item))
        },
        updateItem(item) {
            return (item.isActive = item === this.activeItem)
        },
        updateItemsState() {
            this.items.forEach(this.updateItem)
        }
    }
}
</script>

<style lang="less" scoped>
.my-item-group {
}
</style>