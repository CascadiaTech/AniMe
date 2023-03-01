import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';


export function Object3DWrapper(props: any) {
  const objectRef = useRef<any>();

  useFrame(() => {
    if (objectRef.current) {
      // Update the object position, rotation, etc. here if needed
    }
  });

  return <primitive object={props.object} ref={objectRef} />;
}