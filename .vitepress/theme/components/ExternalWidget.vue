<template>
<div class="weather">
  <div id="he-plugin-simple"></div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
  window.WIDGET = widgetConfig
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0";
  document.getElementsByTagName("head")[0].appendChild(script);
});

const widgetConfig = {
  "CONFIG": {
    "modules": "12034",
    "background": "5",
    "tmpColor": "FFFFFF",
    "tmpSize": "16",
    "cityColor": "FFFFFF",
    "citySize": "16",
    "aqiColor": "FFFFFF",
    "aqiSize": "16",
    "weatherIconSize": "18",
    "alertIconSize": "16",
    "padding": "10px 10px 10px 10px",
    "shadow": "0",
    "language": "auto",
    "borderRadius": "5",
    "fixed": "false",
    "vertical": "left",
    "horizontal": "left",
    "key": "74a9808071644e5085c7f53cbfd6bc18"
  }
}
</script>

<style>
.weather{
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 99;
}
</style>