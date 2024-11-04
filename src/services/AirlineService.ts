import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.instantwebtools.net/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getAirline(id: string) { // 获取单个航空公司信息
    return apiClient.get(`/airlines/${id}`);
  }
}
