<template>
  <div class="all">
    <div class="antv-content">
      <div class="antv-menu">
        <h3>基础图形列表</h3>
        <ul class="menu-list">
          <li draggable="true" @drag="menuDrag('defaultOval')">
            <i class="icon-oval"></i> <strong>椭圆形</strong>
          </li>
          <li draggable="true" @drag="menuDrag('defaultSquare')">
            <i class="icon-square"></i><strong>矩形</strong>
          </li>
          <li draggable="true" @drag="menuDrag('defaultYSquare')">
            <i class="icon-ysquare"></i><strong>圆角矩形</strong>
          </li>
          <li draggable="true" @drag="menuDrag('defaultRhombus')">
            <i class="icon-rhombus"></i><strong>菱形</strong>
          </li>
          <li draggable="true" @drag="menuDrag('defaultRhomboid')">
            <i class="icon-rhomboid"></i><strong>平行四边形</strong>
          </li>
          <li draggable="true" @drag="menuDrag('defaultCircle')">
            <i class="icon-circle"></i><strong>圆形</strong>
          </li>
          <li draggable="true" @drag="menuDrag('otherImage')">
            <el-icon name=""><Picture /></el-icon><strong>图片</strong>
          </li>
        </ul>
      </div>
      <div class="antv-wrapper">
        <div
          class="wrapper-canvas"
          :style="{ height: props.height }"
          id="wrapper"
          @drop="drop($event)"
          @dragover.prevent
        ></div>
        <div class="wrapper-tips">
          <div class="wrapper-tips-item">
            <el-switch
              v-model="isPortsShow"
              @change="changePortsShow"
            ></el-switch>
            <span>链接桩常显</span>
          </div>
        </div>
      </div>
      <div v-if="editDrawer" class="edit-main">
        <div class="edit-main-title">
          <h3>{{ editTitle }}</h3>
          <i class="el-icon-close" @click="closeEditForm"></i>
        </div>
        <div v-if="editTitle === '编辑节点'" class="form-main">
          <el-form ref="nodeForm" :model="form" label-width="80px">
            <el-form-item label="节点文本">
              <el-input
                v-model="form.labelText"
                size="small"
                @input="changeNode('labelText', form.labelText)"
              ></el-input>
            </el-form-item>
            <el-form-item label="字体大小">
              <el-input
                v-model="form.fontSize"
                size="small"
                @input="changeNode('fontSize', form.fontSize)"
              ></el-input>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker
                v-model="form.fontFill"
                @change="changeNode('fontFill', form.fontFill)"
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="节点背景">
              <el-color-picker
                v-model="form.fill"
                @change="changeNode('fill', form.fill)"
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="边框颜色">
              <el-color-picker
                v-model="form.stroke"
                @change="changeNode('stroke', form.stroke)"
              ></el-color-picker>
            </el-form-item>
            <div class="see-box">
              <h5>预览</h5>
              <div
                class="see-item"
                :style="{
                  background: form.fill,
                  color: form.fontFill,
                  'border-color': form.stroke,
                  'font-size': form.fontSize + 'px',
                }"
              >
                {{ form.labelText }}
              </div>
            </div>
          </el-form>
        </div>
        <div v-if="editTitle === '编辑图片节点'" class="form-main">
          <el-form ref="imageForm" :model="form" label-width="80px">
            <el-form-item label="节点文本">
              <el-input
                v-model="form.labelText"
                size="small"
                @input="changeImageNode('labelText', form.labelText)"
              ></el-input>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker
                v-model="form.labelFill"
                @change="changeImageNode('labelFill', form.labelFill)"
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="节点背景">
              <el-color-picker
                v-model="form.fill"
                @change="changeImageNode('fill', form.fill)"
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="图片地址">
              <el-input
                v-model="form.xlinkHref"
                size="small"
                placeholder="图片地址"
                @input="changeImageNode('xlinkHref', form.xlinkHref)"
              ></el-input>
              <el-image
                :src="form.xlinkHref"
                style="width: 80px; height: 80px; background: #f2f2f2"
                fit="fill"
              ></el-image>
            </el-form-item>
            <el-form-item label="图片尺寸">
              <span style="font-size: 14px; padding-right: 5px; color: #888"
                >宽</span
              ><el-input-number
                v-model="form.width"
                :min="0"
                label="宽"
                size="mini"
                @change="changeImageNode('width', form.width)"
              ></el-input-number>
              <span style="font-size: 14px; padding-right: 5px; color: #888"
                >高</span
              ><el-input-number
                v-model="form.height"
                :min="0"
                label="高"
                size="mini"
                @change="changeImageNode('height', form.height)"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="editTitle === '编辑连线'" class="form-main">
          <el-form ref="edgeForm" :model="form" label-width="80px">
            <el-form-item label="标签内容">
              <el-input
                v-model="form.label"
                size="small"
                placeholder="标签文字，空则没有"
                @input="
                  changeEdgeLabel(
                    form.label,
                    labelForm.fontColor,
                    labelForm.fill,
                    labelForm.stroke
                  )
                "
              ></el-input>
              <div v-if="form.label" class="label-style">
                <p>
                  字体颜色：<el-color-picker
                    v-model="labelForm.fontColor"
                    size="mini"
                    @change="
                      changeEdgeLabel(
                        form.label,
                        labelForm.fontColor,
                        labelForm.fill,
                        labelForm.stroke
                      )
                    "
                  ></el-color-picker>
                </p>
                <p>
                  背景颜色：<el-color-picker
                    v-model="labelForm.fill"
                    size="mini"
                    @change="
                      changeEdgeLabel(
                        form.label,
                        labelForm.fontColor,
                        labelForm.fill,
                        labelForm.stroke
                      )
                    "
                  ></el-color-picker>
                </p>
                <p>
                  描边颜色：<el-color-picker
                    v-model="labelForm.stroke"
                    size="mini"
                    @change="
                      changeEdgeLabel(
                        form.label,
                        labelForm.fontColor,
                        labelForm.fill,
                        labelForm.stroke
                      )
                    "
                  ></el-color-picker>
                </p>
              </div>
            </el-form-item>
            <el-form-item label="线条颜色">
              <el-color-picker
                v-model="form.stroke"
                size="small"
                @change="changeEdgeStroke"
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="线条样式">
              <el-select
                v-model="form.connector"
                size="small"
                placeholder="请选择"
                @change="changeEdgeConnector"
              >
                <el-option label="直角" value="normal"></el-option>
                <el-option label="圆角" value="rounded"></el-option>
                <el-option label="平滑" value="smooth"></el-option>
                <el-option label="跳线(两线交叉)" value="jumpover"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="线条宽度">
              <el-input-number
                v-model="form.strokeWidth"
                size="small"
                @change="changeEdgeStrokeWidth"
                :min="2"
                :step="2"
                :max="6"
                label="线条宽度"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="双向箭头">
              <el-switch
                v-model="form.isArrows"
                @change="changeEdgeArrows"
              ></el-switch>
            </el-form-item>
            <el-form-item label="流动线条">
              <el-switch
                v-model="form.isAnit"
                @change="changeEdgeAnit"
              ></el-switch>
            </el-form-item>
            <el-form-item label="调整线条">
              <el-switch
                v-model="form.isTools"
                @change="changeEdgeTools"
              ></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div class="edit-btn">
          <el-button type="danger" @click="handlerDel" style="width: 100%"
            >删除此{{ editTitle === '编辑节点' ? '节点' : '连线' }}</el-button
          >
        </div>
      </div>
    </div>
    <!-- <div class="wrapper-btn" v-if="isChange">
            <el-button type="success" @click="handlerSend">保存当前方案</el-button>
        </div> -->
  </div>
