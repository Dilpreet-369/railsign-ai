import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import FallbackAvatar from './FallbackAvatar.jsx'

export default function AvatarPanel() {
  return (
    <div className="relative w-1/2 h-full bg-[#0d1117]">
      <Canvas camera={{ position: [0, 1, 3.5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        
        <FallbackAvatar />
        
        <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 2} />
      </Canvas>

      {/* Missing Model Warning Banner */}
      <div className="absolute bottom-4 left-4 right-4 bg-[#3a1d1d] text-[#ff8888] text-xs px-4 py-2.5 rounded border border-[#5a2a2a] shadow-lg">
        3D model missing (/models/avatar.glb) — sign playback unavailable
      </div>
    </div>
  )
}