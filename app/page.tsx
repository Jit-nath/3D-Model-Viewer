import Link from "next/link"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ModelCard from "@/components/model-card"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">3D Model Editor</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="flex flex-col items-center justify-center p-8 h-64 border-dashed border-2">
          <Upload className="h-12 w-12 mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-4">Upload Your Model</h2>
          <Link href="/editor?new=true">
            <Button>Upload File</Button>
          </Link>
        </Card>

        <Card className="flex flex-col items-center justify-center p-8 h-64">
          <h2 className="text-xl font-semibold mb-4">Start from Scratch</h2>
          <p className="text-center text-muted-foreground mb-4">Create a new 3D model from scratch</p>
          <Link href="/editor?new=true">
            <Button variant="outline">Create New</Button>
          </Link>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">Example Models</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModelCard name="Duck" thumbnail="/placeholder.svg?height=200&width=200" modelPath="/assets/3d/duck.glb" />
        <ModelCard name="Cube" thumbnail="/placeholder.svg?height=200&width=200" modelPath="/cube" />
        <ModelCard name="Sphere" thumbnail="/placeholder.svg?height=200&width=200" modelPath="/sphere" />
        <ModelCard name="Torus" thumbnail="/placeholder.svg?height=200&width=200" modelPath="/torus" />
        <ModelCard name="Teapot" thumbnail="/placeholder.svg?height=200&width=200" modelPath="/teapot" />
        <ModelCard name="Character" thumbnail="/placeholder.svg?height=200&width=200" modelPath="/character" />
      </div>
    </div>
  )
}

