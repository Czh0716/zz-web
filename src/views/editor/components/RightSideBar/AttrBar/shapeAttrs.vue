<template>
    <div>
        <common :removeShadow="['text'].includes(activeType)">
            <template #beforeSize>
                <v-row>
                    <v-col>
                        <v-text-field
                            :value="activeElement.name"
                            @input.native="(e)=>updateAttr(e,'name')"
                            label="名称"
                            hide-details
                            dense
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
            </template>
            <template v-if="!['text'].includes(activeType)" #beforeShadow>
                <v-row>
                    <v-col>
                        <color-input
                            :value="style.fill"
                            @input="(val)=>updateStyle(val,'fill',false)"
                            label="填充颜色"
                        ></color-input>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <color-input
                            :value="style.stroke"
                            @input="(val)=>updateStyle(val,'stroke',false)"
                            label="边框颜色"
                        ></color-input>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            :value="style.strokeWidth || 0"
                            @input.native="(e)=>updateStyle(e,'strokeWidth',false)"
                            label="边框大小"
                            type="number"
                            hide-details
                            dense
                            outlined
                            suffix="px"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            :value="style.rx || 0"
                            @input.native="(e)=>{
                                updateStyle(e,'rx')
                                updateStyle(e,'ry')
                            }"
                            label="圆角"
                            type="number"
                            hide-details
                            dense
                            outlined
                            suffix="px"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </template>
            <template v-if="['text'].includes(activeType)">
                <v-row>
                    <v-col>
                        <color-input
                            :value="style.backgroundColor"
                            @input="(val)=>updateStyle(val,'backgroundColor',false)"
                            label="背景颜色"
                        ></color-input>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <color-input
                            :value="style.borderColor  || 'rgba(0,0,0,0)'"
                            @input="(val)=>updateStyle(val,'borderColor',false)"
                            label="边框颜色"
                        ></color-input>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            :value="style.borderWidth || 0"
                            @input.native="(e)=>updateStyle(e,'borderWidth')"
                            label="边框大小"
                            type="number"
                            hide-details
                            dense
                            outlined
                            suffix="px"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            :value="style.borderRadius || 0"
                            @input.native="(e)=> updateStyle(e,'borderRadius')"
                            label="圆角"
                            type="number"
                            hide-details
                            dense
                            outlined
                            suffix="px"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <color-input
                            :value="style.color"
                            @input="(val)=>updateStyle(val,'color',false)"
                            label="字体颜色"
                        ></color-input>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            :value="style['fontSize']"
                            @input.native="(e)=>updateStyle(e,'fontSize')"
                            label="字体大小"
                            type="number"
                            hide-details
                            dense
                            outlined
                            suffix="px"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </template>
        </common>
    </div>
</template>

<script>
import common from './mixins'
import { mapGetters } from 'vuex'
export default {
    mixins: [common],
    components: {
        common: () => import('./common'),
        ColorInput: () => import('./colorInput')
    },
    computed: {
        ...mapGetters(['activeElement']),
        activeType() {
            return this.activeElement.type
        }
    }
}
</script>

<style lang="less" scoped>
.shape-attrs {
}
</style>




