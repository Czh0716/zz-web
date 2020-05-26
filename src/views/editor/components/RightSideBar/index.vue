<template>
    <div class="right-side-bar" :class="{disabled: activeElement.lock}">
        <div class="my-scrollbar">
            <div class="scroll-content">
                <template v-if="activeElement">
                    <page-attrs v-if="activeElementType === 'page'"></page-attrs>
                    <shape-attrs v-else></shape-attrs>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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

    &.disabled {
        pointer-events: none;
        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.5);
            z-index: 10;
        }
    }
}
</style>