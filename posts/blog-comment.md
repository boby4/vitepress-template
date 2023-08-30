---
date: 2023-08-24
title: 个人博客利用github接入评论组件
tags:
- 组件
description: 利用GitHub App的utterances，一个基于 GitHub 问题构建的轻量级评论小部件。使用 GitHub 问题进行博客评论、维基页面等！
---

# **个人博客利用github接入评论组件**

## **前提**

利用GitHub App的utterances，一个基于 GitHub 问题构建的轻量级评论小部件。使用 GitHub 问题进行博客评论、个人网站页面等！以下基于vitepress和vue3实现，不同项目情况基本一致

## **实现效果**

![评论组件](https://ice.frostsky.com/2023/08/24/aeea1fcb8598ea41d46252feb028282d.png)

## **操作步骤**

* 先在github创建一个存储评论的仓库，***注意仓库一定要是public***，记住仓库名称，后面创建utterances需要用到

![评论](https://ice.frostsky.com/2023/08/24/66995578035b31b1bf3fc0c2bd4dcd8d.png)

* 在github上面创建一个utterances APP，进入<a style="color:blue" href="https://github.com/apps/utterances">utterances</a>，之后点击install

![utterances](https://ice.frostsky.com/2023/08/24/3541441a29f631cb000deab62525b5f3.png)

* 创建成功之后，会提示让你选择仓库，可以选择所有仓库，也可以指定你创建的评论仓库，指定我的刚才评论仓库，这样所有的评论都会存放在这个仓库里

![utterances](https://ice.frostsky.com/2023/08/24/ecbda308a2128e2764bc3f90cb66e995.png)

到这我们的评论组件就创建好了，接下来就是如何使用

## **创建一个comment.vue组件**
```vue
<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
const utterancesRef = ref()
// 主题属性
const { theme, isDark } = useData()
onMounted(() => {
    nextTick(() => {
        let { repo, issueTerm = 'pathname' } = theme.value.comment
        if (repo) {
            let utterances = document.createElement('script')
            utterances.async = true
            // 引入utterances
            utterances.setAttribute('src', 'https://utteranc.es/client.js')
            // 你的评论仓库地址
            utterances.setAttribute('repo', repo)
            utterances.setAttribute('issue-term', issueTerm)
            // 主题动态配置
            utterances.setAttribute('theme', isDark.value ? 'github-dark' : 'github-light')
            // 跨域设置，默认这个就可以
            utterances.setAttribute('crossorigin', 'anonymous')
            utterancesRef.value.appendChild(utterances)
        }
        // 监听主题变化，重新加载评论组件
        watch(isDark, (newVal, oldVal) => {
            if (newVal !== oldVal) window.location.replace(window.location?.href)
        })
    })
})
</script>
<template>
    <div ref="utterancesRef"></div>
</template>
<style>
.utterances {
    max-width: inherit !important;
}
</style>
```

## **使用comment.vue组件**
挂载到全局的组件上
```
app.component('Comment', Comment);

// 在你的md文件最下面引用这个组件即可
<Comment />
```
<Comment />
