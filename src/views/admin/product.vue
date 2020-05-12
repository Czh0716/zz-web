<template>
    <div class="product">
        <v-card class="record">
            <v-card-text class="pb-0">
                <div class="header">
                    <div class="icon elevation-3 mr-5">
                        <v-icon size="30" color="#fff">mdi-record-circle-outline</v-icon>
                    </div>
                    <span class="title">项目记录</span>
                    <div class="pagination-btn">
                        <v-btn icon>
                            <v-icon>mdi-arrow-left-circle-outline</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>mdi-arrow-right-circle-outline</v-icon>
                        </v-btn>
                    </div>
                </div>
            </v-card-text>
            <v-card-text class="content pt-0">
                <v-list dense class="list pt-0">
                    <v-list-item v-for="(item,index) in list" :key="index" @click=" ">
                        <v-list-item-avatar>
                            <v-icon v-text="item.icon" :color="item.status?'#64B5F6':'#FF80AB'"></v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.content"></v-list-item-title>
                            <v-list-item-subtitle>{{item.date | formatDate}}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon>
                                <v-icon color="#FFD54F">mdi-information</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
                <img src="../../assets/record_bg.png" alt />
            </v-card-text>
        </v-card>
        <v-card class="group">
            <v-card-text class="pb-0">
                <div class="header">
                    <div class="icon elevation-3 mr-5">
                        <v-icon size="30" color="#fff">mdi-group</v-icon>
                    </div>
                    <span class="title">项目组</span>
                    <div class="add-btn ml-auto">
                        <v-btn dark color="#B39DDB">新建项目</v-btn>
                    </div>
                </div>
            </v-card-text>
            <v-slide-group show-arrows class="pa-4">
                <v-slide-item v-for="n in 10" :key="n">
                    <v-card :color="`${calcColor(n)} lighten-4`" class="mx-4 my-1" width="250">
                        <v-card-title class="overline pb-0">OVERLINE</v-card-title>
                        <v-card-title>
                            <span class="text-truncate">这是我的第一百个项目</span>
                        </v-card-title>
                        <v-card-subtitle>
                            <span
                                class="introduce"
                            >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, soluta?</span>
                        </v-card-subtitle>
                        <v-card-actions>
                            <v-btn class="ml-auto" text>Edit NOW</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {
                    icon: 'mdi-file-document-edit-outline',
                    content: '新建项目”哈哈“',
                    date: new Date('2020-5-10'),
                    status: 0
                },
                {
                    icon: 'mdi-content-save-outline',
                    content: '编辑项目”这是我的第一个项目“',
                    date: new Date('2020-5-9 15:55'),
                    status: 1
                },
                {
                    icon: 'mdi-content-save-outline',
                    content: '编辑项目”这是我的第一个项目“',
                    date: new Date('2020-5-9 15:54'),
                    status: 1
                },
                {
                    icon: 'mdi-file-document-edit-outline',
                    content: '新建项目”这是我的第一百个项目“',
                    date: new Date('2020-5-9 15:44'),
                    status: 0
                },
                {
                    icon: 'mdi-file-document-edit-outline',
                    content: '新建项目”这是我的第一个项目“',
                    date: new Date('2020-5-9 15:34'),
                    status: 0
                }
            ],
            colors: [
                'red',
                'pink',
                'purple',
                'deep-purple',
                'indigo',
                'blue',
                'cyan',
                'teal',
                'yellow',
                'orange',
                'brown',
                'blue-grey'
            ]
        }
    },
    filters: {
        formatDate(date) {
            const d = new Date(date)
            return d.toLocaleString()
        }
    },
    methods: {
        calcColor(i) {
            const colors = this.colors
            const length = colors.length
            return colors[i <= length - 1 ? i : i % length]
        }
    }
}
</script>

<style lang="less" scoped>
.product {
    padding-top: 20px;
    .record,
    .group {
        .header {
            position: relative;
            display: flex;
            .icon {
                width: 80px;
                height: 80px;
                background-color: pink;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                transform: translateY(-30px);
            }
        }
    }
    .record {
        margin-bottom: 60px;
        .header {
            .pagination-btn {
                margin-left: auto;
            }
        }
        .content {
            display: flex;
            align-items: center;
            .list {
                flex: 1;
            }
            img {
                flex-shrink: 0;
                width: 350px;
                height: auto;
                margin: 0 50px;
            }
        }
    }

    .group {
        .header .icon {
            background-color: #80d8ff;
        }
        .introduce {
            display: -webkit-box;
            width: 100%;
            height: 48px;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}
</style>