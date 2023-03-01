import { GLTFExporter } from 'three';
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import { useLoader } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, useFBX } from "@react-three/drei";

// Define the paths to the trait files
const traitPaths: string[] = [
    '/path/to/trait1.glb',
    '/path/to/trait2.glb',
    '/path/to/trait3.glb',
  ];
  
  // Define the main template character object
  const mainCharacter = new THREE.Object3D();
  
  // Load the trait objects and add them to the main character
  const traits: any[] = [];
  traitPaths.forEach((path) => {
    const { scene } = useGLTF(path);
    traits.push(scene);
  });
  
  mainCharacter.add(traits[0]); // Add the first trait to the main character
  
  // When the user clicks on a trait object, add it to the main character
  traits.forEach((trait) => {
    trait.addEventListener('click', () => {
      mainCharacter.add(trait);
    });
  });
  
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