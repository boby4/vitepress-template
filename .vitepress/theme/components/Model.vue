<template>
  <div id="container" class="three-canvas" ref="canvas"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

let scene: any, camera: any, renderer: any, controls: any
let planets: any[] = [], orbits: any[] = []
let sun: any, sunGlow: any
let clock: any, frameId = 0

onMounted(() => nextTick(() => init()))
onUnmounted(() => { cancelAnimationFrame(frameId); renderer?.dispose() })

/* ----- Planet definitions ----- */
const planetData = [
  { name: '水星', radius: 0.35, distance: 3.5, speed: 4.1, color: 0xb0b0b0, emissive: 0x1a1a1a },
  { name: '金星', radius: 0.7,  distance: 5.5, speed: 3.0, color: 0xe8cda0, emissive: 0x2a1a0a },
  { name: '地球', radius: 0.7,  distance: 7.5, speed: 2.4, color: 0x3b82f6, emissive: 0x0a1a3a },
  { name: '火星', radius: 0.5,  distance: 9.5, speed: 1.8, color: 0xef4444, emissive: 0x2a0a0a },
  { name: '木星', radius: 1.8,  distance: 13,  speed: 1.0, color: 0xe0c8a0, emissive: 0x1a100a },
  { name: '土星', radius: 1.5,  distance: 16.5, speed: 0.7, color: 0xf0d890, emissive: 0x1a1508, hasRing: true },
  { name: '天王星', radius: 1.0,  distance: 20,  speed: 0.5, color: 0x7dd3fc, emissive: 0x081a2a },
  { name: '海王星', radius: 1.0,  distance: 23,  speed: 0.4, color: 0x3b5cf6, emissive: 0x0a0a2a },
]

const init = () => {
  const container: HTMLElement = document.querySelector('.three-canvas')!
  const w = container.clientWidth, h = container.clientHeight

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x020210)

  // Stars background
  const starsGeo = new THREE.BufferGeometry()
  const starsCount = 2000
  const starsPos = new Float32Array(starsCount * 3)
  for (let i = 0; i < starsCount * 3; i += 3) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 50 + Math.random() * 50
    starsPos[i] = r * Math.sin(phi) * Math.cos(theta)
    starsPos[i + 1] = r * Math.sin(phi) * Math.sin(theta)
    starsPos[i + 2] = r * Math.cos(phi)
  }
  starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3))
  const starsMat = new THREE.PointsMaterial({ size: 0.15, color: 0xffffff, blending: THREE.AdditiveBlending, depthWrite: false })
  scene.add(new THREE.Points(starsGeo, starsMat))

  camera = new THREE.PerspectiveCamera(50, w / h, 0.5, 200)
  camera.position.set(0, 18, 30)
  camera.lookAt(0, 0, 0)

  // --- Sun ---
  const sunGeo = new THREE.SphereGeometry(2, 64, 64)
  const sunMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      varying vec3 vPos; varying vec3 vNormal;
      void main() {
        vPos = position; vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPos; varying vec3 vNormal;
      uniform float uTime;
      float noise(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
      }
      void main() {
        float n = noise(vPos * 3.0 + uTime * 0.5) * 0.15;
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
        vec3 base = vec3(1.0, 0.85, 0.2);
        vec3 edge = vec3(1.0, 0.5, 0.05);
        vec3 col = mix(base, edge, fresnel) + n;
        gl_FragColor = vec4(col * 1.4, 1.0);
      }
    `,
  })
  sun = new THREE.Mesh(sunGeo, sunMat)
  scene.add(sun)

  // Sun point light
  const sunLight = new THREE.PointLight(0xffdd88, 3, 60, 1)
  scene.add(sunLight)

  // Sun glow sprite
  const glowTex = createGlowTexture()
  const glowMat = new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.6 })
  sunGlow = new THREE.Sprite(glowMat)
  sunGlow.scale.set(10, 10, 1)
  scene.add(sunGlow)

  scene.add(new THREE.AmbientLight(0x111122, 0.5))

  // --- Planets & orbits ---
  planetData.forEach((p) => {
    // Orbit ring
    const orbitGeo = new THREE.TorusGeometry(p.distance, 0.03, 8, 180)
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 })
    const orbit = new THREE.Mesh(orbitGeo, orbitMat)
    orbit.rotation.x = Math.PI / 2
    orbit.rotation.y = Math.random() * 0.1
    orbits.push(orbit)
    scene.add(orbit)

    // Planet
    const planetGeo = new THREE.SphereGeometry(p.radius, 48, 48)
    const planetMat = new THREE.MeshPhongMaterial({ color: p.color, emissive: p.emissive, emissiveIntensity: 0.4, specular: 0x222222, shininess: 20 })
    const planet = new THREE.Mesh(planetGeo, planetMat)
    planet.userData = p
    planet.castShadow = true

    // Saturn ring
    if (p.hasRing) {
      const ringGeo = new THREE.TorusGeometry(p.radius * 1.6, 0.12, 16, 80)
      const ringMat = new THREE.MeshPhongMaterial({ color: 0xe8d8a0, emissive: 0x1a1508, emissiveIntensity: 0.4, side: THREE.DoubleSide })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2.6
      planet.add(ring)
    }

    planets.push(planet)
    scene.add(planet)
  })

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h)
  renderer.shadowMap.enabled = true
  container.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true; controls.dampingFactor = 0.08
  controls.minDistance = 6; controls.maxDistance = 80
  controls.target.set(0, 0, 0); controls.update()

  clock = new THREE.Clock()
  window.addEventListener('resize', onResize)
  animate()
}

const createGlowTexture = () => {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, size * 0.1, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255, 220, 100, 1)')
  gradient.addColorStop(0.2, 'rgba(255, 180, 40, 0.8)')
  gradient.addColorStop(0.5, 'rgba(255, 120, 20, 0.2)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

const animate = () => {
  const t = clock.getElapsedTime()

  // Sun
  if (sun?.material?.uniforms?.uTime) sun.material.uniforms.uTime.value = t
  sun.rotation.y += 0.002
  sunGlow.material.opacity = 0.5 + Math.sin(t * 3) * 0.15

  // Planets orbit
  planets.forEach((planet) => {
    const d = planet.userData
    const angle = t * d.speed * 0.3 + d.distance // offset by distance for variety
    planet.position.x = Math.cos(angle) * d.distance
    planet.position.z = Math.sin(angle) * d.distance
    planet.rotation.y += 0.01
  })

  // Stars twinkle
  scene.children.forEach((child: any) => {
    if (child.isPoints && child.material.size) {
      child.rotation.y += 0.0001
    }
  })

  controls.update()
  renderer.render(scene, camera)
  frameId = requestAnimationFrame(animate)
}

const onResize = () => {
  const c = document.querySelector('.three-canvas') as HTMLElement
  if (!c) return
  const w = c.clientWidth, h = c.clientHeight
  camera.aspect = w / h; camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}
</script>

<style scoped>
.three-canvas {
  width: 100%; height: calc(100vh - 4rem);
  overflow: hidden; position: fixed;
  top: 4rem; left: 0; cursor: grab;
}
.three-canvas:active { cursor: grabbing; }
</style>
