<template>
  <div class="collect">
      <Header title="收藏页面">
          <template #left>
              <van-icon class="header_left" name="arrow-left" color="white" @click="handlegoback" />
          </template>
      </Header>
      <div class="collect_list">
        <div class="collect_item" v-for="item in collectList" :key="item.goods_id" @click="handlegoods(item.goods_id)">
            <div class="item_image">
                <img :src="item.goods_img" alt="">
            </div>
            <div class="item_info">
                <div class="info_name">{{item.goods_name}}</div>
                <div class="info">
                    <span class="info_price">￥{{item.goods_price}}</span>
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
            // 收藏商品数组
            collectList: [],
            
        }
    },
    components:{
        Header
    },
    created(){
        // 获取收藏商品数组
        const collect = JSON.parse(window.sessionStorage.getItem('collect')) || [];
        this.collectList = collect
        //console.log(this.collectList)
    },
    methods:{
        // 返回上个页面
        handlegoback(){
            this.$router.go(-1)
        },
        // 跳转至商品详情页
        handlegoods(id){
            this.$router.push('/goods_detail/'+id)
        }
    }
}

</script>
<style lang="less" scoped>
.collect{
    margin-top: 50px;
   .collect_list{
        .collect_item{
          width: 100%;
          height: 100px;
          background-color: #fff;
          margin: 10px;
          display: flex;
          .item_image{
            flex: 1;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              height: 90px;
              width: 90px;
              border-radius: 5px;
            }
          }
          .item_info{
            flex: 3;
            margin: 10px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .info_name{
              display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            }
            .info{
              overflow: hidden;
              margin: 0 10px;
              .info_price{
                font-size: 15px;
                color: red;
              }
            }
          }
        }
      } 
}
      
</style>