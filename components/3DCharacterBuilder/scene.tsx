import React from 'react';
import { Canvas } from '@react-three/fiber';

const Scene = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* Add your 3D objects here */}
    </Canvas>
  );
};

export default Scene