<!-- <template>
  <div class="design">
    <div class="leftBox">
      <div class="leftSide">
        <div class="makeSide">
          <li v-for="(item, index) in sideData" @click="sideChange(item)" :key="index"
            :style="{ background: indexside == item.id ? '#0A48EF' : '' }">
            <div class="sideContent">
              <img :src="getAssetsImages(item.imgName)" :style="{
                filter: indexside == item.id ? 'drop-shadow(36px 0 #fff)' : 'drop-shadow(36px 0 #959598)',
                position: 'absolute',
                left: '-36px',
                marginLeft: '0px',
              }" />
            </div>
            <p :style="{ color: indexside == item.id ? '#fff' : 'rgba(0, 0, 0, 0.6)' }">
              {{ item.name }}
            </p>
          </li>
        </div>
      </div>
      <div class="leftContent">
        <ul class="sul">
          <li class="moteList" v-for="(item, index) in matterList" :key="index">
            <div class="imgBox">
              <img :src="item.url" v-lazy="item.url" :style="{
                border: backId == item.objectId ? '2px solid #0A48EF' : '',
              }" @click="selectResource(item)" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="centerBox">
      <img v-if="background" :src="background" style="width: 100%; height: 100%" />
      <Vue3DraggableResizable v-for="(item, index) in diys" :key="index" :active="true"
        :handles="['tl', 'tr', 'br', 'bl']" :x="item.left" :y="item.top" :w="item.width" :h="item.height"
        :lockAspectRatio="true" @drag-end="locationDiy($event, index)" @resize-end="locationDiy($event, index)"
        @resizing="resizingHandle($event, index)">
        <img style="cursor: pointer" :src="item.url" v-if="item.url" @contextmenu.stop="rightClick($event, item, index)"
          :style="{
            width: item.width + 'px',
            height: item.height + 'px',
            top: '0px',
            position: 'absolute',
          }" />
      </Vue3DraggableResizable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import ContextMenu from '@imengyu/vue3-context-menu'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { request } from '../../utils/request'
onMounted(() => {
  getBackgroundList()
})
const diys = ref([
  {
    url: 'https://luanmioss.oss-cn-wulanchabu.aliyuncs.com/93955e4ae135a6e0d28ef04ebcfd0e68.png',
    left: 0,
    top: 0,
    width: 468,
    height: 832,
  }
])
const background = ref('')
const indexside = ref(1)
const matterList = ref([])
const backId = ref()
const getBackgroundList = async() => {
  let res = []
  switch (indexside.value) {
    case 1:
      res = await request('/classes/Background')
      matterList.value = res.results
      break;
    case 2:
      res = await request('/classes/Character')
      matterList.value = res.results
      break;
    case 3:
      res = await request('/classes/Background')
      matterList.value = res.results
      break;
  }
}
const selectResource = (item) => {
  backId.value = item.objectId
  background.value = item.url
}
const sideData = ref([
  {
    id: 1,
    imgName: 'bgact',
    imgAct: 'bg',
    name: '背景',
  },
  {
    id: 2,
    imgName: 'szr',
    imgAct: 'szract',
    name: '模特',
  },
  {
    id: 3,
    imgName: 'bgact',
    imgAct: 'bg',
    name: '前景',
  },
]);

const sideChange = (item) => {
  console.log('indexside', item.id)
  indexside.value = item.id;
  getBackgroundList()
};

const getAssetsImages = (name) => {
  return new URL(`/public/src/img/${name}.svg`, import.meta.url).href;
}

// 插图位置变化
const locationDiy = (e, index) => {
  diys.value[index].top = e.y
  diys.value[index].left = e.x
}

// 插图尺寸变化
const resizingHandle = (e, index) => {
  diys.value[index].width = e.w
  diys.value[index].height = e.h
}

const rightClick = (e, item, index) => {
  e.preventDefault();
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    items: [
      {
        label: '置于上层',
        disabled: index >= diys.value.length - 1,
        onClick: () => {
          diys.value.splice(index, 1)
          diys.value.splice(index + 1, 0, item)
        },
      },
      {
        label: '置于下层',
        disabled: index < 1,
        onClick: () => {
          diys.value.splice(index, 1)
          diys.value.splice(index - 1, 0, item)
        },
      },
      {
        label: '删除',
        onClick: () => {
          diys.value.splice(index, 1)
        },
      },
    ],
  });
}

</script>

<style lang="scss" scoped>
.design {
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 4rem;
  left: 0;
  padding-top: 30px;
}

.leftBox {
  width: 476px;
  height: 100%;

  .leftSide {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 122px;
    height: 100%;
    opacity: 1;
    background: #F9F9FE;

    .makeSide {
      margin-left: 24px;
      margin-top: 20px;

      li {
        width: 74px;
        height: 74px;
        border-radius: 12px;
        padding-top: 12px;
        margin-top: 20px;
        box-sizing: border-box;
        list-style-type: none;
        cursor: pointer;
        text-align: center;

        .sideContent {
          position: relative;
          width: 36px;
          overflow: hidden;
          margin: auto;
          height: 36px;
          text-align: center;
        }

        img {
          width: 36px;
          height: 36px;
        }

        p {
          font-family: Source Han Sans CN;
          font-size: 16px;
          font-weight: 500;
          line-height: normal;
          margin: 0;
          text-align: center;
          letter-spacing: 0em;
        }
      }
    }
  }

  .leftContent {
    position: absolute;
    left: 122px;
    top: 0;
    width: 354px;
    height: 100%;
    opacity: 1;
    background: #FFFFFF;
    border: 1px solid #f1f1f1;
    overflow-y: scroll;
    padding-bottom: 40px;

    .sul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 20px;
      .moteList {
        text-align: center;
        display: inline-block;
        margin-bottom: 20px;
        em {
          font-family: Source Han Sans CN;
          font-size: 14px;
          font-weight: 500;
          color: #000000;
        }
        .imgBox {
          height: 250px;
          width: 141px;
          background-color: #fcfcfd;
          margin-bottom: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
            cursor: pointer;
          }
        }
      }

      .foregroundList {
        em {
          font-family: Source Han Sans CN;
          font-size: 14px;
          font-weight: 500;
          color: #000000;
        }
        .imgBox {
          width: 140px;
          height: 140px;
          border-radius: 6px;
          opacity: 1;
          background: rgba(10, 72, 239, 0.03);
          margin-bottom: 24px;
          padding: 10px;
          img {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 6px;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.centerBox {
  width: 468px;
  height: 832px;
  overflow: hidden;
  position: relative;
  transform: translate(50%);
  background-color: #78ff9b;

  .img1 {
    position: absolute;
    top: -5px;
  }
}</style> -->
