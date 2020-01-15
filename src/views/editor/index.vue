<template>
    <div class="editor">
        <editor-header></editor-header>
        <left-side-bar></left-side-bar>
    </div>
</template>

<script>
const componentsFiles = require.context('./components', true, /\.vue$/)
const components = componentsFiles.keys().reduce((components, componentPath) => {
    const componentName = componentPath.replace(/^\.\/(.*)\.vue$/, '$1')

    components[componentName] = () => import(`./components/${componentName}`)
    return components
}, {})
export default {
    components
}
</script>

<style lang="less" scoped>
.editor {
    height: 100%;
}
</style>