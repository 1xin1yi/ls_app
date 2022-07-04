<template>
  <div class="shops">
      <Header title="零碎商城">
          <template #left>
              <van-icon class="header_left" name="arrow-left" color="white" @click="handlegoback" />
          </template>
      </Header>
      <div class="shops_list"> 
        <div class="shops_item" v-for="item in allgoodsList" :key="item.hot_id" @click="handlegoodsDetail(item.goods_id)">
            <div class="item_image">
                <van-image width="100%" height="100%" :src="item.goods_img" ></van-image>
            </div>
            <div class="item_info">
                <div class="info_price">
                    <span class="new_price">￥{{item.goods_price}}</span>
                    <span class="old_price">￥{{item.goods_oldprice}}</span>
                </div>
                <div class="info_title">{{item.goods_name}}</div>
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
            // 所有商品列表
            allgoodsList: []
        }
    },
    components:{
        Header
    },
    created(){
        this.getallgoods()
    },
    methods:{
        // 获取所有商品信息
        async getallgoods(){
            const {data:res} = await this.$api.get('cate/allgoods')
            this.allgoodsList = res.data.data
        },
        // 跳转至该商品的详情页面
        handlegoodsDetail(id){
            this.$router.push('/goods_detail/'+id)
        },
        // 返回上个页面
        handlegoback(){
            this.$router.go(-1)
        }
    }
}

</script>
<style lang="less" scoped>
.shops{
    .shops_list{
        margin-top: 55px;
        width: 100%;
        height: auto;
        background: #eeeeee;
        display: flex;
        flex-wrap: wrap;
        .shops_item{
            background-color: #ffffff;
            width: 42%;
            margin: 20px 15px;
            height: 250px;
            overflow: hidden;
            .item_image{
                width: 100%;
                height: 150px;
            }
            .item_info{
                width: 90%;
                margin: auto;
                .info_price{
                    height: 30px;
                    line-height: 30px;
                    font-size: 12px;
                    .new_price{
                        color: red;
                    }
                    .old_price{
                        margin-left: 5px;
                        color: #ccc;
                        text-decoration: line-through;
                    }
                }
                .info_title{
                    //line-height: 25px;
                    font-size: 14px;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
</style>