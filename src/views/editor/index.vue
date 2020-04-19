<template>
    <div class="editor">
        <editor-header></editor-header>
        <div class="main">
            <!-- <left-side-bar v-show="compsVisible['left']"></left-side-bar> -->
            <side-bar v-on="layoutListeners"></side-bar>
            <main-layout ref="main"></main-layout>
            <element-tree v-on="layoutListeners"></element-tree>
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
        RightSideBar: () => import('./components/RightSideBar'),
        ElementTree: () => import('./components/elementTree')
    },
    computed: {
        compsVisible() {
            return this.$store.state.app.windowCompsVisible
        },

        layoutListeners() {
            const { initOutlined, resizeOutlined } = this
            return {
                initOutlined,
                resizeOutlined
            }
        }
    },
    methods: {
        triggerElementStretch() {
            this.$refs.main.stretchElement(null, false, true)
        },
        initOutlined(hideResize = false) {
            this.$refs.main.initOutlined(hideResize)
        },
        resizeOutlined() {
            this.$refs.main.resizeOutlined()
        }
    },
    created() {
        this.$store.commit('config/SET_CONFIG_RECORD')
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
}
</style>