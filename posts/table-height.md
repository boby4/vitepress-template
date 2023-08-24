---
date: 2023-08-23
title: elelment table表格高度自适应
tags:
- vue
description: vue elelment table表格自定义高度，同时根据当前元素高度自适应表格高度
---

# **elelment table表格高度自适应**

## **前提**

关于对element table表格高度自适应，因为我的表格页面做了筛选表单展开和收起功能，存在一个问题，当窗口大小变化时，表格高度固定时表格内容会被遮挡，这样体验很不好，所以这里提供一种方法，通过监听页面整体元素内容高度，然后动态设置表格高度，这样就不会有表格内容被撑开的情况，同时，当页面元素内容高度变化时，也会动态设置表格高度，这样体验就很好了。

## **vue自定义指令实现**

```javascript
// 定义一个自定义指令 "autotableheight"
autotableheight: {
  // 当指令插入到元素上时执行的函数
  inserted: function (el:any) {
    // 初始化高度标志和观察状态
    let heightFlag: number = 0; // 用于记录先前的高度
    let isObserving: boolean = false; // 用于避免重复观察的标志
    // 定义一个函数用于观察容器高度的变化
    const observeContainerHeight = () => {
      // 检查是否正在观察并且元素存在，一定要有，不然会陷入死循环，页面卡死
      if (!isObserving && el) {
        isObserving = true; // 标记为正在观察
        // 获取当前容器的高度
        const height = el.clientHeight;
        // 查找元素内部的表格元素，注意你的元素class可能跟我的不同，会导致监听不到情况
        const tableBody = el.querySelector('.el-table');
        // 根据高度和条件进行相应操作
        if (heightFlag != height && tableBody) {
          heightFlag = height; // 更新高度标志
          // 根据不同的高度范围设置表格体的高度 这里我的表格高度默认是580px，所以基于580px进行判断，可以根据实际情况去修改
          if (height > 0 && height < 838 && tableBody.style.height != `580px`) {
            tableBody.style.height = `580px`;
          } else if (height > 0 && height > 838 && tableBody.style.height == `580px`) {
            tableBody.style.height = `${580 - (height - 838)}px`;
          } else if (height > 0 && height > 838 && tableBody.style.height != `580px`) {
            tableBody.style.height = `580px`;
          }
        }
        isObserving = false; // 重置观察状态
      }
    };
    setTimeout(observeContainerHeight, 0); // 在插入后稍后执行一次观察函数
    // 创建一个 MutationObserver 实例来监听容器的属性变化，强推这个
    // 这里使用的是 MutationObserver 而不是 ResizeObserver 是因为 ResizeObserver 存在兼容性问题
    const mutationObserver = new MutationObserver((mutationsList, observer) => {
      if (!isObserving) {
        observeContainerHeight(); // 当无观察时触发观察函数
      }
    });
    // 开始观察元素及其子树的属性变化
    mutationObserver.observe(el, {
      subtree: true,    // 包括所有后代节点
      attributes: true, // 监听属性的变化
    });
  },
},

```

## **表格使用自定义指令**

在你的table外层页面使用**v-autotableheight**指令, 要预设置一个固定高度，最好与指令里的height值一致，不然会根据表格内容自适应高度

```html
<div class="page" v-tableheight>
    <el-form ref="form" :model="form" label-width="80px"></el-form>
    <el-table
    :data="tableData"
    :height="tableHeight">
    <el-table-column type="index" :index="indexMethod"/>
    <el-table-column prop="date" label="日期" width="180"/>
    ...
  </el-table>
  </div>
```

<Comment />
