<template>
  <div id="page">
    <div class="image-grid">
      <div v-for="(item, index) in img" :key="index" class="image-container">
        <a data-fancybox="gallery" :href="item.download_url" :data-caption="item.name">
          <img class="zoomable-image" :src="item.download_url"/>
        </a>
        <button v-if="item.download_url" @click="deleteImage(item)" class="delete-button">删除</button>
      </div>
    </div>
  </div>
  <Fancybox />
</template>

<script setup>
import { defineEmits } from 'vue';
const props = defineProps({
  img: Array,
});

const emit = defineEmits();
const deleteImage = (item) => {
  emit('delete', item);
};
</script>

<style lang="scss" scoped>
#page {
  margin-top: 1.5rem;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 自适应列数，最小列宽200px */
  gap: 12px; /* 图片之间的间隔 */
}

.image-container {
  border-radius: .5rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s;
  aspect-ratio: 16/9; /* 设置图片容器的宽高比例为16:9，根据需要进行调整 */
}

.image-container:hover {
  .zoomable-image {
    transform: scale(1.1);
  }
}

img.zoomable-image {
  object-fit: cover;
  max-width: 100%;
  height: auto;
  transition: transform 0.2s;
}

.delete-button {
  color: gray;
  padding: 0 5px;
  font-size: .5rem;
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
