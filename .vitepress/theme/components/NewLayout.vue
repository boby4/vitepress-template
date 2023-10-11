<template>
    <Layout />
    <Copyright />
    <Aplayer />
    <SparkModel />
</template>
<script setup>
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'
import Aplayer from './Aplayer.vue'
const { Layout } = DefaultTheme
</script>

<script>
  var vConsole = new window.VConsole();
</script>
