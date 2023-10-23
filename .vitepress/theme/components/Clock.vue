<template>
  <div class="clock-out">
    <div id="clock">
      <p class="date">{{ date }}</p>
      <p class="time">{{ time }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';

const time = ref('');
const date = ref('');
const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const zeroPadding = (num, digit) => {
  return num.toString().padStart(digit, '0');
};

const updateClock = () => {
  const now = new Date();
  time.value = `${zeroPadding(now.getHours(), 2)}:${zeroPadding(now.getMinutes(), 2)}:${zeroPadding(now.getSeconds(), 2)}`;
  date.value = `${now.getFullYear()}-${zeroPadding(now.getMonth() + 1, 2)}-${zeroPadding(now.getDate(), 2)} ${week[now.getDay()]}`;
};

onMounted(() => {
  updateClock();
  const timerID = setInterval(updateClock, 1000);

  onBeforeUnmount(() => {
    clearInterval(timerID);
  });
});
</script>


<style scoped lang="scss">
@media screen and (min-width: 900px) {
  .clock-out {
    margin-right: 15px;
  }
}
.clock-out {
  background: radial-gradient(ellipse at center, #344256 1%, #000000 80%);
  background-size: 100%;
  transition: all 0.3s;
  padding: 1.5rem;
  box-shadow: 0 0.1rem 0.2rem 0.1rem rgba(7, 17, 27, 0.08);
}
#clock {
  font-family: 'Share Tech Mono', monospace;
  text-align: center;
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
  .time {
    letter-spacing: 0.05em;
    font-size: 40px;
    padding: 15px 0;
    color: #daf6ff;
  }

  .date {
    color: #daf6ff;
    width: 100%;
    letter-spacing: 0.1em;
    font-size: 14px;
  }
}
</style>
