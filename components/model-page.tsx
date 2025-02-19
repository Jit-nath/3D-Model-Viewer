import React from "react";
import ModelCard from "@/components/model-card";

const ModelPage: React.FC = () => {
  const URL = "https://picsum.photos/300/200";

  return (
    <>
      <h2 className="text-3xl w-full text-center mb-10">Browse our gallery</h2>
      <div className="grid gap-8 mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <ModelCard imageUrl={URL} modelName="Model 1" />
        <ModelCard imageUrl={URL} modelName="Model 2" />
        <ModelCard imageUrl={URL} modelName="Model 3" />
        <ModelCard imageUrl={URL} modelName="Model 1" />
        <ModelCard imageUrl={URL} modelName="Model 2" />
        <ModelCard imageUrl={URL} modelName="Model 3" />
        <ModelCard imageUrl={URL} modelName="Model 1" />
        <ModelCard imageUrl={URL} modelName="Model 2" />
        <ModelCard imageUrl={URL} modelName="Model 3" />
      </div>
    </>
  );
};

export default ModelPage;
