import Vue from "vue";
import Router from "vue-router";
import A from "../page/A";
import B from "../page/B";
import C from "../page/C";
import E from "../page/E";
import addInfo from "../components/new-add-info";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: A,
      children: [
        {
          path: "/B",
          component: B
        },
        {
          path: "/C",
          component: C
        }
      ]
    },
    {
      path: "/E",
      component: E
    },
    {
      path: "/addInfo",
      component: addInfo
    }
  ]
});
