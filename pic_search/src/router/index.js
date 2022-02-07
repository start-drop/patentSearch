import Vue from 'vue'
import Router from 'vue-router'
import * as echarts from 'echarts'

import mySearch from '../views/mySearch'
import searchRes from '../components/searchRes'
import detail from '../views/detail'
import shopDetail from '../views/shopDetail'
import warnAnalysis from '../views/warnAnalysis'
import warnReport from '../views/warnReport'
import highSearch from '../views/highSearch/highSearch'
import simpleSearch from '../views/simpleSearch/simpleSearch'
import login from '../views/login/login'
import add from '../views/shop/add'
import edit from '../views/shop/edit'
import aadd from '../views/appearance/add'
import aedit from '../views/appearance/edit'
import mine from '../views/mine/mine'
import record from '../views/mine/record/record'
import comment from '../views/mine/comment/comment'
import advatar from '../views/mine/advatar/advatar'

Vue.use(Router)
//避免到当前位置的冗余导航。 简单来说就是重复触发了同一个路由
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this,location).catch(err => err)
}

Vue.prototype.$echarts = echarts

export default new Router({
  routes: [
    {
      name: 'mySearch',
      path: '/',
      component: mySearch,
    },
    {
      name: 'searchRes',
      path: '/searchRes',
      component: searchRes,
    },
    {
      name: 'detail',
      path: '/detail',
      component: detail,
      redirect: '/warnAnalysis',
      children: [
        {
          name: 'warnAnalysis',
          path: '/warnAnalysis',
          component: warnAnalysis,
        },
        {
          name: 'warnReport',
          path: '/warnReport',
          component: warnReport,
        }
      ]
    },
    {
      name: 'shopDetail',
      path: '/shopDetail',
      component: shopDetail,
    },
    {
      name: 'highSearch',
      path: '/highSearch',
      component: highSearch
    },
    {
      name: 'simpleSearch',
      path: '/simpleSearch',
      component: simpleSearch
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'add',
      path: '/shop/add',
      component: add,
    },
    {
      name: 'edit',
      path: '/shop/edit',
      component: edit,
    },
    {
      name: 'aadd',
      path: '/appearance/add',
      component: aadd,
    },
    {
      name: 'aedit',
      path: '/appearance/edit',
      component: aedit,
    },
    {
      name: 'mine',
      path: '/mine',
      component: mine,
      children: [
        {
          name: 'record',
          path: '/mine/record',
          component: record,
        },
        {
          name: 'comment',
          path: '/mine/comment',
          component: comment,
        },
        {
          name: 'advatar',
          path: '/mine/advatar',
          component: advatar,
        }
      ]
    }
  ]
})
