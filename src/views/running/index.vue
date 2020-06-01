<script lang="jsx">
import {getProject} from '@/api/project';
export default {
    mounted() {
        this.getProject()
    },
    computed: {
        activePage() {
            if(!this.activePageId) return this.pages[0]

            return this.pages.find((item) => {
                return item.id === this.activePageId 
            })
        }
    },
    methods: {
        async getProject() {
            const {data} = await getProject(this.$route.params.id)
            this.pages = JSON.parse(data.config).pages
        },
        genLayoutElements(elements) {
            const h = this.$createElement
            return elements.map(element => {
                const { style } = element.data
                style.visibility = element.visible ? 'visible' : 'hidden'
                const events = {
                    on: {}
                }
                Object.keys(element.events).forEach((key) => {
                    events.on[key] = () => this.activePageId = element.events[key] 
                })
                if (element.isShape) {
                    return h('svg', { ...element.data, ...events }, [
                        h(element.tag, { ...element.subData })
                    ])
                } else if (element.type === 'text') {
                    return h('div', { ...element.data, ...events }, element.subData)
                } else if (element.type === 'container') {
                    return h(
                        'div',
                        { ...element.data, ...events },
                        this.genLayoutElements(element.children)
                    )
                } else if (element.type === 'image') {
                    return h('img', { ...element.data, ...events })
                } else if (element.type === 'input') {
                    return h('input', { ...element.data, ...events })
                }else if (['star', 'heart', 'triangle', 'polygon'].includes(element.type)) {
                    return h('svg', { ...element.data, ...events }, [
                        h('path', { ...element.subData })
                    ])
                }
            })
        }
    },
    data() {
        return {
            activePageId: null,
            pages: []
        }
    },
    render() {
        const page = this.activePage 
        if(!page) return <div>Loading</div>
        
        return   <div class="running">
        <div class="run-window" style={page.style}>{this.genLayoutElements(page.children)}</div>
        </div>
    }
}
</script>

<style lang="less" scoped>
.running {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.run-window {
    position: relative;
    width: 391px;
    height: 683px;
    background-color: #fff;
    border: 8px solid black;
    border-radius: 16px;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none !important;
    }
}
</style>