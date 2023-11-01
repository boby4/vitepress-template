import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Comment from "./components/Comment.vue";
import Friendship from "./components/Friendship.vue";
import Archives from './components/Archives.vue'
import TimeLine from './components/TimeLine.vue'
import NewTimeLine from './components/NewTimeLine.vue'
import Paging from './components/Paging.vue'
import SparkModel from './components/SparkModel.vue'
import Message from './components/Message.vue'
import Tags from './components/Tags.vue'
import NewLayout from './components/NewLayout.vue'
import Model from './components/Model.vue'
import ModelPlay from './components/ModelPlay.vue'
import Fancybox from './components/Fancybox.vue'
import Aplayer from './components/Aplayer.vue'
import Album from './components/Album.vue'
import PhotoCloud from './components/photoCloud.vue'
import Pagination from './components/Pagination.vue'
import InfiniteScroll from './components/InfiniteScroll.vue'
import InfiniteScrollContainer from './components/InfiniteScrollContainer.vue'
import PerpetualCalendar from './components/PerpetualCalendar.vue'
import HuangLi from './components/HuangLi.vue'
import VueLazyload from 'vue3-lazyload'
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
    // if (typeof window !== 'undefined') {
    //   // 仅在浏览器环境中加载 VConsole
    //   const script = document.createElement('script');
    //   script.src = 'https://cdn.jsdelivr.net/npm/vconsole@latest/dist/vconsole.min.js';
    //   script.onload = () => {
    //     new VConsole();
    //   };
    //   document.body.appendChild(script);
    // }
    app.use(VueLazyload, {
      loading: '/src/img/loading.gif',
    });
    app.component('Comment', Comment);
    app.component('InfiniteScroll', InfiniteScroll);
    app.component('InfiniteScrollContainer', InfiniteScrollContainer);
    app.component("Friendship", Friendship);
    app.component("Archives", Archives);
    app.component("TimeLine", TimeLine);
    app.component("NewTimeLine", NewTimeLine);
    app.component("Paging", Paging);
    app.component("Tags", Tags);
    app.component("Model", Model);
    app.component("ModelPlay", ModelPlay);
    app.component("Fancybox", Fancybox);
    app.component("Aplayer", Aplayer);
    app.component("Album", Album);
    app.component("PhotoCloud", PhotoCloud);
    app.component("Pagination", Pagination);
    app.component("SparkModel", SparkModel);
    app.component("Message", Message);
    app.component("PerpetualCalendar", PerpetualCalendar);
    app.component("HuangLi", HuangLi);
  }
}
