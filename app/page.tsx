import { FaGithub } from "react-icons/fa";
import { SiGithubsponsors } from "react-icons/si";
import { TbCube3dSphere } from "react-icons/tb";
import ModelPage from "@/components/model-page";
export default function Page() {
  return (
    <>
      <div>
        {/* navbar */}
        <div className="h-20 max-w-full bg-slate-800 flex justify-between items-center px-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl">3D Model Viewer</h1>
          <div className="flex space-x-6 text-2xl">
            <a
              href="https://github.com/Jit-nath/3D-Model-Viewer"
              title="Go to GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="" />
            </a>
            <a href="#" title="Go to GitHub Sponsors">
              <SiGithubsponsors />
            </a>
          </div>
        </div>
        {/* upload model */}
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="w-[80vw] sm:max-w-2xl p-2 sm:p-8 bg-gray-600 rounded-lg shadow-md">
            <div className=" relative border-4 border-dashed border-white rounded-lg h-60 sm:h-96 flex flex-col justify-center items-center">
              <TbCube3dSphere className="scale-150 text-5xl" />
              <p className="text-gray-500 m-2 text-center absolute bottom-0">
                Drag and drop a file or click to select
              </p>
            </div>
          </div>
        </div>
        {/* gallery view of example models */}
        <div className="p-8">
          <ModelPage />
        </div>
      </div>
    </>
  );
}
