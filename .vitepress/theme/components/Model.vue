<template>
  <div id="container" class="three-canvas" ref="canvas"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
let container: any, clock: any, mixer: any, width: number, height: number
let camera: any, scene: any, renderer: any, model:any, controls:any
const { isDark } = useData()

onMounted(() => {
  NProgress.start()
  nextTick(() => {
    watch(isDark, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        window.location.replace(window.location?.href)
      }
    })
    init()
  })
})

onUnmounted(() => {
  NProgress.done()
})

const init = () => {
  let themeColor = isDark?.value ? 0x7d7d7d : 0xe5e6e7
  container = document.querySelector('.three-canvas')
  const { width, height } = container?.getBoundingClientRect()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.25, 100)
  camera.position.set(-6, 5, 15)
  camera.lookAt(0, 2, 0)
  scene = new THREE.Scene()
  scene.background = new THREE.Color(themeColor)
  scene.fog = new THREE.Fog(themeColor, 20, 100)
  clock = new THREE.Clock()
  // lights
  const hemiLight = new THREE.HemisphereLight(themeColor, themeColor, 3)
  hemiLight.position.set(0, 20, 0)
  scene.add(hemiLight)
  const dirLight = new THREE.DirectionalLight(themeColor, 3)
  dirLight.position.set(0, 20, 10)
  scene.add(dirLight)
  // ground
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshPhongMaterial({ color: themeColor, depthWrite: false })
  )
  mesh.rotation.x = -Math.PI / 2
  scene.add(mesh)
  const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000)
  grid.material.opacity = 0.2
  grid.material.transparent = true
  scene.add(grid)
  // model
  const loader = new GLTFLoader()
  loader.load(
    '/src/models/RobotExpressive.glb',
    (gltf: any) => {
      model = gltf.scene
      scene.add(model)
      mixer = new THREE.AnimationMixer(model)
      const clip1 = gltf.animations[6]
      const clip2 = gltf.animations[0]
      const action1 = mixer.clipAction(clip1)
      const action2 = mixer.clipAction(clip2)
      mixer.clipAction(gltf.animations[6]).play()
      setTimeout(() => {
        action1.stop()
        action2.play()
      }, clip1.duration * 2500)
      NProgress.done()
    },
    undefined,
    (e: Error) => {
      NProgress.done()
      console.error(e)
    }
  )
  renderer = new THREE.WebGLRenderer({ antialias: true })
  controls = new OrbitControls(camera, renderer.domElement)
  controls.update()
  animate()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)
  window.addEventListener('resize', onWindowResize)
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
