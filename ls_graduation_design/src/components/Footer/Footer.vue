<template>
  <div class="footer">
      <router-link class="footer_item" to="/index" :class="{active: '/index' === $route.path}" @click="geTo('/index')">
        <span>
            <i class="iconfont icon-shouye-shouye"></i>
        </span>
        <span>首页</span>
      </router-link>
      <router-link class="footer_item" to="/cate" :class="{active: '/cate' === $route.path}" @click="goTo('/cate')">
        <span>
            <i class="iconfont icon-fenlei"></i>
        </span>
        <span>分类</span>
      </router-link>
      <router-link class="footer_item" to="/shoppingcart" :class="{active: '/shoppingcart' === $route.path}" @click="goTo('/shoppongcart')">
        <span>
            <i class="iconfont icon-gouwuche"></i>
        </span>
        <span>购物车</span>
      </router-link>
      <router-link class="footer_item" to="/personal" :class="{active: '/personal' === $route.path}" @click="goTo('/personal')" >
        <span>
            <i class="iconfont icon-31wode"></i>
        </span>
        <span>我的</span>
      </router-link>
  </div>
</template>

<script>
export default {
  methods:{
    goTo(path){
      this.$router.replace(path)
    }
  }
}

</script>
<style lang="less" scoped>
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
  .footer_item{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #999999;  
    span{
      font-size: 12px;
      .iconfont{
        font-size: 24px;
      }
    }
  }
  .active{
    color: #ee82ee;
  }
}
</style>