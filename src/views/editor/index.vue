<template>
    <div class="editor">
        <editor-header></editor-header>
        <div class="main">
            <left-side-bar v-show="compsVisible['left']"></left-side-bar>
            <main-layout></main-layout>
            <right-side-bar v-show="compsVisible['right']"></right-side-bar>
        </div>
    </div>
</template>

<script>
const componentsFiles = require.context('./components', true, /index\.vue$/)
const components = componentsFiles.keys().reduce((components, componentPath) => {
    const componentName = componentPath.replace(/^\.\/(.*)\/index\.vue$/, '$1')
    components[componentName] = () => import(`./components/${componentName}`)

    return components
}, {})
export default {
    components,
    computed: {
        compsVisible() {
            return this.$store.state.app.windowCompsVisible
        }
    }
}
</script>

<style lang="less" scoped>
.editor {
    height: 100%;
    .main {
        height: 100%;
        display: flex;
    }
    .content {
        flex: 1;
    }
}
</style>