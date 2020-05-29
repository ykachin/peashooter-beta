<template>
  <div>
    <myhead></myhead>

        <div style="padding-top:10px;padding-bottom:10px;padding-right:20px;border-radius:5px;left:50%;margin-top:50px;width: 800px;background-color: #f2f2f2;margin-left: -400px;position: relative;">
          <div style="margin-left: 20px;margin-top: 20px;width: 100%;padding-bottom: 10px">
            <el-page-header @back="backtoprimarypage" content="发布页">
            </el-page-header>
          </div>
          <!--<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>-->
          <br>
          <el-form :model="ruleForm" status-icon :rules="rules" label-width="100px" ref="ruleForm" class="demo-ruleForm">
            <!--<el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>-->
            <el-form-item label="发布用户" prop="user_id">
              <el-input v-model="username" disabled></el-input>
            </el-form-item>
            <el-form-item label="作品名字" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="填写标签" prop="tags">
              <el-input v-model="ruleForm.tags"></el-input>
            </el-form-item>
            <el-form-item label="选择分类" prop="status">
              <!--<el-input v-model.number="ruleForm.status"></el-input>-->
              <template>
                <el-select v-model="ruleForm.status" clearable placeholder="请选择分类" style="width: 100%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                  </el-option>
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="您的评分" prop="score">
              <el-input v-model.number="ruleForm.score"></el-input>
            </el-form-item>
            <el-form-item label="相关链接" prop="url">
              <el-input v-model="ruleForm.url"></el-input>
            </el-form-item>
            <el-form-item label="分享内容" prop="content">
              <el-input type="textarea" v-model="ruleForm.content"></el-input>
            </el-form-item>
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


            <el-form-item class="m-margin-top">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
    <br>
    <br>
    <br>
    <br>





    <myfoot></myfoot>
  </div>
</template>

<script>
    import myhead from "./myhead";
    import myfoot from "./myfoot";

    export default {
      components:{
        myhead:myhead,
        myfoot:myfoot
      },
        name: "addpost",
      created() {
        this.username=window.sessionStorage.getItem('personalInfo')
      },
      data() {
        var check=(rule, value, callback)=> {
          if (!value) {
            return callback(new Error('内容不能为空'));
          }else{
            callback();
          }
        };
        var checkScore = (rule, value, callback) => {
          setTimeout(() => {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              if (value < 0) {
                callback(new Error('必须大于等于0'));
              } else {
                callback();
              }
            }
          }, 1000);
        };
        var checkAge = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('年龄不能为空'));
          }
          setTimeout(() => {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              if (value < 18) {
                callback(new Error('必须年满18岁'));
              } else {
                callback();
              }
            }
          }, 1000);
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          dialogImageUrl: '',
          dialogVisible: false,
          username:'',
          options:[{label:'电影',value:'0'},
            {label: '音乐',value: '1'},
            {label: '书籍',value: '2'},
            {label: '电视剧',value: '3'}],
          ruleForm: {
            user_id:window.sessionStorage.getItem('user_id'),
            title:'',
            tags:'',
            status:'',
            score:100,
            url:'',
            content:'',
          },
          rules: {
            /*pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            age: [
              { validator: checkAge, trigger: 'blur' }
            ]*/
            title: [
              { required:true,validator: check, trigger: 'blur' },
            ],
            tags: [
              { required:true,validator: check, trigger: 'blur' }
            ],
            status: [
              { required:true, trigger: 'blur' }
            ],
            score: [
              { required:true,validator: checkScore, trigger: 'blur' }
            ],
            url: [
              { required:true,validator: check, trigger: 'blur' }
            ],
            content: [
              { required:true,validator: check, trigger: 'blur' }
            ]
          }
        };
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

              //标签添加到tags表
              const dd={name:_this.tags,frequency:1}
              this.$axios({
                method: 'post',
                url: '/api/tags',
                data:this.$qs.stringify(dd)
              }).then(function (res) {
                _this.$message.success("添加tags成功！")
                console.log(res)
                console.log("添加tags成功")
                console.log(res)
              }).catch(function (res) {
                console.log("发布失败")
              })

              _this.form.append('user_id',_this.ruleForm.user_id)
              _this.form.append('title',_this.ruleForm.title)
              _this.form.append('tags',_this.ruleForm.tags)
              _this.form.append('status',_this.ruleForm.status)
              _this.form.append('score',_this.ruleForm.score)
              _this.form.append('url',_this.ruleForm.url)
              _this.form.append('content',_this.ruleForm.content)
              //增加post
              console.log("发布前检查表单数据是否正常")
              console.log(_this.ruleForm)
              this.$axios.post('/api/posts/upload', _this.form).then(res=>{
                if(res.data.code !== 200) {
                  console.log(res)
                  console.log('文件上传失败, code:' + res.data.code)
                } else {
                  console.log(res)
                  console.log('文件上传成功！')
                  _this.$message.success('发布成功！')
                  /*setTimeout(this.$router.push("/primarypage"),1000)*/
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
              //添加work
              const y={title:_this.ruleForm.title,introduction:_this.ruleForm.content}
              this.$axios({
                method: 'post',
                url: '/api/works',
                data:this.$qs.stringify(y)
              }).then(function (res) {
                console.log("添加work")
                console.log(res)
                if(res.data.success){
                  _this.$message.success("添加work成功！")
                  console.log(res)
                  console.log("添加work成功")
                }else{
                  _this.$message.error("添加work失败，请检查网络是否正常...")
                }
                console.log(res)
              }).catch(function (res) {
                console.log("添加work失败")
              })

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
