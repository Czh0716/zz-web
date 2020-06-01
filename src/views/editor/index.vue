<template>
    <div class="editor">
        <editor-header v-on="layoutListeners"></editor-header>
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
import { mapGetters } from 'vuex'
import { getProject } from '@/api/project'
export default {
    provide() {
        return {
            triggerElementStretch: this.triggerElementStretch,
            ...this.layoutListeners
        }
    },
    components: {
        EditorHeader: () => import('./components/EditorHeader'),
        MainLayout: () => import('./components/MainLayout'),
        SideBar: () => import('./components/SideBar'),
        LeftSideBar: () => import('./components/LeftSideBar'),
        RightSideBar: () => import('./components/RightSideBar'),
        ElementTree: () => import('./components/elementTree')
    },
    computed: {
        ...mapGetters(['pages', 'activeElement']),
        compsVisible() {
            return this.$store.state.app.windowCompsVisible
        },

        layoutListeners() {
            const { initOutlined, resizeOutlined } = this
            return {
                initOutlined,
                resizeOutlined
            }
        },
        deleteDisabled() {
            return this.activeElement.type === 'page' && this.pages.length === 1
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
        },
        handleKeyDown({ key, ctrlKey, shiftKey, altKey }) {
            switch (key.toLowerCase()) {
                case 'delete':
                    if (!this.deleteDisabled) this.$store.commit('config/DELETE_ELEMENT')
                    this.resizeOutlined()
                    break
                case 'z':
                    if (ctrlKey) {
                        shiftKey
                            ? this.$store.commit('config/FORWARD_CONFIG_RECORD')
                            : this.$store.commit('config/BACK_CONFIG_RECORD')

                        this.resizeOutlined()
                    }
                    break
                case 'c':
                    if (ctrlKey) this.$store.commit('config/COPY_ELEMENT')
                    break
                case 'v':
                    if (ctrlKey) {
                        this.$store.dispatch('config/pasteElement')
                    } else {
                        this.$store.dispatch('app/changeAction', 'selection')
                    }
                    break
                case 'x':
                    this.$store.dispatch('config/cutElement')
                    this.resizeOutlined()
                    break
                case 'r':
                    this.$store.dispatch('app/changeAction', 'create-rect')
                    break
                case 'o':
                    this.$store.dispatch('app/changeAction', 'create-ellipse')
                    break
            }
        },
        async initProject() {
            const { data } = await getProject(this.$route.params.id)
            this.$store.commit('config/INIT_PROJECT', data)
        }
    },
    mounted() {
        this.$store.commit('config/ADD_PAGE')
        this.$store.commit('config/SET_CONFIG_RECORD')
        window.addEventListener('keydown', this.handleKeyDown)
        this.initProject()
    }
}
</script>

<style lang="less" scoped>
.editor {
    height: 100%;
    .main {
        height: calc(100% - @header-height);
        display: flex;
    }
}
</style>