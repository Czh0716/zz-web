<template>
    <div class="editor">
        <editor-header></editor-header>
        <div class="main">
            <!-- <left-side-bar v-show="compsVisible['left']"></left-side-bar> -->
            <side-bar></side-bar>
            <main-layout ref="main"></main-layout>
            <right-side-bar v-show="compsVisible['right']"></right-side-bar>
        </div>
    </div>
</template>

<script>
export default {
    provide() {
        return {
            triggerElementStretch: this.triggerElementStretch
        }
    },
    components: {
        EditorHeader: () => import('./components/EditorHeader'),
        MainLayout: () => import('./components/MainLayout'),
        SideBar: () => import('./components/SideBar'),
        RightSideBar: () => import('./components/RightSideBar')
    },
    computed: {
        compsVisible() {
            return this.$store.state.app.windowCompsVisible
        }
    },
    methods: {
        triggerElementStretch() {
            this.$refs.main.stretchElement(null, false, true)
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