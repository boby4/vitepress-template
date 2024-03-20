---
date: 2024-07-28
title: 实现一个谷歌浏览器插件
tags:
- 浏览器插件
description: 从零开始实现一个在浏览器中实时预览HTML、CSS和JavaScript代码的谷歌浏览器插件。
---

# **实现一个谷歌浏览器插件**

手把脚教你从零开始实现一个在浏览器中实时预览HTML、CSS和JavaScript代码的谷歌浏览器插件。

## **实现效果**

<a data-fancybox="gallery" href="https://ice.frostsky.com/2024/07/31/54fa1b8815c6c7ca7071d7aa3e5b49a4.png" data-caption="谷歌浏览器插件">
<img v-lazy="'https://ice.frostsky.com/2024/07/31/54fa1b8815c6c7ca7071d7aa3e5b49a4.png'"/>
</a>

## **创建项目文件夹**

* 创建一个文件夹来存放你的插件文件，比如 realtime-code-preview。

## **创建 manifest.json**

* 在项目文件夹中创建一个 manifest.json 文件，这是插件的配置文件。

```json
{
  "manifest_version": 2,
  "name": "Real-time Code Preview",
  "version": "1.0",
  "description": "实时预览HTML、CSS和JavaScript代码的谷歌浏览器插件",
  "permissions": ["activeTab"],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

## **创建 background.js**

* 创建一个 background.js 文件来处理插件的后台逻辑。

```javascript
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, { file: "content.js" });
});
```

## **创建 popup.html**

* 创建一个 popup.html 文件，这是插件的弹出页面。

```html
<!DOCTYPE html>
<html>
<head>
  <title>代码实时预览</title>
  <link rel="stylesheet" type="text/css" href="popup.css">
</head>
<body>
  <div class="container">
    <div class="editor">
      <textarea id="htmlCode" placeholder="HTML"></textarea>
      <textarea id="cssCode" placeholder="CSS"></textarea>
      <textarea id="jsCode" placeholder="JavaScript"></textarea>
    </div>
    <div class="preview-container">
      <iframe id="preview"></iframe>
    </div>
  </div>
  <script src="popup.js"></script>
</body>
</html>
```

## **创建 popup.js**

* 创建一个 popup.js 文件，这是插件的弹出页面的逻辑。

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const htmlCode = document.getElementById('htmlCode');
  const cssCode = document.getElementById('cssCode');
  const jsCode = document.getElementById('jsCode');
  const preview = document.getElementById('preview');

  function updatePreview() {
    const html = htmlCode.value;
    const css = '<style>' + cssCode.value + '</style>';
    const js = '<script>' + jsCode.value + '<\/script>';
    preview.contentDocument.body.innerHTML = html + css + js;
  }

  htmlCode.addEventListener('input', updatePreview);
  cssCode.addEventListener('input', updatePreview);
  jsCode.addEventListener('input', updatePreview);
});
```

## **创建 popup.css**

* 创建一个 popup.css 文件，这是插件的弹出页面的样式。
```css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  width: 600px;
  height: 100%;
  background-color: #f4f4f9;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.container {
  width: 98%;
  height: 98%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.editor {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
  background-color: #f9f9fc;
  border-bottom: 2px solid #eee;
}

textarea {
  flex: 1;
  margin-bottom: 15px;
  padding: 10px 10px 80px 10px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: monospace;
  font-size: 14px;
  resize: none;
  background-color: #eef2f7;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

textarea:last-child {
  margin-bottom: 0;
}

textarea:focus {
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  outline: none;
}

.preview-container {
  flex: 2;
  overflow: hidden;
  background-color: #fff;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
  background-color: #fff;
  border-top: 2px solid #eee;
}
```

## **新增图标**

* 在项目文件夹中创建一个 icons 文件夹，放入 icon16.png, icon48.png, 和 icon128.png 三个图标文件。这些图标可以是任意图片，但建议使用对应适当的尺寸。

## **安装插件**

* 打开 Google Chrome 的扩展程序页面（chrome://extensions/），打开右上角的“开发者模式”，点击“加载已解压的扩展程序”，选择你的项目文件夹。


插件安装完成后，你应该能在浏览器工具栏看到插件的图标，点击图标可以看到弹出页面，并在其中输入HTML、CSS和JavaScript代码，实时预览效果。

## **关于发布你的插件到Chrome商店**

* 没有谷歌账号去注册一个，进入<a href="https://chrome.google.com/webstore/devconsole/register" style="color:blue;">谷歌开发者控制台</a>，支付5美金即可上传你的浏览器插件，一次性收费，永久使用。

以上
