<template>
  <div v-if="isVisible" :class="[type, position]" class="notification">
    <!-- <i class="iconfont tixing"></i> -->
    {{ message }}
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const message = ref('');
const isVisible = ref(false);
const duration = ref(3000); // 默认显示时间
const type = ref('notification-info');
const position = ref(`position-top-center`);

const show = (data) => {
  isVisible.value = true;
  message.value = data.message || data;
  type.value = `notification-${data.type || 'info'}`
  position.value = `position-${data.position || 'top-center'}`
  duration.value = data.duration || 3000
  setTimeout(() => {
    hide();
  }, duration.value);
};

const hide = () => {
  isVisible.value = false;
};

defineExpose({
  show
})

</script>

<style lang="scss" scoped>
@import url('../style/iconfont.css');

.notification {
  position: fixed;
  padding: .3rem 2rem;
  border-radius: .2rem;
  font-size: 1rem;
  color: white;
  z-index: 9999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); /* 阴影效果 */
  border: 2px solid transparent; /* 边框 */
  transition: opacity 0.3s, transform 0.3s;
  i {
    font-size: 1.2rem;
    padding-right: .8rem;
    text-align: center;
  }
}

.notification-info {
  background-color: #3498db; /* 蓝色 */
}

.notification-success {
  background-color: #2ecc71; /* 绿色 */
}

.notification-warning {
  background-color: #f1c40f; /* 黄色 */
}

.notification-error {
  background-color: #e74c3c; /* 红色 */
}

.position-top-center {
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

.position-top-right {
  top: 1rem;
  right: 1rem;
}

.position-top-left {
  top: 1rem;
  left: 1rem;
}

.position-bottom-right {
  bottom: 1rem;
  right: 1rem;
}

.position-bottom-left {
  bottom: 1rem;
  left: 1rem;
}
</style>
