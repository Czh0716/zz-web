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
                [{ action: 'selection', icon: 'mdi-cursor-default' }],
                [{ action: 'create-text', icon: 'mdi-format-text' }],
                [
                    { action: 'create-rect', icon: 'mdi-rectangle-outline' },
                    {
                        action: 'create-ellipse',
                        icon: 'mdi-checkbox-blank-circle-outline'
                    }
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
        }
    }
}
</style>