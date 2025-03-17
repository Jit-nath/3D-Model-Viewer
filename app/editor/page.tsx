"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import {
  Home,
  Save,
  Download,
  Undo,
  Redo,
  SunMedium,
  Moon,
  Grid3X3,
  Move,
  Rotate3dIcon as Rotate,
  Scale,
  SpaceIcon as Sphere,
  Cylinder,
  CuboidIcon as Cube,
  Scissors,
  Combine,
  Pipette,
  Brush,
  Eraser,
  Hammer,
  Wrench,
  Palette,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ModelEditor from "@/components/model-editor"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { toast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function EditorPage() {
  const searchParams = useSearchParams()
  const modelPath = searchParams.get("model") || ""
  // const isNew = searchParams.get("new") === "true"
  const { theme, setTheme } = useTheme()

  const [showGrid, setShowGrid] = useState(true)
  const [lightIntensity, setLightIntensity] = useState(1)
  const [activeTab, setActiveTab] = useState("transform")
  const [activeTool, setActiveTool] = useState("move")
  const [selectedColor, setSelectedColor] = useState("#4f46e5")
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [environment, setEnvironment] = useState("studio")
  const [showWireframe, setShowWireframe] = useState(false)

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key.toLowerCase()) {
        case "g":
          setActiveTool("move")
          break
        case "r":
          setActiveTool("rotate")
          break
        case "s":
          setActiveTool("scale")
          break
        case "v":
          setActiveTool("vertex")
          break
        case "e":
          setActiveTool("edge")
          break
        case "f":
          setActiveTool("face")
          break
        case "z":
          if (e.ctrlKey || e.metaKey) {
            // Undo
            toast({
              title: "Undo",
              description: "Action undone",
            })
          }
          break
        case "y":
          if (e.ctrlKey || e.metaKey) {
            // Redo
            toast({
              title: "Redo",
              description: "Action redone",
            })
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSave = () => {
    toast({
      title: "Project Saved",
      description: "Your 3D model has been saved successfully.",
    })
  }

  const handleExport = () => {
    setShowExportDialog(true)
  }

  const handleExportConfirm = (format: string) => {
    setShowExportDialog(false)
    toast({
      title: "Export Successful",
      description: `Your model has been exported as ${format.toUpperCase()}.`,
    })
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const colors = [
    "#4f46e5", // Indigo
    "#ef4444", // Red
    "#f97316", // Orange
    "#eab308", // Yellow
    "#22c55e", // Green
    "#06b6d4", // Cyan
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#6b7280", // Gray
    "#ffffff", // White
  ]

  return (
    <div className="flex flex-col h-screen">
      {/* Top toolbar */}
      <div className="bg-background border-b p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/">
                  <Button variant="ghost" size="icon">
                    <Home className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="vertical" className="h-6" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleSave}>
                  <Save className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save Project (Ctrl+S)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="vertical" className="h-6" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleExport}>
                  <Download className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export Model</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toast({ title: "Undo", description: "Action undone" })}
                >
                  <Undo className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo (Ctrl+Z)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toast({ title: "Redo", description: "Action redone" })}
                >
                  <Redo className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo (Ctrl+Y)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="text-lg font-semibold">3D Model Editor</div>

        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setShowGrid(!showGrid)}>
                  <Grid3X3 className={`h-5 w-5 ${showGrid ? "text-primary" : "text-muted-foreground"}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Grid</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setShowWireframe(!showWireframe)}>
                  {showWireframe ? (
                    <Eye className="h-5 w-5 text-primary" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Wireframe</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === "dark" ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {theme === "dark" ? "Light" : "Dark"} Mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-16 bg-background border-r flex flex-col items-center py-4 space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTool === "move" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActiveTool("move")}
                  className={activeTool === "move" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Move className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Move Tool (G)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTool === "rotate" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActiveTool("rotate")}
                  className={activeTool === "rotate" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Rotate className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Rotate Tool (R)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTool === "scale" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActiveTool("scale")}
                  className={activeTool === "scale" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Scale className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Scale Tool (S)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator className="my-2" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    toast({
                      title: "Cube Added",
                      description: "A new cube has been added to the scene.",
                    })
                  }}
                >
                  <Cube className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add Cube</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    toast({
                      title: "Sphere Added",
                      description: "A new sphere has been added to the scene.",
                    })
                  }}
                >
                  <Sphere className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add Sphere</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    toast({
                      title: "Cylinder Added",
                      description: "A new cylinder has been added to the scene.",
                    })
                  }}
                >
                  <Cylinder className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add Cylinder</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator className="my-2" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTool === "vertex" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActiveTool("vertex")}
                  className={activeTool === "vertex" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Pipette className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Vertex Edit Mode (V)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTool === "edge" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActiveTool("edge")}
                  className={activeTool === "edge" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Scissors className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Edge Edit Mode (E)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTool === "face" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActiveTool("face")}
                  className={activeTool === "face" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Combine className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Face Edit Mode (F)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator className="my-2" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTool === "paint" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => {
                    setActiveTool("paint")
                    setActiveTab("material")
                  }}
                  className={activeTool === "paint" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Brush className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Paint Tool</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTool === "erase" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActiveTool("erase")}
                  className={activeTool === "erase" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Eraser className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Erase Tool</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    toast({
                      title: "Object Deleted",
                      description: "Selected object has been deleted.",
                      variant: "destructive",
                    })
                  }}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Delete Selected (Del)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    toast({
                      title: "Object Duplicated",
                      description: "Selected object has been duplicated.",
                    })
                  }}
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Duplicate Selected (Ctrl+D)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Main editor area */}
        <div className="flex-1 relative">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading...</div>}>
            <ModelEditor
              modelPath={modelPath}
              showGrid={showGrid}
              lightIntensity={lightIntensity}
              activeTool={activeTool}
              selectedColor={selectedColor}
              environment={environment}
              showWireframe={showWireframe}
            />
          </Suspense>
        </div>

        {/* Right sidebar */}
        <div className="w-64 bg-background border-l p-4 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="transform" className="flex-1">
                Transform
              </TabsTrigger>
              <TabsTrigger value="material" className="flex-1">
                Material
              </TabsTrigger>
              <TabsTrigger value="modifiers" className="flex-1">
                Modifiers
              </TabsTrigger>
              <TabsTrigger value="scene" className="flex-1">
                Scene
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transform" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Position X</Label>
                <Slider
                  defaultValue={[0]}
                  max={10}
                  min={-10}
                  step={0.1}
                  onValueChange={(value) => {
                   console.log(value)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Position Y</Label>
                <Slider
                  defaultValue={[0]}
                  max={10}
                  min={-10}
                  step={0.1}
                  onValueChange={(value) => {
                   console.log(value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Position Z</Label>
                <Slider
                  defaultValue={[0]}
                  max={10}
                  min={-10}
                  step={0.1}
                  onValueChange={(value) => {
                   console.log(value);
                  }}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Rotation X</Label>
                <Slider
                  defaultValue={[0]}
                  max={360}
                  min={0}
                  step={1}
                  onValueChange={(value) => {
                    console.log(value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Rotation Y</Label>
                <Slider
                  defaultValue={[0]}
                  max={360}
                  min={0}
                  step={1}
                  onValueChange={(value) => {
                   console.log(value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Rotation Z</Label>
                <Slider
                  defaultValue={[0]}
                  max={360}
                  min={0}
                  step={1}
                  onValueChange={(value) => {
                    console.log(value);
                  }}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Scale</Label>
                <Slider
                  defaultValue={[1]}
                  max={5}
                  min={0.1}
                  step={0.1}
                  onValueChange={(value) => {
                  console.log(value);
                  }}
                />
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Transform Reset",
                      description: "Object transform has been reset to default values.",
                    })
                  }}
                >
                  Reset Transform
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="material" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={`w-full aspect-square rounded-md cursor-pointer border ${selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Metalness</Label>
                <Slider
                  defaultValue={[0]}
                  max={1}
                  min={0}
                  step={0.01}
                  onValueChange={(value) => {
                    // In a real app, this would update the material
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Roughness</Label>
                <Slider
                  defaultValue={[0.5]}
                  max={1}
                  min={0}
                  step={0.01}
                  onValueChange={(value) => {
                    // In a real app, this would update the material
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Texture Type</Label>
                <RadioGroup defaultValue="diffuse">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="diffuse" id="diffuse" />
                    <Label htmlFor="diffuse">Diffuse</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="roughness" id="roughness" />
                    <Label htmlFor="roughness">Roughness</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metalness" id="metalness" />
                    <Label htmlFor="metalness">Metalness</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Texture Upload",
                    description: "Please select a texture file to upload.",
                  })
                }}
              >
                <Palette className="h-4 w-4 mr-2" />
                Upload Texture
              </Button>
            </TabsContent>

            <TabsContent value="modifiers" className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="subdivision">Subdivision</Label>
                  <Switch
                    id="subdivision"
                    onCheckedChange={(checked) => {
                      toast({
                        title: checked ? "Subdivision Applied" : "Subdivision Removed",
                        description: checked
                          ? "Subdivision modifier has been applied."
                          : "Subdivision modifier has been removed.",
                      })
                    }}
                  />
                </div>
                <Slider
                  defaultValue={[1]}
                  max={4}
                  min={0}
                  step={1}
                  onValueChange={(value) => {
                    // In a real app, this would update the subdivision level
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Boolean Operations</Label>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      toast({
                        title: "Union Operation",
                        description: "Union boolean operation applied to selected objects.",
                      })
                    }}
                  >
                    <Hammer className="h-4 w-4 mr-2 text-green-500" />
                    Union
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      toast({
                        title: "Difference Operation",
                        description: "Difference boolean operation applied to selected objects.",
                      })
                    }}
                  >
                    <Scissors className="h-4 w-4 mr-2 text-red-500" />
                    Difference
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      toast({
                        title: "Intersection Operation",
                        description: "Intersection boolean operation applied to selected objects.",
                      })
                    }}
                  >
                    <Wrench className="h-4 w-4 mr-2 text-blue-500" />
                    Intersection
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Deformation</Label>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      toast({
                        title: "Bend Modifier",
                        description: "Bend modifier applied to selected object.",
                      })
                    }}
                  >
                    <span className="w-4 h-4 mr-2 flex items-center justify-center text-yellow-500">↪</span>
                    Bend
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      toast({
                        title: "Twist Modifier",
                        description: "Twist modifier applied to selected object.",
                      })
                    }}
                  >
                    <span className="w-4 h-4 mr-2 flex items-center justify-center text-purple-500">↻</span>
                    Twist
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      toast({
                        title: "Taper Modifier",
                        description: "Taper modifier applied to selected object.",
                      })
                    }}
                  >
                    <span className="w-4 h-4 mr-2 flex items-center justify-center text-orange-500">◆</span>
                    Taper
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="scene" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="grid-toggle">Show Grid</Label>
                <Switch id="grid-toggle" checked={showGrid} onCheckedChange={setShowGrid} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="wireframe-toggle">Show Wireframe</Label>
                <Switch id="wireframe-toggle" checked={showWireframe} onCheckedChange={setShowWireframe} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Light Intensity</Label>
                  <span className="text-sm text-muted-foreground">{lightIntensity.toFixed(1)}</span>
                </div>
                <Slider
                  value={[lightIntensity]}
                  onValueChange={(values) => setLightIntensity(values[0])}
                  max={2}
                  min={0}
                  step={0.1}
                />
              </div>

              <div className="space-y-2">
                <Label>Environment</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["studio", "sunset", "dawn", "night"].map((env) => (
                    <Button
                      key={env}
                      variant={environment === env ? "default" : "outline"}
                      className={`w-full capitalize ${environment === env ? "bg-primary text-primary-foreground" : ""}`}
                      onClick={() => setEnvironment(env)}
                    >
                      {env}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {["#000000", "#ffffff", "#1e293b", "#0f172a", "#18181b"].map((color) => (
                    <div
                      key={color}
                      className="w-full aspect-square rounded-md cursor-pointer border"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        toast({
                          title: "Background Changed",
                          description: "Scene background color has been updated.",
                        })
                      }}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Export Dialog */}
      {showExportDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background border rounded-lg shadow-lg p-6 w-[500px] max-w-[90vw]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Export Model</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowExportDialog(false)}>
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
                  <Select defaultValue="glb">
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
                    <span className="text-sm text-muted-foreground">1.00</span>
                  </div>
                  <Slider id="export-scale" defaultValue={[1]} max={2} min={0.1} step={0.1} />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="export-textures" defaultChecked />
                  <Label htmlFor="export-textures">Include Textures</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="export-animations" />
                  <Label htmlFor="export-animations">Include Animations</Label>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="export-quality">Quality</Label>
                  <Select defaultValue="medium">
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
                  <Checkbox id="export-compress" defaultChecked />
                  <Label htmlFor="export-compress">Compress Output</Label>
                </div>

                <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">
                  <p>Advanced export settings affect file size and compatibility.</p>
                  <p className="mt-1">Higher quality settings preserve more detail but result in larger files.</p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowExportDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleExportConfirm("glb")}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

