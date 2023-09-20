<template>
  <swiper
    :slidesPerView="3"
    :centeredSlides="true"
    :spaceBetween="30"
    :loop="true"
    effect="slide"
    :speed="2000"
    :allowTouchMove="false"
    :autoplay="{
      delay: 0,
      disableOnInteraction: false,
    }"
    :modules="[Autoplay]"
  >
    <swiper-slide v-for="(item, index) in skills" :key="index" class="swiper-slide">
      <!-- <img :src="item" alt="Image" /> -->
      <i :class="`iconfont ${item}`"></i>
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Autoplay } from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css';

const skills = ref(['sass', 'JavaScript', 'CSS', 'HTML', 'Iconfont', 'webpack', 'Vue', 'Nodejs', 'typescript', 'a-adobeillustrator', 'a-adobephotoshop', 'Docker']); // 技能列表

const imageList = ref([
  'https://ice.frostsky.com/2023/09/07/4d348831ab4ef88112a19f5efc2741c3.jpeg',
  'https://ice.frostsky.com/2023/09/07/4fc03088862d4256b6df81c9f61a8cf9.jpeg',
  'https://ice.frostsky.com/2023/09/07/94565255cc9e8439decb0dbaf683b565.jpeg',
  'https://ice.frostsky.com/2023/09/07/827c01c1219949cc6f649947f3876dc2.jpeg',
  'https://ice.frostsky.com/2023/09/07/f3ff873adc3d7d095389a092e42f503d.jpeg',
  'https://ice.frostsky.com/2023/09/07/6a8f65ac5f90226096fbea2a8839ee85.jpeg',
  'https://ice.frostsky.com/2023/09/07/ef439fb9ebc4f6704cc0b4dd8d221125.jpeg',
  'https://ice.frostsky.com/2023/09/07/8ed527cc40ab38723cfb339cc2f873d3.jpeg',
  'https://ice.frostsky.com/2023/09/07/0a5c2fedda66a8ed766483596fe20ba4.jpeg',
]);
</script>

<style scoped lang="scss">
@import '../style/iconfont.css';
.swiper {
  width: 100%;
  height: 100%;
  padding: 1.5rem 0 1rem 0;
}

.swiper-slide {
  transform: translate3d(0, 0, 0);
  i{
    font-size: 4rem;
    line-height: 4rem;
  }
}

</style>
