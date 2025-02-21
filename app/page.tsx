'use client';
import { FaGithub } from 'react-icons/fa';
import { TbCube3dSphere } from 'react-icons/tb';
import ModelPage from '@/components/model-page';
import isMobile from '@/hooks/isMobile';
import LoveButton from '@/components/like-button';
import { useEffect, useState } from 'react';

export default function Page() {
  const [liked, setLiked] = useState(false);

  // This effect runs once on mount to initialize the 'liked' state from localStorage
  useEffect(() => {
    const likedStatus = localStorage.getItem('liked');
    if (likedStatus === null) {
      localStorage.setItem('liked', 'false');
      setLiked(false);
    } else {
      setLiked(likedStatus === 'true');
    }
  }, []);

  const handleClick = () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);
    localStorage.setItem('liked', newLikedStatus.toString());
  };

  return (
    <>
      <div>
        {/* Navbar */}
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
            <div onClick={handleClick}>
              <LoveButton liked={liked} />
            </div>
          </div>
        </div>
        {/* Upload model */}
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="w-[80vw] sm:max-w-2xl p-2 sm:p-8 bg-gray-600 rounded-lg shadow-md">
            <div className="relative border-4 border-dashed border-white rounded-lg h-60 sm:h-96 flex flex-col justify-center items-center">
              <TbCube3dSphere className="scale-150 text-5xl" />
              <p className="text-gray-500 m-2 text-center absolute bottom-0">
                {isMobile()
                  ? 'Tap to select'
                  : 'Drag and drop a file or click to select'}
              </p>
            </div>
          </div>
        </div>
        {/* Gallery view of example models */}
        <div className="p-8">
          <ModelPage />
        </div>
      </div>
    </>
  );
}
