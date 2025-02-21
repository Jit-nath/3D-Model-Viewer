import React from 'react';
import Image from 'next/image';

interface ModelCardProps {
  imageUrl: string;
  modelName: string;
  onClick: () => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ imageUrl, modelName, onClick }) => {
  return (
    <div
      className="w-full max-w-xs mx-auto border border-gray-300 rounded-lg p-4 flex flex-col items-center gap-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={modelName}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
      </div>
      <h1 className="text-center text-lg font-semibold">{modelName}</h1>
    </div>
  );
};

export default ModelCard;
