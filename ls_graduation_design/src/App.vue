<template>
  <div id="app">
    <router-view></router-view>
    <Footer v-show="this.$route.meta.isFooter"></Footer>
  </div>
</template>

<script>
import Footer from '../src/components/Footer/Footer.vue'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  components:{
    Footer
  }
}
</script>

<style lang="less" >
#app{
  width: 100%;
  height: 100%;
}
</style>
