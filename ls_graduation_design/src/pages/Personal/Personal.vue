<template>
  <div class="personal">
    <Header title="个人中心">
      <template #right>
        <span class="header_right" @click="RemoveStorage">退出登录</span>
      </template>
    </Header>
    <template v-if="!loginquery">
      <div class="personal_login">
        <router-link class="login" to="/login">
          还未登录，请登录
        </router-link>
        <router-link class="register" to="/register">
          新用户请先注册！
        </router-link>
      </div>
    </template>
    <template v-else>
      <div class="personal_container">
        <div class="personal_img">
          <div class="personal_bgimg" :style="{backgroundImage: 'url('+ loginquery.user_img +')'}"></div>
          <div class="personal_user">
            <img :src="loginquery.user_img" />
            <span>{{loginquery.username}}</span>
          </div>
        </div> 
        <div class="personal_content">
          <div class="personal_main">
            <div class="personal_history">
              <div class="history_collect">
                <span class="collect_num">0</span>
                <span class="collect_name">收藏的店铺</span>
              </div>
              <div class="history_collect" @click="handleCollect">
                <span class="collect_num">{{collectList.length}}</span>
                <span class="collect_name">收藏的商品</span>
              </div>
              <div class="history_collect">
                <span class="collect_num">0</span>
                <span class="collect_name">关注的商品</span>
              </div>
              <div class="history_collect">
                <span class="collect_num">0</span>
                <span class="collect_name">我的足迹</span>
              </div>
            </div>
            <div class="personal_order">
              <div class="order_title">我的订单</div>
              <div class="order_content">
                <div class="order_info">
                  <span class="iconfont icon-dingdan"></span>
                  <span class="info_name">全部订单</span>
                </div>
                <div class="order_info">
                  <span class="iconfont icon-daifukuan"></span>
                  <span class="info_name">代付款</span>
                </div>
                <div class="order_info">
                  <span class="iconfont icon-daishouhuo"></span>
                  <span class="info_name">待收货</span>
                </div>
                <div class="order_info">
                  <span class="iconfont icon-shouhou"></span>
                  <span class="info_name">退款/退货</span>
                </div>
              </div>
            </div>
            <router-link to="/address" class="personal_address">
              收货地址管理
            </router-link>
            <div class="personal_suggest ">
              <div class="contact" @click="handleContact">
                <span>联系我们</span>
                <span>400-618-8332</span>
              </div>
              <div class="feedback" @click="handleFeedback">意见反馈</div>
              <div class="about" @click="handleContact">关于我们</div>
            </div>
            <div class="personal_recommend">
              <van-cell title="把应用推荐给其他人" @click="showShare = true" />
              <van-share-sheet
                v-model="showShare"
                title="立即分享给好友"
                :options="options"
                @select="onSelect"
              />
            </div> 
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
export default {
  data(){
    return{
      // 用户信息
      loginquery: {},
      // 收藏商品数组
      collectList: [],
      // 是否显示分享面板信息
      showShare: false,
      // 分享面板的信息
       options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ]
      ],
    }
  },
  components:{
    Header
  },
  created(){
    const user = JSON.parse(window.sessionStorage.getItem('user')) 
    this.loginquery = user
    console.log(this.loginquery)
    // 获取商品收藏的列表
    const collect = JSON.parse(window.sessionStorage.getItem('collect')) || [];
    this.collectList = collect
  },
  methods: {
    RemoveStorage(){
      window.sessionStorage.removeItem('user')
      this.loginquery = ''
    },
    // 跳转至收藏商品列表
    handleCollect(){
      this.$router.push('/collect')
    },
    // 跳转至联系我们页面
    handleContact(){
      this.$router.push('/contact')
    },
    // 点击分享给朋友
    handleShare(){
      this.$dialog.confirm({
        title: '分享朋友',
        message: '是否分享给朋友'
      }).then(() => {
        this.$toast.success('分享成功')
      }).catch(() => {
        console.log('分享失败！')
      })
    },
    // 跳转至反馈界面
    handleFeedback(){
      this.$router.push('/feedback')
    },
    //
    onSelect(option){
      this.$dialog.confirm({
        title: '分享给朋友',
        message: `是否分享到${option.name}`
      }).then(() => {
        this.$toast.success('分享成功！')
        this.showShare = false
      }).catch(() => {
        this.$toast.fail('分享失败！')
        this.showShare = false
      })
    }
  }
}

</script>
<style lang="less" scoped>
.personal{
  .personal_login{
    margin-top: 60px;
    .login{
      margin: auto;
      display: block;
      width: 200px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: green;
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
    }
    .register{
      display: block;
      width: 200px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: rgb(84, 192, 235);
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
      margin: auto;
    }
  }
  .personal_container{
    margin-top: 50px;
    width: 100%;
    background-color: #eee;
    .personal_img{
      position: relative;
      .personal_bgimg{
        width: 100%;
        height: 350px;
        background-size: 100% 100%;
        filter: blur(5px);
      }
      .personal_user{
        width: 100px;
        height: 12px;
        position: absolute;
        left: 50%;
        top: 35%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        span{
          color: #fff;
          font-size: 18px;
          text-align: center;
          margin-top: 10px;
        }
      }
    }
    .personal_content{
      height: 450px;
      position: relative;
      .personal_main{
        color: #666;
        font-size: 14px;
        width: 90%;
        height: 500px;
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        .personal_history{
          background-color: #fff;
          display: flex;
          .history_collect{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 5px;
            .collect_num{
              color: red;
            }
            .collect_name{
              font-size: 14px;
            }
          }
        }
        .personal_order{
          margin-top: 20px;
          background-color: #fff;
          .order_title{
            border-bottom: 1px solid #ccc;
            padding: 5px 10px;
          }
          .order_content{
            display: flex;
            padding: 8px;
            .order_info{
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .iconfont{
                color: red;
                font-size: 22px;
              }
              .info_name{
                font-size: 14px;
              }
            }
          }
        }
        .personal_address{
          display: block;
          margin-top: 20px;
          padding: 8px;
          background-color: #fff;
        }
        .personal_suggest{
          margin-top: 20px;
          background-color: #fff;
          .contact{
            padding: 8px;
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: space-between;
          }
          .feedback{
            padding: 8px;
            border-bottom: 1px solid #ccc;
          }
          .about{
            padding: 8px;
          }
        }
        .personal_recommend{
          margin-top: 20px;
          background-color: #fff;
        }
      }
    }
  }
  
}
</style>