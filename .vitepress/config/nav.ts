/**
 * 顶部导航栏菜单
 *
 * @see Nav https://vitepress.vuejs.org/guide/theme-nav#nav
 */
export const nav = [
  { text: "🏠 首页", link: "/" },
  { text: "📂 分类", link: "/more/tags" },
  {
    text: '📅 文档',
    // activeMatch: '/docs/',
    link: '/docs/hello'
  },
  {
    text: '🔨 关于',
    items: [
      { text: "📜 README", link: "/README" },
      { text: "📫 订阅我", link: "/more/subscribe" },
      { text: "📝 建站日志", link: "/more/update-log" },
    ]
  },
]
