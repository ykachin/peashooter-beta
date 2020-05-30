<template>
  <div>
    <div class="ui attached  segment">
      <div class="ui padded vertical segment m-padded-tb-large" >
        <br>



      <el-form  status-icon :rules="rules" label-width="100px" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="上传图片">
          <el-upload
            action
            :auto-upload="true"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :http-request="chofile"
            :limit=1>
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>

      <div class="ui attached  segment m-margin-top " style="border-radius: 15px" v-for="(item,index) in posts">
        <img :src="item.imageurl"   alt="" class="ui rounded image">
      </div>
        <br>

      </div>
    </div>

  </div>

</template>

<script>
    export default {
      data() {
        return {
          dialogImageUrl: '',
          dialogVisible: false,
          username:'',
          isRouterAlive :false,
          likesimage:'../../static/images/like.png',
          allposts:[],
          //page第几页
          userid:1,
          page:1,
          posttotal:1,
          topics:[],
          tags:[],
          isempty:false,
          circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          howmanycomments:'',
          isShowComment:false,
          posts:[],
          thispagecomments:[],
          postInfo:{
            id:''
          },
          addComment:{},
        };
      },
      async created() {
        const _this =this
        //全部post
        this.$axios({
          method: 'post',
          url: '/api/posts/getall',
        }).then(function (res) {
          console.log("获取全部post成功")
          console.log(res)
          _this.allposts=res.data.data
          _this.item=res.data.data
            console.log(_this.item)
          for (let c of _this.item){
            c.imageurl="http://129.204.247.165/"+c.route
          }
          console.log(_this.item)
        }).catch(function (res) {
          console.log(res)
          console.log("获取全部post失败")
        })
      },
      methods: {
        handleSuccess(obj){
          console.log("成功了吗")
          console.log(obj)
        },
        chofile(obj){
          /*this.ruleForm.file=obj.file;*/
          this.form = new FormData();
          this.form.append("file", obj.file);
          console.log('获取文件了吗')
          console.log(obj)
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.ruleForm.route=file.url;
          console.log('route取到了吗')
          console.log(this.dialogImageUrl)
          this.dialogVisible = true;
        },
        backtoprimarypage(){
          this.$router.push("/primarypage")
        },
        submitForm(formName) {
          console.log("这里面数据有问题吗")
          console.log(this.ruleForm)
          /*this.$refs.upload.submit();
          console.log("这里可以获取url吗")
          console.log(this.$refs.upload.uploadFiles[0]);*/
          const _this = this
          this.$refs[formName].validate((valid) => {
            if (valid) {
              //增加post
              console.log("发布前检查数据是否正常")
              console.log(_this.ruleForm)
              /*
              user_id:'1',
              title:'',
              tags:'',
              status:'',
              score:0,
              url:'',
              content:'',
              */
              _this.form.append('user_id',_this.ruleForm.user_id)
              _this.form.append('title',_this.ruleForm.title)
              _this.form.append('tags',_this.ruleForm.tags)
              _this.form.append('status',_this.ruleForm.status)
              _this.form.append('score',_this.ruleForm.score)
              _this.form.append('url',_this.ruleForm.url)
              _this.form.append('content',_this.ruleForm.content)
              this.$axios.post('/api/posts/upload', _this.form).then(res=>{
                if(res.data.code !== 200) {
                  console.log(res)
                  console.log('文件上传失败, code:' + res.data.code)
                } else {
                  console.log(res)
                  console.log('文件上传成功！')
                  _this.$message.success('发布成功！')
                }
              }).catch(error=>{
                if (error.response) {
                  console.log('文件上传失败,' + error.response.data);
                } else if(error.request) {
                  console.log('文件上传失败，服务器端无响应')
                } else {
                  console.log('文件上传失败，请求封装失败')
                }
              });

              /*this.$axios({
                method: 'post',
                url: '/api/posts/upload',
                data:this.$qs.stringify(_this.ruleForm)
              }).then(function (res) {
                if(res.data.success){
                  _this.$message.success("发布成功！")
                  console.log(res)
                  console.log("发布成功")
                }else{
                  _this.$message.error("发布失败，请检查网络是否正常...")
                }
                /!*alert('submit!');*!/
                console.log(res)
              }).catch(function (res) {
                console.log("发布失败")
              })*/
            } else {
              _this.$message.error("网络繁忙,请稍后再试...")
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
  }
</script>

<style scoped>

</style>
