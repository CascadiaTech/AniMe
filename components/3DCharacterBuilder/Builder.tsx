import { GLTFExporter } from "three";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF, useFBX } from "@react-three/drei";
import urljoin from "url-join";
import { Object3DWrapper } from "./ObjectWrapper";
import { Object3D } from "three";
export default function CharacterBulder() {
  const [active_trait, set_activetrait] = useState();
  // Define the paths to the trait files
 
  const traitPaths: string[] = ["/3dassets/body.glb","/3dassets/pants.glb", '/3dassets/shirt.glb'];
  const baseUrl = "http://localhost:3000";

  const mainCharacter = new THREE.Object3D();
  const traits: any[] = [];

  traitPaths.forEach((path) => {
    const { scene } = useGLTF(urljoin(baseUrl, path));
    traits.push(scene);
  });
  mainCharacter.add(traits[0]); // Add the first trait to the main character


  function addTraitOnClick(traitPath: string) {

    const handleTraitClick = () => {
      const { scene } = useGLTF(urljoin(baseUrl, traitPath));
      const existingTrait = mainCharacter.children.find((child: any) => child.name === traitPath);
      
      if (existingTrait) {
        mainCharacter.remove(existingTrait);
      } else {
        mainCharacter.add(scene);
        scene.name = traitPath;
      }
    };
    
    return handleTraitClick;
    
  }



  function IHateChatGPT() {
    return (
      <>
        {traitPaths.map((trait: any, i: any) => (
          <div onClick={addTraitOnClick(trait)} key={i}>
            {" "}
            {trait}
          </div>
        ))}
      </>
    );
  }

  // When the user clicks on a trait object, add it to the main character

  /*
  <button  className="text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-3 mt-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => SetTrait('/3dassets/pants.glb')}></button>
  function SetTrait(trait : any){
    const newtrait = new THREE.Object3D(trait);
    mainCharacter.add(newtrait)
  }*/

  /*
  function SetTrait(trait: any) {
    const { scene } = useGLTF(urljoin(baseUrl, trait)); // Load the 3D model from the specified path using useGLTF hook
    mainCharacter.add(scene); // Add the loaded 3D model to the main character
  }
*/
  /*
  // When the user is ready, export the scene as a GLTF file
  const exporter = new GLTFExporter();
  exporter.parse(mainCharacter, (gltf: any) => {
    const data = JSON.stringify(gltf);
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    // Download the GLTF file
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = 'character.gltf';
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  });
*/
  return (
    <>
    <div className="mt-20" style={{width: '800px', height: '600px'}}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls minDistance={12} maxZoom={30} maxDistance={30} />
        <Object3DWrapper object={mainCharacter} />;
      </Canvas>
      <div>
      {IHateChatGPT()}
  
      </div>
      </div>
    </>
  );
}
