<template>
  <div class="dndout">
    <el-dialog v-model="visible" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">预览</h4>
          <el-button size="small" type="success" @click="handleDown" style="position: absolute;top:20px;right: 20px;">
            下载
          </el-button>
        </div>
      </template>
      <pre v-if="!showImg">{{flowData}}</pre>
      <img v-else :src="previewImg">
    </el-dialog>
    <el-form :inline="true" style="position: absolute;right: 2rem;">
      <el-button size="small" type="success" @click="handleConsole">在控制台打印数据</el-button>
      <el-button size="small" type="success" @click="handlePreview">预览JSON数据</el-button>
      <el-button size="small" type="primary" @click="generateImages">生成图片</el-button>
    </el-form>
    <div class="dndflow" @drop="onDrop" style="height: 700px">
      <div class="aside">
        <div class="nodes">
          <template v-for="type in Object.keys(choiceNode)" :key="type">
            <div class="vue-flow__node-default" :draggable="true" @dragstart="onDragStart($event, type)">
              <div v-if="type != 'image'">
                <i :class="'icon-' + type"></i><strong>{{ choiceNode[type] }}</strong>
              </div>
              <div v-else>
                <el-icon><Picture /></el-icon><strong>图片</strong>
              </div>
            </div>
          </template>
        </div>
      </div>
      <VueFlow
        @dragover="onDragOver"
        @node-click="nodeClick"
        @edge-click="edgeClick"
        :default-viewport="{ zoom: 1 }"
        :min-zoom="0.2"
        :max-zoom="4"
        fit-view-on-init
      >
        <Background />
        <div class="wrapper-tips">
          <div class="wrapper-tips-item">
            <el-switch v-model="nodesShow" @change="changeNodesShow"></el-switch>
            <span>显示</span>
          </div>
        </div>
        <template #node-oval="{ data }">
          <NodeBox :data="data"></NodeBox>
        </template>
        <template #node-square="{ data }">
          <NodeBox :data="data"></NodeBox>
        </template>
        <template #node-ysquare="{ data }">
          <NodeBox :data="data"></NodeBox>
        </template>
        <template #node-rhomboid="{ data }">
          <NodeBox :data="data"></NodeBox>
        </template>
        <template #node-circle="{ data }">
          <NodeBox :data="data"></NodeBox>
        </template>
        <template #node-image="{ data }">
          <NodeBox :data="data"></NodeBox>
        </template>
      </VueFlow>

      <ProcessEditDrawer v-model:editDrawer="editDrawer" :editTitle="editTitle" :editData="editData" @close="handleClose"
        @deleteNode="deleteNode"
        @deleteEdge="deleteEdge"
      ></ProcessEditDrawer>
    </div>
  </div>
</template>

<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { nextTick, watch, ref, onMounted } from 'vue'
import NodeBox from './NodeBox.vue'
import ProcessEditDrawer from './ProcessEditDrawer.vue'
import { Picture } from '@element-plus/icons-vue'
import { connectSetting, choiceNode, imageNodeSetting, nodeSetting } from '../../utils/flowChatSetting'
import { ElMessageBox } from 'element-plus'
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';

onMounted(() => {
  if(innerWidth < 768){
    ElMessageBox.confirm(
    '当前页面不支持适配移动端，请在pc端网页打开！',
    'Warning',
    {
      confirmButtonText: 'OK',
      showCancelButton: false,
      type: 'warning',
      center: true,
    }
  ).then(() => {}).catch(() => {})
  }
})
function onDragStart(event, nodeType) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}

function handleClose() {
  editDrawer.value = false
  deSelect()
}

let id = 0
function getId() {
  return `dndnode_${id++}`
}

const { toObject, findNode, onConnect, addEdges, addNodes, project, vueFlowRef, nodes, edges, getNode, getEdge,
removeEdges, removeNodes,
} = useVueFlow({
  nodes: [],
})

function deleteNode(e) {
  removeNodes(e)
}

function deleteEdge(e) {
  removeEdges(e)
}

const nodesShow = ref(true)
function changeNodesShow(e) {
  nodes.value.forEach((n) => (n.hidden = !nodesShow.value))
  edges.value.forEach((e) => (e.hidden = !nodesShow.value))
}

