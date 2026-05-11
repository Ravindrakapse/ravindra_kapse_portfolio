import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL = `${import.meta.env.BASE_URL}brain/scene.gltf`
useGLTF.preload(MODEL)

export default function BrainCloud() {
  const groupRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF(MODEL)

  const prepared = useMemo(() => {
    const root = scene.clone(true)
    const box = new THREE.Box3().setFromObject(root)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 3.0 / maxDim

    root.scale.setScalar(scale)
    root.position.set(-center.x * scale, -center.y * scale, -center.z * scale)

    root.traverse((o: any) => {
      if (o.isPoints) {
        o.material = new THREE.PointsMaterial({
          size: 0.008,
          vertexColors: true,
          transparent: false,
          sizeAttenuation: true,
        })
      }
    })
    return root
  }, [scene])

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.0015
  })

  return (
    <group ref={groupRef}>
      <primitive object={prepared} />
    </group>
  )
}
