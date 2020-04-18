<template>
    <div class="attribute-form">
        <common></common>
        <!-- <shape-attr></shape-attr> -->
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    components: {
        common: () => import('./common'),
        ShapeAttr: () => import('./shapeAttr')
    },
    methods: {
        updateAttr(e, key) {
            const unit = 'px'
            const value = e.target.value
            if (Math.isNaN(value)) return

            // this.$store.commit('config/UPDATE_ELEMENT_ATTR', { key, value: value + unit })
        }
    },
    computed: {}
}
</script>

<style lang="less">
.attribute-form {
    .v-input {
        font-size: 13px !important;
    }
}
</style>

<style lang="less" scoped>
.attribute-form {
    height: 60%;
    background-color: white;
    padding: 20px;
}
</style>