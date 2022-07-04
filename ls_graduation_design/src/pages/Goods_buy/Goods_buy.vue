<template>
  <div class="buy">
    <Header title="支付页面">
      <template #left>
          <van-icon class="header_left" name="arrow-left" color="white" @click="handlegoback" />
      </template>
    </Header>
    <div class="buy_container">
      <div class="buy_address" @click="goToAddressList">
        <div class="icon">
          <div class="img">
            <img src="../../assets/address_location.png" alt="">
          </div>
        </div>
        <div class="address_info">
          <div class="info_address">{{address.address}}</div>
          <div class="info_name">
            <span>{{address.name}}</span>
            <span>{{address.tel}}</span>
          </div>
        </div>
        <div class="jump">＞</div>
      </div>
      <div class="buy_goods">
        <div class="goods_list">
          <div class="goods_item" v-for="item in cartgoodsList" :key="item.goods_id">
            <div class="item_image">
              <img :src="item.goods_img" alt="">
            </div>
            <div class="item_info">
               <div class="info_name">{{item.goods_name}}</div>
               <div class="info">
                 <span class="info_price">￥{{item.goods_price}}</span>
                 <span class="info_num">x{{item.num}}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buy_footer">
      <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit" >
        <span class="totalNum">共{{totalNum}}件</span>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
export default {
  data(){
    return{
      // 收货信息
      address: {},
      // 购物车商品信息
      cartgoodsList: [],
      // 总数量
      totalnum: 0,
      // 总价钱
      totalprice: 0
    }
  },
  components:{
    Header
  },
  created(){
    // 获取收货信息
    const address = JSON.parse(window.sessionStorage.getItem('address')) || [];
    this.address = address
    // 获取商品信息
    let goodsList = JSON.parse(window.sessionStorage.getItem('cartgoods')) || [];
    const cart = goodsList.filter(v => {return v.checked === true})
    console.log(cart)
    this.cartgoodsList = cart
    console.log(this.cartgoodsList)
  },
  methods:{
    // 返回上个页面
    handlegoback(){
      this.$router.go(-1)
    },
    // 点击跳转至收货地址列表
    goToAddressList() {
      this.$router.push('/address')
    },
    // 提交订单
    onSubmit(){
      this.$dialog.confirm({
        message: '是否支付该订单？'
      }).then(() => {
        this.$toast.success('支付成功！')
      }).catch(() => {
        this.$toast.fail('支付失败！')
      })
    }
  },
  computed:{
    // 计算总数量
    totalNum(){
      this.totalnum = 0;
      this.cartgoodsList.forEach(v => {
        this.totalnum += v.num
      });
      return this.totalnum;
    },
    // 计算总价钱
    totalPrice(){
      this.totalprice = 0;
      this.cartgoodsList.forEach(v => {
        this.totalprice += v.num * v.goods_price
      });
      return this.totalprice * 100;
    }
  }
}

</script>
<style lang="less" scoped>
.buy{
  height: 100vh;
  background: #f1f1f1;
  margin-top: 50px;
  margin-bottom: 50px;
  overflow: hidden;
  .buy_container{
    height: auto;
    .buy_address{
      background: #fff;
      margin: 10px 5px;
      border-radius: 10px;
      padding: 10px;
      display: flex;
      .icon{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .img{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #FF6600;
          padding: 5px;
          img{
            width: 20px;
            height: 20px;
          }
        }
      }
      .address_info{
        flex: 5;
        .info_address{
          font-weight: 600;
          font-size: 18px;
          margin-bottom: 10px;
        }
        .info_name{
          font-size: 15px;
          color: #aaa;
        }
      }
      .jump{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #aaa;
      }
    }
    .buy_goods{
      .goods_list{
        .goods_item{
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
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .info{
              display: flex;
              justify-content: space-between;
              overflow: hidden;
              margin: 0 10px;
              .info_price{
                font-size: 15px;
              }
              .info_num{
                color: #ccc;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
  .buy_footer{
    position: fixed;
    height: 50px;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background-color: #ffffff;
    .totalNum{
      color: #ccc;
    }
  }
}
</style>