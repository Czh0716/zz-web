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
                    v-model="shadowX"
                    label="阴影偏移X"
                    value="1"
                    suffix="px"
                    type="number"
                    hide-details
                    dense
                    outlined
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                    v-model="shadowY"
                    label="阴影偏移Y"
                    value="1"
                    suffix="px"
                    type="number"
                    hide-details
                    dense
                    outlined
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field
                    v-model="shadowSize"
                    label="阴影模糊大小"
                    value="1"
                    suffix="px"
                    type="number"
                    hide-details
                    dense
                    outlined
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <div class="color-select" label="阴影颜色">
                    <div class="bar"></div>
                </div>
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
    }
}
</script>

<style lang="less" scoped>
.common-attr {
}
</style>