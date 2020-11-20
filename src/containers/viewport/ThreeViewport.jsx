import React from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { makeStyles } from '@material-ui/core/styles';
import { useRef } from 'react'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { OrbitControls } from "./OrbitControls";
// import {OrbitControls} from './OrbitControl'
extend({ OrbitControls })



const useStyles = makeStyles((theme)=>({
  root: {
    height: 100,
    width: 100
  }
}));
// Geometry
function GroundPlane() {
  return (
    <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}
function BackDrop() {
  return (
    <mesh receiveShadow position={[0, -1, -5]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}
function Sphere() {
  return (
    <mesh
      visible
      userData={{ test: "hello" }}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      castShadow
    >
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

// Lights
function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      // lookAt={[0, 0, 0]}
      // penumbra={1}
      castShadow
    />
  );
}
function FillLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      intensity={brightness}
      color={color}
      position={[2, 1, 4]}
      //add lookat?
      // penumbra={2}
      castShadow
    />
  );
}

function RimLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={2}
      height={2}
      intensity={brightness}
      color={color}
      position={[1, 4, -2]}
      rotation={[0, 180, 0]}
      castShadow
    />
  );
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(state => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

function ThreeViewport() {
  const classes = useStyles();
  return (
    <Canvas className={classes.root}>
        <CameraControls />
      <GroundPlane />
      <BackDrop />
      <KeyLight brightness={5.6} color={"#ffbdf4"} />
      <FillLight brightness={2.6} color={"#bdefff"} />
      <RimLight brightness={54} color={"#fff"} />
      <Sphere />
    </Canvas>
  );
}


export default ThreeViewport
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
