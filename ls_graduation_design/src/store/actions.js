// 异步方法
export default {
   async getsaveuserInfo({commit,user}){
       const {data:res} = await this.$api.get('login/loginone',user)
       console.log(res)
   },
}