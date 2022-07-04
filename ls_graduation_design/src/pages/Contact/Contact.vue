<template>
  <div class="contact">
      <Header title="联系我们">
          <template #left>
              <van-icon class="header_left" name="arrow-left" color="white" @click="handlegoback" />
          </template>
      </Header>
      <div class="contact_container">
          <div class="image">
              <img src="http://www.itcast.cn/2018czydz/images/gywmban.jpg" alt="">
          </div>
          <div class="info">
              <div class="info_phone" @click="callPhone">联系电话：400-618-8332 ( 点击拨打 )</div>
              <div class="info_address">地址：广东省广州市天河区新华街道广州大道北1098号</div>
          </div>
          <div class="amap">
             <el-amap class="amap-box" :zoom="zoom" :center="center" :mapStyle="mapStyle">
                <el-amap-marker :position="[113.327595,23.178502]" :icon="icon"></el-amap-marker>
             </el-amap> 
          </div>    
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
import img from '../../assets/location.png'
export default {
    data(){
        return{
            center: [113.327595,23.178502],//地图中心点坐标
            zoom:16,//初始化地图显示层级
            mapStyle: "amap://styles/8b6be8ec497009e17a708205348b899a", //设置地图样式
            icon: img
        }
    },
    components:{
        Header
    },
    methods:{
        // 返回上一页
        handlegoback(){
            this.$router.go(-1)
        },
        // 拨打电话
        callPhone(){
            this.$dialog.confirm({
                message: '是否拨打该电话！'
            }).then(() => {
                this.$toast.success('拨打成功！')
            }).catch(() => {
                console.log('拨打失败！')
            })
        }
    }
}

</script>
<style lang="less" scoped>
.contact{
    .contact_container{
        margin-top: 50px;
        .image{
            width: 100%;
            height: 200px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .info{
            width: 100%;
            height: 80px;
            line-height: 40px;
            .info_phone{
                height: 40px;
                color: #ccc;
                padding: 0 10px;
                font-size: 14px;
            }
            .info_address{
                height: 40px;
                padding: 0 10px;
                font-size: 13px;
            }
        }
        .amap{
            margin-top: 20px;
            width: 100%;
            height: 300px;
        }
    }
}
</style>