import { FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface LoveButtonProps {
  liked: boolean;
}

export default function LoveButton({ liked }: LoveButtonProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (liked) {
        localStorage.setItem('liked', liked.toString());
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
  }, [liked]);
  return (
    <button
      className={`text-2xl transition-transform duration-300 ${
        animate ? 'scale-125' : 'scale-100'
      }`}
    >
      <FaHeart className={liked ? 'text-red-500' : 'text-gray-400'} />
    </button>
  );
}
