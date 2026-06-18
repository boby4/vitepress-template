---
date: 2023-12-20
title: 爆改博客评论组件Valine
tags:
- 组件
description: 爆改了Valine的各种问题，然后加了一些样式优化，包括QQ头像显示、自定义表情包，自己接入邮件发送等问题，硬是把他给救活了🤪
---

## 爆改博客评论组件Valine

找了很久的博客评论组件了，碰了很多壁，一开始我用的是GitHub App的utterances，我还专门写了一篇文章去讲这个东东，简单好用吧总的来说，但是限制很多，只存在github里面还需要github登录才可以评论，就想着换个组件，试了很多个，Waline试过，搞到最后我发现它好像不支持vite，白忙活了，arttalk也试了需要部署一套后端在服务器上，但是我的网站是托管的，就是为了省钱才这样搞，放弃了，最后选择了Valine，也是有很多坑，跟Waline差不太多，同样使用 LeanCloud 存储评论数据和访问数据，但是LeanCloud只有国际服托管服务器，国际服看了网上说是不维护了，这不是尴尬，后来发现华南华北服务器也能凑合用，只是域名不备案就绑定不了，就发不了邮件，估计大部分功能也不维护了，只好用他的存储功能，邮件发送另辟蹊径，咱们主打的就是一个能不花钱就尽量不花钱。

## 实现效果

<a data-fancybox="gallery" href="https://i.miji.bid/2023/12/20/38fce9d5f3f46e0be35ac334ac030412.png" data-caption="Valine">
<img v-lazy="'https://i.miji.bid/2023/12/20/38fce9d5f3f46e0be35ac334ac030412.png'"/>
</a>

## 关于Valine

一款基于LeanCloud存储数据的无后端评论系统

### 使用Valine

关于注册LeanCloud账号和获取key之类的操作直接去看valine的入门文档即可 https://valine.js.org/quickstart.html
,我这里引入是直接把valine的js文件直接引入到本地文件中，本文基于valine最新版本**1.5.1**,文本我会放出完整代码。


```vue
<template>
  <div class="post_comments">
    <!-- 评论区域容器 -->
    <div class="line">
      <div class="line_name">评论</div>
    </div>
    <section class="page-edit">
      <div class="page-edit-read">
        <!-- 阅读量显示区域 -->
        <span class="leancloud-visitors" data-flag-title="Your Article Title">
          <em class="post-meta-item-text">阅读量： </em>
          <i class="leancloud-visitors-count"></i>
        </span>
      </div>
      <!-- 评论插件容器 -->
      <div id="vcomments"></div>
    </section>
  </div>
</template>

<script setup>
import { watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import axios from 'axios'
import { remoteImport } from '../../utils/functions'

const route = useRoute()
const initValine = () => {
  // 初始化 Valine 评论插件
  let path = location.origin + location.pathname
  document.getElementsByClassName('leancloud-visitors')[0].id = path
  new Valine({
    el: '#vcomments',
    appId: '', //这里是你的LeanCloud appId
    appKey: '',//这里是你的LeanCloud appKey
    path: path,// 当前路由地址
    enableQQ: true, //展示你的qq链接和地址，试了没用
    visitor: true,// 允许访客，这里我邮箱必填了，其实就是不允许了，邮箱后面需要用
    recordIP: true,// 允许记录ip
    requiredFields: ['mail'],// 必填字段
    placeholder: '输入评论内容，点击头像跳转会填写的地址，输入邮箱我才会收到你的评论邮件哟',//自定义输入框占位文本
    emojiCDN: '',// 自定义表情包的前缀地址
    emojiMaps: {
      // 自定义表情包地址key: value格式
    }
  })
}

// 监听路由变化，更新评论插件
watch(
  () => route.path,
  () => {
    initValine()
  }
)

onMounted(() => {
  // 加载本地 Valine 插件
  remoteImport('/js/valine.js').then(() => {
    initValine()
  })
})
</script>

```

* 这里监听了路由的变化，当路由发生变化时，重新初始化 Valine 评论插件。这样就可以实现在不同页面下使用同一个评论插件。**remoteImport**是一个加载脚本的函数

```js
// 远程导入模块的函数
export function remoteImport(url: string) {
  return new Promise((resolve: any) => {
    // 获取文档头部元素
    var head = document.getElementsByTagName("head")[0];
    // 创建 script 元素
    var script = document.createElement("script");
    // 设置脚本类型和源地址
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    // 将 script 元素添加到头部
    head.appendChild(script);
    // 监听脚本加载完成事件
    script.onload = function () {
      resolve();
    };
  });
}
```

## 样式优化

加了一个侧边的动态背景图，提交按钮样式、头部邮箱、昵称、网址输入框样式、评论头像加鼠标滑过旋转、评论框样式、表情包大小等样式优化，样式文件如下：

