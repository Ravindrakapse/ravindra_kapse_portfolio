import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Procedural head point cloud — parametric ellipsoid with nose protrusion + eye sockets.
// Generates N points on a head-like surface. Looks like a face mesh from the front.
function generateHeadPoints(n: number): Float32Array {
  const pts = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    // Fibonacci sphere → uniform distribution
    const t = i / n
    const phi = Math.acos(1 - 2 * t)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i

    let x = Math.sin(phi) * Math.cos(theta)
    let y = Math.cos(phi)
    let z = Math.sin(phi) * Math.sin(theta)

    // Head shape: elongate vertically, slim depth
    x *= 1.0
    y *= 1.25
    z *= 1.05

    // Jaw taper (squeeze lower-front)
    if (y < -0.3) {
      const k = (y + 0.3) / -0.95
      x *= 1 - 0.35 * k
      z *= 1 - 0.15 * k
    }

    // Forehead/crown shape
    if (y > 0.7) {
      const k = (y - 0.7) / 0.55
      x *= 1 - 0.25 * k
      z *= 1 - 0.1 * k
    }

    // Nose protrusion (front +z, mid face)
    const noseDist = Math.sqrt(x * x + (y - 0.05) ** 2)
    if (z > 0.4 && noseDist < 0.25 && y > -0.25 && y < 0.25) {
      const k = (0.25 - noseDist) / 0.25
      z += 0.35 * k * (1 - Math.abs(y) * 1.2)
    }

    // Eye sockets (slight indent)
    const eyeDx = Math.abs(x) - 0.35
    const eyeDy = y - 0.2
    const eyeDist = Math.sqrt(eyeDx * eyeDx + eyeDy * eyeDy)
    if (z > 0.5 && eyeDist < 0.18) {
      z -= 0.12 * (1 - eyeDist / 0.18)
    }

    // Mouth dent
    const mouthDx = x
    const mouthDy = y + 0.45
    const mouthDist = Math.sqrt(mouthDx * mouthDx * 1.5 + mouthDy * mouthDy * 4)
    if (z > 0.4 && mouthDist < 0.3) {
      z -= 0.05 * (1 - mouthDist / 0.3)
    }

    pts[i * 3 + 0] = x * 1.6
    pts[i * 3 + 1] = y * 1.6
    pts[i * 3 + 2] = z * 1.6
  }
  return pts
}

function generateScatterPoints(n: number): Float32Array {
  // Wide cubic cloud — looks like ambient dust filling the screen
  const pts = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    pts[i * 3 + 0] = (Math.random() - 0.5) * 14
    pts[i * 3 + 1] = (Math.random() - 0.5) * 10
    pts[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
  }
  return pts
}

interface Props {
  count?: number
  scrollProgress: React.MutableRefObject<number>
  mouse: React.MutableRefObject<{ x: number; y: number }>
  hoverAssemble: React.MutableRefObject<number>
}

export default function FaceParticles({ count = 14000, scrollProgress, mouse, hoverAssemble }: Props) {
  const ref = useRef<THREE.Points>(null!)
  const matRef = useRef<THREE.ShaderMaterial>(null!)

  const { headPos, scatterPos } = useMemo(
    () => ({ headPos: generateHeadPoints(count), scatterPos: generateScatterPoints(count) }),
    [count]
  )

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(headPos.slice(), 3))
    g.setAttribute('aHead', new THREE.BufferAttribute(headPos, 3))
    g.setAttribute('aScatter', new THREE.BufferAttribute(scatterPos, 3))
    const rand = new Float32Array(count)
    for (let i = 0; i < count; i++) rand[i] = Math.random()
    g.setAttribute('aRand', new THREE.BufferAttribute(rand, 1))
    return g
  }, [count, headPos, scatterPos])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color('#7c5cff') },
      uColorB: { value: new THREE.Color('#22d3ee') },
      uSize: { value: 3.0 },
    }),
    []
  )

  const { size } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    uniforms.uTime.value = t
    // 0 = scatter (default), 1 = face. Scroll OR hover assembles.
    const scrollDrive = THREE.MathUtils.clamp(scrollProgress.current * 2.0, 0, 1)
    const target = Math.max(scrollDrive, hoverAssemble.current)
    uniforms.uMorph.value = THREE.MathUtils.lerp(uniforms.uMorph.value, target, 0.06)
    uniforms.uMouse.value.set(mouse.current.x, mouse.current.y)
    if (ref.current) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        mouse.current.x * 0.4 + t * 0.03,
        0.04
      )
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        -mouse.current.y * 0.25,
        0.04
      )
    }
    uniforms.uSize.value = Math.min(size.width, size.height) / 280
  })

  return (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute vec3 aHead;
          attribute vec3 aScatter;
          attribute float aRand;
          uniform float uTime;
          uniform float uMorph;
          uniform vec2 uMouse;
          uniform float uSize;
          varying float vRand;
          varying float vMorph;
          void main() {
            vRand = aRand;
            vMorph = uMorph;
            float m = smoothstep(0.0, 1.0, uMorph);
            // stagger morph per-particle so dots stream into face
            float stagger = clamp((m - aRand * 0.35) / 0.65, 0.0, 1.0);
            // ambient drift on scattered dots (gentle floating)
            vec3 drift = vec3(
              sin(uTime * 0.3 + aRand * 12.0),
              cos(uTime * 0.25 + aRand * 9.0),
              sin(uTime * 0.2 + aRand * 7.0)
            ) * 0.25 * (1.0 - m);
            vec3 pos = mix(aScatter + drift, aHead, stagger);
            // mouse parallax on scattered phase
            pos.xy += uMouse * 0.4 * (1.0 - m);
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = uSize * (0.6 + 0.5 * aRand + 0.6 * m) * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying float vRand;
          varying float vMorph;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d);
            vec3 col = mix(uColorA, uColorB, vRand);
            col *= (0.7 + 0.6 * vMorph);
            gl_FragColor = vec4(col, alpha * (0.7 + 0.3 * vMorph));
          }
        `}
      />
    </points>
  )
}
