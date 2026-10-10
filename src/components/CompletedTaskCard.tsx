import type { Task } from "../utils/types";
import type { Colours } from "../utils/types";

interface Props {
  task: Task;
}

const colourPicker: Record<Colours, string> = {
  green: "bg-green-400",
  blue: "bg-blue-400",
  red: "bg-red-400",
  yellow: "bg-yellow-400",
  indigo: "bg-indigo-400",
};

export default function CompletedTaskCard({ task }: Props) {
  return (
    <div
      className={`flex ${colourPicker[task.colour]} flex flex-col gap-2 p-2 border-2 border-black shadow-[4px_4px_rgba(0,0,0,0.75)]
             backdrop:bg-black/40 backdrop:backdrop-blur-sm`}
    >
      <div className="flex justify-between gap-2">
        <h4 className="text-xl font-bold">{task.title}</h4>
        <div className="max-w-min rounded-full border-2 border-black bg-cyan-400 px-4 py-1">
          <p className="text-xs">{task.tag}</p>
        </div>
      </div>
      {task.description}

      <button></button>
    </div>
  );
}
