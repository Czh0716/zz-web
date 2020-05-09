<template>
    <div>
        <common>
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
            <template #beforeShadow>
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
                            @input.native="(e)=>updateStyle(e,'strokeWidth')"
                            label="边框大小"
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
export default {
    mixins: [common],
    components: {
        common: () => import('./common'),
        ColorInput: () => import('./colorInput')
    }
}
</script>

<style lang="less" scoped>
.shape-attrs {
}
</style>