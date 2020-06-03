<template>
  <div>
    <myhead></myhead>
    <div>
    <el-container>
      <!-- 顶部内容 -->
      <el-header height="height: auto;background: bottom;">
        <div class="searchbody" style="background-color: white;opacity: 0.8">
          <!-- <img src="../assets/teamlogo.png" style="padding-left: 20%; width: 60px; height: auto;"/> -->
          <span class="top-bar-title" style="padding-top: 30px;margin-left: 20%;">豌豆</span>
          <span class="top-bar-title" style="padding-top: 40px;">射手</span>
          <img src="../../../static/images/pea.png" style="width: 30px; height: auto;" />
          <input id="userinput" type="text" v-model="searchResTitle" placeholder="搜索你感兴趣的资源" @keyup.enter="searchRes()"  />
          <input id="startsearch" type="submit" value="搜索" @click="searchRes()" />
        </div>
      </el-header>

      <!-- 主要内容显示 -->
      <el-container>
        <el-main>
          <!-- 公告显示 -->
          <notice>
            <el-alert
              title="公告标题1"
              type="info"
              description="这条公告是我编的"
              :closable="false"
              class="notice-item">
            </el-alert>
            <el-alert
              title="公告标题2"
              type="info"
              description="这条公告也是我编的"
              :closable="false"
              class="notice-item">
            </el-alert>
          </notice>
          <!-- 资源显示 -->

          <res-list v-loading="loadingResList">
            <div slot="cho-button" id="res-list-top">
              <el-button type="primary" round><router-link to="/resource/share" class="router-link-btn">去分享<i class="el-icon-share" style="color: white"></i></router-link></el-button>
              <el-button @click="getResBy('time', 1)">最新</el-button>
              <el-button @click="getResBy('hot', 1)">精华</el-button>
              <!-- 标签选择 -->
              <el-button @click="drawer = true" type="success" style="margin-left: 16px;">
                {{ curTag }}
              </el-button>
              <el-drawer
                title="标签选择"
                :visible.sync="drawer"
                :with-header="true">
                <el-button v-for="item in allTagName" @click="getResByTagAndOrderZhIndex(item, 'time', 1)" style="margin: 7px 2px;">{{ item }}</el-button>
              </el-drawer>
            </div>
            <res-list-item v-for="(item,index) in resourcesZhIndex['所有'].list" >
              <!-- 用户头像、用户名 -->
              <span slot="user-name" class="user-name" style="font-size:20px">{{ item.username }}</span>
              <span slot="title" class="title" style="font-size:20px">标题：{{ item.title }}</span>
              <!-- 资源内容 -->
              <p slot="content" class="content" style="font-size:20px">内容：{{  item.content }}</p>
              <!-- 标签、链接 -->
              <el-tag type="success" size="mini" slot="tag">{{ item.tags }}</el-tag>
              <i v-if="item.points === 0" slot="route-icon" class="el-icon-paperclip el-icon-paperclip-my-style"></i>
              <i v-else slot="route-icon" class="el-icon-lock el-icon-paperclip-my-style"></i>

              <!-- 不需积分 | 已经支付过 -->
              <el-link
                      v-if="item.points === 0"
                      slot="route" type="primary"
                      :href="HOSTURL + item.route"
                      target="_blank">
                <p @click="downloadFile(item.id, storeState.userId)">资源链接</p>
              </el-link>
              <!-- 需要积分 -->
              <el-link
                      v-else
                      slot="route"
                      type="warning"
                      @click="readyPay(item.id, item.title, item.points, item.user_id)">
                需要积分:{{ item.points }}
              </el-link>
            </res-list-item>

            <div style="padding-top: 1em !important;border-radius: 10px;background-color: white;" class="m-margin-top">
              <!-- 资源为空的提示 -->
              <el-alert
                title= "这里空空如也"
                type="info"
                :closable="false"
                class="none-res-tip"
                v-show="resNull">
              </el-alert>

            <!-- 页码 -->
            <el-pagination
              style="text-align: center"
              background
              layout="prev, pager, next"
              page-size="20"
              :current-page="curPage"
              :total="100"
              :page-size="20"
              v-if="searchResTitle === ''"
              @current-change="pageChange">
            </el-pagination>
            </div>
          </res-list>

        </el-main>

        <!-- 右边侧边栏 人气资源显示 -->
        <el-aside class="m-margin-top">
          <pop-res v-loading="loadingPopRes">
            <pop-res-item v-for="(item, index) in popRes" v-if="index < 15">
              <!-- 该人气资源不需要积分 -->
              <el-link
                v-if="item.points === 0"
                style="color: #3377AA;
                  text-decoration: none;
                  font-size: 14px;
                  display: block;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis"
                slot="title" type="primary"
                :href="HOSTURL + item.route"
                target="_blank">
                <p @click="downloadFile(item.id, storeState.userId)">{{ item.title }}</p>
              </el-link>
              <!-- 该人气资源需要积分 -->
              <el-link
                v-else
                style="color: #ebb563;
                  text-decoration: none;
                  font-size: 14px;
                  display: block;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis"
                  slot="title"
                  type="primary">
                <p @click="readyPay(item.id, item.title, item.points)">{{ item.title }}</p>
              </el-link>
              <!--<a :href="HOSTURL + item.route" slot="title" class="title" target="_blank">{{ item.title }}</a>-->
              <span slot="download-times" class="download-times">下载次数 {{ item.times }} </span>
            </pop-res-item>
          </pop-res>
        </el-aside>

      </el-container>
    </el-container>

    <!-- 支付积分的提示框 -->
    <el-dialog
      title="付给积分提示"
      :visible.sync="payDialogVisible"
      width="30%"
      :before-close="handleClose">

      <!-- 内容提示 -->
      <div v-show="hadPayIt === 1">
        您已支付过此资源
      </div>
      <div v-show="hadPayIt === 0">
        资源标题： {{ payResTitle }} <br>
        所需积分： {{ payResPoints }} <br>
        我的积分： {{ curUserPoints }}
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="payDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="payPoints(curResId, payResPoints)">确 定</el-button>
      </span>
    </el-dialog>
    </div>

    <myfoot></myfoot>
  </div>
