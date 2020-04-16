<template>
    <div class="my-side-bar">
        <div
            class="operation-operation--group"
            v-for="(group,groupIndex) in category"
            :key="groupIndex"
        >
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
    </div>
</template>

<script>
export default {
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
    background-color: pink;
    .operation-operation--group {
        display: flex;
        flex-wrap: wrap;
        width: 70px;
        .group-item {
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: 0.3s;
            &.active,
            &:hover {
                background-color: rgba(0, 0, 0, 0.15);
            }
        }
    }
}
</style>