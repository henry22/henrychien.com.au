'use client'

import { useEffect, useRef } from 'react'

export function ParticlesBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      radius: number
      dx: number
      dy: number
      color: string
      alpha: number
      connection: number
    }[] = []

    // Define a color palette for particles
    const colors = [
      'rgba(66, 153, 225, alpha)', // Blue
      'rgba(49, 151, 149, alpha)', // Teal
      'rgba(139, 92, 246, alpha)', // Purple
    ]

    const particleCount = 80
    const connectionDistance = 150
    const mouseRadius = 120

    let mouseX = 0
    let mouseY = 0

    // Track mouse position
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 1
      const color = colors[Math.floor(Math.random() * colors.length)]
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: color.replace('alpha', '0.6'),
        alpha: 0.6,
        connection: 0,
      })
    }

    function drawConnections(particle: (typeof particles)[0], index: number) {
      for (let j = index + 1; j < particles.length; j++) {
        const particle2 = particles[j]
        const dx = particle.x - particle2.x
        const dy = particle.y - particle2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.2
          ctx!.beginPath()
          ctx!.strokeStyle = `rgba(147, 197, 253, ${opacity})`
          ctx!.lineWidth = 1
          ctx!.moveTo(particle.x, particle.y)
          ctx!.lineTo(particle2.x, particle2.y)
          ctx!.stroke()
        }
      }
    }

    function animate() {
      requestAnimationFrame(animate)
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, index) => {
        // Draw connections between particles
        drawConnections(p, index)

        // Update particle position
        p.x += p.dx
        p.y += p.dy

        // Check mouse interaction
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius
          p.dx -= dx * force * 0.02
          p.dy -= dy * force * 0.02
        }

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) {
          p.dx = -p.dx
          p.x = Math.max(0, Math.min(canvas.width, p.x))
        }
        if (p.y < 0 || p.y > canvas.height) {
          p.dy = -p.dy
          p.y = Math.max(0, Math.min(canvas.height, p.y))
        }

        // Draw particle
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2)
        gradient.addColorStop(0, p.color)
        gradient.addColorStop(1, p.color.replace('0.6', '0'))
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 -z-0 pointer-events-none" />
}
