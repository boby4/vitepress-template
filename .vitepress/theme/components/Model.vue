<template>
  <div id="container" class="three-canvas"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
let container: any, clock: any, mixer: any, width: number, height: number
let camera: any, scene: any, renderer: any, model
const { isDark } = useData()

onMounted(() => {
  nextTick(() => {
    watch(isDark, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        window.location.replace(window.location?.href)
      }
    })
    init()
    animate()
  })
})

const init = () => {
  console.log(isDark)
  let themeColor = isDark?.value ? 0x7d7d7d : 0xe5e6e7
  container = document.querySelector('.three-canvas')
  const { width, height } = container?.getBoundingClientRect()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.25, 100)
  camera.position.set(-10, 5, 10)
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
      mixer.clipAction(gltf.animations[0]).play()
    },
    undefined,
    (e: Error) => {
      console.error(e)
    }
  )
  renderer = new THREE.WebGLRenderer({ antialias: true })
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
  background-color: #d2deea;
  position: fixed;
  top: 4rem;
  z-index: -1;
  left: 0;
}
</style>
