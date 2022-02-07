<template>
    <div class="contain">
        <HeadNav @jump="handleToJump" @connect="handleToJump"></HeadNav>
        <div ref="searchBar" class="search_bar">
            <el-input 
                ref="input"
                v-model="searchInput"
                @input="handleHideInputInfo"
                @keyup.enter.native="handleSearchInput"
                :placeholder="isInPlaceholder ? '请输入检索内容':'在此处粘贴图片地址'">
                <i slot="suffix" class='el-input__icon el-icon-camera'
                v-if="isShowCamera"
                @click.stop="handleShowUpload"></i> 
                <p slot="suffix" v-if="isShowUpload && isShowInputInfo">请输入正确的图片地址</p>
            </el-input>
            <el-button type="primary" 
              @click.stop="handleSearchInput">查询</el-button>
        </div>
        <div ref="uploadContain" class="uploadContain" :style="{opacity: isShowUpload?1:0}">
            <div class="unloading" v-if="!isLoading">
                <div ref="drag_contain" id="drag_contain" :class="dropActive ? 'drop_active' : ''">
                    <div v-if="isType">拖拽图片到这里</div>
                    <div v-else class="warn_info"><i class="el-icon-warning"></i>抱歉，您上传的文件不是图片格式，请<p @click.stop="feedbackUpload">重新上传</p>仅支持10M以下jpg,jpeg,png,bmp,gif格式图片</div>
                </div>
                <div class="btn_con">
                    <el-button type="primary" 
                        class="choose_btn" 
                        size="small">选择文件<input type="file" @change="handleClickUpload"></el-button>
                </div>
            </div>
            <div v-else class="loading">正在上传图片...</div>
            <i class="el-icon-close" @click="handleHideUpload"></i>
        </div>
        <canvas id="J_dotLine"></canvas>
    </div>
</template>

<script>
import {accordToPicGetKey} from '../../api/index'
import HeadNav from '../../components/HeadNav'
import Dotline from '../../assets/dotline'
export default {
    name: 'SimpleSearch',
    data() {
        return {
        searchInput: '',
        isShowCamera: true,
        isShowUpload: false,
        dropActive: false,
        isType: true,
        isInPlaceholder: true,
        isShowInputInfo: false,
        result: [],
        picPath: '',
        isLoading: false,
        option: {
          dom: 'J_dotLine',//画布id
          cw: window.innerWidth,//画布宽
          ch: window.innerHeight,//画布高
          ds: 100,//点的个数
          r: 3,//圆点半径
          cl: '#409eff',//粒子线颜色
          dis: 120//触发连线的距离
        },
      }
    },
    methods: {
        handleShowUpload() {
            this.isShowCamera = false
            this.isShowUpload = true
            this.isInPlaceholder = false
            this.$refs.input.focus()
        },
        handleHideUpload() {
            this.isShowCamera = true
            this.isShowUpload = false
            this.isInPlaceholder = true
            this.isShowInputInfo = false
            this.isLoading = false
        },
        dropEvent(e) {
            this.dropActive = false
            e.stopPropagation()
            e.preventDefault()
            this.uploadFile(e.dataTransfer.files)
        },
        handleClickUpload(e) {
            this.uploadFile(e.srcElement.files)
        },
        uploadFile(files) {
            this.isLoading = true
            const self = this
            console.log(files[0],'file')
            if(files && files.length) {
                //存本地或上传到服务器
                if(!files[0].name.match('\.(jpg|jpeg|png|bmp)$')) {
                    this.isType = false
                    return
                }
                //转码base64
                let reader = new FileReader();
                reader.readAsDataURL(files[0])
                let imgFile
                reader.onload = e => {
                    imgFile = e.target.result
                    let arr = imgFile.split(',')
                    this.$store.commit('setPicPath', 'data:image.png;base64,' + arr[1])
                    accordToPicGetKey(arr[1]).then(res => {
                        this.handleHideUpload()
                        this.$store.commit('setKeyObj',res.data.result)
                        var arrs = []
                        res.data.result.forEach((item,index) => {
                          arrs[index] = item.keyword
                        })
                        console.log('keyArr',this.$store.state.keyWords)
                        this.$store.commit('setKeyWords',arrs)
                        this.$router.push('/searchRes')
                    })
                }
            }
        },
        feedbackUpload() {
            this.isType = true
            this.$refs.input.focus()
        },
        handleSearchInput() {
            if(!this.searchInput && this.isShowUpload) {
              this.isShowInputInfo = true
              return 
            } else if (!this.searchInput){
              this.$message('请输入检索内容')
              return
            }
            let search = JSON.parse(localStorage.getItem('search')) || {}
            const date = new Date().toLocaleDateString()
            if(!search[date]) {
              search[date] = [{
                value: this.searchInput,
                time: new Date().getTime(),
                localTime: new Date().toLocaleTimeString(),
                isChecked: false,
              }]
            } else {
              search[date].push({
                value: this.searchInput,
                time: new Date().getTime(),
                localTime: new Date().toLocaleTimeString(),
                isChecked: false,
              })
            }
            localStorage.setItem('search',JSON.stringify(search))
            this.$store.commit('setKeyWords',this.searchInput.split(' '))
            this.$router.push({
              path: '/searchRes',
              query: {
                'inputValue': this.searchInput,
                'isClear': true,
              }
            })
        },
        handleHideInputInfo() {
            console.log(100)
            if(this.isShowInputInfo) {
                this.isShowInputInfo = false
            }
        },
        onDrag(e) {
            console.log('leave')
            e.stopPropagation()
            e.preventDefault()
            this.dropActive = true
        },
        onDragLeave(e) {
            console.log('leave')
            e.stopPropagation()
            e.preventDefault()
            this.dropActive = false
        },
        // 跳转到首页
        handleToJump() {
            this.$router.push('/')
        },
    },
    mounted() {
      const dotline = new Dotline(this.option).start();
      document.onclick = (e) => {
        let box = this.$refs.uploadContain
        let search = this.$refs.searchBar
        console.log(search,box)
      
        if(!box.contains(e.target) && !search.contains(e.target)) {
            console.log(9)
            this.handleHideUpload()
        }
      }
      let dropArea = document.getElementById('drag_contain')
      dropArea.addEventListener('drop',this.dropEvent,false)
      dropArea.addEventListener('dragleave', this.onDragLeave,false)
      dropArea.addEventListener('dragenter', this.onDrag,false)
      dropArea.addEventListener('dragover', this.onDrag,false)
    }, 
    //离开当前页面后执行
    destroyed: function () {
      document.onclick = null
    },
    components: {
      HeadNav
    }
}
</script>

