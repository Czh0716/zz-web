<template>
    <div class="attribute-form">
        <shape-attrs v-if="activeElement"></shape-attrs>
        <page-attrs v-else></page-attrs>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {}
    },
    components: {
        ShapeAttrs: () => import('./shapeAttrs'),
        PageAttrs: () => import('./pageAttrs')
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