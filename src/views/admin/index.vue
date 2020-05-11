<template>
    <div class="admin">
        <v-navigation-drawer color="#fff" absolute permanent>
            <v-list dense rounded class="py-0">
                <v-list-item>
                    <span class="admin-title">zZ WEB管理系统</span>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item two-line>
                    <v-list-item-avatar>
                        <img src="https://randomuser.me/api/portraits/men/81.jpg" />
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Boom</v-list-item-title>
                        <v-list-item-subtitle>个性签名</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider class="mb-4"></v-divider>

                <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block color="#424242" dark>注销</v-btn>
                </div>
            </template>
        </v-navigation-drawer>
        <div class="content">
            <div class="header">
                <v-btn fab small color="#fff" class="mr-4" style="color:grey;">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                <span>个人项目</span>
                <div class="right">
                    <v-text-field class="mr-4" label="Search"></v-text-field>
                    <v-btn fab small class="search-btn" color="#fff" style="color:grey;">
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                    <v-btn class="ml-3" link text to="/admin/product">
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-btn>
                    <v-btn class="ml-3" text>
                        <v-icon>mdi-bell</v-icon>
                    </v-btn>
                    <v-btn class="ml-3" text>
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                { icon: 'mdi-view-dashboard', title: '个人项目', link: '/admin/product' },
                { icon: 'mdi-account-circle-outline', title: '账号', link: '/admin/account' },
                { icon: 'mdi-kodi', title: '关于', link: '/admin/about' }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.admin {
    height: 100%;
    padding-left: 256px;
    .content {
        padding: 16px;
    }
    .admin-title {
        display: block;
        width: 100%;
        font-size: 20px;
        text-align: center;
        font-weight: 700;
    }
    .header {
        height: 40px;
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        .right {
            margin-left: auto;
            display: flex;
            align-items: center;
        }
        .search-btn {
            margin-right: 50px;
        }
    }
}
</style>