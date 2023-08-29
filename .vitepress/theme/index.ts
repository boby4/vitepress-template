import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Comment from "./components/Comment.vue";
import Friendship from "./components/Friendship.vue";
import Archives from './components/Archives.vue'
import Tags from './components/Tags.vue'
import NewLayout from './components/NewLayout.vue'
import Model from './components/Model.vue'
import ModelPlay from './components/ModelPlay.vue'
import './style/index.scss'
import type { VNode } from 'vue'

export default {
  ...DefaultTheme,
  Layout: NewLayout,
  // Layout() {
  //   return h(NewLayout, null, {
  //     /**
  //      * 导航栏插入搜索的输入框插槽
  //      */
  //     'nav-bar-content-before': (): VNode => h(vpSearch)
  //   })
  // },
  enhanceApp({ app }) {
    app.component('Comment', Comment);
    app.component("Friendship", Friendship);
    app.component("Archives", Archives);
    app.component("Tags", Tags);
    app.component("Model", Model);
    app.component("ModelPlay", ModelPlay);
  }
}
