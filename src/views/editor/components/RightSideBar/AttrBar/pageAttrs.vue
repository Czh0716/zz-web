<template>
    <div class="page-attrs">
        <v-row>
            <v-col>
                <v-text-field
                    :value="activePage.name"
                    @input="(e)=>updateAttr(e,'name',false)"
                    label="名称"
                    hide-details
                    dense
                    outlined
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6">
                <v-text-field
                    :value="removeUnit(pageStyle.width)"
                    @input="(e)=>updateStyle(e,'width')"
                    label="width"
                    suffix="px"
                    hide-details
                    dense
                    outlined
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                    :value="removeUnit(pageStyle.height)"
                    @input="(e)=>updateStyle(e,'height')"
                    label="height"
                    suffix="px"
                    hide-details
                    dense
                    outlined
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <color-input
                    label="背景颜色"
                    :value="pageStyle.backgroundColor"
                    @input="(val)=>updateStyle(val,'backgroundColor','')"
                ></color-input>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-file-input
                    label="背景图片"
                    accept="image/*"
                    placeholder="上传图片"
                    prepend-icon="mdi-camera"
                    outlined
                    dense
                ></v-file-input>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['activePage']),
        pageStyle() {
            return this.activePage.style
        }
    },
    methods: {
        removeUnit(value) {
            if (!value) return ''
            const str = String(value)

            return str.replace('px', '')
        },
        updateAttr(e, key) {
            const value = typeof e === 'object' ? e.target.value : e

            this.$store.commit('config/UPDATE_PAGE_ATTR', { key, value, isStyleAttr: false })
        },
        updateStyle(e, key, unit = 'px') {
            const value = (typeof e === 'object' ? e.target.value : e) + unit

            this.$store.commit('config/UPDATE_PAGE_ATTR', { key, value })
        }
    },
    components: {
        ColorInput: () => import('./colorInput')
    }
}
</script>

<style lang="less" scoped>
.page-attrs {
    position: relative;
}
</style>