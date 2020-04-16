<template>
    <div class="right-side-bar">
        <attribute></attribute>
        <layer></layer>
    </div>
</template>

<script>
import StyleOpts from './styleOpts'
export default {
    components: {
        attribute: () => import('./attribute'),
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
    flex-direction: column;
}
</style>