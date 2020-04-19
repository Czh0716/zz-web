<template>
    <div class="element-tree">
        <div class="tab-bar">
            <v-icon>mdi-tree</v-icon>对象树
            <v-icon class="search">mdi-magnify</v-icon>
        </div>
        <div class="tab-content">
            <div class="tree">
                <div class="page" v-for="(page,pageIndex) in pages" :key="page.id">
                    <div
                        :class="{active: activePage.id === page.id}"
                        class="page-name"
                        @click="$set(pagesExpand,pageIndex,!pagesExpand[pageIndex])"
                    >
                        <v-icon
                            :class="{hidden:!page.visible}"
                            @click.stop="$store.commit('config/TOGGLE_PAGE_VISIBLE',pageIndex)"
                            class="visibility"
                        >mdi-eye-{{page.visible ? '':'off-'}}outline</v-icon>
                        <v-icon>mdi-menu-{{pagesExpand[pageIndex]?'down':'right'}}</v-icon>
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
                                @click.stop="$store.commit('config/TOGGLE_ELEMENT_VISIBLE',{pageIndex,elementIndex})"
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
    width: 220px;
    border-left: 1px solid #e6e6e6;
    flex-shrink: 0;
    font-size: 14px;
    background: #fff;
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
}
</style>