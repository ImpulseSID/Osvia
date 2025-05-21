import React from "react";
import { useMusicPlayer } from "../contexts/MusicPlayerContext";
import { ChevronRight } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface QueueSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// SortableItem component for the drag-and-drop queue items
const SortableQueueItem = ({
  id,
  track,
  index,
}: {
  id: string;
  track: any;
  index: number;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center p-2 hover:bg-neutral-900 rounded cursor-grab"
    >
      <div className="mr-2 text-neutral-500">{index + 1}</div>
      <div className="h-10 w-10 flex-shrink-0">
        <img
          src={track.thumbnail || "/default-album.jpg"}
          alt={track.title}
          className="h-full w-full object-cover rounded"
        />
      </div>
      <div className="ml-2 truncate">
        <div className="text-sm font-medium text-white truncate">
          {track.title}
        </div>
        <div className="text-xs text-neutral-500 truncate">{track.artist}</div>
      </div>
      <div className="text-xs text-neutral-500 ml-auto">{track.duration}</div>
    </div>
  );
};

const QueueSidebar: React.FC<QueueSidebarProps> = ({ isOpen, onClose }) => {
  const { queue, currentTrack, reorderQueue } = useMusicPlayer();

  // Calculate total queue playtime
  const calculateTotalTime = () => {
    return queue.reduce((total, track) => {
      // Convert duration like "3:45" to seconds
      const parts = track.duration.split(":");
      const minutes = parseInt(parts[0], 10);
      const seconds = parts.length > 1 ? parseInt(parts[1], 10) : 0;
      return total + (minutes * 60 + seconds);
    }, 0);
  };

  // Format total time from seconds to "hours:minutes:seconds" format
  const formatTotalTime = (totalSeconds: number) => {
    if (totalSeconds === 0) return "0:00";

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const totalTime = formatTotalTime(calculateTotalTime());

  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end to reorder queue
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = queue.findIndex((item) => item.id === active.id);
      const newIndex = queue.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderQueue(oldIndex, newIndex);
      }
    }
  };

  return (
    <div
      className={`h-full bg-black border-l border-neutral-800 z-10 transition-all duration-300 ${
        isOpen ? "w-80" : "w-0"
      } overflow-hidden`}
    >
      <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gradient">Queue</h2>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-white"
          aria-label="Close queue"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {currentTrack && (
        <div className="p-4 border-b border-neutral-800">
          <div className="text-sm text-neutral-400 mb-2">Now Playing</div>
          <div className="flex items-center">
            <div className="h-12 w-12 flex-shrink-0">
              <img
                src={currentTrack.thumbnail || "/default-album.jpg"}
                alt={currentTrack.title}
                className="h-full w-full object-cover rounded"
              />
            </div>
            <div className="ml-2">
              <div className="text-white font-medium truncate">
                {currentTrack.title}
              </div>
              <div className="text-sm text-neutral-400 truncate">
                {currentTrack.artist}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 border-b border-neutral-800">
        <div className="flex justify-between items-center">
          <div className="text-sm text-neutral-400">Next in Queue</div>
          {queue.length > 0 && (
            <div className="text-xs text-neutral-400">
              {queue.length} songs • {totalTime}
            </div>
          )}
        </div>
      </div>

      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 280px)" }}
      >
        {queue.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={queue.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="p-2">
                {queue.map((track, index) => (
                  <SortableQueueItem
                    key={track.id}
                    id={track.id}
                    track={track}
                    index={index}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="p-4 text-neutral-400 text-center">Queue is empty</div>
        )}
      </div>
    </div>
  );
};

export default QueueSidebar;
