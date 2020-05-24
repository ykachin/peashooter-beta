<template>
  <div>
  <br/>
  <br/>
  <br/>
  <br/>

    <div style="padding-top:10px;padding-bottom:10px;padding-right:20px;border-radius:5px;left:50%;margin-top:50px;width: 500px;background-color: #f2f2f2;margin-left: -250px;position: relative;">
      <div style="margin-left: -15px;margin-top: -50px;margin-bottom: -80px;width: 100%;padding-bottom: 10px">
        <div class="m-container-small m-padded-tb-massive" style="max-width: 30em !important;">
          <div class="ur container">
            <div class="ui middle aligned center aligned grid">
              <div class="column">
                <h2 class="ui teal image header">
                  <div class="content" style="width: 500px">
                    豌豆射手登录平台
                  </div>
                </h2>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                  </el-form-item>
                  <!--<el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                  </el-form-item>-->

                  <el-form-item >
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button @click="registerFormVisible = true">注册</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


    <el-dialog title="注册" :visible.sync="registerFormVisible" width="30%" center>
      <el-form :model="form" ref="formRef" :rules="formRules" >
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="form.password" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
          <el-input type="password" v-model="form.password_repeat"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">注 册</el-button>
      </div>
    </el-dialog>

  </div>
</template>


<script>
  import axios from "axios";
  export default {
    name: "login.vue",
    data() {
      var password=(rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else{
          callback()
        }
      };
      var userName=(rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else{
          callback()
        }

      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.password_repeat !== '') {
            this.$refs.formRef.validateField('password_repeat');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
          if (this.form.password_repeat === '') {
            callback(new Error('请再次输入密码'));
          } else if (this.form.password_repeat !== this.form.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
      };
      return {
        form:{
          username:'',
          password:'',
          password_repeat:''
        },
        formLabelWidth: '120px',


        registerFormVisible:false,
        ruleForm: {
          password: '',
          username: ''
        },
        formRules:{
          password: [
            {required:true, validator: validatePass, trigger: 'blur' },
            {min:6,message:'密码至少6个字符!',trigger: 'blur'}
          ],
          checkPass: [
            { required:true,validator: validatePass2, trigger: 'blur' },
            {min:6,message:'密码至少6个字符!',trigger: 'blur'}
          ],
          username: [
            {required:true, validator: userName, trigger: 'blur' },
            {min:4,message:'用户名至少4个字符!',trigger: 'blur'}
          ]
        },
        rules: {
          password: [
            { required:true,validator: password, trigger: 'blur' },
            {min:6,message:'密码至少6个字符!',trigger: 'blur'}
          ],
          username: [
            {required:true, validator: userName, trigger: 'blur' },
            {min:4,message:'用户名至少4个字符!',trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      getPersonInfo(){
        const _this=this
        const token={'access_token':window.sessionStorage.getItem('token')}
        console.log('输出token')
        console.log(window.sessionStorage.getItem('token'))
        this.$axios({
          method: 'post',
          url: '/api/user/getbyaccess',
          data: this.$qs.stringify(token),
        }).then(function (r) {
          console.log(r)
          //将用户id保存至sessionstorage
          window.sessionStorage.setItem('user_id',r.data.data.id)

          _this.$store.state.userId = r.data.data.id
          _this.$store.state.UserName = r.data.data.username
          _this.$store.state.points = r.data.data.points

          _this.$message.success('获取用户信息成功')
        }).catch(function (res) {
          _this.$message.error('获取用户信息失败')
        })
      },
      register(){
        const _this=this
        console.log(this.form)
        /*console.log(this.$http.post('sigup',this.form))*/
        this.$axios({
          method: 'post',
          url: '/api/user/signup',
          data: this.$qs.stringify(this.form),
        }).then(function (r) {
          console.log(r)
          const res=r.data
          if(!res.success)return this.$message.error('注册失败')
          _this.$message.success("恭喜您，注册成功！")
          _this.registerFormVisible=false

        }).catch(function (res) {
          _this.$message.error('网络繁忙，请稍后再试！')
        })
        /*this.$refs.formRef.validate(async valid=>{
          if(!valid)return this.$message.error("请填写完整用户信息！");
          console.log(1111111111)
          console.log(this.$http.post('sigup',this.form))
        })*/
      },
      submitForm() {
        const _this = this
        console.log(this.ruleForm)
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            /*alert('submit!');*/
            console.log("表单验证成功了")
            this.$axios({
              method: 'post',
              url: '/api/user/login',
              data: this.$qs.stringify({          //axios的post方法访问后端this.qs.stringify(
                username: _this.ruleForm.username,
                password: _this.ruleForm.password
              }),
            }).then(function (r) {
              console.log("向服务器发送请求成功了")
              _this.$message.success('登陆成功')
              /*_this.$alert("恭喜您("+_this.ruleForm.username+")登陆成功！").then(()=>{
                confirmButtonText:'确定',
                callback:action => {
                  _this.$router.push("/work")
                }
              })*/
              console.log(r)
              const res=r.data
              if(res.success){
                window.sessionStorage.setItem('primarypagenum',1)
                window.sessionStorage.setItem('token',res.data.access_token)
                //通过token查找用户信息
                window.sessionStorage.setItem('personalInfo',_this.ruleForm.username)
                _this.getPersonInfo()
                _this.$confirm("恭喜您("+_this.ruleForm.username+")登陆成功！", '提示', {
                  confirmButtonText: '确定',
                  callback:action => {
                    _this.$router.push("/primarypage")
                  }
                })
              }else{
                _this.$message.error('账号密码不匹配！请重试...')
              }


            }).catch(err=>{//请求错误后执行函数
              console.log('登陆失败错误原因')
              console.log(err)
              _this.$confirm("网络繁忙，登陆失败，请稍后再试！", '提示', {
                confirmButtonText: '确定',
                callback:action => {
                  _this.resetForm(),
                  _this.$router.push("/login")
                }
              })
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        console.log(this.ruleForm)
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      }
    },
    created() {
      /*let data = {username: 'testadmin', password: 'testadmin'};

      this.$axios({
        method: 'post',
        url: '/api/adminuser/login',
        data: this.$qs.stringify({          //axios的post方法访问后端this.qs.stringify(
          username: 'testadmin',
          password: 'testadmin'
        }),
      })
        .then(res=>{                    //请求成功后执行函数
          console.log('res=>',res)              //在浏览器后台打印返回的响应数据
        })
        .catch(err=>{                   //请求错误后执行函数
          console.log(err)
        })*/
    }
  }
</script>

<style scoped>

</style>
