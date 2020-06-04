<template>
    <div class="page-attrs">
        <v-row>
            <v-col>
                <v-text-field
                    :value="activeElement.name"
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
                    type="number"
                    :value="removeUnit(style.width)"
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
                    type="number"
                    :value="removeUnit(style.height)"
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
                    :value="style.backgroundColor"
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
        <div class="test">
            <div class="box-1" @mouseup="log('1')"></div>
            <div class="box-2" @mouseup="prevent"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['activeElement']),
        style() {
            return this.activeElement.style
        }
    },
    methods: {
        log(v) {
            console.log(v)
        },
        prevent(e) {
            e.target.style.pointerEvents = 'none'
        },
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
    .box-1,
    .box-2 {
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: pink;
        left: 0;
    }

    .box-2 {
        background-color: skyblue;
        left: 20px;
    }
}
</style>