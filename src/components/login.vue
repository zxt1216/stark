<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login" @keydown.enter="handle">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          <span>欢迎登录</span>
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="username">
              <Input v-model="form.username" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password" :error="form.error">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="16" type="locked"></Icon>
                </span>
              </Input>
              <Row>
                <Col span="8" offset="1"><Checkbox v-model="form.remember">记住密码</Checkbox></Col>
                <Col span="6" offset="9"><a>忘记密码</a></Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button @click="handle" type="primary" long>登陆</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
      <!--<Row>-->
        <!--<Col span="6" offset="18"><a>注册新用户</a></Col>-->
      <!--</Row>-->
    </div>
  </div>
</template>

<script>
  import cookie from 'js-cookie';
  import md5 from 'js-md5';
  import axios from 'axios';
  export default {
    data() {
      return {
        form: {
          username: cookie.get("username"),
          password: cookie.get("password"),
          //是否记住密码
          remember:cookie.get("password")!==undefined,
          error:''
        },
        rules: {
          username: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handle() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.form.error='';
            cookie.set("username", this.form.username);
            if(cookie.get("password")===undefined){//cookie中没有密码,加密存储
              this.form.password=md5(this.form.password);
              if(this.form.remember){
                cookie.set("password", this.form.password, {expires: 15});
              }
            }else {//cookie中含有密码
              if(this.form.password.length===32){//MD5为32位,特殊处理一下
                if(this.form.password===cookie.get("password")){
                  if (this.form.remember) {
                    cookie.set("password", this.form.password, {expires: 15});
                  }else{
                    cookie.remove("password");
                  }
                }else{
                  cookie.remove("password");
                  this.form.password='';
                  this.form.error="用户名或密码不正确";
                  return;
                }
              }else{//不是32位说明不是回显的密码,直接加密后台
                this.form.password=md5(this.form.password);
                if (this.form.remember) {
                  cookie.set("password", this.form.password, {expires: 15});
                }else{
                  cookie.remove("password");
                }
              }
            }
            //登陆后台
            this.$router.push({
              name: 'main'
            });
          }
        });
      }
    }
  }
</script>

<style>

</style>
