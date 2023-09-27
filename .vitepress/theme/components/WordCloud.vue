<template>
  <vue3-word-cloud
    style="height: 250px; width: 100%;"
    :words="generateRandomColors(data)"
    font-family="Roboto"
    rotation-unit="deg"
    font-size-ratio="2"
  >
    <template v-slot="{text, word}">
      <a :title="`#${text}: ${word.value}`" style="cursor: pointer;" :href="withBase(`/pages/tags?tag=${text}`)">
        {{ text }}
      </a>
    </template>
  </vue3-word-cloud>
</template>
<script setup>
import { withBase } from 'vitepress'
import Vue3WordCloud from 'vue3-word-cloud'
import { useData } from 'vitepress'
import { ref,computed } from 'vue'
import { initTagsParams, initTags } from '../../utils/functions'
const { theme } = useData()
const data = computed(() => initTagsParams(theme.value.posts))
const generateRandomColors = (words) => {
  // 为每个词语生成随机颜色
  return words.map((word) => ({
    text: word.selectTag, // 标签名称
    value: word.item.length, // 标签个数
    weight: getRandomSize(), // 单词权重
    // spacing: 10, //单词之间的间距
    color: randomColor(), //单词颜色
    // rotation: getRandomRotation(), // 单词旋转角度
  }));
};

const randomColor = () => {
  // 生成随机颜色
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const getRandomSize = () => {
  return Math.floor(Math.random() * (20 - 1 + 1) + 1); // 随机大小在1到20之间
}

// 获取随机旋转角度
const getRandomRotation = () => {
  const randomAngle = Math.random() < 0.5 ? 0 : 90; // 随机选择45度或90度
  return randomAngle;
}
</script>
