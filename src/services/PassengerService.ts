import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'https://api.instantwebtools.net/v1',
    withCredentials:false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents() {
        return apiClient.get('/passenger');
    },
    getPassenger(id: string) { // 新增获取单个乘客的方法
        return apiClient.get(`/passenger/${id}`);
      }
}