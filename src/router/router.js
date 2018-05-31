
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => { require(['@/components/login.vue'], resolve); }
};
export const mainRouter = {
  path: '/main',
  name: 'main',
  meta: {
    title: '主页面'
  },
  component: resolve => { require(['@/components/Main.vue'], resolve); }
};
