<template>
  <div class="index">
    <div class="title" v-if="!changeBar">
      <div class="right">
        <span class="el-icon-back" @click="$router.back()"></span>
        <div>我的</div>
      </div>
      <div class="left">
        <div class="username">{{userInfo.username || defaultName}}</div>
        <div class="img_contain">
          <img :src="userInfo.headPath || defaultAdvatar" alt="">
        </div>
      </div>
    </div>
    <div class="delete" v-else>
      <div class="blank"></div>
      <div class="tip">
        <span class="el-icon-close" @click="hideDelete"></span>
        <div>已选择{{deleteCount}}项</div>
      </div>
      <div class="btn_group">
        <el-button @click="hideDelete">取消</el-button>
        <el-button @click="deleteChecked">删除</el-button>
      </div>
    </div>
    <div class="content">
      <div class="right_menu">
        <div class="menu_item" 
          v-for="(item,index) in menuData" :key="index"
          :class="{'active': isActive === index + 1}"
          @click="handleActive(index)">
          <span :class="item.icon"></span>
          <div class="text">{{item.label}}</div>
        </div>
      </div>
      <div class="left_content" v-if="$route.params.isShow">
        <router-view 
          @delete="showDeleteContain" 
          @update="updateInfo" 
          ref="record"></router-view>
      </div>
      <div class="left_content" v-else>
        <div class="left_item" v-for="(item,index) in menuData" :key="index">
          <div class="left_title">{{item.label}}</div>
          <div class="contents">
            <div class="item_contain" v-for="(iitem,i) in item.children" :key="i">
              <div class="row_left">
                <span :class="iitem.iconClass"></span>
                <div>{{iitem.label}}</div>
              </div>
              <router-link class="row_right" :to="iitem.path">
                <span class="el-icon-caret-right"></span>
              </router-link>
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
      isShow: false,
      changeBar: false,
      deleteCount: 0,
      menuData: [
        {
          icon: 'el-icon-delete-solid',
          label: '搜索记录',
          children: [
            {
              iconClass: 'el-icon-delete-solid',
              label: '简单搜索记录',
              path: '/mine/record'
            }
          ]
        },
        {
          icon: 'el-icon-s-custom',
          label: '用户悉知',
          children: [
            {
              iconClass: 'el-icon-s-comment',
              label: '意见反馈',
              path: '/mine/comment'
            },
            {
              iconClass: 'el-icon-s-tools',
              label: '头像设置',
              path: '/mine/advatar'
            }
          ]
        },
      ],
      isActive: 0,
      userInfo: {},
      defaultAdvatar: require('../../images/icon_head.jpg'),
      defaultName: '用户',
    }
  },
  methods: {
    showChildren() {
      this.isShow = true
    },
    showDeleteContain(e) {
      this.changeBar = e === 0 ? false : true
      this.deleteCount = e
    },
    hideDelete() {
      this.changeBar = false
      this.deleteCount = 0
      this.$refs.record.resetAll()
    },
    deleteChecked() {
      this.deleteCount = 0
      this.changeBar = false
      this.$refs.record.deleteHasChecked()
    },
    handleActive(index) {
      this.isActive = index + 1
    },
    updateInfo() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
    },
  }, 
  watch:{
    $route: (to, from) => {
      if(to.path === "/mine/record" || to.path === '/mine/comment' || to.path === '/mine/advatar') {
        to.params.isShow = true
      }
    },
  },
  mounted() {
    this.updateInfo()
    console.log(11,this.userInfo.headPath)
  },
}
</script>

<style lang="scss" scoped>
.index{ 
  background: #eee;
  height: 100%;
  min-height: 100vh;
  font-size: 14px;
  color: #666;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #3367d6;
  height: 60px;
  font-size: 16px;
  color: #fff;
  box-shadow: 0px 0 10px rgba(0,0,0,.7);
  .right {
    display: flex;
    align-items: center;
    margin-left: 20px;
    span {
      margin: 0 20px 0 10px;
    }
  }
  .left { 
    display: flex;
    align-items: center;
    margin-right: 40px;
    font-size: 14px;
    .img_contain {
      margin-left: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}

.delete {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #fff;
  .blank {
    flex: 2;
  }
  .tip {
    flex: 4;
    display: flex;
    align-items: center;
    font-size: 17px;
    letter-spacing: 0.1rem;
    span {
      margin-right: 20px;
    }
  }
  .btn_group {
    flex: 2;
  }
}
.content {
  margin-top: 20px;
  display: flex;
  .right_menu {
    flex: 2;
    .menu_item {
      display: flex;
      align-items: center;
      padding: 10px 40px;
      font-size: 14px;
      color: #666;
      font-weight: 550;
      span {
        margin-right: 20px;
        font-size: 15px;
      }
    }
    .menu_item.active {
      color: #409eff;
    }
  }
  
  .left_content {
    flex: 6;
    padding-top: 20px;
    .left_item {
      width: 60%;
      margin-bottom: 30px;
      .left_title {
        margin-bottom: 16px;

      }
      .contents {
        background: #fff;
        box-shadow: 0 0 4px rgba(0,0,0,.4); 
        .item_contain {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          border-bottom: 1px solid #eee;
          .row_left {
            display: flex;
            align-items: center;
            span {
              margin-right: 20px;
              font-size: 16px;
            }
          }
          .row_right {
            width: 34px;
            height: 34px;
            text-align: center;
            line-height: 34px;
            border-radius: 50%;
            
          }
          .row_right:hover {
            background: #ccc;
          }
        }
      }
    }
  }
}
</style>