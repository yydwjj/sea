// api.js
import axios from 'axios';

// 创建一个 axios 实例
const service = axios.create({
    baseURL: '/api', // 使用 Vite 代理配置的前缀
    timeout: 5000, // 请求超时时间
});

// 封装获取数据的方法
export const getTestData = () => {
    return service.get('/test');
};