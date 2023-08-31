/**
 * 顶部导航栏菜单
 */
export const nav = [
  { text: "🏠 首页", link: "/" },
  { text: "📅 时间线", link: "/pages/archives" },
  { text: '🌈 标签',
    // link: '/pages/tags',
    items: [
      { text: "# Vue", link: "/pages/tags?tag=vue", target: '_self', rel: 'sponsored' },
      { text: "# 组件", link: "/pages/tags?tag=组件", target: '_self', rel: 'sponsored' },
      { text: "# threejs", link: "/pages/tags?tag=threejs", target: '_self', rel: 'sponsored' },
      { text: "# 机器人", link: "/pages/tags?tag=机器人", target: '_self', rel: 'sponsored' },
    ]
  },
  { text: '💌 友情链接', link: '/pages/link' },
  { text: '👋 示例', link: '/pages/about' }
]
