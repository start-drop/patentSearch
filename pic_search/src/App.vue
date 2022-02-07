<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {getAccessToken} from './api/index'
export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  mounted() {
    //获取百度API accessToken参数
    if(!localStorage.getItem('AccessToken')) {
      getAccessToken().then(res => {
        const accessToken = res.data.access_token
        localStorage.setItem('AccessToken',accessToken)
      })
    }
    
  }
}
</script>

<style scope lang="scss">
  
</style>
