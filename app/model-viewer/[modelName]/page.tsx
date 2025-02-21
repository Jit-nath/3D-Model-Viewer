"use client";
import Editor from "@/components/editor";
import { ModelProps } from "@/types/model-type";

function ModelPage() {

  const path = "/models/9dzn/9dzn.glb";
  const name = "9dzn Protein";

  const model: ModelProps = {
    ModelName: name,
    ModelPath: path,
  };

  return <Editor {...model} />;
}

export default ModelPage;
