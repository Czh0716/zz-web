
<script type="jsx">
import { mapGetters } from 'vuex'
import { VIcon, VBtn, VList, VListItem, VCard, VDivider } from 'vuetify/lib'
export default {
    computed: {
        ...mapGetters(['pages', 'activePage', 'activeElement']),
        deleteDisabled() {
            return this.activeElement.type === 'page' && this.pages.length === 1
        }
    },
    methods: {
        setActiveElement(e, id) {
            this.$store.commit('config/SET_CURRENT_ELEMENT', id)
            this.$emit('initOutlined')
            e.stopPropagation()
        },
        toggleElementVisible(e, id) {
            this.$store.dispatch('config/toggleElementVisible', id)
            e.stopPropagation()
        },
        deleteElement() {
            this.$store.dispatch('config/deleteElement')
            this.$emit('resizeOutlined')
        },
        genEleChildren(elements) {
            return (
                <ul class="child-list">
                    {elements.map(element => {
                        return (
                            <li
                                class={{
                                    'tree-node': true,
                                    active:
                                        this.activeElement && element.id === this.activeElement.id
                                }}
                                on={{
                                    click: e => this.setActiveElement(e, element.id),
                                    mousedown: this.onMouseDown
                                }}
                            >
                                <div
                                    key={element.id}
                                    {...{
                                        class: {
                                            element: true,
                                            active:
                                                this.activeElement &&
                                                element.id === this.activeElement.id
                                        }
                                    }}
                                >
                                    <VIcon
                                        {...{
                                            class: {
                                                visibility: true,
                                                hidden: !element.visible
                                            },
                                            on: {
                                                click: e => this.toggleElementVisible(e, element.id)
                                            }
                                        }}
                                    >
                                        mdi-eye-{element.visible ? '' : 'off-'}outline
                                    </VIcon>
                                    <span class="name">
                                        <VIcon>{this.iconMap[element.type]}</VIcon>
                                        {element.name}
                                    </span>
                                </div>
                                {element.children && this.genEleChildren(element.children)}
                            </li>
                        )
                    })}
                </ul>
            )
        },
        onMouseDown(e) {
            e.stopPropagation()
            const btn = e.button
            if (btn !== 2) return
            this.optsVisible = false
            setTimeout(() => {
                this.optsVisible = true
            }, 0)
        },
        onContextMenu(e) {
            e.preventDefault()
        }
    },
    data() {
        return {
            iconMap: {
                page: 'mdi-file-alert-outline',
                rect: 'mdi-rectangle-outline',
                ellipse: 'mdi-checkbox-blank-circle-outline',
                line: 'mdi-vector-line'
            },
            pagesExpand: [],
            optsVisible: false
        }
    },
    components: {
        TrackWindow: () => import('@/components/TrackWindow')
    },
    mounted() {
        this.$refs.tree.addEventListener('contextmenu', this.onContextMenu)
    },
    render() {
        const pageList = this.pages.map((page, index) => {
            return (
                <div
                    key={page.id}
                    staticClass="tree-node page-node"
                    class={{ active: this.activeElement.id === page.id }}
                    on={{
                        click: e => this.setActiveElement(e, page.id),
                        mousedown: this.onMouseDown
                    }}
                >
                    <div
                        {...{
                            class: {
                                page: true,
                                expand: true
                            }
                        }}
                    >
                        <VIcon
                            {...{
                                class: {
                                    visibility: true,
                                    hidden: !page.visible
                                },
                                on: {
                                    click: e => this.toggleElementVisible(e, page.id)
                                }
                            }}
                        >
                            mdi-eye-{page.visible ? '' : 'off-'}outline
                        </VIcon>
                        <VIcon
                            class="expand-icon on"
                            on={{
                                click: e => {
                                    e.target.parentNode.classList.toggle('expand')
                                    e.stopPropagation()
                                }
                            }}
                        >
                            mdi-menu-down
                        </VIcon>
                        <VIcon
                            class="expand-icon off"
                            on={{
                                click: e => {
                                    e.target.parentNode.classList.toggle('expand')
                                    e.stopPropagation()
                                }
                            }}
                        >
                            mdi-menu-right
                        </VIcon>
                        <span class="name">
                            <VIcon>{this.iconMap['page']}</VIcon>
                            {page.name}
                        </span>
                    </div>
                    {this.genEleChildren(page.children)}
                </div>
            )
        })

        return (
            <div class="element-tree" ref="tree">
                <track-window v-model={this.optsVisible}>
                    <VCard class="subtitle-2 element-menu">
                        <VList dense width="200">
                            <VListItem link>
                                前移一层<span class="short-key">Ctrl+[</span>
                            </VListItem>
                            <VListItem link>
                                移至顶层<span class="short-key">Shift+Ctrl+[</span>
                            </VListItem>
                            <VListItem link>
                                后移一层<span class="short-key">Ctrl+]</span>
                            </VListItem>
                            <VListItem link>
                                移至底层<span class="short-key">Shift+Ctrl+]</span>
                            </VListItem>
                            <VDivider></VDivider>
                            <VListItem link>
                                锁定 <span class="short-key">Ctrl+L</span>
                            </VListItem>
                            <VListItem link>
                                显示/隐藏<span class="short-key">Ctrl+H</span>
                            </VListItem>
                            <VDivider></VDivider>
                            <VListItem link>
                                复制<span class="short-key">Ctrl+C</span>
                            </VListItem>
                            <VListItem link>
                                粘贴<span class="short-key">Ctrl+V</span>
                            </VListItem>
                            <VListItem link>
                                剪切<span class="short-key">Ctrl+X</span>
                            </VListItem>
                            <VListItem link>
                                删除<span class="short-key">Delete</span>
                            </VListItem>
                        </VList>
                    </VCard>
                </track-window>
                <div class="tab-bar">
                    <VIcon>mdi-tree</VIcon>对象树
                    <VIcon class="search">mdi-magnify</VIcon>
                </div>
                <div class="tab-content my-scrollbar">
                    <div class="tree">{pageList}</div>
                </div>
                <div class="bottom-bar">
                    <VBtn icon title="对象组">
                        <VIcon>mdi-folder-open-outline</VIcon>
                    </VBtn>
                    <VBtn icon title="固定">
                        <VIcon>mdi-lock-outline</VIcon>
                    </VBtn>
                    <VBtn icon title="事件">
                        <VIcon>mdi-information-outline</VIcon>
                    </VBtn>
                    <VBtn
                        icon
                        title="删除"
                        disabled={this.deleteDisabled}
                        on={{ click: this.deleteElement }}
                    >
                        <VIcon>mdi-delete-outline</VIcon>
                    </VBtn>
                </div>
            </div>
        )
    }
}
</script>

