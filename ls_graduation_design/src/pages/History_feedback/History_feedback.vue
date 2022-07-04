<template>
  <div class="history">
      <Header title="历史反馈">
          <template #left>
              <van-icon class="header_left" name="arrow-left" color="white" @click="handlegoback" />
          </template>
      </Header>
      <div class="history_list">
          <div class="history_item" v-for="(item,index) in areaList" :key="index">
              <div class="item_title">反馈人:{{item}}</div>
              <div class="item_image" >
                  <div v-for="(item1,index1) in fileArray[index]" :key="index1">
                      <img :src="item1" />
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
export default {
    data(){
        return{
            // 上传图片数组
            fileArray: [],
            // 反馈内容数组
            areaList: []
        }
    },
    components:{
        Header
    },
    created(){
        const fileArray = JSON.parse(window.sessionStorage.getItem('fileArray')) || [];
        this.fileArray = fileArray
        const areaList = JSON.parse(window.sessionStorage.getItem('areaList')) || [];
        this.areaList = areaList
    },
    methods:{
        // 返回上一个页面
        handlegoback(){
            this.$router.go(-1)
        }
    }
}

</script>
<style lang="less" scoped>
.history{
    height: 100vh;
    .history_list{
        margin-top: 50px;
        .history_item{
            width: 100%;
            height: auto;
            margin: 20px 0;
            background: #eee;
            .item_title{
                height: 30px;
                line-height: 30px;
                padding: 0 20px;
            }
            .item_image{
                padding: 10px 20px;
                display: flex;
                flex-wrap: wrap;
                div{
                    width: 80px;
                    height: 70px;
                    img{
                        width: 60px;
                        height: 60px;
                        padding-top: 10px;
                    }
                }
            }
        }
    }
}
</style>