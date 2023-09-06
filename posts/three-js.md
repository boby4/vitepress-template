---
date: 2023-08-30
title: vue3项目中使用three.js
tags:
- threejs
- vue
description: 在vue3项目中，通过three.js实现了一个简单的三维效果图。
---

# **vue3项目中使用three.js**

## **前提**

在vue3项目中，通过three.js实现了一个简单的三维效果图。

## **Three.js 交互式3D模型**

<a style="color:blue" href="https://threejs.org/">Three.js</a>（也称为ThreeJS）是一个用于在Web上创建3D图形的JavaScript库。它为开发人员提供了一组强大的工具和功能，使他们能够轻松地在浏览器中构建交互式3D场景、模型和动画。Three.js 封装了 WebGL（Web Graphics Library），这是一种用于在浏览器中进行硬件加速图形渲染的技术。通过 Three.js，开发人员可以避免直接操作复杂的 WebGL API，而是使用更高级别、更友好的抽象来创建3D内容。

Three.js 提供了一系列用于创建和管理3D对象、灯光、材质、相机等的类和方法。它还支持动画、几何体生成、粒子系统、阴影、纹理贴图、相机控制等功能。

## **3D模型网站**

模型是从这个网站上找的，<a style="color:blue" href="https://sketchfab.com/">Sketchfab</a>，邮箱注册后可以下免费的模型。

刚开始学习的时候，建议先去<a style="color:blue" href="https://threejs.org/">threejs（官网）</a>上找个示例练下手，会理解的更深刻一点。

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/08/30/5d068fee70756bf95d48c640893cb1ab.png" data-caption="threejs示例">
    <img src="https://ice.frostsky.com/2023/08/30/5d068fee70756bf95d48c640893cb1ab.png"/>
</a>

## **vue3中安装与使用**

* 安装

```
npm install three
yarn install three
```
* 使用
```javascript
// 在要使用的页面中引入three.js
import * as THREE from 'three';
// 引入轨道控制器，它是你能否控制模型的旋转和移动的关键，如果你不想别人控制你的模型，可以不引入
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入资源加载器，加载你的外部gltf/glb模型文件
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
```
* 完整代码
```typescript
<template>
  <div id="container" class="three-canvas" ref="canvas"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// 重点来了，你所需要的变量只能定义在外面，不然会一直报错，类型自己定义，我这里省了
let container: any, clock: any, mixer: any, width: number, height: number
let camera: any, scene: any, renderer: any, model:any, controls:any

onMounted(() => {
  init()
})

const init = () => {
  container = document.querySelector('.three-canvas')
  const { width, height } = container?.getBoundingClientRect()
  clock = new THREE.Clock()
  // 透视相机，设置模型视角位置
  camera = new THREE.PerspectiveCamera(40, width / height, 0.25, 500)
  camera.position.set(5, 2, 9)
  camera.lookAt(1, 1, 10)

  // 场景设置，放置物体、灯光、摄像机
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x58acbf)

  // 这个东西文档上面叫半球光，其实就是环境光
  // 颜色为白色到黑色渐变，强度为0.5，这个强度可以控制光照强度
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2.5)
  hemiLight.position.set(-5, 10, 30)
  scene.add(hemiLight)

  // 平行光，就是太阳光，从某个方向照射
  // 控制光的颜色和强度，位置
  const dirLight = new THREE.DirectionalLight(0xffffff, 2)
  dirLight.position.set(-10, 30, 30)
  scene.add(dirLight)
  // 投影阴影设置为true
  dirLight.castShadow = true
  // 设置可以投影的宽高
  dirLight.shadow.mapSize.width = 2048
  dirLight.shadow.mapSize.height = 2048
  dirLight.shadow.camera.near = 1
  dirLight.shadow.camera.far = 50

  // 添加接收阴影的平面
  const planeGeometry = new THREE.PlaneGeometry(2000, 2000)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x58acbf,
    depthWrite: false,
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -Math.PI / 2
  plane.position.y = -0.1 // 设置平面位置在物体下方
  plane.receiveShadow = true
  scene.add(plane)

  // 资源加载器-- 加载你的模型资源
  const loader = new GLTFLoader()
  loader.load(
    '/src/models/SmolAme.glb',
    (gltf: any) => {
      model = gltf.scene
      scene.add(model)
      // 设置物体的所有投影属性设置为true
      model.traverse((object:Record<string, any>) => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
      // 动画混合器/控制器，是你模型能不能动的关键，可以打印gltf.animations看看你的模型有哪些动画
      mixer = new THREE.AnimationMixer(model)
      mixer.clipAction(gltf.animations[0]).play()
    },
    undefined,
    (e: Error) => {
      console.error(e)
    }
  )
  // 设置渲染器的场景和行为
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.shadowMap.enabled = true;// 开启渲染器生成阴影
  renderer.shadowMap.type = THREE.PCFSoftShadowMap ; // 默认THREE.PCFShadowMap，调整阴影类型
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)
  // 设置轨道控制器（鼠标或者手能否控制的关键）
  controls = new OrbitControls(camera, renderer.domElement)
  controls.update()
  window.addEventListener('resize', onWindowResize)
  animate()
}
const animate = () => {
  const dt = clock.getDelta()
  if (mixer) mixer.update(dt)
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
const onWindowResize = () => {
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}
</script>

<style>
.three-canvas {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 4rem;
  left: 0;
}
</style>
```

## **最终实现效果**

<a style="color:blue" href="/pages/model">点这>>></a>

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/08/30/eaa674d07ce8180d5f3b11f71f71b923.png" data-caption="最终效果">
    <img src="https://ice.frostsky.com/2023/08/30/eaa674d07ce8180d5f3b11f71f71b923.png"/>
</a>

<Fancybox />
<Comment />