<template>
  <div>
    <Back :title="title"></Back>
    <div class="info_contain">
        <el-input v-model="userName"></el-input>
        <div class="advatar_list">
            <div class="img_contain" v-for="(img,index) in imgs" :key="index" 
                @click="handleSelectAdvatar(index)">
                <div class="mid_contain" :class="{active: index === defaultIndex}">
                    <img :src="img" alt="">
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Back from '../../../components/Back'

export default {
  data() {
    return {
      title: '修改头像',
      imgs: [],
      defaultIndex: -1,
      userName: '',
    }
  },
  methods: {
      handleSelectAdvatar(index) {
          this.defaultIndex = index
          this.setInfo()
          this.$emit('update')
      },
      setInfo() {
        let path = this.imgs[this.defaultIndex]
        if(this.defaultIndex === -1) {
            let obj = JSON.parse(localStorage.getItem('userInfo')) || {}
            path = obj.headPath || ''
        }
        let userInfo = {
            username: this.userName,
            headPath: path
        }
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
      },
  },
  mounted() {
    //生成16张头像
    let num = 16
    for(let i = 0;i < num; i++) {
        this.imgs.push(require(`../../../images/advatars/${i+1}.jpg`))
    }
      
    let info = JSON.parse(localStorage.getItem('userInfo')) || {}
    this.userName = info.username || '用户'
    
  },
  components: {
    Back,
  },
  destroyed() {
      this.setInfo()
      this.$emit('update')
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-input__inner {
      background: #eee;
  }
.info_contain {
  background: #fff;
  width: 50%;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 0 6px rgba(0,0,0,.4);
  .el-input {
      width: 170px;
  }
  
}
.advatar_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  .img_contain {
    width: 25%;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .mid_contain {
        width: 100%;
        padding: 3px;
        border-radius: 50%;
        border: 2px solid transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid #eee;
        }
    }
    .active {
        border: 2px solid #409eff;
    }
  }
}
</style>