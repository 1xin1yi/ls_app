<template>
  <div class="shoppingcart">
    <Header title="购物车"></Header>
    <div class="shoppingcart_list">
      <div class="list_title">购物车</div>
      <div class="shoppingcart_item" v-for="(item,index) in cartgoodsList" :key="index">
        <van-checkbox  v-model="item.checked" class="item_check" ref="checkbox" @click="handlechecked(item.goods_id)"></van-checkbox>
        <div class="item_img" @click="handlegoodsDetail(item.goods_id)">
          <img :src="item.goods_img" alt="">
        </div>
        <div class="item_info">
          <div class="info_title">
            <div class="title_name">{{item.goods_name}}</div>
            <div class="title_colse" @click="handleDeleteItem(index)">x</div>
          </div>
          <div class="info_content">
            <div class="info_price">￥{{item.goods_price}}</div>
            <div class="info_num" @click="handleNum(item.goods_id)">
              <van-stepper v-model.number="item.num" @change="onChange"  />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <van-checkbox class="allcheck" v-model="allchecked" @click="handleAllchecked">全选</van-checkbox>
      <div class="footer_price">
        <span class="price">合计：<span class="price_active">￥{{totalprice}}</span></span>
        <span class="yf">包含运费</span>
      </div>
      <div class="buy_btn" @click="goTobuy">
        结算({{totalnum}})
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
export default {
  data(){
    return{
      // 购物车数组
      cartgoodsList: [],
      // 总数量
      totalnum: 0,
      // 总价钱
      totalprice: 0,
      // 全选框
      allchecked: false,
      // 计数器数量
      num: 1,
      // 地址
      address: {}
    }
  },
  components:{
    Header
  },
  created(){
    const cartgoods = JSON.parse(window.sessionStorage.getItem('cartgoods')) || [];
    this.cartgoodsList = cartgoods;
    if(this.cartgoodsList.length === 0){
      this.allchecked = false
      this.totalnum = 0
      this.totalprice = 0
    }
    else{
      this.setCart(this.cartgoodsList);
    }
    // 获取收货地址
    const address = JSON.parse(window.sessionStorage.getItem('address')) || [];
    this.address = address
    
  },
  methods:{
    handlechecked(id){
        let {cartgoodsList} = this.$data;
        let index = cartgoodsList.findIndex(v => v.goods_id === id);
        cartgoodsList[index].checked = cartgoodsList[index].checked;
        this.setCart(cartgoodsList);
    },
    // 计算方法
    setCart(cartgoodsList){
      this.totalnum = 0;
      this.totalprice = 0;
      this.allchecked = true;
      cartgoodsList.forEach(v => {
        if(v.checked){
          this.totalnum += v.num;
          this.totalprice += v.num*v.goods_price;
        }else{
          this.allchecked = false;
        }
      });
      window.sessionStorage.setItem('cartgoods',JSON.stringify(cartgoodsList));
    },
    // 全选方法
    handleAllchecked(){
      let {allchecked, cartgoodsList} = this.$data;
      allchecked = allchecked;
      cartgoodsList.forEach(v => v.checked = allchecked);
      this.setCart(cartgoodsList);
    },
    // 点击计数器数量变化
    onChange(value){
      this.num = value;
    },
    // 计算计数器方法
    handleNum(id){
      let {cartgoodsList, num} = this.$data;
      let index = cartgoodsList.findIndex(v => v.goods_id === id);
      cartgoodsList[index].num = num;
      this.setCart(cartgoodsList);
    },
    // 进去支付页面
    goTobuy(){
      const {address, totalnum} = this.$data
      if(address.length === 0){
        this.$dialog.confirm({
          message: '您的地址还没填写呢！'
        }).then(() => {
          this.$router.push('/address')
        }).catch(() => {
          console.log('请选择收货地址')
        })
        return
      }
      if(totalnum === 0){
        this.$dialog.alert({
          message: '您还没有选购商品呢！'
        })
        return;
      }
      this.$router.push('/buy')
    },
    // 点击删除购物车商品
    handleDeleteItem(index){
      let {cartgoodsList} = this.$data;
      cartgoodsList.splice(index,1)
      this.setCart(cartgoodsList)
    },
    // 点击商品图片跳转到商品详情页面
    handlegoodsDetail(id){
      this.$router.push('/goods_detail/'+id)
    }
  }
}

</script>
<style lang="less" scoped>
.shoppingcart{
  .shoppingcart_list{
    margin-top: 60px;
    margin-bottom: 100px;
    .list_title{
      color: #ee82ee;
      font-size: 24px;
      margin: 10px;
    }
    .shoppingcart_item{
      border: 1px solid #ccc;
      margin-top: 10px;
      width: 100%;
      height: 100px;
      display: flex;
      .item_check{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .item_img{
        flex: 2;
        height: 100px;
        width: 100px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .item_info{
        flex: 4;
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .info_title{
          display: flex;
          justify-content: space-between;
          .title_name{
            flex: 10;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
          }
          .title_colse{
            flex: 1;
            color: #ccc;
            font-size: 16px;
            text-align: right;
          }
        }
        .info_content{
          display: flex;
          justify-content: space-between;
          .info_price{
            color: red;
          }
        }
      }
    }
  }
  .footer{
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 50px;
    left: 0;
    z-index: 9999;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    .allcheck{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .footer_price{
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 3px 0;
      .price{
        font-weight: 600;
        font-size: 14px;
        .price_active{
          color: red;
        }
      }
      .yf{
        font-size: 12px;
        color: #ccc;
      }
    }
    .buy_btn{
      flex: 1;
      background-color: red;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 600;
    }
  }
}
</style>