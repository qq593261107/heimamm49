import axios from 'axios'
import { Message } from 'element-ui'
import {getToken} from './token.js'
var instance = axios.create({
    baseURL: process.env.VUE_APP_URL,   //设置基地址
    withCredentials: true //跨域照样协带cookie
});

instance.interceptors.request.use(function (config) {
    window.console.log(config)
    // 在发送请求之前做些什么
    if (getToken()) {
        config.headers.token = getToken();
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    console.log('响应拦截器')
    console.log(response)
    // 可以对响应的值进行一些处理
    // return response;
    // return response.data;
    if (response.data.code ==200) {
        return response.data
    } else {
        Message.error(response.data.message)
        return Promise.reject("error");
    }
}, function (error) {
    // 可以在这里对错误进行一些处理
    return Promise.reject(error);
});

export default instance