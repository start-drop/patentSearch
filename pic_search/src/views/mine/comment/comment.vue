<template>
  <div class="nav">
    <Back :title="title"></Back>
    <div class="introduces">
      <div class="introduce">亲爱的用户：</div>
      <div class="introduce">如果你想对我们的产品提出意见或建议，请在这里填写，也可以加入专利检索QQ群进行反馈：888888888。</div>
      <div class="introduce">您的意见是我们进步的动力！</div>
    </div>
    <div class="inputs">
      <el-input type="number"
        oninput="if(value.length>11)value=value.slice(0,11)"
        placeholder="联系电话" 
        v-model="mobile"></el-input>
      <el-input type="textarea" v-model="comments"></el-input>
    </div>
    <div class="btn_group">
      <el-button size="small" type="primary" @click="handleSubmit">提交反馈</el-button>
      <el-button size="small" type="info" @click="goBack">很完美</el-button>
    </div>
  </div>
</template>

<script>
import Back from '../../../components/Back'
export default {
  data() {
    return {
      title: '用户反馈',
      comments: '',
      mobile: ''
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    handleSubmit() {
      if(this.mobile === '') {
        this.$alert('请填写联系电话')
        return
      }
      let regex = /^1[34578][0-9]{9}$/
      if(!regex.test(this.mobile)) {
        this.$alert('请输入正确的手机号码')
        return
      }
      if(this.comments.trim() === '') {
        this.$alert('请提出意见')
        return
      }
      console.log(this.comments,this.mobile)
      this.$alert('反馈已提交成功')
    }
  },
  components: {
    Back,
  }
}
</script>

<style lang="scss" scoped>
.nav {
  width: 70%;
}
.introduces {
  margin: 10px 0;
  .introduce {
    font-size: 17px;
    color: #666;
    text-indent: 2em;
  }
}
.inputs {
  margin-bottom: 20px;
  .el-input {
    width: 500px;
    margin-bottom: 20px;
  float: right;
  }
  /deep/ .el-textarea__inner {
    width: 500px;
    float: right;
  }
}
.btn_group {
  float: right;
}

</style>