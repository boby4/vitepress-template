import { defineConfig } from 'vitepress';
import { nav } from './config/nav';
import { PluginTable } from './plugin';
import type MarkdownIt from 'markdown-it';
import { getPosts } from './utils/serverUtils.js'

//每页的文章数量
const pageSize:number = 5
const asyncConfig = async () => {
  const posts = await getPosts(pageSize);
	return defineConfig({
		title: '前端日记',
		cacheDir: '../../node_modules',
		description: '前端日记,xuzhiming,blog',
		head: [
			["script", {}, `
				var _hmt = _hmt || [];
				(function(d,t) {
					var hm = document.createElement("script");
					hm.src = "https://hm.baidu.com/hm.js?4a88589ecdf72275a34f08d9d5681a96";
					var s = document.getElementsByTagName("script")[0];
					s.parentNode.insertBefore(hm, s);
				})();
			`],
			["script", {}, `
				(function(d,t) {
					var BASE_URL="https://app.chatwoot.com";
					var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
					g.src=BASE_URL+"/packs/js/sdk.js";
					g.defer = true;
					g.async = true;
					s.parentNode.insertBefore(g,s);
					g.onload=function(){
						window.chatwootSDK.run({
							websiteToken: '6Arch8oyeok91jWJ7dwA9LVV',
							baseUrl: BASE_URL
						})
					}
				})(document,"script");
			`],
			['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' }],
			['meta', { name: 'keywords', content: '前端日记,xuzhiming,blog' }],
			['link', { rel: 'icon', href: '/favicon.ico' }],
			//播放器插件
			['link', { rel: 'prefetch', href: 'https://xzmblog.onrender.com' }], // 预取回 Prefetch
			['link', { rel: 'preconnect', href: 'https://xzmblog.onrender.com' }], // 预连接 Preconnect
			['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css' }],
			['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }],
			['script', { src: 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js' }],
			['script', { src: 'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js' }],
			['script', { src: 'https://html2canvas.hertzen.com/dist/html2canvas.min.js' }],
			// ['script', { src: 'https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js' }], // live2d动漫人物
			// ['script', { src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }], // 网站统计
			// ['script', { src: 'https://sdk.jinrishici.com/v2/browser/jinrishici.js' }], // 今日诗词
			['script', { src: '/js/clickText.js' }], // 点击文字特效
			// ['script', { src: 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.13/dist/index.min.js' }], // vue3-toastify
			// ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.13/dist/index.min.css' }],
		],
		// lastUpdated: true,
		// 主题配置
		themeConfig: {
			logo: '/favicon.ico',
			posts: posts,
			website: 'https://xzmblog.onrender.com',
			// 评论的仓库地址
			comment: {
				repo: 'boby4/blog-comments',
				themes: 'github-light',
				issueTerm: 'pathname'
			},
			// editLink: {
			// 	pattern: 'https://github.com/boby4/vitepress-template/tree/master/:path',
			// 	text: '在 GitHub 上编辑此页'
			// },
			outlineTitle: '文章摘要',
			// 配置导航栏图表
			socialLinks: [
				{
					icon: 'github',
					link: 'https://github.com/boby4',
				},
				{
					icon: {
						svg: '<svg t="1692263449646" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3999" width="200" height="200"><path d="M512 960c-246.4 0-448-201.6-448-448s201.6-448 448-448 448 201.6 448 448-201.6 448-448 448z" fill="#D81E06" p-id="4000"></path><path d="M721.664 467.968h-235.52a22.272 22.272 0 0 0-20.736 20.736v51.776c0 10.368 10.368 20.736 20.736 20.736H628.48c10.368 0 20.736 10.304 20.736 20.672v10.368c0 33.664-28.48 62.08-62.144 62.08H392.896a22.272 22.272 0 0 1-20.672-20.672V436.928c0-33.664 28.48-62.08 62.08-62.08h287.36a22.272 22.272 0 0 0 20.736-20.736v-51.84a22.272 22.272 0 0 0-20.736-20.672h-287.36A152.96 152.96 0 0 0 281.6 434.368v287.36c0 10.304 10.368 20.672 20.736 20.672h302.848c75.072 0 137.216-62.08 137.216-137.216v-116.48a22.272 22.272 0 0 0-20.736-20.736z" fill="#FFFFFF" p-id="4001"></path></svg>',
					},
					link: 'https://gitee.com/wx_8f09a3c8d9_admin',
				},
			],
			nav,
		},
		// 自定义 markdown 解析器
		markdown: {
			// 配置 Markdown-it 实例
			config: (md: MarkdownIt): void => {
				md.use(PluginTable);
			},
		},
	});
}

export default asyncConfig()
