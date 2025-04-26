"use client";

import { useState } from "react";
import { Rotate3d, Anvil, Spline, SprayCan } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import clsx from "clsx";

import Material from "@/components/sidebar/meterial";
import Scene from "@/components/sidebar/scene";
import Modifiers from "@/components/sidebar/modifiers";
import Transform from "@/components/sidebar/transform";

export default function Test() {
  type Items = "transform" | "material" | "modifiers" | "scene";
  const [selectedItem, setSelectedItem] = useState<Items>("transform");

  const items = [
    { id: 1, name: "transform", icon: <Rotate3d />, component: <Transform /> },
    { id: 2, name: "material", icon: <Anvil />, component: <Material /> },
    { id: 3, name: "modifiers", icon: <Spline />, component: <Modifiers /> },
    { id: 4, name: "scene", icon: <SprayCan />, component: <Scene /> },
  ];

  // Find the selected component based on selectedItem
  const selectedComponent = items.find((item) => item.name === selectedItem)?.component;

  return (
    <TooltipProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-16 flex flex-col items-center bg-white/10 my-2 ml-2 rounded-tl-lg rounded-bl-lg py-1 border-r border-white/10">
          {items.map(({ id, name, icon }) => (
            <Tooltip key={id}>
              <TooltipTrigger>
                <div
                  className={clsx("w-full flex justify-center items-center transition font-medium cursor-pointer p-4 rounded-md", selectedItem === name ? "bg-black text-white" : "")}
                  onClick={() => setSelectedItem(name as Items)}
                >
                  {icon}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white text-black border">
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="w-64 bg-white/10 text-white my-2 rounded-tr-lg rounded-br-lg">
          {/* Render selected component here */}
          {selectedComponent}
        </div>
      </div>
    </TooltipProvider>
  );
}
