"use client"

import { useState } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ExportDialogProps {
  onClose: () => void
  onExport: (format: string, options: ExportOptions) => void
}

interface ExportOptions {
  scale: number
  includeTextures: boolean
  includeAnimations: boolean
  quality: "low" | "medium" | "high"
  compress: boolean
}

export default function ExportDialog({ onClose, onExport }: ExportDialogProps) {
  const [format, setFormat] = useState("glb")
  const [scale, setScale] = useState([1])
  const [includeTextures, setIncludeTextures] = useState(true)
  const [includeAnimations, setIncludeAnimations] = useState(false)
  const [quality, setQuality] = useState<"low" | "medium" | "high">("medium")
  const [compress, setCompress] = useState(true)

  const handleExport = () => {
    onExport(format, {
      scale: scale[0],
      includeTextures,
      includeAnimations,
      quality,
      compress,
    })
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background border rounded-lg shadow-lg p-6 w-[500px] max-w-[90vw]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Export Model</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="basic">
          <TabsList className="w-full">
            <TabsTrigger value="basic" className="flex-1">
              Basic
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1">
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="export-format">Format</Label>
              <Select value={format} onValueChange={setFormat}>
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
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="export-scale">Scale</Label>
                <span className="text-sm text-muted-foreground">{scale[0].toFixed(2)}</span>
              </div>
              <Slider id="export-scale" value={scale} onValueChange={setScale} max={2} min={0.1} step={0.1} />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="export-textures"
                checked={includeTextures}
                onCheckedChange={(checked) => setIncludeTextures(checked === true)}
              />
              <Label htmlFor="export-textures">Include Textures</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="export-animations"
                checked={includeAnimations}
                onCheckedChange={(checked) => setIncludeAnimations(checked === true)}
              />
              <Label htmlFor="export-animations">Include Animations</Label>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="export-quality">Quality</Label>
              <Select value={quality} onValueChange={(value) => setQuality(value as "low" | "medium" | "high")}>
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="export-compress"
                checked={compress}
                onCheckedChange={(checked) => setCompress(checked === true)}
              />
              <Label htmlFor="export-compress">Compress Output</Label>
            </div>

            <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">
              <p>Advanced export settings affect file size and compatibility.</p>
              <p className="mt-1">Higher quality settings preserve more detail but result in larger files.</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  )
}

