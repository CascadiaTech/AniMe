import { GLTFExporter } from 'three';
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import { useLoader } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, useFBX } from "@react-three/drei";
import urljoin from 'url-join';
import { Object3DWrapper } from './ObjectWrapper'
import { Object3D } from 'three';
export default function TraitRender(){

  const [active_trait, set_activetrait] = useState()
// Define the paths to the trait files
const traitPaths: string[] = [
    '/3dassets/body.glb',
    '/3dassets/pants.glb',
  ];
const baseUrl = 'http://localhost:3000'
  // Define the main template character object
const mainCharacter = new THREE.Object3D();
  
  // Load the trait objects and add them to the main character


    const traits: any[] = [];
    traitPaths.forEach((path) => {
      const { scene } = useGLTF(urljoin(baseUrl, path));
      traits.push(scene);
    });
    
    mainCharacter.add(traits[0]); // Add the first trait to the main character



    function addTraitOnClick(traitPath: string) {
        const handleTraitClick = () => {
          const { scene } = useGLTF(traitPath);
          mainCharacter.add(scene);
        };
        return handleTraitClick;
      }


      traits.forEach((trait) => {
        const handleTraitClick = addTraitOnClick(urljoin(baseUrl, trait));
        trait.addEventListener('click', handleTraitClick);
      });

      /*
  function SetTrait(trait: any) {
    traits.forEach((trait) => { 
        trait.addEventListener('click', () => {
        });
        const { scene } = useGLTF(urljoin(baseUrl, trait));
        mainCharacter.add(scene);
      });

  }*/


  return (
    <>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls/>
      <Object3DWrapper object={mainCharacter} />;
    </Canvas>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls/>
      <Object3DWrapper object={traits[1]} />;
    </Canvas>
    <div>
<button  className="text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-3 mt-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"></button>
    </div>
    </>
  );
}