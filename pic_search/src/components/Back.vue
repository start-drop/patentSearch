<template>
  <div class="nav">
    <div class="icon_contain" @click="goBack">
      <span class="el-icon-back"></span>
    </div>
    <div>{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  .icon_contain {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 20px;
    }
  }
  .icon_contain:hover {  
    background: #ddd;
  }
}
</style>