import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import work from "../components/work";
import myhead from "../components/myhead";
import myfoot from "../components/myfoot";
import login from "../components/login";
import workInfo from "../components/work/workInfo";
import workindex from "../components/workindex";
import addpost from "../components/addpost";
import notfound from "../components/Page404";
import testUpload from "../components/testUpload";
import primarypage from "../components/primarypage";
//hhq
import Resource from '../views/resource/Resource.vue';
import Share from '../views/resource/Share';
//wzy
import topic from '../components/wzy/topic'
import topiccom from '../components/wzy/topiccom'
import recommend from '../components/wzy/recommend'
//hrc
import square from '../components/hrc/square'
/*const Resource = () => import('../views/resource/Resource.vue')
const Share = () => import('../views/resource/Share')*/
//wj
import personal from "../components/personal";
import information from "../components/personal/information"
import comments from "../components/personal/comments"
import fans from "../components/personal/fans"
import journal from "../components/personal/journal"
import photos from "../components/personal/photos"
import searchpage from "../components/personal/searchpage"

import VueRouter from 'vue-router'

Vue.use(Router)


const router= new Router({
  /*base:'/vue-peashooter/',*/
  routes: [
    {
      path: '/work',
      //component: topic,
      components: {
        header: myhead,
        body: work,
        footer: myfoot
      },
      children:[
        {
          path:'/work/-1',
          component:workindex
        },
        {
        path:'/work/:id',
        component:workInfo
        }

       ]
    },

    {
  path: '/personal',
  components: {
    header: myhead,
    body: personal,
    footer: myfoot
  },
  redirect:'/personal/information',
  children:[
    {
      path:'/personal/information',
      component:information
    },
    {
      path:'/personal/comments',
      component:comments
    },
    {
      path:'/personal/fans',
      component:fans
    },
    {
      path:'/personal/journal',
      component:journal
    },
    {
      path:'/personal/photos',
      component:photos
    },
    {
      path:'/personal/searchpage',
      component:searchpage
    },
   ]
},
    {
      path:'/login',
      component:login
    },
    {
      path:'/addpost',
      component:addpost
    },
    {
      path:'/testupload',
      component:testUpload
    },
    {
      path:'/primarypage',
      component:primarypage
    },
    {
      path: '/resource',
      name: 'Resource',
      component: Resource,
    },
    {
      path: '/resource/share',
      name: 'Share',
      component: Share
    },
    {
      path:'/topic',
      component:topic
    },
    {
      path:'/topic/:id',
      component:topiccom
    },
    {
      path:'/recommend',
      component:recommend
    },
    {
      path:'/square',
      component:square
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/*', // 页面不存在的情况下会跳到404页面
      component: notfound,
    },
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path==='/login'){
    return next()
  }
  const tokenStr=window.sessionStorage.getItem('token');

  if(!tokenStr){
    return next('/login');
  }
  next()
})

export default router;
