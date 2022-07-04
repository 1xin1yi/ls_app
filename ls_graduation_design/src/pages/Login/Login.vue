<template>
  <div class="login">
      <Header title="登录页面">
          <template #left>
              <van-icon class="header_left" name="arrow-left" color="white" @click="handlegoback" />
          </template>
      </Header>
      <div class="login_from">
          <van-tabs v-model="activeName">
            <van-tab title="用户名登录" name="user">
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="username"
                        name="username"
                        label="用户名"
                        placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                        colon
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        name="password"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                        colon
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">提交</van-button>
                    </div>
                </van-form>
            </van-tab>
            <van-tab title="手机号登录" name="phone">
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="phone"
                        type="tel"
                        name="phone"
                        label="手机号"
                        placeholder="手机号"
                        :rules="[{ required: true, message: '请填写手机号' }]"
                        colon
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        name="password"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                        colon
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">提交</van-button>
                    </div>
                </van-form>
            </van-tab>
            <van-tab title="邮箱登录" name="email">
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="email"
                        type="email"
                        name="email"
                        label="邮箱"
                        placeholder="邮箱"
                        :rules="[{ required: true, message: '请填写邮箱' }]"
                        colon
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        name="password"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                        colon
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">提交</van-button>
                    </div>
                </van-form>
            </van-tab>
            <van-tab title="短信登录" name="code">
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="phone"
                        type="tel"
                        name="phone"
                        label="手机号"
                        placeholder="手机号"
                        :rules="[{ required: true, message: '请填写手机号' }]"
                        colon
                    />
                    <van-field
                        v-model="code"
                        name="code"
                        center
                        clearable
                        label="短信验证码"
                        placeholder="请输入短信验证码"
                        >
                        <template #button>
                            <van-button size="small" type="primary" @click="handleCode">发送验证码</van-button>
                        </template>
                    </van-field>
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">提交</van-button>
                    </div>
                </van-form>
            </van-tab>
          </van-tabs>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
export default {
    data(){
        return{
            // 激活tab标签
            activeName: 'user',
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
        async handleCode(){
            const {data:res} = await this.$api.post('login/code',{phone:this.phone})
            console.log(res)
            const code = res.phonecode
            const {data:result} = await this.$api.post('login/insertcode', {phone:this.phone,code})
            console.log(result)
        },
        async onSubmit(values){
            console.log(values)
            const { username, password, phone, email,code} = values;
            if(username && password){
                const {data:res} = await this.$api.post('login/loginone',{username,password})
                if(res.data.code === '400'){
                    this.$dialog.alert({
                        message:'信息错误！'
                    })
                    return
                }
                window.sessionStorage.setItem('user',JSON.stringify(res.data.data[0]))
                this.$router.push('/personal')
            }else if(phone && password){
                const {data:res} = await this.$api.post('login/logintwo',{phone,password})
                if(res.data.code === '400'){
                    this.$dialog.alert({
                        message:'信息错误！'
                    })
                    return
                }
                window.sessionStorage.setItem('user',JSON.stringify(res.data.data[0]))
                this.$router.push('/personal')
            }else if(email && password){
                const {data:res} = await this.$api.post('login/loginthree',{email,password})
                if(res.data.code === '400'){
                    this.$dialog.alert({
                        message:'信息错误！'
                    })
                    return
                }
                window.sessionStorage.setItem('user',JSON.stringify(res.data.data[0]))
                this.$router.push('/personal')
            }else if(phone && code){
                const {data:res} = await this.$api.post('login/logincode',{phone,code})
                if(res.data.code === '400'){
                    this.$dialog.alert({
                        message:'信息错误！'
                    })
                    return
                }
                window.sessionStorage.setItem('user',JSON.stringify(res.data.data[0]))
                this.$router.push('/personal')
            }else{
                 this.$dialog.alert({
                    message: '提交失败!',
                });
            }
        },
        // 返回上个页面
        handlegoback(){
            this.$router.go(-1)
        }
    }
}

</script>
<style lang="less" scoped>
.login{
    .login_from{
        margin-top: 60px;
    }
}
</style>