<template>
  <div class="search">
      <Header title="搜索">
          <template #left>
              <van-icon class="header_left" name="arrow-left" color="white" @click="handlegoback" />
          </template>
      </Header>
      <div class="search_container">
          <div class="search_form">
            <van-search
                v-model.trim="keywords"
                shape="round"
                placeholder="请输入搜索关键词"
                @search="getsearchgoods"
                @clear="getClear"
                @input="handleInput"
            />
          </div>
          <template v-if="!searchgoodsList.length">
              <div class="search_history">
                  <div class="history_title">
                      <span class="name">搜索历史</span>
                      <span class="iconfont icon-lajitong" @click="getClearhistory"></span>
                  </div>
                  <div class="history_list">
                      <div class="history_item" v-for="(item,index) in historyList" :key="index" @click="historySearch(item)">
                          {{item}}
                      </div>
                  </div>
              </div>
              <div class="search_hot">
                  <div class="hot_title">热门推荐</div>
                  <div class="hot_list">
                      <div class="hot_item" v-for="item in hotgoodsList" :key="item.hot_id" @click="hotSearch(item.goods_id)">
                          {{item.hot_name}}
                      </div>
                  </div>
              </div>
          </template>
          <template v-else>
              <div class="search_goods">
                  <div class="goods_list">
                      <div class="goods_item" v-for="item in searchgoodsList" :key="item.goods_id" @click="handleItem(item.goods_id)">
                          {{item.goods_name}}
                      </div>
                  </div>
              </div>
          </template>
      </div> 
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
export default {
    data(){
        return{
            // 搜索框内容
            keywords: '',
            // 热门推荐商品信息
            hotgoodsList: [],
            // 搜索关键词的商品数组
            searchgoodsList: [],
            // 搜索历史数组
            historyList: []
        }
    },
    components:{
        Header
    },
    created(){
        this.gethotgoods()
        const history = JSON.parse(window.sessionStorage.getItem('history'))|| [];
        this.historyList = history
    },
    methods:{
        // 获取搜索框内容的信息
        async getSearch(){
            const {data:res} = await this.$api.get('cate/search',{params:{keywords:this.keywords}})
            //console.log(res)
            this.searchgoodsList = res.data.data
        },
        // 获取热门推荐商品
        async gethotgoods(){
          const {data:res} = await this.$api.get('cate/hotgoods')  
          //console.log(res)
          this.hotgoodsList = res.data.data
        },
        // 搜索框搜索关键词方法
        getsearchgoods(){
            this.getSearch()
            this.historyList.unshift(this.keywords)
            this.historyList = [...new Set(this.historyList)]
            if(this.historyList.length > 10 ){
                this.historyList.length = 10
            }
            window.sessionStorage.setItem('history', JSON.stringify(this.historyList))
        },
        // 点击清除图标
        getClear(){
            this.keywords = ''
            this.searchgoodsList = []
        },
        // 清除搜索历史记录
        getClearhistory(){
            this.historyList = []
            window.sessionStorage.removeItem('history')
        },
        // 搜索框输入内容时触发
        handleInput(){
            if(!this.keywords.trim()){
                this.searchgoodsList = []
                return;
            }
            this.getSearch()
        },
        // 历史记录搜索
        historySearch(keywords){
            this.keywords = keywords
            this.getSearch()
        },
        // 热门商品详情
        hotSearch(id){
           this.$router.push('/goods_detail/'+id) 
        },
        // 搜索后的商品详情
        handleItem(id){
            this.$router.push('goods_detail/'+id)
        },
        // 返回上个页面
        handlegoback(){
            this.$router.go(-1)
        }
    }
}

</script>
<style lang="less" scoped>
.search{
    height: auto;
    margin-bottom: 50px;
    background-color: #f4f4f4;
    .search_container{
        .search_form{
            margin-top: 48px;
            width: 100%;
            height: 55px;
        }
        .search_history{
            width: 100%;
            height: 200px;
            margin-top: 30px;
            .history_title{
                margin: 0 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .name{
                    font-weight: 600;
                    font-size: 16px;
                }
                .iconfont{
                    font-size: 20px;
                    color: #aaa;
                }
            }
            .history_list{
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                .history_item{
                    background-color: #fff;
                    height: 30px;
                    line-height: 30px;
                    margin: 10px;
                    text-align: center;
                    border-radius: 30px;
                    padding: 5px 20px;
                }
            }
        }
        .search_hot{
            width: 100%;
            .hot_title{
                margin-left: 20px;
                font-size: 16px;
                font-weight: 600;
                border-bottom: 1px solid #ddd;
                padding-bottom: 10px;
            }
            .hot_list{
                margin: 0px 10px;
                .hot_item{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding: 20px 0;
                    border-bottom: 1px solid #ddd;
                }
                
            }
        }
        .search_goods{
            .goods_list{
                width: 100%;
                margin: 0px 10px;
                .goods_item{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding: 20px 0;
                    border-bottom: 1px solid #ddd;
                }
            }
        }
    }
    
}
</style>