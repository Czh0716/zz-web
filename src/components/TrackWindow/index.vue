<template>
    <transition name="window">
        <div v-show="value" ref="window" class="track-window">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    methods: {
        getMousePos({ clientX, clientY }) {
            this.x = clientX
            this.y = clientY
        },
        setWindowPos() {
            const style = this.$refs.window.style
            style.left = `${this.x}px`
            style.top = `${this.y}px`
        },
        insertApp() {
            const app = document.getElementById('app') || document.body
            app.appendChild(this.$refs.window)
        },
        handleClickOutside() {
            window.addEventListener('mousedown', () => this.$emit('input', false))
            this.$refs.window.addEventListener('mousedown', e => e.stopPropagation())
        }
    },
    watch: {
        value(val) {
            if (val) this.setWindowPos()
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            x: 0,
            y: 0
        }
    },
    mounted() {
        window.addEventListener('mousemove', this.getMousePos)
        window.addEventListener('contextmenu', e => e.preventDefault())
        this.handleClickOutside()
        this.insertApp()
    }
}
</script>

<style lang="less" scoped>
.track-window {
    position: absolute;
    z-index: 100;
    transform-origin: 0 0;
}
.window-enter,
.window-leave-to {
    opacity: 0;
    transform: scale(0);
}
.window-enter-active,
.window-leave-active {
    transition: 0.3s;
}
</style>