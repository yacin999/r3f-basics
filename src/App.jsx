import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { forwardRef, useImperativeHandle, useRef } from 'react'


const Cube = forwardRef((props, ref)=> {
  const meshRef = useRef()

  useImperativeHandle(ref, () => {
    return {
      focus() {
        meshRef.current.focus();
      }
    };
  }, []);
  // useFrame(({ clock }) => {
  //   meshRef.current.rotation.x = clock.getElapsedTime()
  //   meshRef.current.rotation.y = clock.getElapsedTime()
  //   meshRef.current.rotation.z = clock.getElapsedTime()

  // })


  // return <mesh ref={meshRef}>
  //         <boxGeometry />
  //         <meshStandardMaterial color={props.color}/>
  //       </mesh>

  return <input 
            type='text' 
            style={{border : `2px solid yellow`, width : "200px", height : "50px"}}  
            ref={meshRef}
          />
})

  


function App() {

  const cubeRef = useRef(null)

  const handleClick = () => {
    if (cubeRef.current) {
      cubeRef.current.focus(); // Now it should work
    }
  }
  return (
    <>
    {/* <Canvas>
      <directionalLight position={[0, 0, 2]} intensity={0.5}/>
      <ambientLight  intensity={0.1}/> */}
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

      {/* <Cube 
          color={"yellow"}
          ref={cubeRef}
      /> */}

    {/* </Canvas> */}
      <button onClick={() => handleClick}>
        focus the input
      </button>
      <Cube 
        ref={cubeRef}
      />
</>
    
  )
}

export default App
