import { MouseEvent, useEffect, useState } from "react";
import Loading from "./Loading";

interface Props {
  imageUrl: string;
  loading: boolean;
  onClick: (direction: "left" | "right") => void;
}

const StoryDisplay = ({ imageUrl, loading, onClick }: Props) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 150);
    return () => clearTimeout(timeout);
  }, [imageUrl]);
  const handleClick = (e: MouseEvent<HTMLImageElement>) => {
    const x = e.nativeEvent.offsetX;

    if (x < window.innerWidth / 2) onClick("left");
    else onClick("right");
  };
  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      {loading ? (
        <Loading />
      ) : (
        <img
          src={imageUrl}
          alt="Story"
          onClick={handleClick}
          className={`w-full h-full object-cover transition-all duration-150 ease-in-out ${
            animate ? "opacity-20 translate-x-4" : "opacity-100 translate-x-0"
          }`}
        />
      )}
    </div>
  );
};

export default StoryDisplay;
