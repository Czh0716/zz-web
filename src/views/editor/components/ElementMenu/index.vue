<template>
    <div class="element-menu">
        <track-window :value="value" @input="(val)=>$emit('input',val)">
            <v-card class="subtitle-2 element-menu">
                <v-list dense width="200">
                    <v-list-item
                        link
                        :disabled="!activeElement || forwardDisabled"
                        @click="handleOperate('moveElement',0)"
                    >
                        前移一层
                        <span class="short-key">Ctrl+[</span>
                    </v-list-item>
                    <v-list-item
                        link
                        :disabled="!activeElement || forwardDisabled"
                        @click="handleOperate('moveElement',1)"
                    >
                        移至顶层
                        <span class="short-key">Shift+Ctrl+[</span>
                    </v-list-item>
                    <v-list-item
                        link
                        :disabled="!activeElement || backDisabled"
                        @click="handleOperate('moveElement',2)"
                    >
                        后移一层
                        <span class="short-key">Ctrl+]</span>
                    </v-list-item>
                    <v-list-item
                        link
                        :disabled="!activeElement || backDisabled"
                        @click="handleOperate('moveElement',3)"
                    >
                        移至底层
                        <span class="short-key">Shift+Ctrl+]</span>
                    </v-list-item>
                    <VDivider class="mx-2"></VDivider>
                    <v-list-item link :disabled="!activeElement">
                        锁定
                        <span class="short-key">Ctrl+L</span>
                    </v-list-item>
                    <v-list-item link :disabled="!activeElement">
                        显示/隐藏
                        <span class="short-key">Ctrl+H</span>
                    </v-list-item>
                    <VDivider class="mx-2"></VDivider>
                    <v-list-item
                        link
                        :disabled="!activeElement"
                        @click="handleOperate('copyElement')"
                    >
                        复制
                        <span class="short-key">Ctrl+C</span>
                    </v-list-item>
                    <v-list-item
                        link
                        :disabled="!activeElement"
                        @click="handleOperate('cutElement')"
                    >
                        剪切
                        <span class="short-key">Ctrl+X</span>
                    </v-list-item>
                    <v-list-item
                        link
                        :disabled="!copiedElement"
                        @click="handleOperate('pasteElement')"
                    >
                        粘贴
                        <span class="short-key">Ctrl+V</span>
                    </v-list-item>

                    <v-list-item
                        link
                        :disabled="!activeElement"
                        @click="handleOperate('deleteElement')"
                    >
                        删除
                        <span class="short-key">Delete</span>
                    </v-list-item>
                </v-list>
            </v-card>
        </track-window>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    inject: ['resizeOutlined'],
    methods: {
        deleteElement() {
            this.$store.dispatch('config/deleteElement')
            this.resizeOutlined()
        },
        copyElement() {
            this.$store.commit('config/COPY_ELEMENT')
        },
        pasteElement() {
            this.$store.dispatch('config/pasteElement')
        },
        cutElement() {
            this.$store.dispatch('config/cutElement')
            this.resizeOutlined()
        },
        moveElement(status) {
            this.$store.commit('config/MOVE_ELEMENT', status)
        },
        changVisibility(visible = false) {
            this.$emit('input', visible)
        },
        handleOperate(name, ...arg) {
            const f = this[name]
            f && f(...arg)
            this.changVisibility()
        }
    },
    computed: {
        ...mapGetters(['activeElement', 'copiedElement'])
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        forwardDisabled: {
            type: Boolean,
            default: false
        },
        backDisabled: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value(newValue, oldValue) {}
    },
    components: {
        TrackWindow: () => import('@/components/TrackWindow')
    }
}
</script>

<style lang="less" scoped>
.element-menu {
}
</style>