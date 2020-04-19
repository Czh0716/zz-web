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
            <div @click="addPage" class="group-item" title="页面">
                <v-icon>mdi-file-alert-outline</v-icon>
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
                [{ action: 'create-text', icon: 'mdi-format-text', title: '文本' }],
                [
                    { action: 'create-rect', icon: 'mdi-rectangle-outline', title: '矩形' },
                    {
                        action: 'create-ellipse',
                        icon: 'mdi-checkbox-blank-circle-outline',
                        title: '椭圆'
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