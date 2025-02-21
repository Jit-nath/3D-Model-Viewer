import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import isMobile from '@/hooks/isMobile';
import { ModelProps } from '@/types/model-type';

const ModelViewer: React.FC<ModelProps> = ({ ModelPath }) => {
  const [model, setModel] = useState<any>(null);
  const [scale, setScale] = useState<number[]>([0.09, 0.09, 0.09]);
  const Mobile = isMobile();

  useEffect(() => {
    if (ModelPath) {
      const loader = new GLTFLoader();
      loader.load(ModelPath, (gltf) => setModel(gltf.scene));
    } else {
      const box = new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshBasicMaterial({ color: 'white' })
      );
      setModel(box);
    }
  }, [ModelPath]);

  useEffect(() => {
    if (Mobile) {
      setScale([0.05, 0.05, 0.05]);
    } else {
      setScale([0.09, 0.09, 0.09]);
    }
  }, [Mobile]);

  return (
    <div className="h-full w-full">
      <Canvas dpr={Mobile ? [1, 1.2] : [1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} />
        {model && <primitive object={model} scale={scale} />}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
