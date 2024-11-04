<script setup lang="ts">
import PassengerCard from '@/components/PassengerCard.vue';
import PassengerService from '@/services/PassengerService';
import type { passengerEvent } from '@/passenger'
import { ref ,onMounted} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const passengers= ref<passengerEvent[]>()
  onMounted(() => {
  PassengerService.getEvents()
    .then((response) => {
      if (response.data && Array.isArray(response.data.data)) { // 确保包含 data 属性并且是数组
        passengers.value = response.data.data; // 从 response 中提取 data 数组
      } else {
        console.error('返回的数据格式不正确:', response.data);
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
      router.push({
        name: '404-resource-view',
        params: { resource: 'event' }
      });
    } else {
      console.error('发生错误:', error);
    }});
})
</script>
<template>
    <h1>Passenger's informaion</h1>
    <!-- new element -->
    <div class="events">
      <div v-for="passenger in passengers" :key="passenger._id" class="event-item">
        <PassengerCard :passenger="passenger" />
      </div>
    </div>
  </template>
  <style scoped>
  .events {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .event-item {
    display: flex;
    justify-content:space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  </style>