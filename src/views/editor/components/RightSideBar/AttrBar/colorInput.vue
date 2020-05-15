<template>
    <div class="color-input" @click.stop="togglePicker">
        <slot></slot>
        <div v-if="!$scopedSlots.default" class="color-select" :label="label">
            <div class="bar" :style="{backgroundColor: value}"></div>
        </div>
        <div class="color-picker" ref="main">
            <v-color-picker
                v-show="pickerVisible"
                :value="colorObj"
                @input="changeColor"
                width="230"
                hide-inputs
            ></v-color-picker>
        </div>
    </div>
</template>

<script>
function convertObj(color) {
    const match = color.match(/rgba\((.*)\)/)
    if (!match) return { r: 0, g: 0, b: 0, a: 0 }
    const content = match[1].split(',')
    return content.reduce((acc, value, index) => {
        acc['rgba'[index]] = value
        return acc
    }, {})
}

export default {
    props: {
        value: {
            type: String,
            default: 'rgba(0,0,0,0)'
        },
        label: {
            type: String,
            default: '颜色'
        }
    },
    mounted() {
        document.addEventListener('click', e => {
            this.pickerVisible = false
        })
    },
    computed: {
        colorStr() {
            return `rgba(${Object.values(this.colorObj).join(',')})`
        },
        colorObj() {
            const match = this.value.match(/rgba\((.*)\)/)
            if (!match) return { r: 0, g: 0, b: 0, a: 0 }
            const content = match[1].split(',')
            return content.reduce((acc, value, index) => {
                acc['rgba'[index]] = value
                return acc
            }, {})
        }
    },
    methods: {
        changeColor(val) {
            this.$emit('input', `rgba(${Object.values(val).join(',')})`)
        },
        togglePicker() {
            const event = new Event('click')
            document.dispatchEvent(event)
            this.pickerVisible = !this.pickerVisible
        }
    },
    data() {
        return {
            pickerVisible: false
        }
    }
}
</script>

<style lang="less" scoped>
.color-input {
    position: relative;
}
.color-picker {
    position: absolute;
    z-index: 1000;
}
.color-select {
    font-size: 13px;
    text-align: center;
    position: relative;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.42);
    border-radius: 4px;
    line-height: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    &::before {
        content: attr(label);
        position: absolute;
        left: 10px;
        top: -20px;
        background-color: #fff;
        color: rgba(0, 0, 0, 0.7);
    }

    .bar {
        position: relative;
        width: 100%;
        margin: 0 10px;
        height: 6px;
        border-radius: 2px;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
    }
}
</style>