<template>
    <div class="login__page">
        <div class="login__container">
            <div :class="{isLogin}" class="form__container">
                <div class="title">
                    <v-icon color="#80FF80">mdi-kodi</v-icon>
                    <img src="../../assets/icons/logo.png" alt />
                </div>
                <div class="content">
                    <div class="bg"></div>
                    <div class="header"></div>
                    <div class="login__form">
                        <div class="tit">登录</div>
                        <div class="content">
                            <v-form ref="loginForm">
                                <v-text-field
                                    v-model="loginForm.userName"
                                    :rules="accountRules"
                                    color="#baeaec"
                                    label="账号"
                                ></v-text-field>
                                <v-text-field
                                    v-model="loginForm.password"
                                    :rules="passwordRules"
                                    color="#baeaec"
                                    label="密码"
                                    type="password"
                                ></v-text-field>
                                <v-btn
                                    :loading="loading"
                                    class="confirm"
                                    dark
                                    color="#baeaec"
                                    @click="login"
                                >确定</v-btn>
                            </v-form>
                        </div>
                    </div>
                    <div class="register__form" @click="isLogin = false">
                        <v-icon v-show="isLogin" class="icon" color="#fff">mdi-lead-pencil</v-icon>
                        <div class="wrap">
                            <div class="close-btn">
                                <v-icon
                                    @click.stop="isLogin = true"
                                    class="icon"
                                    color="#baeaec"
                                >mdi-close</v-icon>
                            </div>
                            <div class="tit">注册</div>
                            <div class="content">
                                <v-form ref="registerFrom">
                                    <v-text-field
                                        v-model="registerFrom.userName"
                                        :rules="accountRules"
                                        class="input"
                                        dark
                                        color="#fff"
                                        label="账号"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="registerFrom.password"
                                        :rules="passwordRules"
                                        class="input"
                                        dark
                                        color="#fff"
                                        label="密码"
                                        type="password"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="registerFrom.againPassword"
                                        :rules="passwordRules"
                                        class="input"
                                        dark
                                        color="#fff"
                                        label="确认密码"
                                        type="password"
                                    ></v-text-field>
                                    <v-btn
                                        :loading="loading"
                                        class="confirm"
                                        color="#fff"
                                        @click="register"
                                    >确定</v-btn>
                                    <v-snackbar v-model="registerSnack" :timeout="2000" right>注册成功！</v-snackbar>
                                </v-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { register, login } from '@/api/user'
export default {
    data() {
        return {
            isLogin: true,
            accountRules: [v => v.length > 6 || '账号长度不能少于6位'],
            passwordRules: [v => v.length > 6 || '密码长度不能少于6位'],
            loginForm: {
                userName: '',
                password: ''
            },
            registerFrom: {
                userName: '',
                password: '',
                againPassword: ''
            },
            loading: false,
            registerSnack: false
        }
    },
    methods: {
        async login() {
            const validRes = this.$refs.loginForm.validate()
            if (!validRes) return
            this.loading = true
            try {
                const { data } = await login(this.loginForm)
                this.$router.push(`/admin/${data._id}`)
            } finally {
                this.loading = false
            }
        },
        async register() {
            const validRes = this.$refs.registerFrom.validate()
            if (!validRes) return
            this.loading = true
            try {
                const res = await register(this.registerFrom)
                this.registerSnack = true
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
.login__page {
    background: url('../../assets/login_bg.png') no-repeat 18% center/600px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login__container {
    position: absolute;
    display: flex;
    align-items: center;
    right: 18%;
}

.form__container {
    position: relative;
    @width: 320px;
    width: @width;
    @color: #baeaec;
    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
        .v-icon {
            font-size: 40px;
        }
        img {
            width: 200px;
        }
    }
    .content {
        position: relative;
        .bg {
            position: absolute;
            left: -24px;
            right: -14px;
            top: 30px;
            bottom: 30px;
            background-color: #bedfe291;
            border-radius: 4px;
        }
    }
    .card {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        background-color: #fff;
        transition: 0.3s;
    }
    .padding-xy {
        @val: 60px;
        padding-left: @val;
        padding-right: @val;
    }
    .header {
        height: 10px;
        margin: 0 10px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        opacity: 0.6;
        .card();
    }
    .login__form,
    .register__form {
        padding-top: 40px;
        border-radius: 4px;
        overflow: hidden;
        .tit {
            position: relative;
            font-size: 26px;
            color: @color;
            margin-bottom: 20px;
            .padding-xy();
            &::before {
                content: '';
                position: absolute;
                height: 100%;
                width: 4px;
                background-color: currentColor;
                left: 0;
            }
        }
        .content {
            text-align: center;
            .padding-xy();
        }
        .confirm {
            width: 200px;
            margin: 30px 0;
        }
    }
    .login__form {
        position: relative;
        margin: 0 5px;
        opacity: 0.9;
        .card();
    }
    .register__form {
        .card();
        position: absolute;
        width: 100%;
        top: 20px;
        right: 0px;
        background-color: @color;
        transition: right 0.5s, border-radius 0.5s;
        .close-btn {
            @size: 120px;
            position: absolute;
            width: @size;
            height: @size;
            background-color: #fff;
            border-radius: 50%;
            top: -@size / 2;
            right: -@size / 2;
            .icon {
                position: absolute;
                left: @size / 5;
                bottom: @size / 5;
                cursor: pointer;
                &:hover {
                    transform: rotate(-180deg);
                }
            }
        }
        .tit {
            color: #fff;
        }
        .tit,
        .input,
        .confirm {
            transition: 0.3s 0.5s;
        }
        .confirm {
            color: #baeaec;
        }
    }

    &.isLogin {
        .header {
            margin: 0 5px;
            opacity: 1;
        }
        .login__form {
            margin: 0;
            opacity: 1;
        }
        .register__form {
            display: flex;
            width: 60px;
            height: 60px;
            right: -30px;
            border-radius: 50%;
            padding-top: 0;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .icon {
                position: absolute;
            }
            .tit {
                transform: translate(20px);
            }
            .input {
                &:nth-child(1) {
                    transform: translate(40px);
                }
                &:nth-child(2) {
                    transform: translate(60px);
                }
                &:nth-child(3) {
                    transform: translate(80px);
                }
            }
            .tit,
            .input,
            .confirm {
                opacity: 0;
            }
            .tit,
            .input {
                transition: none;
            }
            .wrap {
                visibility: hidden;
            }
        }
    }
}
</style>