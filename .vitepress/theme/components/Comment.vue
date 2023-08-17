<template>
  <div id="gitalk-container"></div>
</template>

<script>
  export default {
    name: "blog-comments",
    mounted() {
      const commentConfig = {
        // 是否开启
        enable: true,
        // 是否自动展开评论框
        autoExpand: true,
        // clientID
        clientID: "44f5d100c2b83c1884e4",
        // clientSecret
        clientSecret: "0649098ad586acc04d130fdfefe2dc2d94b22949",
        // 评论项目名
        repo: 'blog-comments',
        owner: 'boby4',
        admin: ['boby4'],
        githubID:'42525401',
        id: decodeURI(window.location.pathname),
        recentComment: true,
        language:'zh-CN',
        distractionFreeMode: true
      };
      const gitalk = new Gitalk(commentConfig);
      gitalk.render("gitalk-container");
    },
  };
</script>