```scss
#veditor {
  background-image: url(https://pic.imgdb.cn/item/655dd56fc458853aef7b4274.webp);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
  background-color: rgba(255, 255, 255, 0);
  resize: vertical;
}
#vcomments .vheader .vnick {
  width: 29%;
  border: 2px solid #dedede;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
}
#vcomments .vheader .vmail {
  width: 29%;
  border: 2px solid #dedede;
  margin-left: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
}
#vcomments .vpanel .vwrap{
  border: 2px solid #f0f0f0;
}
#vcomments .vheader .vlink {
  width: 29%;
  border: 2px solid #dedede;
  margin-left: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
}
img.vimg {
  transition: all 1s; /* 旋转时间为 1s */
}
img.vimg:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
}
#vcomments .vcards .vcard {
  margin: 0 2px;
  padding: 15px 20px 0 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
}
#vcomments .vcards .vcard:hover {
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.12);
}
#vcomments .vcards .vcard .vh .vcard {
  border: none;
  box-shadow: none;
}
#vcomments .vcards .vcard .vh .vhead .vsys{
  background: #828282;
  padding: 0 0.2rem;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
}
#vcomments .vrow .vsubmit{
  color: #555;
  padding: 0.5em 2.3em;
  margin: 0 0.5em;
  min-width: 60px;
  max-width: 100%;
  background: #e9eff3;
  font-weight: bold;
}
#vcomments .vemojis{
  max-height: 200px;
}
#vcomments .vemojis i{
  width: 4rem;
  margin: 0 .2rem;
}
.post_comments {
  background-color: #fff;
  padding: 1.25rem 0;
  margin-top: 1.4rem;
}
.post_comments .line {
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eaecef;
  position: relative;
  margin-bottom: 1.2rem;
}
.post_comments .line_name {
  color: #666;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  padding-left: 1rem;
}
.page-edit-read {
  font-size: 14px;
  text-align: right;
  margin: 14px 0;
}
```

## valine源码修改

* 先修改判断是qq邮箱展示qq头像的问题

源码里直接搜索**V.cdn + (0, j.default)(e.get('mail')) + V.params**这一段代码直接替换成**qq_img**

