<template>
    <div class="header px-6">
        <v-dialog v-model="running" max-width="391" overlay-opacity="0.7">
            <transition name="runWindow">
                <Run-window v-if="running"></Run-window>
            </transition>
        </v-dialog>
        <div class="l">
            <div class="logo">
                <v-icon>mdi-kodi</v-icon>
                <img src="@/assets/icons/logo.png" alt />
            </div>
            <div class="layout-operation">
                <button v-ripple class="btn" @click="changeCompVisible('dir')">
                    <img src="@/assets/icons/file-manager-layout.svg" alt />
                </button>
                <button v-ripple class="btn" @click="changeCompVisible('left')">
                    <img src="@/assets/icons/left-column-layout.svg" alt />
                </button>
                <button v-ripple class="btn" @click="changeCompVisible('right')">
                    <img src="@/assets/icons/right-column-layout.svg" alt />
                </button>
            </div>
        </div>
        <div class="edit-operation">
            <button
                v-ripple
                class="btn"
                :class="{disabled:backDisabled}"
                :disabled="backDisabled"
                @click="backConfig"
            >
                <img src="@/assets/icons/ot1.svg" alt />
            </button>
            <button
                v-ripple
                class="btn"
                :class="{disabled:forwardDisabled}"
                :disabled="forwardDisabled"
                @click="forwardConfig"
            >
                <img src="@/assets/icons/ot2.svg" alt />
            </button>
            <button
                v-ripple
                @click="togglePageOverflow"
                title="显/隐 溢出"
                :class="{disabled: overflowHidden}"
                class="btn"
            >
                <img src="@/assets/icons/ot3.svg" alt />
            </button>
            <button v-ripple class="btn" @click="setFullScreen">
                <v-icon>mdi-fullscreen{{fullScreenStatus ? '-exit':''}}</v-icon>
            </button>
            <button v-ripple class="btn">
                <img src="@/assets/icons/ot5.svg" alt />
            </button>
        </div>
        <div class="r">
            <color-input title="工作区背景颜色" :value="primaryElBGC" @input="setPrimaryElBGC">
                <div v-ripple class="work-color">
                    <div class="color" :style="`backgroundColor: ${primaryElBGC}`"></div>
                </div>
            </color-input>
            <color-input title="工作区背景颜色" :value="workAreaBGC" @input="setWorkAreaBgc">
                <div v-ripple class="work-color">
                    <div class="color" :style="`backgroundColor: ${workAreaBGC}`"></div>
                </div>
            </color-input>
            <button v-ripple class="btn">
                <v-icon>mdi-cellphone</v-icon>
            </button>
            <button v-ripple class="btn">
                <v-icon>mdi-tablet-ipad</v-icon>
            </button>
            <button v-ripple class="btn">
                <v-icon>mdi-television</v-icon>
            </button>
            <v-btn
                title="运行"
                class="ml-6"
                color="red lighten-1"
                fab
                x-small
                dark
                @click="running = true"
            >
                <v-icon>mdi-play</v-icon>
            </v-btn>
            <v-btn class="ml-6" dark color="blue lighten-4" @click="save">
                <v-icon left>mdi-content-save-outline</v-icon>保存
            </v-btn>
            <v-snackbar v-model="saveSnack" :timeout="2000" right>
                保存成功！
                <v-btn @click="saveSnack = false" text>Close</v-btn>
            </v-snackbar>
            <v-btn
                class="ml-4"
                dark
                color="indigo lighten-4"
                link
                target="_blank"
                :to="`/running/${$route.params.id}`"
            >
                <v-icon left>mdi-send</v-icon>发布
            </v-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'configRecord',
            'currentRecordIndex',
            'overflowHidden',
            'workAreaBGC',
            'primaryElBGC'
        ]),
        backDisabled() {
            return this.configRecord.length === 0 || this.currentRecordIndex === 0
        },
        forwardDisabled() {
            return (
                this.configRecord.length === 0 ||
                this.currentRecordIndex === this.configRecord.length - 1
            )
        }
    },
    methods: {
        changeCompVisible(comp) {
            this.$store.dispatch('app/toggleWindowCompVisible', comp)
        },
        backConfig() {
            this.$emit('resizeOutlined')
            this.$store.commit('config/BACK_CONFIG_RECORD')
        },
        forwardConfig() {
            this.$emit('resizeOutlined')
            this.$store.commit('config/FORWARD_CONFIG_RECORD')
        },
        togglePageOverflow() {
            this.$store.commit('config/TOGGLE_PAGE_OVERFLOW')
        },
        setWorkAreaBgc(color) {
            this.$store.commit('config/SET_WORKAREA_BGC', color)
        },
        setPrimaryElBGC(color) {
            this.$store.commit('config/SET_PRIMARYEL_BGC', color)
        },
        setFullScreen() {
            if (this.fullScreenStatus) {
                const exitFullscreen =
                    document.exitFullscreen ||
                    document.webkitExitFullscreen ||
                    document.mozCancelFullScreen ||
                    document.msExitFullscreen

                exitFullscreen.call(document)
            } else {
                const element = document.documentElement
                const requestFullScreen =
                    element.requestFullScreen ||
                    element.webkitRequestFullScreen ||
                    element.mozRequestFullScreen ||
                    element.msRequestFullScreen

                requestFullScreen.call(element)
            }

            this.fullScreenStatus = !this.fullScreenStatus
        },
        async save() {
            await this.$store.dispatch('config/saveProject')
            this.saveSnack = true
        }
    },
    components: {
        colorInput: () => import('../RightSideBar/AttrBar/colorInput'),
        RunWindow: () => import('../RunWindow')
    },
    data() {
        return {
            fullScreenStatus: false,
            running: false,
            saveSnack: false
        }
    }
}
</script>

<style lang="less" scoped>
.runWindow-leave-active {
    transition: 1s;
}
.header {
    display: flex;
    height: @header-height;
    justify-content: space-between;
    border-bottom: thin solid @grey-l-3;
    position: relative;
    z-index: 100;
    background-color: #fff;
    .l,
    .edit-operation,
    .r {
        display: flex;
        align-items: center;
        .btn {
            padding: 8px;
            transition: 0.3s;
            border-radius: 4px;
            &:hover {
                // box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.15);
                background-color: rgba(0, 0, 0, 0.05);
            }
            &:focus {
                outline: none;
            }
            + .btn {
                margin-left: 10px;
            }
        }
        img {
            display: block;
            width: 22px;
        }
    }
    .l,
    .r {
        width: 400px;
    }
    .l {
        .logo {
            display: flex;
            align-items: center;
            margin-right: 10px;
            img {
                width: auto;
                height: 36px;
            }
        }
        .layout-operation {
            display: flex;
            align-items: center;
        }
    }
    .edit-operation {
        .disabled {
            opacity: 0.5;
        }
        button {
            &:nth-child(2) {
                margin-right: 10px;
            }
            img {
                width: 20px;
            }
        }
    }
    .r {
        justify-content: flex-end;
        .v-icon {
            font-size: 20px;
        }
        .work-color {
            width: 28px;
            height: 28px;
            padding: 5px;
            display: flex;
            border: 1px solid #ddd;
            margin-right: 10px;
            border-radius: 4px;

            cursor: pointer;
            .color {
                width: 100%;
                border-radius: 4px;
                box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
            }
        }
    }
}
</style>