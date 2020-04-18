<template>
    <div class="attr-list">
        <slot name="beforeSize"></slot>
        <v-row>
            <v-col cols="6" v-for="item in size" :key="item">
                <v-text-field
                    :label="item"
                    :value="removeUnit(activeElementStyleCache[item])"
                    :suffix="item === 'rotate' ? 'deg':'px'"
                    @input.native="(e)=>updateStyle(e,item)"
                    type="number"
                    hide-details
                    dense
                    outlined
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-slider
                    :value="styles['opacity']"
                    @input="(val)=>updateStyle(val,'opacity',false)"
                    label="opacity"
                    hide-details
                    thumb-label
                    step="0.01"
                    max="1"
                    track-color="#e6e6e6"
                    color="indigo lighten-4"
                ></v-slider>
            </v-col>
        </v-row>
        <slot name="beforeShadow"></slot>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    :value="removeUnit(shadow[1])"
                    @input.native="e => updateShadow(e,1)"
                    label="阴影偏移X"
                    suffix="px"
                    type="number"
                    hide-details
                    dense
                    outlined
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                    :value="removeUnit(shadow[2])"
                    @input.native="e => updateShadow(e,2)"
                    label="阴影偏移Y"
                    suffix="px"
                    type="number"
                    hide-details
                    dense
                    outlined
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field
                    :value="removeUnit(shadow[3])"
                    @input.native="e => updateShadow(e,3)"
                    label="阴影模糊大小"
                    suffix="px"
                    type="number"
                    hide-details
                    dense
                    outlined
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <color-input label="阴影颜色" :value="shadow[0]" @input="(val)=>updateShadow(val,0)"></color-input>
            </v-col>
        </v-row>
        <slot></slot>
    </div>
</template>

<script>
import common from './mixins'
export default {
    mixins: [common],
    methods: {
        updateShadow(e, pos, unit = 'px') {
            const value = typeof e === 'object' ? `${e.target.value}${unit}` : e
            const shadow = [...this.shadow]
            shadow[pos] = value
            this.$store.commit('config/UPDATE_ELEMENT_ATTR', {
                key: 'filter',
                value: this.filter.replace(
                    /drop-shadow\((.*)\)/,
                    `drop-shadow(${shadow.join(' ')})`
                )
            })
        }
    },
    data() {
        return {
            size: ['left', 'top', 'width', 'height']
        }
    },
    components: {
        ColorInput: () => import('./colorInput')
    }
}
</script>

<style lang="less" scoped>
.attr-list {
}
</style>