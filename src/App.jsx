import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {  useRef } from 'react'

import './App.css'


const Cube = ({position, color, size})=> {
  const meshRef = useRef()


  useFrame((state, delta) => {
    // delta is the difference between the current frame and the last frame
    // console.log("state from use frame :", state)
    meshRef.current.rotation.x += (delta * 4)
    meshRef.current.rotation.y += (delta * 4)
    meshRef.current.rotation.z += (delta * 4)

    meshRef.current.position.z = Math.sin(state.clock.elapsedTime) * 2 
  })


  return <mesh position={position} ref={meshRef}>
          <boxGeometry size={size}/>
          <meshStandardMaterial color={color}/>
        </mesh>


}

const Sphere = ({position, size, color}) => {

  return (
    <mesh position={position}>
      <sphereGeometry size={size}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}


const Torus = ({position, size, color}) => {

  return (
    <mesh position={position}>
      <torusGeometry 
        args={size}
      />
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}


const TorusKnot = ({position, size, color}) => {

  return (
    <mesh position={position}>
      <torusKnotGeometry 
        args={size}
      />
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

function App() {

  const cubeRef = useRef(null)

  return (
    <>
    <Canvas>
      <directionalLight position={[0, 0, 2]} intensity={0.5}/>
      <ambientLight  intensity={0.1}/>
      {/* <group position={[0, -1, 0]}>
        <Cube 
          position={[1, 0, 0]}
          color={"red"}
          size={[1, 1, 1]}
        />
        <Cube 
          position={[-1, 0, 0]}
          color={"green"}
          size={[1, 1, 1]}
        />
        <Cube 
          position={[1, 2, 0]}
          color={"blue"}
          size={[1, 1, 1]}
        />
        <Cube 
          position={[-1, 2, 0]}
          color={"yellow"}
          size={[1, 1, 1]}
        />
      </group> */}

      <Cube 
        position={[1, 0, 0]}
        color={"red"}
        size={[1, 1, 1]}
      />

      <Sphere
        position={[-2, 0, 0]}
        size={[1, 1, 1]}
        color={"blue"}
      />

      <Torus
        position={[4, 0, 0]}
        size={[0.8, 0.1, 30, 30]}
        color={"green"}
      />

      <TorusKnot
        position={[-5, 0, 0]}
        size={[0.5, 0.1, 1000, 50]}
        color={"pink"}
      />
      <OrbitControls/>
    </Canvas>
</>
    
  )
}

export default App
