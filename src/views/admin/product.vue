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
        <v-dialog v-model="addProjectDialogVisible" max-width="400">
            <v-card>
                <v-card-title>添加项目</v-card-title>
                <v-card-text>
                    <v-form ref="addForm">
                        <v-text-field
                            v-model="addProjectForm.name"
                            placeholder="请输入项目名称"
                            outlined
                            label="项目名称"
                        ></v-text-field>
                        <v-textarea
                            v-model="addProjectForm.description"
                            placeholder="请输入项目描述"
                            outlined
                            label="项目描述"
                        ></v-textarea>
                    </v-form>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="addProject" color="primary">添加</v-btn>
                        <v-btn @click="closeAddDialog">取消</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-card class="group">
            <v-card-text class="pb-0">
                <div class="header">
                    <div class="icon elevation-3 mr-5">
                        <v-icon size="30" color="#fff">mdi-group</v-icon>
                    </div>
                    <span class="title">项目组</span>
                    <div class="add-btn ml-auto">
                        <v-btn dark color="#B39DDB" @click="addProjectDialogVisible = true">新建项目</v-btn>
                    </div>
                </div>
            </v-card-text>
            <v-slide-group show-arrows class="pa-4" style="minHeight:200px">
                <v-slide-item v-for="(project,index) in projects" :key="project._id">
                    <v-card :color="`${calcColor(index)} lighten-4`" class="mx-4 my-1" width="250">
                        <v-card-title class="overline pb-0">OVERLINE</v-card-title>
                        <v-card-title>
                            <span class="text-truncate">{{project.name}}</span>
                        </v-card-title>
                        <v-card-subtitle>
                            <span class="introduce">{{project.description}}</span>
                        </v-card-subtitle>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text color="red" @click="deleteProject(project._id)">DELETE</v-btn>
                            <v-btn text @click="$router.push(`/editor/${project._id}`)">Edit NOW</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </v-card>
        <v-dialog v-model="deleteConfirmDialogVisible" max-width="300" persistent>
            <v-card>
                <v-card-title class="headline">
                    <span>是否确认删除该项目？</span>
                </v-card-title>
                <v-card-text>
                    <v-icon color="red" class="mr-2">mdi-emoticon-neutral-outline</v-icon>警告：如删除后则无法还原！
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="()=>confirmF()">确定</v-btn>
                    <v-btn text @click="deleteConfirmDialogVisible = false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { getProjects, addProject, deleteProject } from '@/api/project'
export default {
    mounted() {
        this.getProjects()
    },
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
            projects: [],
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
            ],
            addProjectDialogVisible: false,
            addProjectForm: {
                name: '',
                description: ''
            },
            deleteConfirmDialogVisible: false,
            confirmF: () => {}
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
        },
        closeAddDialog() {
            this.$refs.addForm.reset()
            this.addProjectDialogVisible = false
        },
        async getProjects() {
            const { data } = await getProjects(this.$route.params.id)
            this.projects = data
        },
        async addProject() {
            await addProject({ createUser: this.$route.params.id, ...this.addProjectForm })
            this.closeAddDialog()
            this.getProjects()
        },
        confirmDeleteProject() {
            this.deleteConfirmDialogVisible = true
            return new Promise(resolve => {
                this.confirmF = resolve
            })
        },
        async deleteProject(id) {
            console.log(id)
            await this.confirmDeleteProject()
            await deleteProject({ id })
            this.getProjects()
            this.deleteConfirmDialogVisible = false
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