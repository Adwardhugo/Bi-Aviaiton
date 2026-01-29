import axios from "axios";
const request = axios.create({
    baseURL:'/api',
    timeout:10000,
});
//请求拦截器
 request.interceptors.request.use(config=>{
    //可以在请求发送之前做一些处理，比如添加token
    return config;
 },error=>{
    return Promise.reject(error);
 });
//响应拦截器
//回到客户端之前，处理返回的数据
request.interceptors.response.use(response=>{
    //可以在接收响应数据之前做一些处理
    return response.data;
 },error=>{
    return Promise.reject(error);
 });

export default request;