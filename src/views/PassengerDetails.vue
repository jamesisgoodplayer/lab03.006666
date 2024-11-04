<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PassengerService from '@/services/PassengerService'; // 确保服务引入正确
import type { passengerEvent } from '@/passenger'
const route = useRoute();
const router = useRouter();
const passenger = ref<passengerEvent | null>(null);

onMounted(() => {
  const passengerId = route.params.id;

  PassengerService.getPassenger(String(passengerId)) // 获取单个乘客信息
    .then((response) => {
      passenger.value = response.data; // 将响应数据赋值给 passenger
    })
    .catch((error) => {
      console.error('Error fetching passenger details:', error);
    });
});
const goToAirlineDetails = (airlineId: string) => {
  router.push(`/airline/${airlineId}`); // 使用航空公司 ID 导航
};
</script>

<template>
  <div class="passenger-details">
    <h1>Passenger Details</h1>
    <div v-if="passenger" class="details-container">
      <h2>Passenger ID: {{ passenger._id }}</h2>
      <h3>Name: {{ passenger.name }}</h3>
      <p>Trips: {{ passenger.trips }}</p>
      <h4>Airlines:</h4>
      <ul class="airline-list">
        <li v-for="airline in passenger.airline" :key="airline._id" @click="goToAirlineDetails(airline._id)" class="airline-item">
          {{ airline.name }} from {{ airline.country }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.passenger-details {
  max-width: 600px;
  margin: 20px auto; /* 中心对齐，并增加上部边距 */
  padding: 20px;
  border: 1px solid #ccc; /* 边框颜色 */
  border-radius: 8px;
  background-color: #1919b3; /* 背景色 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
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

h3 {
  color: #007BFF; /* 名字颜色 */
}

p {
  font-size: 1.2em; /* 字体大小 */
  color: #6a6a6a; /* 段落颜色 */
  margin: 10px 0; /* 段落边距 */
}

h4 {
  margin-top: 20px; /* 顶部边距 */
  color: #2c3e50; /* 航空公司标题颜色 */
}

.airline-list {
  list-style-type: none; /* 移除默认列表样式 */
  padding-left: 0; /* 移除左侧内边距 */
}

.airline-item {
  background-color: #e9ecef; /* 背景色 */
  padding: 10px; /* 内边距 */
  margin: 5px 0; /* 上下边距 */
  border-radius: 4px; /* 圆角 */
  transition: background-color 0.3s; /* 背景颜色平滑过渡 */
}

.airline-item:hover {
  background-color: #d1d1d1; /* 悬停时背景色 */
}
</style>