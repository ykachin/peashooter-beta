<template>
    <div>
      <div>
        <div  class="m-container m-padded-tb-big animated fadeIn ">
          <div class="ui container">



                  <div class="ui middle aligned one column grid">
                    <div class="column">
                      <div class="ui raised segment">

                        <a class="ui teal header">豌豆射手主页&emsp;&emsp;&emsp;&emsp;</a>
                        <a class="right aligned ">
                          共 <h2 class="ui red header m-inline-block m-text-thin" > {{posttotal}} </h2> 条发布内容&emsp;&emsp;&emsp;&emsp;
                        </a>
                        <el-button type="primary" @click="mypost">发布新内容<i class="el-icon-upload el-icon--right"></i></el-button>
                      </div>
                    </div>

                  </div>


                <!--content-->

                <div class="ui attached  segment m-margin-top " style="border-radius: 15px" v-for="(item,index) in posts">
                  <div class="ui padded vertical segment" >
                    <div class="ui  mobile reversed stackable grid" >
                      <div class="eleven wide column left aligned " >
                        <h3 class="ui header left aligned" ><a href="#"  target="_blank" class="m-black" >{{item.title}}</a></h3>
                        <span class="ui red horizontal label ">资源地址：</span><span class="m-text" >{{item.url}}</span>
                        <el-card shadow="hover" style="background-color: #dddddd" class="m-margin-top-small">
                          {{item.content}}
                        </el-card>
                        <div class="ui grid m-margin-top-small">
                          <div class="eleven wide column">
                            <div class="ui mini horizontal link list">
                              <div class="item">
                                <img :src="circleUrl"   alt="" class="ui avatar image">
                                <div class="content"><a href="#" class="header"  >{{item.user_id}}</a></div>
                              </div>
                              <div class="item">
                                <i class="calendar icon"></i><span >{{formatDate(new Date(item.create_time*1000))}}</span>
                              </div>
                              <div class="item">
                                <a @click="dianzan(item.id,item)"><img  class="middle aligned" style="width: 18px" :src="likesimage"><span >{{item.likes}}</span></a>
                              </div>
                              <div class="item">
                                <a @click="getcommentbypostid(item.id,index)"><img  class="middle aligned" style="width: 18px" src="../../../static/images/comment.png"></a>
                              </div>
                            </div>
                          </div>
                          <!--<div class="right aligned five wide column">
                            <a href="#" target="_blank" class="ui teal basic label m-padded-tiny m-text-thin" >点击详情</a>
                          </div>-->
                        </div>
                      </div>

                      <div class="five wide column middle aligned" >
                        <a href="#"  target="_blank">
                          <img :src="item.imageurl"   alt="" class="ui rounded image">
                        </a>
                      </div>

                      <div class="ui bottom attached segment" v-if="item.isShowComment" >
                        <div  class="ui bottom attached " >
                          <!--留言区域列表-->
                          <div id="comment-container"  class="ui teal segment">
                            <div >
                              <div class="ui threaded comments" style="max-width: 100%;">
                                <h3 class="ui dividing header">评论</h3>
                                <p v-if="isempty">评论区为空</p>
                                <div class="comment" v-for="(item,index) in thispagecomments" :key="item.id">
                                  <a class="avatar">
                                    <img :src="circleUrl" >
                                  </a>
                                  <div class="content" style="text-align: left">
                                    <a class="author" >
                                      <span >{{item.user_id}}</span>
                                    </a>
                                    <div class="metadata">
                                      <span class="date">{{formatDate(new Date(item.create_time*1000))}}</span>
                                    </div>
                                    <div class="text" >
                                      {{item.content}}
                                    </div>
                                    <div class="actions" >
                                      <a class="reply" data-commentid="1" data-commentnickname="Matt"  @click="reply(item.user_id)" >回复</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <br/>
                          <div id="comment-form" class="ui form m-margin-tb-big ">
                            <input type="hidden" name="blog.id" >
                            <input type="hidden" name="parentComment.id" value="-1">
                            <div class="field">
                              <textarea name="content" id="sub" placeholder="请输入评论信息..." v-model="addComment.content"></textarea>
                            </div>
                            <div class="fields">
                              <div class="field  m-margin-bottom-small m-mobile-wide"style="width: 100%">
                                <!--<button id="commentpost-btn " type="button" class="ui teal button m-mobile-wide" @onclick="submitForm"><i class="edit icon"></i>发布</button>-->
                                <el-button type="primary" @click="submitForm">发布</el-button>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>


                    </div>
                  </div>


                </div>




                <!--footer-->
                <div class="ui bottom attached segment m-margin-top" >
                  <div class="ui middle aligned">
                    <!--<div class="ui inverted buttons m-padded-tb-large">-->
                    <!--<div class="column">
                      <a href="#"    class="ui blue inverted button">上一页</a>
                    </div>
                    <div class="right aligned column">
                      <a href="#"  class="ui blue inverted button">下一页</a>
                    </div>-->
                    <!--</div>-->
                    <!--分页-->
                    <el-pagination
                      @current-change="handleCurrentChange"
                      background
                      layout="prev, pager, next"
                      :page-size="2"
                      :total="posttotal">
                    </el-pagination>
                  </div>
                </div>



          </div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
      inject:['reload'],
      data() {
        return {
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
        }
      },
      methods:{
        //处理页码改变后的posts数据
        async handleCurrentChange(current){
          this.page=current
          console.log('当前页码为')
          console.log(this.page)
          const _this=this
          await this.$axios({
            method: 'get',
            url: '/api/posts?page='+_this.page,
          }).then(function (res) {
            const __this =_this
            const r=res.data
            _this.posts=r.data
            console.log("得到的发布表总信息")
            console.log(_this.posts)
            for(let c of _this.posts){
              c.isShowComment=false
              c.imageurl="http://129.204.247.165/"+c.route
              let prepostid=c.id
              const likes={id:prepostid}
              _this.$axios({
                method: 'post',
                url: '/api/posts/getlike',
                data: _this.$qs.stringify(likes),
              }).then(function (res) {
                c.likes=res.data.data
                console.log('获取某个post点赞数成功')
                console.log(c.likes)
              })
                .catch(function (res) {
                  console.log('获取某个post点赞数失败')
                })
            }
            _this.updatedata()
          }).catch(function (res) {
            console.log(res)
            console.log("添加isShowComment获取发布信息发生异常！请稍后重试...")
          })
          console.log('该页下的数据')
          console.log(_this.posts)
          /*this.$router.go(0);*/
          /*this.reload()*/
        },
        async dianzan(postid,thisitem){
          const _this=this
          thisitem.likesimage='../../static/images/liked.png'
          const zan={
            post_id:postid,
            user_id:window.sessionStorage.getItem('user_id')
          }
          console.log('点赞表参数')
          await this.$axios({
            method: 'post',
            url: '/api/likes',
            data:this.$qs.stringify(zan)
          }).then(function (res) {
            _this.$message.success("点赞成功！")
            console.log(res)
            console.log('点赞成功')
            console.log('报错了吗')
            /*_this.getList()*/
          }).catch(function (res) {
            console.log(res)
            console.log("点赞异常！请稍后重试...")
          })
          thisitem.likes=parseInt(thisitem.likes)+1
          console.log('前端点赞数+1后的结果')
          console.log(thisitem.likes)
          thisitem.likesimage='../../static/images/liked.png'
          this.reload()
          /*setTimeout(this.reload(), 1000);*/
          /*this.$router.go(0);*/
        },
        async submitForm(){
          this.addComment.user_id=window.sessionStorage.getItem('user_id')
          this.addComment.post_id=this.postInfo.id
          const _this=this
          console.log('要加入的评论数据')
          console.log(this.addComment)
          await this.$axios({
            method: 'post',
            url: '/api/comments',
            data:this.$qs.stringify(this.addComment)
          }).then(function (res) {
            _this.$message.success("添加评论成功！")
            console.log(res)
            console.log('报错了吗')
            _this.reload()
            console.log('报错了吗')
            /*_this.getList()*/
          }).catch(function (res) {
            console.log(res)
            console.log("添加评论异常！请稍后重试...")
          })
          this.$router.go(0);
          /*_this.reload()*/
        },
        updatedata(){
          const _this=this
          for(let c of _this.posts){
            c.isShowComment=false
            c.imageurl="http://129.204.247.165/"+c.route
            c.likesimage='../../static/images/like.png'
            let prepostid=c.id
            const likes={id:prepostid}
            _this.$axios({
              method: 'post',
              url: '/api/posts/getlike',
              data: _this.$qs.stringify(likes),
            }).then(function (res) {
              c.likes=res.data.data

              console.log('获取某个post点赞数成功')
              console.log(c.likes)
            })
              .catch(function (res) {
                console.log('获取某个post点赞数失败')
              })
          }
        },
        async hanshu(){
          const _this =this
          //获取post
          await this.$axios({
            method: 'get',
            url: '/api/posts?page=1',
          }).then(function (res) {
            const __this =_this
            const r=res.data
            _this.posts=r.data
            console.log("得到的发布表总信息")
            console.log(_this.posts)
          }).catch(function (res) {
            console.log(res)
            console.log("添加isShowComment获取发布信息发生异常！请稍后重试...")
          })
          await this.updatedata()
        },
        mypost(){
          this.$router.push("/addpost0")
        },
        async getcommentbypostid(param,index){
          const _this=this
          this.postInfo.id=param
          console.log('对应postid为')
          console.log(this.postInfo.id)
          console.log('this是哪个')
          console.log(this)
          /*this.isShowComment=!this.isShowComment*/
          /*isShowComment=!isShowComment*/
          this.posts[index].isShowComment=!this.posts[index].isShowComment
          console.log('isShowComment改变了嘛')
          console.log(this.posts)
          //获取comment
          await this.$axios({
            method: 'post',
            url: '/api/posts/getcomment',
            data:this.$qs.stringify(this.postInfo),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (res) {
            const r=res.data
            _this.thispagecomments=r.data
            console.log("得到的某发布页评论信息")
            console.log(_this.thispagecomments)

          }).catch(function (res) {
            console.log(res)
            console.log("获取某发布页评论信息发生异常！请稍后重试...")
          })
          if(_this.thispagecomments.length===0){
            _this.isempty=true
          }else{
            _this.isempty=false
          }
          //重新渲染页面
          /*this.reload()*/
          this.$forceUpdate();
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
      },
      name: "primarypage",
      async created() {
        const _this =this
        //全部post
        this.$axios({
          method: 'post',
          url: '/api/posts/getall',
        }).then(function (res) {
          console.log("获取全部post成功111111")
          console.log(res)
          console.log("获取全部post成功222222")
          _this.allposts=res.data.data
          console.log(_this.allposts)
          let data= [];
          for(let c in _this.allposts){
            if(_this.allposts[c].user_id+''==_this.userid+''){
              console.log('我要这个数据')
              data.push(_this.allposts[c]);
            }
          }
          _this.allposts=data
          console.log("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
          console.log(_this.allposts)
          console.log("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
        }).catch(function (res) {
          console.log(res)
          console.log("获取全部post失败")
        })
        //增加comment
        /*const d={
          content:'好棒啊啊啊',
          user_id:1,
          post_id:3
        }
        console.log(d)
        this.$axios({
          method: 'post',
          url: '/api/comments',
          data:this.$qs.stringify(d),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(function (res) {
          console.log(res)
          console.log("添加评论成功")

        }).catch(function (res) {
          console.log("添加评论失败")
        })*/
        //获取全部post个数
        this.$axios({
          method: 'post',
          url: '/api/posts/getcount',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(function (res) {
          console.log(res)
          _this.posttotal= parseInt(res.data.data)
          console.log("查找全部post条数成功")

        }).catch(function (res) {
          console.log("查找全部post条数失败")
        })
        await this.hanshu()

        console.log('进过这里了吗')
        console.log('加了赞之后的post')
        console.log(_this.posts)
        console.log("添加isShowComment后的发布表总信息")
        console.log(_this.posts)

        console.log('难道这里面是空的吗')
        console.log(_this.posts)
        for(let m in _this.posts) {
          console.log('进过这里了吗2')
          let user_id = m.user_id
          const uu = {id: user_id}
          _this.$axios({
            method: 'post',
            url: '/api/user/searchbyid',
            data: _this.$qs.stringify(uu),
          }).then(function (r) {
            console.log(r)
            //将用户id保存至sessionstorage
            console.log('获取某个用户信息成功')
          }).catch(function (res) {
            console.log('获取某个用户信息失败')
          })
        }

        //通过id改用户名
        /*console.log('难道这里面是空的吗')
        console.log(_this.posts)
        for(let m in _this.posts){
          console.log('进过这里了吗2')
          let user_id=m.user_id
          const uu = {id:user_id}
          _this.$axios({
            method: 'post',
            url: '/api/user/searchbyid',
            data: this.$qs.stringify(uu),
          }).then(function (r) {
            console.log(r)
            //将用户id保存至sessionstorage
            console.log('获取某个用户信息成功')
          }).catch(function (res) {
            console.log('获取某个用户信息失败')
          })
        }*/

      }
    }
</script>

<style scoped>

</style>
