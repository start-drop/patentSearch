<template>
    <div class="login_contain">
        <div class="login_group">
            <div class="login_title">登录</div>
            <el-input v-model="userName" placeholder="请输入账号"></el-input>
            <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
            <el-button type="primary" @click="handleLogin">登录</el-button>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
import {managerLogin} from '../../api/index'
export default {
    data() {
        return {
            userName: '',
            password: '',
        }
    },
    methods: {
        handleLogin() {                                 
            if(this.userName.trim() === '' || this.password.trim() === '') {
                this.$message('用户名或密码不为空')
                return false
            }
            const data = {
                userName: this.userName.trim(),
                password: this.password.trim()
            }
            managerLogin(data).then(res => {
                if(res.data.code === -1) {
                this.$message(res.data.msg)
                return
                } else {
                    this.$message(res.data.data.msg,'success')
                    sessionStorage.setItem('isManangement',res.data.data.isManagement)
                    this.$router.push('/')
                }
            }) 
        },
    },
}
</script>

<style lang="scss" scoped>
.mask{
    width: 100%;
    height: 560px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.6);
}
.login_contain {
    width: 100%;
    background: url('../../images/login_bg.jpg') no-repeat;
    background-size: 100% 560px;
    height: 560px;
    position: relative;
    
    .login_group {
        width: 360px;
        height: 360px;
        box-sizing: border-box;
        background: #fff;
        padding: 40px 50px;
        position: absolute;
        top: 100px;
        right: 100px;
        z-index: 1;
        .login_title {
            color: #409EFF;
            font-size: 26px;
            line-height: 26px;
            text-align: left;
            margin-bottom: 20px;
        }
        .el-input {
            margin-bottom: 20px;
        }
        .el-button {
            background: #409EFF;
            width: 260px;
            margin-top: 40px;
        }
    }
}
</style>