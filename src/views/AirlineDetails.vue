<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import AirlineService from '@/services/AirlineService';
import type { AirlineEvent } from '@/Airline';

const route = useRoute();
const airline = ref<AirlineEvent | null>(null);
const errorMessage = ref<string | null>(null); // 错误消息状态

onMounted(() => {
    fetchAirline(); // 组件挂载时获取航空公司信息
});

const fetchAirline = () => {
    const airlineId = route.params.id;

    AirlineService.getAirline(String(airlineId))
        .then((response) => {
            airline.value = response.data;
            errorMessage.value = null; // 清除错误消息
        })
        .catch((error) => {
            console.error('Error fetching airline details:', error);
            airline.value = null; // 清空航空公司信息
            errorMessage.value = '未找到该航空公司'; // 设置错误消息
        });
};
// 监听路由变化，如果路由ID变化则重新获取航空公司信息
watch(() => route.params.id, fetchAirline);
</script>

<template>
  <div class="airline-details">
    <h1>Airline Details</h1>
    <div v-if="errorMessage" class="error-container">
      <p class="error-message">{{ errorMessage }}</p>
    </div>
    <div v-if="airline" class="details-container">
      <h2>Name: {{ airline.name }}</h2>
      <p>Country: {{ airline.country }}</p>
      <p>Logo: <img :src="airline.logo" alt="Airline Logo" /></p>
      <p>Slogan: {{ airline.slogan }}</p>
      <p>Headquarters: {{ airline.head_quaters }}</p>
      <p>Established: {{ airline.established }}</p>
      <p>Website: <a :href="airline.website" target="_blank">{{ airline.website }}</a></p>
    </div>
  </div>
</template>

<style scoped>
.airline-details {
  max-width: 600px;
  margin: 20px auto; /* 中心对齐，并增加上部边距 */
  padding: 20px;
  border: 1px solid #ccc; /* 边框颜色 */
  border-radius: 8px;
  background-color: #1919b3; /* 背景色 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.error-container {
  color: red; /* 错误消息颜色 */
  text-align: center; /* 居中对齐 */
  margin-top: 20px; /* 上边距 */
}

.details-container {
  margin-top: 20px; /* 顶部边距 */
}

h1 {
  color: #bd1717; /* 标题颜色 */
  font-size: 2.5em; /* 字体大小 */
  text-align: center; /* 中心对齐 */
}

h2 {
  color: #5e5e5e; /* 副标题颜色 */
}

p {
  font-size: 1.2em; /* 字体大小 */
  color: #6a6a6a; /* 段落颜色 */
  margin: 10px 0; /* 段落边距 */
}

a {
  color: #007bff; /* 链接颜色 */
  text-decoration: none; /* 去掉下划线 */
}

a:hover {
  text-decoration: underline; /* 鼠标悬停时加下划线 */
}

img {
  max-width: 100px; /* 设置图片最大宽度 */
  display: block; /* 使图片单独一行 */
  margin: 10px auto; /* 图片上下边距，并居中 */
}
</style>
