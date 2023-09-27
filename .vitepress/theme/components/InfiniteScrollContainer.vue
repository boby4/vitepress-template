<template>
  <swiper
    :slidesPerView="4"
    :centeredSlides="true"
    :spaceBetween="15"
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
    <swiper-slide
      v-for="(item, index) in imageList"
      :key="index"
      class="swiper-slide"
    >
      <img :src="item" alt="" />
      <!-- <i :class="`iconfont ${item.title}`"></i> -->
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const skills = ref([
  { title: 'sass', color: '#ffffff' },
  { title: 'CSS', color: '#242938' },
  { title: 'JavaScript', color: '#ffffff' },
  { title: 'HTML', color: '#242938' },
  { title: 'Iconfont', color: '#fff' },
  { title: 'Vue', color: '#242938' },
  { title: 'Nodejs', color: '' },
  { title: 'typescript', color: '#fff' },
  { title: 'a-adobeillustrator', color: '#f29e39' },
  { title: 'a-adobephotoshop', color: '#57b6e6' },
  { title: 'webpack', color: '#242938' },
  { title: 'Docker', color: '' },
  { title: 'xiaochengxuguanli3x', color: '' },
]) // 技能列表

const imageList = ref([
  'https://i.mji.rip/2023/09/21/bfc560470393e9b56bb09da9a1ef6408.png',
  'https://i.mji.rip/2023/09/21/5998f3961581623105eddf47160decc5.png',
  'https://i.mji.rip/2023/09/21/43aaa64f71aa6aabba9055368de1357c.png',
  'https://i.mji.rip/2023/09/21/05afea2fe0c016aa070f6be50af3311c.png',
  'https://i.mji.rip/2023/09/21/7ca328af82a2f2d64f896c5d0d4ce1a8.png',
  'https://i.mji.rip/2023/09/21/0c0f27bfcff9db8c68006e70d092af87.png',
  'https://i.mji.rip/2023/09/21/07e2fb0096800311572f4163b9e070f0.png',
  'https://i.mji.rip/2023/09/21/62c953e47517461fe802b9daa19ded56.png',
  'https://i.mji.rip/2023/09/21/66f7e42e5963da1981322da6b6b500aa.png',
  'https://i.mji.rip/2023/09/21/0e5f71674e9b7380d2d08d10cbf6ea89.png',
  'https://i.mji.rip/2023/09/21/360e24517f2d66a77235e5b93dce3727.png',
  'https://i.mji.rip/2023/09/21/15572a23669a960eb619329a04d8e829.png',
  'https://i.mji.rip/2023/09/21/90b84c4ef7107b0589b84f9619dd321f.png',
  'https://i.mji.rip/2023/09/21/391c3b6bef88f1b5874b8dab75fcfba7.png',
  'https://i.mji.rip/2023/09/21/a74cf93efcc1b5e07e1b7bca46123671.png',
  'https://i.mji.rip/2023/09/21/73335ed420db8284382766fdb2952213.png',
])
</script>

<style lang="scss">
@import '../style/iconfont.css';
.swiper {
  background: none;
  width: 100%;
  height: 100%;
  padding: 1.5rem 0 1rem 0;
}
.swiper-slide {
  background: none;
  transform: translate3d(0, 0, 0);
  img {
    width: 4.2rem;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.1);
  }
  i {
    font-size: 4rem;
    line-height: 4rem;
  }
}
</style>
