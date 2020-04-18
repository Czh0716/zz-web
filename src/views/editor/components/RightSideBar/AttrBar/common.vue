<template>
    <div class="common-attr">
        <v-row>
            <v-col cols="6" v-for="item in size" :key="item">
                <v-text-field
                    :label="item"
                    :value="removeUnit(activeElementStyleCache[item])"
                    :suffix="item === 'rotate' ? 'deg':'px'"
                    @input.native="(e)=>updateAttr(e,item)"
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
                    @input="(val)=>updateAttr(val,'opacity',false)"
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    inject: ['triggerElementStretch'],
    computed: {
        ...mapGetters(['activeElement', 'activeElementStyleCache']),
        styles() {
            const element = this.activeElement
            return element ? (element.data ? element.data.style : {}) : {}
        },
        filter() {
            return this.styles.filter || 'drop-shadow(rgba(0,0,0,0) 0px 0px 0px)'
        },
        shadow() {
            const shadow = this.filter.match(/drop-shadow\((.*)\)/)[1].split(' ')
            return shadow
        }
    },
    methods: {
        removeUnit(value) {
            const str = String(value)
            return str ? +str.replace('px', '') : ''
        },
        updateAttr(e, key, hasUnit = true) {
            if (!this.activeElement) return

            const unit = 'px'
            const value = typeof e === 'object' ? e.target.value : e
            if (isNaN(value)) return
            this.$store.commit('config/UPDATE_ELEMENT_ATTR', {
                key,
                value: hasUnit ? value + unit : value
            })
            if (key !== 'opacity') this.triggerElementStretch()
        },
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
            size: ['left', 'top', 'width', 'height'],
            shadowX: 0,
            shadowY: 0,
            shadowSize: 0,
            shadowColor: ''
        }
    },
    components: {
        ColorInput: () => import('./colorInput')
    }
}
</script>

<style lang="less" scoped>
.common-attr {
}
</style>