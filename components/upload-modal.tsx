"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const UploadModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      // Validate file type
      if (selectedFile.type !== "model/gltf-binary" && selectedFile.type !== "model/gltf+json") {
        toast.error("Only .glb or .gltf files are allowed.");
        setFile(null);
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = () => {
    if (file) {
      setOpen(false);
      // Handle file upload logic here
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Upload File</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
          </DialogHeader>

          {/* File Upload Section */}
          <div className="flex items-center gap-3">
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                {file ? "Upload a different file" : "Choose a File"}
              </label>
            </Button>
            <Input id="file-upload" type="file" accept=".glb,.gltf" className="hidden" onChange={handleFileChange} />
            {file && <span className="text-sm text-muted-foreground">{file.name}</span>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button onClick={handleUpload} disabled={!file} variant="default">
              Open file in editor
            </Button>
            <Button onClick={() => setOpen(false)} variant="secondary">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadModal;
