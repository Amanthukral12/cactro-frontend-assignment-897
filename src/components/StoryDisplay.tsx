import { MouseEvent } from "react";
import Loading from "./Loading";

interface Props {
  imageUrl: string;
  loading: boolean;
  onClick: (direction: "left" | "right") => void;
}

const StoryDisplay = ({ imageUrl, loading, onClick }: Props) => {
  const handleClick = (e: MouseEvent<HTMLImageElement>) => {
    const x = e.nativeEvent.offsetX;

    if (x < window.innerWidth / 2) onClick("left");
    else onClick("right");
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <img src={imageUrl} alt="Story" onClick={handleClick} />
      )}
    </div>
  );
};

export default StoryDisplay;
