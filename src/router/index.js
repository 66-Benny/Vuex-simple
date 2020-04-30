import Vue from "vue";
import Router from "vue-router";
import A from "../page/A";
import B from "../page/B";
import C from "../page/C";
import D from "../page/D";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: A,
      children: [
        {
          path: "/B",
          component: B,
          children: [
            { path: "/B/C", component: C },
            { path: "/B/D", component: D }
          ]
        }
      ]
    }
  ]
});
