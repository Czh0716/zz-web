
<script type="jsx">
import { mapGetters } from 'vuex'
import { VIcon, VBtn, VList, VListItem, VCard, VDivider } from 'vuetify/lib'
export default {
    computed: {
        ...mapGetters(['pages', 'activePage', 'activeElement', 'hasChildrenTypes']),
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
        toggleElementExpand(e, id) {
            this.$store.commit('config/TOGGLE_ELEMENT_EXPAND', id)
            e.stopPropagation()
        },
        deleteElement() {
            this.$store.dispatch('config/deleteElement')
            this.$emit('resizeOutlined')
        },
        genTreeNodes(elements, level = 0) {
            const list = []
            for (let i = elements.length - 1; i >= 0; i--) {
                const element = elements[i]
                const id = element.id
                const canExpand = this.hasChildrenTypes.includes(element.type)
                const node = (
                    <li
                        class={{
                            'node-item': true,
                            expand: element.expand,
                            active: this.activeElement && id === this.activeElement.id
                        }}
                    >
                        <div
                            key={id}
                            {...{
                                class: {
                                    'node-title': true,
                                    active: this.activeElement && id === this.activeElement.id
                                },
                                style: {
                                    paddingLeft: `${50 + 10 * level}px`
                                },
                                on: {
                                    mousedown: e =>
                                        this.onMouseDown(e, id, {
                                            forwardDisabled: i === elements.length - 1,
                                            backDisabled: i === 0
                                        }),
                                    mouseup: e => this.onMouseUp(e, id),
                                    mouseenter: e => {
                                        if (!this.isDown) return
                                        this.setNodePos(e)
                                    },
                                    mousemove: ({ currentTarget, clientY }) => {
                                        if (!this.isDown) return

                                        const { top, height } = currentTarget.dataset
                                        const localY = clientY - top
                                        const ratio = localY / height
                                        let pos = ''

                                        currentTarget.style.cursor = 'cell'

                                        if (ratio <= 0.25) {
                                            pos = 'top'
                                        } else if (ratio >= 0.75) {
                                            pos = 'bottom'
                                        } else {
                                            pos = 'middle'
                                            if (
                                                this.activeElement.id === id ||
                                                !this.hasChildrenTypes.includes(element.type)
                                            )
                                                currentTarget.style.cursor = 'no-drop'
                                        }
                                        currentTarget.dataset.insertPos = pos
                                    },
                                    mouseleave: ({ currentTarget }) => {
                                        if (!this.isDown) return

                                        this.resizeNodeMark(currentTarget)
                                    }
                                }
                            }}
                        >
                            <div class="divider divider-top"></div>
                            <div class="divider divider-bottom"></div>
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
                            {canExpand && (
                                <VIcon
                                    class="expand-icon"
                                    on={{
                                        mousedown: e => this.toggleElementExpand(e, element.id)
                                    }}
                                >
                                    mdi-menu-{element.expand ? 'down' : 'right'}
                                </VIcon>
                            )}
                            <span class="name">
                                <VIcon class="shape-icon">{this.iconMap[element.type]}</VIcon>
                                {element.name}
                            </span>
                        </div>
                        {element.children && this.genTreeNodes(element.children, level + 1)}
                    </li>
                )
                list.push(node)
            }
            return <ul class="node-list">{list}</ul>
        },
        onMouseDown(e, id, { forwardDisabled = false, backDisabled = false }) {
            this.isDown = true
            this.setActiveElement(e, id)
            this.setNodePos(e)
            const btn = e.button
            if (btn !== 2) return
            this.menuVisible = false
            this.forwardDisabled = forwardDisabled
            this.backDisabled = backDisabled
            setTimeout(() => {
                this.menuVisible = true
            }, 0)
        },
        onMouseUp(e, id) {
            const target = e.currentTarget
            const cursor = target.style.cursor
            const pos = target.dataset.insertPos
            this.isDown = false
            if (!cursor || cursor === 'no-drop') {
                this.resizeNodeMark(target)
                return
            }

            this.$store.commit('config/MOVE_ELEMENT', { target: id, pos: target.dataset.insertPos })
            this.resizeNodeMark(target)
        },
        setNodePos({ currentTarget }) {
            const { top, height } = currentTarget.getBoundingClientRect()
            currentTarget.dataset.top = top
            currentTarget.dataset.height = height
        },
        resizeNodeMark(el) {
            delete el.dataset.top
            delete el.dataset.height
            delete el.dataset.insertPos
            el.style.cursor = ''
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
                line: 'mdi-vector-line',
                container: 'mdi-package-variant'
            },
            pagesExpand: [],
            menuVisible: false,
            forwardDisabled: false,
            backDisabled: false,
            isDown: false
        }
    },
    components: {
        ElementMenu: () => import('../ElementMenu')
    },
    mounted() {
        this.$refs.tree.addEventListener('contextmenu', this.onContextMenu)
    },
    render() {
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
                    <div class="tree">{this.genTreeNodes(this.pages)}</div>
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
ul {
    list-style-type: none;
    padding: 0;
}
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
        width: 100%;
        margin-top: 10px;
        .node-item {
            > .node-list {
                display: none;
            }
            &.expand {
                > .node-list {
                    display: block;
                }
            }
        }
        .node-title {
            display: flex;
            align-items: center;
            height: 30px;
            position: relative;
            .visibility {
                position: absolute;
                left: 5px;
                cursor: pointer;

                &.hidden {
                    color: rgba(0, 0, 0, 0.3);
                }
            }
            .name {
                display: flex;
                align-items: center;
                user-select: none;
            }
            .expand-icon {
                position: absolute;
                transform: translateX(-20px);
                cursor: pointer;
            }
            .shape-icon {
                margin-right: 4px;
            }
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                background-color: rgba(0, 0, 0, 0);
                transition: 0.3s;
            }
            &.active {
                background-color: rgba(0, 0, 0, 0.08);
                + .node-list {
                    background-color: rgba(0, 0, 0, 0.03);
                }
            }
            .divider {
                position: absolute;
                display: flex;
                align-items: center;
                height: 2px;
                left: 0;
                top: 0;
                margin-top: -1px;
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
                top: 100%;
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
        }
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