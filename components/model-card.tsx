import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface ModelCardProps {
  name: string;
  thumbnail: string;
  modelPath: string;
}

export default function ModelCard({ name, thumbnail, modelPath }: ModelCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image src={thumbnail || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{name}</h3>
          <Link href={`/editor?model=${encodeURIComponent(modelPath)}`}>
            <Button size="sm" variant="ghost">
              <Eye className="h-4 w-4 mr-2" />
              Open
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
