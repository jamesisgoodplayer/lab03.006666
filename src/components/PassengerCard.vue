<script setup lang="ts">
//import { ref } from 'vue'
import { useRouter } from 'vue-router';
import type { passengerEvent } from '@/passenger'

const router = useRouter();
const props = defineProps<{
  passenger: passengerEvent
}>()
const goToDetails = () => {
  router.push(`/passenger/${props.passenger._id}`); // 导航到乘客的详细信息页面
};

</script>

<template>
  <div class="event-class" @click="goToDetails"> 
    <div class="event-card">
      <h2>PessergerId:{{ passenger._id }}</h2>
      <h3>NAME:{{ passenger.name }}</h3>
      <p>TRIPS: {{ passenger.trips }}</p>
    </div>
  </div>
  
</template>
<style scoped>
.event-card{
  padding:20px;
  width:250px;
  cursor:pointer;
  border:1px solid #39495c;
  margin-bottom: 18px;
}
.event-card:hover{
   transform: scale(1.01);
   box-shadow: 0 3px 12px 0 rgba(0,0,0,0.2);
}
</style>