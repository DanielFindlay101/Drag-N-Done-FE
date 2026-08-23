import type { Notes } from "../App";
import type { Colours } from "./Note";

interface Props {
  note: Notes;
}

const colourPicker: Record<Colours, string> = {
  green: "bg-green-400",
  blue: "bg-blue-400",
  red: "bg-red-400",
  yellow: "bg-yellow-400",
  indigo: "bg-indigo-400",
};

export default function CompletedNoteCard({ note }: Props) {
  return (
    <div
      className={`flex ${colourPicker[note.colour]} flex flex-col gap-2 p-2 border-2 border-black shadow-[4px_4px_rgba(0,0,0,0.75)]
             backdrop:bg-black/40 backdrop:backdrop-blur-sm`}
    >
      <div className="flex justify-between gap-2">
        <h4 className="text-xl font-bold">{note.title}</h4>
        <div className="max-w-min rounded-full border-2 border-black bg-cyan-400 px-4 py-1">
          <p className="text-xs">{note.tag}</p>
        </div>
      </div>
      {note.description}

      <button></button>
    </div>
  );
}
