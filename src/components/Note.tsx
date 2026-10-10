import { useDraggable, useDragOperation } from "@dnd-kit/react";
import { Feedback } from "@dnd-kit/dom";
import { EllipsisVertical } from "lucide-react";
import Button from "./Button";
import { type Colours } from "../utils/types";

interface Props {
  position?: { x: number; y: number };
  id: string;
  colour: Colours;
  title: string;
  description: string;
  tag?: string;
}

const colourPicker: Record<Colours, string> = {
  green: "bg-green-400",
  blue: "bg-blue-400",
  red: "bg-red-400",
  yellow: "bg-yellow-400",
  indigo: "bg-indigo-400",
};

export default function Note({
  position,
  id,
  colour,
  title,
  description,
  tag,
}: Props) {
  const { ref, isDragging } = useDraggable({
    id,
    plugins: [Feedback.configure({ dropAnimation: null })],
  });
  const { target } = useDragOperation();
  const isAboutToDrop = isDragging && target?.id === "drop-zone";

  return (
    <div
      ref={ref}
      style={{
        transform: `translate(-50%, -50%) translate3d(${position?.x ?? 0}px, ${position?.y ?? 0}px, 0)`,
      }}
      className={`absolute top-1/2 left-1/2 size-52 ${isDragging ? "z-10" : ""}`}
    >
      <div
        style={{ anchorName: "--note-anchor" } as React.CSSProperties}
        className={`relative size-full -rotate-4 space-y-2 border-4 border-black ${colourPicker[colour]} p-4 shadow-[4px_4px_rgba(0,0,0,0.75)] transition-transform duration-150 hover:cursor-grab
          active:rotate-0 active:scale-110 active:shadow-[10px_10px_rgba(0,0,0,0.5)] ${isAboutToDrop ? "scale-75!" : ""}`}
      >
        <span className="absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-black"></span>
        <div className="flex items-center justify-between">
          <p className="text-xl font-black line-clamp-2">{title}</p>
          <Button variant="icon">
            <EllipsisVertical strokeWidth={3} />
          </Button>
        </div>
        <div className="max-w-min rounded-full border-2 border-black bg-cyan-400 px-4 py-1">
          <p className="text-xs">{tag}</p>
        </div>
        <p className="font-light line-clamp-3">{description}</p>
      </div>
    </div>
  );
}
