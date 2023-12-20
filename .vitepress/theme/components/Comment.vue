<template>
  <div class="post_comments">
    <div class="line">
      <div class="line_name">评论</div>
    </div>
    <section class="page-edit">
      <div class="page-edit-read">
        <span class="leancloud-visitors" data-flag-title="Your Article Title">
          <em class="post-meta-item-text">阅读量： </em>
          <i class="leancloud-visitors-count">-</i>
        </span>
      </div>
      <div id="vcomments"></div>
    </section>
  </div>
</template>

<script setup>
import { watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import axios from 'axios'
import { remoteImport } from '../../utils/functions'

const route = useRoute()
const initValine = () => {
  let path = location.origin + location.pathname
  document.getElementsByClassName('leancloud-visitors')[0].id = path
  new Valine({
    el: '#vcomments',
    appId: 'Nt8o9ggO0lF2Sc7nAuCEuG2W-gzGzoHsz',
    appKey: 'nh5CSdDF83fdnKMWVwvs0uog',
    path: path,
    enableQQ: true,
    visitor: true,
    recordIP: true,
    requiredFields: ['mail'],
    placeholder: '输入评论内容，点击头像跳转会填写的地址，输入邮箱我才会收到你的评论邮件哟',
    emojiCDN: 'https://i.miji.bid/2023/12/19/',
    emojiMaps: {
      '摸摸你': '06ecc3c7239dc7e85db3937cdbc2b867.gif',
      '摸鱼': '46b9e74cf5255f59516ed53e87231c7e.gif',
      '打call': '478618efe49d8c489e1b760b30ebd3f8.gif',
      '给我看看': '02ca397e4aadc430af08b1e2f3121f6d.gif',
      '滚': '532dfc9a847665908863c478d9aba93c.gif',
      '哈哈哈': '2aa945a3a6ab7dcc7b243d56d29045b9.gif',
      '收到': 'f0b3b78a5a1a161b394b483ca8bd1469.gif',
      '爱你哟': '13a29c2ab30815a892e2c8f1ff201855.jpeg',
      '跟着我': '8a4d51891ed0aef2f2fde7a68cb9f215.jpeg',
      '左手': '9db909a037e7632488e1336130765311.jpeg',
      '右手': '099bbc59d2413cd8e2257e9a473ede94.jpeg',
      '一个慢动作': '8eeaa193800a2e87b6f46a20f640545c.jpeg',
      '慢动作重播': '132c2ffba54ff0759743b208e380b95f.jpeg',
      '这首歌给你快乐': '18037816e26550823cd752c05e503d48.jpeg',
      '你有没有爱上我': 'fc641ff549fce46b4a40e6e7006c7c54.jpeg',
      '亲亲': '767cba60e3497224fc1a48881596dc8e.jpeg',
      '亲亲流汗': '0c3b431c41db5a9c42119ff9702a7368.jpeg',
      '微笑': 'f3c1da87fa7e7ce5857695424028e6db.jpeg',
      '哈哈': 'c182cd6566c0295e603a3c40a62079ec.jpeg',
      '爱你哟': 'b0e8fd184fa63ad0e807c1339abba0de.jpeg',
      '黑脸耶': 'e5d99e881e9febb720857bfe6f64fd0e.jpeg',
      '流鼻血': 'fc57d6297aabd86f01c81ffe4c4c1027.jpeg',
      '笑着哭了': '09a67cf6f1e40735f2e1eb13cdf4f3c2.jpeg',
      '坏笑': 'ca8467970826b76da7fd7e22c985a8d7.jpeg',
      '目瞪口呆': '077562e0c705eacb68952cee2872ead8.jpeg',
      '教皇': 'b41ffad26f1feb57b4aa3c4d3d5ae28e.jpeg',
      '张学友': '265e4395cafeef875924c0bef97bdcd3.jpeg',
      '哟': '784c4e9e258bc51cd8a6fd65e9cc3cde.jpeg',
      '切切切': '49c454e128373a4b2d81443669b677ad.jpeg',
      '大鼻孔': '0b9fe33ff54176c634da75d3c37f25db.jpeg',
      '哭惨了': 'cb8300211fe04aaefa786610dfa2a963.jpeg',
      '来打我啊': '207650853f79156fbdcae5da1361075a.jpeg',
      '来打我呀': '03ba147d2357277f9ec75f8f8fbc7c6f.jpeg',
      '被打了': '44046956ddb506aa5fceca28e9d40e25.jpeg',
      '冷兔发疯1': '11dfaa231d079bfd127781e56900229c.gif',
      '冷兔发疯2': '5a6e14ef7200b11800d896493edca579.gif',
      '冷兔发疯3': '55b95f2c5bfe4935ad275ed8b6676887.gif',
      '问号？？': 'd433087fda1a136b9c18fad70dd30a91.jpeg',
      '咦~': 'f09f5139d0e415edfcd07504593eb256.jpeg',
      '中指': '752ed763d4a248e183e1eafb038cd7ec.jpeg',
      '龇牙眯眼': '1135255df428dcd25729f3e04dcc8e99.jpeg',
      '怒火中烧': '56c4f6a0ca1c107675b7bf9573c029e7.jpeg',
      '撅嘴巴': '3714518f97dfb676621d90d0de0274a9.jpeg',
      '撇嘴斜视': '6e91b404ee95b540fee9d10b466ede43.jpeg',
      '直勾勾斜视你': 'd5fe3c4e694370f9a3f6abb3ad47d61a.jpeg',
      '耶': '7a0ea198c8520ae0ec03e0257a0ebf02.jpeg',
      '猫咪？': 'd655521f97191591672f8cbf476a29cd.jpeg',
      '拜佛': 'dddf342b0aa5cf91d0b98a167d9f6278.jpeg',
      '笑开花': 'ab7e99f2a052cf4aca5b7118f7287218.jpeg',
      '笑哈哈': '347cde13a95fa2047bc8caffe8108649.jpeg',
      '笑脸': 'ba5af085f8ef7e32a46d54be3bd6cac0.jpeg',
    }
  })
}

watch(
  () => route.path,
  () => {
    initValine()
  }
)

onMounted(() => {
  // remoteImport('//cdn.jsdelivr.net/gh/HCLonely/Valine@latest/dist/Valine.min.js').then(() => {
  remoteImport('/js/valine.js').then(() => {
    initValine()
    const submitButton = document.querySelector('.vsubmit');
    submitButton.addEventListener('click', handleButtonClick);
  })
})

const handleButtonClick = async() => {
  const nick = document.querySelector('.vnick');
  const mail = document.querySelector('.vmail');
  const link = document.querySelector('.vlink');
  const message = document.querySelector('#veditor');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailRegex.test(mail.value)) {
    await axios.post('https://formspree.io/f/xbjnrozw', {Message: message.value, Email: mail.value, Name: nick.value, Link: link.value})
  }
}