<style lang="scss" scoped>
.contain{
  background: rgba(0,0,0,0.02);
}
.search_bar {
    position: absolute;
    top: 66px;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    align-items: center;
    width: 45%;
    margin: 40px auto 10px;
    /deep/ .el-input__inner {
      border-radius: 10px 0 0 10px;
    }
    
    .el-button {
      border-radius: 0 10px 10px 0;
    }
    .el-icon-camera:before {
      font-size: 20px;
    }
    .el-icon-camera:hover {
      color: #409eff;
      cursor: pointer;
    }
    .el-input__suffix-inner {
      display: flex;
      align-items: center;
      height: 100%;
      p {
        height: 70%;
        background: #fdd6dc;
        color: #f63051;
        font-size: 12px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        margin-top: 6px;
      }
    }
  }
  .uploadContain {
    width: 45%;
    padding: 20px 0;
    border-radius: 10px;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
    margin: 16px auto 20px;
    position: relative;
    top: 140px;
    #drag_contain {
      border: 1px #ccc dashed;
      width: 90%;
      height: 90px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #9195A3;
      font-size: 14px;
      .warn_info {
        width: 60%;
        .el-icon-warning {
          color: red;
        }
        p {
          color: #409eff;
          font-weight: 500;
        }
      }
    }
    .upload_btn {
      display: flex;
      justify-content: center;
    }
    .btn_con {
      display: flex;
      justify-content: center;
    }
    .choose_btn {
      margin-top: 10px;
      border-radius: 10px;
      position: relative;
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .el-icon-close {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: #9195a3;
      font-size: 24px;
    }
    .el-icon-close:hover {
      color:#409eff;
      cursor: pointer;
    }
    .loading {
      height: 134px;
      line-height: 134px;
      text-align: center;
      color: #999;
      font-size: 14px;
    }
  }
  .drop_active {
    background:  #fafafa;
  }
</style>