<style lang="less">
.element-menu {
    .short-key {
        margin-left: auto;
        color: #ddd;
        font-weight: 400;
    }
}
</style>

<style lang="less" scoped>
.element-tree {
    width: 260px;
    background: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    flex-shrink: 0;
    font-size: 14px;
    position: relative;

    .tab-bar {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        padding: 8px 0;
        margin-bottom: 10px;
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

    .tab-content {
        height: calc(100% - 90px);
        font-size: 12px;
        position: relative;
        padding-left: 8px;
        .v-icon {
            font-size: 20px;
        }
    }

    .tree {
        padding-left: 50px;
        width: 100%;

        .tree-node {
            &::before {
                content: '';
                position: absolute;
                left: 0;
                right: 8px;
                height: 30px;
                background-color: rgba(0, 0, 0, 0);
                transition: 0.3s;
                cursor: pointer;
            }

            &.active {
                &::before {
                    background-color: rgba(0, 0, 0, 0.1);
                }
                .tree-node::before {
                    background-color: rgba(0, 0, 0, 0.03);
                }
            }
        }
    }

    .page,
    .element {
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 30px;
        .visibility {
            position: absolute;
            left: 5px;
            &.hidden {
                color: rgba(0, 0, 0, 0.3);
            }
        }
        .expand-icon {
            position: absolute;
            transform: translateX(-20px);
        }

        .name {
            display: flex;
            align-items: center;
        }
    }

    .on {
        display: none;
    }
    .expand {
        + .child-list {
            display: block;
        }
        .on {
            display: block;
        }
        .off {
            display: none;
        }
    }

    .child-list {
        padding-left: 20px;
        display: none;
    }
    ul {
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
        background-color: #fff;
    }
}
</style>