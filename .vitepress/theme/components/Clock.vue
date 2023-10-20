<template>
  <div class="clock-out">
    <div id="clock">
      <p class="date">{{ date }}</p>
      <p class="time">{{ time }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'

const time = ref('')
const date = ref('')

const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const updateTime = () => {
  const zeroPadding = (num, digit) => {
    let zero = ''
    for (let i = 0; i < digit; i++) {
      zero += '0'
    }
    return (zero + num).slice(-digit)
  }

  const updateClock = () => {
    const cd = new Date()
    time.value =
      zeroPadding(cd.getHours(), 2) +
      ':' +
      zeroPadding(cd.getMinutes(), 2) +
      ':' +
      zeroPadding(cd.getSeconds(), 2)
    date.value =
      zeroPadding(cd.getFullYear(), 4) +
      '-' +
      zeroPadding(cd.getMonth() + 1, 2) +
      '-' +
      zeroPadding(cd.getDate(), 2) +
      ' ' +
      week[cd.getDay()]
  }

  const timerID = setInterval(updateClock, 1000)

  onBeforeUnmount(() => {
    clearInterval(timerID)
  })

  updateClock()
}

updateTime()
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
  text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
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
