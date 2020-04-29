import Vue from "vue";
import Router from "vue-router";
import A from "@/components/A";
import B from "@/components/B";
import C from "@/components/C";
import D from "@/components/D";

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
