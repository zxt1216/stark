import axios from 'axios';
import env from '../../build/env'

let util={};

util.title=function(title){
  window.document.title=title || 'stark';
}

const ajaxUrl=env==='development'?'http://127.0.0.1:8880':'http://127.0.0.1:8880';

axios.interceptors.request.use(config=>{
  config.headers['token']=this.localStorage.getItem(this.localStorage.getItem("username"));
},error=>{

});
axios.interceptors.response.use(response=>{
  console.log(response.status);
},error=>{
  console.log(error.response.status);
});
util.axios=axios.create({
  baseURL:ajaxUrl,
  timeout:30000
});
util.parse=function(msg,vm){
  if(msg.code===0){
    return true;
  }
  if(msg.code===1476395008){
    return false;
  }
  return false;
}

export default util;
