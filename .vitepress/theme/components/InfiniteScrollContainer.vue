<template>
  <swiper
    :slidesPerView="3"
    :centeredSlides="true"
    :spaceBetween="30"
    :loop="true"
    effect="slide"
    :speed="2000"
    :allowTouchMove="true"
    :autoplay="{
      delay: 0,
      disableOnInteraction: false,
    }"
    :modules="[Autoplay]"
  >
    <swiper-slide v-for="(item, index) in skills" :key="index" class="swiper-slide" :style="{ background: item.color}">
      <!-- <img :src="item" alt="Image" /> -->
      <i :class="`iconfont ${item.title}`"></i>
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Autoplay } from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css';

const skills = ref([
  { title: 'sass', color: '#ffffff' },
  { title: 'JavaScript', color: '#ffffff' },
  { title: 'CSS', color: '#242938' },
  { title: 'HTML', color: '#242938' },
  { title: 'Iconfont', color: '#fff' },
  { title: 'webpack', color: '#242938' },
  { title: 'Vue', color: '#242938' },
  { title: 'Nodejs', color: '' },
  { title: 'typescript', color: '#fff' },
  { title: 'a-adobeillustrator', color: '#f29e39' },
  { title: 'a-adobephotoshop', color: '#57b6e6' },
  { title: 'Docker', color: '' },
]); // 技能列表

const imageList = ref([
  { img: 'https://ice.frostsky.com/2023/09/07/4d348831ab4ef88112a19f5efc2741c3.jpeg', color: 'color1' },
  { img: 'https://ice.frostsky.com/2023/09/07/4fc03088862d4256b6df81c9f61a8cf9.jpeg', color: 'color2' },
  { img: 'https://ice.frostsky.com/2023/09/07/94565255cc9e8439decb0dbaf683b565.jpeg', color: 'color3' },
  { img: 'https://ice.frostsky.com/2023/09/07/827c01c1219949cc6f649947f3876dc2.jpeg', color: 'color4' },
  { img: 'https://ice.frostsky.com/2023/09/07/f3ff873adc3d7d095389a092e42f503d.jpeg', color: 'color5' },
  { img: 'https://ice.frostsky.com/2023/09/07/6a8f65ac5f90226096fbea2a8839ee85.jpeg', color: 'color6' },
  { img: 'https://ice.frostsky.com/2023/09/07/ef439fb9ebc4f6704cc0b4dd8d221125.jpeg', color: 'color7' },
  { img: 'https://ice.frostsky.com/2023/09/07/8ed527cc40ab38723cfb339cc2f873d3.jpeg', color: 'color8' },
  { img: 'https://ice.frostsky.com/2023/09/07/0a5c2fedda66a8ed766483596fe20ba4.jpeg', color: 'color9' },
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
  text-align: center;
  border-radius: 13px;
  margin-top: 10px;
  margin-right: 10px;
  padding: 8px 12px 8px 8px;
  box-shadow: 0 3px 4px 1px rgba(0, 0, 0, 0.1);
  i{
    font-size: 4rem;
    line-height: 4rem;
  }
}

</style>
