<template>
  <div class="nav">
    <Back :title="title"></Back>
    <div class="records" ref="records">
      <div class="record_item" v-for='(item,key,index) in records' :key="index">
        <div class="item_title">{{key}}</div>
        <div class="items">
          <div class="row_item" v-for="(iitem,iindex) in records[key]" :key="iindex">
            <div class="right">
              <el-checkbox v-model="iitem.isChecked" @change="handleCheck(key,iitem)"></el-checkbox>
              <div class="time">{{iitem.localTime}}</div>
              <div class="text">{{iitem.value}}</div>
            </div>
            <div class="more"  @click.stop="showTip(key,iindex)">
              <span class="el-icon-more"></span>
              <div class="tip" v-if="iitem.showTip">
                <div class="tip_item" @click="handleRemoveSingle(key,iindex)">从历史记录中移除</div>
              </div>
            </div>
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
      title: '简单搜索记录',
      records: {},
      hasChecked: [],
      noChecked: {},
      lastStatus: {},
    }
  },
  methods: {
    handleCheck(key,item) {
      if(item.isChecked) { //勾选
        this.hasChecked.push({
          key,
          time: item.localTime,
        })
        // 去除已选中项
        const i = this.noChecked[key].findIndex(iitem => {
          return iitem.localTime === item.localTime
        })
        this.noChecked[key].splice(i,1)
        if(this.noChecked[key].length === 0) this.noChecked[key] = null
      } else {  //取消勾选
        const deleteIndex = this.hasChecked.findIndex(iitem => {
          return iitem.key === key && iitem.time === item.localTime
        })
        this.hasChecked.splice(deleteIndex,1)
        this.noChecked[key] = this.noChecked[key] || []
        this.noChecked[key].push(item)
      }
      const length = this.hasChecked.length
      this.$emit('delete',length)
    },
    resetAll() {
      for(let key in this.records) {
        this.records[key].map((item,index) => {
          this.records[key][index].isChecked = false
        })
      }
      // localStorage.setItem('search',JSON.stringify(this.records))
      this.hasChecked = []
      this.noChecked = JSON.parse(JSON.stringify(this.records))
      this.$emit('delete',0)
    },
    deleteHasChecked() {
      this.records = JSON.parse(JSON.stringify(this.noChecked))
      this.hasChecked = []
    },
    showTip(key,index) {
      if(this.lastStatus.key) 
        this.records[this.lastStatus.key][this.lastStatus.index].showTip = false
      if(typeof this.records[key][index].showTip === 'undefined')this.$set(this.records[key][index],'showTip',true)
      else this.records[key][index].showTip = true
      this.lastStatus = {
        key,
        index
      }
    },
    handleRemoveSingle(key,index) {
      if(this.records[key][index].isChecked) {
        const i = this.hasChecked.findIndex(item => {
          return item.key === key && item.time === this.records[key][index].localTime
        })
        this.hasChecked.splice(i,1)
      } else {
        const i = this.noChecked[key].findIndex(item => {
          return item.localTime === this.records[key][index].localTime
        })
        this.noChecked[key].splice(i,1)
        if(this.noChecked[key].length === 0) this.noChecked[key] = null
      }
      this.records[key].splice(index,1)
    },
  },
  mounted() {
    this.records = JSON.parse(localStorage.getItem('search'))
    this.noChecked = JSON.parse(JSON.stringify(this.records))
    document.addEventListener('click',(e) => {
      if('tip_item' !== e.target.className) {
        if(this.lastStatus.key) 
        this.records[this.lastStatus.key][this.lastStatus.index].showTip = false
      }
    })
  },
  //离开当前页面后执行
  destroyed: function () {
    this.resetAll()
    localStorage.setItem('search',JSON.stringify(this.records))
    document.onclick = null
    if(this.lastStatus.key)this.records[this.lastStatus.key][this.lastStatus.index].showTip = false
  },
  components: {
    Back,
  }
}
</script>

<style lang="scss" scoped>
.records {
  width: 70%;
  padding-top: 20px;
  .record_item {
    background: #fff;
    margin-bottom: 20px;
    box-shadow: 0 0 4px rgba(0,0,0,.4);
    .item_title {
      font-size: 18px;
      padding: 16px;
      border-bottom: 1px solid #ddd;
    }
    .items {
      .row_item {
        padding: 10px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right {
          display: flex;
          align-items: center;
          .time {
            margin: 0 40px 0 20px;
          }
        }
        .more{
          position: relative;
          span {
            margin-right: 10px;
            transform: rotate(90deg);
          }
          .tip {
            width: 140px;
            padding: 4px 0;
            border-radius: 5px;
            background: #fff;
            position: absolute;
            top: 0;
            left: -130px;
            box-shadow: 0 0 4px rgba(0,0,0,.4);
            .tip_item {
              padding: 10px;
            }
            .tip_item:hover {
              background: #ccc;
            }
          }
        }
      }
    }
  }
}
</style>