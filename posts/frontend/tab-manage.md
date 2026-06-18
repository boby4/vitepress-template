---
date: 2023-12-14
title: el-tabs右键管理菜单
tags:
- Vue
description: ElementUI el-tabs右键管理菜单功能实现，基于vue-property-decorator
---

# el-tabs右键管理菜单

产品最近提的一个需求，就是el-tabs组件右键可以管理tabs，刷新，关闭当前tabs，关闭其他tabs，关闭所有tabs的一个功能，记录一次我实现的过程。状态管理思路有参考<a href="https://github.com/PanJiaChen/vue-element-admin" style="color:blue;">vue-element-admin</a>

## 实现效果

<a data-fancybox="gallery" href="https://i.miji.bid/2023/12/14/3663846a7a9e48aeea03e790c33ef4ac.png" data-caption="早安晚安午安">
<img v-lazy="'https://i.miji.bid/2023/12/14/3663846a7a9e48aeea03e790c33ef4ac.png'"/>
</a>

## 实现思路

### 鼠标右键

利用vue自带的@contextmenu监听右键点击事件，event可以接收到当前元素内容

```html
<el-tabs
      class="view-tab"
      v-model="tabIndex"
      type="card"
      @tab-remove="tabRemoveHandle"
      @contextmenu.prevent.native="openMenu($event)"
    >
 </el-tabs>
<script lang=ts>
 private openMenu(e: any) {
  let obj = e.srcElement ? e.srcElement : e.target;
  if (obj.id) {
    // 唯一标识
    let currentContextTabId = obj.id.split("-")[1];
    this.selectedTab = this.visitedViews.find((tab:any) => tab.path == currentContextTabId);
    // 计算鼠标偏移量，设置菜单位置
    this.left = e.clientX
    this.top = e.clientY + 10
    this.visible = true
  }
}
</script>
```

## vuex状态管理思路

```ts
// 从vuex-module-decorators导入必要的装饰器和类型
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

// 定义Tabs模块状态的接口
export interface TabsState {
  visitedViews: Record<string, any>[]; // 用于存储访问过的视图信息的数组
}

// 使用装饰器将类标记为带有命名空间的Vuex模块
@Module({ namespaced: true })
export class Tabs extends VuexModule implements TabsState {
  // State定义
  public visitedViews: Record<string, any>[] = []; // 初始化visitedViews为空数组

  // Mutation（变更）：将访问过的视图添加到状态中
  @Mutation
  private ADD_VISITED_VIEW(view: any) {
    if (!view.path) return;
    if (this.visitedViews.some((v) => v.path === view.path)) return;
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.title
      })
    );
  }

  // Mutation（变更）：从状态中删除访问过的视图
  @Mutation
  private DEL_VISITED_VIEW(view: any) {
    const index = this.visitedViews.findIndex((v) => v.path === view.path);
    if (index > -1) {
      this.visitedViews.splice(index, 1);
    }
  }

  // Mutation（变更）：删除除当前视图之外的所有访问过的视图
  @Mutation
  private DEL_OTHERS_VISITED_VIEWS(view: any) {
    this.visitedViews = this.visitedViews.filter((v) => v.fixed || v.path === view.path);
  }

  // Mutation（变更）：删除所有访问过的视图
  @Mutation
  private DEL_ALL_VISITED_VIEWS() {
    const affixTabs = this.visitedViews.filter((tab) => tab.fixed);
    this.visitedViews = affixTabs;
  }

  // Mutation（变更）：更新访问过的视图信息
  @Mutation
  private UPDATE_VISITED_VIEW(view: any) {
    for (const v of this.visitedViews) {
      if (v.path === view.path) {
        Object.assign(v, view);
        break;
      }
    }
  }

  // Action（动作）：调用ADD_VISITED_VIEW mutation，向状态中添加访问过的视图
  @Action({ rawError: true })
  public addVisitedView(view: any) {
    this.context.commit("ADD_VISITED_VIEW", view);
  }

  // Action（动作）：调用DEL_VISITED_VIEW mutation，从状态中删除访问过的视图
  @Action({ rawError: true })
  public delVisitedView(view: any) {
    return new Promise((resolve) => {
      this.context.commit("DEL_VISITED_VIEW", view);
      resolve([...this.visitedViews]);
    });
  }

  // Action（动作）：调用DEL_OTHERS_VISITED_VIEWS mutation，从状态中删除除当前视图之外的所有访问过的视图
  @Action({ rawError: true })
  public delOthersVisitedViews(view: any) {
    return new Promise((resolve) => {
      this.context.commit("DEL_OTHERS_VISITED_VIEWS", view);
      resolve([...this.visitedViews]);
    });
  }

  // Action（动作）：调用DEL_ALL_VISITED_VIEWS mutation，从状态中删除所有访问过的视图
  @Action({ rawError: true })
  public delAllVisitedViews() {
    return new Promise((resolve) => {
      this.context.commit("DEL_ALL_VISITED_VIEWS");
      resolve([...this.visitedViews]);
    });
  }

  // Action（动作）：调用UPDATE_VISITED_VIEW mutation，更新访问过的视图信息
  @Action({ rawError: true })
  public updateVisitedView(view: any) {
    this.context.commit("UPDATE_VISITED_VIEW", view);
  }
}
```

