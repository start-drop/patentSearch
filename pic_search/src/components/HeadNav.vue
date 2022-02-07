<template>
    <div class="head_nav">
        <ul class="head_nav_contain">
            <li class="nav_item" v-for="(item,index) in navs" :key="index" 
                @click="handleClick(index)"
                @mouseover="showMenu(index)"
                @mouseleave="hideMenu">{{item}}</li>
            <div class="ways" v-show="isShowMenu" @mouseenter="showMenu(1)" @mouseleave="hideMenu()">
                <ul>
                    <li @click="handleToPage(1)">简单检索</li>
                    <li @click="handleToPage(2)">高级检索</li>
                </ul>
            </div>
        </ul>
        <div class="login" @click="handleToLogin">登录</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navs: ['首页','检索方式','联系我们','我的'],
            activeNavNum: 0,
            isShowMenu: false,
        }
    },
    methods: {
        handleClick(index) {
            this.activeNavNum = index
            if(index === 0) this.$emit('jump')
            else if(index === 2) this.$emit('connect')
            else if(index === 1) this.isShowMenu = true
            else if(index === 3) this.$router.push('/mine')
        },
        // 显示二级菜单
        showMenu(index) {
            if(index === 1) {
                this.isShowMenu = true
            } else {
                if(this.isShowMenu) this.isShowMenu = false
            }
        },
        hideMenu() {
            this.isShowMenu = false
        },
        handleToPage(pageNum) {
            console.log(pageNum)
            if(pageNum === 1) {  //简单检索
                this.$router.push('/simpleSearch')
            } else if(pageNum === 2) { //高级检索
                this.$router.push('/highSearch')
            }
        },
        handleToLogin() {
            this.$router.push('/login')
        },
    },
}
</script>

<style lang="scss" scoped>
.head_nav {
  background: #fff;
  box-shadow: 0 0 14px 2px rgba(45,78,128,0.2);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 66px;
  z-index: 1;
  display: flex;
  align-items: center;
}
.login {
    background:  #409eff;
    padding: 10px 20px;
    color: #fff;
    margin-right: 60px;
    cursor: pointer;
}
.login:active {
    opacity: 0.7;
}
.head_nav_contain {
    width: 70%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    font-size: 16px;
    .nav_item {
        width: 100px;
        height: 66px;
        line-height: 66px;
        text-align: center;
        color:#999;
        cursor: pointer;
    }
    li:hover {
        background: #409eff;
        color: #fff;
        cursor: pointer;
    }
    .active {
        background: #409eff;
        color: #fff;
    }
}
.ways {
    background: #fff;
    border: 1px solid #ddd;
    box-sizing: border-box;
    box-shadow: 0px 0px 4px rgba(0,0,0,.15);
    width: 100px;
    height: 60px;
    transform: translateX(-300px) translateY(64px);
    color: #999;
    ul {
        padding: 0;
        margin: 0;
        li {
            height: 30px;
            line-height: 30px;
            text-align: center;
        }
    }
}
</style>