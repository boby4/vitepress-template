<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
let animationId = null
let particles = []
const PARTICLE_COUNT = 80

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.size = Math.random() * 2 + 0.5
    this.speedX = (Math.random() - 0.5) * 0.3
    this.speedY = (Math.random() - 0.5) * 0.3
    this.opacity = Math.random() * 0.5 + 0.1
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x < 0 || this.x > this.canvas.width ||
        this.y < 0 || this.y > this.canvas.height) {
      this.reset()
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`
    ctx.fill()
  }
}

function initParticles(canvas) {
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(canvas))
  }
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw connecting lines between nearby particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw(ctx)

    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 120) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 120)})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }

  // Gradient glow at center
  const gradient = ctx.createRadialGradient(
    canvas.width * 0.65, canvas.height * 0.5, 0,
    canvas.width * 0.65, canvas.height * 0.5, canvas.width * 0.3
  )
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0.06)')
  gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  animationId = requestAnimationFrame(animate)
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = canvas.parentElement.offsetWidth
  canvas.height = canvas.parentElement.offsetHeight
  initParticles(canvas)
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  animate()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
</style>
