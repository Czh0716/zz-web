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
                <div
                    :class="{active: curOptTab === 'components'}"
                    class="nav-link py-3 px-8"
                    @click="changeTab('components')"
                >
                    <div class="mb-1">
                        <v-icon size="20">mdi-puzzle-outline</v-icon>
                    </div>
                    <div>组件</div>
                </div>
                <div
                    :class="{active: curOptTab === 'template'}"
                    class="nav-link py-3 px-8"
                    @click="changeTab('template')"
                >
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
                        <div class="item-content my-scrollbar">
                            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates suscipit hic consequuntur, iste harum assumenda voluptatem officiis quasi dicta. Quisquam ut exercitationem quas architecto voluptatum repellendus deserunt quibusdam necessitatibus fuga.</div>
                        </div>
                    </div>
                    <div v-show="curOptTab === 'template'" class="tab-content-item" key="template">
                        <div class="search-bar">
                            <input type="text" placeholder="搜索模板..." />
                        </div>
                        <div class="item-content my-scrollbar">
                            <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque repellat officia, et veniam molestiae laboriosam id exercitationem impedit quia aperiam voluptas, modi dolor cum ex deleniti ut ad voluptatem laborum!</div>
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
    transition: 0.5s;
}
.left-side-bar {
    width: @sidebar-width;
    height: @sidebar-height;
    border-right: 1px solid @grey-l-3;
    display: flex;
    flex-direction: column;
    .dir {
        font-size: 12px;
        background-color: #fff;
        border-bottom: 1px solid @grey-l-3;
        .tit {
            border-bottom: 1px solid @grey-l-3;
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
            border-bottom: 1px solid @grey-l-3;
        }
        .nav-link {
            cursor: pointer;
            text-align: center;
            margin-bottom: -1px;
            border: 1px solid @grey-l-3;
            border-color: transparent transparent @grey-l-3;
            &.active {
                background-color: #fff;
                border-color: #fff @grey-l-3;
                color: #2196f3;
                .v-icon {
                    color: #2196f3;
                }
            }
        }
        .tab-content {
            flex: 1;
            .tab-content-item {
                height: 100%;
                position: relative;
            }
            .search-bar {
                background-color: #fff;
                position: absolute;
                width: 100%;
                top: 0;
                left: 0;
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
                border-bottom: 1px solid @grey-l-3;
            }
            .item-content {
                height: 100%;
                padding-top: 30px;
            }
        }
    }
}
</style>