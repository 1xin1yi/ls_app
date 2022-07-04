<template>
  <div class="goods_detail">
      <Header title="商品详情">
          <template #left>
              <van-icon class="header_left" name="arrow-left" color="white" @click="handlegoback" />
          </template>
      </Header>
      <div class="goods_detail_container">
          <div class="goods_swiper">
            <van-swipe :autoplay="3000" loop>
                <van-swipe-item v-for="(item,index) in swipergoods" :key="index">
                    <van-image width="100%" height="100%" :src="item.swiper_img" @click="hangleImagePreview(Images,index)"></van-image>
                </van-swipe-item>
            </van-swipe>
          </div>
          <div class="goods_info">
              <div class="goods_price">
                  <span class="newprice">￥{{goodsList.detail_price}}</span>
                  <span class="oldprice">￥{{goodsList.detail_oldprice}}</span>
              </div>
              <div class="goods_title">
                  <div class="goods_name">{{goodsList.detail_name}}</div>
                  <div class="goods_collect" @click="handlecollectgoods(goodsList)">
                      <div class="iconfont" :class="collectIndex ? 'icon-shoucang1' : 'icon-shoucang'"></div>
                      <div class="collect_font">收藏</div>
                  </div>
              </div>
              <div class="goods_content_title">宝贝详情</div>
              <div class="goods_content" v-html="goodsList.detail_content"></div>
          </div>
      </div>
      <div class="footer">
          <div class="footer_df" @click="handleShops">
              <span class="iconfont icon-dianpu"></span>
              <span>店铺</span>
          </div>
          <div class="footer_kefu" @click="handlekefu">
              <span class="iconfont icon-kefu"></span>
              <span>客服</span>
          </div>
          <div class="footer_cart" @click="getCart">
              <span class="iconfont icon-gouwuche"></span>
              <span>购物车</span>
          </div>
          <div class="addcart" @click="getAddcart">
              加入购物车
          </div>
          <div class="buy" @click="getBuy">
              立即购买
          </div>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
import { ImagePreview } from 'vant'
export default {
    data(){
        return{
            // 商品详情列表
            goodsList: {},
            // 商品轮播图列表
            swipergoods: [],
            // 购物车列表
            cartgoodsList: {},
            // 收藏的列表
            collectList: [],
            // 点击收藏后转变值
            collectIndex: false,
            // 预览图片数组
            Images: []
        }
    },
    GoodsList:{},
    components:{
        Header
    },
    created(){
        const goods_id = this.$route.params.id;
        this.getgoodsList(goods_id);
        this.getSwipergoods(goods_id);
    },
    methods:{
        async getgoodsList(id) {
            const {data:res} = await this.$api.get('cate/goodsid/'+id)
            this.goodsList = res.data.data[0];
            this.GoodsList = res.data.data[0];
            //console.log(this.goodsList);
            const {data:res1} = await this.$api.get('cate/categoods/'+id)
            this.cartgoodsList = res1.data.data[0]
            //console.log(this.cartgoodsList)
            // 判断商品是否被收藏
            let collect = JSON.parse(window.sessionStorage.getItem('collect')) || [];
            this.collectIndex = collect.some(v => v.goods_id === this.GoodsList.goods_id)
           // console.log(this.collectIndex)
        },
        async getSwipergoods(id){
            const {data:res} = await this.$api.get('cate/swiper/'+id)
            this.swipergoods = res.data.data;
           // console.log(this.swipergoods);
            const Images = this.swipergoods.map( v => {
                if(v.swiper_img){
                    return v.swiper_img
                }
           })
            this.Images = Images
        },
        // 加入购物车
        async getAddcart(){
            let cartgoods = JSON.parse(window.sessionStorage.getItem('cartgoods')) || []
            let index = cartgoods.findIndex(v => v.goods_id === this.cartgoodsList.goods_id)
            if(index === -1){
                this.cartgoodsList.num = 1;
                this.cartgoodsList.checked = true;
                cartgoods.push(this.cartgoodsList)
            }
            else{
                cartgoods[index].num++
            }
            window.sessionStorage.setItem('cartgoods',JSON.stringify(cartgoods))
            this.$router.push('/shoppingcart')
        },
        // 进入购买界面
        getBuy(){
            this.$router.push('/buy')
        },
        // 进入购物车页面
        getCart(){
            this.$router.push('/shoppingcart')
        },
        // 收藏商品
        async handlecollectgoods(item){
            let collect = JSON.parse(window.sessionStorage.getItem('collect')) || [];
            this.collectList = collect
            const index = this.collectList.findIndex(v => v.goods_id === item.goods_id)
            const {data:res} = await this.$api.get('cate/categoods/'+item.goods_id)
            const goods = res.data.data[0]
            //console.log(index)
            if(index === -1){
                this.collectList.push(goods)
                this.collectList = [...new Set(this.collectList)]
                this.collectIndex = true
            }else{
                this.collectList.splice(index,1)
                this.collectIndex = false
            }
            window.sessionStorage.setItem('collect',JSON.stringify(this.collectList))
        },
        // 返回上个页面
        handlegoback(){
            this.$router.go(-1)
        },
        // 点击预览图片
        hangleImagePreview(item,index){
            ImagePreview({
                images: item,
                startPosition: index,
                showIndex: true
            })
        },
        // 跳转至商家店铺
        handleShops(){
            this.$router.push('/shops')
        },
        // 点击打给客服
        handlekefu(){
            this.$dialog.confirm({
                message: '是否拨打客服电话？'
            }).then(() => {
                this.$toast.success('拨打成功！')
            }).catch(() => {
                this.$toast.fail('拨打失败！')
            })
        }
    }
}