</template>

<script>
  import myfoot from "../../components/myfoot";
  import myhead from "../../components/myhead";
  import TopBar from "../../components/resource/TopBar";
  import NoticeItem from "../../components/resource/NoticeItem";
  import ResListItem from "../../components/resource/ResListItem";
  import ResListChoButton from "../../components/resource/ResListChoButton";
  import PopResItem from "../../components/resource/PopResItem";
  import Notice from "../../components/resource/Notice";
  import ResList from "../../components/resource/ResList";
  import PopRes from "../../components/resource/PopRes";
  import ResCategories from "../../components/resource/ResCategories";
  import ResCategoryItem from "../../components/resource/ResCategoryItem";

  import axios from "axios";

  import {
    getResData,
    getResOrderInTime,
    getResOrderInDownloads,
    downloadFile2,
    judUserDownloadRes,
    getResByTag,
    getTags,
    searchResByTitle,
    addUserPoints
  } from "../../network/resource";

  import { HOSTURL } from "../../network/resource";
  import {request} from "../../network/request";

  export default {
    name: "Resource",
    data() {
      return {
        resourcesZhIndex : this.$store.state.resourcesZhIndex,
        curList: [],
        // 人气资源
        popRes : [],
        // 当前资源列表的标签，默认：all 有 电影 音乐 ....

        /* 页面显示依据 */
        curTag: '所有',
        // 当前资源根据什么来展示，默认：time 有 all time hot...
        curBy: 'time',
        // 当前页码， 默认1
        curPage: 1,

        curResId: 0,
        // 支付资源的所有者
        payResUserId: 0,
        inputSearch: '',
        // 为 true 时列表显示加载动画
        loadingResList: true,
        loadingPopRes: true,
        payDialogVisible: false,
        payResId: 0,
        payResTitle: '',
        payResPoints: 0,
        hadPayIt: 0,
        allTagName: [],
        drawer: false,

        searchResTitle: ''
      }
    },
    components: {
      myhead,
      myfoot,
      TopBar,
      PopResItem,
      ResListChoButton,
      ResListItem,
      NoticeItem,
      Notice,
      ResList,
      PopRes,
      ResCategoryItem,
      ResCategories
    },
    created() {
      this.initResourceZhIndex()
      // console.log(this.storeState().resourcesZhIndex['所有'])
      this.curTag = '所有'  // 刚进入页面，初始化当前标签为所有
      this.getResData(this.curTag, 1) // 初始化
      this.getPopRes()
    },
    computed: {
      resNull() {
        return (this.resourcesZhIndex['所有'].list.length == 0)
      },
      HOSTURL() {
        return HOSTURL
      },
      // 当前的登录的用户的Id
      curUserId() {
        return this.$store.state.userId
      },
      curUserPoints() {
        return this.$store.state.points
      },
      storeState() {
        return this.$store.state
      }
    },
    methods: {
      /**
       * 获取相应类别、页码资源
       * @param tag  类别 'all','movie'...
       * @param page  页码
       */
      getResData(tag, page) {
        getResData(page).then(res => {
          // // this.resourcesZhIndex[type].list.push(...res.data.data) // 页面使用【加载更多】方式时使用的方法
          this.storeState.resourcesZhIndex[tag].list = res.data.data
          this.loadingResList = false
        })
      },

      /**
       * 根据 标签、排序、页码 获取数据 （中文下标）
       * @param tag  类别 '所有','电影'...
       * @param page  页码
       */
      getResByTagAndOrderZhIndex(tag, order, page) {
        this.curTag = tag
        this.searchResTitle = ''

        getResByTag(tag, order, page).then(res => {
          this.storeState.resourcesZhIndex[tag].list = res.data.data
          this.storeState.resourcesZhIndex['所有'].list = this.storeState.resourcesZhIndex[tag].list
        }).catch(err => {
          console.log(err)
        })

        this.curPage = 1
        this.drawer = false
      },

      /**
       * 获得人气资源
       */
      getPopRes() {
        getResOrderInDownloads(1).then(res => {
          this.popRes.push(...res.data.data)
          this.loadingPopRes = false
          console.log("人气资源数据：")
          console.log(this.popRes)
        })
      },

      /**
       * 获得按时间排序的资源
       */
      getResByTime(page) {
        getResOrderInTime(page).then(res => {
          this.resourcesZhIndex[this.curTag].list = res.data.data
        }).catch(err => {
          console.log(err)
        })
      },

      /**
       * 获得按下载次数排序的资源
       */
      getResByHot(page) {
        getResOrderInDownloads(page).then(res => {
          this.resourcesZhIndex[this.curTag].list = res.data.data
        }).catch(err => {
          console.log(err)
        })
      },

      /**
       * 监听到子组件（资源列表上的按钮）发射出来的方法 后 执行
       * @param type  资源展示形式 'time': 最新 'hot': 精华
       */
      getResBy(type, page) {
        this.searchResTitle = ''
        if (this.curTag != '所有') {
          this.getResByTagAndOrderZhIndex(this.curTag, type, page)
        }
        else {
          switch (type) {
            case 'time':
              console.log("进入了time")
              this.getResByTime(page)
              break
            case 'hot' :
              this.getResByHot(page)
              break
          }
        }
      },

      /**
       * 准备支付积分，设置资源id、标题、积分值，判断是否下载过
       * @param id  资源id
       * @param title 资源标题
       * @param points  资源需要的积分值
       */
      readyPay(id, title, points, resUserId) {
        this.payDialogVisible = true
        this.judUserDownloadRes(id, this.storeState.userId)
        this.payResId = id
        this.hadPayIt = 0
        this.payResTitle = title
        this.payResPoints = points
        this.payResUserId = resUserId
      },

      /**
       * 支付积分
       * @param id  资源id
       * @param points  资源需要的积分值
       */
      payPoints(id, points) {
        this.payDialogVisible = false

        var targetObj = {}
        var list = this.storeState.resourcesZhIndex[this.curTag].list
        var listPopRes = this.popRes

        for (var index in list) {
          var obj = list[index]
          if(obj.id === this.payResId) {
            if (this.hadPayIt === 0) {
              // 1. 用户积分不足
              if (this.storeState.points < points) {
                alert('积分不足')
              }
              // 2. 用户积分足够
              else {
                // 2.1 用户扣去相应积分
                this.storeState.points -= points

                // 资源所有者添加相应积分
                this.addUserPoints(this.payResUserId, points)

                // 2.2 该资源的 points 设为 0
                obj.points = 0
                this.downloadFile(obj.id, this.storeState.userId)
                alert('支付成功')
              }
            }
            else {
              obj.points = 0
            }
          }
          list[index] = obj
        }

        for (var index in listPopRes) {
          var obj = listPopRes[index]
          if(obj.id === this.payResId) {
            if (this.hadPayIt === 0) {
              // 1. 用户积分不足
              if (this.storeState.points < points) {
                alert('积分不足')
              }
              // 2. 用户积分足够
              else {
                // 2.1 用户扣去相应积分
                this.storeState.points -= points
                // 2.2 该资源的 points 设为 0
                obj.points = 0
                this.downloadFile(obj.id, this.storeState.userId)
                alert('支付成功')
              }
            }
            else {
              obj.points = 0
            }
          }
          listPopRes[index] = obj
        }

        // 当 list 类型不为数组（如__ob__:Observer）的时候该方法便不可用
        // list.forEach((obj) => {
        //   // 通过资源id拿到该资源对象
        //   if(obj.id === this.payResId) {
        //     if (this.hadPayIt === 0) {
        //       // 1. 用户积分不足
        //       if (this.storeState.points < points) {
        //         alert('积分不足')
        //       }
        //       // 2. 用户积分足够
        //       else {
        //         // 2.1 用户扣去相应积分
        //
        //         this.storeState.points -= points
        //         // 2.2 该资源的 points 设为 0
        //         obj.points = 0
        //         this.downloadFile(obj.id, this.storeState.userId)
        //         alert('支付成功')
        //       }
        //     }
        //     else {
        //       obj.points = 0
        //     }
        //   }
        // })
      },

      /**
       * 关闭 支付积分提示对话框 用
       * @param done
       */
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

      /**
       * 页码变化时更新资源
       * @param page  点击的页码
       */
      pageChange(page) {

        if (this.curTag == '所有') {
          if (this.curBy == 'all') {
            this.getResData(this.curTag, page)
          }
          else {
            this.getResBy(this.curBy, page)
          }
        }
        else {
          this.getResByTagAndOrderZhIndex(this.curTag, 'time', page)
        }

        this.curPage = page

        // window.scrollTo(0,0)
        document.getElementById("res-list-top").scrollIntoView(true)
      },

      /**
       * 下载资源
       * @param id  资源id
       * @param userId  用户id（当前要下载该资源的用户）
       */
      downloadFile(id, userId) {
        downloadFile2(id, userId).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err);
        })
      },

      /**
       * 扣除相应积分
       * @param num 扣除积分数
       */
      subUserPoints(num) {
        this.$store.state.points -= num
      },

      /**
       * 判断用户是否下载过该资源,如果下载过，this.hadPayIt:1 else this.hadPayIt:0
       * @param id  资源id
       * @param userId  用户id
       */
      judUserDownloadRes(id, userId) {
        judUserDownloadRes(id, userId).then(res => {
          this.hadPayIt = res.data.data
        }).catch(err => {
          console.log(err)
        })
      },

      /**
       * 初始化中文下标的 resourcesZhIndex 对象
       */
      initResourceZhIndex() {
        getTags().then(res => {
          let tmp = this.storeState.resourcesZhIndex
          for (let obj of res.data.data) {
            let index = obj.name
            this.allTagName.push(index)
            tmp[index] = {page:0, list:[]}
          }
          this.storeState.resourcesZhIndex = tmp
        }).catch(err => {
          console.log(err)
        })
      },

      /**
       * 搜索资源
       */
      searchRes() {
        searchResByTitle(this.searchResTitle).then(res => {
          this.resourcesZhIndex['所有'].list = res.data.data
        }).catch(err => {
          console.log(err)
        })
      },

      /**
       * 用户添加积分
       * @param userId  用户id
       * @param points  积分值
       */
      addUserPoints(userId, points) {
        addUserPoints(userId, points).then(res => {
          console.log(res)
        }).then(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #f2f2f2;
    color: #333;
    text-align: center;
  }
  .el-aside {
    color: #333;
  }
  .el-main {
    color: #333;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  #top-bar-logo {
    background-color: #f2f2f2;
    margin: 10px;
    padding: 2px;
    width: 300px;
    height: 100px;
    position: relative;
    top: 20px;
  }
  #top-bar-search {
    position: relative;
    width: 49%;
    left: 47%;
    top: -100px;
  }
  #top-bar-search input {
    height: 26px;
    width: 80%;
  }
  #top-bar-search img {
    background-color: #A9AAAA;
    height: 27px;
    margin: 5px 0px -9px 5px;
  }
  .searchbody {
    overflow: hidden;
    background-color: #DDDDDD;
    height: auto;
  }
  .top-bar-title{
    font-family:"幼圆";
    font-size: 30px;
    font-weight: bold;
    color: #42B983;
    float: left;
  }
  .searchbody img {
    float: left;
    display: block;
    padding-top: 1%;
  }
  .searchbody input[type=text]{
    width: 30%;
    padding: 1%;
    margin: 2% 0 2% 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .searchbody input[type=submit] {
    width: 5%;
    background-color: #4CAF50;
    color: white;
    padding: 1%;
    margin: 2% 0 2% 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .searchbody input[type=submit]:hover {
    background-color: #45a049;
  }
</style>
