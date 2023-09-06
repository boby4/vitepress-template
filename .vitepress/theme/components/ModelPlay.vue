<template>
  <div id="container" class="three-canvas" ref="canvas"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
let container: any, clock: any, mixer: any, width: number, height: number
let camera: any, scene: any, renderer: any, model:any, controls:any

onMounted(() => {
  NProgress.start()
  init()
})

onUnmounted(() => {
  NProgress.done()
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

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2.5)
  hemiLight.position.set(-5, 10, 30)
  scene.add(hemiLight)

  const dirLight = new THREE.DirectionalLight(0xffffff, 2)
  dirLight.position.set(-10, 30, 30)
  scene.add(dirLight)

  dirLight.castShadow = true
  dirLight.shadow.bias = -0.001;
  dirLight.shadow.soft = true;
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
      // 设置物体投影属性
      model.traverse((object:Record<string, any>) => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      // 模拟骨骼
      // let skeleton = new THREE.SkeletonHelper( model );
      // skeleton.visible = false;
      // scene.add( skeleton );

      // 动画混合器/控制器
      mixer = new THREE.AnimationMixer(model)
      mixer.clipAction(gltf.animations[0]).play()
      NProgress.done()
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
  /* background-color: #d2deea; */
  position: fixed;
  top: 4rem;
  /* z-index: -1; */
  left: 0;
}
</style>
