<template>
    <div class="right-side-bar">
        <div class="my-scrollbar">
            <div class="scroll-content">
                <page-attrs v-if="activeElementType === 'page'"></page-attrs>
                <shape-attrs v-else></shape-attrs>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    mounted() {
        console.log(this.activeElement, this.activeElementType)
    },
    computed: {
        ...mapGetters(['activeElement', 'activeElementType'])
    },
    components: {
        ShapeAttrs: () => import('./AttrBar/shapeAttrs'),
        PageAttrs: () => import('./AttrBar/pageAttrs')
    }
}
</script>

<style lang="less">
.right-side-bar {
    .v-input {
        font-size: 13px !important;
    }
}
</style>

<style lang="less" scoped>
.right-side-bar {
    width: @sidebar-width;
    height: 100%;
    border-left: 1px solid @grey-l-3;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    background-color: #fff;
    position: relative;
    font-size: 13px;
    .scroll-content {
        padding: 16px;
    }
}
</style>