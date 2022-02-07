<template>
  <div id="app">
    <HeadNav @jump="handleToTop" @connect="handleToConnect"></HeadNav>
    <div class="mid_content">
      <Swiper></Swiper>
    </div>
    <div class="shop_charas">
      <div class="title">产品亮点功能</div>
      <div class="chara_contain">
        <div class="chara_item">
          <div class="icon_contain">
            <span class="el-icon-edit"></span>
          </div>
          <div class="text">文字检索</div>
        </div>
        <div class="chara_item">
          <div class="icon_contain">
            <span class="el-icon-upload"></span>
          </div>
          <div class="text">图像检索</div>
        </div>
        <div class="chara_item">
          <div class="icon_contain">
            <span class="el-icon-s-marketing"></span>
          </div>
          <div class="text">专利价值分析</div>
        </div>
      </div>
    </div>
    <div class="footer"  ref="connects">
      <div class="footer_container">
        <div class="title">
          <h4>北京智慧科技有限公司</h4>
          <p>北京合享智慧科技有限公司（BEIJING INCOPAT CO., LTD.）是一家全球知识产权数据服务提供商，专注于知识产权数据的深度整合和价值挖掘，通过旗下incoPat全球科技分析运营平台、IP资产管家、专利快车、专利大王、incoPat创新指数等多项产品为全球创新者提供值得信赖的知识产权数据服务。</p>
        </div>
        <div class="detail">
          <p><span class="el-icon-phone-outline"></span> 888-8888-888</p>
          <p><span class="el-icon-message"></span>zhuanli@guangershi.com</p>
          <p><span class="el-icon-location-outline"></span>广东省广州市海珠区新港中路351综合楼304</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadNav from '../components/HeadNav'
import Swiper from '../components/Swiper'
export default {
  data() {
    return {
      timeTop: null,
    }
  },
  methods: {
    //跳转到底部
    handleToConnect() {
        const timeTop = setInterval(() => {
          console.log('foot',window.scrollY)
          const top = window.scrollY + 50;  
          if (top >= 543) {
            window.scrollTo(0,543)
            clearInterval(timeTop); //清除定时器
          }
          window.scrollTo(0,top)
        }, 40);
    },
    //跳转到头部
    handleToTop() {
        const timeTop = setInterval(() => {
          console.log('top',window.scrollY)
          const top = window.scrollY - 50;  
          if (top <= 0) {
            window.scrollTo(0,0)
            clearInterval(timeTop); //清除定时器
          }
          window.scrollTo(0,top)
        }, 30);
    },
    
  },
  components: {
    HeadNav,
    Swiper
  }
}
</script>

<style scope lang="scss">
  .mid_content {
    position: relative;
    width: 100%;
    top: 66px;
    left: 0;
  }
  .shop_charas {
    position: absolute;
    top: 666px;
    width: 100%;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 30px;
      color: #333;
      letter-spacing: 3px;
      margin-bottom: 30px;
    }
    .chara_contain {
      width: 70%;
      display: flex;
      justify-content: space-between;
      .chara_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon_contain {
          border: 1px solid #d2d2d2;
          border-radius: 4px;
          padding: 30px 20px;
          span {
            color:#409eff;
            font-size: 40px;
          }
        }
        .text {
          font-size: 14px;
          color: #666;
          margin-top: 30px;
        }
      }
    }
  }
  .footer {
    position: absolute;
    top: 1000px;
    width: 100%;
    height: 300px;
    background: rgba(0,0,0,.65);
    display: flex;
    justify-content: center;
    align-items: center;
    .footer_container {
      width: 70%;
      .title {
        color: #fff;
        p {
          color: #ccc;
          font-size: 12px;
        }
      }
      .detail {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        color: #999;
        p {
          font-size: 12px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          span {
            font-size: 20px;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
