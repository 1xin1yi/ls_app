<template>
  <div class="addressedit">
      <Header title="地址编辑">
          <template #left>
              <van-icon class="header_left" name="arrow-left" color="white" @click="handlegoback" />
          </template>
      </Header>
      <div class="addressedit_info">
        <van-address-edit
            ref="addressEditrefs"
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
        />
      </div>
      
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
import {areaList} from '@vant/area-data'
export default {
    data(){
        return{
            // 地区列表
            areaList,
            // 详细地址
            searchResult: [],
            // 收货地址数组
            addressList: [],
            // 当个收货地址
            info:{}
        }
    },
    components:{
        Header
    },
    methods:{
        // 点击保存按钮时触发
        onSave(value){
            this.info = value
            const addressList = JSON.parse(window.sessionStorage.getItem('addresslist')) || []
            addressList.push(this.info)
            this.addressList = [...new Set(addressList)]
            window.sessionStorage.setItem('addresslist',JSON.stringify(this.addressList));
            this.$router.push('/address')
        },
        // 点击删除按钮时触发
        onDelete(){
            this.$router.push('/address')
        },
        // 修改详细地址时触发
        onChangeDetail(val){
            
        },
        // 返回上一页
        handlegoback(){
            this.$router.go(-1)
        }
    }
}

</script>
<style lang="less" scoped>
.addressedit{
    .addressedit_info{
        margin-top: 60px;
    }
}
</style>