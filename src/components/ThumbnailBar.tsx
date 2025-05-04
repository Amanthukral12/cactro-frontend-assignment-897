import { Story } from "../types/types";

interface Props {
  stories: Story[];
  onSelect: (index: number) => void;
}
const ThumbnailBar = ({ stories, onSelect }: Props) => {
  return (
    <div className="h-1/5 flex mx-4 justify-between my-4">
      {stories.map((story, index) => (
        <img
          key={story.id}
          src={story.imageUrl}
          alt="story thumbnail"
          onClick={() => onSelect(index)}
          className="h-16 w-16 rounded-full"
        />
      ))}
    </div>
  );
};

export default ThumbnailBar;
