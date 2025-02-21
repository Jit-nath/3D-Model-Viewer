'use client';
// import { useState } from "react";
import ModelViewer from './Model-viewer';
import { ModelProps } from '@/types/model-type';
import { VscSettings } from 'react-icons/vsc';
import { FaFile } from 'react-icons/fa';

function Editor({ ModelName, ModelPath }: ModelProps) {
  // const [pressed, setPressed] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bars */}
      <div className="w-full h-10 bg-blue-950 flex items-center justify-center">
        {ModelName}
      </div>

      {/* Control center */}
      <div className="w-full h-10 bg-slate-950 hidden sm:flex items-center justify-start space-x-5 pl-5 text-xl">
        <FaFile className="cursor-pointer" />
        <VscSettings className="cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center flex-1">
        <ModelViewer ModelPath={ModelPath} ModelName={null} />
      </div>
    </div>
  );
}

export default Editor;
