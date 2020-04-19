<template>
    <div class="right-side-bar">
        <attr-bar></attr-bar>
        <layer></layer>
    </div>
</template>

<script>
import StyleOpts from './styleOpts'
export default {
    components: {
        AttrBar: () => import('./AttrBar'),
        layer: () => import('./layer'),
        StyleOpts
    },
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped>
.right-side-bar {
    width: @sidebar-width;
    height: @sidebar-height;
    border-left: 1px solid @grey-l-3;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    background-color: #fff;
}
</style>