function onDragOver(event) {
  nodesShow.value = true
  changeNodesShow(true)
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const editDrawer = ref(false)
const editTitle = ref('')
let editData = ref({})
let flagId = ''
function nodeClick(e) {
  const nodeId = e.node.id
   if(flagId && flagId !== nodeId) {
    deSelect()
  }
  selectNode(nodeId)
  editData.value = getNode.value(nodeId)
  editDrawer.value = true
  let nodeType = e.node.type
  editTitle.value = nodeType === 'image' ? '编辑图片节点' : '编辑节点'
}

function deSelect() {
  if (flagId) {
    const oldNode = findNode(flagId)
    oldNode.data.selected = false
  }
}

function selectNode(nodeId) {
  const node = findNode(nodeId)
  node.data.selected = true
  flagId = nodeId
}

const edgeId = ref(0)
function edgeClick(e) {
  deSelect()
  editDrawer.value = true
  editTitle.value = '编辑连线'
  edgeId.value = e.edge.id
  editData.value = getEdge.value(e.edge.id)
  console.log('点击的连接线', editData.value)
}

onConnect((params) => {
  let data = Object.assign({}, params, connectSetting)
  console.log('新的连接线', data)
  addEdges(data)
})

function onDrop(event) {
  const type = event.dataTransfer?.getData('application/vueflow')
  const { left, top } = vueFlowRef.value.getBoundingClientRect()
  const position = project({
    x: event.clientX - left,
    y: event.clientY - top,
  })
  const newNode = type == 'image' ? imageNodeSetting(type, position) : nodeSetting(type, position)
  addNodes([newNode])
  nextTick(() => {
    const node = findNode(newNode.id)
    const stop = watch(
      () => node.dimensions,
      (dimensions) => {
        if (dimensions.width > 0 && dimensions.height > 0) {
          node.position = {
            x: node.position.x - node.dimensions.width / 2,
            y: node.position.y - node.dimensions.height / 2,
          }
          stop()
        }
      },
      { deep: true, flush: 'post' }
    )
  })
}

let flowData = ref(null);
function handleConsole() {
  flowData.value = toObject()
  console.log(toObject())
}

let visible = ref(false);
function handlePreview() {
  showImg.value = false;
  visible.value = true;
  handleConsole()
}

let canvasRef = ref(null);
let previewImg = ref();
let showImg = ref(false);
function generateImages() {
  visible.value = true;
  showImg.value = true;
  nextTick(() => {
    html2canvas(vueFlowRef.value).then((canvas) => {
      previewImg.value = canvas.toDataURL('image/webp');
    });
  })
}

function handleDown() {
  if(!showImg.value) {
    const jsonBlob =new Blob([JSON.stringify(flowData.value)], { type: "application/json" });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  } else {
    let a = document.createElement('a')
		a.href = previewImg.value;
		a.download = "data.png";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a)
  }
}

</script>

<style lang="scss" scoped>

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}
.dndout{
  position: fixed;
  width: 100%;
  left: 0;
}
.dndflow {
  padding-top: 15px;
  margin: 2rem;
  display: flex;
  flex-direction: row;
}
.dndflow .aside {
  min-width: 200px;
  height: 100%;
  color: #fff;
  font-weight: 700;
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: rgba(16, 185, 129, 0.75);
  box-shadow: 0 5px 10px #0000004d;
}
.dndflow .aside .nodes > * {
  margin-bottom: 20px;
  cursor: grab;
  font-weight: 500;
  box-shadow: 5px 5px 10px 2px #00000040;
  i {
    vertical-align: middle;
    margin-top: -2px;
    margin-right: 5px;
  }
}

i.icon-oval {
  display: inline-block;
  width: 16px;
  height: 10px;
  border-radius: 10px;
  border: 2px solid #555;
}

i.icon-square {
  display: inline-block;
  width: 16px;
  height: 10px;
  border: 2px solid #555;
}
i.icon-ysquare {
  display: inline-block;
  width: 16px;
  height: 10px;
  border-radius: 4px;
  border: 2px solid #555;
}
i.icon-rhomboid {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 2px solid #555;
  transform: skew(-30deg);
}
i.icon-circle {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  border: 2px solid #555;
}
.wrapper-tips {
  padding: 10px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 555;
  top: 0;
  left: 0;
  .wrapper-tips-item {
    span {
      padding-left: 10px;
      font-size: 12px;
    }
  }
}
</style>