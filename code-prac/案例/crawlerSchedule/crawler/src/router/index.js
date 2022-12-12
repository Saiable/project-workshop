import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  // {
  //   path: "/test",
  //   name: "test",
  //   component: () => import("@/test/index.vue"),
  // },
  {
    path: "/home",
    redirect: "/home/echarts",
    name: "home",
    component: () => import("@/layout/home/index.vue"),
    children: [
      {
        path: "echarts",
        name: "echarts",
        component: () => import("@/layout/home/echarts/index.vue"),
      },
      {
        name: "jobs",
        path: "jobs",
        component: () => import("@/layout/home/jobs/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
