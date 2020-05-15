
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
            const list = []
            for (let i = elements.length - 1; i >= 0; i--) {
                const element = elements[i]

                const node = (
                    <li
                        class={{
                            'tree-node': true,
                            active: this.activeElement && element.id === this.activeElement.id
                        }}
                        on={{
                            mousedown: e =>
                                this.onMouseDown(e, element.id, {
                                    forwardDisabled: i === 0,
                                    backDisabled: i === elements.length - 1
                                })
                        }}
                    >
                        <div class="divider divider-top"></div>
                        <div class="divider divider-bottom"></div>
                        <div
                            key={element.id}
                            {...{
                                class: {
                                    element: true,
                                    active:
                                        this.activeElement && element.id === this.activeElement.id
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
                                        mousedown: e => this.toggleElementVisible(e, element.id)
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
                list.push(node)
            }
            return <ul class="child-list">{list}</ul>
        },
        onMouseDown(e, id, { forwardDisabled = false, backDisabled = false }) {
            this.setActiveElement(e, id)
            const btn = e.button
            if (btn !== 2) return
            this.menuVisible = false
            this.forwardDisabled = forwardDisabled
            this.backDisabled = backDisabled
            setTimeout(() => {
                this.menuVisible = true
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
            menuVisible: false,
            forwardDisabled: false,
            backDisabled: false
        }
    },
    components: {
        ElementMenu: () => import('../ElementMenu')
    },
    mounted() {
        this.$refs.tree.addEventListener('contextmenu', this.onContextMenu)
    },
    render() {
        const pageList = []
        const elements = this.pages
        for (let i = elements.length - 1; i >= 0; i--) {
            const element = elements[i]
            const node = (
                <div
                    key={element.id}
                    staticClass="tree-node page-node"
                    class={{ active: this.activeElement.id === element.id }}
                    on={{
                        mousedown: e =>
                            this.onMouseDown(e, element.id, {
                                forwardDisabled: i === 0,
                                backDisabled: i === elements.length - 1
                            }),
                        mousemove: e => {
                            const target = e.currentTarget
                            const { y } = target.getBoundingClientRect()
                            const height = 30
                            const clientY = e.clientY
                            const localY = clientY - y
                            const proportion = localY / height
                            // if (proportion < 0.25) {
                            //     target.dataset.insertPos = 'top'
                            // } else if (proportion > 0.75) {
                            //     target.dataset.insertPos = 'bottom'
                            // } else {
                            //     target.dataset.insertPos = 'middle'
                            // }
                        }
                    }}
                >
                    <div class="divider divider-top"></div>
                    <div class="divider divider-bottom"></div>
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
                                    hidden: !element.visible
                                },
                                on: {
                                    click: e => this.toggleElementVisible(e, element.id)
                                }
                            }}
                        >
                            mdi-eye-{element.visible ? '' : 'off-'}outline
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
                            {element.name}
                        </span>
                    </div>
                    {this.genEleChildren(element.children)}
                </div>
            )
            pageList.push(node)
        }

        return (
            <div class="element-tree" ref="tree">
                <element-menu
                    v-model={this.menuVisible}
                    forwardDisabled={this.forwardDisabled}
                    backDisabled={this.backDisabled}
                ></element-menu>
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
            .divider {
                position: absolute;
                display: flex;
                align-items: center;
                height: 2px;
                left: 0;
                right: 8px;
                z-index: 100;
                background-color: black;
                visibility: hidden;
                &::before,
                &::after {
                    content: '';
                    position: absolute;
                    border: solid 5px transparent;
                }
                &::before {
                    border-left-color: black;
                }
                &::after {
                    border-right-color: black;
                    right: 0;
                }
            }
            .divider-bottom {
                top: 30px;
            }
            &[data-insert-pos='top'] {
                .divider-top {
                    visibility: visible;
                }
            }
            &[data-insert-pos='bottom'] {
                .divider-bottom {
                    visibility: visible;
                }
            }

            &::before {
                content: '';
                position: absolute;
                left: 0;
                right: 8px;
                height: 30px;
                background-color: rgba(0, 0, 0, 0);
                transition: 0.3s;
            }

            &.active {
                &::before {
                    background-color: rgba(0, 0, 0, 0.08);
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