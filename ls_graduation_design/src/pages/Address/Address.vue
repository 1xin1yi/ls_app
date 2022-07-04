<template>
  <div class="address">
      <Header title="地址列表">
          <template #left>
              <van-icon class="header_left" name="arrow-left" color="white" @click="handlegoback" />
          </template>
      </Header>
      <div class="address_list">
          <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
         />
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
export default {
    data(){
        return{
            // 当前地址id
            chosenAddressId: '',
            // 地址列表
            list: [],
        }
    },
    components:{
        Header
    },
    created(){
        const addressList = JSON.parse(window.sessionStorage.getItem('addresslist')) || []
        console.log(addressList)
        addressList.forEach(v => {
            v.id = v.name
            v.address = v.province+v.city+v.county+v.addressDetail
        })
        this.list = addressList
        
    },
    methods:{
        // 新增地址
        onAdd(){
            this.$router.push('/addressedit')
        },
        // 编辑地址
        onEdit(){
            
        },
        // 选中地址是触发
        onSelect(value){
            window.sessionStorage.setItem('address',JSON.stringify(value))
        },
        // 返回上一页
        handlegoback(){
            this.$router.go(-1)
        }
    }
}

</script>
<style lang="less" scoped>
.address{
    background-color: #f1f1f1;
    height: 100vh;
    .address_list{
        margin-top: 60px;
    }
}
</style>