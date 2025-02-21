"use client";
import React from "react";
import ModelCard from "@/components/model-card";
import { useRouter } from "next/navigation";

const ModelPage: React.FC = () => {
  const URL = "https://picsum.photos/300/200";
  const router = useRouter();

  function openPage(name: string) {
    router.push(`/model-viewer/${encodeURIComponent(name)}`);
  }
  const ModelName = "9dzn Protein";

  return (
    <>
      <h2 className="text-3xl w-full text-center mb-10">Browse our gallery</h2>
      <div className="grid gap-8 mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <ModelCard
          imageUrl="/models/9dzn/9dzn.png"
          modelName={ModelName}
          onClick={() => openPage(ModelName)}
        />
      </div>
    </>
  );
};

export default ModelPage;
