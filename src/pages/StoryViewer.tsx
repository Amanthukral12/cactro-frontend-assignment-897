import { useState } from "react";
import stories from "../constants/stories";
import ThumbnailBar from "../components/ThumbnailBar";
import StoryDisplay from "../components/StoryDisplay";
const StoryViewer = () => {
  const [current, setCurrent] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const openStory = (index: number) => setCurrent(index);

  const closeStory = () => {
    setCurrent(null);
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
  return (
    <div>
      {current === null ? (
        <>
          <ThumbnailBar stories={stories} onSelect={openStory} />
          <img src="/stories/1.jpg" />
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