</template>
<script setup lang="ts" name="AntV6X">
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Graph, Shape } from '@antv/x6'
import { Keyboard } from '@antv/x6-plugin-keyboard' // 注意要单独引入
import { Selection } from '@antv/x6-plugin-selection' // 注意要单独引入
import {
  configSetting,
  configNodeShape,
  configNodePorts,
  configEdgeLabel,
  graphBindKey,
} from '../../utils/antvSetting'
const props = defineProps({
  height: {
    type: String,
    default: '720px',
  },
  width: {
    type: String,
    default: '520px',
  },
  modelValue: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['cellChanged', 'finish', 'update:modelValue'])
const graphObj = ref() as any
const isPortsShow = ref(true)
const changePortsShow = (val: boolean) => {
  const container = document.getElementById('wrapper')
  const ports =
    (container && container.querySelectorAll('.x6-port-body')) || ([] as any[])
  if (!ports.length) return
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = val ? 'visible' : 'hidden'
  }
}
// 初始化方法
const initGraph = () => {
  const graph = new Graph({
    container: document.getElementById('wrapper') as any,
    ...configSetting(Shape),
  }) as any
  // 画布事件 注意这里1.x和2.x的是有区别，选择和键盘事件都要单独引入，别搞错了。
  graph.on('node:mouseenter', () => {
    changePortsShow(true)
  })
  graph.on('node:mouseleave', () => {
    if (isPortsShow.value) return
    changePortsShow(false)
  })
  // 点击编辑
  graph.on('cell:click', ({ cell }) => {
    editForm(cell)
  })
  // 画布键盘事件
  graph.use(
    new Keyboard({
      enabled: true,
    })
  )
  graph.use(
    new Selection({
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
    })
  )
  graphBindKey(graph)
  // 删除
  graph.bindKey(['delete', 'backspace'], () => {
    handlerDel()
  })
  // 赋值
  graphObj.value = graph
  // #endregion
  // 返现方法
  if (props.modelValue && JSON.parse(props.modelValue).length) {
    const resArr = JSON.parse(props.modelValue)
    const portsGroups = configNodePorts().groups
    if (resArr.length) {
      const jsonTemp = resArr.map((item: any) => {
        if (item.ports) item.ports.groups = portsGroups
        return item
      })
      graph.fromJSON(jsonTemp)
    }
  }
}
// 拖拽
const menuItem = ref<any>({})
const menuDrag = (type: string) => {
  menuItem.value = configNodeShape(type)
}
const drop = (event: any) => {
  const nodeItem = {
    ...menuItem.value,
    x: event.offsetX - menuItem.value.width / 2,
    y: event.offsetY - menuItem.value.height / 2,
    ports: configNodePorts(),
  }
  // 创建节点
  graphObj.value.addNode(nodeItem)
}
const selectCell = ref()
const editTitle = ref('')
const editDrawer = ref(false)
let form = reactive({
  label: '',
  isArrows: false,
  strokeWidth: 2,
  labelText: '',
  fontSize: '',
  fontFill: '',
  fill: '',
  stroke: '',
  labelFill: '',
  isAnit: false,
  isTools: false,
  xlinkHref: '',
  height: '',
  width: '',
  connector: '',
})
const labelForm = ref({
  fontColor: '#333',
  fill: '#FFF',
  stroke: '#555',
})
const editForm = (cell: any) => {
  if (selectCell.value) selectCell.value.removeTools() // 删除修改线的工具
  selectCell.value = cell
  // 编辑node节点
  if (cell.isNode() && cell.data.type && cell.data.type.includes('default')) {
    editTitle.value = '编辑节点'
    const body =
      cell.attrs.body ||
      cell.attrs.rect ||
      cell.attrs.polygon ||
      cell.attrs.circle
    const obj = {
      labelText: cell.attrs.label.text || '',
      fontSize: cell.attrs.label.fontSize || 14,
      fontFill: cell.attrs.label.fill || '',
      fill: body.fill || '',
      stroke: body.stroke || '',
    }
    Object.assign(form, obj)
    return (editDrawer.value = true)
  }
  // 编辑图片节点
  if (cell.isNode() && cell.data.type && cell.data.type === 'otherImage') {
    editTitle.value = '编辑图片节点'
    const attrs = cell.attrs || {
      body: { fill: '' },
      label: { text: '', fill: '' },
      image: { xlinkHref: '', height: 80, width: 80 },
    }
    const obj = {
      fill: attrs.body.fill,
      labelText: attrs.label.text,
      labelFill: attrs.label.fill,
      height: (attrs.image && attrs.image.height) || 80,
      width: (attrs.image && attrs.image.width) || 80,
      xlinkHref:
        (attrs.xlinkHref && attrs.image.xlinkHref) ||
        'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
    }
    Object.assign(form, obj)
    return (editDrawer.value = true)
  }
  // 编辑线
  if (!cell.isNode() && cell.shape === 'edge') {
    editTitle.value = '编辑连线'
    const obj = {
      label:
        cell.labels && cell.labels[0]
          ? cell.labels[0].attrs.labelText.text
          : '',
      stroke: cell.attrs.line.stroke || '',
      connector: 'rounded',
      strokeWidth: cell.attrs.line.strokeWidth || '',
      isArrows: cell.attrs.line.sourceMarker ? true : false,
      isAnit: cell.attrs.line.strokeDasharray ? true : false,
      isTools: false,
    }
    Object.assign(form, obj)
    // 看是否有label
    const edgeCellLabel =
      (cell.labels && cell.labels[0] && cell.labels[0].attrs) || false
    if (form.label && edgeCellLabel) {
      labelForm.value = {
        fontColor: edgeCellLabel.labelText.fill || '#333',
        fill: edgeCellLabel.labelBody.fill || '#fff',
        stroke: edgeCellLabel.labelBody.stroke || '#555',
      }
    } else {
      labelForm.value = { fontColor: '#333', fill: '#FFF', stroke: '#555' }
    }
    return (editDrawer.value = true)
  }
}
const closeEditForm = () => {
  editDrawer.value = false
  if (selectCell.value) selectCell.value.removeTools()
}
// 修改一般节点
const changeNode = (type: string, value: any) => {
  switch (type) {
    case 'labelText':
      selectCell.value.attr('label/text', value)
      break
    case 'fontSize':
      selectCell.value.attr('label/fontSize', value)
      break
    case 'fontFill':
      selectCell.value.attr('label/fill', value)
      break
    case 'fill':
      selectCell.value.attr('body/fill', value)
      break
    case 'stroke':
      selectCell.value.attr('body/stroke', value)
      break
  }
}
// 修改图片节点
const changeImageNode = (type: string, value: any) => {
  switch (type) {
    case 'labelText':
      selectCell.value.attr('label/text', value)
      break
    case 'labelFill':
      selectCell.value.attr('label/fill', value)
      break
    case 'fill':
      selectCell.value.attr('body/fill', value)
      break
    case 'xlinkHref':
      selectCell.value.attr('image/xlinkHref', value)
      break
    case 'height':
      selectCell.value.attr('image/height', value)
      break
    case 'width':
      selectCell.value.attr('image/width', value)
      break
  }
}
// 修改边的属性
const changeEdgeLabel = (
  label: string,
  fontColor: string,
  fill: string,
  stroke: string
) => {
  selectCell.value.setLabels([configEdgeLabel(label, fontColor, fill, stroke)])
  if (!label)
    labelForm.value = { fontColor: '#333', fill: '#FFF', stroke: '#555' }
}
const changeEdgeStroke = (val: string) => {
  selectCell.value.attr('line/stroke', val)
}
const changeEdgeConnector = (val: string) => {
  switch (val) {
    case 'normal':
      selectCell.value.setConnector(val)
      break
    case 'smooth':
      selectCell.value.setConnector(val)
      break
    case 'rounded':
      selectCell.value.setConnector(val, { radius: 20 })
      break
    case 'jumpover':
      selectCell.value.setConnector(val, { radius: 20 })
      break
  }
}
const changeEdgeStrokeWidth = (val: any) => {
  if (form.isArrows) {
    selectCell.value.attr({
      line: {
        strokeWidth: val,
        sourceMarker: {
          width: 12 * (val / 2) || 12,
          height: 8 * (val / 2) || 8,
        },
        targetMarker: {
          width: 12 * (val / 2) || 12,
          height: 8 * (val / 2) || 8,
        },
      },
    })
  } else {
    selectCell.value.attr({
      line: {
        strokeWidth: val,
        targetMarker: {
          width: 12 * (val / 2) || 12,
          height: 8 * (val / 2) || 8,
        },
      },
    })
  }
}
const changeEdgeArrows = (val: boolean) => {
  if (val) {
    selectCell.value.attr({
      line: {
        sourceMarker: {
          name: 'block',
          width: 12 * (form.strokeWidth / 2) || 12,
          height: 8 * (form.strokeWidth / 2) || 8,
        },
        targetMarker: {
          name: 'block',
          width: 12 * (form.strokeWidth / 2) || 12,
          height: 8 * (form.strokeWidth / 2) || 8,
        },
      },
    })
  } else {
    selectCell.value.attr({
      line: {
        sourceMarker: '',
        targetMarker: {
          name: 'block',
          size: 10 * (form.strokeWidth / 2) || 10,
        },
      },
    })
  }
}
const changeEdgeAnit = (val: boolean) => {
  if (val) {
    selectCell.value.attr({
      line: {
        strokeDasharray: 5,
        style: {
          animation: 'ant-line 30s infinite linear',
        },
      },
    })
  } else {
    selectCell.value.attr({
      line: {
        strokeDasharray: 0,
        style: {
          animation: '',
        },
      },
    })
  }
}
const changeEdgeTools = (val: boolean) => {
  if (val) selectCell.value.addTools(['vertices', 'segments'])
  else selectCell.value.removeTools()
}
// 删除节点
const handlerDel = () => {
  ElMessageBox.confirm(
    `此操作将永久删除此${
      editTitle.value === '编辑节点' ? '节点' : '连线'
    }, 是否继续?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      const cells = graphObj.value.getSelectedCells()
      if (cells.length) {
        graphObj.value.removeCells(cells)
      } else graphObj.value.removeCell(selectCell.value)
      Object.assign(form, {})
      editDrawer.value = false
      ElMessage({ type: 'success', message: '删除成功!' })
    })
    .catch(() => {})
}
// 导出
const handlerSend = () => {
  const { cells: jsonArr } = graphObj.value.toJSON()
  const tempJson = jsonArr.map((item: any) => {
    if (item.ports && item.ports.groups) delete item.ports.groups
    if (item.tools) delete item.tools
    return item
  })
  if (selectCell.value) {
    selectCell.value.removeTools()
    selectCell.value = ''
  }
  emits('update:modelValue', JSON.stringify(tempJson))
}
onMounted(() => {
  initGraph()
})
onBeforeUnmount(() => {
  graphObj.value.dispose()
})
defineExpose({
  handlerSend,
})
</script>
<style lang="scss">
// 流动线条
@keyframes ant-line {
  to {
    stroke-dashoffset: -1000;
  }
}
</style>
<style lang="scss" scoped="scoped">
.all {
  position: fixed;
  width: 100%;
  left: 0;
  border-radius: 8px;
  overflow: hidden;
}
.antv-content {
  background: var(--next-color-hover-rgba);
  display: flex;
  overflow: hidden;
  position: relative;
  .antv-menu {
    width: 200px;
    border-right: 1px solid var(--next-button-act);
    padding: 10px;
    h3 {
      padding: 10px;
    }
    li {
      padding: 10px;
      border-radius: 8px;
      border: 1px solid var(--next-button-act);
      margin: 5px 10px;
      font-size: 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.5s ease;
      color: var(--next-color-white);
      &:hover {
        box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.3);
      }
      i {
        font-size: 18px;
        margin-right: 10px;
        border-color: var(--next-color-white);
      }
      strong {
        flex: 1;
      }
    }
  }
  .antv-wrapper {
    flex: 1;
    position: relative;
    .wrapper-canvas {
      position: relative;
      height: 100vh;
      min-height: 720px;
    }
    .wrapper-tips {
      padding: 10px;
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      .wrapper-tips-item {
        span {
          padding-left: 10px;
          font-size: 12px;
        }
      }
    }
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
i.icon-rhombus {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 2px solid #555;
  transform: rotate(45deg);
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
.edit-main {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 280px;
  border-left: 1px solid var(--next-boder-color);
  box-shadow: 0 -10px 10px rgba($color: #000000, $alpha: 0.3);
  padding: 20px;
  background: #ffffff;
  box-sizing: border-box;
  .edit-main-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      flex: 1;
    }
    i {
      cursor: pointer;
      font-size: 20px;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }

  .form-main {
    padding: 20px 0;
    .label-style {
      background: #f2f2f2;
      padding: 0 10px;
      p {
        display: flex;
        align-items: center;
        font-size: 12px;
      }
    }
  }
  .edit-btn {
  }
  .see-box {
    padding: 20px;
    background: var(--next-button-act);
    h5 {
      padding-bottom: 10px;
    }
    .see-item {
      padding: 10px 30px;
      border: 2px solid #333;
      text-align: center;
    }
  }
}
.wrapper-btn {
  text-align: center;
  padding: 20px;
  background: #010c30;
}
</style>

