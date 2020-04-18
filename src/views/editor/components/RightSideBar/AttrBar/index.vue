<template>
    <div class="attribute-form">
        <shapeAttrs v-if="activeElement"></shapeAttrs>
        <!-- <shape-attr></shape-attr> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {}
    },
    components: {
        common: () => import('./common'),
        ShapeAttrs: () => import('./shapeAttrs')
    },
    computed: {
        ...mapGetters(['activeElement'])
    }
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
    background-color: white;
    padding: 20px;
}
</style>