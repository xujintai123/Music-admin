import Vue from 'vue'
import Router from 'vue-router'
import { LoadingBar } from 'view-design'

// 路由
import Login from "@/views/login"
import Home from "@/views/Home"
import NotFound from "@/views/404"  // 404页面
import Index from "@/views/Index"
import ManageMusic from "@/views/managemusic"   // 歌曲管理
import User_Service from "@/views/user_service"  // 用户前台开机服务
import AllOrders from "@/views/allorders"  // 所有订单
import AdminLikes from "@/views/adminlikes"  // 所有订单
import ManageUser from "@/views/manage/ManageUser"  //用户管理
import ManageManager from "@/views/manage/ManageManager"  //管理员管理
import ManageRemarks from "@/views/manage/ManageRemarks"  //评论管理
import ManageRemarksDetail from "@/views/manage/ManageRemarksDetail"  //评论管理


Vue.use(Router)

const vueRouter = new Router({
  mode:"history",
  base: process.env.BASE_URL,
  routes:[
      {path:"/", redirect:"/admin"},
      {
          path:"/admin",
          component:Home,
          children:[
            {path:'', redirect:"index"},
            {path:'index', name:"后台", component:Index},
            {path:'manage/music', name:"managemusic", component:ManageMusic, meta:{title:"音乐管理"}},
            {path:'user_service', name:"user_service", component:User_Service, meta:{title:"用户开机"}},
            {path:'allorders', name:"allorders", component:AllOrders, meta:{title:"历史订单"}},
            {path:'music/likes', name:"adminlikes", component:AdminLikes, meta:{title:"音乐点播平台"}},
            {path:'manage/user', name:"manageuser", component: ManageUser, meta:{title:"用户管理"}},
            {path:'manage/manager', name:"managemanager", component:ManageManager, meta:{title:"管理员管理"}},
            { path: 'manage/remarks', name: "manageremarks", component: ManageRemarks, meta: { title: "评论管理" } },
            {path:'manage/remarks/blog/:id/:songName/:artist/:poster/:playcount', name:"remarksdetail", component:ManageRemarksDetail, meta:{title:"评论管理详情"}},
          ]
      },
      {
        path:"/login",
        name:"login",
        component:Login,
        meta:{
          title:"后台登录"
        }
      },
      {
          path:"*",
          name:"NotFound",
          component:NotFound,
          meta:{
              title:"页面找不到"
          }
      }
  ]
})

vueRouter.beforeEach((to, from, next) => {
    LoadingBar.start();
    const adminToken = localStorage.adminToken;
    if(to.path == "/login"){
        if(adminToken){
            next("/");
        }else{
            next();
        }
    }else{
      // next();
        if(adminToken){
            next();
        }else{
            next("/login");
        }
    }
})

vueRouter.afterEach((to, next) => {
    LoadingBar.finish();
    if(to.meta.title){
        document.title = to.meta.title;
    }else{
        document.title = "音乐点播系统--后台管理系统";
    }
})




export default vueRouter