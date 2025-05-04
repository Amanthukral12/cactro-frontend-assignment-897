import { useEffect, useRef, useState } from "react";
import stories from "../constants/stories";
import ThumbnailBar from "../components/ThumbnailBar";
import StoryDisplay from "../components/StoryDisplay";
const StoryViewer = () => {
  const [current, setCurrent] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<number | null>(null);

  const openStory = (index: number) => setCurrent(index);

  const closeStory = () => {
    setCurrent(null);
    clearTimeout(timerRef.current!);
  };

  const showNextStory = () => {
    if (current === null) return;
    if (current < stories.length - 1) {
      setCurrent(current + 1);
    } else {
      closeStory();
    }
  };

  const showPreviousStory = () => {
    if (current === null) return;
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      closeStory();
    }
  };

  useEffect(() => {
    if (current !== null) {
      setLoading(true);
      const img = new Image();
      img.src = stories[current].imageUrl;
      img.onload = () => {
        setLoading(false);
        timerRef.current = setTimeout(showNextStory, 5000);
      };
    }
    return () => clearTimeout(timerRef.current!);
  }, [current]);
  return (
    <div
      className={`flex flex-col items-center h-screen w-full ${
        current !== null ? "p-0" : ""
      }`}
    >
      {current === null ? (
        <>
          <ThumbnailBar stories={stories} onSelect={openStory} />
          <img
            src="/stories/feed.jpg"
            className="w-full max-w-xs mt-4 rounded-lg object-cover"
            alt="Feed preview"
          />
        </>
      ) : (
        <StoryDisplay
          imageUrl={stories[current].imageUrl}
          loading={loading}
          onClick={(dir) =>
            dir === "left" ? showPreviousStory() : showNextStory()
          }
        />
      )}
    </div>
  );
};

export default StoryViewer;