</script>
<style lang="less" scoped>
.goods_detail_container{
    margin-bottom: 50px
    
    
    
    
    
    
    
    
    ;
    .goods_swiper{
        margin-top: 55px;
        width: 100%;
        height: 300px;
        .van-swipe{
            width: 100%;
            height: 100%;
        }
    }
    .goods_info{
        .goods_price{
            width: 100%;
            height: 20px;
            margin: 10px;
            .newprice{
                font-size: 20px;
                color: red;
            }
            .oldprice{
                font-size: 16px;
                color: #ccc;
                text-decoration: line-through;
                margin-left: 10px;
            }
        }
        .goods_title{
            margin: 10px;
            display: flex;
            border-top: solid 1px #ccc;
            border-bottom: solid 1px #ccc;
            padding: 10px 10px 10px 0;
            .goods_name{
                flex: 6;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .goods_collect{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-left: 1px #ccc solid;
                .iconfont{
                    font-size: 18px;
                    color: #aaa;
                }
                .icon-shoucang1{
                    color: #f26522;
                }
                .collect_font{
                    font-size: 14px;
                    color: #aaa;
                }
            }
        }
        .goods_content_title{
            height: 30px;
            text-align: center;
            line-height: 30px;
            font-size: 20px;
            color: #ee82ee;
            border-bottom: solid 1px #ccc;
            padding-bottom: 10px;
        }
        .goods_content{
            width: 100%;
        }
    }
}
.footer{
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    border-top: 1px solid #e4e4e4;
    display: flex;
    background-color: #fff;
    font-size: 14px;
    .footer_df{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .iconfont{
            font-size: 18px;
        }
    }
    .footer_kefu{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .iconfont{
            font-size: 20px;
        }
    }
    .footer_cart{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .iconfont{
            font-size: 22px;
        }
    }
    .addcart{
        flex: 2;
        height: 40px;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        background-color: #f26522;
        color: #fff;
        border-radius: 20px;
        margin: 5px 5px 0 10px;
    }
    .buy{
        flex: 2;
        font-size: 16px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        background-color: #ef4136;
        color: #fff;
        border-radius: 20px;
        margin: 5px 10px 0 5px;
    }
}
</style>