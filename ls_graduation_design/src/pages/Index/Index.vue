<template>
  <div class="index">
    <Header title="零碎商城"></Header>
    <div class="index_search">
        <van-search
            v-model="keywords"
            shape="round"
            background="#ee82ee"
            placeholder="请输入搜索关键词"
            @click="goToSearch"
        />
    </div>
    <div class="index_swiper">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in SwiperList" :key="index">
                <van-image width="100%" height="100%" :src="item.i_swiper_img"></van-image>
            </van-swipe-item>
        </van-swipe>
    </div>
    <div class="index_nav">
        <router-link class="nav_item" to="/shops"> 
            <div class="nav_icon">
                <i class="iconfont icon-shouye"></i>
            </div>
            <span>零碎商城</span>
        </router-link>
        <router-link class="nav_item" to="/cate">
            <div class="nav_icon">
                <i class="iconfont icon-fenlei1"></i>
            </div>
            <span>商品分类</span>
        </router-link>
        <router-link class="nav_item" to="/contact">
            <div class="nav_icon">
                <i class="iconfont icon-lianxiwomen"></i>
            </div>
            <span>联系我们</span>
        </router-link>
        <router-link class="nav_item" to="/search">
            <div class="nav_icon">
                <i class="iconfont icon-sousuo1"></i>
            </div>
            <span>搜索</span>
        </router-link>
    </div>
    <div class="list_title">热门推荐</div>
    <div class="index_list"> 
        <div class="index_item" v-for="item in hotgoodsList" :key="item.hot_id" @click="handlegoodsDetail(item.goods_id)">
            <div class="item_image">
                <van-image width="100%" height="100%" :src="item.hot_img" ></van-image>
            </div>
            <div class="item_info">
                <div class="info_price">
                    <span class="new_price">￥{{item.hot_price}}</span>
                    <span class="old_price">￥{{item.hot_oldprice}}</span>
                </div>
                <div class="info_title">{{item.hot_name}}</div>
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
           // 轮播图列表
           SwiperList: [],
           // 搜索框关键词
           keywords: '',
           // 热门商品列表
           hotgoodsList: []
        }
    },
    components:{
        Header
    },
    created(){
        this.getSwiperList()
    },
    methods:{
        async getSwiperList(){
            const {data:res} = await this.$api.get('Iswiper')
            console.log(res)
            this.SwiperList = res.data.data
            const {data:result} = await this.$api.get('cate/hotgoods')
            console.log(result)
            this.hotgoodsList = result.data.data
        },
        goToSearch(){
            this.$router.push('/search')
        },
        // 热门商品详情
        async handlegoodsDetail(id){
            this.$router.push('/goods_detail/'+id)
        }
    }
}

</script>
<style lang="less" scoped>
.index{
    background-color: #eeeeee;
    height: auto;
    margin-bottom: 50px;
    .index_search{
        margin-top: 48px;
        width: 100%;
        height: 55px;
    }
    .index_swiper{
        width: 100%;
        height: 200px;
        .my-swipe{
            width: 100%;
            height: 100%;
        }
    }
    .index_nav{
        margin: 30px 0;
        width: 100%;
        height: 100px;
        display: flex;
        .nav_item{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .nav_icon{
                margin-bottom: 10px;
                width: 50px;
                height: 50px;
                background-color: #ee82ee;
                color: white;
                border-radius: 50%;
                text-align: center;
                line-height: 50px;
                .iconfont{
                    font-size: 26px;
                }
            }
            span{
                color: #000000;
                font-size: 16px;
            }
        }
    }
    .list_title{
            width: 100%;
            height: 50px;
            border-top: 1px solid #ccc;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
            color: red;
            text-align: center;
        }
    .index_list{
        width: 100%;
        height: auto;
        background: #eeeeee;
        display: flex;
        flex-wrap: wrap;
        .index_item{
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