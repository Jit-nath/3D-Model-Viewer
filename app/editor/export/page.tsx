"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

interface ExportOptions {
  format: "glb" | "gltf" | "obj" | "stl" | "fbx";
  quality: "low" | "medium" | "high";
  includeTextures: boolean;
  compressOutput: boolean;
  includeAnimations: boolean;
}

export default function ExportPage() {
  const router = useRouter();
  const [options, setOptions] = useState<ExportOptions>({
    format: "glb",
    quality: "medium",
    includeTextures: true,
    compressOutput: true,
    includeAnimations: false,
  });

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);

    // Mock export logic
    console.log("Exporting model with options:", options);

    setTimeout(() => {
      alert("Model exported successfully!");
      setIsExporting(false);
    }, 1500);
  };

  const handleChange = (field: keyof ExportOptions, value: boolean | string) => {
    setOptions((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-background border-b p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-4">Export Model</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative">
          <Canvas>
            <Stage environment="studio" intensity={0.5}>
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#888888" />
              </mesh>
            </Stage>
            <OrbitControls />
          </Canvas>
        </div>

        <div className="w-80 bg-background border-l p-6 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <Label htmlFor="export-format">Format</Label>
            <Select value={options.format} onValueChange={(value) => handleChange("format", value)}>
              <SelectTrigger id="export-format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="glb">GLB (Binary)</SelectItem>
                <SelectItem value="gltf">GLTF (Text)</SelectItem>
                <SelectItem value="obj">OBJ</SelectItem>
                <SelectItem value="stl">STL</SelectItem>
                <SelectItem value="fbx">FBX</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">GLB is recommended for most use cases</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="export-quality">Quality</Label>
            <Select value={options.quality} onValueChange={(value) => handleChange("quality", value)}>
              <SelectTrigger id="export-quality">
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (Faster)</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High (Slower)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="export-textures" checked={options.includeTextures} onCheckedChange={(checked) => handleChange("includeTextures", !!checked)} />
              <Label htmlFor="export-textures">Include Textures</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="export-compress" checked={options.compressOutput} onCheckedChange={(checked) => handleChange("compressOutput", !!checked)} />
              <Label htmlFor="export-compress">Compress Output</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="export-animations" checked={options.includeAnimations} onCheckedChange={(checked) => handleChange("includeAnimations", !!checked)} />
              <Label htmlFor="export-animations">Include Animations</Label>
            </div>
          </div>

          <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">
            <p>Preview your model before exporting to ensure everything looks correct.</p>
            <p className="mt-1">Larger models may take longer to export.</p>
          </div>

          <Button className="w-full" onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              "Exporting..."
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" /> Export Model
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
