"use client";

import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TextureMapperProps {
  modelPath: string;
}

function UVMappingVisualizer() {
  const texture = useTexture("/placeholder.svg?height=512&width=512");
  const checkerboardTexture = useTexture("/placeholder.svg?height=512&width=512");
  const [activeTexture, setActiveTexture] = useState(texture);
  const { camera } = useThree();

  // Position camera for better view of UV mapping
  useEffect(() => {
    camera.position.set(0, 0, 3);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} intensity={1} />

      <mesh>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial map={activeTexture} side={2} />
      </mesh>

      <OrbitControls />
    </>
  );
}

export default function TextureMapper({ modelPath }: TextureMapperProps) {
  const [uvScale, setUVScale] = useState([1]);
  const [uvOffset, setUVOffset] = useState([0]);
  const [uvRotation, setUVRotation] = useState([0]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative">
        <Canvas>
          <UVMappingVisualizer />
        </Canvas>
      </div>

      <div className="p-4 border-t">
        <Tabs defaultValue="mapping">
          <TabsList className="w-full">
            <TabsTrigger value="mapping" className="flex-1">
              UV Mapping
            </TabsTrigger>
            <TabsTrigger value="textures" className="flex-1">
              Textures
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mapping" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>UV Scale</Label>
                <span className="text-sm text-muted-foreground">{uvScale[0].toFixed(2)}</span>
              </div>
              <Slider value={uvScale} onValueChange={setUVScale} min={0.1} max={5} step={0.1} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>UV Offset</Label>
                <span className="text-sm text-muted-foreground">{uvOffset[0].toFixed(2)}</span>
              </div>
              <Slider value={uvOffset} onValueChange={setUVOffset} min={-1} max={1} step={0.05} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>UV Rotation</Label>
                <span className="text-sm text-muted-foreground">{uvRotation[0].toFixed(0)}°</span>
              </div>
              <Slider value={uvRotation} onValueChange={setUVRotation} min={0} max={360} step={1} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline">Reset</Button>
              <Button>Apply</Button>
            </div>
          </TabsContent>

          <TabsContent value="textures" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="border rounded-md p-2 cursor-pointer hover:bg-accent">
                <div className="aspect-square bg-muted rounded-md mb-2"></div>
                <p className="text-sm">Diffuse</p>
              </div>
              <div className="border rounded-md p-2 cursor-pointer hover:bg-accent">
                <div className="aspect-square bg-muted rounded-md mb-2"></div>
                <p className="text-sm">Normal</p>
              </div>
              <div className="border rounded-md p-2 cursor-pointer hover:bg-accent">
                <div className="aspect-square bg-muted rounded-md mb-2"></div>
                <p className="text-sm">Roughness</p>
              </div>
              <div className="border rounded-md p-2 cursor-pointer hover:bg-accent">
                <div className="aspect-square bg-muted rounded-md mb-2"></div>
                <p className="text-sm">Metalness</p>
              </div>
            </div>

            <Button className="w-full">Upload Texture</Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
