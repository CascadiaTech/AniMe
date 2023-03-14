import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import urljoin from "url-join";
import {
  OrbitControls,
  Html,
  useGLTF,
  useFBX,
  softShadows,
  ScrollControls,
  Scroll,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { Object3DWrapper } from "../../components/3DCharacterBuilder/ObjectWrapper";
import { NextPage } from "next";
//import { Scroll, ScrollControls } from '@react-three/drei'
//import { useFrame } from '@react-three/fiber'

const traitPaths: string[] = ["/3dassets/body.glb"];
const baseUrl = "http://localhost:3000";
const mainCharacter = new THREE.Object3D();
const traits: any[] = [];

traitPaths.forEach((path) => {
  const { scene } = useGLTF(urljoin(baseUrl, path));
  traits.push(scene);
});
mainCharacter.add(traits[0]); // Add the first trait to the main character


const Character = () => {
  const characterRef = useRef<any>();

  useFrame(({ clock }) => {
    if (characterRef.current) {
      (characterRef.current as any).rotation.y =
        Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
      (characterRef.current as any).rotation.x =
        Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
    }
  });
  useFrame(({ mouse, camera }) => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 0.5,
      0.03
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * 0.8,
      0.01
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      Math.max(4, Math.abs(mouse.x * mouse.y * 8)),
      0.01
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      mouse.x * -Math.PI * 0.025,
      0.001
    );
  });

  return (
    <mesh ref={characterRef} castShadow>
      <Object3DWrapper object={mainCharacter} />;
    </mesh>
  );
};

const Test: NextPage = () => {
  return (
    <>
      
        <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
          <Canvas>
          <ScrollControls pages={3}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls minDistance={10} maxDistance={10} />

            <Object3DWrapper object={mainCharacter} />;
            </ScrollControls>
          </Canvas>
        </div>
      
    </>
  );
};

export default Test;
