<template>
  <div class="feedback">
      <Header title="意见反馈">
          <template #left>
              <van-icon class="header_left" name="arrow-left" color="white" @click="handlegoback" />
          </template>
          <template #right>
              <span class="header_right" @click="handleHistory">历史反馈</span>
          </template>
      </Header>
      <div class="feedback_container">
          <div class="feedback_suggest">
              <div class="suggest_title">标签</div>
              <div class="suggest_table">
                  <div><span>功能建议</span></div>
                  <div><span>体验建议</span></div>
                  <div><span>内容建议</span></div>
                  <div><span>bug反馈</span></div>
                  <div><span>其他</span></div>
              </div>
          </div>
          <div class="feedback_idea">
              <div class="idea_title">我要反馈</div>
              <div class="idea_content">
                  <textarea v-model="areaValue" placeholder="请描述一下您的问题"></textarea>
                  <van-uploader v-model="fileList" :after-read="onRead" multiple :max-count="8" />
              </div>
          </div>
          <div class="feedback_submit" @click="handleSubmit">
              提交
          </div>
          <img :src="Img" alt="">
      </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
import axios from 'axios'
export default {
    data(){
        return{
            // 内容文本框值
            areaValue: '',
            // 存放图片的数组
            fileList: [],
            // 反馈的内容数组
            areaList: [],
            // 存放图片数组的数组
            fileArray: [],
            hallImg: [],
            Img: ''
        }
    },
    components:{
        Header
    },
    created(){
        const areaList = JSON.parse(window.sessionStorage.getItem('areaList')) || [];
        this.areaList = areaList
        const fileList = JSON.parse(window.sessionStorage.getItem('fileArray')) || [];
        this.fileArray = fileList
    },
    methods:{
        // 返回上个页面
        handlegoback(){
            this.$router.go(-1)
        },
        onRead(file){
            this.Img = file.content;
            console.log(this.Img)
            // let content = file.file;
            // let data = new FormData();
            // data.append('img',content);
            // console.log(data)
            // console.log(content)
            // axios.post('图片上传成功',data)
            // .then((res) => {
            //     let datas = res.data.datas.path;
            //     this.msg.hallImg.push(datas)
            // })
        },
        // 历史反馈记录
        handleHistory(){
            this.$router.push('/history_feedback')
        },
        // 点击提交保存反馈
        handleSubmit(){
            if(!this.areaValue.trim()){
                this.$toast.fail('反馈内容还未写！')
                return
            }
            if(this.fileList.length === 0){
                this.$toast.fail('图片还未上传！')
                return
            }
            this.areaList.unshift(this.areaValue)
            this.areaList = [...new Set(this.areaList)]
            //console.log(this.areaList)
            window.sessionStorage.setItem('areaList',JSON.stringify(this.areaList)); 
            const file = this.fileList.map(v => v.content)
            this.fileArray.unshift(file)
            this.fileArray = [...new Set(this.fileArray)]
            window.sessionStorage.setItem('fileArray',JSON.stringify(this.fileArray));
            this.$toast.success('反馈信息提交成功！')
            this.$router.push('/personal')
        } 
    }
}

</script>
<style lang="less" scoped>
.feedback{
    .feedback_container{
        margin-top: 50px;
        overflow: hidden;
        .feedback_suggest{
            .suggest_title{
                height: 40px;
                width: 100%;
                background-color: #eee;
                line-height: 40px;
                padding-left: 10px;
                margin-left: 10px;
            }
            .suggest_table{
                display: flex;
                flex-wrap: wrap;
                div{
                    width: 30%;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    span{
                        border: 1px solid #000;
                        border-radius: 5px;
                        padding: 8px;
                    }
                }
            }
        }
        .feedback_idea{
            .idea_title{
                height: 40px;
                width: 100%;
                background-color: #eee;
                line-height: 40px;
                padding-left: 10px;
                margin-left: 10px;
            }
            .idea_content{
                width: 100%;
                textarea{
                    width: 100%;
                    height: 300px;
                }
            }
        }
        .feedback_submit{
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background-color: red;
            color: #fff;
        }
    }
}
</style>