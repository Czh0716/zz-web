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
    .color-select {
        font-size: 13px;
        text-align: center;
        position: relative;
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.42);
        border-radius: 4px;
        line-height: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        &::before {
            content: attr(label);
            position: absolute;
            left: 10px;
            top: -20px;
            background-color: #fff;
            color: rgba(0, 0, 0, 0.7);
        }

        .bar {
            position: relative;
            width: 100%;
            margin: 0 10px;
            height: 6px;
            background-color: pink;
            border-radius: 2px;
        }
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