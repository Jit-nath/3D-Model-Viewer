import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Object3D, BoxGeometry, MeshBasicMaterial, Mesh, Object3DEventMap } from "three";
import { ModelProps } from "@/types/model-type";

const ModelViewer: React.FC<ModelProps> = ({ ModelPath }) => {
  const [model, setModel] = useState<Object3D | null>(null);

  useEffect(() => {
    if (ModelPath) {
      const loader = new GLTFLoader();
      loader.load(ModelPath, (gltf: { scene: React.SetStateAction<Object3D<Object3DEventMap> | null>; }) => {
        setModel(gltf.scene);
      });
    } else {
      const geometry = new BoxGeometry(1, 1, 1);
      const material = new MeshBasicMaterial({ color: 0x00ff00 });
      const box = new Mesh(geometry, material);
      setModel(box);
    }
  }, [ModelPath]);

  return (
    <div style={{ textAlign: "center" }} className="h-full w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} />
        {model && <primitive object={model} />}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
