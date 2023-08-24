import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
// import DefaultTheme from "../theme-default"; // 扩展主题
import Comment from "./components/Comment.vue";
import Friendship from "./components/Friendship.vue";
import vpSearch from './components/vp-search.vue'
import Archives from './components/Archives.vue'
import Tags from './components/Tags.vue'
import NewLayout from './components/NewLayout.vue'
import './style/index.scss'
import type { VNode } from 'vue'

/**
 * 使用第三方组件库 fighting-design
 */
import FightingDesign from 'fighting-design'
import 'fighting-design/dist/index.css'

export default {
  ...DefaultTheme,
  // Layout: NewLayout,
  Layout() {
    return h(NewLayout, null, {
      /**
       * 导航栏插入搜索的输入框插槽
       */
      'nav-bar-content-before': (): VNode => h(vpSearch)
    })
  },
  enhanceApp({ app }) {
    app.use(FightingDesign);
    app.component('Comment', Comment);
    app.component("Friendship", Friendship);
    app.component("Archives", Archives);
    app.component("Tags", Tags);
  }
}