## 主要代码

```html
<style lang="stylus">
.main-layout {
 height: 100%;

 .el-header {
  l-rel: 0 0;
  z-index: 2;
  height: 56px;
 }

 .el-aside {
  // s-bg: #f3f5f6;
  border-right: yoz_line.so1;
  overflow-x: hidden;

  h2 {
   l-mv: 30px 10px;
   t-fl: 16px 20px center;
  }

  .el-menu {
   border: none;

   .el-submenu__title, .el-menu-item {
    border-left: 3px solid transparent;
    color: rgba(0,0,0,.65);

    .dm {
     margin-right: 15px;
    }

    &:hover {
     background: #fff;
     // border-left-color: yoz_color.m;
     color: #1890ff;
    }

    &.is-active {
     background: yoz_color.bg2;
     border-left-color: yoz_color.m;
     color: #1890ff;
    }
   }

   .el-submenu {
    .el-submenu {
     .el-submenu__title span {
      padding-left: 10px;
     }
    }

    .el-menu {
     .el-menu-item span {
      // padding-left: 10px;
     }
    }
   }
  }

  .side-menu {
   height: 0;
   flex: 1;
  }
 }

 .el-main {
  padding: 0;
  // flex: 1 0;
  overflow: hidden;
  position: relative;

  .view-tab {
   border: none;
   box-shadow: none;

   .el-tabs__content {
    display: none;
   }

   .el-tabs__header {
    background-color: #fff;
    margin: 0;

    .el-tabs__item {
     border-top: 3px solid transparent;
     line-height: 37px;
     color: rgba(0,0,0,.65);

     &.is-active {
      // background: #f5f6f8;
      border-top-color: yoz_color.m;
      color: #1890ff;
     }
     &:hover {
      color: #1890ff;
     }
     &.is-fixed .el-icon-close {
      display: none;
     }
     &:focus.is-active.is-focus:not(:active){
      box-shadow: none!important;
     }
    }
   }
  }

  .main-container {
   position: absolute;
   background: #F6F8F9;
   overflow: hidden auto;
   l-wh: 100%;
   padding-bottom: 35px;
  }
 }

 .el-footer {
  height: 20px;
  text-align: center;
  background: #F6F8F9;
  t-fl: 12px 20px #aaa;
 }
}

.contextmenu {
 margin: 0;
 background: #fff;
 z-index: 3000;
 position: fixed;
 list-style-type: none;
 padding: 5px 0;
 border-radius: 4px;
 font-size: 12px;
 font-weight: 400;
 color: #333;
 box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
 li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
  &:hover {
   background: #eee;
  }
 }
}
</style>
<template>
 <el-container class="main-layout">
  <el-header>
   <slot name="header"></slot>
  </el-header>

  <el-container>
   <slot name="aside">
    <el-aside v-if="!hideSidebar" :width="isCollapse?'65px':'240px'">
     <slot name="sideHeader">
      <h2 v-if="projectName">{{projectName}}</h2>
     </slot>
     <el-menu class="side-menu" router :collapse="isCollapse" unique-opened :default-active="activeMenu" :collapse-transition="false">
      <menu-node v-for="(menu,index) in sideMenu" :menu="menu" :key="index">
       <template slot="menuTitle" slot-scope="{menu}">
        <slot name="menuTitle" v-bind:menu="menu" />
       </template>
      </menu-node>
     </el-menu>
    </el-aside>
   </slot>
   <el-container>
    <el-main>
     <slot name="main">
      <template v-if="!hideTab && visitedViews.length">
        <el-tabs
         class="view-tab"
         v-model="tabIndex"
         type="card"
         @tab-remove="tabRemoveHandle"
         @contextmenu.prevent.native="openMenu($event)"
        >
         <el-tab-pane
          v-for="(item) in visitedViews"
          :key="item.path"
          :closable="!isAffix(item)"
          :name="item.path"
         >
          <template slot="label">
           {{item.title}}
          </template>
         </el-tab-pane>
        </el-tabs>
       <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
        <li @click="refreshSelectedTabs(selectedTab)">刷新</li>
        <li v-if="!isAffix(selectedTab)" @click="closeSelectedTabs(selectedTab)">关闭</li>
        <li @click="closeOthersTabs">关闭其他</li>
        <li @click="closeAllTabs(selectedTab)">关闭所有</li>
       </ul>
      </template>
      <div class="main-container">
       <keep-alive>
        <router-view></router-view>
       </keep-alive>
      </div>
     </slot>
    </el-main>
    <el-footer height="20px" v-if="$slots.footer">
     <slot name="footer"></slot>
    </el-footer>
   </el-container>
  </el-container>
  <slot></slot>
 </el-container>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
})
export default class DefaultLayout extends Vue {
 @Prop({ type: Array, default: () => [] }) sideMenu!: SideMenuStruc[];
 @Prop(String) projectName!: string
 @Prop(Object) defaultTab!: TabItemStruc
 @Prop({ type: Boolean, default: false }) hideSidebar!: boolean
 @Prop({ type: Boolean, default: false }) hideTab!: boolean
 @Prop({ type: Boolean, default: false }) isCollapse!: boolean;

 private tabIndex = "/dashboard";

 // private tabs: TabItemStruc[] = [];
 private mounted() {
  if (!this.hideTab && this.defaultTab) {
   this.$store.dispatch('Tabs/addVisitedView', this.defaultTab)
  }
  this.routerChange()
 }

 @Watch("tabIndex")
 private tabIndexChange(path: string) {
  if (path != this.$route.path) {
   this.$router.push(path)
  }
 }

 @Watch("$route")
 private routerChange() {
  if (this.tabIndex != this.$route.path) {
   this.tabIndex = this.$route.path
  }
  this.$store.dispatch('Tabs/addVisitedView', {
   title: this.$route.meta?.title || "未知页面",
   path: this.$route.path,
  })
 }

 get activeMenu() {
  const route = this.$route;
  return route.path;
 }

 private tabRemoveHandle(name: string) {
  let tab: any = this.visitedViews.find((tab:any) => tab.path == name);
  this.closeSelectedTabs(tab)
 }

 @Watch("visible")
 private visibleChange() {
  if (this.visible) {
   document.body.addEventListener("click", this.closeContextMenu);
  } else {
   document.body.removeEventListener("click", this.closeContextMenu);
  }
 }

 private closeContextMenu() {
  this.visible = false;
 }

 get visitedViews() {
  return this.$store.state.Tabs.visitedViews
 }

 private top = 0
  private left = 0
 private visible = false
 private selectedTab:any = {}
 private openMenu(e: any) {
  let obj = e.srcElement ? e.srcElement : e.target;
  if (obj.id) {
   let currentContextTabId = obj.id.split("-")[1];
   this.selectedTab = this.visitedViews.find((tab:any) => tab.path == currentContextTabId);
   this.left = e.clientX
   this.top = e.clientY + 10
   this.visible = true
  }
 }

 private refreshSelectedTabs(view:any) {
  this.$nextTick(() => {
   this.$router.replace({
    path: '/redirect' + view.path
   })
  })
 }

 private isActive(route:any) {
  return route.path === this.$route.path
 }

 private isAffix(tab:Record<string,any>) {
  if(tab && tab.fixed) {
   return true
  }
  return false
 }

 private closeSelectedTabs(view:any) {
  this.$store.dispatch('Tabs/delVisitedView', view).then(({ visitedViews }:any) => {
   if (this.isActive(view)) {
    this.toLastView(visitedViews, view)
   }
  })
 }

 private toLastView(visitedViews:any, view:any) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.path)
      } else {
        if (view.title === '首页') {
          this.$router.replace({ path: '/redirect' + view.path })
        } else {
          this.$router.push('/')
        }
      }
    }

 private closeOthersTabs() {
  this.$store.dispatch('Tabs/delOthersVisitedViews', this.selectedTab)
  if(!this.isActive(this.selectedTab)){
   this.$router.push(this.selectedTab.path)
  }
 }

 private closeAllTabs(view:any) {
  this.$store.dispatch('Tabs/delAllVisitedViews').then(({ visitedViews }:any) => {
   if (this.defaultTab.path === view.path) {
    return
   }
   this.toLastView(visitedViews, view)
  })
 }
}
</script>
```

<Fancybox />
<Comment />
