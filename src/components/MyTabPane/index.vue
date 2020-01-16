<template>
    <div class="my-tab-pane">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        label: String
    }
}
</script>

<style lang="less" scoped>
.my-tab-pane {
    background-color: #fff;
    height: 100%;
}
</style>