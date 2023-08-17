import { defineConfig } from 'vitepress'
import { nav } from './config/nav'
import { sidebar } from './config/sidebar'
import { PluginTable } from './plugin'
import type MarkdownIt from 'markdown-it'

/**
 * 更多配置项参考：
 *
 * @see app-configs https://vitepress.vuejs.org/config/app-configs.html
 */
export default defineConfig({
  head: [
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
      },
    ],
    ["meta", { name: "keywords", content: "前端日记,xuzhiming,blog" }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    // 引入 Gitalk
    [
      "link",
      { rel: "stylesheet", href: "https://lib.baomitu.com/gitalk/1.7.0/gitalk.min.css" },
    ],
    ["script", { src: "https://lib.baomitu.com/gitalk/1.7.0/gitalk.min.js" }],
    ["script", { src: "https://lib.baomitu.com/axios/0.21.1/axios.js" }]
  ],
  title: '前端日记',
  /**
   * 是否显示最后更新时间
   *
   * @see last-updated https://vitepress.vuejs.org/guide/theme-last-updated#last-updated
   */
  lastUpdated: true,
  /**
   * 缓存目录
   *
   * @see cacheDir https://vitepress.vuejs.org/config/app-configs#cachedir
   */
  cacheDir: '../../node_modules',
  /**
   * 主题配置
   *
   * @see theme-config https://vitepress.vuejs.org/guide/migration-from-vitepress-0#theme-config
   */
  themeConfig: {
    /**
     * 最后更新时间的文案显示
     *
     * @see lastUpdatedText https://vitepress.vuejs.org/config/theme-configs#lastupdatedtext
     */
    lastUpdatedText: '最后更新时间',
    /**
     * 配置导航栏图表
     *
     * @see socialLinks https://vitepress.vuejs.org/config/theme-configs#sociallinks
     */
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/boby4'
      },
      {
        icon: {
          svg: '<svg t="1692263449646" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3999" width="200" height="200"><path d="M512 960c-246.4 0-448-201.6-448-448s201.6-448 448-448 448 201.6 448 448-201.6 448-448 448z" fill="#D81E06" p-id="4000"></path><path d="M721.664 467.968h-235.52a22.272 22.272 0 0 0-20.736 20.736v51.776c0 10.368 10.368 20.736 20.736 20.736H628.48c10.368 0 20.736 10.304 20.736 20.672v10.368c0 33.664-28.48 62.08-62.144 62.08H392.896a22.272 22.272 0 0 1-20.672-20.672V436.928c0-33.664 28.48-62.08 62.08-62.08h287.36a22.272 22.272 0 0 0 20.736-20.736v-51.84a22.272 22.272 0 0 0-20.736-20.672h-287.36A152.96 152.96 0 0 0 281.6 434.368v287.36c0 10.304 10.368 20.672 20.736 20.672h302.848c75.072 0 137.216-62.08 137.216-137.216v-116.48a22.272 22.272 0 0 0-20.736-20.736z" fill="#FFFFFF" p-id="4001"></path></svg>'
        },
        link: 'https://gitee.com/wx_8f09a3c8d9_admin'
      },
    ],
    nav,
    sidebar
  },
  /**
   * 自定义 markdown 解析器
   *
   * @see markdown https://vitepress.vuejs.org/config/app-configs#markdown
   */
  markdown: {
    /**
     * 配置 Markdown-it 实例
     *
     * @param { Object } md markdown 实例
     */
    config: (md: MarkdownIt): void => {
      md.use(PluginTable)
    }
  }
})