onBeforeUnmount(() => {
  const submitButton = document.querySelector('.vsubmit');
  submitButton.removeEventListener('click', handleButtonClick);
})
</script>

<style lang="scss">
#veditor {
  background-image: url(https://pic.imgdb.cn/item/655dd56fc458853aef7b4274.webp);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
  background-color: rgba(255, 255, 255, 0);
  resize: vertical;
}
#vcomments .vheader .vnick {
  width: 29%;
  border: 1px solid #dedede;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
}
#vcomments .vheader .vmail {
  width: 29%;
  border: 1px solid #dedede;
  margin-left: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
}
#vcomments .vpanel .vwrap{
  padding-bottom: 0;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
}
#vcomments .vheader .vlink {
  width: 29%;
  border: 1px solid #dedede;
  margin-left: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
}
img.vimg {
  transition: all 1s; /* 旋转时间为 1s */
}
img.vimg:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
}
#vcomments .vcount{
  font-size: 1rem;
  font-weight: 550;
}
#vcomments .vcards .vcard {
  margin: 0 1px;
  padding: 15px 20px 0 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  // border: 1px solid #dedede;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}
#vcomments .vcards .vcard:hover {
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
}
#vcomments .vcards .vcard .vh .vcard {
  border: none;
  box-shadow: none;
}
#vcomments .vcards .vcard .vh .vhead .vsys{
  background: #828282;
  padding: 0 0.2rem;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
}
#vcomments .vrow .vsubmit{
  color: #555;
  padding: 0.5em 2.3em;
  margin: 0 0.5em;
  min-width: 60px;
  max-width: 100%;
  background: #e9eff3;
  font-weight: bold;
}
#vcomments .vemojis{
  max-height: 200px;
}
#vcomments .vemojis i{
  width: 4rem;
  margin: 0 .2rem;
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
.page-edit-read {
  font-size: 14px;
  text-align: right;
  margin: 14px 0;
}
</style>
