/**
 * 顶部导航栏菜单
 */
export const nav = [
  { text: "首页", link: "/" },
  { text: "博客", link: "/pages/blog" },
  { text: "项目", link: "/pages/projects" },
  { text: "AI Lab", link: "/pages/lab" },
  { text: "关于", link: "/pages/about" },
  { text: '更多',
    items: [
      { text: '时间轴', link: '/pages/timeline' },
      { text: '标签', link: '/pages/tags' },
      { text: '友情链接', link: '/pages/link' },
      { text: 'AI 对话', link: '/pages/game' },
      { text: '模型展示', link: '/pages/model' },
      { text: '流程图设计', link: '/pages/process' },
      { text: '日历', link: '/pages/calendar' },
    ]
  }
]
