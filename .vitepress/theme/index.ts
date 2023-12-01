import { App, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Comment from './components/Comment.vue';
import Friendship from './components/Friendship.vue';
import Archives from './components/Archives.vue';
import TimeLine from './components/TimeLine.vue';
import NewTimeLine from './components/NewTimeLine.vue';
import Paging from './components/Paging.vue';
import SparkModel from './components/SparkModel.vue';
import Message from './components/Message.vue';
import Tags from './components/Tags.vue';
import NewLayout from './components/NewLayout.vue';
import Model from './components/Model.vue';
import ModelPlay from './components/ModelPlay.vue';
import Fancybox from './components/Fancybox.vue';
import Aplayer from './components/Aplayer.vue';
import Album from './components/Album.vue';
import PhotoCloud from './components/photoCloud.vue';
import Pagination from './components/Pagination.vue';
import InfiniteScroll from './components/InfiniteScroll.vue';
import InfiniteScrollContainer from './components/InfiniteScrollContainer.vue';
import PerpetualCalendar from './components/PerpetualCalendar.vue';
import HuangLi from './components/HuangLi.vue';
import Process from './components/Process.vue';
import VueLazyload from 'vue3-lazyload';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './style/index.scss';
// import type { VNode } from 'vue'

const observers: any[] = []; // 用于存储所有观察者 -> 收集起来主要是为了当路由变化时效果之前的观察者。
export default {
	...DefaultTheme,
	setup() {
		const route = useRoute();
		onMounted(() => {
			initFirstScreen(); // 初始化 -> 给首次渲染就在视口的元素加上自定义属性，这些元素永远不用加动画类
			animateFn(); // 执行核心脚本
		});
		// 元素是否在视口
		const isElementInViewport = (element: HTMLElement) => {
			var rect = element.getBoundingClientRect();
			const isInViewport =
				rect.top >= 0 &&
				rect.bottom <=
					(window.innerHeight || document.documentElement.clientHeight);
			return isInViewport;
		};
		// 检查是否有自定义属性
		const checkHasAttribute = (element: HTMLElement) => {
			return !!element.getAttribute('snow_is_show');
		};
		// 初始化函数
		const initFirstScreen = () => {
			const main = document.querySelector('.vp-doc>div') || [];
			const paragraphs = [...(main?.children || [])];
			paragraphs.forEach((item) => {
				if (isElementInViewport(item)) {
          item.classList.add('animate__animated', 'animate__fadeInUp');
					item.setAttribute('snow_is_show', true);
				}
			});
		};
		// 核心脚本
		const animateFn = () => {
			const main = document.querySelector('.vp-doc>div') || [];
			const paragraphs = [...(main?.children || [])];
			paragraphs.forEach((item) => {
				const observer = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && !checkHasAttribute(item)) {
							// 元素进入视口
              item.classList.add('animate__animated', 'animate__fadeInUp');
							item.setAttribute('snow_is_show', true);
						}
					});
				});
				observer.observe(item);
				observers.push(observer);
			});
      console.log(main)
		};
		// 清空所有 observer 的函数
		const destructionObserver = () => {
			observers.forEach((observe) => {
				observe.disconnect();
			});
			observers.length = 0;
		};
		watch(
			() => route.path,
			() =>
				nextTick(() => {
					destructionObserver(); // 先清空所有的观察者
					initFirstScreen(); // 再初始化一次 类似onMounted
					animateFn(); // 再次执行核心函数
				})
		);
	},
	Layout: NewLayout,
	// Layout() {
	//   return h(NewLayout, null, {
	//     /**
	//      * 导航栏插入搜索的输入框插槽
	//      */
	//     'nav-bar-content-before': (): VNode => h(vpSearch)
	//   })
	// },
	enhanceApp({ app }: { app: App }) {
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
		app.use(ElementPlus);
		app.component('Comment', Comment);
		app.component('InfiniteScroll', InfiniteScroll);
		app.component('InfiniteScrollContainer', InfiniteScrollContainer);
		app.component('Friendship', Friendship);
		app.component('Archives', Archives);
		app.component('TimeLine', TimeLine);
		app.component('NewTimeLine', NewTimeLine);
		app.component('Paging', Paging);
		app.component('Tags', Tags);
		app.component('Model', Model);
		app.component('ModelPlay', ModelPlay);
		app.component('Fancybox', Fancybox);
		app.component('Aplayer', Aplayer);
		app.component('Album', Album);
		app.component('PhotoCloud', PhotoCloud);
		app.component('Pagination', Pagination);
		app.component('SparkModel', SparkModel);
		app.component('Message', Message);
		app.component('PerpetualCalendar', PerpetualCalendar);
		app.component('HuangLi', HuangLi);
		app.component('Process', Process);
	},
};
