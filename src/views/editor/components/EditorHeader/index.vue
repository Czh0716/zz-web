<template>
    <div class="header px-6">
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
            <button v-ripple class="btn">
                <img src="@/assets/icons/ot1.svg" alt />
            </button>
            <button v-ripple class="btn">
                <img src="@/assets/icons/ot2.svg" alt />
            </button>
            <button v-ripple class="btn">
                <img src="@/assets/icons/ot3.svg" alt />
            </button>
            <button v-ripple class="btn">
                <img src="@/assets/icons/ot4.svg" alt />
            </button>
            <button v-ripple class="btn">
                <img src="@/assets/icons/ot5.svg" alt />
            </button>
        </div>
        <div class="r">
            <button v-ripple class="btn">
                <v-icon>mdi-cellphone</v-icon>
            </button>
            <button v-ripple class="btn">
                <v-icon>mdi-tablet-ipad</v-icon>
            </button>
            <button v-ripple class="btn">
                <v-icon>mdi-television</v-icon>
            </button>
            <v-btn class="ml-6" dark color="blue lighten-4">
                <v-icon left>mdi-content-save-outline</v-icon>保存
            </v-btn>
            <v-btn class="ml-4" dark color="indigo lighten-4">
                <v-icon left>mdi-send</v-icon>发布
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {},
    methods: {
        changeCompVisible(comp) {
            this.$store.dispatch('app/toggleWindowCompVisible', comp)
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    display: flex;
    height: 60px;
    justify-content: space-between;
    border-bottom: thin solid @grey-l-3;
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
    }
}
</style>