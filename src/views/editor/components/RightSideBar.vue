<template>
    <div class="right-side-bar">
        <my-tabs style="height: 100%;">
            <my-tab-pane>
                <template #label>
                    <div>
                        <v-icon size="20" class="mb-1">mdi-gamepad</v-icon>
                    </div>
                    <div>内容</div>
                </template>
                hahahha
            </my-tab-pane>
            <my-tab-pane>
                <template #label>
                    <div>
                        <v-icon size="20" class="mb-1">mdi-movie-roll</v-icon>
                    </div>
                    <div>样式</div>
                </template>
                asdaasd
            </my-tab-pane>
        </my-tabs>
    </div>
</template>

<script>
export default {
    components: {
        MyTabs: () => import('@/components/MyTabs'),
        MyTabPane: () => import('@/components/MyTabPane')
    }
}
</script>

<style lang="less" scoped>
.right-side-bar {
    width: @sidebar-width;
    height: @sidebar-height;
    border-left: 1px solid @grey-l-3;
    display: flex;
    flex-direction: column;
}
</style>