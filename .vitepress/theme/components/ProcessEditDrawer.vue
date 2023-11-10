<script setup>
import { Close } from '@element-plus/icons-vue'
import { MarkerType } from '@vue-flow/core'
import { ElMessage, ElMessageBox } from 'element-plus'
const props = defineProps({
  editDrawer: Boolean,
  editTitle: String,
  editData: Object,
})

const emit = defineEmits();
const closeEditForm = () => {
  props.editDrawer = false
  emit('close')
}

// 删除节点
const handlerDel = () => {
  ElMessageBox.confirm(
    `此操作将永久删除此${ props.editTitle === '编辑连线' ? '连线' : '节点' }, 是否继续?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
      let id = props.editData.id
      props.editTitle === '编辑连线' ? emit('deleteEdge', id) : emit('deleteNode', id)
      closeEditForm()
      ElMessage({ type: 'success', message: '删除成功!' })
    }).catch(() => {})
}
</script>

<template>
  <div v-if="editDrawer" class="edit-main">
    <div class="edit-main-title">
      <h3>{{ editTitle }}</h3>
      <el-icon @click="closeEditForm"><Close /></el-icon>
    </div>
    <div v-if="editTitle === '编辑节点'" class="form-main">
      <el-form ref="nodeForm" :model="editData.data" label-width="80px">
        <el-form-item label="节点文本">
          <el-input
            v-model="editData.data.label"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="字体大小">
          <el-input
            v-model="editData.data.fontSize"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="字体颜色">
          <el-color-picker
            v-model="editData.data.color"
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="节点背景">
          <el-color-picker
            v-model="editData.data.backgroundColor"
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="边框颜色">
          <el-color-picker
            v-model="editData.data.borderColor"
          ></el-color-picker>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="editTitle === '编辑图片节点'" class="form-main">
      <el-form ref="imageForm" :model="editData.data" label-width="80px">
        <el-form-item label="节点文本">
          <el-input
            v-model="editData.data.label"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="editData.data.label" label="字体颜色">
          <el-color-picker
            v-model="editData.data.color"
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="节点背景">
          <el-color-picker
            v-model="editData.data.backgroundColor"
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="图片地址">
          <el-select size="small" style="margin-bottom:10px;" v-model="editData.data.xlinkHref">
            <el-option
              v-for="item in [
                '/src/img/emoji1.png',
                '/src/img/emoji2.png',
                '/src/img/emoji3.png',
                '/src/img/emoji4.png',
                '/src/img/emoji5.png',
                '/src/img/emoji6.png',
                '/src/img/emoji7.png',
                '/src/img/emoji8.png',
                '/src/img/emoji9.png'
              ]"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-image
            :src="editData.data.xlinkHref"
            :style="`width: 80px; height: 80px; background: ${editData.data.backgroundColor}`"
            fit="fill"
          ></el-image>
        </el-form-item>
        <el-form-item label="图片尺寸">
          <span style="font-size: 12px; padding-right: 10px; color: #888"
            >宽</span
          ><el-input v-model="editData.data.width" style="width:120px" size="small" placeholder="请输入宽"></el-input>
          <span style="font-size: 12px; padding-right: 10px; color: #888"
            >高</span
          ><el-input v-model="editData.data.height" style="width:120px" size="small" placeholder="请输入宽"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="editTitle === '编辑连线'" class="form-main">
      <el-form ref="edgeForm" :model="editData" label-width="80px">
        <el-form-item label="标签内容">
          <el-input
            style="margin-bottom: 10px;"
            v-model="editData.label"
            size="small"
            placeholder="标签文字，空则没有"
          ></el-input>
          <div v-if="editData.label" class="label-style">
            <p>
              字体颜色：<el-color-picker
                v-model="editData.labelStyle.fill"
                size="mini"
              ></el-color-picker>
            </p>
            <!-- <p>
              字体大小：<el-input-number
                style="width: 80px;"
                v-model="editData.labelStyle.fontSize"
                size="small"
                :min="10"
                :step="1"
                :max="32"
              ></el-input-number>
            </p> -->
            <p>
              背景颜色：<el-color-picker
                v-model="editData.labelBgStyle.fill"
                size="mini"
              ></el-color-picker>
            </p>
            <p>
              描边颜色：<el-color-picker
                v-model="editData.labelBgStyle.stroke"
                size="mini"
              ></el-color-picker>
            </p>
          </div>
        </el-form-item>
        <el-form-item label="线条颜色">
          <el-color-picker
            v-model="editData.style.stroke"
            size="small"
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="线条样式">
          <el-select
            v-model="editData.type"
            size="small"
            placeholder="请选择"
          >
            <el-option label="默认" value="default"></el-option>
            <el-option label="直线" value="straight"></el-option>
            <el-option label="圆角" value="smoothstep"></el-option>
            <el-option label="直角" value="step"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线条宽度">
          <el-input-number
            v-model="editData.style.strokeWidth"
            size="small"
            :min="1"
            :step="1"
            :max="4"
            label="线条宽度"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="起始箭头">
          <el-switch
            v-model="editData.markerStart"
            :active-value="MarkerType.Arrow"
            inactive-value=""
          ></el-switch>
        </el-form-item>
        <el-form-item label="结束箭头">
          <el-switch
            v-model="editData.markerEnd"
            :active-value="MarkerType.Arrow"
            inactive-value=""
          ></el-switch>
        </el-form-item>
        <el-form-item label="流动线条">
          <el-switch v-model="editData.animated"></el-switch>
        </el-form-item>
      </el-form>
    </div>
    <div class="edit-btn">
      <el-button type="danger" @click="handlerDel" style="width: 100%"
        >删除此{{ editTitle === '编辑连线' ? '连线' : '节点' }}</el-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-main {
  width: 400px;
  height: 100%;
  // border: 1px solid #eeeeee;
  box-shadow: 0 4px 6px #e0e0e0;
  padding: 0 20px;
  background: #ffffff;
  box-sizing: border-box;
  .edit-main-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      flex: 1;
      font-size: 16px;
      margin-top: 15px;
    }
    i {
      cursor: pointer;
      font-size: 20px;
      margin-top: 10px;
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
</style>
