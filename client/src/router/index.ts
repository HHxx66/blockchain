import Vue from "vue";
import VueRouter, { RouteConfig, RawLocation, Route } from "vue-router";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation) {
  return originalPush
    .call<VueRouter, [RawLocation], Promise<Route>>(this, location)
    .catch((_err:Error) => {
      return this.currentRoute
    })
}

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: 'index',
    redirect: '/home',
    component: () => import( /* webpackChunkName: "index" */ '@/views/index.vue'),
    meta: {
      title: '首页' 
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import( /* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: {
          title: '首页'
        },
      },
      {
        path: "/companyInfo",
        name: "CompanyInfo",
        component: () => import(/* webpackChunkName: "companyInfo" */ "@/views/info/CompanyInfo.vue"),
        meta: {
          title: '公司信息'
        }
      },
      {
        path: "/getReceiptsInList",
        name: "ReceiptsInList",
        component: () => import(/* webpackChunkName: "ReceiptsInList" */ "@/views/check/ReceiptsInList.vue"),
        meta: {
          title: '借入票据'
        }
      },
      {
        path: "/getReceiptsOutList",
        name: "ReceiptsOutList",
        component: () => import(/* webpackChunkName: "ReceiptsOutList" */ "@/views/check/ReceiptsOutList.vue"),
        meta: {
          title: '借出票据'
        }
      },
      {
        path: "/tradingWithBalance",
        name: "TradingWithBalance",
        component: () => import(/* webpackChunkName: "tradingWithBalance" */ "@/views/trade/TradingWithBalance.vue"),
        meta: {
          title: '金融交易'
        }
      },
      {
        path: "/tradingWithCredit",
        name: "TradingWithCredit",
        component: () => import(/* webpackChunkName: "tradingWithCredit" */ "@/views/trade/TradingWithCredit.vue"),
        meta: {
          title: '开具信用票据',
        },
      },
      {
        path: "/tradingWithReceipt",
        name: "TradingWithReceipt",
        component: () => import(/* webpackChunkName: "tradingWithReceipt" */ "@/views/trade/TradingWithReceipt.vue"),
        meta: {
          title: '转让票据',
        },
      },
      {
        path: "/financing",
        name: "Financing",
        component: () => import(/* webpackChunkName: "financing" */ "@/views/trade/Financing.vue"),
        meta: {
          title: '票据融资',
        },
      },
      {
        path: "/arrearsPaying",
        name: "ArrearsPaying",
        component: () => import(/* webpackChunkName: "arrearsPaying" */ "@/views/trade/ArrearsPaying.vue"),
        meta: {
          title: '偿还&销毁票据',
        },
      },
      {
        path: "/setting",
        name: "Setting",
        component: () => import(/* webpackChunkName: "setting" */ "@/views/Setting.vue"),
        meta: {
          title: '设置'
        },
      },
      {
        path: "/404",
        name: "404",
        component: () => import( /* webpackChunkName: "E404" */ '@/views/404/404.vue'),
        meta: {
          title: '错误'
        },
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import( /* webpackChunkName: "login" */ '@/views/login.vue'),
    meta: {
      title: '登录'
    },
  },
  {
    path: "*",
    name: "any",
    redirect: '/404',
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  NProgress.start();
  // if (!localStorage.getItem("account")) {
  //   if (to.path == '/login') {
      next()
  //   } else {
  //     next({
  //       path: '/login'
  //     })
  //   }
  // } else {
  //   if (to.path == '/login') {
  //     next({
  //       path: '/'
  //     })
  //   } else {
  //     next()
  //   }
  // }
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
