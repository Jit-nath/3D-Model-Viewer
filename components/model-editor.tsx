"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, TransformControls, Grid, Environment, useGLTF, PerspectiveCamera, GizmoHelper, GizmoViewport, useTexture, Edges, Html, Center } from "@react-three/drei";
import * as THREE from "three";
import { toast } from "@/hooks/use-toast";

interface ModelEditorProps {
  modelPath: string;
  showGrid: boolean;
  lightIntensity: number;
  activeTool: string;
  selectedColor: string;
  environment: string;
  showWireframe: boolean;
}

function Model({ url, showWireframe }: { url: string; showWireframe: boolean }) {
  const { scene } = useGLTF(url);
  const [_hovered, setHovered] = useState(false);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.wireframe = showWireframe;
        }
      }
    });
  }, [scene, showWireframe]);

  return <primitive object={scene} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} />;
}

function TexturedModel({ showWireframe, color }: { showWireframe: boolean; color: string }) {
  const texture = useTexture("/placeholder.svg?height=512&width=512");
  const [hovered, setHovered] = useState(false);

  return (
    <mesh castShadow receiveShadow position={[2, 0, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} wireframe={showWireframe} color={color} />
      {hovered && <Edges scale={1.05} threshold={15} color="#ffffff" />}
    </mesh>
  );
}

function DefaultModel({ showWireframe, color }: { showWireframe: boolean; color: string }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  // Add a subtle animation
  useFrame((_state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        toast({
          title: "Object Selected",
          description: "You can now edit this object.",
        });
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "#ffffff" : color} wireframe={showWireframe} emissive={hovered ? color : "#000000"} emissiveIntensity={hovered ? 0.5 : 0} />
      {hovered && <Edges scale={1.05} threshold={15} color="#ffffff" />}

      {hovered && (
        <Html position={[0, 1.5, 0]} center>
          <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs border">Cube</div>
        </Html>
      )}
    </mesh>
  );
}

function Scene({ modelPath, showGrid, lightIntensity, activeTool, selectedColor, environment, showWireframe }: ModelEditorProps) {
  const [selectedObject, setSelectedObject] = useState<THREE.Object3D | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera /* , scene  */ } = useThree();

  // Set up camera position
  useEffect(() => {
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Handle model selection
  const handleClick = (e: any) => {
    if (e.object && e.object.type !== "GridHelper") {
      setSelectedObject(e.object);
      toast({
        title: "Object Selected",
        description: `Selected ${e.object.type}. Use transform tools to modify.`,
      });
    } else {
      setSelectedObject(null);
    }
  };

  // Handle different edit modes
  useEffect(() => {
    if (selectedObject && selectedObject instanceof THREE.Mesh) {
      // Reset any previous edit mode visual helpers
      selectedObject.userData.editMode = activeTool;

      // Apply visual helpers based on edit mode
      if (activeTool === "vertex" || activeTool === "edge" || activeTool === "face") {
        // In a real implementation, we would show the appropriate helpers
        // This is a simplified visual representation
        if (selectedObject.material) {
          selectedObject.material.wireframe = activeTool === "edge" || showWireframe;
        }

        toast({
          title: `${activeTool.charAt(0).toUpperCase() + activeTool.slice(1)} Edit Mode`,
          description: `Now editing ${activeTool}s. Select ${activeTool}s to modify them.`,
        });
      } else {
        if (selectedObject.material && !showWireframe) {
          selectedObject.material.wireframe = false;
        }
      }
    }
  }, [selectedObject, activeTool, showWireframe]);

  return (
    <>
      {/* Camera and controls */}
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      <OrbitControls makeDefault />

      {/* Environment and lighting */}
      <Environment preset={environment as any} />
      <ambientLight intensity={0.5 * lightIntensity} />
      <directionalLight position={[10, 10, 5]} intensity={1 * lightIntensity} castShadow shadow-mapSize={[2048, 2048]} />

      {/* Grid */}
      {showGrid && (
        <Grid
          infiniteGrid
          fadeDistance={60}
          fadeStrength={5}
          cellColor={environment === "night" ? "#444444" : "#aaaaaa"}
          sectionColor={environment === "night" ? "#666666" : "#555555"}
          cellSize={0.5}
          sectionSize={0.5}
        />
      )}

      {/* Model */}
      <group ref={groupRef} onClick={handleClick}>
        <Center>
          {modelPath ? (
            modelPath !== "new" && modelPath !== "" ? (
              <Model url={modelPath} showWireframe={showWireframe} />
            ) : (
              <DefaultModel showWireframe={showWireframe} color={selectedColor} />
            )
          ) : (
            <TexturedModel showWireframe={showWireframe} color={selectedColor} />
          )}

          {/* Add a textured model as an example */}
          {/* {!modelPath && <TexturedModel showWireframe={showWireframe} color={selectedColor} />} */}
        </Center>
      </group>

      {/* Transform controls */}
      {selectedObject && (
        <TransformControls
          object={selectedObject}
          mode={activeTool as "translate" | "rotate" | "scale"}
          size={0.75}
          onObjectChange={() => {
            // In a real app, this would update the transform values in the UI
          }}
        />
      )}

      {/* Gizmo helper */}
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={["#ff3653", "#0adb50", "#2c8fdf"]} labelColor="white" />
      </GizmoHelper>
    </>
  );
}

export default function ModelEditor({ modelPath, showGrid, lightIntensity, activeTool, selectedColor, environment, showWireframe }: ModelEditorProps) {
  const transformMode =
    {
      move: "translate",
      rotate: "rotate",
      scale: "scale",
    }[activeTool] || "translate";

  return (
    <Canvas shadows className="w-full h-full">
      <Scene
        modelPath={modelPath}
        showGrid={showGrid}
        lightIntensity={lightIntensity}
        activeTool={transformMode}
        selectedColor={selectedColor}
        environment={environment}
        showWireframe={showWireframe}
      />
    </Canvas>
  );
}
