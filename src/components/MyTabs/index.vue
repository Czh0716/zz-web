<script>
export default {
    props: {
        value: String
    },
    data() {
        return {
            activeTab: this.value || '0'
        }
    },
    computed: {
        tabs() {
            return this.$slots.default.filter(item =>
                item.componentOptions.tag.includes('my-tab-pane')
            )
        }
    },
    methods: {
        genTabBar() {
            const tabNavs = this.tabs.map((vnode, idx) => {
                const scopedSlots = vnode.data.scopedSlots
                return this._c(
                    'div',
                    {
                        staticClass: 'tabs-item',
                        class: {
                            active:
                                this.activeTab ===
                                (vnode.componentOptions.propsData.name || idx + '')
                        },
                        on: {
                            click: () => this.changeTab(idx)
                        }
                    },
                    scopedSlots && scopedSlots.label
                        ? vnode.data.scopedSlots.label()
                        : vnode.componentOptions.propsData.label || ''
                )
            })
            return this._c(
                'div',
                {
                    staticClass: 'tabs-bar'
                },
                tabNavs
            )
        },
        genTabContent() {
            const contentItems = this.tabs.map((vnode, idx) => {
                const isActive =
                    this.activeTab === (vnode.componentOptions.propsData.name || idx + '')
                return this._c(
                    'div',
                    {
                        staticClass: 'tab-content-item my-scrollbar',
                        class: {
                            active: isActive
                        },
                        directives: [
                            {
                                name: 'show',
                                value: isActive
                            }
                        ],
                        key: idx + ''
                    },
                    [vnode]
                )
            })

            return this._c(
                'transition-group',
                {
                    staticClass: 'tab-content',
                    props: {
                        tag: 'div'
                    }
                },
                contentItems
            )
        },
        changeTab(val) {
            this.activeTab = val + ''
        }
    },
    render(h) {
        return h(
            'div',
            {
                staticClass: 'my-tabs'
            },
            [this.genTabBar(), this.genTabContent()]
        )
    }
}
</script>

<style lang="less" scoped>
.v-enter {
    opacity: 0;
}

.v-enter-active {
    transition: 0.3s;
}

.my-tabs {
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    .tabs-bar {
        display: flex;
        border-bottom: 1px solid @grey-l-3;
        .tabs-item {
            padding: 10px 30px;
            cursor: pointer;
            font-size: 12px;
            border: 1px solid transparent;
            margin: 0 -1px -1px -1px;
            transition: 0.3s;
            text-align: center;
            &.active {
                background-color: #fff;
                border-color: transparent @grey-l-3 transparent @grey-l-3;
                color: #2196f3;
                .v-icon {
                    color: #2196f3;
                }
            }
        }
    }
    .tab-content,
    .tab-content-item {
        height: 100%;
        background-color: #fff;
    }
}
</style>