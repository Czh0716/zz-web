<template>
    <aside class="left-side-bar">
        <div class="dir">
            <div class="tit py-2 px-5">
                <span>页面</span>
                <span class="create d-flex align-center blue--text">
                    <v-icon class="mr-1" color="blue" size="16">mdi-file-outline</v-icon>新建页面
                </span>
            </div>
            <div class="cont my-scrollbar">
                <div class="tree py-2 px-5"></div>
            </div>
        </div>
        <div class="opts">
            <div class="tabs d-flex">
                <div class="active blue--text nav-link py-3 px-8" @click="changeTab('components')">
                    <div class="mb-1">
                        <v-icon color="blue" size="20">mdi-puzzle-outline</v-icon>
                    </div>
                    <div>组件</div>
                </div>
                <div class="nav-link py-3 px-8" @click="changeTab('template')">
                    <div class="mb-1">
                        <v-icon size="20">mdi-image-filter-black-white</v-icon>
                    </div>
                    <div>模板</div>
                </div>
            </div>
            <div class="tab-content">
                <transition-group name="tabContent">
                    <div
                        v-show="curOptTab === 'components'"
                        class="tab-content-item"
                        key="components"
                    >
                        <div class="search-bar">
                            <input type="text" placeholder="搜索组件..." />
                        </div>
                    </div>
                    <div v-show="curOptTab === 'template'" class="tab-content-item" key="template">
                        <div class="search-bar">
                            <input type="text" placeholder="搜索模板..." />
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            curOptTab: 'components'
        }
    },
    methods: {
        changeTab(type) {
            this.curOptTab = type
        }
    }
}
</script>

<style lang="less" scoped>
.tabContent-enter {
    opacity: 0;
}
.tabContent-enter-active {
    transition: 0.3s;
}
.left-side-bar {
    width: @sidebar-width;
    height: @sidebar-height;
    border-right: 1px solid @grey-l-1;
    display: flex;
    flex-direction: column;
    .dir {
        font-size: 12px;
        background-color: #fff;
        border-bottom: 1px solid @grey-l-1;
        .tit {
            border-bottom: 1px solid @grey-l-1;
            display: flex;
            justify-content: space-between;
        }
        .create {
            cursor: pointer;
        }
        .cont {
            height: 200px;
            overflow-y: auto;
            .tree {
                height: 100vh;
            }
        }
    }

    .opts {
        flex: 1;
        display: flex;
        flex-direction: column;
        .tabs {
            font-size: 12px;
            border-bottom: 1px solid @grey-l-1;
        }
        .nav-link {
            cursor: pointer;
            text-align: center;
            margin-bottom: -1px;
            &.active {
                background-color: #fff;
                border: 1px solid @grey-l-1;
                border-color: #fff @grey-l-1;
            }
        }
        .tab-content {
            flex: 1;
            .tab-content-item {
                height: 100%;
            }
            .search-bar {
                background-color: #fff;
                input {
                    display: block;
                    width: 100%;
                    line-height: 30px;
                    padding: 0 20px;
                    font-size: 12px;
                    &:focus {
                        outline: none;
                    }
                }
                border-bottom: 1px solid @grey-l-1;
            }
        }
    }
}
</style>