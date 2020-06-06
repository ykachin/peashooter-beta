<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/primarypage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的相册</el-breadcrumb-item>
    </el-breadcrumb>
    <br/><br/>
    <div class="ui attached  segment">
      <div class="ui padded vertical segment" >
        <el-alert v-if="album.length === 0" title="相册为空" type="info"></el-alert>
        <el-row>
          <el-col :span="8" v-for="(o, index) in album" :key="o" v-if="album.length !== 0">
            <el-card :body-style="{ padding: '0px' }">
              <img :src=url+o.route class="image" height="100" width="100" >
              <div style="padding: 10px;">
                <span>我的相片-{{index+1}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ formatDate(currentDate) }}</time>
                  <el-button type="text" class="button" @click="deleteAlbum(o.route)">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="ui attached  segment">
      <div class="ui padded vertical segment" >
        <br>
      <el-form  status-icon ref="ruleForm" class="demo-ruleForm">
        <el-form-item>
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
      <el-button type="primary" size="mini" @click="submitForm">上传到个人相册</el-button>

      </div>
    </div>

  </div>

</template>

<script>
    export default {
      inject:['reload'],
      data() {
        return {
          url:"http://129.204.247.165/",
          currentDate: new Date(),
          album:[],
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
        const _this=this
        /*获取我的相册*/
        var myuserid = {id:window.sessionStorage.getItem('user_id')}
        this.$axios({
          method: 'post',
          url: '/api/user/getpicture',
          data: this.$qs.stringify(myuserid),
        }).then(function (res) {
          if(res.data.data.message!=="相册为空"){
            console.log('我的相册',res)
            _this.album=res.data.data
          }
          console.log('现在album中是什么内容：',_this.album)

        }).catch(function (res) {
          console.log('我的相册获取失败 ')
        })
      },
      methods: {
        deleteAlbum(route){
          //删除图片
          const _this=this
          var deleteOp={user_id:window.sessionStorage.getItem('user_id'),route:route}
          this.$axios({
            method: 'post',
            url: '/api/user/deletealbum',
            data: this.$qs.stringify(deleteOp),
          }).then(function (res) {
            _this.$message.success('删除成功！')
            _this.reload()
          }).catch(function (res) {
            _this.$message.error('删除失败，请检查网络后再重试！')
          })
        },
        handleSuccess(obj){
          console.log("成功了吗")
          console.log(obj)
        },
        chofile(obj){
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
        formatDate(date) {
          var year=date.getFullYear();
          var month=date.getMonth()+1;
          var day=date.getDate();
          var hour=date.getHours();
          var minute=date.getMinutes();
          var second=date.getSeconds();
          //  return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
          return year + '-' + (String(month).length > 1 ? month : '0' + month) + '-' +
            (String(day).length > 1 ? day : '0' + day) + ' ' + (String(hour).length > 1 ? hour : '0' + hour) + ':' + (String(minute).length > 1 ? minute : '0' + minute)
            + ':' + (String(second).length > 1 ? second : '0' + second)
        },
        submitForm() {
          const _this = this
          console.log("这里面数据有问题吗")
          console.log(this.form)
          this.form.append('status',1);
          this.form.append('id',window.sessionStorage.getItem('user_id'));

          this.$axios.post('/api/user/uploadalbum', _this.form).then(function (res) {
            /*if(res.data.code !== 200) {
              console.log(res)
              console.log('文件上传失败, code:' + res.data.code)
              _this.$message.error('图片上传失败！请检查网络后，稍后再试！')
            } else {*/
              console.log("上传图片成功：",res)
              _this.$message.success('上传图片成功')
              _this.reload()
            /*}*/

          }).catch(function (res) {
            _this.$message.error('图片上传失败！请检查网络后，稍后再试！')
          })
          /*this.reload()*/
        },
      }
  }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