然后往上滑找到这段函数的函数名在b = function (e, t, n){ 和 var r = (0, L.default) 中间加入这段代码

```js
var qq_img=V.cdn + (0, j.default)(e.get('mail')) + V.params;//默认gravator头像接口
if(e.get('mail').indexOf("@qq.com") >= 0){
  var prefix = e.get('mail').replace(/@.*/, "");//前缀
  var pattern=/^\d+$/g;  //正则表达式，数字
  var result= prefix.match(pattern);//match 是匹配的意思
  if(result!==null){
    qq_img = "//q1.qlogo.cn/g?b=qq&nk="+ prefix +"&s=100";//这是获取qq头像的接口
  }
}
```

就可以正常显示qq头像了

* 你想删除任何评论框中原有定义的文字直接全局搜索，对应删除即可，我删除了power by valine， 还有旁边的那个markdown小图标m↓

## 接入formspree发送邮件

* 着重讲一下这个formspree吧

[formspree](https://formspree.io/) 是一个第三方api，可以免费发送邮件，而且支持自定义域名，先去他的官网注册一个账号，邮箱就可以直接注册，然后邮箱认证一下就可以用了，稳定好用，大概有个几分钟的延迟不过不影响

* 注册完之后去新建一个form，这里form的名称可以随便填，我建议你填一个你的博客有一个评论待查收之类的名称这里的名称就是接收邮件的title，所以一目了然会好一点，邮箱就填你常用的邮箱，填写完之后你就得到了一个form's endpoint，就是你的专属邮件发送接口，copy下来，等会要用

<a data-fancybox="gallery" href="https://i.miji.bid/2023/12/20/5331082480aeccb894d82def10aebce0.png" data-caption="formspree">
<img v-lazy="'https://i.miji.bid/2023/12/20/5331082480aeccb894d82def10aebce0.png'"/>
</a>

邮件接收到的效果

<a data-fancybox="gallery" href="https://i.miji.bid/2023/12/20/113508b2e9eed1d6ccd60bac0e0e4aac.png" data-caption="接收到的邮件">
<img v-lazy="'https://i.miji.bid/2023/12/20/113508b2e9eed1d6ccd60bac0e0e4aac.png'"/>
</a>

* 接下来就是修改你的valine的代码评论配置了，在onMounted给valine的提交按钮上添加一个click监听事件，实现代码如下：

```js
onMounted(() => {
  // 加载 Valine 插件
  remoteImport('/js/valine.js').then(() => {
    // 初始化 Valine
    initValine();
    // 获取提交按钮元素并添加点击事件监听
    const submitButton = document.querySelector('.vsubmit');
    submitButton.addEventListener('click', handleButtonClick);
  });
});
// 处理提交按钮点击事件
const handleButtonClick = async () => {
  // 获取昵称、邮箱、链接和评论内容的输入框元素
  const nick = document.querySelector('.vnick');
  const mail = document.querySelector('.vmail');
  const link = document.querySelector('.vlink');
  const message = document.querySelector('#veditor');
  // 正则表达式验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // 如果邮箱格式合法，则使用 Axios 发送评论数据到指定接口
  if (emailRegex.test(mail.value)) {
    // 把刚才的邮箱发送接口复制到这里
    await axios.post('https://your-comment-api-endpoint', {
      Message: message.value,
      Email: mail.value,
      Name: nick.value,
      Link: link.value,
    });
  }
};
// 在组件卸载前移除提交按钮点击事件监听
onBeforeUnmount(() => {
  const submitButton = document.querySelector('.vsubmit');
  submitButton.removeEventListener('click', handleButtonClick);
});
```

* 这样，当用户点击提交按钮时，就会触发你刚才添加的点击事件处理函数，从而实现邮件提示功能，而且不会影响 Valine 评论的正常使用。

## 补充

* 后面我发布上去之后发现了一点问题，valine源码里引入的leancloud的cdn [leancloud-storage](https://unpkg.com/leancloud-storage@3.15.0/dist/av-min.js) 他娘的没梯子访问不到，这能难倒一个不屈不挠的代码人吗，我直接把这个源码download下来放在本地引入，完美解决问题。

## 完整代码

```vue
<template>
  <div class="post_comments">
    <div class="line">
      <div class="line_name">评论</div>
    </div>
    <section class="page-edit">
      <div class="page-edit-read">
        <!-- id 将作为查询条件 -->
        <span class="leancloud-visitors" data-flag-title="Your Article Title">
          <em class="post-meta-item-text">阅读量： </em>
          <i class="leancloud-visitors-count"></i>
        </span>
      </div>
      <div id="vcomments"></div>
    </section>
  </div>
</template>

<script setup>
import { watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import axios from 'axios'
import { remoteImport } from '../../utils/functions'

const route = useRoute()
const initValine = () => {
  let path = location.origin + location.pathname
  document.getElementsByClassName('leancloud-visitors')[0].id = path
  new Valine({
    el: '#vcomments',
    appId: '',
    appKey: '',
    path: path,
    enableQQ: true,
    visitor: true,
    recordIP: true,
    requiredFields: ['mail'],
    placeholder: '输入评论内容，点击头像跳转会填写的地址，输入邮箱我才会收到你的评论邮件哟',
    emojiCDN: '',
    emojiMaps: {
    }
  })
}

watch(
  () => route.path,
  () => {
    initValine()
  }
)

onMounted(() => {
  remoteImport('/js/valine.js').then(() => {
    initValine()
    const submitButton = document.querySelector('.vsubmit');
    submitButton.addEventListener('click', handleButtonClick);
  })
})

const handleButtonClick = async() => {
  const nick = document.querySelector('.vnick');
  const mail = document.querySelector('.vmail');
  const link = document.querySelector('.vlink');
  const message = document.querySelector('#veditor');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailRegex.test(mail.value)) {
    await axios.post('', {Message: message.value, Email: mail.value, Name: nick.value, Link: link.value})
  }
}

onBeforeUnmount(() => {
  const submitButton = document.querySelector('.vsubmit');
  submitButton.removeEventListener('click', handleButtonClick);
})
</script>

<style lang="scss">
#veditor {
  background-image: url(https://pic.imgdb.cn/item/655dd56fc458853aef7b4274.webp);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
  background-color: rgba(255, 255, 255, 0);
  resize: vertical;
}
#vcomments .vheader .vnick {
  width: 29%;
  border: 2px solid #dedede;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
}
#vcomments .vheader .vmail {
  width: 29%;
  border: 2px solid #dedede;
  margin-left: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
}
#vcomments .vpanel .vwrap{
  border: 2px solid #f0f0f0;
}
#vcomments .vheader .vlink {
  width: 29%;
  border: 2px solid #dedede;
  margin-left: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
}
img.vimg {
  transition: all 1s; /* 旋转时间为 1s */
}
img.vimg:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
}
#vcomments .vcards .vcard {
  margin: 0 2px;
  padding: 15px 20px 0 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
}
#vcomments .vcards .vcard:hover {
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.12);
}
#vcomments .vcards .vcard .vh .vcard {
  border: none;
  box-shadow: none;
}
#vcomments .vcards .vcard .vh .vhead .vsys{
  background: #828282;
  padding: 0 0.2rem;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
}
#vcomments .vrow .vsubmit{
  color: #555;
  padding: 0.5em 2.3em;
  margin: 0 0.5em;
  min-width: 60px;
  max-width: 100%;
  background: #e9eff3;
  font-weight: bold;
}
#vcomments .vemojis{
  max-height: 200px;
}
#vcomments .vemojis i{
  width: 4rem;
  margin: 0 .2rem;
}
.post_comments {
  background-color: #fff;
  padding: 1.25rem 0;
  margin-top: 1.4rem;
}
.post_comments .line {
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eaecef;
  position: relative;
  margin-bottom: 1.2rem;
}
.post_comments .line_name {
  color: #666;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  padding-left: 1rem;
}
.page-edit-read {
  font-size: 14px;
  text-align: right;
  margin: 14px 0;
}
</style>
```

终于不用纠结再评论的问题了！

<Fancybox />
<Comment />