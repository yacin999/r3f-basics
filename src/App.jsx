import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, MeshWobbleMaterial, useHelper } from '@react-three/drei'
import {  useCallback, useRef, useState } from 'react'
import { animated, useSpring } from '@react-spring/three'
import { DirectionalLightHelper } from 'three'

import './App.css'
import { useControls } from 'leva'


const Cube = ({position, color, size})=> {
  const meshRef = useRef()


  useFrame((state, delta) => {
    // delta is the difference between the current frame and the last frame
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


const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

const Sphere = ({position, size}) => {

  const meshRef = useRef()

  const handleClick = useCallback(() => {
    let clicked = false

    return () => {
      clicked = !clicked
      api.start({
        color: clicked ? '#569AFF' : '#ff6d6d',
      })
    }
  }, [])
  
  const [springs, api] = useSpring(()=> ({
    scale : 1,
    position : position, 
    color : '#ff6d6d',
    config : key => {
      switch (key) {
        case "scale" :
          return {
            mass : 4,
            friction : 10
          }
        case "position" : 
        return {
          mass : 4,
          friction : 220
        }
        default : 
        return {}
      }
    }
  }), [])




  useFrame((state, delta) => {
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime ) / 25
  })

  const handlePointerEnter = () => {
    api.start({
      scale: 1.5,
    })
  }

  const handlePointerLeave = () => {
    api.start({
      scale: 1,
    })
  }

  return (
    <animated.mesh 
      ref={meshRef}
      position={position} 
      onClick={handleClick()}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      scale={springs.scale}
    >
      <sphereGeometry size={size}/>
      <AnimatedMeshDistortMaterial 
        color={springs.color}
        distort={0.5} 
        speed={5}
        wireframe
      />
    </animated.mesh>
  )
}


const Torus = ({position, size, color}) => {

  const meshRef = useRef()

  useFrame((state, delta) => {
    // delta is the difference between the current frame and the last frame
    meshRef.current.rotation.z += (delta * 4)
    meshRef.current.rotation.y += (delta * 4)

  })


  return (
    <mesh position={position} ref={meshRef}>
      <torusGeometry 
        args={size}
      />
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}


const TorusKnot = ({position, size, color}) => {

  const meshRef = useRef()

  const {controlColor, radius } = useControls({
    controlColor : "lightblue", 
    radius : {
      value : 5,
      min : 1,
      max : 10,
      step : 0.5
    }
  })

  useFrame((state, delta) => {
    // delta is the difference between the current frame and the last frame
    // meshRef.current.rotation.x += (delta * 4)
    // meshRef.current.rotation.y += (delta * 4)
    // meshRef.current.rotation.z += (delta * 4)

    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) 
  })


  return (
    <mesh position={position} ref={meshRef}>
      <torusKnotGeometry 
        args={[radius, ...size]}
      />
       <MeshWobbleMaterial 
        factor={0.6} 
        speed={10} 
        color={controlColor}
      />
    </mesh>
  )
}


const Scene = () => {

  const directionalLightRef = useRef()

  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "black")
  const {lightColor, lightIntesity } = useControls({
    lightColor : "white",
    lightIntesity : {
      value : 0.5,
      min : 0, 
      max : 5
    }
  })

  return (
    <>
      <directionalLight 
        position={[0, 1, 2]} 
        // intensity={0.5}
        intensity={lightIntesity} 
        ref={directionalLightRef}
        color={lightColor}
      />

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
        size={[1.5, 64, 32]}
      />

      <Torus
        position={[4, 0, 0]}
        size={[0.8, 0.1, 30, 30]}
        color={"green"}
      />

      <TorusKnot
        position={[-5, 0, 0]}
        size={[0.1, 1000, 50]}
        color={"pink"}
      />
      <OrbitControls/>
    </>
  )
}





function App() {

  const cubeRef = useRef(null)

  return (
    <>
    <Canvas>
      <Scene/>
    </Canvas>
</>
    
  )
}

export default App
