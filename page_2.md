---
title: page_2
layout: home
---
<script setup>
import Page from "./.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(5,10)
</script>
<Page :posts="posts" :pageCurrent="2" :pagesNum="2" />