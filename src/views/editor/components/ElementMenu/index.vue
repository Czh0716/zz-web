<template>
    <div class="element-menu">
        <track-window :value="value" @input="(val)=>$emit('input',val)">
            <v-card class="subtitle-2 element-menu">
                <v-list dense width="200">
                    <v-list-item link>
                        前移一层
                        <span class="short-key">Ctrl+[</span>
                    </v-list-item>
                    <v-list-item link>
                        移至顶层
                        <span class="short-key">Shift+Ctrl+[</span>
                    </v-list-item>
                    <v-list-item link>
                        后移一层
                        <span class="short-key">Ctrl+]</span>
                    </v-list-item>
                    <v-list-item link>
                        移至底层
                        <span class="short-key">Shift+Ctrl+]</span>
                    </v-list-item>
                    <VDivider class="mx-2"></VDivider>
                    <v-list-item link>
                        锁定
                        <span class="short-key">Ctrl+L</span>
                    </v-list-item>
                    <v-list-item link>
                        显示/隐藏
                        <span class="short-key">Ctrl+H</span>
                    </v-list-item>
                    <VDivider class="mx-2"></VDivider>
                    <v-list-item link @click="handleOperate('copyElement')">
                        复制
                        <span class="short-key">Ctrl+C</span>
                    </v-list-item>
                    <v-list-item
                        link
                        :disabled="!copiedElement"
                        @click="handleOperate('pasteElement')"
                    >
                        粘贴
                        <span class="short-key">Ctrl+V</span>
                    </v-list-item>
                    <v-list-item link>
                        剪切
                        <span class="short-key">Ctrl+X</span>
                    </v-list-item>
                    <v-list-item link @click="handleOperate('deleteElement')">
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
            this.$store.commit('config/DELETE_ELEMENT')
            this.resizeOutlined()
        },
        copyElement() {
            this.$store.commit('config/COPY_ELEMENT')
        },
        pasteElement() {
            this.$store.dispatch('config/pasteElement')
        },
        changVisibility(visible = false) {
            this.$emit('input', visible)
        },
        handleOperate(name) {
            const f = this[name]
            f && f()
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
        }
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