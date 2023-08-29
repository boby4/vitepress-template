<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
let container, clock, mixer
let camera, scene, renderer, model

export default {
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    init() {
      container = document.createElement('div')
      container.setAttribute('class', 'three-canvas')
      document.body.appendChild(container)
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.25,
        100
      )
      camera.position.set(-10, 5, 10)
      camera.lookAt(0, 2, 0)
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0xffffff)
      scene.fog = new THREE.Fog(0xffffff, 20, 100)
      clock = new THREE.Clock()
      // lights
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 3)
      hemiLight.position.set(0, 20, 0)
      scene.add(hemiLight)
      const dirLight = new THREE.DirectionalLight(0xffffff, 3)
      dirLight.position.set(0, 20, 10)
      scene.add(dirLight)
      // ground
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2000, 2000),
        new THREE.MeshPhongMaterial({ color: 0xffffff, depthWrite: false })
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
        function (gltf) {
          model = gltf.scene
          scene.add(model)
          mixer = new THREE.AnimationMixer(model)
          mixer.clipAction(gltf.animations[0]).play()
          console.log('younaxie', gltf)
        },
        undefined,
        function (e) {
          console.error(e)
        }
      )
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(renderer.domElement)
      window.addEventListener('resize', this.onWindowResize)
    },
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate() {
      const dt = clock.getDelta()
      if (mixer) mixer.update(dt)
      requestAnimationFrame(this.animate)
      renderer.render(scene, camera)
    },
  },
}
</script>

<style>
.three-canvas {
  /* width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #d6eaff; */
  position: fixed;
  top: 4rem;
  z-index: -1;
}
</style>
