import React from 'react'

export default function FallbackAvatar() {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#0088cc" roughness={0.3} />
      </mesh>
      
      {/* Torso */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.35, 0.25, 1.2, 32]} />
        <meshStandardMaterial color="#0088cc" roughness={0.3} />
      </mesh>

      {/* Left Arm */}
      <group position={[-0.4, 1.1, 0]} rotation={[0, 0, 0.6]}>
        <mesh position={[-0.4, -0.1, 0]} rotation={[0, 0, 0.4]}>
          <capsuleGeometry args={[0.08, 0.8, 16, 16]} />
          <meshStandardMaterial color="#0088cc" roughness={0.3} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.4, 1.1, 0]} rotation={[0, 0, -0.6]}>
        <mesh position={[0.4, -0.1, 0]} rotation={[0, 0, -0.4]}>
          <capsuleGeometry args={[0.08, 0.8, 16, 16]} />
          <meshStandardMaterial color="#0088cc" roughness={0.3} />
        </mesh>
      </group>

      {/* Left Leg */}
      <mesh position={[-0.18, -0.4, 0]}>
        <capsuleGeometry args={[0.1, 0.8, 16, 16]} />
        <meshStandardMaterial color="#0088cc" roughness={0.3} />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.18, -0.4, 0]}>
        <capsuleGeometry args={[0.1, 0.8, 16, 16]} />
        <meshStandardMaterial color="#0088cc" roughness={0.3} />
      </mesh>
    </group>
  )
}