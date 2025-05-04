import { Story } from "../types/types";

interface Props {
  stories: Story[];
  onSelect: (index: number) => void;
}
const ThumbnailBar = ({ stories, onSelect }: Props) => {
  return (
    <div className="flex overflow-x-auto gap-3 w-full py-2 px-1">
      {stories.map((story, index) => (
        <img
          key={story.id}
          src={story.imageUrl}
          alt="story thumbnail"
          onClick={() => onSelect(index)}
          className="h-16 w-16 rounded-full object-cover cursor-pointer flex-shrink-0 border-2 border-pink-500"
        />
      ))}
    </div>
  );
};

export default ThumbnailBar;
