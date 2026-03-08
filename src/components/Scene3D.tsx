import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Torus, Box } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AnimatedSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.2;
      ref.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={ref} args={[1.2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#22d3a0"
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
}

function FloatingTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.5;
      ref.current.rotation.z = clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <Torus ref={ref} args={[2, 0.08, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#9333ea" metalness={0.9} roughness={0.1} transparent opacity={0.6} />
      </Torus>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  const particles = Array.from({ length: 50 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ] as [number, number, number],
    scale: Math.random() * 0.05 + 0.02,
    key: i,
  }));

  return (
    <group ref={ref}>
      {particles.map((p) => (
        <Box key={p.key} args={[p.scale, p.scale, p.scale]} position={p.position}>
          <meshStandardMaterial color="#22d3a0" emissive="#22d3a0" emissiveIntensity={2} transparent opacity={0.6} />
        </Box>
      ))}
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#22d3a0" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#9333ea" />
        <AnimatedSphere />
        <FloatingTorus />
        <Particles />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
