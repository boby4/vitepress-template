<template>
  <div>
    <input type="file" ref="fileInput" class="border" @change="handleUpload" />
    <div class="drop-zone" @dragover.prevent @drop.prevent="handleUpload">
      <p>拖拽文件到此处或点击上传</p>
    </div>
    <div v-if="fileUrl">
      <img :src="fileUrl" alt="" />
    </div>
  </div>
  <LazyLoadImg :img="state.files" @delete="deleteImage" />
</template>

<script setup>
import LazyLoadImg from './lazyLoadImg.vue'
import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

onMounted(() => {
  fetchImages()
})

const state = reactive({
  files: [],
})

// 你的GitHub用户名和仓库名
const username = 'boby4'
const repo = 'photoCloud'
// 分支名称
const branch = 'img'
// 文件路径，这里是相对于分支的路径
const path = 'img'
const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`
const token = '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'

const fetchImages = async () => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `token ${token}`, // 带上token，一小时请求限制5000次，不带token几下就莫得了
    },
    params: {
      ref: branch, // 指定分支
    },
  })
  state.files = response.data
}

const file = ref(null);
const fileUrl = ref(null);

const handleUpload = (event) => {
  if (event.type === 'change') {
    file.value = event.target.files[0];
  } else if (event.type === 'drop') {
    file.value = event.dataTransfer.files[0];
  }
  uploadFile(file.value);
};

// 辅助函数，用于检查文件是否为图像
const isImageFile = (file) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  const fileType = file.name.split('.').pop().toLowerCase()
  return imageExtensions.includes(`.${fileType}`)
}

const uploadFile = async (files) => {
  try {
    const file = files
    const isImage = isImageFile(file)
    if (!isImage) {
      toast.warning("只能上传图片文件!", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
      return
    }
    const reader = new FileReader()
    reader.onload = async () => {
      const content = reader.result.split(',')[1]
      try {
        await axios.put(
        `https://api.github.com/repos/${username}/${repo}/contents/${path}/${file.name}`,
        {
          message: 'Add an image',
          content: content,
          branch: branch,
          committer: {
            name: 'xzm2020',
            email: '1924117768@qq.com',
          },
        },
        {
          headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      toast.success('成功上传图片,如果图片没有展示就等会就刷新下页面', {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
      fetchImages()
      } catch (e) {
        toast.warning("上传文件时出错!", {
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    reader.readAsDataURL(file)
  } catch (error) {
    console.error('上传文件时出错:', error)
  }
}

const deleteImage = async(item) => {
   try {
    await axios.delete(
      `https://api.github.com/repos/${username}/${repo}/contents/${path}/${item.name}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
        data: {
          message: 'Delete an image',
          branch: branch,
          committer: {
            name: 'xzm2020',
            email: '1924117768@qq.com',
          },
          sha: item.sha, // 提供文件的 SHA 校验和
        },
      }
    );
    // 删除成功后，从状态中移除对应的文件
    toast.success('成功删除图片，请等待github删除操作生效', {
      autoClose: 1500,
      position: toast.POSITION.TOP_CENTER,
    });
    fetchImages()
  } catch (error) {
    toast.warning('删除文件时出错', {
      autoClose: 1500,
      position: toast.POSITION.TOP_CENTER,
    });
    console.error('删除文件时出错:', error);
  }
};
</script>

<style lang="scss" scoped>
.border {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  cursor: pointer; /* 添加鼠标指针样式，让用户知道可以点击或拖拽 */
}
.drop-zone {
  border: 2px dashed gray;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.border:hover {
  background-color: lightgray; /* 添加鼠标悬停时的背景色反馈 */
}
</style>