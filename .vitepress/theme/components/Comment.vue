<script setup>
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';
import { onMounted, ref, watch } from 'vue'
// import { useData } from 'vitepress'
// const utterancesRef = ref()
// const { theme, isDark, params } = useData()
onMounted(() => {
  // let { repo, issueTerm = 'pathname' } = theme.value.comment
  // if (repo) {
  //   let utterances = document.createElement('script')
  //   utterances.async = true
  //   utterances.setAttribute('src', 'https://utteranc.es/client.js')
  //   utterances.setAttribute('repo', repo)
  //   utterances.setAttribute('issue-term', issueTerm)
  //   // utterances.setAttribute('theme', isDark.value ? 'github-dark' : 'github-light')
  //   utterances.setAttribute('theme', 'github-light')
  //   utterances.setAttribute('crossorigin', 'anonymous')
  //   utterancesRef.value.appendChild(utterances)
  // }
  init({
    el: '#waline',
    serverURL: 'https://waline-test-phi-roan.vercel.app/',
  });
})
</script>

<template>
  <div class="post_comments">
    <div class="line">
      <div class="line_name">评论</div>
    </div>
    <!-- <div ref="utterancesRef"></div> -->
    <div id="waline"></div>
  </div>

</template>

<style>
.utterances {
  max-width: inherit !important;
}
.post_comments {
  background-color: #fff;
  padding: 1.25rem 0;
  margin-top: 1.4rem;
}
.post_comments .line {
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eaecef;
  position: relative;
  margin-bottom: 1.2rem;
}
.post_comments .line_name {
  color: #666;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  padding-left: 1rem;
}
</style>
