<template>
  <div class="cate"> 
    <Header title="商品分类"></Header>
    <div class="cate_container" >
      <div class="cate_left">
        <div class="left_item" :class="{'active': index === currentIndex}" v-for="(item,index) in cateList" 
        :key="index" @click="leftItem(index, item.cate_id,item.cate_name)">
          {{item.cate_name}}
        </div>
      </div>
      <div class="cate_right">
        <div class="item_title">{{cateName}}</div>
        <div class="right_item" v-for="item1 in categoodsList" :key="item1.goods_id" @click="goToGoodsdetail(item1.goods_id)">
          <img :src="item1.goods_img" alt="">
          <span>{{item1.goods_name}}</span>
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
      // 分类信息
      cateList: [],
      // 当前分类索引
      currentIndex: '',
      // 根据分类id获取的数据
      categoodsList: [],
      // 分类名称
      cateName: ''
    }
  },
  components:{
    Header
  },
  created(){
    this.getcateList()
  },
  methods:{
    async getcateList(){
      const {data:res} = await this.$api.get('cate/all')
      console.log(res)
      this.cateList = res.data.data
    },
    async leftItem(index, id, name){
      this.currentIndex = index;
      this.cateName = name;
      const {data:res} = await this.$api.get('cate/cateid/'+id)
      console.log(res)
      this.categoodsList = res.data.data
    },
    goToGoodsdetail(id){
      this.$router.push('/goods_detail/'+id)
    }
  }
}

</script>
<style lang="less" scoped>
.cate{
  margin-bottom: 60px;
  .cate_container{
    margin-top: 60px;
    width: 100%;
    height: auto;
    display: flex;
    .cate_left{
      width: 25%;
      height: 100%;
      .left_item{
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 12px;
        border-bottom: 1px solid #eee;
        border-right: 1px solid #eee;
      }
    }
    .active{
      color: white;
      background-color: #ee82ee;
    }
    .cate_right{
      margin-left: 20px;
      width: 70%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      .item_title{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #ee82ee;
      }
      .right_item{
        width: 40%;
        height: 150px;
        margin: 10px;
        img{
          width: 100%;
          height: 120px;
        }
        span{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 12px;
        }
      }
    }
  }
}
</style>