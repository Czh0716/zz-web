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
                            <v-text-field color="#baeaec" label="账号"></v-text-field>
                            <v-text-field color="#baeaec" label="密码"></v-text-field>
                            <v-btn class="confirm" dark color="#baeaec">确定</v-btn>
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
                                <v-text-field class="input" dark color="#fff" label="账号"></v-text-field>
                                <v-text-field class="input" dark color="#fff" label="密码"></v-text-field>
                                <v-text-field class="input" dark color="#fff" label="确认密码"></v-text-field>
                                <v-btn class="confirm" color="#fff">确定</v-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLogin: true
        }
    }
}
</script>

<style lang="less" scoped>
.login__page {
    background: url('../../assets/login_bg.png') no-repeat 16% center/650px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login__container {
    position: absolute;
    display: flex;
    align-items: center;
    right: 16%;
}

.form__container {
    position: relative;
    @width: 340px;
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