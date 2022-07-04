<template>
  <div class="register">
      <Header title="注册页面">
          <template #left>
              <van-icon class="header_left" name="arrow-left" color="white" @click="handlegoback" />
          </template>
      </Header>
      <van-form class="register_form" @submit="onSubmit" colon>
        <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
            v-model="email"
            type="email"
            name="email"
            label="邮箱"
            placeholder="邮箱"
            :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <van-field
            v-model="phone"
            type="tel"
            name="phone"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
import Header from "../../components/Header/Header.vue"
export default {
    data(){
        return{
            // 用户名
            username: '',
            // 密码
            password: '',
            // 手机号
            phone: '',
            // 邮箱
            email: '',
            // 验证码
            code: ''
        }
    },
    components:{
        Header
    },
    methods:{
        async onSubmit(value){
            const {phone, username, email, password} = value
            const {data:res} = await this.$api.post('login/isphone',{phone,username,email})
            console.log(res)
            if(res.code === '400'){
                this.$dialog.alert({
                    message: '用户已被注册！'
                })
                return
            }
            const {data:res1} = await this.$api.post('login/rephone',{phone, username, email, password})
            console.log(res1)
            window.sessionStorage.setItem('user',JSON.stringify(res1.data.data[0]))
            this.$router.push('/personal')
        },
        // 返回上个页面
        handlegoback(){
            this.$router.go(-1)
        }
    }
}

</script>
<style lang="less" scoped>
.register{
    .register_form{
        margin-top: 60px;
    }
}
</style>