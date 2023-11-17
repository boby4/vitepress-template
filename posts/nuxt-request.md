---
date: 2023-11-10
title: Nuxt3 useFetch请求封装
tags:
- Nuxt
- Vue
description: Vue3+Nuxt3 封装Nuxt自带请求API-useFetch,个可组合函数，可以直接在设置函数、插件或路由中调用。它返回响应式的可组合函数，并处理将响应添加到Nuxt的负载中，以便在页面水合时可以从服务器传递给客户端，而无需在客户端重新获取数据
---

# **Nuxt3 useFetch请求封装**

Vue3+Nuxt3 封装Nuxt自带请求API`useFetch`一个可组合函数，可以直接在设置函数、插件或路由中调用。它返回响应式的可组合函数，并处理将响应添加到Nuxt的负载中，以便在页面水合时可以从服务器传递给客户端，而无需在客户端重新获取数据。

* Nuxt3 useFetch文档地址 <a href="https://nuxt.com.cn/docs/api/composables/use-fetch">https://nuxt.com.cn/docs/api/composables/use-fetch</a>

* 根据文档我们可以了解到useFetch其实就是一个组合封装函数，包装了`useAsyncData`和`$fetch`，它根据URL和fetch选项自动生成一个键，根据服务器路由提供请求URL的类型提示，并推断API响应类型。

## 环境变量

根目录新建.env文件，添加环境变量

```bash
NUXT_PUBLIC_API_BASE = "http://你的服务器地址"
NUXT_API_SECRET = "你的服务器请求秘钥"
```

## 修改全局配置

在`nuxt.config.js`中添加`runtimeConfig`运行时配置

```typescript
export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  },
  devtools: { enabled: true },
  runtimeConfig: {
    Token: 'token',
    apiSecret: process.env.NUXT_API_SECRET, // 秘钥
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE, // 服务器地址
    }
  },
})
```

## 封装请求函数

在`composables`目录下新建 `useCustomFetch.ts` 文件，添加如下代码:

```typescript
import { showToast } from 'vant';
import * as config from '~/server/api/config'
import { md5 } from 'js-md5';

interface Params {
  datas: Record<string, any>;
  method?: 'get' | 'post';
}

const getFetchData = (params:Params) => {
  const { method='post', datas } = params;
  const { apiBase: baseURL } = useRuntimeConfig().public; // 获取全局环境变量
  // 自定义请求的唯一键,如果不自定义同一个页面不同请求会有缓存问题，不知道是bug还是我配置问题，自定义之后就解决了
  const hashString = `${JSON.stringify(params)}${config.url}`
  const hashValue = md5(hashString)
  return useFetch(config.url, {
    key: hashValue,
    method,
    baseURL: baseURL,
    // 请求拦截
    onRequest({ request, options }) {
      // 请求头
      options.headers = { ...options.headers, "Content-Type": "自定义Content-Type" };
      // 请求参数
      let configData = { ...datas }
      options.body = configData
    },
    // 响应拦截
    onResponse({ response }) {
      // 响应数据
      console.log(response)
    },
    onRequestError({ error }) {
      // 处理请求错误
      console.warn('request error', error);
      showToast('Request Error');
    },
    onResponseError({ response }) {
      // 处理响应错误
      console.warn('request error', response);
      showToast('Request Error');
    },
  });
}

export default getFetchData;
```

这里有几个坑需要说明一下

#### `useFetch`因为封装了`useAsyncData`的缘故，请求会有缓存的情况，如果请求的参数和路由与之前请求的一致是不会发起第二次请求的，如果你想取消这种

* 解决方案：

* 可以在封装的请求前面加 `await nextTick()`

* 可以在返回值里面使用`refresh`方法：一个可以用于刷新handler函数返回的数据的函数。

* 也可以在请求参数里面每次都使用不同的key值

#### 还有一个就是在引用请求时放在Vue3的生命周期onMounted里的时候请求缓存的数据获取不到

* 解决方案：直接创建一个请求方法，不在生命周期里发起请求

## 在页面里调用请求

```typescript
import useCustomFetch from "~/composables/useCustomFetch";

const { data }:Record<string, any> = useCustomFetch({
  method: "post",
  datas: {
    method:"miaodi.open.sms.website.news.list",
    page_current: '1',
    page_size: '4',
    type: '2',
  },
});
if(data.value) {
  newsList.value = data.value.data.rows
}
```

## 查看响应数据

在`nuxt.config.js`中添加`devtools`运行时配置，启用`Nuxt`开发工具，可以查看当前请求的缓存数据。

```ts
devtools: { enabled: true },
```

<a data-fancybox="gallery" href="https://i.mji.rip/2023/11/17/5817e4e6b0be90aff2149d04a7e38f8e.png" data-caption="devtools">
    <img v-lazy="'https://i.mji.rip/2023/11/17/5817e4e6b0be90aff2149d04a7e38f8e.png'"/>
</a>

<Fancybox />
<Comment />