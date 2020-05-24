<template>
  <div>
    <myhead></myhead>
    <div>
    <!-- 顶部的logo、搜索框...模块 -->
    <top-bar></top-bar>
    <div style="padding-top:10px;padding-bottom:10px;padding-right:20px;border-radius:5px;left:50%;margin-top:50px;width: 800px;background-color: #f2f2f2;margin-left: -400px;position: relative;margin-bottom:50px">
      <div style="margin-left: 20px;margin-top: 20px;width: 100%;padding-bottom: 10px">
        <div id="share-content">
          <!-- 标题部分 -->
          <div id="title">
            <el-row>
              <p>标题</p>
              <el-input
                v-model.trim="title"
                @blur="outInputTitle"
                @input="inInputTile"
                type="text"
                placeholder="请输入标题"
                maxlength="50"
                show-word-limit>
              </el-input>
              <el-alert
                v-if="titleNull" title="给它起个标题吧" type="warning"
                :closable="false">
              </el-alert>
            </el-row>
          </div>

          <!-- 内容部分 -->
          <div id="content">
            <el-row>
              <p>内容</p>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容(不超过200个字)"
                maxlength="200"
                show-word-limit
                @blur="outInputContent"
                @input="inInputContent"
                v-model.trim="content">
              </el-input>
              <el-alert
                v-if="contentNull"
                title="请给资源添加描述"
                type="warning"
                :closable="false">
              </el-alert>
            </el-row>
          </div>

          <!-- 文件选择 -->
          <div id="file">
            <el-row>
              <el-upload
                class="upload-demo"
                action
                :show-file-list="true"
                :http-request="choFile"
                :limit="1">
                <el-button slot="trigger" size="small" type="primary">选取文件<i class="el-icon-upload"></i></el-button>
    <!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-row>
          </div>

          <!-- 类别选择 -->
          <div id="category">
            <el-row>
              分区
              <el-select v-model="curTag" placeholder="请选择" class="tag">
                <el-option
                  v-for="(item, index) in tags"
                  :key="index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-row>
          </div>

          <!-- 限制条件 -->
          <div id="limit">
            <el-checkbox v-model="needPay">需要积分</el-checkbox>
            <el-input-number v-if="needPay" size="mini" v-model="points" :min="1" :max="20" style="margin-left: 10px"></el-input-number>
            <br><br>
            <el-button @click="publish">发布</el-button>
          </div>
        </div>
      </div>
    </div>
    </div>
  <myfoot ></myfoot>
  </div>
</template>

<script>
  import myfoot from "../../components/myfoot";
  import myhead from "../../components/myhead";
  import TopBar from "../../components/resource/TopBar";

  import { getTags, publish } from "../../network/resource";

  export default {
    name: "Share",
    data() {
      return {
        title: '',
        content: '',
        curTag: '音乐',
        tags: [
          {
            value: '选项1',
            label: '音乐'
          },
          {
            value: '选项2',
            label: '电影'
          },
          {
            value: '选项3',
            label: '书籍'
          }
        ],
        needPay: false,
        showToAll: false,
        formData: new FormData(),
        points: 1,

        titleNull: false,
        contentNull: false,
        fileNull: false,
        isMax: false
      }
    },
    components: {
      myfoot,
      myhead,
      TopBar
    },
    created() {
      this.getTags()
    },
    computed:{
      storeState(){
        return this.$store.state
      }
    },
    methods: {
      /**
       * 拿到资源标签
       */
      getTags() {
        getTags().then(res => {
          this.tags = res.data.data
        })
      },

      /**
       * 发布
       */
      publish() {
        // 输入有误的情况，给出相应提示
        if (this.title == '') {
          this.$message({
            message: '发布失败,标题为空',
            type: 'error',
            offset: 100
          })
        }
        else if (this.content == '') {
          this.$message({
            message: '发布失败,内容为空',
            type: 'error',
            offset: 100
          })
        }
        else if (this.formData.get('file') == null) {
          this.$message({
            message: '发布失败,文件为空',
            type: 'error',
            offset: 100
          })
        }

        // 输入无误
        else {
          // 初始化数据  hhq:this.storeState.userId
          this.formData.append('user_id', window.sessionStorage.getItem('user_id'))
          this.formData.append('title', this.title)
          this.formData.append('content', this.content)
          this.formData.append('tags', this.curTag)
          this.formData.append('points', this.needPay == true ? this.points : 0)

          // 发布 发送请求
          publish(this.formData).then(res => {
            // 1. 发布失败
            if (res.data.code != 200) {
              this.$message({
                message: '发布失败\n' + res.data.message,
                type: 'error',
                offset: 100
              })
              console.log(res)
            }
            // 2. 发布成功
            else {
              this.$message({
                message:'发布成功',
                type: 'success',
                offset: 100
              })
              this.$router.push({path:'/resource'})
              console.log(res)
            }
          }).catch(err => {
            this.$message({
              message: '发布失败',
              type: 'error',
              offset: 100
            })
            console.log(err)
          });
        }
      },

      /**
       * 选择文件
       * @param fileObj 文件
       */
      choFile(fileObj) {
        this.formData.set("file", fileObj.file);
        this.fileNull = false
        console.log(fileObj)
      },

      /**
       * 标题输入框 失去焦点执行
       */
      outInputTitle() {
        this.titleNull = this.title ? false : true
      },

      /**
       * 标题输入框 内容改变时
       */
      inInputTile() {
        this.titleNull = false
      },

      /**
       * 内容输入框 失去焦点时
       */
      outInputContent() {
        this.contentNull = this.content ? false : true
      },

      /**
       * 内容输入框 内容改变时
       */
      inInputContent() {
        this.contentNull = false
      },
    }
  }
</script>

<style scoped>
  #title {
    width: 50%;
    margin: 0 auto;
  }
  #content {
    width: 50%;
    margin: 0 auto;
  }
  #file {
    text-align: center;
    margin: 0 auto;
  }
  #category {
    width: 50%;
    text-align: center;
    margin: 0 auto;
  }
  #limit {
    width: 50%;
    text-align: center;
    margin: 0 auto;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .tag {
    width: 100px;
  }
</style>
