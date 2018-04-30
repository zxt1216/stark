import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import Cookies from 'js-cookie';
import Util from '../utils/util';
//引入路由
import {loginRouter} from './router';

Vue.use(VueRouter);
const RouterConfig={
  //引入的路由
  routes: [loginRouter]
};
export const router =new VueRouter(RouterConfig);

//守卫
router.beforeEach((to,from,next)=>{
  iView.LoadingBar.start();
  //前序拦截
  //设置页面title
  //检验cookie并导航
  console.log("_________OUT__________"+to.name);
  if(to.name==='login'){
    console.log("next()");
    next();
  }else{
    console.log("next({name: 'login'})");
    next({name: 'login'});
  }
});
router.afterEach((to) => {
  //后续收尾
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
