<template>
    <div class="my-side-bar">
        <div class="operation--group" v-for="(group,groupIndex) in category" :key="groupIndex">
            <div
                class="group-item"
                v-for="(item,itemIndex) in group"
                :key="itemIndex"
                :title="item.title"
                :class="{active: item.action === $store.getters.action}"
                @click="$store.dispatch('app/changeAction',item.action)"
            >
                <v-icon>{{item.icon}}</v-icon>
            </div>
        </div>
        <div class="operation--group">
            <div
                class="group-item"
                title="容器"
                :class="{active: 'create-container' === $store.getters.action}"
                @click="$store.dispatch('app/changeAction','create-container')"
            >
                <v-icon>mdi-package-variant</v-icon>
            </div>
            <div
                class="group-item"
                title="图片"
                :class="{active: 'create-image' === $store.getters.action}"
                @click="$store.dispatch('app/changeAction','create-image')"
            >
                <v-icon>mdi-image</v-icon>
            </div>
        </div>
        <div class="operation--group">
            <div @click="addPage" class="group-item" title="页面">
                <v-icon>mdi-file-alert-outline</v-icon>
            </div>
        </div>
        <div class="operation--group">
            <div class="group-item" title="抓手工具">
                <v-icon>mdi-hand-right</v-icon>
            </div>
            <div class="group-item" title="缩放工具">
                <v-icon>mdi-magnify</v-icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        addPage() {
            this.$emit('resizeOutlined')
            this.$store.dispatch('config/addPage')
        }
    },
    data() {
        return {
            category: [
                [{ action: 'selection', icon: 'mdi-cursor-default', title: '选择' }],
                [
                    { action: 'create-text', icon: 'mdi-format-text', title: '文本' },
                    {
                        action: 'create-input',
                        icon: 'mdi-pencil-box-outline',
                        title: '输入框'
                    }
                ],
                [
                    { action: 'create-rect', icon: 'mdi-rectangle-outline', title: '矩形' },
                    {
                        action: 'create-star',
                        icon: 'mdi-star',
                        title: '星形'
                    },
                    {
                        action: 'create-ellipse',
                        icon: 'mdi-checkbox-blank-circle-outline',
                        title: '椭圆'
                    },

                    {
                        action: 'create-heart',
                        icon: 'mdi-cards-heart',
                        title: '心形'
                    },
                    {
                        action: 'create-triangle',
                        icon: 'mdi-triangle',
                        title: '三角形'
                    },
                    {
                        action: 'create-polygon',
                        icon: 'mdi-shape-polygon-plus',
                        title: '多边形'
                    },
                    { action: 'create-line', icon: 'mdi-vector-line', title: '线' }
                ]
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.my-side-bar {
    position: relative;
    flex-shrink: 0;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    .operation--group {
        display: flex;
        flex-wrap: wrap;
        width: 70px;
        padding: 5px;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 80%;
            height: 1px;
            background-color: #e6e6e6;
            margin: auto;
        }
        .group-item {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: 0.3s;
            border-radius: 4px;
            &.active,
            &:hover {
                background-color: rgba(0, 0, 0, 0.15);
            }
        }
    }
}
</style>