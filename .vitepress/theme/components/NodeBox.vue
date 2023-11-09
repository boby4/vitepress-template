<script setup>
import { Position, Handle } from '@vue-flow/core'
const props = defineProps({
  data: Object,
})

</script>
<template>
  <div :class="`${data.selected ? 'addborder' : ''}`">
    <div :class="`custom-${data.type} custom`" :style="data">
      <div class="rich-text">{{ data.label }}</div>
      <img
        ref="myImg"
        v-if="data.type == 'image'"
        :src="data.xlinkHref"
        :style="`object-fit:fill; background: ${data.backgroundColor};`"
      />
      <Handle id="a" type="source" :position="Position.Top" />
      <Handle id="b" type="source" :position="Position.Left" />
      <Handle id="c" type="source" :position="Position.Bottom" />
      <Handle id="d" type="source" :position="Position.Right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom:hover {
  box-shadow: 1px 1px #d8d8d8;
}
.addborder {
  border: 2px dashed #67c23a;
  padding: 1.5px;
}
.custom-square {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 46px;
  border: 1px solid #333;
}
.custom-ysquare {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 46px;
  border: 1px solid #333;
  border-radius: 5px;
}
.custom-oval {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 46px;
  border: 1px solid #333;
  border-radius: 23px;
}
.custom-rhomboid {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #333;
  width: 150px;
  height: 46px;
  transform: skew(-30deg);
  .rich-text {
    transform: skew(30deg);
  }
  .vue-flow__handle {
    transform: skew(30deg);
  }
}
.custom-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border: 1px solid #333;
  border-radius: 100px;
}

.custom-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  .rich-text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
