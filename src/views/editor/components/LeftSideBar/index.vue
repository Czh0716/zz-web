<template>
    <aside class="left-side-bar">
        <div class="dir" v-show="compsVisible['dir']">
            <div class="tit py-2 px-5">
                <span>页面</span>
                <span class="create d-flex align-center blue--text">
                    <v-icon class="mr-1" color="blue" size="16">mdi-file-outline</v-icon>新建页面
                </span>
            </div>
            <div class="cont">
                <div class="my-scrollbar">
                    <div class="tree py-2 px-5"></div>
                </div>
            </div>
        </div>
        <div class="opts">
            <my-tabs style="height:100%;">
                <my-tab-pane>
                    <template #label>
                        <div class="mb-1">
                            <v-icon size="20">mdi-puzzle-outline</v-icon>
                        </div>
                        <div>组件</div>
                    </template>
                    <div class="opt-content">
                        <div class="search-bar">
                            <input type="text" placeholder="搜索组件..." />
                        </div>
                        <div style="position:relative;height:100%">
                            <div class="my-scrollbar">
                                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates suscipit hic consequuntur, iste harum assumenda voluptatem officiis quasi dicta. Quisquam ut exercitationem quas architecto voluptatum repellendus deserunt quibusdam necessitatibus fuga.</div>
                            </div>
                        </div>
                    </div>
                </my-tab-pane>
                <my-tab-pane>
                    <template #label>
                        <div class="mb-1">
                            <v-icon size="20">mdi-image-filter-black-white</v-icon>
                        </div>
                        <div>模板</div>
                    </template>
                    <div class="opt-content">
                        <div class="search-bar">
                            <input type="text" placeholder="搜索模板..." />
                        </div>
                        <div style="position:relative;height: 100%;">
                            <div class="my-scrollbar">
                                <div>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque repellat officia, et veniam molestiae laboriosam id exercitationem impedit quia aperiam voluptas, modi dolor cum ex deleniti ut ad voluptatem laborum!
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, eius. Rerum, fuga a, itaque aliquid recusandae quasi officiis facere nesciunt vitae maxime debitis. Velit libero officia vitae numquam aperiam nam.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos minus labore officiis animi nisi, sapiente, quia quo aperiam quaerat facere laudantium illum maiores dolores impedit cumque ipsa velit et ipsum natus. Fuga dolores illum iure dolorum necessitatibus at nobis aperiam, suscipit nam odit quidem? Repellat, vel voluptate obcaecati quam ducimus quis ut reiciendis amet laudantium voluptatum numquam at fugiat? Beatae corporis laboriosam quas corrupti, perferendis illum ad, vitae blanditiis aut voluptas excepturi ullam nostrum qui assumenda soluta omnis amet numquam voluptatibus ratione expedita quae? Ab, soluta illum tenetur, accusantium suscipit saepe modi tempore dolorem magnam iure, error cum amet facilis!
                                </div>
                            </div>
                        </div>
                    </div>
                </my-tab-pane>
            </my-tabs>
        </div>
    </aside>
</template>

<script>
export default {
    components: {
        MyTabs: () => import('@/components/MyTabs'),
        MyTabPane: () => import('@/components/MyTabPane')
    },
    data() {
        return {
            curOptTab: 'components'
        }
    },
    methods: {
        changeTab(type) {
            this.curOptTab = type
        }
    },
    computed: {
        compsVisible() {
            return this.$store.state.app.windowCompsVisible
        }
    }
}
</script>

<style lang="less" scoped>
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
            position: relative;
            .tree {
                height: 100vh;
            }
        }
    }

    .opts {
        flex: 1;
        display: flex;
        flex-direction: column;
        transition: 0.3s;
        .opt-content {
            position: relative;
            padding-top: 30px;
            height: 100%;
        }
        .search-bar {
            background-color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
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
    }
}
</style>