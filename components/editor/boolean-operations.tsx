"use client";

import { useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type OperationType = "union" | "subtract" | "intersect" | "none";

function BooleanDemo() {
  const [operation, _setOperation] = useState<OperationType>("none");
  const box1Ref = useRef<THREE.Mesh>(null);
  const box2Ref = useRef<THREE.Mesh>(null);
  const resultRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  const performOperation = () => {
    if (!box1Ref.current || !box2Ref.current || !resultRef.current) return;

    switch (operation) {
      case "union":
        resultRef.current.visible = true;
        resultRef.current.position.set(0, 0, 0);
        resultRef.current.scale.set(1.5, 1, 1.5);
        break;
      case "subtract":
        resultRef.current.visible = true;
        resultRef.current.position.set(-0.25, 0, 0);
        resultRef.current.scale.set(0.75, 1, 1);
        break;
      case "intersect":
        resultRef.current.visible = true;
        resultRef.current.position.set(0.25, 0, 0);
        resultRef.current.scale.set(0.5, 1, 0.5);
        break;
      case "none":
        resultRef.current.visible = false;
        break;
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} intensity={1} />

      <group>
        {/* First object */}
        <mesh ref={box1Ref} position={[-0.5, 0, 0]} visible={operation === "none"}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ff6b6b" transparent opacity={0.8} />
        </mesh>

        {/* Second object */}
        <mesh ref={box2Ref} position={[0.5, 0, 0]} visible={operation === "none"}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#4ecdc4" transparent opacity={0.8} />
        </mesh>

        {/* Result object */}
        <mesh ref={resultRef} visible={false}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#f9d56e" />
        </mesh>
      </group>

      <OrbitControls />
    </>
  );
}

export default function BooleanOperations() {
  const [operation, setOperation] = useState<OperationType>("none");

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative">
        <Canvas>
          <BooleanDemo />
        </Canvas>
      </div>

      <div className="p-4 border-t">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select value={operation} onValueChange={(value) => setOperation(value as OperationType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="union">Union</SelectItem>
                <SelectItem value="subtract">Subtract</SelectItem>
                <SelectItem value="intersect">Intersect</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">Reset</Button>
            <Button>Apply</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
