import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/app";
import Home from "../views/Home.vue";
import Guide from "../views/Guide.vue";
import Terms from "../views/Terms.vue";
import Privacy from "../views/Privacy.vue";
import List from "../views/List.vue";
import Edit from "../views/Edit.vue";
import Preview from "../views/Preview.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/guide",
    name: "Guide",
    component: Guide,
  },
  {
    path: "/terms",
    name: "Terms",
    component: Terms,
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Privacy,
  },
  {
    path: "/list",
    name: "List",
    component: List,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,
    meta: { requiresAuth: true },
  },
  {
    path: "/preview",
    name: "Preview",
    component: Preview,
    meta: { requiresAuth: true },
  },
  {
    path: "*",
    redirect: { path: "/" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((recode) => recode.meta.requiresAuth);
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next({ path: "/" });
  } else if (to.name === "Preview" && from.name !== "Edit") {
    next({ path: "/list" });
  } else {
    next();
  }
  if (to.name === "Home" && (await firebase.getCurrentUser())) {
    next({ path: "/list" });
  }
});

export default router;
