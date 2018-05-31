import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import util from '../utils/util';
//引入路由
import {loginRouter} from './router';
import {mainRouter} from './router';

Vue.use(VueRouter);
const RouterConfig={
  //引入的路由
  routes: [loginRouter,mainRouter]
};
export const router =new VueRouter(RouterConfig);

//守卫
router.beforeEach((to,from,next)=>{
  iView.LoadingBar.start();
  //前序拦截
  //设置页面title
  util.title(to.meta.title);
  //检验cookie并导航
  if(to.name==='login'){
    console.log("next()");
    next();
  }else{
    console.log(to.name);
    next();
  }
});
router.afterEach((to) => {
  //后续收尾
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
