<template>
    <div class="element-tree my-scrollbar">
        <div class="scroll-content">
            <div class="tab-bar">
                <v-icon>mdi-tree</v-icon>对象树
                <v-icon class="search">mdi-magnify</v-icon>
            </div>
            <div class="tab-content">
                <div class="tree">
                    <div class="page" v-for="(page,pageIndex) in pages" :key="page.id">
                        <div
                            @click="setActivePage(pageIndex)"
                            :class="{active: activePage.id === page.id}"
                            class="page-name"
                        >
                            <v-icon
                                :class="{hidden:!page.visible}"
                                @click.stop="$store.dispatch('config/togglePageVisble',pageIndex)"
                                class="visibility"
                            >mdi-eye-{{page.visible ? '':'off-'}}outline</v-icon>
                            <v-icon
                                @click.stop="$set(pagesExpand,pageIndex,!pagesExpand[pageIndex])"
                            >mdi-menu-{{pagesExpand[pageIndex]?'down':'right'}}</v-icon>
                            <span>
                                <v-icon>{{iconMap['page']}}</v-icon>
                                {{page.name}}
                            </span>
                        </div>
                        <ul class="element-list" v-show="pagesExpand[pageIndex]">
                            <li
                                v-for="(el,elementIndex) in page.elements"
                                :key="el.id"
                                :data-id="el.id"
                                :class="{active: activeElement && el.id === activeElement.id}"
                                class="element"
                                @click="setActiveElement"
                            >
                                <v-icon
                                    :class="{hidden:!el.visible}"
                                    @click.stop="$store.dispatch('config/toggleElementVisible',{pageIndex,elementIndex})"
                                    class="visibility"
                                >mdi-eye-{{el.visible ? '':'off-'}}outline</v-icon>
                                <span>
                                    <v-icon>{{iconMap[el.type]}}</v-icon>
                                    {{el.name}}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-bar">
            <v-btn icon title="对象组">
                <v-icon>mdi-folder-open-outline</v-icon>
            </v-btn>

            <v-btn icon title="固定">
                <v-icon>mdi-lock-outline</v-icon>
            </v-btn>
            <v-btn icon title="事件">
                <v-icon>mdi-information-outline</v-icon>
            </v-btn>
            <v-btn icon title="删除">
                <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['pages', 'activePage', 'activeElement'])
    },
    methods: {
        setActiveElement(e) {
            this.$store.commit('config/SET_CURRENT_ELEMENT', e)
            this.$emit('initOutlined')
        },
        setActivePage(index) {
            this.pagesExpand[index] = true
            this.$store.commit('config/SET_CURRENT_PAGE', index)
            this.$store.commit('config/SET_CURRENT_ELEMENT')
            this.$emit('resizeOutlined')
        }
    },
    created() {
        this.pagesExpand = this.pages.map(() => true)
    },
    data() {
        return {
            iconMap: {
                page: 'mdi-file-alert-outline',
                rect: 'mdi-rectangle-outline',
                ellipse: 'mdi-checkbox-blank-circle-outline',
                line: 'mdi-vector-line'
            },
            pagesExpand: []
        }
    }
}
</script>

<style lang="less" scoped>
.element-tree {
    width: 260px;
    background: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    flex-shrink: 0;
    font-size: 14px;
    position: relative;
    .scroll-content {
        padding: 0 16px;
    }
    .tab-bar {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        padding: 8px 0;
        .tab-item {
            cursor: pointer;
        }
        .v-icon {
            margin: 0px 10px 0px 6px;
        }
        .search {
            margin-left: auto;
        }
    }

    .page-name,
    .element {
        display: flex;
        align-items: center;
        padding-left: 10px;
        cursor: pointer;
        height: 30px;
        .visibility {
            font-size: 20px;
            &.hidden {
                color: rgba(0, 0, 0, 0.3);
            }
        }
        &.active {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }
    .element {
        .visibility {
            margin-right: 40px;
        }
    }
    .element-list {
        list-style-type: none;
        padding: 0;
    }

    .bottom-bar {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }
}
</style>